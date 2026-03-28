# retro8-ui docs

## Visao geral

`retro8-ui` e uma library CSS retro 8-bit com classes semanticas, distribuicao framework-agnostic e runtime JS opcional. O projeto usa Tailwind apenas como base de authoring, enquanto o consumo final acontece via CSS compilado.

## Principios da v1

- API publica baseada em `r8-*`
- sem dependencia de Vue, React ou qualquer framework
- componentes visuais reutilizaveis e previsiveis
- foco em HTML semantico e acessibilidade basica
- runtime JS opcional para behavior interativo

## Fluxo de trabalho

```bash
npm install
npm run build
npm run dev
```

Ao rodar `npm run dev`, a documentacao publica sobe via Nuxt em [`docs-site`](/home/regiszaum/Projects/tudonovo/docs-site). Ela inclui uma home por idioma, pagina individual para cada componente, live preview, HTML recomendado, tokens e uma tipografia pixel local para a interface da docs.

Hoje a docs tambem inclui:

- i18n em `pt-br` e `en`
- home por idioma
- 81 componentes core agrupados por categoria, mais extras nativos da retro8-ui
- uma pagina propria para cada componente
- dark mode e light mode persistentes
- runtime JS opcional carregado na docs para demonstrar components interativos
- recomendacao de pacote externo de icones 8-bit, sem embutir isso na library

## Onde editar

- tokens: [`src/styles/base/tokens.css`](/home/regiszaum/Projects/tudonovo/src/styles/base/tokens.css)
- componentes: [`src/styles/components`](/home/regiszaum/Projects/tudonovo/src/styles/components)
- utilitarios: [`src/styles/utilities/layout.css`](/home/regiszaum/Projects/tudonovo/src/styles/utilities/layout.css)
- exemplos: [`examples`](/home/regiszaum/Projects/tudonovo/examples)
- app da docs: [`docs-site`](/home/regiszaum/Projects/tudonovo/docs-site)
- paginas e componentes da docs: [`docs-site/app`](/home/regiszaum/Projects/tudonovo/docs-site/app)
- conteudo markdown da docs: [`docs-site/content`](/home/regiszaum/Projects/tudonovo/docs-site/content)
- catalogo compartilhado da docs: [`docs-site/shared/component-catalog.ts`](/home/regiszaum/Projects/tudonovo/docs-site/shared/component-catalog.ts)
- dados localizados da docs: [`docs-site/app/utils/docs-data.ts`](/home/regiszaum/Projects/tudonovo/docs-site/app/utils/docs-data.ts)

## Arquitetura CSS

- `base/`: tokens e reset minimo
- `components/`: classes semanticas por componente
- `utilities/`: utilitarios pequenos com prefixo `r8-`
- `index.css`: ponto unico de entrada para o build

## Saida de distribuicao

O build gera:

- `dist/retro8.css`
- `dist/retro8.min.css`
- `dist/retro8.js`
- `dist/retro8.min.js`

Esses arquivos podem ser importados em qualquer stack que aceite CSS e JS no browser.

## Rotas da docs

O site da docs gera paginas como:

- `/pt-br/`
- `/en/`
- `/pt-br/getting-started/`
- `/en/components/`
- `/pt-br/components/button/`
- `/en/components/navbar/`
