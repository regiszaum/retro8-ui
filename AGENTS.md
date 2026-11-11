# Working on Retro8 UI

## Product and sources of truth

Retro8 UI ships framework-independent CSS and optional browser JavaScript. Nuxt is
the documentation host, not a dependency of the distributed library.

- Author CSS in `src/styles/`; author runtime behavior in `src/scripts/retro8.js`.
- Treat `dist/` as generated output. Rebuild it for source changes; never patch it
  directly. Preserve unrelated user edits, including existing generated changes.
- Public classes use `r8-*`; runtime attributes use `data-r8-*`. Check existing
  implementations before adding or renaming public API.
- Component examples and contracts live in `docs-site/shared/`. Documentation
  content lives in `docs-site/content/en/` and `docs-site/content/pt-br/`.
- See [.codex/references/architecture.md](.codex/references/architecture.md) when
  deciding which files belong to a change.

## Environment and validation

Use the Node version in `.nvmrc` (`nvm install && nvm use`). Install both lockfiles
with `npm ci` and `npm --prefix docs-site ci`. Browser tests also need
`npx playwright install chromium` (CI uses `--with-deps`).

Choose checks using [.codex/references/validation.md](.codex/references/validation.md).
`npm run check` builds the library and runs content and both runtime suites.
Documentation changes also need a generated build; UI and interaction changes need
the relevant browser coverage. Report exactly what ran and any blocked checks.

## Skills

- Use [retro8-ui](.codex/skills/retro8-ui/SKILL.md) for composing consumer interfaces.
- Use [retro8-maintenance](.codex/skills/retro8-maintenance/SKILL.md) for changing
  library components, runtime, tokens, contracts, or bilingual documentation.
- Load only references relevant to the task. Prefer local source for repository
  behavior and official upstream documentation for external APIs.

## Delivery agreement

- Keep the library framework-independent and CSS-first. Preserve semantic HTML,
  keyboard behavior, focus management, disabled states, and initialization
  idempotence when changing interactive components.
- Keep English and Portuguese documentation consistent when public behavior changes.
- Inspect the final diff for generated noise and unrelated changes. Do not revert
  work that existed before the task.
- For dependency fixes, audit both package roots. Document unresolved advisories;
  do not force downgrades or suppress findings to obtain a clean count.
- Respond in the user's language. Explain the result, validation, and material limits.
- **Whenever a response delivers file changes, end it with a ready-to-copy
  Conventional Commit message:** `type(scope): imperative summary`. Use `feat`,
  `fix`, `docs`, `refactor`, `test`, `build`, `ci`, `perf`, or `chore`; choose scope
  from the change (for example `runtime`, `styles`, `docs`, `deps`, `harness`).
  Use `!` and a `BREAKING CHANGE:` explanation for breaking public API changes.
  Provide a message for each independent change when appropriate. This requests a
  suggested message, not an automatic git commit, push, release, or deployment.
