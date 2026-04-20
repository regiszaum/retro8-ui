# Retro8 Quick Start Reference

## Install

```bash
npm install retro8-ui
```

## Imports

Use compiled assets. Tailwind is not required in the consumer project.

### Bundler / ESM

```js
import "retro8-ui/retro8.css";
import "retro8-ui/retro8.js";
```

### CSS-only usage

```js
import "retro8-ui/retro8.css";
```

### Plain HTML

```html
<link rel="stylesheet" href="./node_modules/retro8-ui/dist/retro8.css" />
<script src="./node_modules/retro8-ui/dist/retro8.js" defer></script>
```

## Runtime Guidance

Import `retro8.js` when interactive behavior is needed (for example dropdowns, dialogs, drawers, tabs, collapses, carousels, select-like controls, sliders, input tags, transfer lists, poptips, dismissible feedback).

Keep CSS-only when the request is static layout/styling.
