---
title: Tokens
description: Propriedades CSS para cores, espaçamento, bordas, sombras, tipografia, foco e movimento.
kicker: Fundamentos
---

Tokens são as propriedades personalizadas de CSS que definem a aparência da Retro8 UI. Os componentes compartilham esses valores sem exigir uma tecnologia específica ou um provedor de tema em JavaScript.

A referência abaixo lista os valores padrão declarados no CSS da biblioteca. Os valores do tema escuro aparecem quando diferem dos padrões do tema claro. As amostras de cor acompanham o tema selecionado na documentação. Um valor como `var(--r8-color-primary)` referencia outro token em vez de definir uma cor fixa.

## Personalizar as cores da sua marca

Assim como as cores semânticas do Bootstrap, você pode redefinir `primary`, `success`, `danger` e as demais funções da paleta. A Retro8 UI usa variáveis CSS nativas: não precisa de Sass, Tailwind, JavaScript ou de recompilar a biblioteca.

Crie um `theme.css` e carregue-o **depois** do CSS da biblioteca. Escolha uma das formas conforme seu projeto: HTML ou importação pelo bundler.

```html
<link rel="stylesheet" href="./node_modules/retro8-ui/dist/retro8.css" />
<link rel="stylesheet" href="./theme.css" />
```

```js
import "retro8-ui/retro8.css";
import "./theme.css";
```

Cada cor tem três tokens. A cor base pinta botões, badges e outros componentes; `-strong` é usada em detalhes e variantes; `-contrast` define o texto sobre a cor base. Alterar apenas a base não calcula as outras duas automaticamente.

| Função | Token base | Exemplo de componente |
| --- | --- | --- |
| Principal | `--r8-color-primary` | `r8-btn--primary` |
| Secundária | `--r8-color-secondary` | `r8-btn--secondary` |
| Terciária | `--r8-color-tertiary` | `r8-badge--tertiary` |
| Sucesso | `--r8-color-success` | `r8-btn--success` |
| Atenção | `--r8-color-warning` | `r8-alert--warning` |
| Erro ou ação destrutiva | `--r8-color-danger` | `r8-btn--danger` |
| Informação | `--r8-color-info` | `r8-badge--info` |
| Superfície escura | `--r8-color-dark` | `r8-btn--dark` |
| Superfície clara | `--r8-color-light` | `r8-btn--light` |

Exemplo de paleta global:

```css
/* theme.css */
:root {
  --r8-color-primary: #7c3aed;
  --r8-color-primary-strong: #6d28d9;
  --r8-color-primary-contrast: #ffffff;

  --r8-color-success: #0f766e;
  --r8-color-success-strong: #115e59;
  --r8-color-success-contrast: #ffffff;

  --r8-color-danger: #be123c;
  --r8-color-danger-strong: #9f1239;
  --r8-color-danger-contrast: #ffffff;
}
```

```html
<button class="r8-btn r8-btn--primary">Continuar</button>
<button class="r8-btn r8-btn--success">Confirmar</button>
<button class="r8-btn r8-btn--danger">Excluir</button>
```

As classes continuam iguais: os componentes passam a usar as cores da sua marca. Esses valores globais continuam valendo ao alternar o tema. Para uma paleta diferente no escuro, acrescente o bloco a seguir depois do bloco global.

### Personalizar o tema escuro

```css
:root[data-theme="dark"] {
  --r8-color-primary: #c4b5fd;
  --r8-color-primary-strong: #a78bfa;
  --r8-color-primary-contrast: #2e1065;

  --r8-color-success: #5eead4;
  --r8-color-success-strong: #2dd4bf;
  --r8-color-success-contrast: #042f2e;

  --r8-color-danger: #fda4af;
  --r8-color-danger-strong: #fb7185;
  --r8-color-danger-contrast: #4c0519;

  --r8-color-bg: #09051a;
  --r8-color-surface: #171029;
  --r8-color-surface-2: #241a3b;
  --r8-color-surface-3: #35264f;
  --r8-color-ink: #faf5ff;
  --r8-color-ink-muted: #e9d5ff;
  --r8-color-ink-subtle: #d8b4fe;
  --r8-color-border: #d8b4fe;
}
```

`bg` controla o fundo geral; `surface`, `surface-2` e `surface-3` controlam superfícies; `ink`, `ink-muted` e `ink-subtle` controlam textos; `border` controla bordas. No CSS da sua aplicação, use esses tokens também no seu layout:

```css
body {
  background: var(--r8-color-bg);
  color: var(--r8-color-ink);
}
```

A biblioteca não aplica um fundo ao `body` do projeto. Ao escolher cores próprias, verifique o contraste entre fundo e texto nos dois temas, inclusive nas variantes e nos estados de foco.

## Aplicar um tema

Defina `data-theme="light"` ou `data-theme="dark"` na raiz do documento. Para um tema local, use `data-r8-theme="light"` / `data-r8-theme="dark"` ou as classes `r8-theme-light` / `r8-theme-dark`. Uma área clara pode ficar dentro de uma página escura e vice-versa.

O tema escuro atualiza fundos e textos juntos, incluindo resumos de paginação,
textos auxiliares e links. Use os tokens `ink`, `ink-muted` e `ink-subtle` para os
textos, em vez de cores escuras fixas, para manter a leitura ao trocar o tema.

```html
<html lang="pt-BR" data-theme="dark">
```

Alterne o tema em JavaScript sem recarregar a página:

```js
document.documentElement.dataset.theme = "dark";
// Para voltar ao tema claro:
document.documentElement.dataset.theme = "light";
```

Para um painel claro dentro de uma página escura:

```html
<section class="r8-panel" data-r8-theme="light">
  <div class="r8-panel__body">Este painel usa a paleta clara.</div>
</section>
```

Um escopo de tema explícito começa com os padrões desse tema. Para personalizá-lo,
declare seus tokens no próprio contêiner, por exemplo em `.checkout[data-r8-theme="light"]`.

O componente Theme Switch altera seu próprio estado e emite `r8:binary-change`. A aplicação deve usar esse evento para aplicar o atributo do tema e, se necessário, salvar a preferência.

## Sobrescrever tokens localmente

Carregue suas alterações depois de `retro8.css`. Use a raiz do documento para uma mudança global ou um contêiner para uma mudança local:

```css
.mission-panel {
  --r8-color-primary: #1d4ed8;
  --r8-color-primary-strong: #1e40af;
  --r8-color-primary-contrast: #ffffff;
  --r8-color-accent: var(--r8-color-primary);
  --r8-color-accent-strong: var(--r8-color-primary-strong);
  --r8-color-accent-contrast: var(--r8-color-primary-contrast);
}
```

Ao alterar `primary`, declare novamente os aliases legados `accent` no mesmo escopo para manter consistência entre os componentes que usam esses nomes. Altere cores de texto e fundo em conjunto e verifique o contraste nos dois temas. O componente Config Provider oferece temas e densidades locais predefinidos.

## Variáveis fundamentais e de componentes

Os tokens fundamentais afetam estilos compartilhados. Variáveis como `--r8-dialog-width` controlam uma família de componentes. Seus valores padrão podem referenciar tokens fundamentais, e modificadores podem alterá-los. Defina as variáveis no próprio componente quando a classe base declarar o valor padrão nesse elemento.

Os tokens de movimento são reduzidos automaticamente quando o usuário solicita menos animações. Os indicadores de carregamento e outros componentes animados também oferecem estilos para essa preferência.
