---
title: Quick start
description: Instale a library, importe CSS + JS e use classes `r8-*` com HTML curto e previsivel.
kicker: Guide
---

O fluxo principal da `retro8-ui` continua simples:

1. instale o pacote
2. importe `retro8.css`
3. importe `retro8.js` quando precisar de comportamento interativo
4. escreva semantic HTML usando classes como `r8-btn`, `r8-panel` e `r8-window`

Essa abordagem funciona em HTML puro, React, Vue, Nuxt, Astro, Laravel e qualquer stack que aceite CSS.

```html
<button class="r8-btn r8-btn--primary" type="button">
  Start mission
</button>
```

Quando houver hierarquia visual, prefira combinar uma classe base com modifiers claros, em vez de montar o component com utilities longas no markup final.
