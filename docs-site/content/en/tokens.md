---
title: Tokens
description: CSS custom properties for colors, spacing, borders, shadows, typography, focus, and motion.
kicker: Foundations
---

Tokens are the CSS custom properties behind Retro8 UI. Components use them to share a visual language without requiring a framework or a theme provider in JavaScript.

The reference below lists the defaults declared in the library stylesheet. It shows dark-theme overrides where they differ from the light defaults. Color swatches follow the theme selected in the documentation. A value such as `var(--r8-color-primary)` refers to another token rather than a fixed color.

## Apply a theme

Set `data-theme="light"` or `data-theme="dark"` on the document root. Dark mode can also be scoped to a container with `data-r8-theme="dark"` or `r8-theme-dark`.

Dark mode updates surfaces and foregrounds together, including pagination summaries,
helper text, and links. Use the `ink`, `ink-muted`, and `ink-subtle` tokens for text
instead of fixed dark colors so it remains readable when the theme changes.

```html
<html lang="en" data-theme="dark">
```

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
