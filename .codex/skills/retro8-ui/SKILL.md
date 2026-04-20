---
name: retro8-ui
description: Design and implement interfaces with retro8-ui semantic classes (`r8-*`) and optional runtime behavior. Use when requests mention retro8-ui, `r8-` classes, retro 8-bit UI composition, migrating utility-heavy markup to semantic classes, or building screens/components guided by Retro8 documentation.
---

# Retro8 UI

## Overview

Implement or refactor UI using `retro8-ui` semantic markup, predictable class composition, and docs-backed component patterns.

Use this skill to produce production-ready UI patches with correct imports, valid `r8-*` classes, and optional runtime wiring for interactive components.

## Workflow

1. Confirm project context.
- Inspect `package.json`, existing imports, and current markup.
- Detect whether `retro8-ui` is already installed and whether CSS/JS is already wired.
- Install or import only when missing and required by the user request.

2. Choose components from official docs.
- Map user intent to component IDs before writing markup.
- Read `references/component-index.md` for route patterns and IDs.
- In this repository, prefer local source of truth: `docs-site/shared/component-catalog.ts` and `docs-site/shared/component-contracts.ts`.

3. Compose semantic markup.
- Prefer semantic HTML first (`button`, `nav`, `dialog`, `label`, `table`, and similar).
- Compose classes as: base + optional modifiers + optional inner elements.
- Keep consumer HTML short and readable; avoid utility-heavy class strings when `r8-*` classes already cover the need.

4. Add runtime only when behavior is required.
- For static styling, keep CSS-only usage.
- For interactive behaviors (for example dropdown, dialog, drawer, tabs, collapses), ensure runtime import exists.
- Follow documented `data-r8-*` patterns from component docs/examples instead of inventing event APIs.

5. Validate before finalizing.
- Verify class names exist in documentation or source (`dist/retro8.css` or `src/styles/components/*`).
- Keep accessibility intact (`aria-*`, focus visibility, landmark usage, button/link semantics).
- Summarize assumptions and tradeoffs when requirements are ambiguous.

## Output Rules

- Return concrete file edits, not abstract design notes.
- Prefer minimal diffs that fit the current codebase structure.
- Preserve existing design language unless the user asks for a broader visual overhaul.
- If a requested component pattern is unclear, check docs first and then implement.

## References

- Read `references/quick-start.md` when setup/import decisions are needed.
- Read `references/authoring-rules.md` when deciding markup/class conventions.
- Read `references/component-index.md` when selecting components or doc routes.
