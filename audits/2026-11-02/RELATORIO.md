# Auditoria de componentes — 02/11/2026

**Resultado: há falhas de layout, comportamento, acessibilidade e dependências vulneráveis.** O projeto compila, mas os testes não permitem considerá-lo aprovado.

## Cobertura e resultados

| Verificação | Resultado |
| --- | --- |
| 55 páginas de componentes em inglês | HTTP 200 em todas; nenhuma exceção `pageerror` |
| 55 URLs equivalentes em português | HTTP 200; esta etapa verificou resposta HTTP |
| Layout das 55 páginas em 1440, 768, 390 e 320 px | 220 verificações; conteúdo ultrapassando a viewport em 2, 25, 55 e 55 páginas, respectivamente |
| 40 cenários funcionais em Chromium, com CSS distribuído e runtime fonte | **28 passaram; 12 falharam** |
| axe nas prévias dos 55 componentes | Violações em **18 prévias** |
| 55 prévias fora do site, em 320, 390 e 768 px | Drawer fechado causa overflow horizontal nas três larguras |
| Amostra de 12 páginas em português, tema escuro, 390 px | Inspecionada; mantém problemas de contraste e ARIA |
| Compilação CSS normal e minificada, sintaxe JS e minificação JS | Passaram; saídas de verificação gravadas fora de `dist` |
| Geração estática do Nuxt com Node 22.23.2 | **254 rotas geradas** |
| Hidratação do Vue | Mensagem de erro nas 55 páginas em desenvolvimento; também reproduzida no build estático |

As contagens de layout usam os limites dos elementos, pois `html` e `body` escondem overflow horizontal. A largura total do documento, isoladamente, daria um falso resultado positivo. Elementos de tabelas dentro de áreas de rolagem e blocos de código foram excluídos dessa medição; as páginas afetadas apresentam também contêineres principais fora da viewport. As capturas confirmam o corte de conteúdo.

Ambiente: Chromium headless via Playwright 1.64.1, axe Playwright 4.13.0, tsx 4.23.15; Linux. A geração estática e o servidor da documentação usaram Node 22.23.2. A inicialização com o Node 20.20.2 ativo falhou em `better-sqlite3` com `Module did not self-register`; usar Node 22 permitiu prosseguir. Isso não demonstra incompatibilidade geral com Node 20: o binário nativo instalado pode depender da versão usada na instalação.

## Achados prioritários

### 1. Crítico: Nuxt DevTools vulnerável no ambiente de desenvolvimento

O lockfile e a instalação incluem `@nuxt/devtools@3.2.4`; a configuração habilita DevTools em desenvolvimento. O advisory [GHSA-279x-mwfv-vcqv](https://github.com/advisories/GHSA-279x-mwfv-vcqv) descreve execução de comandos por RPC sem autenticação nas versões anteriores a 3.3.1. O risco se aplica ao servidor de desenvolvimento, inclusive por acesso ao WebSocket a partir de páginas maliciosas, segundo o advisory. O build estático publicado não executa DevTools.

Referências locais: `docs-site/package-lock.json`, entrada `node_modules/nuxt/node_modules/@nuxt/devtools`; `docs-site/nuxt.config.ts`, opção `devtools`.

**Ação:** atualizar a dependência para uma versão corrigida e verificar novamente o lockfile. Desabilitar DevTools é uma mitigação alternativa enquanto a atualização não ocorre. Não foi executado um exploit de comandos nesta auditoria.

### 2. Alto: conteúdo da documentação cortado no celular

Em 390 px, a página Button apresenta `.docs-main` com 374 px, mas sua coluna interna mede aproximadamente 679 px e termina em x≈687. Botões, textos, controles e tabelas ficam cortados. Em 320 e 390 px, as 55 páginas apresentam elementos fora da viewport. Em 1440 px, Input Tag e Pagination também ultrapassam a tela.

Evidências: [captura clara](button-mobile-viewport.png), [captura escura](button-dark-viewport.png), [medições](scan.json).

Referências: `docs-site/app/assets/css/docs.css`, regras de `html`, `body`, `.docs-main`, grids internos e `.docs-api-table__table`. A coluna implícita do grid e os tamanhos mínimos dos filhos exigem revisão; esconder overflow mascara o problema.

**Ação:** permitir que colunas e filhos encolham, usando `minmax(0, 1fr)` e `min-width: 0` nos pontos apropriados; manter a rolagem das tabelas dentro de seus próprios contêineres. Retestar os controles efetivamente visíveis, não apenas `scrollWidth` do documento.

### 3. Alto: Input Number ultrapassa `max` com step estrito

Reprodução: `data-r8-step-strictly="true"`, precisão 2, `min="0"`, `max="1"`, `step="0.6"`; digitar `1` e sair do campo. O valor final é **1.20**, maior que o máximo. `normalizeInputNumberValue` aplica alinhamento novamente depois do clamp.

Referência: `src/scripts/retro8.js`, `normalizeInputNumberValue`, linha 5540.

**Ação:** conciliar alinhamento e limites sem produzir valor fora de `min/max`. Este controle de interface não substitui validação no servidor.

### 4. Alto: inicialização ignora o próprio elemento recebido

`Retro8UI.init(element)` busca descendentes com `querySelectorAll`, ignorando o próprio elemento raiz. Um checkbox criado isoladamente continua sem `data-r8-binary-ready` e não responde ao clique. O MutationObserver também chama `init(node)` para cada nó adicionado, reproduzindo a falha quando o componente é o próprio nó inserido.

Referência: `src/scripts/retro8.js`, `observe`, linha 7990, `init`, linha 8009, e inicializadores de componentes.

**Ação:** incluir a raiz quando ela corresponder ao seletor do componente, além dos descendentes. Dois dos 12 testes reprovados cobrem esta mesma causa.

### 5. Alto: Drawer fechado permanece renderizado e pode receber foco

Após Escape, o atributo `hidden` é aplicado, mas o estilo computado continua `display: grid`. O botão de fechar ainda aceita foco. Em uso fora do site, o drawer fechado aumenta `scrollWidth` para 632 px em viewport de 320 px e 772 px em viewport de 390 px. A transformação desloca o painel para fora da tela, mas não o remove da renderização.

Referências: `src/styles/components/feedback.css`, `.r8-drawer`, linha 323; `src/scripts/retro8.js`, `closeTarget`, linha 7618. Falta uma regra que faça o estado `hidden` prevalecer sobre o `display` do componente.

**Ação:** garantir que o painel efetivamente desapareça depois da transição de fechamento e saia da ordem de foco.

### 6. Alto: Drawer modal não gerencia foco

Ao abrir o drawer modal padrão, o foco permanece no botão externo que o abriu. O runtime não transfere foco para o painel nem implementa contenção de foco. O teste confirma a ausência de transferência; a ausência de contenção também é observável no código.

Referência: `src/scripts/retro8.js`, ramo de drawer em `openTarget`, linha 7683.

**Ação:** mover foco ao abrir, limitar navegação ao modal enquanto aberto e restaurar foco ao fechar, com semântica modal adequada.

## Outros problemas funcionais confirmados

| Prioridade | Componente | Reprodução / resultado | Referência em `src/scripts/retro8.js` |
| --- | --- | --- | --- |
| Média | Tabs | Focar Stats e pressionar ArrowRight mantém foco em Stats; falta navegação entre abas pelas setas | `initTabs`, linha 4509 |
| Média | Rate | Selecionar nota 4 define `aria-checked="true"` nos quatro primeiros itens com papel de radio, em vez de apenas no selecionado | `initRates`, linha 5861 |
| Média | Rate | Com `aria-disabled="true"`, Enter no último item ainda altera a nota | `initRates` |
| Média | Slider | Com `aria-disabled="true"`, ArrowRight altera o valor de 68 para 73 | `initSliders`, linha 6320 |
| Média | Input Number | Com `readonly` no input, o botão `+` altera 3.50 para 3.75 | `getInputNumberSettings`, linha 5497, e `stepValue` |
| Média | Transfer | Itens não são focáveis nem selecionáveis por teclado | `initTransfers`, linha 6668 |
| Média | Dialog | O diálogo abre, mas o acionador continua com `aria-expanded="false"` | ramo de dialog em `openTarget` |
| Baixa | Select | Selecionar a opção visível Engineer exibe o valor interno `engineer`; valores e rótulos são confundidos | `getTextValue` e `updateChoiceDisplay`, linha 1602 |

Há ainda divergência de versão: `Retro8UI.version` informa `0.3.0`, enquanto o pacote declara `0.4.0`.

## Acessibilidade e integração com Vue

O axe apontou violações em 18 prévias. A classificação `critical` do axe representa impacto de acessibilidade, não gravidade de segurança.

| Problema | Exemplos |
| --- | --- |
| Contraste insuficiente | Button success e Badge success: 3.29:1; Badge info: 3.68:1; título de Window: 3.45:1. O texto pequeno exige 4.5:1 no teste aplicado |
| Atributos incompatíveis com o papel ARIA | Autocomplete aplica `aria-expanded` a um host sem papel compatível; Slider aplica `aria-valuemin/max/now/text` ao host `role="group"` |
| Atributo obrigatório ausente | Itens de Rate começam com `role="radio"` sem `aria-checked` |
| Nome acessível ausente | Input Number e Upload em exemplos do catálogo; track do Slider; algumas barras de Progress |

A lista completa, com seletores e mensagens, está em [summary.json](summary.json). Alguns problemas exigem mudanças no runtime; outros estão nos exemplos que consumidores podem copiar.

As 55 páginas emitiram `Hydration completed but contains mismatches.`. A inspeção detalhada encontrou o iframe dentro de `<noscript>` e elementos modificados pelo runtime antes da hidratação: idioma `en/EN`, opções `primary/Primary`, `md/Medium` e estado inicial do tema. O plugin importa um script com inicialização automática no topo do módulo. A mensagem também ocorre na versão estática, não apenas durante desenvolvimento.

Referências: `docs-site/app/app.vue`; `docs-site/app/plugins/retro8.client.ts`; `docs-site/app/composables/useDocsTheme.ts`. **Ação:** coordenar a inicialização com a montagem/hidratação do Vue e manter estado inicial consistente no servidor e cliente; revisar separadamente o `<noscript>`.

## Segurança das dependências

Resultados de `npm audit --json` nesta execução, por árvore de dependências; os totais não devem ser somados como vulnerabilidades únicas.

| Árvore | Baixas | Moderadas | Altas | Críticas | Total |
| --- | ---: | ---: | ---: | ---: | ---: |
| Biblioteca, incluindo desenvolvimento | 0 | 5 | 6 | 1 | 12 |
| Site de documentação | 5 | 21 | 21 | 5 | 52 |
| Biblioteca com `--omit=dev` | 0 | 0 | 0 | 0 | 0 |

Além de DevTools, a árvore da documentação inclui alertas críticos em `seroval@1.5.1`, `shell-quote@1.8.3`, `simple-git@3.33.0` e `tar@7.5.13`. Na raiz, `shell-quote` é dependência de ferramentas de desenvolvimento. O advisory [GHSA-w7jw-789q-3m8p](https://github.com/advisories/GHSA-w7jw-789q-3m8p) descreve injeção de comandos quando um consumidor passa objetos `.op` controláveis para `quote()` e executa o resultado em um shell. Não foi identificada nem demonstrada essa cadeia explorável no código próprio do projeto.

Os JSONs [audit-root.json](audit-root.json) e [audit-docs.json](audit-docs.json) preservam versões afetadas, cadeias e advisories. Há alertas altos em PostCSS, Nuxt, Vue e outras dependências. A presença no lockfile não demonstra que cada falha possa ser explorada neste site. Ferramentas de build/dev, publicação estática e eventual servidor SSR têm superfícies distintas; a publicação estática não expõe os endpoints Node de SSR.

**Ação:** atualizar dependências e lockfiles com revisão de compatibilidade, executar novamente os testes e gerar uma nova auditoria. Não aplicar `npm audit fix --force` indiscriminadamente: uma das sugestões da raiz envolve uma mudança de versão principal regressiva de `npm-run-all`.

Nos testes direcionados de injeção, Input Tag tratou `<img src=x onerror=window.__auditXss=1>` como texto, e Upload tratou um nome de arquivo com HTML como texto. Não houve execução nesses casos. Isso não equivale a uma garantia de ausência de XSS em todas as entradas. Os usos de `v-html` inspecionados recebem catálogo local ou markup montado pelos playgrounds; não foi demonstrada uma entrada remota persistida de atacante.

## O que passou

Os testes aprovados cobrem checkbox, switch, theme switch, exclusividade de radio, clique nas abas, seleção por teclado no select, collapse, limites básicos do slider, incremento e limite usual do input numérico, inclusão/remoção de tags, transferência por clique, abertura/fechamento de dialog, estado de fechamento do drawer, upload/remoção com nome HTML, OTP, calendário, autocomplete, carousel, pagination, limpeza de input, revelação de senha, navbar, splitter inclusive desabilitado, poptip, comando de dropdown, seleção de cor, data/hora e cascader.

O arquivo `/missing-avatar.png` retorna erro intencionalmente para demonstrar fallback de Avatar; não foi classificado como regressão.

## Reproduzir

As ferramentas foram instaladas fora do projeto, sem alterar seus manifests ou lockfiles. A partir da raiz do repositório:

```bash
npm install --prefix /tmp/retro8-audit-tools playwright@1.64.1 @axe-core/playwright@4.13.0 tsx@4.23.15 --no-audit --no-fund
/tmp/retro8-audit-tools/node_modules/.bin/playwright install chromium
NODE_PATH=/tmp/retro8-audit-tools/node_modules node audits/2026-11-02/reproduce.cjs
```

O script [reproduce.cjs](reproduce.cjs) roda os 40 cenários sem precisar do site e sai com código 1 enquanto houver reprovações. Usa o CSS atual de `dist/retro8.css`, o catálogo local e o runtime fonte. Salva o resultado em `/tmp/retro8-audit-reproduction/behavior.json`; `R8_AUDIT_OUTPUT` permite mudar o diretório.

Para repetir a varredura de páginas, iniciar a documentação com Node 22 e, em outro terminal, executar:

```bash
npm --prefix docs-site run dev -- --host 127.0.0.1 --port 3100
NODE_PATH=/tmp/retro8-audit-tools/node_modules node audits/2026-11-02/scan.cjs
```

O script [scan.cjs](scan.cjs) aceita `R8_AUDIT_URL` e `R8_AUDIT_OUTPUT`. `R8_AUDIT_SCREENSHOTS=1` habilita capturas das páginas com problemas de layout. O resultado desta execução está em [scan.json](scan.json), [behavior.json](behavior.json) e [extra.json](extra.json).

## Limites e estado do repositório

Auditoria em Chromium, sem Safari, Firefox, dispositivos físicos, leitor de tela ou comparação com uma referência visual aprovada. Nem toda combinação de propriedade de cada componente foi exercitada. Auditoria de dependências e testes locais de entradas não substituem um pentest da implantação. Os testes de upload verificam comportamento local; a documentação informa que validação e envio pertencem ao aplicativo hospedeiro.

Nenhuma correção foi aplicada ao código da biblioteca, à configuração ou às dependências. Foram adicionados somente este relatório, evidências e scripts de auditoria. A alteração já existente em `dist/retro8.css` foi preservada. O runtime em `dist/retro8.js` era idêntico ao fonte no momento da verificação.
