---
title: Component catalog
description: Explore components by category, with live previews, copyable markup, API tables, and accessibility guidance.
kicker: Components
---

Choose a component from the grouped catalog below. Counts are calculated from the current catalog, including the native Retro8 UI extras.

Each page includes a live preview, markup examples, styling hooks, and accessibility notes. Where supported, it also documents HTML attributes, `data-r8-*` options, CSS variables, runtime methods, and events.

## Styling and behavior

Import `retro8-ui/retro8.css` for styling. Import `retro8-ui/retro8.js` when you want the built-in interactions. The classes work with plain HTML and with frameworks; framework wrappers are not required.

CSS alone does not activate tabs, custom selectors, or modal focus management. In applications that hydrate server-rendered HTML, initialize the runtime after hydration. `Retro8UI.init(root)` initializes the supplied element and its descendants; `Retro8UI.refresh(root)` is an alias. Both return the processed root. Repeated calls do not duplicate existing bindings, but they do not recreate every component or make every attribute reactive.

## Read the examples

API identifiers and code syntax are the same in both documentation languages. Attribute defaults refer to native HTML or the runtime as noted. CSS defaults can change with modifiers, themes, and local overrides.

The examples demonstrate composition. Your application supplies routing, form submission, theme persistence, and network requests. Upload provides local file selection and previews; file validation and transfer belong to your application. A watermark identifies content visually and does not prevent copying.
