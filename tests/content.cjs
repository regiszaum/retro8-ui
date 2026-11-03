const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const postcss = require("postcss");
require("tsx/cjs");
const {
  componentCatalog,
  componentGroups,
  coreComponentCount,
} = require("../docs-site/shared/component-catalog.ts");
const {
  getComponentContract,
} = require("../docs-site/shared/component-contracts.ts");
const { extractThemeTokens } = require("../docs-site/shared/theme-tokens.ts");
const root = path.resolve(__dirname, "..");
const base = fs.readFileSync(
  path.join(root, "src/styles/base/tokens.css"),
  "utf8",
);
const sources = [
  base,
  ...fs
    .readdirSync(path.join(root, "src/styles/components"))
    .map((file) =>
      fs.readFileSync(path.join(root, "src/styles/components", file), "utf8"),
    ),
];
const defaults = new Map();
const declarations = new Set();
const references = new Set();
function addDefault(name, value) {
  if (!defaults.has(name)) defaults.set(name, new Set());
  defaults.get(name).add(value);
}
for (const source of sources) {
  postcss.parse(source).walkDecls((decl) => {
    if (decl.prop.startsWith("--r8-")) {
      declarations.add(decl.prop);
      addDefault(decl.prop, decl.value);
    }
    for (const match of decl.value.matchAll(/var\((--r8-[\w-]+)(\s*,)?/g)) {
      references.add(match[1]);
      if (!match[2]) continue;
      let depth = 1;
      let end = match.index + match[0].length;
      const start = end;
      for (; end < decl.value.length; end++) {
        if (decl.value[end] === "(") depth++;
        if (decl.value[end] === ")" && --depth === 0) break;
      }
      addDefault(match[1], decl.value.slice(start, end).trim());
    }
  });
}

test("theme reference includes every light token and the real dark overrides", () => {
  const tokens = extractThemeTokens(base);
  const rootRule = postcss
    .parse(base)
    .nodes.find((node) => node.type === "atrule")
    .nodes.find((node) => node.selector === ":root");
  assert.equal(
    tokens.length,
    rootRule.nodes.filter(
      (node) => node.type === "decl" && node.prop.startsWith("--r8-"),
    ).length,
  );
  assert.equal(new Set(tokens.map((token) => token.token)).size, tokens.length);
  assert.deepEqual(
    tokens.find((token) => token.token === "--r8-color-primary"),
    { token: "--r8-color-primary", value: "#2563eb", darkValue: "#38bdf8" },
  );
  assert.equal(
    tokens.find((token) => token.token === "--r8-motion-step").value,
    "90ms",
  );
  assert.equal(
    tokens.find((token) => token.token === "--r8-space-4").darkValue,
    "0.75rem",
  );
});

test("every CSS token reference resolves to a declaration or a fallback", () => {
  for (const token of references)
    assert.ok(
      defaults.has(token),
      `Undefined token without a fallback: ${token}`,
    );
});

test("documented component variables are individual, real CSS properties with accurate defaults", () => {
  for (const component of componentCatalog) {
    for (const token of getComponentContract(component).cssVariables) {
      assert.match(
        token.name,
        /^--r8-[a-z0-9-]+$/,
        `${component.id}: grouped or invalid variable name`,
      );
      assert.ok(
        defaults.has(token.name),
        `${component.id}: unknown ${token.name}`,
      );
      if (token.defaultValue === "inherited from theme") continue;
      assert.ok(
        defaults.get(token.name).has(token.defaultValue),
        `${component.id}: ${token.name} default ${token.defaultValue} disagrees with CSS (${[...defaults.get(token.name)].join(" | ")})`,
      );
    }
  }
});

test("component-specific API descriptions override generic fallback rows", () => {
  const loading = getComponentContract(
    componentCatalog.find((component) => component.id === "loading"),
  );
  assert.equal(
    loading.attributes.find((row) => row.name === "aria-label").defaultValue,
    "recommended when there is no visible label",
  );
});

test("documented selectors and native defaults match their actual API", () => {
  const contract = (id) =>
    getComponentContract(
      componentCatalog.find((component) => component.id === id),
    );
  assert.equal(
    contract("dialog").dataAttributes.find(
      (row) => row.name === "data-r8-toggle",
    ).type,
    '"dialog"',
  );
  assert.equal(
    contract("drawer").dataAttributes.find(
      (row) => row.name === "data-r8-toggle",
    ).type,
    '"drawer"',
  );
  assert.match(
    contract("button").attributes.find((row) => row.name === "type")
      .defaultValue,
    /submit/,
  );
  assert.match(
    contract("image").attributes.find((row) => row.name === "loading")
      .defaultValue,
    /eager/,
  );
  for (const id of ["radio", "switch", "theme-switch"])
    assert.ok(
      !contract(id)
        .attributes.find((row) => row.name === "aria-checked")
        .type.includes("mixed"),
    );
  assert.match(
    contract("checkbox").attributes.find((row) => row.name === "aria-checked")
      .type,
    /mixed/,
  );
  assert.match(
    contract("tabs").methods.find((row) => row.name === "Retro8UI.init")
      .signature,
    /=> Document \| HTMLElement/,
  );
});

test("both languages have complete catalog copy and counts use the catalog", () => {
  assert.equal(
    coreComponentCount,
    componentCatalog.filter((component) => component.core !== false).length,
  );
  for (const locale of ["en", "pt-br"]) {
    for (const group of componentGroups)
      assert.ok(group.title[locale] && group.description[locale]);
    for (const component of componentCatalog) {
      assert.ok(
        component.summary[locale],
        `${component.id}: missing ${locale} summary`,
      );
      const contract = getComponentContract(component);
      for (const entry of Object.values(contract).flat())
        assert.ok(
          entry.description[locale],
          `${component.id}: missing ${locale} API description`,
        );
    }
    const guide = fs.readFileSync(
      path.join(root, `docs-site/content/${locale}/components.md`),
      "utf8",
    );
    assert.doesNotMatch(guide, /\b50\b/);
    assert.match(guide, /Retro8UI\.init/);
    const tokens = fs.readFileSync(
      path.join(root, `docs-site/content/${locale}/tokens.md`),
      "utf8",
    );
    assert.match(tokens, /data-theme="dark"/);
    assert.match(tokens, /r8:binary-change/);
  }
});

test("examples use implemented loader elements and make theme ownership explicit", () => {
  const loading = componentCatalog.find(
    (component) => component.id === "loading",
  );
  assert.doesNotMatch(
    loading.preview + loading.code + loading.classes.join(" "),
    /r8-loading--(?:dots|bar|equalizer|spinner|ticker|radar|beacon)\b/,
  );
  const theme = componentCatalog.find(
    (component) => component.id === "theme-switch",
  );
  assert.match(theme.code, /addEventListener\("r8:binary-change"/);
  assert.match(theme.code, /documentElement.dataset.theme/);
});

test("catalog API class names match CSS or the runtime schema", () => {
  const code =
    sources.join("\n") +
    fs.readFileSync(path.join(root, "src/scripts/retro8.js"), "utf8");
  for (const component of componentCatalog) {
    for (const entry of [
      ...component.classes,
      ...(component.api || []).map((item) => item.name),
    ]) {
      for (const match of entry.matchAll(/(?<![-\w])(r8-[a-z0-9_-]+)/g))
        assert.ok(
          code.includes(match[1]),
          `${component.id}: ${match[1]} is not implemented`,
        );
    }
  }
});
