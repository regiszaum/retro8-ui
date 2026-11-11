const { chromium } = require("playwright");
const fs = require("fs");
const assert = require("node:assert/strict");
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

function luminance(color) {
  const channels = color.match(/[\d.]+/g).slice(0, 3).map(Number)
    .map((n) => color.startsWith("color(srgb ") ? n : n / 255)
    .map((n) => n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4);
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const results = [];
  async function test(name, id, fn, markup) {
    const page = await browser.newPage({
      viewport: { width: 1000, height: 800 },
    });
    page.setDefaultTimeout(4000);
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    try {
      await page.setContent(
        '<!doctype html><html><head></head><body><main id="fixture">' +
          (markup ?? catalog.find((x) => x.id === id).preview) +
          '</main><button id="outside">Outside</button></body></html>',
      );
      await page.addStyleTag({ path: root + "/dist/retro8.css" });
      await page.addScriptTag({
        path: path.join(
          root,
          process.argv.includes("--dist")
            ? "dist/retro8.min.js"
            : "src/scripts/retro8.js",
        ),
      });
      await fn(page);
      assert.deepEqual(errors, []);
      results.push({ name, status: "pass" });
    } catch (e) {
      results.push({ name, status: "fail", error: e.message, errors });
    }
    await page.close();
    console.log(JSON.stringify(results.at(-1)));
    fs.writeFileSync(
      path.join(outputDir, "behavior.json"),
      JSON.stringify(results, null, 2),
    );
  }
  await test(
    "dark themes apply at the document root and nested scopes with readable pagination",
    "pagination",
    async (p) => {
      const readColors = () => p.locator(".r8-pagination__summary").evaluate((el) => ({
        text: getComputedStyle(el).color,
        background: getComputedStyle(el.closest(".r8-panel")).backgroundColor,
      }));
      const light = await readColors();
      for (const scope of ["html", "#fixture"]) {
        for (const [attribute, value] of [["data-theme", "dark"], ["data-r8-theme", "dark"], ["class", "r8-theme-dark"]]) {
          await p.locator(scope).evaluate((el, [key, val]) => el.setAttribute(key, val), [attribute, value]);
          const dark = await readColors();
          assert.notEqual(dark.background, light.background, `${scope} ${attribute}: dark surface must change`);
          const foreground = luminance(dark.text);
          const background = luminance(dark.background);
          assert.ok(foreground > background, "dark pagination must use light text");
          assert.ok((foreground + 0.05) / (background + 0.05) >= 4.5, "pagination summary must remain readable");
          await p.locator(scope).evaluate((el, key) => el.removeAttribute(key), attribute);
          assert.deepEqual(await readColors(), light, "switching back must restore light colors");
        }
      }
    },
    '<section class="r8-panel"><div class="r8-pagination"><span class="r8-pagination__summary">Total 9</span></div></section>',
  );
  await test(
    "text variants and tertiary controls retain contrast in both themes",
    "typography",
    async (p) => {
      for (const theme of ["light", "dark"]) {
        await p.locator("html").evaluate((el, value) => el.dataset.theme = value, theme);
        await p.waitForTimeout(120);
        const samples = await p.locator(".r8-panel > *").evaluateAll((els) => els.map((el) => ({
          name: el.className,
          foreground: getComputedStyle(el).color,
          background: getComputedStyle(el.matches("button") ? el : el.parentElement).backgroundColor,
        })));
        for (const sample of samples) {
          const values = [luminance(sample.foreground), luminance(sample.background)].sort((a, b) => b - a);
          assert.ok((values[0] + 0.05) / (values[1] + 0.05) >= 4.5, `${theme}: ${sample.name} contrast`);
        }
        const focus = await p.locator(".r8-btn--tertiary").evaluate((el) => {
          el.focus();
          return {
            color: getComputedStyle(el).outlineColor,
            width: parseFloat(getComputedStyle(el).outlineWidth),
            background: getComputedStyle(el.parentElement).backgroundColor,
          };
        });
        const values = [luminance(focus.color), luminance(focus.background)].sort((a, b) => b - a);
        assert.ok(focus.width > 0, `${theme}: keyboard focus must be visible`);
        assert.ok((values[0] + 0.05) / (values[1] + 0.05) >= 3, `${theme}: focus ring must contrast with its surface`);
      }
    },
    '<section class="r8-panel">' + ["secondary", "dark", "tertiary"].map((tone) =>
      `<a class="r8-link r8-link--${tone}" href="#fixture">Link</a><p class="r8-text r8-text--${tone}">Text</p>`,
    ).join("") + '<button class="r8-btn r8-btn--tertiary">Action</button></section>',
  );
  await test(
    "documented custom palettes update semantic components and nested themes",
    "config-provider",
    async (p) => {
      await p.locator("#fixture").evaluate((el) => {
        el.style.setProperty("--r8-space-4", "2rem");
        el.style.setProperty("--r8-font-size-sm", "17px");
      });
      const read = (selector, property = "backgroundColor") => p.locator(selector).evaluate(
        (el, key) => getComputedStyle(el)[key], property,
      );
      for (const locale of ["en", "pt-br"]) {
        const guide = fs.readFileSync(path.join(root, `docs-site/content/${locale}/tokens.md`), "utf8");
        const css = [...guide.matchAll(/```css\n([\s\S]*?)```/g)].map((match) => match[1]).join("\n");
        const style = await p.addStyleTag({ content: css });
        for (const [theme, colors] of [["light", ["rgb(124, 58, 237)", "rgb(15, 118, 110)", "rgb(190, 18, 60)"]], ["dark", ["rgb(196, 181, 253)", "rgb(94, 234, 212)", "rgb(253, 164, 175)"]]]) {
          await p.locator("html").evaluate((el, value) => el.dataset.theme = value, theme);
          for (const [index, role] of ["primary", "success", "danger"].entries()) {
            assert.equal(await read(`.r8-btn--${role}`), colors[index], `${locale} ${theme} ${role} button`);
            assert.equal(await read(`.r8-badge--${role}`), colors[index], `${locale} ${theme} ${role} badge`);
          }
          assert.equal(await read(".r8-progress__bar"), colors[0], "legacy accent components must follow the custom primary");
        }
        for (const [attribute, value] of [["data-theme", "light"], ["data-r8-theme", "light"], ["class", "r8-panel r8-theme-light"]]) {
          await p.locator("#local-theme").evaluate((el, [key, val]) => el.setAttribute(key, val), [attribute, value]);
          assert.equal(await read("#local-theme"), "rgb(248, 250, 252)", "local light theme must reset the dark surface");
          assert.equal(await read("#local-theme", "color"), "rgb(15, 23, 42)", "local light theme must restore dark text");
          assert.deepEqual(await p.locator("#local-theme").evaluate((el) => [
            getComputedStyle(el).getPropertyValue("--r8-space-4").trim(),
            getComputedStyle(el).getPropertyValue("--r8-font-size-sm").trim(),
          ]), ["2rem", "17px"], "local color themes must preserve inherited layout tokens");
          await p.locator("#local-theme").evaluate((el, key) => key === "class" ? el.setAttribute("class", "r8-panel") : el.removeAttribute(key), attribute);
        }
        await style.evaluate((el) => el.remove());
      }
    },
    '<section class="r8-panel">' + ["primary", "success", "danger"].map((tone) =>
      `<button class="r8-btn r8-btn--${tone}">Action</button><span class="r8-badge r8-badge--${tone}">Status</span>`,
    ).join("") + '<div class="r8-progress"><div class="r8-progress__track"><div class="r8-progress__bar"></div></div></div><section id="local-theme" class="r8-panel">Local</section></section>',
  );
  await test(
    "checkbox click, Space, disabled and refresh idempotence",
    "checkbox",
    async (p) => {
      const c = p.locator(".r8-checkbox").first();
      await c.click();
      assert.equal(await c.getAttribute("aria-checked"), "false");
      await c.press(" ");
      assert.equal(await c.getAttribute("aria-checked"), "true");
      await p.evaluate(() => {
        Retro8UI.init();
        Retro8UI.init();
      });
      await c.click();
      assert.equal(await c.getAttribute("aria-checked"), "false");
      const d = p.locator(".r8-checkbox").nth(2);
      const before = await d.getAttribute("aria-checked");
      await d.click({ force: true });
      assert.equal(await d.getAttribute("aria-checked"), before);
    },
  );
  for (const id of ["switch", "theme-switch"])
    await test(id + " click and keyboard", id, async (p) => {
      const c = p.locator(".r8-" + id).first();
      const before = await c.getAttribute("aria-checked");
      await c.click();
      assert.notEqual(await c.getAttribute("aria-checked"), before);
      await c.press(" ");
      assert.equal(await c.getAttribute("aria-checked"), before);
    });
  await test("radio selection exclusivity", "radio", async (p) => {
    await p.locator(".r8-radio").nth(1).click();
    assert.equal(await p.locator('.r8-radio[aria-checked="true"]').count(), 1);
  });
  await test("tabs click switches visible panel", "tabs", async (p) => {
    await p.locator(".r8-tabs__tab").nth(1).click();
    assert.equal(await p.locator("#docs-tabs-crew").isVisible(), true);
    assert.equal(await p.locator("#docs-tabs-stats").isVisible(), false);
  });
  await test("tabs ArrowRight navigates to next tab", "tabs", async (p) => {
    await p.locator(".r8-tabs__tab").first().focus();
    await p.keyboard.press("ArrowRight");
    assert.equal(
      await p.evaluate(() => document.activeElement.textContent.trim()),
      "Crew",
    );
  });
  await test("rating selects a single radio option", "rate", async (p) => {
    await p.locator(".r8-rate__item").nth(3).click();
    assert.equal(
      await p.locator('[role="radio"][aria-checked="true"]').count(),
      1,
    );
  });
  await test("rating disabled prevents change", "rate", async (p) => {
    await p
      .locator(".r8-rate")
      .evaluate((e) => e.setAttribute("aria-disabled", "true"));
    await p.locator(".r8-rate__item").last().press("Enter");
    assert.equal(await p.locator(".r8-rate__item.is-active").count(), 3);
  });
  await test(
    "select opens selects option and Escape closes",
    "select",
    async (p) => {
      await p.locator(".r8-select__trigger").click();
      await p.locator(".r8-select__option").first().click();
      assert.equal(
        (await p.locator("[data-r8-choice-display]").innerText()).trim(),
        "Engineer",
      );
      await p.locator(".r8-select__trigger").click();
      await p.keyboard.press("Escape");
      assert.equal(await p.locator(".r8-select__menu").isVisible(), false);
    },
  );
  for (const [id, panelClass] of [["select", "r8-select__menu"], ["cascader", "r8-cascader__panel"], ["autocomplete", "r8-autocomplete__menu"]]) {
    await test(`${id} panel matches its field without moving surrounding content`, id, async (p) => {
      const root = p.locator(`.r8-${id}`).first();
      const trigger = root.locator(`.r8-${id}__trigger`);
      const panel = root.locator(`.${panelClass}`);
      for (const theme of ["light", "dark"]) {
        await p.locator("html").evaluate((el, value) => el.dataset.theme = value, theme);
        for (const [viewport, width] of [[1280, 640], [1280, 280], [390, 280], [320, 240], [320, 180]]) {
          await p.setViewportSize({ width: viewport, height: 900 });
          await root.evaluate((el, width) => el.style.width = `${width}px`, width);
          const before = await root.boundingBox();
          if (id === "autocomplete") await root.locator("input").first().click();
          else await trigger.click();
          assert.equal(await panel.isVisible(), true);
          const fieldBox = await trigger.boundingBox();
          const panelBox = await panel.boundingBox();
          const after = await root.boundingBox();
          assert.ok(Math.abs(fieldBox.width - panelBox.width) <= 1, `${theme} ${width}: matching width`);
          assert.ok(Math.abs(fieldBox.x - panelBox.x) <= 1, `${theme} ${width}: aligned left edge`);
          assert.ok(Math.abs(before.height - after.height) <= 1, "opening must not move the following fields");
          const display = trigger.locator("[data-r8-choice-display]");
          if (await display.count()) {
            await display.evaluate((el) => el.textContent = "Very long selected label ".repeat(15));
            assert.ok(await trigger.evaluate((el) => el.scrollWidth <= el.clientWidth + 2), "long labels must stay inside the field");
          }
          assert.ok(await panel.evaluate((el) => el.scrollWidth <= el.clientWidth + 2), "overflow must stay inside the option list");
          assert.ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "page must not scroll horizontally");
          if (id === "cascader") {
            const search = root.locator(".r8-cascader__input");
            await search.fill("not-a-route");
            assert.equal(await panel.locator(".r8-cascader__option:visible").count(), 0, "unmatched search must not show the original tree");
            assert.equal(await panel.locator(".r8-cascader__empty").isVisible(), true);
            assert.ok(await panel.evaluate((el) => el.scrollWidth <= el.clientWidth + 2), "empty results must fit the field width");
            await search.fill("");
            assert.ok(await panel.locator(".r8-cascader__option:visible").count() > 0, "clearing the search must restore the hierarchy");
          }
          await p.keyboard.press("Escape");
          assert.equal(await panel.isVisible(), false);
          await p.locator("#outside").focus();
        }
      }
    });
  }
  await test("input focus stays inset, avoids duplicate rings and fits narrow forms", "input", async (p) => {
    await p.setViewportSize({ width: 320, height: 900 });
    await p.locator("#fixture").evaluate((el) => el.insertAdjacentHTML("beforeend",
      '<select class="r8-input" aria-label="Native select"><option>A long native select label that must fit the field</option></select><input class="r8-input r8-input--invalid" aria-label="Invalid field" value="Invalid value">',
    ));
    const inputs = p.locator(".r8-input:not(:disabled)");
    for (const theme of ["light", "dark"]) {
      await p.locator("html").evaluate((el, value) => el.dataset.theme = value, theme);
      for (const input of await inputs.all()) {
        const before = await input.boundingBox();
        const invalidBorder = await input.evaluate((el) => el.matches(".r8-input--invalid") ? getComputedStyle(el).borderTopColor : null);
        await input.focus();
        const state = await input.evaluate((el) => {
          const wrapper = el.closest(".r8-input-shell") || el;
          const style = getComputedStyle(wrapper);
          return { width: parseFloat(style.outlineWidth), offset: parseFloat(style.outlineOffset),
            inner: parseFloat(getComputedStyle(el).outlineWidth), composite: wrapper !== el,
            fits: wrapper.scrollWidth <= wrapper.clientWidth + 2 };
        });
        assert.ok(state.width > 0 && state.width <= 2, "one restrained focus indicator must remain visible");
        assert.ok(state.offset <= 0, "focus must stay inside the field");
        if (state.composite) assert.equal(state.inner, 0, "inner inputs must not add another ring");
        assert.ok(state.fits, "input actions and counters must fit narrow fields");
        const after = await input.boundingBox();
        assert.equal(after.width, before.width);
        assert.equal(after.height, before.height);
        if (invalidBorder) assert.equal(await input.evaluate((el) => getComputedStyle(el).borderTopColor), invalidBorder, "focus must preserve the error border");
      }
    }
    await p.locator("#fixture").evaluate((el) => el.style.setProperty("--r8-field-focus-color", "#0f766e"));
    await inputs.first().focus();
    assert.equal(await inputs.first().evaluate((el) => getComputedStyle(el.closest(".r8-input-shell") || el).outlineColor), "rgb(15, 118, 110)");
  });
  await test("select keyboard opens and selects", "select", async (p) => {
    await p.locator(".r8-select__trigger").focus();
    await p.keyboard.press("ArrowDown");
    assert.equal(await p.locator(".r8-select__menu").isVisible(), true);
    await p.keyboard.press("Enter");
    assert.equal(await p.locator(".r8-select__menu").isVisible(), false);
  });
  await test("collapse click and keyboard", "collapse", async (p) => {
    const t = p.locator(".r8-collapse__header").first();
    const before = await t.getAttribute("aria-expanded");
    await t.click();
    assert.notEqual(await t.getAttribute("aria-expanded"), before);
    await t.press("Enter");
    assert.equal(await t.getAttribute("aria-expanded"), before);
  });
  await test("slider keyboard clamps at bounds", "slider", async (p) => {
    const t = p.locator(".r8-slider__track");
    await t.focus();
    await t.press("End");
    assert.equal(await t.getAttribute("aria-valuenow"), "100");
    await t.press("ArrowRight");
    assert.equal(await t.getAttribute("aria-valuenow"), "100");
    await t.press("Home");
    assert.equal(await t.getAttribute("aria-valuenow"), "0");
  });
  await test(
    "slider disabled prevents keyboard change",
    "slider",
    async (p) => {
      await p
        .locator(".r8-slider")
        .evaluate((e) => e.setAttribute("aria-disabled", "true"));
      await p.locator(".r8-slider__track").press("ArrowRight");
      assert.equal(
        await p.locator(".r8-slider").getAttribute("data-r8-value"),
        "68",
      );
    },
  );
  await test(
    "input-number increment and max clamping",
    "input-number",
    async (p) => {
      await p.locator(".r8-input-number__button").last().click();
      assert.equal(await p.locator("input").inputValue(), "3.75");
      await p.locator("input").fill("99");
      await p.locator("input").press("Tab");
      assert.equal(await p.locator("input").inputValue(), "12.00");
    },
  );
  await test(
    "input-number strict step with max not aligned stays within max",
    "input-number",
    async (p) => {
      await p.locator("input").evaluate((e) => {
        e.max = "1";
        e.step = "0.6";
        e.min = "0";
      });
      await p.locator("input").fill("1");
      await p.locator("input").press("Tab");
      assert.ok(
        Number(await p.locator("input").inputValue()) <= 1,
        "value exceeded max: " + (await p.locator("input").inputValue()),
      );
    },
  );
  await test(
    "input-number readonly prevents increment",
    "input-number",
    async (p) => {
      await p.locator("input").evaluate((e) => (e.readOnly = true));
      await p.locator(".r8-input-number__button").last().click();
      assert.equal(await p.locator("input").inputValue(), "3.50");
    },
  );
  await test(
    "input-tag add remove and treat XSS as text",
    "input-tag",
    async (p) => {
      const i = p.locator(".r8-input-tag__input");
      await i.fill("Test");
      await i.press("Enter");
      assert.equal(await p.locator(".r8-input-tag__tag").count(), 3);
      await i.fill("Test");
      await i.press("Enter");
      assert.equal(await p.locator(".r8-input-tag__tag").count(), 4);
      await i.fill("<img src=x onerror=window.__xss=1>");
      await i.press("Enter");
      assert.equal(await p.locator(".r8-input-tag img").count(), 0);
      assert.equal(await p.evaluate(() => window.__xss), undefined);
      await p.locator(".r8-input-tag__remove").first().click();
      assert.equal(await p.locator(".r8-input-tag__tag").count(), 4);
    },
  );
  await test("transfer moves selected item", "transfer", async (p) => {
    await p.locator(".r8-transfer__item").first().click();
    await p.locator(".r8-transfer__actions button").first().click();
    assert.equal(
      await p
        .locator(".r8-transfer__panel")
        .nth(1)
        .locator(".r8-transfer__item")
        .count(),
      2,
    );
  });
  await test(
    "transfer items reachable and usable by keyboard",
    "transfer",
    async (p) => {
      const i = p.locator(".r8-transfer__item").first();
      assert.ok(await i.evaluate((e) => e.tabIndex >= 0), "item not focusable");
      await i.focus();
      await i.press(" ");
      assert.ok((await i.getAttribute("class")).includes("is-selected"));
    },
  );
  await test("dialog open close and Escape", "dialog", async (p) => {
    const trigger = p.locator("[data-r8-toggle]");
    await trigger.click();
    assert.equal(await p.locator("dialog").isVisible(), true);
    await p.locator("[data-r8-close]").first().click();
    assert.equal(await p.locator("dialog").isVisible(), false);
    await trigger.click();
    await p.keyboard.press("Escape");
    assert.equal(await p.locator("dialog").isVisible(), false);
  });
  await test("dialog aria-expanded tracks open state", "dialog", async (p) => {
    await p.locator("[data-r8-toggle]").click();
    assert.equal(
      await p.locator("[data-r8-toggle]").getAttribute("aria-expanded"),
      "true",
    );
  });
  await test("drawer open and Escape", "drawer", async (p) => {
    await p.locator("[data-r8-toggle]").click();
    await p.waitForTimeout(300);
    assert.equal(await p.locator(".r8-drawer").isVisible(), true);
    await p.keyboard.press("Escape");
    await p.waitForTimeout(320);
    assert.equal(await p.locator(".r8-drawer").getAttribute("hidden"), "");
  });
  await test("modal drawer moves focus into drawer", "drawer", async (p) => {
    await p.locator("[data-r8-toggle]").click();
    await p.waitForTimeout(300);
    assert.ok(
      await p.evaluate(() =>
        document.querySelector(".r8-drawer").contains(document.activeElement),
      ),
      "focus remained outside modal drawer",
    );
  });
  await test(
    "upload filename HTML rendered safely and remove works",
    "upload",
    async (p) => {
      await p
        .locator("input[type=file]")
        .first()
        .setInputFiles({
          name: "<img src=x onerror=alert(1)>.png",
          mimeType: "image/png",
          buffer: Buffer.from("fake"),
        });
      assert.equal(
        await p.locator(".r8-upload__name").first().textContent(),
        "<img src=x onerror=alert(1)>.png",
      );
      assert.equal(await p.locator(".r8-upload__name img").count(), 0);
      await p.locator("[data-r8-upload-action=remove]").first().click();
      assert.equal(
        await p
          .locator(".r8-upload")
          .first()
          .locator(".r8-upload__file")
          .count(),
        0,
      );
    },
  );
  await test(
    "OTP typing sanitizes and advances focus",
    "input-otp",
    async (p) => {
      const slots = p.locator(".r8-input-otp__slot");
      await slots.first().focus();
      await p.keyboard.type("12a34");
      assert.equal(await slots.nth(0).inputValue(), "1");
      assert.equal(await slots.nth(1).inputValue(), "2");
      assert.equal(await slots.nth(2).inputValue(), "3");
      assert.equal(await slots.nth(3).inputValue(), "4");
    },
  );
  await test("date-picker selects available date", "date-picker", async (p) => {
    await p.locator(".r8-date-picker__trigger").click();
    await p.locator('[data-r8-date="2026-03-29"]').click();
    assert.equal(
      await p.locator("[data-r8-choice-display]").getAttribute("data-r8-value"),
      "2026-03-29",
    );
  });
  await test(
    "autocomplete types filters and selects",
    "autocomplete",
    async (p) => {
      const input = p.locator(".r8-autocomplete__input").first();
      await input.fill("Vanguard");
      await p.waitForTimeout(100);
      const options = p.locator(".r8-autocomplete__option:visible");
      assert.equal(await options.count(), 1);
      await options.first().click();
      assert.equal(await input.inputValue(), "PIX-07 Vanguard");
      await input.fill("no-such-pilot");
      assert.equal(
        await p.locator(".r8-autocomplete__option:visible").count(),
        0,
      );
    },
  );
  await test(
    "carousel next arrow changes active slide",
    "carousel",
    async (p) => {
      const slides = p.locator(".r8-carousel__slide");
      const before = await slides.evaluateAll((es) =>
        es.findIndex((e) => e.getAttribute("aria-hidden") === "false"),
      );
      await p.locator(".r8-carousel__arrow").last().click();
      const after = await slides.evaluateAll((es) =>
        es.findIndex((e) => e.getAttribute("aria-hidden") === "false"),
      );
      assert.notEqual(after, before);
    },
  );
  await test(
    "pagination next updates current page",
    "pagination",
    async (p) => {
      const before = await p
        .locator(".r8-pagination")
        .first()
        .getAttribute("data-r8-current-page");
      await p.locator("[data-r8-page-action=next]").first().click();
      assert.notEqual(
        await p
          .locator(".r8-pagination")
          .first()
          .getAttribute("data-r8-current-page"),
        before,
      );
    },
  );
  await test(
    "dynamic standalone component auto initializes",
    "checkbox",
    async (p) => {
      await p.evaluate(() => {
        const x = document.createElement("label");
        x.className = "r8-checkbox";
        x.id = "dynamic";
        x.textContent = "Dynamic";
        document.body.append(x);
      });
      await p.waitForTimeout(100);
      await p.locator("#dynamic").click();
      assert.equal(
        await p.locator("#dynamic").getAttribute("aria-checked"),
        "true",
      );
    },
  );
  await test(
    "init(element) initializes the element itself",
    "checkbox",
    async (p) => {
      await p.evaluate(() => {
        const x = document.createElement("label");
        x.className = "r8-checkbox";
        x.id = "detached";
        x.textContent = "Detached";
        Retro8UI.init(x);
        window.__ready = x.getAttribute("data-r8-binary-ready");
      });
      assert.equal(await p.evaluate(() => window.__ready), "true");
    },
  );
  await test("input clear updates native value", "input", async (p) => {
    await p.locator(".r8-input__clear").first().click();
    assert.equal(await p.locator(".r8-input").first().inputValue(), "");
  });
  await test("password reveal toggles type", "input", async (p) => {
    const input = p.locator('input[value="retro-88"]');
    await p.locator(".r8-input__toggle").click();
    assert.equal(await input.getAttribute("type"), "text");
    await p.locator(".r8-input__toggle").click();
    assert.equal(await input.getAttribute("type"), "password");
  });
  await test("navbar toggles and Escape closes", "navbar", async (p) => {
    const toggle = p.locator(".r8-navbar__toggle");
    assert.equal(await toggle.getAttribute("aria-expanded"), "true");
    await toggle.click();
    assert.equal(await toggle.getAttribute("aria-expanded"), "false");
    await toggle.click();
    await p.keyboard.press("Escape");
    assert.equal(await toggle.getAttribute("aria-expanded"), "false");
  });
  await test(
    "splitter keyboard resize and disabled state",
    "splitter",
    async (p) => {
      const h = p.locator(".r8-splitter__handle");
      const old = Number(await h.first().getAttribute("aria-valuenow"));
      await h.first().press("ArrowRight");
      assert.ok(Number(await h.first().getAttribute("aria-valuenow")) > old);
      const disabled = await h.nth(2).getAttribute("aria-valuenow");
      await h.nth(2).press("ArrowRight");
      assert.equal(await h.nth(2).getAttribute("aria-valuenow"), disabled);
    },
  );
  await test("poptip opens and closes via button", "poptip", async (p) => {
    await p.locator("[data-r8-toggle]").click();
    assert.equal(await p.locator(".r8-poptip").isVisible(), true);
    await p.locator("[data-r8-close]").click();
    assert.equal(await p.locator(".r8-poptip").isVisible(), false);
  });
  await test(
    "dropdown emits chosen command and closes",
    "dropdown",
    async (p) => {
      await p.evaluate(() =>
        document
          .querySelector(".r8-dropdown")
          .addEventListener(
            "r8:dropdown-command",
            (e) => (window.__command = e.detail.command),
          ),
      );
      await p.locator(".r8-dropdown__trigger").click();
      await p.locator("[data-r8-command=duplicate]").click();
      assert.equal(await p.locator(".r8-dropdown__menu").isVisible(), false);
      assert.equal(await p.evaluate(() => window.__command), "duplicate");
    },
  );
  await test("color-picker swatch commits color", "color-picker", async (p) => {
    await p.locator(".r8-color-picker__trigger").first().click();
    await p
      .locator('.r8-color-picker__swatch[data-r8-value="#16a34a"]')
      .first()
      .click();
    assert.equal(
      await p.locator(".r8-color-picker").first().getAttribute("data-r8-value"),
      "#16a34a",
    );
  });
  await test(
    "datetime-picker selects date and time",
    "datetime-picker",
    async (p) => {
      await p.locator(".r8-datetime-picker__trigger").click();
      await p.locator('[data-r8-date="2026-03-29"]').click();
      await p.locator('[data-r8-time="09:00"]').click();
      assert.equal(
        await p
          .locator("[data-r8-choice-display]")
          .getAttribute("data-r8-value"),
        "2026-03-29T09:00",
      );
    },
  );
  await test("cascader filters and selects leaf", "cascader", async (p) => {
    await p.locator(".r8-cascader__trigger").first().click();
    await p.locator(".r8-cascader__input").first().fill("Dock 01");
    await p.locator(".r8-cascader__option:visible").first().click();
    assert.equal(
      await p.locator(".r8-cascader").first().getAttribute("data-r8-value"),
      "dock-01",
    );
  });

  await test(
    "closed drawer is hidden and excluded from focus and layout",
    "drawer",
    async (p) => {
      await p.setViewportSize({ width: 320, height: 800 });
      assert.equal(await p.locator(".r8-drawer").isVisible(), false);
      assert.equal(
        await p.locator(".r8-drawer__close").evaluate((e) => {
          e.focus();
          return document.activeElement === e;
        }),
        false,
      );
      assert.equal(
        await p.evaluate(() => document.documentElement.scrollWidth),
        320,
      );
      await p.locator("[data-r8-toggle]").click();
      await p.waitForTimeout(300);
      await p.keyboard.press("Escape");
      await p.waitForTimeout(320);
      assert.equal(await p.locator(".r8-drawer").isVisible(), false);
      assert.equal(
        await p.evaluate(() => document.documentElement.scrollWidth),
        320,
      );
    },
  );
  await test(
    "modal drawer traps Tab, restores focus and inert state",
    "drawer",
    async (p) => {
      await p.locator("[data-r8-toggle]").click();
      await p.waitForTimeout(300);
      const first = p.locator(".r8-drawer__close");
      const last = p.locator(".r8-drawer__footer button").last();
      await last.focus();
      await p.keyboard.press("Tab");
      assert.equal(
        await first.evaluate((e) => document.activeElement === e),
        true,
      );
      await p.keyboard.press("Shift+Tab");
      assert.equal(
        await last.evaluate((e) => document.activeElement === e),
        true,
      );
      assert.equal(await p.locator("#outside").evaluate((e) => e.inert), true);
      await p.keyboard.press("Escape");
      await p.waitForTimeout(320);
      assert.equal(
        await p
          .locator("[data-r8-toggle]")
          .evaluate((e) => document.activeElement === e),
        true,
      );
      assert.equal(await p.locator("#outside").evaluate((e) => e.inert), false);
    },
  );
  await test(
    "nonmodal drawer leaves surrounding controls usable",
    "drawer",
    async (p) => {
      await p
        .locator(".r8-drawer")
        .evaluate((e) => (e.dataset.r8Modal = "false"));
      await p.locator("[data-r8-toggle]").click();
      await p.waitForTimeout(300);
      assert.equal(await p.locator("#outside").evaluate((e) => e.inert), false);
      assert.notEqual(
        await p.locator(".r8-drawer").getAttribute("aria-modal"),
        "true",
      );
    },
  );
  await test(
    "native dialog close resets expanded state",
    "dialog",
    async (p) => {
      await p.locator("[data-r8-toggle]").click();
      await p.evaluate(() => document.querySelector("dialog").close());
      await p.waitForTimeout(50);
      assert.equal(
        await p.locator("[data-r8-toggle]").getAttribute("aria-expanded"),
        "false",
      );
    },
  );
  await test(
    "tabs skip disabled tabs and support End and Home",
    "tabs",
    async (p) => {
      await p
        .locator(".r8-tabs__tab")
        .nth(1)
        .evaluate((e) => e.setAttribute("aria-disabled", "true"));
      await p.locator(".r8-tabs__tab").first().press("ArrowRight");
      assert.equal(
        await p.locator(".r8-tabs__tab").nth(2).getAttribute("aria-selected"),
        "true",
      );
      await p.keyboard.press("Home");
      assert.equal(
        await p.locator(".r8-tabs__tab").first().getAttribute("aria-selected"),
        "true",
      );
      await p.keyboard.press("End");
      assert.equal(
        await p.locator(".r8-tabs__tab").nth(2).getAttribute("aria-selected"),
        "true",
      );
    },
  );
  await test(
    "initial rating has exactly one checked radio and keyboard selection",
    "rate",
    async (p) => {
      assert.equal(
        await p.locator("[role=radio][aria-checked=true]").count(),
        1,
      );
      await p.locator(".r8-rate__item").nth(2).press("ArrowRight");
      assert.equal(
        await p.locator("[role=radio][aria-checked=true]").count(),
        1,
      );
      assert.equal(await p.locator(".r8-rate__item.is-active").count(), 4);
    },
  );
  await test(
    "strict numeric step remains valid against min and max",
    "input-number",
    async (p) => {
      const input = p.locator("input");
      await input.evaluate((e) => {
        e.min = "-1";
        e.max = "0";
        e.step = "0.6";
      });
      await input.fill("-99");
      await input.press("Tab");
      assert.equal(await input.inputValue(), "-1.00");
      await input.fill("99");
      await input.press("Tab");
      assert.equal(await input.inputValue(), "-0.40");
      assert.equal(
        await input.evaluate(
          (e) =>
            e.validity.rangeOverflow ||
            e.validity.rangeUnderflow ||
            e.validity.stepMismatch,
        ),
        false,
      );
    },
  );
  await test(
    "select keeps machine value separate from its display label",
    "select",
    async (p) => {
      await p.evaluate(() =>
        document.querySelector(".r8-select").addEventListener(
          "r8:choice-change",
          (e) =>
            (window.__choice = {
              text: e.detail.text,
              value: e.detail.value,
            }),
        ),
      );
      await p.locator(".r8-select__trigger").click();
      await p.locator(".r8-select__option").first().click();
      assert.deepEqual(await p.evaluate(() => window.__choice), {
        text: "Engineer",
        value: "engineer",
      });
    },
  );
  await test(
    "input-tag add event reports the inserted token once",
    "input-tag",
    async (p) => {
      await p.evaluate(() =>
        document
          .querySelector(".r8-input-tag")
          .addEventListener(
            "r8:input-tag-add",
            (e) => (window.__tags = e.detail.values),
          ),
      );
      await p.locator(".r8-input-tag__input").fill("NEW");
      await p.locator(".r8-input-tag__input").press("Enter");
      assert.deepEqual(await p.evaluate(() => window.__tags), [
        "HUD",
        "PIXEL",
        "NEW",
      ]);
    },
  );
  await test("disabled slider rejects pointer changes", "slider", async (p) => {
    await p
      .locator(".r8-slider")
      .evaluate((e) => e.setAttribute("aria-disabled", "true"));
    await p
      .locator(".r8-slider__track")
      .dispatchEvent("pointerdown", { clientX: 900 });
    assert.equal(
      await p.locator(".r8-slider").getAttribute("data-r8-value"),
      "68",
    );
  });

  await test(
    "removing an open modal restores inert background",
    "drawer",
    async (p) => {
      await p.locator("[data-r8-toggle]").click();
      await p.waitForTimeout(300);
      await p.locator(".r8-drawer").evaluate((drawer) => drawer.remove());
      await p.waitForTimeout(50);
      assert.equal(
        await p.locator("#outside").evaluate((element) => element.inert),
        false,
      );
      assert.equal(await p.locator(".r8-drawer-backdrop").count(), 0);
    },
  );
  await test(
    "closing a modal preserves preexisting inert elements",
    "drawer",
    async (p) => {
      await p.locator("#outside").evaluate((element) => {
        element.inert = true;
      });
      await p.locator("[data-r8-toggle]").click();
      await p.waitForTimeout(300);
      await p.keyboard.press("Escape");
      await p.waitForTimeout(320);
      assert.equal(
        await p.locator("#outside").evaluate((element) => element.inert),
        true,
      );
    },
  );
  await test(
    "OTP digits fit a narrow component surface",
    "input-otp",
    async (p) => {
      const group = p.locator(".r8-input-otp");
      await group.evaluate((element) => {
        element.style.width = "240px";
      });
      assert.equal(
        await group.evaluate(
          (element) => element.scrollWidth <= element.clientWidth,
        ),
        true,
      );
      const slots = p.locator(".r8-input-otp__slot");
      await slots.first().focus();
      await p.keyboard.type("123456");
      assert.equal(await slots.last().inputValue(), "6");
    },
  );
  await browser.close();
  console.log(
    "TOTAL",
    results.length,
    "PASS",
    results.filter((r) => r.status === "pass").length,
    "FAIL",
    results.filter((r) => r.status === "fail").length,
  );
  process.exitCode = results.some((r) => r.status === "fail") ? 1 : 0;
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
