---
title: Inicio rapido
description: Instale a library, importe o CSS e use classes `r8-*` com HTML curto e previsivel.
kicker: Guia
---

O fluxo principal da `retro8-ui` continua simples:

1. instale o pacote
2. importe `retro8.css`
3. escreva HTML semantico usando classes como `r8-btn`, `r8-panel` e `r8-window`

Essa abordagem funciona em HTML puro, React, Vue, Nuxt, Astro, Laravel e qualquer stack que aceite CSS.

```html
<button class="r8-btn r8-btn--primary" type="button">
  Start mission
</button>
```

Quando houver hierarquia visual, prefira combinar uma classe base com modificadores claros, em vez de montar o componente com utilities longas no markup final.
