---
title: Tokens
description: Propriedades CSS para cores, espaçamento, bordas, sombras, tipografia, foco e movimento.
kicker: Fundamentos
---

Tokens são as propriedades personalizadas de CSS que definem a aparência da Retro8 UI. Os componentes compartilham esses valores sem exigir uma tecnologia específica ou um provedor de tema em JavaScript.

A referência abaixo lista os valores padrão declarados no CSS da biblioteca. Os valores do tema escuro aparecem quando diferem dos padrões do tema claro. As amostras de cor acompanham o tema selecionado na documentação. Um valor como `var(--r8-color-primary)` referencia outro token em vez de definir uma cor fixa.

## Aplicar um tema

Defina `data-theme="light"` ou `data-theme="dark"` na raiz do documento. O tema escuro também pode ser aplicado a um contêiner com `data-r8-theme="dark"` ou `r8-theme-dark`.

O tema escuro atualiza fundos e textos juntos, incluindo resumos de paginação,
textos auxiliares e links. Use os tokens `ink`, `ink-muted` e `ink-subtle` para os
textos, em vez de cores escuras fixas, para manter a leitura ao trocar o tema.

```html
<html lang="pt-BR" data-theme="dark">
```

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
