---
title: skills
description: Guia pratico para estruturar skills de IA com contexto da Retro8 UI e reduzir ambiguidade nas automacoes.
kicker: AI docs
---

Esta pagina resume como usar `skills` para orientar assistentes de IA no ecossistema da Retro8 UI.

Use skills quando voce quiser respostas mais consistentes para tarefas repetidas, como criar markup, revisar acessibilidade ou explicar convencoes de API.

- Escopo sugerido: componentes, tokens, acessibilidade e contribuicao.
- Formato recomendado: instrucoes curtas, contexto real e limites explicitos.
- Manutencao: atualize as skills junto com mudancas de componentes e docs.

## Relacao com llms.txt

- [`/llms.txt`](/llms.txt) entrega um mapa de rotas para consumo automatico.
- Esta pagina explica como transformar esse contexto em regras praticas para o assistente.
- Use os dois juntos para guiar agentes com links oficiais e instrucoes claras.

## Boas praticas

1. Defina uma skill por objetivo (ex.: gerar markup, revisar acessibilidade, documentar API).
2. Referencie caminhos e fontes oficiais para reduzir interpretacoes erradas.
3. Versione as skills no mesmo fluxo de release da documentacao.

## Exemplo de skill

Use o template abaixo como ponto de partida para um arquivo `SKILL.md` real.

```md
---
name: retro8-a11y-review
description: Revisa markup da Retro8 UI para encontrar problemas de acessibilidade e propor correcoes pequenas, prontas para producao. Use quando o pedido envolver auditoria de acessibilidade, melhorias de ARIA, navegacao por teclado ou validacao semantica de HTML.
---

# Retro8 Accessibility Review

## Overview

Audite markup com classes `r8-*` e retorne correcoes objetivas de acessibilidade, sem alterar a identidade visual, a menos que seja necessario.

## Workflow

1. Levantar contexto.
- Inspecione os arquivos alvo e identifique elementos interativos (`button`, `a`, `input`, `dialog`, gatilhos de menu).
- Mapeie o comportamento esperado para teclado e leitor de tela.

2. Validar semantica e rotulos.
- Garanta uso de elementos nativos sempre que possivel.
- Verifique nomes visiveis e acessiveis (`label`, `aria-label`, `aria-labelledby`).
- Sinalize roles invalidas ou falta de landmarks.

3. Validar contratos de interacao.
- Verifique ordem e visibilidade de foco.
- Cheque acesso por teclado para toggles, menus, dialogs e tabs.
- Confirme atributos de estado como `aria-expanded`, `aria-controls` e `aria-selected`.

4. Propor correcoes minimas.
- Prefira diffs pequenos em vez de reescritas.
- Preserve a estrutura atual de classes `r8-*`, salvo bloqueio de acessibilidade.
- Inclua justificativa curta para cada ajuste.

## Output Rules

- Relate achados por severidade: critical, major, minor.
- Referencie caminhos de arquivo e linhas quando possivel.
- Entregue sugestoes de codigo prontas para patch.
```
