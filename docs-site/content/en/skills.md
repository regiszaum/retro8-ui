---
title: skills
description: Practical guide to structure AI skills with Retro8 UI context and reduce ambiguity in automation workflows.
kicker: AI docs
---

This page summarizes how to use `skills` to guide AI assistants in the Retro8 UI ecosystem.

Use skills when you need more consistent answers for repeatable tasks, such as generating markup, reviewing accessibility, or explaining API conventions.

- Suggested scope: components, tokens, accessibility, and contribution rules.
- Recommended format: short instructions, real context, and explicit boundaries.
- Maintenance: update skills whenever components or docs evolve.

## Relation to llms.txt

- [`/llms.txt`](/llms.txt) provides a route map for automated ingestion.
- This page explains how to turn that context into practical rules for assistants.
- Use both together to guide agents with official links and clear instructions.

## Best practices

1. Keep one skill per objective (for example: markup generation, accessibility review, API docs).
2. Reference concrete paths and official sources to reduce ambiguity.
3. Version skills in the same release flow as the documentation.

## Example skill

Use the template below as a starting point for a real `SKILL.md` file.

```md
---
name: retro8-a11y-review
description: Review Retro8 UI markup for accessibility issues and propose minimal, production-ready fixes. Use when users ask for accessibility audits, ARIA improvements, keyboard navigation checks, or semantic HTML validation.
---

# Retro8 Accessibility Review

## Overview

Audit UI markup that uses `r8-*` classes and return concrete fixes for accessibility, without changing visual identity unless required.

## Workflow

1. Gather context.
- Inspect target files and identify interactive elements (`button`, `a`, `input`, `dialog`, menu triggers).
- Map each element to its expected keyboard and screen-reader behavior.

2. Validate semantics and labels.
- Ensure native elements are used when possible.
- Check visible and accessible names (`label`, `aria-label`, `aria-labelledby`).
- Flag invalid role usage or missing landmark structure.

3. Validate interaction contracts.
- Verify focus order and focus visibility.
- Check keyboard access for toggles, menus, dialogs, and tabs.
- Confirm state attributes such as `aria-expanded`, `aria-controls`, and `aria-selected`.

4. Propose minimal fixes.
- Prefer small diffs over rewrites.
- Keep existing `r8-*` class structure unless it blocks accessibility.
- Include short rationale for each fix.

## Output Rules

- Report findings by severity: critical, major, minor.
- Reference file paths and line numbers when possible.
- Provide patch-ready code suggestions.
```
