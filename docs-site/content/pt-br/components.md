---
title: Catálogo de componentes
description: Explore componentes por categoria, com prévias interativas, exemplos de marcação, tabelas da API e orientações de acessibilidade.
kicker: Componentes
---

Escolha um componente no catálogo agrupado abaixo. As contagens são calculadas a partir do catálogo atual e incluem os extras nativos da Retro8 UI.

Cada página apresenta uma prévia, exemplos de marcação, opções de estilo e notas de acessibilidade. Quando disponíveis, também são documentados os atributos HTML, as opções `data-r8-*`, as variáveis CSS, os métodos do runtime e os eventos.

## Aparência e comportamento

Importe `retro8-ui/retro8.css` para aplicar os estilos. Importe `retro8-ui/retro8.js` quando quiser usar as interações prontas. As classes funcionam com HTML puro e com outras tecnologias, sem exigir adaptadores específicos.

O CSS sozinho não ativa abas, seletores personalizados ou o gerenciamento de foco dos modais. Em aplicações que hidratam HTML renderizado no servidor, inicialize o runtime depois da hidratação. `Retro8UI.init(root)` inicializa o elemento informado e seus descendentes; `Retro8UI.refresh(root)` é um alias. Ambos retornam a raiz processada. Chamadas repetidas não duplicam os eventos registrados, mas também não recriam todos os componentes nem tornam todos os atributos reativos.

## Interpretar os exemplos

Os identificadores da API e a sintaxe do código são os mesmos nos dois idiomas. Os valores padrão dos atributos correspondem ao HTML nativo ou ao runtime, conforme indicado. Os padrões de CSS podem mudar com modificadores, temas e alterações locais.

Os exemplos demonstram a composição visual. A aplicação implementa navegação, envio de formulários, persistência de tema e requisições de rede. Upload oferece seleção e prévia local de arquivos; validação e envio são responsabilidades da aplicação. Uma marca-d'água identifica o conteúdo visualmente e não impede cópias.
