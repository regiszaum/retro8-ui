import { mkdir, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { componentOrder, getComponentById, getSiteContent, localeMeta } from "./site-data.mjs";

const playgroundDir = fileURLToPath(new URL("./", import.meta.url));
const locales = Object.keys(localeMeta);

await Promise.all(
  locales.map(async (locale) => {
    await rm(path.join(playgroundDir, locale), { recursive: true, force: true });
  }),
);

for (const locale of locales) {
  const site = getSiteContent(locale);
  await writePage(
    path.join(playgroundDir, locale, "index.html"),
    renderHtml({
      locale,
      pageKind: "home",
      title: `${site.meta.title} - ${site.home.heroTitle}`,
      description: site.meta.description,
    }),
  );

  for (const componentId of componentOrder) {
    const component = getComponentById(locale, componentId);
    await writePage(
      path.join(playgroundDir, locale, "components", componentId, "index.html"),
      renderHtml({
        locale,
        pageKind: "component",
        componentId,
        title: `${component.name} - ${site.meta.title}`,
        description: component.summary,
      }),
    );
  }
}

function renderHtml({ locale, pageKind, componentId = "", title, description }) {
  const localeInfo = localeMeta[locale];
  const componentAttr = componentId ? ` data-component-id="${componentId}"` : "";

  return `<!doctype html>
<html lang="${localeInfo.htmlLang}" data-locale="${locale}" data-page-kind="${pageKind}"${componentAttr}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapeAttribute(description)}" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/main.js"></script>
  </body>
</html>
`;
}

async function writePage(targetPath, contents) {
  await mkdir(path.dirname(targetPath), { recursive: true });
  await writeFile(targetPath, contents, "utf8");
}

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll('"', "&quot;");
}
