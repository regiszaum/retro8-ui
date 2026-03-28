# retro8-ui docs

## Visao geral

`retro8-ui` e uma library CSS retro 8-bit com classes semanticas e distribuicao framework-agnostic. O projeto usa Tailwind apenas como base de authoring, enquanto o consumo final acontece via CSS compilado.

## Principios da v1

- API publica baseada em `r8-*`
- sem dependencia de Vue, React ou qualquer framework
- componentes visuais reutilizaveis e previsiveis
- foco em HTML semantico e acessibilidade basica
- zero runtime JS obrigatorio

## Fluxo de trabalho

```bash
npm install
npm run build
npm run dev
```

Ao rodar `npm run dev`, a documentacao visual abre pelo Vite em [`playground/index.html`](/home/regiszaum/Projects/tudonovo/playground/index.html). Ela inclui uma home por idioma, pagina individual para cada componente, preview real, HTML recomendado, tokens e uma tipografia pixel local para a interface da docs.

Hoje a docs tambem inclui:

- i18n em `pt-br` e `en`
- home por idioma
- uma pagina propria para cada componente
- dark mode e light mode persistentes
- recomendacao de pacote externo de icones 8-bit, sem embutir isso na library

## Onde editar

- tokens: [`src/styles/base/tokens.css`](/home/regiszaum/Projects/tudonovo/src/styles/base/tokens.css)
- componentes: [`src/styles/components`](/home/regiszaum/Projects/tudonovo/src/styles/components)
- utilitarios: [`src/styles/utilities/layout.css`](/home/regiszaum/Projects/tudonovo/src/styles/utilities/layout.css)
- exemplos: [`examples`](/home/regiszaum/Projects/tudonovo/examples)
- playground: [`playground`](/home/regiszaum/Projects/tudonovo/playground)
- catalogo de conteudo da docs: [`playground/site-data.mjs`](/home/regiszaum/Projects/tudonovo/playground/site-data.mjs)
- gerador de paginas da docs: [`playground/generate-pages.mjs`](/home/regiszaum/Projects/tudonovo/playground/generate-pages.mjs)

## Arquitetura CSS

- `base/`: tokens e reset minimo
- `components/`: classes semanticas por componente
- `utilities/`: utilitarios pequenos com prefixo `r8-`
- `index.css`: ponto unico de entrada para o build

## Saida de distribuicao

O build gera:

- `dist/retro8.css`
- `dist/retro8.min.css`

Esses arquivos podem ser importados em qualquer stack que aceite CSS.

## Rotas da docs

O site da docs gera paginas como:

- `/pt-br/`
- `/en/`
- `/pt-br/components/button/`
- `/en/components/navbar/`
