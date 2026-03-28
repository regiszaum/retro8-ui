# retro8-ui docs-site

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
