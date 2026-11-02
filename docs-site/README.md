# Retro8 UI-site

Aplicacao Nuxt responsavel pela documentacao publica da `retro8-ui`.

## O que existe aqui

- docs bilingue em `pt-br` e `en`
- uma pagina por componente
- dark mode e light mode
- conteudo textual em Markdown via Nuxt Content
- previews reais usando o CSS compilado em `../dist/retro8.css`
- build estatico para deploy em qualquer host de arquivos

## Setup

```bash
npm install
```

## Desenvolvimento

Suba a docs localmente:

```bash
npm run dev
```

## Build estatico

Gere a versao estatica:

```bash
npm run generate
```

O resultado fica em `docs-site/.output/public`.

## Preview

```bash
npm run preview
```

## Toolchain requirements and security overrides

The documentation requires Node `^22.22.3 || ^24.15.0 || >=26.0.0`; `.nvmrc` selects the tested Node 22 release. Run `npm install` again after switching Node versions if the SQLite native binding was built with a different runtime.

The `minimatch`, `glob`, and `zod` overrides select patched transitive releases. Nuxt Content supports Zod 4 schemas, and the generated Markdown collections and documentation routes are checked after upgrades. Keep these overrides until the parent dependencies adopt patched ranges, then remove them with a fresh audit and build.

The remaining low-severity audit entries come from `deepmerge@4.3.1` through Nitro's Rollup resolver. The upstream advisory currently lists no patched version; do not hide this finding by downgrading Nuxt or forcing an incompatible merge implementation.
