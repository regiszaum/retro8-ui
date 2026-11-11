---
name: retro8-maintenance
description: Maintain this Retro8 UI repository's CSS, browser runtime, component contracts, tokens, and bilingual Nuxt documentation. Use for library changes and regression fixes; use retro8-ui instead when only composing a consumer interface.
---

# Retro8 Maintenance

Read the repository `AGENTS.md` for environment, validation, and delivery rules.

## Locate the change

Use [the architecture map](../../references/architecture.md) to locate canonical
source and affected contracts. Inspect the actual component CSS, runtime handlers,
and catalog example before editing. Keep a public API change consistent across
source, examples, API descriptions and the two documentation locales.

## Implement and verify

- Edit source, then rebuild generated assets. Keep consumer CSS framework-independent.
- Reuse the established tokens and semantic `r8-*`/`data-r8-*` API.
- For runtime changes, verify keyboard and pointer behavior, disabled states,
  focus restoration and repeated initialization where relevant. Add a regression
  for the observable bug to `tests/runtime.cjs`; it also runs against minified JS.
- For docs changes, respect Nuxt's app directory aliases and deployment base path.
  Use the local catalog/contracts rather than inventing API entries.
- Choose evidence from [the validation matrix](../../references/validation.md).
  Report failures and missing prerequisites accurately.
- Finish file-changing responses with the Conventional Commit message required by
  `AGENTS.md`, scoped to the actual final change.
