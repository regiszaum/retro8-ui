const { chromium } = require("playwright");
const { AxeBuilder } = require("@axe-core/playwright");
const fs = require("fs");
const path = require("node:path");
require("tsx/cjs");
const root = path.resolve(__dirname, "..");
const catalog = require(
  path.join(root, "docs-site/shared/component-catalog.ts"),
).componentCatalog;
const outputDir =
  process.env.R8_AUDIT_OUTPUT ||
  path.join(require("node:os").tmpdir(), "retro8-audit-reproduction");
fs.mkdirSync(outputDir, { recursive: true });
const baseURL = process.env.R8_AUDIT_URL || "http://127.0.0.1:3100";
(async () => {
  const browser = await chromium.launch({ headless: true });
  const out = [];
  const queue = [
    ...["en", "pt-br"].flatMap((locale) => catalog.map((component) => ({
      ...component,
      id: `${locale}-${component.id}`,
      route: `/${locale}/components/${component.id}`,
    }))),
    ...["en", "pt-br"].flatMap((locale) =>
      ["", "getting-started", "tokens", "icons", "components", "llms.txt", "skills"].map((slug) => ({
        id: `${locale}-${slug || "home"}`,
        route: `/${locale}${slug ? `/${slug}` : ""}`,
        guide: true,
      })),
    ),
  ];
  await Promise.all(
    [0, 1].map(async (worker) => {
      const context = await browser.newContext({
        viewport: { width: 1440, height: 1000 },
      });
      await context.route("https://www.googletagmanager.com/**", (r) =>
        r.abort(),
      );
      const page = await context.newPage();
      let errors = [],
        consoleErrors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => {
        if (
          m.type() === "error" &&
          !m.text().includes("ERR_FAILED") &&
          !new URL(m.location().url || baseURL, baseURL).pathname.endsWith(
            "/missing-avatar.png",
          )
        )
          consoleErrors.push(m.text());
      });
      while (queue.length) {
        const component = queue.shift();
        errors = [];
        consoleErrors = [];
        const result = { id: component.id, layouts: [] };
        try {
          const response = await page.goto(
            baseURL + (component.route || "/en/components/" + component.id),
            { waitUntil: "networkidle", timeout: 45000 },
          );
          result.status = response.status();
          if (component.guide && component.route.endsWith("/components")) {
            const counts = await page
              .locator(".docs-catalog-counts .r8-badge")
              .allTextContents();
            if (
              counts.length !== 3 ||
              counts.some((text) => !/^\d+\s+\S/.test(text.trim()))
            ) {
              throw new Error(
                "Catalog statistics must include labels, not just numbers",
              );
            }
            result.catalogSummary = counts;
          }
          await page.waitForFunction(
            () =>
              !!window.Retro8UI &&
              document.body.dataset.r8GlobalReady === "true",
          );
          await page.evaluate(() => document.fonts.ready);
          result.codeBlocks = await page.locator(".docs-main pre").evaluateAll((blocks) => blocks.map((pre) => {
            const code = pre.querySelector("code");
            const style = getComputedStyle(pre);
            const start = pre.getBoundingClientRect().left + parseFloat(style.borderLeftWidth) + parseFloat(style.paddingLeft);
            return {
              snippet: code?.textContent.slice(0, 70),
              extraWhitespace: !!code && pre.textContent !== code.textContent,
              misaligned: !!code && Math.abs(code.getBoundingClientRect().left - start) > 1,
              scrollable: pre.scrollWidth > pre.clientWidth + 2 || pre.scrollHeight > pre.clientHeight + 2,
              focusable: pre.tabIndex >= 0,
            };
          }));
          if (result.codeBlocks.some((block) => block.extraWhitespace || block.misaligned || (block.scrollable && !block.focusable))) {
            throw new Error("Code blocks must preserve source indentation, align to their padding and allow keyboard scrolling");
          }
          if (
            (await page
              .locator(".docs-theme-switch")
              .getAttribute("aria-checked")) === "true"
          )
            await page.locator(".docs-theme-switch").click();
          for (const width of [1440, 768, 390, 320]) {
            await page.setViewportSize({ width, height: 1000 });
            await page.waitForTimeout(80);
            result.layouts.push(
              await page.evaluate((width) => {
                const overflow = [];
                const clipped = [];
                const inaccessibleCode = [...document.querySelectorAll("main pre")]
                  .filter((pre) => (pre.scrollWidth > pre.clientWidth + 2 || pre.scrollHeight > pre.clientHeight + 2) && pre.tabIndex < 0)
                  .map((pre) => pre.textContent.slice(0, 70));
                for (const el of document.querySelectorAll("main *")) {
                  const rect = el.getBoundingClientRect();
                  const style = getComputedStyle(el);
                  if (
                    !rect.width ||
                    !rect.height ||
                    style.position === "fixed" ||
                    el.parentElement?.closest(".r8-table-wrap") ||
                    el.closest(
                      "[hidden],pre,.docs-code-block,.docs-api-table__viewport,.docs-prose-table",
                    )
                  )
                    continue;
                  if (rect.right > width + 2 && rect.left >= 0)
                    overflow.push({
                      tag: el.tagName,
                      class:
                        typeof el.className === "string" ? el.className : "",
                      right: Math.round(rect.right),
                      width: Math.round(rect.width),
                      text: el.textContent.trim().slice(0, 70),
                    });
                  if (
                    el.matches(".docs-preview__surface,.r8-window__body") &&
                    el.scrollWidth > el.clientWidth + 2
                  )
                    clipped.push({
                      class: el.className,
                      scroll: el.scrollWidth,
                      client: el.clientWidth,
                    });
                }
                return {
                  width,
                  document: document.documentElement.scrollWidth,
                  overflow: overflow.slice(0, 18),
                  clipped,
                  inaccessibleCode,
                };
              }, width),
            );
          }
          await page.setViewportSize({ width: 1440, height: 1000 });
          result.a11y = [];
          result.codeThemes = [];
          result.themes = ["light", "dark"];
          for (const theme of result.themes) {
            const toggle = page.locator(".docs-theme-switch");
            if (
              ((await toggle.getAttribute("aria-checked")) === "true") !==
              (theme === "dark")
            )
              await toggle.click();
            // Link colors transition for 75ms; inspect the settled theme.
            await page.waitForTimeout(120);
            const codeTheme = await page.locator(".docs-main pre").evaluateAll((blocks, theme) => {
              const luminance = (color) => {
                const channels = color.match(/[\d.]+/g).slice(0, 3).map(Number)
                  .map((n) => n / 255)
                  .map((n) => n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4);
                return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
              };
              return blocks.map((pre) => {
                let surface = pre;
                while (surface.parentElement && getComputedStyle(surface).backgroundColor === "rgba(0, 0, 0, 0)") surface = surface.parentElement;
                const background = getComputedStyle(surface).backgroundColor;
                const foreground = getComputedStyle(pre.querySelector("code") || pre).color;
                const bg = luminance(background);
                const fg = luminance(foreground);
                return {
                  theme, background, foreground,
                  correctScheme: theme === "light" ? bg >= 0.75 && fg < bg : bg < 0.15 && fg > bg,
                  contrast: (Math.max(bg, fg) + 0.05) / (Math.min(bg, fg) + 0.05),
                };
              });
            }, theme);
            result.codeThemes.push(...codeTheme);
            if (codeTheme.some((block) => !block.correctScheme || block.contrast < 4.5)) {
              throw new Error("Code surfaces and text must match the selected theme and retain readable contrast");
            }
            const a = await new AxeBuilder({ page })
              .include("body")
              .exclude("nuxt-devtools-panel")
              .exclude("nuxt-devtools-frame")
              .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
              .analyze();
            result.a11y.push(
              ...a.violations.map((v) => ({
                theme,
                id: v.id,
                impact: v.impact,
                description: v.description,
                nodes: v.nodes
                  .map((n) => ({ target: n.target, summary: n.failureSummary }))
                  .slice(0, 5),
              })),
            );
          }
          result.images = await page
            .locator(".docs-preview__surface img")
            .evaluateAll((imgs) =>
              imgs
                .filter((i) => !i.complete || !i.naturalWidth)
                .map((i) => i.getAttribute("src")),
            );
          result.errors = [...new Set(errors)];
          result.consoleErrors = [...new Set(consoleErrors)].slice(0, 10);
          const pt = await context.request.get(
            baseURL +
              (component.route
                ? component.route.replace(/^\/en\//, "/pt-br/")
                : "/pt-br/components/" + component.id),
          );
          result.ptStatus = pt.status();
          if (
            process.env.R8_AUDIT_SCREENSHOTS === "1" &&
            result.layouts.some(
              (l) =>
                l.overflow.length ||
                l.document > l.width + 2 ||
                l.clipped.length,
            )
          ) {
            await page.setViewportSize({ width: 390, height: 1000 });
            await page.screenshot({
              path: path.join(outputDir, component.id + "-mobile.png"),
              fullPage: true,
            });
          }
        } catch (e) {
          result.error = e.message;
        }
        out.push(result);
        fs.writeFileSync(
          path.join(outputDir, "scan.json"),
          JSON.stringify(out, null, 2),
        );
        console.log(
          component.id,
          result.status,
          result.layouts
            .filter(
              (l) =>
                l.overflow.length ||
                l.document > l.width + 2 ||
                l.clipped.length,
            )
            .map((l) => l.width),
          result.a11y?.map((v) => v.id),
          result.errors || result.error,
        );
      }
      await context.close();
    }),
  );
  await browser.close();
  process.exitCode = out.some(
    (r) =>
      r.error ||
      r.status !== 200 ||
      r.ptStatus !== 200 ||
      r.errors?.length ||
      r.consoleErrors?.length ||
      r.a11y?.length ||
      r.layouts.some(
        (l) =>
          l.overflow.length || l.document > l.width + 2 || l.clipped.length || l.inaccessibleCode.length,
      ),
  )
    ? 1
    : 0;
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
