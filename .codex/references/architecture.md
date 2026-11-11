# Architecture and change map

| Concern | Source of truth | Follow-through |
| --- | --- | --- |
| Theme tokens | `src/styles/base/tokens.css` | `docs-site/shared/theme-tokens.ts`, both token guides |
| Component appearance | `src/styles/components/` | `src/styles/index.css` imports, catalog preview, API contracts |
| Layout helpers | `src/styles/utilities/layout.css` | layout examples and contracts |
| Browser behavior | `src/scripts/retro8.js` | catalog markup, keyboard/state regression in `tests/runtime.cjs` |
| Component definitions/examples | `docs-site/shared/component-catalog.ts` | `component-contracts.ts`, both locales |
| Component API descriptions | `docs-site/shared/component-contracts.ts` | real CSS selectors and runtime attributes |
| Docs shell and routing | `docs-site/app/`, `docs-site/nuxt.config.ts` | both locales, base path, light/dark themes |
| Guides | `docs-site/content/en/`, `docs-site/content/pt-br/` | paired locale, routes in `docs-site/app/utils/docs-routing.ts` |
| Package exports | root `package.json`, `scripts/build-js.mjs` | four generated CSS/JS assets and package contents |

## Invariants

- Tailwind is an authoring tool. Consumers must not need Tailwind or Vue to use
  the shipped assets. Keep preflight disabled as configured.
- Reuse existing custom properties for colors, spacing, borders and shadows.
  Token documentation is checked against actual CSS by `tests/content.cjs`.
- Runtime must support repeated initialization and dynamically mounted content.
  Preserve the opt-out `window.Retro8UIAutoInit = false` and the public
  `window.Retro8UI.init(document)` integration for hydration-aware hosts.
- Nuxt 4's `~` resolves inside `docs-site/app/`. The library stylesheet is
  `~/../../dist/retro8.css`; plain `../dist/retro8.css` is resolved as a module ID.
- Keep documentation compatible with `NUXT_APP_BASE_URL` for GitHub Pages.
- Root and docs-site are separate npm projects with separate lockfiles. Root
  library engine support is broader than the docs toolchain's supported Node range.

## External references

Consult these for the matching task rather than copying their manuals into skills:

- [Codex repository instructions](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [Agent skills and discovery](https://learn.chatgpt.com/docs/build-skills)
- [Nuxt documentation](https://nuxt.com/docs/4.x/getting-started/introduction)
- [Playwright documentation](https://playwright.dev/docs/library)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
