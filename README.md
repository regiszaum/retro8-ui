# retro8-ui

`retro8-ui` e uma biblioteca de UI retro 8-bit feita com HTML + CSS, authorada com Tailwind CSS, mas distribuida como CSS compilado e classes semanticas. O foco da v1 e entregar uma base visual forte, reutilizavel e realmente framework-agnostic.

## Objetivo

- Entregar componentes com API publica baseada em classes `r8-*`
- Permitir uso em HTML puro, Vue, Nuxt, React, Next, Astro, Laravel e afins
- Evitar que o consumidor dependa de utility classes gigantes no markup
- Manter a authoring experience em Tailwind, com tokens e camadas organizadas
- Gerar CSS final pronto para importacao em `dist/retro8.css` e `dist/retro8.min.css`

## Caracteristicas

- Sem dependencias de framework de UI
- Sem runtime JavaScript obrigatorio
- Preflight do Tailwind desativado para reduzir impacto global no projeto consumidor
- Design tokens em CSS Custom Properties
- Componentes organizados por arquivo e por responsabilidade
- Estados visuais retro com bordas grossas, sombras duras e deslocamento em hover/active
- Foco visivel, contraste consistente e estados `disabled`

## Estrutura

```text
retro8-ui/
├── dist/
├── docs/
├── docs-site/
├── examples/
├── src/
│   └── styles/
│       ├── base/
│       ├── components/
│       ├── utilities/
│       └── index.css
├── package.json
├── postcss.config.cjs
├── tailwind.config.cjs
└── README.md
```

## Instalacao

Para desenvolver a library localmente:

```bash
npm install
```

Para usar a library em outro projeto publicado no npm, a ideia de consumo e:

```bash
npm install retro8-ui
```

## Scripts

```bash
npm run build
```

Gera:

- `dist/retro8.css`
- `dist/retro8.min.css`

```bash
npm run dev
```

Roda em paralelo:

- watch do CSS da library
- docs publica em Nuxt

```bash
npm run build:docs
```

Gera:

- `dist/retro8.css`
- `dist/retro8.min.css`
- `docs-site/.output/public`

```bash
npm run preview
```

Faz preview da documentacao visual buildada.

## Docs UI

Ao rodar `npm run dev`, o app em [`docs-site`](/home/regiszaum/Projects/tudonovo/docs-site) sobe como a documentacao publica da library:

- docs bilingue em `pt-br` e `en`
- uma pagina real por componente
- dark mode e light mode com persistencia local
- sidebar com navegacao por catalogo e guias
- quick start
- tokens de design
- overview de componentes
- pagina individual para cada componente com preview, API, notas de uso e snippet HTML
- fonte pixel local (`Press Start 2P`) empacotada no build da docs
- secao de ecossistema recomendando um pacote externo de icones 8-bit, sem acoplar isso na library
- geracao estatica em `docs-site/.output/public`

## Como usar

### HTML puro

```html
<link rel="stylesheet" href="./node_modules/retro8-ui/dist/retro8.css" />

<button class="r8-btn r8-btn--primary">Start Game</button>
```

### React / Next / Vite

```js
import "retro8-ui/retro8.css";
```

```jsx
export function Example() {
  return <button className="r8-btn r8-btn--danger">Delete Save</button>;
}
```

### Vue / Nuxt

```js
import "retro8-ui/retro8.css";
```

```vue
<button class="r8-btn r8-btn--success">Confirmar</button>
```

### Laravel / Blade

```blade
<link rel="stylesheet" href="{{ asset('vendor/retro8-ui/retro8.css') }}">

<div class="r8-panel">
  <div class="r8-panel__body">Conteudo retro</div>
</div>
```

## Convencao de nomenclatura

- Prefixo global: `r8-`
- Bloco: `r8-btn`, `r8-window`, `r8-navbar`
- Modificador: `r8-btn--danger`, `r8-badge--success`
- Elemento interno: `r8-window__titlebar`, `r8-panel__footer`

Essa convencao deixa a API previsivel, facil de documentar e simples de expandir.

## Componentes da v1

- Button
- Input
- Panel / Card
- Window
- Badge
- Dialog
- Divider
- Tabs visuais
- Progress bar
- Navbar retro simples

## Exemplo rapido

```html
<section class="r8-panel">
  <div class="r8-panel__header">
    <h2 class="r8-panel__title">Pilot Profile</h2>
  </div>

  <div class="r8-panel__body r8-stack">
    <label class="r8-field">
      <span class="r8-label">Callsign</span>
      <input class="r8-input" type="text" placeholder="PIX-07" />
    </label>

    <div class="r8-row">
      <span class="r8-badge r8-badge--info">online</span>
      <button class="r8-btn r8-btn--primary">Salvar</button>
      <button class="r8-btn r8-btn--ghost">Cancelar</button>
    </div>
  </div>
</section>
```

## Tokens de design

Os tokens principais vivem em [`src/styles/base/tokens.css`](/home/regiszaum/Projects/tudonovo/src/styles/base/tokens.css) e cobrem:

- cores
- spacing
- bordas
- sombras
- tipografia
- foco
- movimento interativo

Todos os componentes consomem esses tokens, o que ajuda a manter consistencia visual e facilita futuras themes/skins.

## Exemplos e docs

- Showcase em HTML puro: [`examples/index.html`](/home/regiszaum/Projects/tudonovo/examples/index.html)
- Exemplo de dashboard: [`examples/dashboard.html`](/home/regiszaum/Projects/tudonovo/examples/dashboard.html)
- App da docs em Nuxt: [`docs-site`](/home/regiszaum/Projects/tudonovo/docs-site)
- Shell principal da docs: [`docs-site/app/components/docs/DocsShell.vue`](/home/regiszaum/Projects/tudonovo/docs-site/app/components/docs/DocsShell.vue)
- Conteudo markdown da docs: [`docs-site/content`](/home/regiszaum/Projects/tudonovo/docs-site/content)
- Catalogo bilingue de componentes: [`docs-site/app/utils/docs-data.ts`](/home/regiszaum/Projects/tudonovo/docs-site/app/utils/docs-data.ts)
- Documentacao inicial: [`docs/index.md`](/home/regiszaum/Projects/tudonovo/docs/index.md)

## Rotas da docs

As paginas da docs agora sao servidas por Nuxt com prerender estatico. O texto guia fica em [`docs-site/content`](/home/regiszaum/Projects/tudonovo/docs-site/content) e os metadados/component previews em [`docs-site/app/utils/docs-data.ts`](/home/regiszaum/Projects/tudonovo/docs-site/app/utils/docs-data.ts).

- `/{locale}/`
- `/{locale}/getting-started`
- `/{locale}/tokens`
- `/{locale}/icons`
- `/{locale}/components`
- `/{locale}/components/{component}/`

Exemplos:

- `/pt-br/`
- `/en/`
- `/pt-br/getting-started/`
- `/en/tokens/`
- `/pt-br/components/button/`
- `/en/components/dialog/`

## Pacote opcional de icones

A `retro8-ui` continua sem pacote de icones embutido. Para combinar com a estetica 8-bit sem misturar responsabilidades, a docs recomenda:

- Pixelarticons: [`pixelarticons.com`](https://pixelarticons.com/)
- Repositorio oficial: [`halfmage/pixelarticons`](https://github.com/halfmage/pixelarticons)

Como alternativa secundaria, a docs tambem referencia o HackerNoon Pixel Icon Library, mas com observacao de licenciamento na camada free.

## Decisoes arquiteturais

- O produto principal e CSS compilado, nao componentes JavaScript.
- Tailwind fica restrito a authoring, com `@layer` e `@apply`.
- O build usa PostCSS + Tailwind + Autoprefixer + cssnano.
- A documentacao publica roda em Nuxt, mas a library continua framework-agnostic e CSS-first.
- O app da docs usa i18n por prefixo de rota, tema claro/escuro e prerender para gerar paginas estaticas reais por idioma e componente.
- A library evita resets globais agressivos para conviver melhor com projetos consumidores.

## Publicacao futura no npm

O `package.json` ja esta preparado para publicar os arquivos de distribuicao e a documentacao essencial. Antes de publicar:

1. rode `npm run build`
2. revise a saida em `dist/`
3. ajuste versao e metadados do pacote
4. publique com `npm publish`
