# Validation by change

Run commands from the repository root with the Node version in `.nvmrc`.

| Change | Required evidence |
| --- | --- |
| Instructions or skill references | Check referenced paths, validate changed skills, `git diff --check` |
| CSS, tokens, component contracts, runtime | `npm run check` |
| Documentation content, shell, routing or dependencies | `npm run build:docs` and `npm run test:content` |
| UI, keyboard behavior, focus, themes, responsive layout | Relevant runtime tests plus docs browser audit below |
| Package/build tooling | `npm run check`, `npm pack --dry-run` |
| Dependencies | `npm audit`, `npm --prefix docs-site audit`, and checks for the affected project |

## Library checks

```bash
npm run check
```

This builds all distribution files, validates content contracts, then tests the
source runtime and minified runtime in Chromium. Both runtime suites load the
compiled stylesheet. Rebuild after source changes before running them separately.

## Documentation browser audit

In one terminal:

```bash
npm run build
npm --prefix docs-site run dev -- --port 3100
```

In another terminal:

```bash
npm run test:docs
```

The suite covers every component page, the home page and all guides in both
languages at four viewport widths. Axe checks the whole page in both themes,
including the docs shell and playgrounds, excluding the injected Nuxt developer
toolbar. `R8_AUDIT_URL` overrides the default
`http://127.0.0.1:3100`. Reports go to `/tmp/retro8-audit-reproduction` unless
`R8_AUDIT_OUTPUT` is set. Source and minified runtime suites both write
`behavior.json`; use separate output directories if retaining both reports.

`npm run build:docs` checks static generation. When touching deployment paths,
also generate with `NUXT_APP_BASE_URL=/retro8-ui/` and verify nested assets/routes.

## Skills

Use the `skill-creator` validator when available:

```bash
python3 /path/to/skill-creator/scripts/quick_validate.py .codex/skills/retro8-maintenance
```

Also follow every relative reference and exercise changed executable helpers.
Frontmatter validation alone does not establish that instructions are useful.
For behavior evaluation, try a realistic request and check the resulting diff,
chosen validation, and Conventional Commit message against `AGENTS.md`.
