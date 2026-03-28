---
title: Quick start
description: Install the library, import CSS + JS and use `r8-*` classes with short, predictable HTML.
kicker: Guide
---

The main `retro8-ui` flow stays simple:

1. install the package
2. import `retro8.css`
3. import `retro8.js` when interactive behavior is needed
4. write semantic HTML with classes like `r8-btn`, `r8-panel` and `r8-window`

That approach works in plain HTML, React, Vue, Nuxt, Astro, Laravel and any stack that accepts CSS.

```html
<button class="r8-btn r8-btn--primary" type="button">
  Start mission
</button>
```

Whenever you need hierarchy, combine a base class with clear modifiers instead of assembling the final component with long utility strings.
