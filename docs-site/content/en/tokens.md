---
title: Tokens
description: CSS custom properties for colors, spacing, borders, shadows, typography, focus, and motion.
kicker: Foundations
---

Tokens are the CSS custom properties behind Retro8 UI. Components use them to share a visual language without requiring a framework or a theme provider in JavaScript.

The reference below lists the defaults declared in the library stylesheet. It shows dark-theme overrides where they differ from the light defaults. Color swatches follow the theme selected in the documentation. A value such as `var(--r8-color-primary)` refers to another token rather than a fixed color.

## Customize your brand colors

Like Bootstrap's semantic colors, you can redefine `primary`, `success`, `danger`, and the other palette roles. Retro8 UI uses native CSS custom properties: no Sass, Tailwind, JavaScript, or library rebuild is required.

Create a `theme.css` and load it **after** the library stylesheet. Choose the HTML or bundler import approach for your project.

```html
<link rel="stylesheet" href="./node_modules/retro8-ui/dist/retro8.css" />
<link rel="stylesheet" href="./theme.css" />
```

```js
import "retro8-ui/retro8.css";
import "./theme.css";
```

Each color has three tokens. The base color fills buttons, badges, and other components; `-strong` is used in details and variants; `-contrast` defines text on the base color. Changing the base alone does not calculate the other two automatically.

| Role | Base token | Component example |
| --- | --- | --- |
| Primary | `--r8-color-primary` | `r8-btn--primary` |
| Secondary | `--r8-color-secondary` | `r8-btn--secondary` |
| Tertiary | `--r8-color-tertiary` | `r8-badge--tertiary` |
| Success | `--r8-color-success` | `r8-btn--success` |
| Warning | `--r8-color-warning` | `r8-alert--warning` |
| Error or destructive action | `--r8-color-danger` | `r8-btn--danger` |
| Information | `--r8-color-info` | `r8-badge--info` |
| Dark surface | `--r8-color-dark` | `r8-btn--dark` |
| Light surface | `--r8-color-light` | `r8-btn--light` |

A global palette example:

```css
/* theme.css */
:root {
  --r8-color-primary: #7c3aed;
  --r8-color-primary-strong: #6d28d9;
  --r8-color-primary-contrast: #ffffff;

  --r8-color-success: #0f766e;
  --r8-color-success-strong: #115e59;
  --r8-color-success-contrast: #ffffff;

  --r8-color-danger: #be123c;
  --r8-color-danger-strong: #9f1239;
  --r8-color-danger-contrast: #ffffff;
}
```

```html
<button class="r8-btn r8-btn--primary">Continue</button>
<button class="r8-btn r8-btn--success">Confirm</button>
<button class="r8-btn r8-btn--danger">Delete</button>
```

Keep the same classes: components now use your brand colors. These global values continue to apply when switching themes. To use a different dark palette, append the following block after the global one.

### Customize the dark theme

```css
:root[data-theme="dark"] {
  --r8-color-primary: #c4b5fd;
  --r8-color-primary-strong: #a78bfa;
  --r8-color-primary-contrast: #2e1065;

  --r8-color-success: #5eead4;
  --r8-color-success-strong: #2dd4bf;
  --r8-color-success-contrast: #042f2e;

  --r8-color-danger: #fda4af;
  --r8-color-danger-strong: #fb7185;
  --r8-color-danger-contrast: #4c0519;

  --r8-color-bg: #09051a;
  --r8-color-surface: #171029;
  --r8-color-surface-2: #241a3b;
  --r8-color-surface-3: #35264f;
  --r8-color-ink: #faf5ff;
  --r8-color-ink-muted: #e9d5ff;
  --r8-color-ink-subtle: #d8b4fe;
  --r8-color-border: #d8b4fe;
}
```

`bg` controls the page background; `surface`, `surface-2`, and `surface-3` control surfaces; `ink`, `ink-muted`, and `ink-subtle` control text; `border` controls borders. Use these tokens in your application's own layout too:

```css
body {
  background: var(--r8-color-bg);
  color: var(--r8-color-ink);
}
```

The library does not set your application's `body` background. When choosing custom colors, check text and background contrast in both themes, including variants and focus states.

## Apply a theme

Set `data-theme="light"` or `data-theme="dark"` on the document root. For a local theme, use `data-r8-theme="light"` / `data-r8-theme="dark"` or the `r8-theme-light` / `r8-theme-dark` classes. A light area can live inside a dark page, and vice versa.

Dark mode updates surfaces and foregrounds together, including pagination summaries,
helper text, and links. Use the `ink`, `ink-muted`, and `ink-subtle` tokens for text
instead of fixed dark colors so it remains readable when the theme changes.

```html
<html lang="en" data-theme="dark">
```

Switch themes in JavaScript without reloading the page:

```js
document.documentElement.dataset.theme = "dark";
// Switch back to the light theme:
document.documentElement.dataset.theme = "light";
```

For a light panel inside a dark page:

```html
<section class="r8-panel" data-r8-theme="light">
  <div class="r8-panel__body">This panel uses the light palette.</div>
</section>
```

An explicit theme scope starts with that theme's defaults. To customize it,
declare your tokens on that container, for example `.checkout[data-r8-theme="light"]`.

The Theme Switch component changes its own state and emits `r8:binary-change`. Your application must use that event to apply the theme attribute and, if needed, save the preference.

## Override tokens locally

Load your overrides after `retro8.css`. Apply them to the document root for a global change or to a container for a local change:

```css
.mission-panel {
  --r8-color-primary: #1d4ed8;
  --r8-color-primary-strong: #1e40af;
  --r8-color-primary-contrast: #ffffff;
  --r8-color-accent: var(--r8-color-primary);
  --r8-color-accent-strong: var(--r8-color-primary-strong);
  --r8-color-accent-contrast: var(--r8-color-primary-contrast);
}
```

Re-declare the legacy `accent` aliases in the same scope when changing `primary`, so components using either name stay consistent. Override foreground and background colors together and check contrast in both themes. The Config Provider component offers local theme and density presets.

## Foundation and component variables

Foundation tokens affect shared styles. Component variables, such as `--r8-dialog-width`, target one component family. Their defaults may refer to foundation tokens, and modifiers can override them. Set component variables on the component itself when its base class declares a default there.

Motion tokens are reduced automatically when the user requests reduced motion. Loading and other animated components also include reduced-motion styles.
