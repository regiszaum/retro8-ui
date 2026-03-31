---
title: Quick start
description: Install the library, import CSS + JS and use `r8-*` classes with short, predictable HTML.
kicker: Guide
---

The main `retro8-ui` flow stays simple:

1. install the package
2. import `retro8.css`
3. import `retro8.js`
4. write semantic HTML with classes like `r8-btn`, `r8-panel` and `r8-window`

That approach works in plain HTML, React, Vue, Nuxt, Astro, Laravel and any stack that accepts CSS.

## Do I need Tailwind?

No. You do not need Tailwind CSS in the project that uses `retro8-ui`.

Tailwind is used only to author the library source. Consumers work with the compiled outputs:

- `retro8.css` or `retro8.min.css`
- `retro8.js` or `retro8.min.js`

If your application already uses Tailwind, that is fine, but it is not required for `retro8-ui` to work.

## Consumer flow

For a normal integration, the flow is:

1. install `retro8-ui`
2. import the compiled CSS
3. add the JS runtime for interactive components
4. use semantic classes in your markup

```html
<link rel="stylesheet" href="./node_modules/retro8-ui/dist/retro8.css" />
<script src="./node_modules/retro8-ui/dist/retro8.js" defer></script>
```

```js
import "retro8-ui/retro8.css";
import "retro8-ui/retro8.js";
```

```html
<button class="r8-btn r8-btn--primary" type="button">
  Start mission
</button>
```

Whenever you need hierarchy, combine a base class with clear modifiers instead of assembling the final component with long utility strings.
