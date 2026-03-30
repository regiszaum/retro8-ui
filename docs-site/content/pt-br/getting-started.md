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

## Preciso de Tailwind?

Nao. Voce nao precisa de Tailwind CSS no projeto que vai usar a `retro8-ui`.

O Tailwind e usado apenas para authoring da library. Quem consome a UI trabalha com os arquivos compilados:

- `retro8.css` ou `retro8.min.css`
- `retro8.js` ou `retro8.min.js` quando houver comportamento interativo

Se a sua aplicacao ja usa Tailwind, tudo bem, mas isso nao e um requisito para a `retro8-ui` funcionar.

## Fluxo de consumo

Para uma integracao normal, o fluxo e:

1. instalar `retro8-ui`
2. importar o CSS compilado
3. adicionar o runtime JS opcional para components interativos
4. usar classes semanticas no markup

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

Quando houver hierarquia visual, prefira combinar uma classe base com modifiers claros, em vez de montar o component com utilities longas no markup final.
