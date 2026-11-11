import type { CatalogEntry, LocalizedString } from "./component-catalog";

export type CatalogTableEntry = {
  name: string;
  type: string;
  defaultValue: string;
  description: LocalizedString;
};

export type CatalogMethodEntry = {
  name: string;
  signature: string;
  description: LocalizedString;
};

export type CatalogEventEntry = {
  name: string;
  payload: string;
  description: LocalizedString;
};

export type ComponentContract = {
  attributes: CatalogTableEntry[];
  dataAttributes: CatalogTableEntry[];
  cssVariables: CatalogTableEntry[];
  methods: CatalogMethodEntry[];
  events: CatalogEventEntry[];
};

const l = (ptBr: string, en: string): LocalizedString => ({ "pt-br": ptBr, en });

const row = (
  name: string,
  type: string,
  defaultValue: string,
  ptBr: string,
  en: string,
): CatalogTableEntry => ({
  name,
  type,
  defaultValue,
  description: l(ptBr, en),
});

const method = (name: string, signature: string, ptBr: string, en: string): CatalogMethodEntry => ({
  name,
  signature,
  description: l(ptBr, en),
});

const event = (name: string, payload: string, ptBr: string, en: string): CatalogEventEntry => ({
  name,
  payload,
  description: l(ptBr, en),
});

const buttonVariants = `"primary" | "secondary" | "tertiary" | "success" | "info" | "danger" | "dark" | "light" | "ghost"`;
const buttonSizes = `"sm" | "md" | "lg"`;
const choiceKinds = new Set([
  "autocomplete",
  "cascader",
  "color-picker",
  "select",
  "dropdown",
]);
const overlayKinds = new Set(["dialog", "drawer", "poptip"]);
const binaryKinds = new Set(["checkbox", "radio", "switch", "theme-switch"]);
const runtimeKinds = new Set([
  "button",
  ...choiceKinds,
  "date-picker",
  "datetime-picker",
  ...overlayKinds,
  ...binaryKinds,
  "tabs",
  "collapse",
  "carousel",
  "input-number",
  "rate",
  "pagination",
  "navbar",
  "splitter",
  "slider",
  "input-tag",
  "transfer",
  "progress",
  "alert",
]);
const runtimeMethods = [
  method(
    "Retro8UI.init",
    "(root?: Document | HTMLElement) => Document | HTMLElement",
    "Inicializa a raiz e seus descendentes, incluindo componentes recém-inseridos, e retorna a raiz processada. Os eventos já registrados não são duplicados.",
    "Initializes the root and its descendants, including newly inserted components, and returns the processed root. Existing bindings are not duplicated.",
  ),
  method(
    "Retro8UI.refresh",
    "(root?: Document | HTMLElement) => Document | HTMLElement",
    "Alias de `init`: inicializa novos componentes e sincroniza os estados suportados. Não recria componentes já inicializados nem observa todas as mudanças de atributos.",
    "Alias of `init`: initializes new components and synchronizes supported state. It does not rebuild initialized components or observe every attribute change.",
  ),
];

function createContract(): ComponentContract {
  return {
    attributes: [],
    dataAttributes: [],
    cssVariables: [],
    methods: [],
    events: [],
  };
}

function pushUnique<T extends { name: string }>(target: T[], entries: T[]) {
  entries.forEach((entry) => {
    const index = target.findIndex((item) => item.name === entry.name);
    if (index === -1) target.push(entry);
    else target[index] = entry;
  });
}

function pushUniqueMethods(target: CatalogMethodEntry[], entries: CatalogMethodEntry[]) {
  entries.forEach((entry) => {
    if (!target.some((item) => item.name === entry.name)) {
      target.push(entry);
    }
  });
}

function mergeContract(target: ComponentContract, source: Partial<ComponentContract>) {
  if (source.attributes) {
    pushUnique(target.attributes, source.attributes);
  }

  if (source.dataAttributes) {
    pushUnique(target.dataAttributes, source.dataAttributes);
  }

  if (source.cssVariables) {
    pushUnique(target.cssVariables, source.cssVariables);
  }

  if (source.events) {
    pushUnique(target.events, source.events);
  }

  if (source.methods) {
    pushUniqueMethods(target.methods, source.methods);
  }
}

function withFallbackSurfaceAttributes(component: CatalogEntry): Partial<ComponentContract> {
  return {
    attributes: [
      row(
        "aria-label",
        "string",
        "none",
        `Nome acessível opcional para a superfície raiz de ${component.name}.`,
        `Optional accessible name for the root ${component.name} surface.`,
      ),
      row(
        "hidden",
        "boolean",
        "false",
        `Esconde ${component.name} usando comportamento nativo do HTML, sem quebrar a classe semântica.`,
        `Hides ${component.name} with native HTML behavior without breaking the semantic class.`,
      ),
    ],
  };
}

function withVariantDataAttribute(componentName: string, acceptedValues: string): Partial<ComponentContract> {
  return {
    dataAttributes: [
      row(
        "data-r8-variant",
        acceptedValues,
        "none",
        `Aplica a variante semanticamente em ${componentName} sem depender de concatenar classes na aplicação hospedeira.`,
        `Applies the variant semantically in ${componentName} without relying on class concatenation in the host app.`,
      ),
    ],
    methods: runtimeMethods,
  };
}

function withChoiceContract(kindLabel: string): Partial<ComponentContract> {
  return {
    attributes: [
      row(
        "aria-expanded",
        "boolean",
        "false",
        `${kindLabel} sincroniza esse estado entre acionador e painel quando o runtime abre ou fecha a lista.`,
        `${kindLabel} keeps this state in sync between trigger and panel when the runtime opens or closes the list.`,
      ),
      row(
        "aria-controls",
        "string",
        "generated",
        `Conecta acionador/input ao listbox ou painel controlado por ${kindLabel}.`,
        `Connects the trigger or input to the listbox or panel controlled by ${kindLabel}.`,
      ),
      row(
        "aria-selected",
        "boolean",
        "false",
        `Marca a opção atualmente ativa ou escolhida dentro de ${kindLabel}.`,
        `Marks the currently active or chosen option inside ${kindLabel}.`,
      ),
      row(
        "hidden",
        "boolean",
        "managed by runtime",
        "O painel usa esse atributo para abrir e fechar sem precisar de framework contêiner.",
        `The panel uses this attribute to open and close without needing a framework wrapper.`,
      ),
    ],
    dataAttributes: [
      row(
        "data-r8-value",
        "string",
        "option text",
        `Define o valor de máquina da opção; o texto visível permanece como rótulo. No contêiner, registra a seleção atual quando suportado.`,
        `Sets the option machine value while keeping visible text as its label. On the container, records the current selection where supported.`,
      ),
      row(
        "data-r8-search",
        "string",
        "none",
        "Texto extra usado pelo filtro do runtime em comboboxes e lists pesquisaveis.",
        "Extra text used by the runtime filter in comboboxes and searchable lists.",
      ),
      row(
        "data-r8-choice-display",
        "marker",
        "none",
        "Marca o nó interno que deve receber o rótulo selecionado no acionador.",
        "Marks the inner node that should receive the selected label in the trigger.",
      ),
    ],
    methods: runtimeMethods,
    events: [
      event(
        "r8:choice-change",
        `{ value, text, kind, option }`,
        "Disparado quando uma opção e selecionada pelo runtime da retro8-ui.",
        "Emitted when an option is selected by the retro8-ui runtime.",
      ),
    ],
  };
}

export function getComponentContract(component: CatalogEntry): ComponentContract {
  const contract = createContract();

  if (!runtimeKinds.has(component.id) && component.id !== "config-provider") {
    mergeContract(contract, withFallbackSurfaceAttributes(component));
  }

  if (choiceKinds.has(component.id)) {
    mergeContract(contract, withChoiceContract(component.name));
  }

  if (binaryKinds.has(component.id)) {
    mergeContract(contract, {
      attributes: [
        row(
          "aria-checked",
          component.id === "checkbox" ? `"true" | "false" | "mixed"` : `"true" | "false"`,
          "false",
          component.id === "checkbox" ? "Estado marcado ou desmarcado; `mixed` indica seleção parcial." : `Estado marcado ou desmarcado de ${component.name}; não aceita o estado misto.`,
          component.id === "checkbox" ? "Checked or unchecked state; `mixed` indicates a partial selection." : `Checked or unchecked ${component.name} state; mixed values are not supported.`,
        ),
        row(
          "disabled",
          "boolean",
          "false",
          `Bloqueia interação nativa e preserva visual consistente para ${component.name}.`,
          `Disables native interaction and preserves a consistent visual state for ${component.name}.`,
        ),
      ],
      methods: runtimeMethods,
      events: [
        event(
          "r8:binary-change",
          `{ checked, kind, indeterminate }`,
          "Emitido quando checkbox, radio, switch ou tema switch muda de estado.",
          "Emitted when a checkbox, radio, switch, or theme switch changes state.",
        ),
      ],
    });
  }

  switch (component.id) {
    case "checkbox":
      mergeContract(contract, {
        attributes: [
          row(
            "aria-disabled",
            "boolean",
            "false",
            "Use em hosts customizados quando o Checkbox não for um input nativo e precisar expor bloqueio semanticamente.",
            "Use it on custom hosts when Checkbox is not a native input and still needs to expose a blocked state semantically.",
          ),
        ],
        dataAttributes: [
          row(
            "data-r8-size",
            `"sm" | "md" | "lg"`,
            `"md"`,
            "Aplica escala compacta ou ampliada no Checkbox sem trocar a classe base.",
            "Applies a compact or larger Checkbox scale without replacing the base class.",
          ),
          row(
            "data-r8-border",
            `"true" | "false"`,
            `"false"`,
            "Ativa uma estrutura com borda em volta do controle, útil para listas selecionaveis e cards curtos.",
            "Turns on a bordered shell around the control, useful for selectable lists and short cards.",
          ),
          row(
            "data-r8-indeterminate",
            `"true" | "false"`,
            `"false"`,
            "Inicializa o Checkbox em estado misto e sincroniza `aria-checked=\"mixed\"` no elemento.",
            "Boots Checkbox in a mixed state and keeps `aria-checked=\"mixed\"` in sync on the host.",
          ),
        ],
        cssVariables: [
          row(
            "--r8-checkbox-box-size",
            "length",
            "1.25rem",
            "Controla o tamanho da caixa pixelada antes dos modificadores `sm` e `lg` ajustarem a escala.",
            "Controls the pixel box size before the `sm` and `lg` modifiers adjust the scale.",
          ),
          row(
            "--r8-checkbox-mark-size",
            "length",
            "0.55rem",
            "Define a escala visual do X e ajuda a equilibrar o dash do estado misto.",
            "Defines the visual scale of the X mark and helps balance the mixed-state dash.",
          ),
          row(
            "--r8-checkbox-gap",
            "length",
            "var(--r8-space-3)",
            "Ajusta a distância entre a caixa e o rótulo sem alterar a estrutura do elemento.",
            "Adjusts the distance between the box and the label without changing the host structure.",
          ),
          row("--r8-checkbox-shell-bg", "color", "var(--r8-color-surface-2)", "Permitem personalizar a estrutura do modificador `r8-checkbox--bordered` sem sobrescrever toda a regra.", "Let you customize the `r8-checkbox--bordered` shell without overriding the whole rule."),
          row("--r8-checkbox-shell-padding", "length", "var(--r8-space-3)", "Permitem personalizar a estrutura do modificador `r8-checkbox--bordered` sem sobrescrever toda a regra.", "Let you customize the `r8-checkbox--bordered` shell without overriding the whole rule."),
          row("--r8-checkbox-shell-shadow", "shadow", "var(--r8-shadow-sm)", "Permitem personalizar a estrutura do modificador `r8-checkbox--bordered` sem sobrescrever toda a regra.", "Let you customize the `r8-checkbox--bordered` shell without overriding the whole rule."),
        ],
      });
      break;
    case "color-picker":
      mergeContract(contract, {
        attributes: [
          row(
            "aria-label",
            "string",
            "none",
            "Rótulo acessível recomendado para o acionador quando o contexto da cor não estiver claro no texto ao redor.",
            "Recommended accessible label for the trigger when the color context is not already clear in nearby copy.",
          ),
        ],
        dataAttributes: [
          row(
            "data-r8-mode",
            `"fixed" | "dynamic"`,
            `"fixed"`,
            "Escolhe entre paleta fixa por amostras de cor e o seletor dinâmico com painel visual, sliders e confirmação.",
            "Switches between the fixed swatch palette and the dynamic picker with a board, sliders, and confirmation.",
          ),
          row(
            "data-r8-clearable",
            `"true" | "false"`,
            `"false"`,
            "Mostra e habilita a ação de limpar no painel quando existir um valor confirmado no componente.",
            "Shows and enables the clear action inside the panel when the component currently has a committed value.",
          ),
          row(
            "data-r8-placeholder",
            "string",
            `"Select color"`,
            "Define o texto de fallback exibido no acionador quando nenhuma cor estiver ativa.",
            "Defines the fallback text shown in the trigger when no color is active.",
          ),
          row(
            "data-r8-size",
            `"sm" | "md" | "lg"`,
            `"md"`,
            "Ajusta a densidade do acionador, da amostra, das amostras de cor e do painel dinâmico sem trocar a marcação base.",
            "Adjusts trigger, sample, swatch, and dynamic panel density without replacing the base markup.",
          ),
          row(
            "data-r8-show-alpha",
            `"true" | "false"`,
            `"false"`,
            "Liga o checkerboard nas amostras translucidas e revela o alpha slider quando o seletor estiver em modo dinâmico.",
            "Enables the checkerboard treatment on translucent samples and reveals the alpha slider when the picker runs in dynamic mode.",
          ),
        ],
        cssVariables: [
          row(
            "--r8-color-picker-columns",
            "number",
            "6",
            "Controla quantas colunas o grid de amostras de cor usa antes do breakpoint responsivo entrar em cena.",
            "Controls how many columns the swatch grid uses before the responsive breakpoint kicks in.",
          ),
          row(
            "--r8-color-picker-swatch-size",
            "length",
            "2.25rem",
            "Define o footprint base das amostras de cor e ajuda a equilibrar paletas mais densas ou mais generosas.",
            "Defines the base swatch footprint so you can balance denser or roomier palettes.",
          ),
          row(
            "--r8-color-picker-sample-size",
            "length",
            "1.1rem",
            "Escala a amostra de cor dentro do acionador sem redesenhar a estrutura visual do componente.",
            "Scales the color sample inside the trigger without redrawing the component structure.",
          ),
          row(
            "--r8-color-picker-trigger-min-height",
            "length",
            "3rem",
            "Ajusta a altura mínima do acionador para dialogos compactos ou painéis mais espaçados.",
            "Adjusts the trigger minimum height for compact dialogs or roomier panels.",
          ),
          row(
            "--r8-color-picker-panel-width",
            "length",
            "22rem",
            "Controla a largura do painel dinâmico sem afetar a estrutura externo do componente.",
            "Controls the width of the dynamic panel without changing the component outer shell.",
          ),
          row(
            "--r8-color-picker-spectrum-height",
            "length",
            "12rem",
            "Define a altura do painel visual principal usado para escolher saturacao e luminosidade no modo dinâmico.",
            "Defines the height of the main board used to choose saturation and value in dynamic mode.",
          ),
          row(
            "--r8-color-picker-channel-width",
            "length",
            "1rem",
            "Ajusta a largura dos sliders verticais de hue e alpha no modo dinâmico.",
            "Adjusts the width of the hue and alpha vertical sliders in dynamic mode.",
          ),
        ],
        events: [
          event(
            "r8:color-active-change",
            `{ value, text, swatch, alpha, mode, source }`,
            "Emitido enquanto o valor ativo muda no painel visual, nos sliders ou no input do modo dinâmico.",
            "Emitted while the active value changes through the dynamic mode board, sliders, or input.",
          ),
          event(
            "r8:color-change",
            `{ value, text, swatch, alpha, option, mode, source }`,
            "Emitido quando uma nova cor e confirmada no Color Picker, seja por swatch fixa ou pelo modo dinâmico.",
            "Emitted when a new color is committed in the Color Picker, whether through fixed swatches or the dynamic mode.",
          ),
          event(
            "r8:color-clear",
            `{ value, text, kind, mode }`,
            "Emitido quando o valor atual e limpo pelo botão de limpeza.",
            "Emitted when the current value is cleared through the clear action.",
          ),
        ],
      });
      break;
    case "button":
      mergeContract(contract, {
        attributes: [
          row("type", `"button" | "submit" | "reset"`, `"submit" (native HTML)`, "Tipo nativo do botão. Use `type=\"button\"` em ações que não enviam formulários.", "Native button type. Use `type=\"button\"` for actions that must not submit a form."),
          row("disabled", "boolean", "false", "Desativa interação e aplica o desabilitado treatment da retro8-ui.", "Disables interaction and applies the retro8-ui disabled treatment."),
          row(
            "aria-disabled",
            "boolean",
            "false",
            "Use em links ou hosts customizados quando o desabilitado nativo não estiver disponível.",
            "Use it on links or custom hosts when native disabled is not available.",
          ),
          row("aria-pressed", "boolean", "false", "Marca Buttons alternância ou ação estados persistentes.", "Marks toggle buttons or persistent action states."),
          row("aria-busy", "boolean", "false", "Estado sincronizado quando `data-r8-loading` estiver ativo.", "State kept in sync when `data-r8-loading` is active."),
        ],
        dataAttributes: [
          row("data-r8-variant", buttonVariants, "none", "Aplica variante semântica sem concatenar classes na aplicação hospedeira.", "Applies a semantic variant without concatenating classes in the host app."),
          row("data-r8-size", buttonSizes, `"md"`, "Troca o tamanho visual preservando a classe base `r8-btn`.", "Switches the visual size while keeping the base `r8-btn` class."),
          row("data-r8-block", `"true" | "false"`, `"false"`, "Expande o Button para toda a largura disponível.", "Expands the Button to the full available width."),
          row("data-r8-loading", `"true" | "false"`, `"false"`, "Liga o carregamento estado, injeta spinner pixel e trava a ação.", "Turns on the loading state, injects the pixel spinner and locks the action."),
          row("data-r8-active", `"true" | "false"`, `"false"`, "Conveniência para sincronizar `aria-pressed` via marcação declarativo.", "Convenience attribute for syncing `aria-pressed` through declarative markup."),
        ],
        methods: runtimeMethods,
      });
      break;
    case "border":
      mergeContract(contract, {
        cssVariables: [
          row(
            "--r8-border-sample-color",
            "color",
            "var(--r8-color-border)",
            "Controla a cor efetiva da borda e da sombra seca quando o Border usa o estilo padrão.",
            "Controls the effective border and dry-shadow color when Border uses the default style.",
          ),
          row(
            "--r8-border-sample-width",
            "length",
            "var(--r8-border-thick)",
            "Define a espessura base da moldura antes dos modificadores de lado único entrarem em cena.",
            "Defines the base frame thickness before single-edge modifiers kick in.",
          ),
          row(
            "--r8-border-sample-shadow",
            "box-shadow",
            "4px 4px 0 0 var(--r8-border-sample-color)",
            "Permite trocar, reduzir ou remover a sombra seca sem alterar as classes principais.",
            "Lets you change, reduce or remove the dry shadow without altering the main classes.",
          ),
          row(
            "--r8-border-sample-bg",
            "color",
            "var(--r8-color-surface)",
            "Ajusta o preenchimento interno da superfície sem quebrar o contorno semântico.",
            "Adjusts the inner fill of the surface without breaking the semantic outline.",
          ),
        ],
      });
      break;
    case "autocomplete":
      mergeContract(contract, {
        dataAttributes: [
          row(
            "data-r8-clearable",
            `"true" | "false"`,
            `"false"`,
            "Exibe `r8-autocomplete__clear` quando houver texto digitado, sem precisar de JS customizado na aplicação hospedeira.",
            "Shows `r8-autocomplete__clear` when the field has typed content, without needing custom host-app JS.",
          ),
          row(
            "data-r8-trigger-on-focus",
            `"true" | "false"`,
            `"true"`,
            "Define se o menu abre ao focar o input ou apenas depois da primeira digitacao.",
            "Defines whether the menu opens on input focus or only after the first typed character.",
          ),
          row(
            "data-r8-empty-label",
            "string",
            `"No matches found"`,
            "Texto exibido em `r8-autocomplete__empty` quando nenhum item visível combina com a busca atual.",
            "Text shown inside `r8-autocomplete__empty` when no visible item matches the current query.",
          ),
          row(
            "data-r8-loading",
            `"true" | "false"`,
            `"false"`,
            "Forca o estado de carregamento, oculta as opções temporariamente e prioriza o retorno visual de busca remota.",
            "Forces the loading state, temporarily hides options, and prioritizes remote-search feedback.",
          ),
          row(
            "data-r8-loading-label",
            "string",
            `"Loading suggestions..."`,
            "Texto exibido em `r8-autocomplete__loading` enquanto o escopo estiver em carregamento.",
            "Text shown inside `r8-autocomplete__loading` while the scope remains in loading state.",
          ),
        ],
        events: [
          event(
            "r8:autocomplete-select",
            `{ value, text, option }`,
            "Emitido quando o Autocomplete confirma uma sugestao e escreve o valor final no input.",
            "Emitted when Autocomplete confirms a suggestion and writes the final value back to the input.",
          ),
          event(
            "r8:autocomplete-clear",
            `{ value, text }`,
            "Emitido quando a ação de limpeza limpa o campo e remoção a sugestao selecionada.",
            "Emitted when the clear action resets the field and removes the selected suggestion.",
          ),
        ],
      });
      break;
    case "cascader":
      mergeContract(contract, {
        attributes: [
          row("type", `"button"`, `"button"`, "Use `type=\"button\"` no acionador para evitar submits acidentais.", "Use `type=\"button\"` on the trigger to avoid accidental submits."),
          row("aria-expanded", "boolean", "false", "Sincronizado pelo runtime quando o Cascader painel abre ou fecha.", "Synchronized by the runtime when the Cascader panel opens or closes."),
          row("aria-controls", "string", "generated", "Conecta o acionador ao floating painel controlado pelo Cascader.", "Connects the trigger to the floating panel controlled by the Cascader."),
          row("hidden", "boolean", "managed by runtime", "O painel usa `hidden` para abrir e fechar sem contêiner de framework.", "The panel uses `hidden` to open and close without a framework wrapper."),
        ],
        dataAttributes: [
          row("data-r8-placeholder", "string", `"Select path"`, "Texto inicial exibido no acionador antes da primeira escolha.", "Initial text shown in the trigger before the first selection."),
          row("data-r8-expand-trigger", `"click" | "hover"`, `"click"`, "Define se branches abrem por clique ou hover.", "Defines whether branches expand on click or hover."),
          row("data-r8-check-strictly", `"true" | "false"`, `"false"`, "Permite selecionar parent nós, não apenas leaf nós.", "Allows selecting parent nodes, not only leaf nodes."),
          row("data-r8-filterable", `"true" | "false"`, `"false"`, "Ativa o filtro textual do painel usando `r8-cascader__input`.", "Enables panel text filtering using `r8-cascader__input`."),
          row("data-r8-filter-placeholder", "string", `"Filter options..."`, "Placeholder usado quando o runtime precisa gerar `r8-cascader__input` automaticamente.", "Placeholder used when the runtime needs to generate `r8-cascader__input` automatically."),
          row("data-r8-clearable", `"true" | "false"`, `"false"`, "Exibe `r8-cascader__clear` para limpar a escolha atual.", "Shows `r8-cascader__clear` to clear the current selection."),
          row("data-r8-show-all-levels", `"true" | "false"`, `"true"`, "Controla se o acionador mostra o caminho completo ou apenas o último rótulo selecionado.", "Controls whether the trigger shows the full path or only the last selected label."),
          row("data-r8-separator", "string", `" / "`, "Separador usado para compor o rótulo final do caminho.", "Separator used to compose the final path label."),
          row("data-r8-empty-label", "string", `"No matching routes"`, "Mensagem exibida quando o filtro não encontra resultados.", "Message shown when the filter finds no results."),
          row("data-r8-label", "string", "required on `r8-cascader__node`", "Rótulo semântico de cada nó da árvore declarativa.", "Semantic label for each node inside the declarative tree."),
          row("data-r8-disabled", `"true" | "false"`, `"false"`, "Desativa um branch ou leaf nó sem remover do fluxo visual.", "Disables a branch or leaf node without removing it from the visual flow."),
          row("data-r8-selected", `"true" | "false"`, `"false"`, "Marca o nó inicial selecionado ao montar o Cascader.", "Marks the initial selected node when the Cascader boots."),
          row("data-r8-search", "string", "none", "Texto extra indexado pelo filtro do runtime.", "Extra text indexed by the runtime filter."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:cascader-change", `{ value, label, labels, values, path, node, option, text }`, "Emitido quando o Cascader confirma uma seleção.", "Emitted when the Cascader commits a selection."),
          event("r8:cascader-clear", `{ value, label, labels, values, path, node, option, text }`, "Emitido quando a ação de limpeza remoção a seleção atual.", "Emitted when the clear action removes the current selection."),
          event("r8:choice-change", `{ kind, value, label, labels, values, path, node, option, text }`, "Evento genérico também emitido para manter compatibilidade com o choice runtime.", "Generic event also emitted to preserve compatibility with the choice runtime."),
        ],
      });
      break;
    case "date-picker":
      mergeContract(contract, {
        attributes: [
          row("type", `"button"`, `"button"`, "Use `type=\"button\"` no acionador para evitar submits acidentais em forms.", "Use `type=\"button\"` on the trigger to avoid accidental submits inside forms."),
          row("aria-expanded", "boolean", "false", "Sincronizado pelo runtime quando o painel abre ou fecha.", "Synchronized by the runtime when the panel opens or closes."),
          row("aria-controls", "string", "generated", "Conecta o acionador ao painel gerado pelo calendar runtime.", "Connects the trigger to the panel generated by the calendar runtime."),
          row("aria-haspopup", `"dialog"`, "managed by runtime", "O acionador expone o painel como popup calendar controle.", "The trigger exposes the panel as a popup calendar control."),
          row("hidden", "boolean", "managed by runtime", "O painel popup usa `hidden` para open/close sem contêiner de framework.", "The popup panel uses `hidden` for open/close without a framework wrapper."),
        ],
        dataAttributes: [
          row("data-r8-value", `"YYYY-MM-DD"`, "none", "Valor inicial selecionado pelo calendar.", "Initial value selected by the calendar."),
          row("data-r8-month", `"YYYY-MM"`, "selected month", "Mês inicialmente visível quando o painel abre.", "Month initially visible when the panel opens."),
          row("data-r8-min", `"YYYY-MM-DD"`, "none", "Data mínima habilitada no calendar.", "Minimum enabled date in the calendar."),
          row("data-r8-max", `"YYYY-MM-DD"`, "none", "Data máxima habilitada no calendar.", "Maximum enabled date in the calendar."),
          row("data-r8-placeholder", "string", `"Select a date"`, "Texto exibido enquanto nenhuma data estiver selecionada.", "Text shown while no date is selected."),
          row("data-r8-choice-display", "marker", "none", "Marca o nó do acionador que recebe o rótulo formatado.", "Marks the trigger node that receives the formatted label."),
          row("data-r8-locale", "BCP 47 locale", "document locale", "Define o idioma do mês e dos dias da semana sem depender de uma tecnologia específica.", "Controls the month label and weekday labels without coupling to a framework."),
          row("data-r8-week-start", "0-6", "0", "Define qual dia começa a semana no calendar grid.", "Defines which day starts the week in the calendar grid."),
          row(
            "data-r8-shortcuts",
            `"today,yesterday,week-ago"`,
            "none",
            "Gera atalhos declarativos no topo do calendário para saltar para datas recorrentes sem código extra.",
            "Generates declarative shortcuts at the top of the calendar so recurring dates can be reached without extra code.",
          ),
          row(
            "data-r8-show-week-number",
            `"true" | "false"`,
            `"false"`,
            "Exibe uma coluna adicional com o número da semana para fluxos mais orientados a planejamento.",
            "Displays an extra column with the week number for flows that read the calendar as planning.",
          ),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:date-change", `{ kind, value, label, date, panel, trigger }`, "Emitido quando o date selection muda.", "Emitted when the date selection changes."),
        ],
      });
      break;
    case "icon":
      mergeContract(contract, {
        cssVariables: [
          row(
            "--r8-icon-glyph-size",
            "length",
            "3rem",
            "Controla a largura e a altura do quadrado que recebe o ícone ou símbolo.",
            "Controls the width and height of the square that receives the icon or glyph.",
          ),
          row(
            "--r8-icon-glyph-font-size",
            "length",
            "1.25rem",
            "Ajusta o tamanho de símbolos textuais curtos dentro do moldura.",
            "Adjusts the size of short text glyphs inside the frame.",
          ),
          row(
            "--r8-icon-glyph-bg",
            "color",
            "var(--r8-color-accent)",
            "Troca o fundo do moldura do ícone sem alterar a estrutura do bloco.",
            "Changes the icon frame background without altering the tile structure.",
          ),
          row(
            "--r8-icon-glyph-color",
            "color",
            "var(--r8-color-accent-contrast)",
            "Define a cor do texto ou do SVG inline renderizado dentro do símbolo.",
            "Defines the color used by text or inline SVG rendered inside the glyph.",
          ),
          row(
            "--r8-icon-glyph-border",
            "color",
            "var(--r8-color-border)",
            "Permite ajustar o contorno do símbolo para acompanhar superfícies mais claras ou mais escuras.",
            "Lets you tune the glyph outline to match lighter or darker surfaces.",
          ),
        ],
      });
      break;
    case "datetime-picker":
      mergeContract(contract, {
        attributes: [
          row("type", `"button"`, `"button"`, "Use `type=\"button\"` no acionador para manter a experiência declarativa.", "Use `type=\"button\"` on the trigger to keep the declarative experience."),
          row("aria-expanded", "boolean", "false", "Sincronizado pelo runtime quando o painel abre ou fecha.", "Synchronized by the runtime when the panel opens or closes."),
          row("aria-controls", "string", "generated", "Conecta o acionador ao popup gerado pelo DateTime runtime.", "Connects the trigger to the popup generated by the DateTime runtime."),
          row("aria-haspopup", `"dialog"`, "managed by runtime", "O acionador abre um popup com calendar + time column.", "The trigger opens a popup with a calendar and time column."),
          row("hidden", "boolean", "managed by runtime", "O painel popup usa `hidden` para open/close sem contêiner de framework.", "The popup panel uses `hidden` for open/close without a framework wrapper."),
        ],
        dataAttributes: [
          row("data-r8-value", `"YYYY-MM-DDTHH:mm"`, "none", "Valor inicial completo do DateTime Picker.", "Initial full value for the DateTime Picker."),
          row("data-r8-month", `"YYYY-MM"`, "selected month", "Mês inicialmente visível no calendar.", "Month initially visible in the calendar."),
          row("data-r8-min", `"YYYY-MM-DDTHH:mm" | "YYYY-MM-DD"`, "none", "Limite mínimo aceito para date e time.", "Minimum accepted bound for date and time."),
          row("data-r8-max", `"YYYY-MM-DDTHH:mm" | "YYYY-MM-DD"`, "none", "Limite máximo aceito para date e time.", "Maximum accepted bound for date and time."),
          row("data-r8-time-step", "number", "30", "Intervalo, em minutos, usado para gerar os time campos.", "Interval, in minutes, used to generate the time slots."),
          row("data-r8-placeholder", "string", `"Select date and time"`, "Texto exibido enquanto nenhum valor completo estiver selecionado.", "Text shown while no full value is selected."),
          row("data-r8-choice-display", "marker", "none", "Marca o nó do acionador que recebe o rótulo formatado.", "Marks the trigger node that receives the formatted label."),
          row("data-r8-locale", "BCP 47 locale", "document locale", "Define o idioma do mês, dos dias da semana e da formatação de data.", "Controls the month label, weekday labels and date formatting."),
          row("data-r8-week-start", "0-6", "0", "Define qual dia começa a semana no calendar grid.", "Defines which day starts the week in the calendar grid."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:datetime-change", `{ kind, value, label, date, time, panel, trigger }`, "Emitido quando date ou time muda no seletor.", "Emitted when the date or time changes in the picker."),
        ],
      });
      break;
    case "link":
      mergeContract(contract, {
        attributes: [
          row("href", "string", "required", "Destino nativo do anchor quando `r8-link` é usado em `<a>`.", "Native anchor destination when `r8-link` is used on `<a>`."),
          row("target", `"_self" | "_blank" | "_parent" | "_top"`, `"_self"`, "Comportamento nativo de abertura do link.", "Native link opening behavior."),
          row("rel", "string", "none", "Use com `target=\"_blank\"` para proteger contexto com `noreferrer noopener`.", "Use with `target=\"_blank\"` to protect context with `noreferrer noopener`."),
          row("aria-disabled", "boolean", "false", "Permite expor um link visualmente desabilitado sem trocar o elemento.", "Lets you expose a visually disabled link without changing the element."),
        ],
        cssVariables: [
          row(
            "--r8-link-color",
            "color",
            "var(--r8-color-primary-strong)",
            "Controla a cor base do link no estado idle.",
            "Controls the base link color in the idle state.",
          ),
          row(
            "--r8-link-hover-color",
            "color",
            "var(--r8-link-color)",
            "Permite trocar a cor do texto durante hover e foco sem criar um modificador novo.",
            "Lets you change the text color on hover and focus without creating a new modifier.",
          ),
          row(
            "--r8-link-opacity",
            "number",
            "1",
            "Ajusta a opacidade base do link. Reduzir demais pode comprometer contraste.",
            "Adjusts the base link opacity. Lower values may hurt contrast.",
          ),
          row(
            "--r8-link-hover-opacity",
            "number",
            "1",
            "Define a opacidade aplicada quando o link recebe hover ou foco visível.",
            "Defines the opacity applied when the link receives hover or visible focus.",
          ),
          row(
            "--r8-link-underline-color",
            "color",
            "var(--r8-link-color)",
            "Controla a cor do sublinhado no estado base, independentemente do texto.",
            "Controls the underline color in the base state independently from the text.",
          ),
          row(
            "--r8-link-hover-underline-color",
            "color",
            "var(--r8-link-hover-color)",
            "Permite destacar o sublinhado no hover com uma cor diferente do texto base.",
            "Lets the underline stand out on hover with a different color from the base text.",
          ),
          row(
            "--r8-link-underline-opacity",
            "percentage",
            "0%",
            "Ajusta quao visível o sublinhado fica antes do hover.",
            "Adjusts how visible the underline is before hover.",
          ),
          row(
            "--r8-link-hover-underline-opacity",
            "percentage",
            "100%",
            "Define quao forte o sublinhado aparece no hover e no foco visível.",
            "Defines how strong the underline appears on hover and visible focus.",
          ),
          row(
            "--r8-link-underline-offset",
            "length",
            "0.18em",
            "Controla a distância entre o texto e o sublinhado sem depender de utilities externas.",
            "Controls the distance between the text and underline without relying on external utilities.",
          ),
        ],
      });
      break;
    case "layout-container":
      mergeContract(contract, {
        cssVariables: [
          row(
            "--r8-container-gap",
            "length",
            "var(--r8-space-3)",
            "Controla o espaçamento entre as regioes da estrutura sem alterar espaçamento interno interno de cada bloco.",
            "Controls spacing between shell regions without changing the inner padding of each block.",
          ),
          row(
            "--r8-container-aside-width",
            "length",
            "clamp(11rem, 24vw, 15rem)",
            "Define a largura da coluna lateral quando o layout usa aside ao lado do main.",
            "Defines the width of the side column when the layout places an aside next to the main area.",
          ),
          row(
            "--r8-container-min-height",
            "length",
            "18rem",
            "Estabelece uma altura mínima para a estrutura completa, útil em dashboards e demos de app estrutura.",
            "Sets a minimum height for the full shell, useful in dashboards and app chrome demos.",
          ),
          row(
            "--r8-container-header-height",
            "length",
            "0",
            "Permite fixar uma altura mínima para o cabeçalho quando o estrutura superior precisa de medida mais previsível.",
            "Lets you set a minimum height for the header when the top chrome needs a more predictable measure.",
          ),
          row(
            "--r8-container-footer-height",
            "length",
            "0",
            "Permite fixar uma altura mínima para o rodapé quando a barra inferior precisa de proporção mais estável.",
            "Lets you set a minimum height for the footer when the bottom bar needs a more stable proportion.",
          ),
        ],
      });
      break;
    case "typography":
      mergeContract(contract, {
        cssVariables: [
          row(
            "--r8-text-font-family",
            "font-family",
            "var(--r8-font-body)",
            "Permite trocar a família tipografica de um trecho isolado sem mexer no token global.",
            "Lets you swap the font family of an isolated snippet without changing the global token.",
          ),
          row(
            "--r8-text-size",
            "length",
            "var(--r8-font-size-sm)",
            "Controla a escala de um trecho `r8-text` ou de um paragrafo específico dentro do bloco tipográfico.",
            "Controls the scale of an `r8-text` snippet or a specific paragraph inside the typography block.",
          ),
          row(
            "--r8-text-line-height",
            "number",
            "1.7",
            "Ajusta o line-height de uma linha ou parágrafo específico sem alterar o restante do bloco.",
            "Adjusts the line-height of a specific line or paragraph without changing the rest of the block.",
          ),
          row(
            "--r8-typography-gap",
            "length",
            "var(--r8-space-4)",
            "Controla o ritmo vertical entre títulos, parágrafos, listas e blockquotes do bloco.",
            "Controls the vertical rhythm between headings, paragraphs, lists, and blockquotes in the block.",
          ),
          row(
            "--r8-typography-measure",
            "length",
            "100%",
            "Define a largura máxima do bloco, útil para texto longo, texto de destaque ou trechos editoriais.",
            "Defines the block maximum width, useful for long text, hero copy, or editorial sections.",
          ),
          row(
            "--r8-typography-heading-font",
            "font-family",
            "var(--r8-font-display)",
            "Troca a família dos títulos apenas neste bloco, mantendo o resto da UI intacto.",
            "Swaps the heading family only in this block while keeping the rest of the UI intact.",
          ),
          row(
            "--r8-typography-body-font",
            "font-family",
            "var(--r8-font-body)",
            "Troca a família do corpo do texto para um bloco específico sem acoplar utilitarios externos.",
            "Swaps the body text family for a specific block without relying on external utilities.",
          ),
          row(
            "--r8-typography-body-size",
            "length",
            "var(--r8-font-size-sm)",
            "Permite elevar ou reduzir a escala base de parágrafos, listas e blockquotes do bloco inteiro.",
            "Lets you raise or lower the base scale of paragraphs, lists, and blockquotes across the whole block.",
          ),
          row(
            "--r8-typography-heading-line-height",
            "number",
            "1.2",
            "Controla a compactacao dos títulos sem reescrever os seletores internos.",
            "Controls heading compactness without rewriting the internal selectors.",
          ),
          row(
            "--r8-typography-body-line-height",
            "number",
            "1.7",
            "Ajusta a legibilidade do corpo tipográfico inteiro, inclusive listas e blockquotes.",
            "Adjusts the readability of the full body copy, including lists and blockquotes.",
          ),
        ],
      });
      break;
    case "splitter":
      mergeContract(contract, {
        attributes: [
          row("aria-orientation", `"horizontal" | "vertical"`, "derived from class", "O runtime aplica a orientation da alça a partir da classe do Splitter.", "The runtime applies the handle orientation from the Splitter class."),
          row("aria-valuenow", "number", "50", "Reflete a posição atual da alça durante redimensionamento.", "Reflects the current handle position during resize."),
          row("aria-valuetext", "string", '"50%"', "Expone a posição atual em formato textual para tecnologia assistiva.", "Exposes the current position as text for assistive technology."),
          row("aria-disabled", "boolean", "false", "Marca quando o Splitter foi travado e a alça não deve aceitar interação.", "Marks when the Splitter is locked and the handle should not accept interaction."),
        ],
        dataAttributes: [
          row("data-r8-splitter-position", "number", "50", "Posição inicial da alça em porcentagem.", "Initial handle position in percentage."),
          row("data-r8-splitter-min", "number", "20", "Limite mínimo do primeiro painel em porcentagem.", "Minimum size of the first pane in percentage."),
          row("data-r8-splitter-max", "number", "80", "Limite máximo do primeiro painel em porcentagem.", "Maximum size of the first pane in percentage."),
          row("data-r8-splitter-step", "number", "5", "Passo de teclado usado nas setas; com Shift o valor dobra.", "Keyboard step used by arrow keys; with Shift the value doubles."),
          row("data-r8-splitter-disabled", `"true" | "false"`, `"false"`, "Bloqueia arraste e redimensionamento por teclado mantendo a aparencia do Splitter visível.", "Locks drag and keyboard resize while keeping the Splitter visible."),
        ],
        cssVariables: [
          row("--r8-splitter-position", "percentage", "50%", "Propriedade CSS usada pelo layout para distribuir os painéis.", "Custom property used by the layout to distribute the panes."),
          row("--r8-splitter-pane-bg", "color", "var(--r8-color-surface)", "Permite trocar o fundo base dos painéis sem recriar o componente.", "Lets you change the base pane background without recreating the component."),
          row("--r8-splitter-handle-size", "length", "0.875rem", "Controla a espessura visual da alça no eixo do redimensionamento.", "Controls the visual thickness of the handle on the resize axis."),
          row("--r8-splitter-handle-surface", "color", "var(--r8-color-surface-2)", "Cor base usada nas faixas da alça.", "Base color used in the handle stripes."),
          row("--r8-splitter-handle-accent", "color", "var(--r8-color-accent)", "Cor de destaque usada no grip pixelado da alça.", "Accent color used in the pixel grip on the handle."),
          row("--r8-splitter-handle-border", "color", "var(--r8-color-border)", "Ajusta o contorno da alça para contextos claros ou escuros.", "Adjusts the handle outline for light or dark contexts."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:splitter-resize-start", `{ value, min, max, orientation, source }`, "Emitido quando o usuário inicia um redimensionamento por ponteiro ou teclado.", "Emitted when the user starts resizing through pointer or keyboard."),
          event("r8:splitter-change", `{ value, min, max, orientation, source }`, "Emitido a cada redimensionamento por ponteiro ou teclado.", "Emitted on each resize through pointer or keyboard."),
          event("r8:splitter-resize-end", `{ value, min, max, orientation, source }`, "Emitido quando o redimensionamento termina e o Splitter estabiliza no valor final.", "Emitted when resizing ends and the Splitter settles on the final value."),
        ],
      });
      break;
    case "tabs":
      mergeContract(contract, {
        attributes: [
          row("role", `"tablist" | "tab" | "tabpanel"`, "managed by markup/runtime", "Mantém a relação acessível entre tabs e painéis.", "Keeps the accessible relationship between tabs and panels."),
          row("aria-controls", "string", "required on tab", "Aponta para o painel controlado por cada tab.", "Points to the panel controlled by each tab."),
          row("aria-selected", "boolean", "false", "Indica a tab ativa.", "Indicates the active tab."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:tabs-change", `{ tab, panel, index }`, "Emitido quando a tab ativa muda.", "Emitted when the active tab changes."),
        ],
      });
      break;
    case "collapse":
      mergeContract(contract, {
        attributes: [
          row("aria-expanded", "boolean", "false", "Estado exposto no cabeçalho interativo de cada item.", "State exposed on each interactive item header."),
          row("aria-controls / aria-labelledby", "string", "managed by runtime", "Conecta cabeçalho e corpo para leitura assistiva.", "Connects header and body for assistive reading."),
          row("aria-disabled", "boolean", "false", "Marca headers e itens bloqueados sem remover o bloco da tela.", "Marks blocked headers and items without removing the section from the UI."),
          row("hidden", "boolean", "true on closed body", "Esconde o corpo fechado com semântica nativa.", "Hides the closed body with native semantics."),
        ],
        dataAttributes: [
          row("data-r8-accordion", `"true" | "false"`, `"false"`, "Mantém apenas um item aberto por vez dentro do mesmo grupo.", "Keeps only one item open at a time within the same group."),
          row("data-r8-icon-position", `"left" | "right"`, `"right"`, "Move o ícone de expansão para o lado esquerdo ou direito do cabeçalho.", "Moves the expand icon to the left or right side of the header."),
          row("data-r8-disabled", `"true" | "false"`, `"false"`, "Bloqueia a abertura de um item específico.", "Blocks opening for a specific item."),
        ],
        cssVariables: [
          row("--r8-collapse-icon-size", "length", "1.25rem", "Escala a área reservada para o ícone do cabeçalho.", "Scales the area reserved for the header icon."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:collapse-toggle", `{ open, item }`, "Emitido quando um item abre ou fecha.", "Emitted when an item opens or closes."),
        ],
      });
      break;
    case "empty":
      mergeContract(contract, {
        attributes: [
          row("alt", "string", "recommended on custom images", "Texto alternativo da imagem usada em `r8-empty__media` quando ela carrega contexto relevante.", "Alternative text for the image used in `r8-empty__media` when it carries relevant context."),
        ],
        dataAttributes: [
          row("data-r8-align", `"center" | "left"`, `"center"`, "Controla o alinhamento geral do bloco vazio.", "Controls the overall alignment of the empty block."),
        ],
        cssVariables: [
          row("--r8-empty-media-size", "length", "8rem", "Escala a área reservada para imagem ou ilustração.", "Scales the area reserved for the image or illustration."),
          row("--r8-empty-copy-width", "length", "28rem", "Limita a largura de leitura da cópia do estado vazio.", "Limits the reading width of the empty-state copy."),
        ],
      });
      break;
    case "carousel":
      mergeContract(contract, {
        attributes: [
          row("hidden", "boolean", "true on inactive slides", "Somente o slide ativo fica exposto pelo runtime.", "Only the active slide stays exposed by the runtime."),
          row("aria-current", "boolean", "false", "Marca o dot atualmente ativo.", "Marks the currently active dot."),
          row("aria-label", "string", "recommended on arrows and dots", "Rotula setas e pontos para navegação assistiva.", "Labels arrows and dots for assistive navigation."),
        ],
        dataAttributes: [
          row("data-r8-autoplay", `"true" | "false"`, `"false"`, "Liga a troca automática entre slides.", "Turns on automatic slide rotation."),
          row("data-r8-interval", "number", "3400", "Define o tempo entre trocas quando o autoplay estiver ativo.", "Defines the delay between transitions when autoplay is active."),
          row("data-r8-arrows", `"always" | "hover" | "none"`, `"always"`, "Controla quando as setas laterais ficam visíveis.", "Controls when the side arrows stay visible."),
          row("data-r8-direction", `"prev" | "next"`, "none", "Marca a seta como navegação para tras ou para frente.", "Marks an arrow as backward or forward navigation."),
        ],
        cssVariables: [
          row("--r8-carousel-height", "length", "16rem", "Ajusta a altura útil do viewport e dos slides.", "Adjusts the usable height of the viewport and slides."),
          row("--r8-carousel-arrow-size", "length", "2.5rem", "Escala as setas laterais sem trocar a marcação.", "Scales the side arrows without changing markup."),
          row("--r8-carousel-media-fit", "string", "cover", "Controla o `object-fit` das imagens dentro de `r8-carousel__media`.", "Controls the image `object-fit` inside `r8-carousel__media`."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:carousel-change", `{ index, slide }`, "Emitido quando o slide ativo muda.", "Emitted when the active slide changes."),
        ],
      });
      break;
    case "input":
      mergeContract(contract, {
        attributes: [
          row("type", "string", `"text"`, "Tipo nativo do `<input>` usado com `r8-input`.", "Native `<input>` type used with `r8-input`."),
          row("placeholder", "string", "none", "Placeholder nativo, estilizado pela classe base.", "Native placeholder styled by the base class."),
          row("readonly", "boolean", "false", "Preserva foco e copia, mas impede edição.", "Preserves focus and copy behavior while preventing edits."),
          row("required", "boolean", "false", "Integra com validação nativa do browser.", "Integrates with native browser validation."),
          row("aria-invalid", "boolean", "false", "Ativa invalid retorno visual junto com `r8-input--invalid`.", "Enables invalid feedback together with `r8-input--invalid`."),
        ],
        dataAttributes: [
          row("data-r8-size", `"sm" | "md" | "lg"`, `"md"`, "Escala o campo base ou a estrutura opcional sem uma utility externa.", "Scales the base field or optional shell without an external utility."),
          row("data-r8-clearable", `"true" | "false"`, `"false"`, "Exibe um botão de limpeza dentro de `r8-input-shell` quando houver valor.", "Shows a clear button inside `r8-input-shell` when a value is present."),
          row("data-r8-show-password", `"true" | "false"`, `"false"`, "Ativa a alternância declarativo de senha para inputs do tipo password.", "Enables a declarative password toggle for password inputs."),
          row("data-r8-word-limit", `"true" | "false"`, `"false"`, "Mostra um contador quando `maxlength` estiver presente.", "Shows a counter when `maxlength` is present."),
          row("data-r8-autosize", `"true" | "false"`, `"false"`, "Liga o autosize de textarea no próprio runtime da Retro8 UI.", "Turns textarea autosizing on in the Retro8 UI runtime itself."),
          row("data-r8-min-rows / data-r8-max-rows", "number", "rows / none", "Controlam o piso e o teto do autosize de textarea.", "Control the floor and ceiling of textarea autosizing."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:input-clear", `{ value }`, "Emitido quando o botão de limpeza zera o campo.", "Emitted when the clear button resets the field."),
          event("r8:input-password-toggle", `{ revealed }`, "Emitido quando a alternância alterna a visibilidade da senha.", "Emitted when the toggle changes password visibility."),
        ],
      });
      break;
    case "input-number":
      mergeContract(contract, {
        attributes: [
          row("readonly", "boolean", "false", "Permite foco e cópia, mas bloqueia a edição e os botões de incremento.", "Allows focus and copying while preventing edits and runtime stepping."),
          row("min", "number", "none", "Limite mínimo do campo nativo.", "Minimum value for the native input."),
          row("max", "number", "none", "Limite máximo do campo nativo.", "Maximum value for the native input."),
          row("step", "number", "1", "Incremento usado pelos Buttons laterais.", "Increment used by the side buttons."),
          row("value", "number", "0", "Valor inicial do input.", "Initial input value."),
        ],
        dataAttributes: [
          row("data-r8-size", `"sm" | "md" | "lg"`, `"md"`, "Escala a altura do controle numérico.", "Scales the numeric control height."),
          row("data-r8-precision", "number", "step decimals", "Arredonda e formata o valor final com casas decimais declarativas.", "Rounds and formats the final value with declarative decimals."),
          row("data-r8-step-strictly", `"true" | "false"`, `"false"`, "Alinha digitacao e clique ao grid do step.", "Aligns typing and button clicks to the step grid."),
          row("data-r8-controls-position", `"default" | "right"`, `"default"`, "Move os botões para uma coluna na lateral direita.", "Moves the buttons into a right-side column."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:input-number-change", `{ value, source }`, "Emitido depois de cliques, teclado ou digitacao manual normalizada.", "Emitted after button clicks, keyboard stepping, or normalized manual typing."),
        ],
      });
      break;
    case "input-otp":
      mergeContract(contract, {
        attributes: [
          row("aria-label", "string", "recommended on wrapper", "Nome acessível do conjunto de dígitos OTP.", "Accessible name for the OTP digit group."),
          row("maxlength", "number", "1 per slot", "Cada slot usa `maxlength=1` para manter um único caractere por posição.", "Each slot uses `maxlength=1` to keep one character per position."),
        ],
        dataAttributes: [
          row("data-r8-otp-length", `"4" | "6" | "8"`, `"6"`, "Define o comprimento esperado e pode gerar campos automaticamente.", "Defines the expected length and can auto-generate slots."),
          row("data-r8-size", `"sm" | "md" | "lg"`, `"md"`, "Escala as dimensoes visuais dos campos do OTP.", "Scales the OTP slot visual dimensions."),
          row("data-r8-otp-mask", `"true" | "false"`, `"false"`, "Alterna os campos para modo mascarado sem quebrar navegação e paste.", "Toggles masked slot mode without breaking navigation and paste."),
          row("data-r8-otp-autofocus", `"true" | "false"`, `"false"`, "Foca automaticamente o primeiro slot livre no init.", "Auto-focuses the first available slot on init."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:input-otp-change", `{ value, complete, length, source }`, "Emitido em cada mudança de dígito, backspace, autofill ou paste.", "Emitted on every digit change, backspace, autofill, or paste."),
          event("r8:input-otp-complete", `{ value, length, source }`, "Emitido quando todos os campos ficam preenchidos.", "Emitted when all slots are filled."),
        ],
      });
      break;
    case "input-tag":
      mergeContract(contract, {
        attributes: [
          row("placeholder", "string", "none", "Placeholder do input interno para novas tags.", "Placeholder for the inner input used for new tags."),
          row("maxlength", "number", "none", "Limita o tamanho de cada nova tag no input nativo.", "Limits the size of each new tag in the native input."),
        ],
        dataAttributes: [
          row("data-r8-size", `"sm" | "md" | "lg"`, `"md"`, "Escala altura, chips e área de digitacao do conjunto.", "Scales the height, chips, and entry area."),
          row("data-r8-max-tags", "number", "none", "Limita o total de tags aceitas pelo campo.", "Limits the total accepted tags."),
          row("data-r8-delimiters", "string", "none", "Define caracteres que quebram uma entrada em varias tags.", "Defines characters that split one entry into multiple tags."),
          row("data-r8-clearable", `"true" | "false"`, `"false"`, "Mostra um botão de limpeza all quando houver tags ativas.", "Shows a clear-all button when there are active tags."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:input-tag-add", `{ value, tag, values, source }`, "Emitido quando uma ou mais tags novas entram no conjunto.", "Emitted when one or more new tags enter the set."),
          event("r8:input-tag-remove", `{ value, values, source }`, "Emitido quando uma tag existente e removida.", "Emitted when an existing tag is removed."),
          event("r8:input-tag-clear", `{ values, source }`, "Emitido quando a limpeza all remoção o conjunto inteiro.", "Emitted when clear-all removes the whole set."),
          event("r8:input-tag-change", `{ values }`, "Emitido depois de qualquer mudança estrutural na lista de tags.", "Emitted after any structural change in the tag list."),
        ],
      });
      break;
    case "avatar":
      mergeContract(contract, {
        attributes: [
          row("alt", "string", "none", "Texto alternativo da imagem interna quando o avatar carrega mídia relevante.", "Alternative text for the inner image when the avatar loads meaningful media."),
        ],
        dataAttributes: [
          row("data-r8-avatar-fallback", "string", '"??"', "Define até 2 caracteres para o fallback quando a imagem falha, esta vazia ou não existe.", "Defines up to 2 characters for the fallback when the image fails, is empty, or does not exist."),
          row("data-r8-fit", `"cover" | "contain" | "fill" | "none" | "scale-down"`, `"cover"`, "Controla como a imagem ocupa a moldura do avatar.", "Controls how the image fills the avatar frame."),
        ],
        cssVariables: [
          row("--r8-avatar-fit", "keyword", "cover", "Propriedade CSS que ajusta o `object-fit` da imagem interna.", "Custom property that adjusts the inner image `object-fit`."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:avatar-fallback", `{ alt, fallback, src }`, "Emitido quando a imagem falha e o runtime troca o avatar para o fallback textual.", "Emitted when the image fails and the runtime switches the avatar to the text fallback."),
        ],
      });
      break;
    case "upload":
      mergeContract(contract, {
        attributes: [
          row("accept", "string", "none", "Tipos de arquivo aceitos pelo input nativo da aplicação hospedeira.", "Accepted file types for the host app native input."),
          row("multiple", "boolean", "false", "Permite seleção multipla no input nativo.", "Allows multi-file selection in the native input."),
          row("disabled", "boolean", "false", "Desativa dropzone e acionador do upload controle.", "Disables the upload dropzone and trigger."),
          row("aria-describedby", "idref", "none", "Conecta a dropzone ou o input o texto auxiliar com limite, formato ou retorno visual.", "Connects the dropzone or input to helper copy with limits, formats, or feedback."),
        ],
        dataAttributes: [
          row("data-r8-drag-active", `"true" | "false"`, `"false"`, "Ativa o destaque visual da dropzone enquanto a aplicação hospedeira acompanha dragover.", "Turns on the dropzone highlight while the host app tracks dragover."),
          row("data-r8-upload-state", `"queued" | "uploading" | "success" | "error"`, `"queued"`, "Aplicado em `r8-upload__file` para colorir cada item conforme o estado do envio.", "Applied on `r8-upload__file` to color each item according to transfer state."),
          row("data-r8-upload-trigger", "marker", "none", "Marca um CTA opcional que deve abrir o input nativo escondido.", "Marks an optional CTA that should open the hidden native input."),
          row("data-r8-upload-preview-label / data-r8-upload-remove-label / data-r8-upload-selected-label / data-r8-upload-empty-label", "string", "English defaults", "Sobrescreve os rótulos usados pelo runtime local para prévia, remoção, selecionado e vazio.", "Overrides the labels used by the local runtime for preview, remove, selected, and empty states."),
        ],
        cssVariables: [
          row("--r8-upload-accent", "color", "var(--r8-color-primary)", "Destaque local usado na dropzone ativa e nos estados principais da estrutura.", "Local accent used by the active dropzone and key shell states."),
          row("--r8-upload-min-height", "length", "9rem", "Altura mínima da dropzone antes da aplicação hospedeira preencher a área com miniaturas ou instruções.", "Minimum dropzone height before the host app fills the area with thumbnails or instructions."),
          row("--r8-upload-thumb-size", "length", "3rem", "Tamanho base dos prévias quadrados em lista ou avatar.", "Base size for square previews in list or avatar layouts."),
          row("--r8-upload-progress", "percentage", "0%", "Percentual usado por `r8-upload__progress` para mostrar fila, envio parcial ou nova tentativa.", "Percentage used by `r8-upload__progress` to show queued, partial upload, or retry states."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:upload-change", `{ files, items, source }`, "Emitido quando input nativo ou dropzone recebem arquivos e a fila local e sincronizada.", "Emitted when the native input or dropzone receives files and the local queue is synchronized."),
          event("r8:upload-remove", `{ file, files, index, source }`, "Emitido quando um item gerenciado pelo runtime local é removido da fila.", "Emitted when an item managed by the local runtime is removed from the queue."),
          event("r8:upload-preview", `{ file, id, source, url }`, "Emitido quando uma ação de prévia abre um arquivo local com object URL.", "Emitted when a preview action opens a local file through an object URL."),
        ],
      });
      break;
    case "slider":
      mergeContract(contract, {
        attributes: [
          row("aria-valuenow", "number", "0", "Valor atual exposto para tecnologias assistivas.", "Current value exposed to assistive tech."),
          row("aria-valuemin", "number", "0", "Limite mínimo do slider.", "Minimum slider value."),
          row("aria-valuemax", "number", "100", "Limite máximo do slider.", "Maximum slider value."),
        ],
        dataAttributes: [
          row("data-r8-value", "number", "0", "Valor inicial usado para preencher o Slider.", "Initial value used to fill the Slider."),
          row("data-r8-slider-output", "marker", "none", "Marca o nó que deve receber a leitura atual em texto.", "Marks the node that should receive the current textual readout."),
        ],
        cssVariables: [
          row("--r8-progress-value", "percentage", "0%", "Propriedade CSS compartilhada entre Slider e Progress preenchimento.", "Custom property shared between Slider and Progress fill."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:slider-change", `{ value }`, "Emitido quando ponteiro ou teclado ajustam o Slider.", "Emitted when pointer or keyboard adjust the Slider."),
        ],
      });
      break;
    case "progress":
      mergeContract(contract, {
        dataAttributes: [
          row("data-r8-value", "number", "0", "Shortcut declarativo para atualizar o preenchimento e o `aria-valuenow`.", "Declarative shortcut for updating the fill and `aria-valuenow`."),
          row("data-r8-variant", `"default" | "success" | "warning" | "danger"`, "none", "Aplica a tone do Progress via runtime.", "Applies the Progress tone through the runtime."),
          row("data-r8-shape", `"line" | "circle"`, `"line"`, "Alterna entre barra linear e dial circular sem trocar a estrutura principal do componente.", "Switches between a linear bar and a circular dial without replacing the main component structure."),
          row("data-r8-label-position", `"outside" | "inside"`, `"outside"`, "Move a leitura percentual para dentro da trilha quando a barra precisa ficar mais compacta.", "Moves the percentage readout inside the track when the bar needs a more compact layout."),
          row("data-r8-indeterminate", `"true" | "false"`, `"false"`, "Ativa animacao continua quando o fluxo ainda não tem percentual definitivo.", "Turns on continuous animation when the flow does not have a definitive percentage yet."),
          row("data-r8-progress-value-output", "marker", "none", "Marca os nós que o runtime deve manter sincronizados com o valor percentual atual.", "Marks the nodes that the runtime should keep synchronized with the current percentage value."),
        ],
        cssVariables: [
          row("--r8-progress-value", "percentage", "0%", "Controla a largura visual da barra interna.", "Controls the visual width of the inner bar."),
          row("--r8-progress-height", "length", "1.5rem", "Define a espessura da trilha linear sem trocar classes extras.", "Defines the linear track thickness without extra classes."),
          row("--r8-progress-dial-size", "length", "6.5rem", "Escala o tamanho total do dial circular.", "Scales the full circular dial size."),
          row("--r8-progress-dial-thickness", "length", "0.72rem", "Controla a espessura útil do anel circular.", "Controls the usable thickness of the circular ring."),
          row("--r8-progress-bar-color", "color", "var(--r8-color-accent)", "Permite personalizar preenchimento e trilha sem sair da API pública.", "Lets you customize fill and track colors without leaving the public API."),
          row("--r8-progress-track-color", "color", "var(--r8-color-surface-2)", "Permite personalizar preenchimento e trilha sem sair da API pública.", "Lets you customize fill and track colors without leaving the public API."),
          row("--r8-progress-duration", "time", "1.15s", "Ajusta o ritmo da animacao indeterminada.", "Adjusts the indeterminate animation pace."),
        ],
        methods: runtimeMethods,
      });
      mergeContract(contract, withVariantDataAttribute(component.name, `"success" | "warning" | "danger"`));
      break;
    case "skeleton":
      mergeContract(contract, {
        dataAttributes: [
          row("data-r8-animated", `"true" | "false"`, `"true"`, "Liga ou pausa o shimmer sem trocar a estrutura do placeholder.", "Turns the shimmer on or off without replacing the placeholder structure."),
          row("data-r8-shape", `"rectangle" | "circle"`, `"rectangle"`, "Quando aplicado em `r8-skeleton__shape`, alterna o bloco livre entre rectangle e circle.", "When applied on `r8-skeleton__shape`, switches the free block between rectangle and circle."),
        ],
        cssVariables: [
          row("--r8-skeleton-gap", "length", "var(--r8-space-3)", "Controla o espaçamento interno entre as peças do esqueleto.", "Controls internal spacing between skeleton pieces."),
          row("--r8-skeleton-block-height", "length", "7rem", "Ajustam a altura de blocos grandes e áreas de mídia.", "Adjust the height of large blocks and media areas."),
          row("--r8-skeleton-media-height", "length", "9rem", "Ajustam a altura de blocos grandes e áreas de mídia.", "Adjust the height of large blocks and media areas."),
          row("--r8-skeleton-line-height", "length", "1rem", "Permitem afinar linhas e controlar a largura visual do título.", "Let you slim down lines and control the visual title width."),
          row("--r8-skeleton-title-width", "length", "48%", "Permitem afinar linhas e controlar a largura visual do título.", "Let you slim down lines and control the visual title width."),
          row("--r8-skeleton-avatar-size", "length", "3rem", "Escalam avatar e CTA falsa em templates de profile ou card.", "Scale the avatar and fake CTA in profile or card templates."),
          row("--r8-skeleton-button-width", "length", "5.5rem", "Escalam avatar e CTA falsa em templates de profile ou card.", "Scale the avatar and fake CTA in profile or card templates."),
          row("--r8-skeleton-shape-width", "length", "6rem", "Definem largura, altura e radius do bloco livre para montar skeleton rectangle ou circle.", "Define width, height, and radius for the free block so you can assemble rectangle or circle skeletons."),
          row("--r8-skeleton-shape-height", "length", "1rem", "Definem largura, altura e radius do bloco livre para montar skeleton rectangle ou circle.", "Define width, height, and radius for the free block so you can assemble rectangle or circle skeletons."),
          row("--r8-skeleton-shape-radius", "length", "0", "Definem largura, altura e radius do bloco livre para montar skeleton rectangle ou circle.", "Define width, height, and radius for the free block so you can assemble rectangle or circle skeletons."),
          row("--r8-skeleton-speed", "time", "1.2s", "Ajusta a velocidade da animacao do shimmer.", "Adjusts the shimmer animation speed."),
        ],
      });
      break;
    case "table":
      mergeContract(contract, {
        cssVariables: [
          row("--r8-table-max-height", "length", "16rem", "Define a altura máxima do contêiner quando o cabeçalho fica sticky.", "Defines the wrapper max height when the header becomes sticky."),
          row("--r8-table-cell-padding-x", "length", "var(--r8-space-3)", "Ajustam a densidade horizontal e vertical das celulas.", "Adjust the horizontal and vertical density of table cells."),
          row("--r8-table-cell-padding-y", "length", "var(--r8-space-3)", "Ajustam a densidade horizontal e vertical das celulas.", "Adjust the horizontal and vertical density of table cells."),
          row("--r8-table-header-bg", "color", "var(--r8-color-surface-2)", "Permitem personalizar cabeçalho, linhas base e zebra sem trocar a estrutura.", "Let you customize the header, base rows, and zebra striping without changing the structure."),
          row("--r8-table-row-bg", "color", "var(--r8-color-surface)", "Permitem personalizar cabeçalho, linhas base e zebra sem trocar a estrutura.", "Let you customize the header, base rows, and zebra striping without changing the structure."),
          row("--r8-table-row-alt-bg", "color", "var(--r8-color-surface-2)", "Permitem personalizar cabeçalho, linhas base e zebra sem trocar a estrutura.", "Let you customize the header, base rows, and zebra striping without changing the structure."),
          row("--r8-table-hover-bg", "color", "color-mix(in srgb, var(--r8-color-primary) 10%, var(--r8-color-surface) 90%)", "Controla o destaque de hover nas linhas quando `r8-table--hover` estiver ativo.", "Controls row hover highlight when `r8-table--hover` is active."),
        ],
      });
      break;
    case "breadcrumb":
      mergeContract(contract, {
        attributes: [
          row("aria-label", "string", `"Breadcrumb" recommended on nav`, "Nome acessível recomendado no `nav` que envolve a trilha.", "Recommended accessible name on the `nav` wrapping the trail."),
          row("aria-current", `"page"`, "only on current item", "Marca o último item como página atual para tecnologia assistiva.", "Marks the last item as the current page for assistive technology."),
        ],
        dataAttributes: [
          row("data-r8-separator", `"slash" | "chevron" | "double" | "dot"`, `"slash"`, "Troca o separador visual entre os itens sem alterar a estrutura do breadcrumb.", "Changes the visual separator between items without altering the breadcrumb structure."),
        ],
        cssVariables: [
          row("--r8-breadcrumb-gap", "length", "var(--r8-space-2)", "Ajusta o espaçamento entre os itens e o separador.", "Adjusts spacing between items and the separator."),
          row("--r8-breadcrumb-separator-color", "color", "var(--r8-color-accent)", "Controla a cor usada no caractere separador.", "Controls the color used for the separator character."),
          row("--r8-breadcrumb-current-color", "color", "var(--r8-color-ink)", "Define o destaque do item atual sem transformar o breadcrumb em tabs.", "Defines the current item emphasis without turning the breadcrumb into tabs."),
          row("--r8-breadcrumb-link-color", "color", "var(--r8-color-ink-muted)", "Permitem alinhar o tom dos links com o contexto visual local.", "Let you align link tone with the local visual context."),
          row("--r8-breadcrumb-link-hover-color", "color", "var(--r8-color-primary-strong)", "Permitem alinhar o tom dos links com o contexto visual local.", "Let you align link tone with the local visual context."),
        ],
      });
      break;
    case "dropdown":
      mergeContract(contract, {
        attributes: [
          row("aria-expanded", "boolean", "false on trigger", "Reflete o estado aberto do acionador principal do dropdown.", "Reflects the open state on the dropdown's main trigger."),
          row("aria-disabled", "boolean", "false", "Bloqueia itens específicos do menu sem removê-los da leitura visual.", "Blocks specific menu items without removing them from visual reading."),
        ],
        dataAttributes: [
          row("data-r8-command", "string", "item text fallback", "Valor emitido no evento `r8:dropdown-command` ao acionar um item.", "Value emitted in the `r8:dropdown-command` event when an item is activated."),
          row("data-r8-close-on-select", `"true" | "false"`, `"true"`, "Quando `false`, mantém o menu aberto após selecionar uma ação.", "When `false`, keeps the menu open after selecting an action."),
        ],
        cssVariables: [
          row("--r8-dropdown-menu-width", "length", "12rem", "Ajusta a largura mínima do painel de ações.", "Adjusts the minimum width of the actions panel."),
          row("--r8-dropdown-item-padding-x", "length", "var(--r8-space-3)", "Controlam a densidade interna dos itens do menu.", "Control the internal density of menu items."),
          row("--r8-dropdown-item-padding-y", "length", "var(--r8-space-2)", "Controlam a densidade interna dos itens do menu.", "Control the internal density of menu items."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:dropdown-command", `{ command, option, text, value }`, "Emitido quando uma ação do dropdown é escolhida.", "Emitted when a dropdown action is chosen."),
          event("r8:choice-change", `{ kind, option, text, value }`, "Evento genérico compartilhado com outras famílias de escolha.", "Generic event shared with other choice families."),
        ],
      });
      break;
    case "pagination":
      mergeContract(contract, {
        attributes: [
          row("aria-current", "boolean", "false", "Marca a página ativa na lista de items.", "Marks the active page inside the item list."),
          row("aria-label", "string", "recommended on prev/next", "Nome acessível para os botões de navegação lateral.", "Accessible name for the side navigation buttons."),
        ],
        dataAttributes: [
          row("data-r8-total-pages", "number", "required for dynamic pager", "Total de páginas usadas para desenhar prev/next, pager e jumper.", "Total page count used to draw prev/next, pager, and jumper."),
          row("data-r8-current-page", "number", "1", "Página atual controlada pelo runtime.", "Current page controlled by the runtime."),
          row("data-r8-pager-count", "odd number", "7", "Quantidade de pagers visíveis antes de colapsar com elipses.", "Visible pager count before collapsing with ellipses."),
          row("data-r8-hide-on-single-page", `"true" | "false"`, `"false"`, "Esconde o componente quando houver só uma página.", "Hides the component when there is only one page."),
        ],
        cssVariables: [
          row("--r8-pagination-control-size", "length", "2rem", "Escala o tamanho dos botões numéricos e de navegação.", "Scales the numeric and navigation button size."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:pagination-change", `{ page, totalPages, source }`, "Emitido quando a página ativa muda por clique, nav ou jumper.", "Emitted when the active page changes through page buttons, nav, or jumper."),
        ],
      });
      break;
    case "rate":
      mergeContract(contract, {
        attributes: [
          row("aria-checked", "boolean", "false", "Somente a estrela selecionada recebe `aria-checked=\"true\"`; as anteriores continuam visualmente ativas.", "Only the selected star has `aria-checked=\"true\"`; earlier stars remain visually active."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:rate-change", `{ value }`, "Emitido quando a nota visual muda.", "Emitted when the visual rating changes."),
        ],
      });
      break;
    case "transfer":
      mergeContract(contract, {
        methods: runtimeMethods,
        events: [
          event("r8:transfer-change", `{ direction, movedItems }`, "Emitido depois que itens selecionados mudam de painel.", "Emitted after selected items move between panels."),
        ],
      });
      break;
    case "alert":
      mergeContract(contract, {
        attributes: [
          row("role", `"alert" | "status"`, `"alert"`, "Role recomendada para anunciar retorno visual inline de forma contextual.", "Recommended role for announcing inline contextual feedback."),
          row("aria-live", `"assertive" | "polite"`, `"assertive"`, "Controla como tecnologias assistivas anuncia o Alert quando ele muda dinamicamente.", "Controls how assistive tech announces the Alert when it changes dynamically."),
          row("hidden", "boolean", "false", "Opcional para examples dismissible ou live alerts controlados pelo runtime.", "Optional for dismissible examples or live alerts controlled by the runtime."),
        ],
        dataAttributes: [
          row("data-r8-dismiss", `"true" | "false"`, `"false"`, "No close button interno, aciona o dismiss auxiliar e sincroniza o estado do Alert.", "On an inner close button, triggers the dismiss helper and keeps the Alert state in sync."),
          row("data-r8-variant", `"primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "info" | "dark" | "light"`, "none", "Aplica a semantic tone sem concatenar modificador classes na aplicação hospedeira.", "Applies a semantic tone without concatenating modifier classes in the host app."),
          row("data-r8-toggle", `"true"`, `"true"`, "No acionador, revela ou recolhe um Alert hidden para live examples e inline callouts.", "On a trigger, reveals or hides a hidden Alert for live examples and inline callouts."),
          row("data-r8-target", "CSS selector", "required on trigger", "Aponta para o Alert controlado pelo auxiliar declarativo.", "Points to the Alert controlled by the declarative helper."),
          row("data-r8-close", "CSS selector | empty", "nearest host", "Fecha o Alert informado ou o elemento mais próximo pelo auxiliar de runtime.", "Closes the provided Alert or the nearest host through the runtime helper."),
        ],
        cssVariables: [
          row("--r8-alert-background", "length", "var(--r8-color-light)", "Controlam superfície, contraste e faixa lateral do Alert.", "Control the Alert surface, contrast, and side accent rail."),
          row("--r8-alert-foreground", "color", "var(--r8-color-light-contrast)", "Controlam superfície, contraste e faixa lateral do Alert.", "Control the Alert surface, contrast, and side accent rail."),
          row("--r8-alert-accent", "color", "var(--r8-color-dark)", "Controlam superfície, contraste e faixa lateral do Alert.", "Control the Alert surface, contrast, and side accent rail."),
          row("--r8-alert-gap", "length", "var(--r8-space-3)", "Ajustam a densidade interna do bloco sem reescrever a estrutura.", "Adjust the block's internal density without rewriting its structure."),
          row("--r8-alert-padding", "length", "var(--r8-space-4)", "Ajustam a densidade interna do bloco sem reescrever a estrutura.", "Adjust the block's internal density without rewriting its structure."),
          row("--r8-alert-icon-size", "length", "2rem", "Escala base do bloco usado por `r8-alert__icon`.", "Base size of the tile used by `r8-alert__icon`."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:dismiss", `{ target }`, "Emitido quando o Alert é fechado pelo auxiliar declarativo.", "Emitted when the Alert is closed by the declarative helper."),
          event("r8:target-open", `{ target, trigger }`, "Emitido quando o Alert abre pelo auxiliar declarativo.", "Emitted when the Alert opens through the declarative helper."),
          event("r8:target-close", `{ target, trigger }`, "Emitido quando o Alert fecha pelo auxiliar declarativo.", "Emitted when the Alert closes through the declarative helper."),
        ],
      });
      break;
    case "loading":
      mergeContract(contract, {
        attributes: [
          row("role", `"status"`, `"status"`, "Use no elemento para anunciar progresso assíncrono sem interromper a leitura atual.", "Use on the host to announce asynchronous progress without interrupting current reading."),
          row("aria-live", `"polite" | "off"`, `"polite"`, "Controla se alterações do rótulo visível devem ser anunciados por tecnologias assistivas.", "Controls whether visible label updates should be announced by assistive tech."),
          row("aria-label", "string", "recommended when there is no visible label", "Rótulo acessível quando o Carregamento não renderiza `r8-loading__label`.", "Accessible label when the Loading does not render `r8-loading__label`."),
        ],
        cssVariables: [
          row("--r8-loading-accent", "color", "var(--r8-color-accent)", "Destaque principal usado por pixels, pontos, barras e células do indicador giratório.", "Main accent used by pixels, dots, bars and spinner cells."),
          row("--r8-loading-track", "color", "var(--r8-color-surface-2)", "Superfície da trilha para variantes com varredura bar.", "Track surface for scan bar variants."),
          row("--r8-loading-size", "length", "0.9rem", "Escala base compartilhada entre todos os elementos internos do Carregamento.", "Base scale shared across every Loading sub-element."),
          row("--r8-loading-speed", "time", "0.8s", "Velocidade de animacao compartilhada pelos variantes reutilizáveis.", "Animation speed shared by the reusable variants."),
        ],
      });
      break;
    case "dialog":
      mergeContract(contract, {
        attributes: [
          row("open", "boolean", "false", "Estado nativo de `<dialog>`. Em outros elementos, use `hidden` e implemente o comportamento modal.", "Native `<dialog>` state. For other elements, use `hidden` and implement modal behavior."),
          row("aria-labelledby", "string", "recommended", "Conecta o title ao container modal.", "Connects the title to the modal container."),
        ],
        dataAttributes: [
          row("data-r8-toggle", `"dialog"`, "none", "Marca um acionador declarativo para abrir ou fechar o alvo.", "Marks a declarative trigger for opening or closing the target."),
          row("data-r8-target", "CSS selector", "required", "Selector do Dialog ou overlay controlado.", "Selector of the controlled Dialog or overlay."),
          row("data-r8-close", "CSS selector | empty", "nearest host", "Fecha o alvo informado ou o overlay mais próximo.", "Closes the provided target or the nearest overlay host."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:target-open", `{ target, trigger }`, "Emitido quando o Dialog abre pelo auxiliar declarativo.", "Emitted when the Dialog opens through the declarative helper."),
          event("r8:target-close", `{ target, trigger }`, "Emitido quando o Dialog fecha pelo auxiliar declarativo.", "Emitted when the Dialog closes through the declarative helper."),
        ],
      });
      break;
    case "poptip":
      mergeContract(contract, {
        attributes: [
          row("hidden", "boolean", "true before open", "Mantém o Poptip fora do fluxo até o acionador ou a aplicação abrirem o overlay.", "Keeps the Poptip out of flow until the trigger or the host app opens the overlay."),
          row("role", `"tooltip" | custom`, "recommended for hint mode", "Use `role=\"tooltip\"` quando o Poptip estiver atuando como dica curta por hover ou foco.", "Use `role=\"tooltip\"` when the Poptip acts as a short hover or focus hint."),
        ],
        dataAttributes: [
          row("data-r8-toggle", `"poptip" | "popover" | "tooltip"`, `"poptip"`, `Acionador declarativo usado para abrir ${component.name}; aliases antigos continuam aceitos por compatibilidade.`, `Declarative trigger used to open ${component.name}; older aliases remain accepted for compatibility.`),
          row("data-r8-target", "CSS selector", "required", `Alvo controlado por ${component.name}.`, `Target controlled by ${component.name}.`),
          row("data-r8-close", "CSS selector | empty", "nearest host", `Fecha ${component.name} pelo auxiliar do runtime.`, `Closes ${component.name} through the runtime helper.`),
          row("data-r8-trigger", `"click" | "hover" | "focus" | "contextmenu"`, `"click"`, "Controla se o overlay abre por clique, hover, foco ou clique de contexto.", "Controls whether the overlay opens on click, hover, focus, or context click."),
          row("data-r8-variant", `"panel" | "hint"`, `"panel"`, "Alterna entre painel rico e dica compacta sem trocar de componente.", "Switches between a richer panel and a compact hint without switching components."),
          row("data-r8-placement", `"top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "right"`, `"bottom-start"`, "Define o posicionamento flutuante relativo ao acionador.", "Defines the floating placement relative to the trigger."),
        ],
        cssVariables: [
          row("--r8-poptip-width", "length", "20rem", "Limita a largura máxima do painel ou dica para manter leitura confortavel.", "Limits the panel or hint max width so reading stays comfortable."),
          row("--r8-poptip-background", "length", "var(--r8-color-surface)", "Permitem criar estruturas mais claros ou escuros sem duplicar variantes estruturais.", "Let you create lighter or darker shells without duplicating structural variants."),
          row("--r8-poptip-color", "color", "var(--r8-color-ink)", "Permitem criar estruturas mais claros ou escuros sem duplicar variantes estruturais.", "Let you create lighter or darker shells without duplicating structural variants."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:target-open", `{ target, trigger }`, `Emitido quando ${component.name} abre pelo auxiliar declarativo.`, `Emitted when ${component.name} opens through the declarative helper.`),
          event("r8:target-close", `{ target, trigger }`, `Emitido quando ${component.name} fecha pelo auxiliar declarativo.`, `Emitted when ${component.name} closes through the declarative helper.`),
        ],
      });
      break;
    case "drawer":
      mergeContract(contract, {
        attributes: [
          row("aria-labelledby | aria-label", "string", "recommended", `Nome acessível recomendado para ${component.name}, especialmente quando houver título visual no cabeçalho.`, `Recommended accessible name for ${component.name}, especially when there is a visual title in the header.`),
          row("hidden", "boolean", "true before open", `Mantém ${component.name} fora do fluxo até o auxiliar declarativo ou a aplicação hospedeira abrirem o painel.`, `Keeps ${component.name} out of flow until the declarative helper or the host application opens the panel.`),
        ],
        dataAttributes: [
          row("data-r8-toggle", `"drawer"`, "none", `Acionador declarativo para abrir ${component.name}.`, `Declarative trigger used to open ${component.name}.`),
          row("data-r8-target", "CSS selector", "required", `Alvo controlado por ${component.name}.`, `Target controlled by ${component.name}.`),
          row("data-r8-close", "CSS selector | empty", "nearest host", `Fecha ${component.name} pelo auxiliar do runtime.`, `Closes ${component.name} through the runtime helper.`),
          row("data-r8-modal", `"true" | "false"`, `"true"`, "Quando verdadeiro, cria o fundo modal, move e contém o foco e torna o conteúdo externo inerte. Quando falso, os controles ao redor permanecem disponíveis.", "When true, adds a backdrop, moves and contains focus, and makes the background inert. When false, surrounding controls remain usable."),
          row("data-r8-close-on-backdrop", `"true" | "false"`, `"true"`, "Quando `false`, impede fechamento por clique fora ou no backdrop.", "When `false`, prevents closing through outside click or backdrop click."),
          row("data-r8-close-on-escape", `"true" | "false"`, `"true"`, "Quando `false`, mantém o painel aberto mesmo ao pressionar Escape.", "When `false`, keeps the panel open even when Escape is pressed."),
          row("data-r8-lock-scroll", `"true" | "false"`, `"true"`, "Permite desligar o bloqueio de scroll do `body` em drawers globais.", "Lets you disable `body` scroll locking for global drawers."),
        ],
        cssVariables: [
          row("--r8-drawer-size", "length", "24rem", "Controla a largura dos drawers laterais e a altura dos drawers verticais.", "Controls the width of side drawers and the height of vertical drawers."),
          row("--r8-drawer-min-size", "length", "18rem", "Define o tamanho mínimo do painel antes dos limites do viewport entrarem em ação.", "Defines the panel minimum size before viewport limits kick in."),
          row("--r8-drawer-header-surface", "color", "var(--r8-color-surface-2)", "Permitem alinhar cabeçalho e rodapé a estruturas claros, escuros ou mais temáticos.", "Let you tune the header and footer for lighter, darker, or more thematic shells."),
          row("--r8-drawer-footer-surface", "color", "var(--r8-color-surface-3)", "Permitem alinhar cabeçalho e rodapé a estruturas claros, escuros ou mais temáticos.", "Let you tune the header and footer for lighter, darker, or more thematic shells."),
          row("--r8-drawer-body-padding", "length", "var(--r8-space-4)", "Ajusta a densidade do corpo sem alterar a estrutura interna do painel.", "Adjusts body density without changing the panel's internal structure."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:drawer-open", `{ target, trigger }`, `Emitido quando ${component.name} entra no ciclo de abertura.`, `Emitted when ${component.name} enters its opening cycle.`),
          event("r8:drawer-opened", `{ target, trigger }`, `Emitido quando ${component.name} recebe a classe de abertura no próximo quadro de animação; não aguarda o término da transição CSS.`, `Emitted when ${component.name} receives its open class on the next animation frame; it does not wait for the CSS transition to finish.`),
          event("r8:drawer-close", `{ target, trigger }`, `Emitido quando ${component.name} inicia o fechamento.`, `Emitted when ${component.name} starts closing.`),
          event("r8:drawer-closed", `{ target, trigger }`, `Emitido apos a transição principal de fechamento do ${component.name}.`, `Emitted after the main ${component.name} closing transition.`),
          event("r8:target-open", `{ target, trigger }`, `Emitido quando ${component.name} abre pelo auxiliar declarativo.`, `Emitted when ${component.name} opens through the declarative helper.`),
          event("r8:target-close", `{ target, trigger }`, `Emitido quando ${component.name} fecha pelo auxiliar declarativo.`, `Emitted when ${component.name} closes through the declarative helper.`),
        ],
      });

      if (component.id === "drawer") {
        mergeContract(contract, {
          dataAttributes: [
            row("data-r8-overlay-scope", "marker", "none", "Opcional no contêiner para conter drawer e backdrop dentro de uma área local de prévia ou app estrutura.", "Optional on a wrapper to contain the drawer and backdrop inside a local preview area or app shell."),
          ],
        });
      }
      break;
    case "config-provider":
      mergeContract(contract, {
        dataAttributes: [
          row("data-theme", `"night" | "terminal" | "danger"`, "none", "Opcional na aplicação hospedeira quando quiser combinar `Config Provider` com tema switches externos ou estado vindo de CMS.", "Optional in the host app when you want to pair `Config Provider` with external theme switches or CMS-driven state."),
          row("data-density", `"compact" | "comfortable"`, "none", "Permite controlar a densidade local do escopo por atributo, sem depender de classes utilitarias adicionais.", "Lets you control local scope density through an attribute without relying on extra utility classes."),
        ],
        cssVariables: [
          row("--r8-config-provider-padding", "length", "var(--r8-space-4)", "Ajusta o espaçamento interno da estrutura do provider sem alterar os componentes internos diretamente.", "Adjusts the provider shell padding without directly altering inner components."),
          row("--r8-config-provider-gap", "length", "var(--r8-space-4)", "Controla o espaçamento entre os filhos imediatos do escopo.", "Controls spacing between the scope immediate children."),
          row("--r8-config-provider-surface", "color", "var(--r8-color-surface)", "Troca a superfície do contêiner local enquanto os descendentes continuam herdando os tokens do escopo.", "Changes the local wrapper surface while descendants continue inheriting the scope tokens."),
          row("--r8-config-provider-border", "color", "var(--r8-color-border)", "Permite afinar o contorno do provider para estruturas mais claros, escuros ou temáticos.", "Lets you tune the provider outline for lighter, darker, or themed shells."),
          row("--r8-config-provider-shadow", "shadow", "var(--r8-shadow-md)", "Controla a sombra estrutural do contêiner local.", "Controls the structural shadow of the local wrapper."),
          row("--r8-config-provider-text", "color", "var(--r8-color-ink)", "Define a cor base do texto do contêiner sem quebrar a heranca de tokens.", "Defines the wrapper base text color without breaking token inheritance."),
          row("--r8-color-surface", "color", "inherited from theme", "Superfície base reaplicada para todos os filhos dentro do escopo.", "Base surface reapplied to all children inside the scope."),
          row("--r8-color-ink", "color", "inherited from theme", "Texto principal dos descendentes dentro do escopo.", "Primary descendant text inside the scope."),
          row("--r8-color-primary", "color", "inherited from theme", "Destaque principal para Buttons, badges e controles no escopo.", "Primary accent for Buttons, badges and controls inside the scope."),
          row("--r8-font-size-sm", "length", "inherited from theme", "Ajusta a escala média de texto dentro do escopo, útil para presets de densidade local.", "Adjusts the medium text scale inside the scope, useful for local density presets."),
          row("--r8-space-4", "length", "inherited from theme", "Ajusta o ritmo de espaçamento usado por varios componentes dentro do escopo.", "Adjusts the spacing rhythm used by many components inside the scope."),
          row("--r8-shadow-md", "shadow", "inherited from theme", "Shadow principal usada pelas superfícies dentro do escopo.", "Main shadow used by surfaces inside the scope."),
          row("--r8-dialog-backdrop", "color", "inherited from theme", "Backdrop reaplicado para overlays renderizados dentro do escopo.", "Backdrop reapplied to overlays rendered inside the scope."),
        ],
      });
      break;
    case "switch":
      mergeContract(contract, {
        cssVariables: [
          row("--r8-switch-enabled-bg", "color", "var(--r8-color-success)", "Cor da trilha quando o Switch estiver ligado ou com `aria-checked=\"true\"`.", "Track color when the Switch is on or using `aria-checked=\"true\"`."),
          row("--r8-switch-disabled-bg", "color", "var(--r8-color-surface-2)", "Cor da trilha quando o Switch estiver desligado, mas ainda interativo.", "Track color when the Switch is off but still interactive."),
          row("--r8-switch-blocked-bg", "color", "var(--r8-color-disabled-bg)", "Cor da trilha quando o controle em si estiver desabilitado e sem interação.", "Track color when the control itself is disabled and non-interactive."),
          row("--r8-switch-thumb-bg", "color", "var(--r8-color-surface-raised)", "Cor base da alça enquanto o Switch estiver interativo.", "Base thumb color while the Switch remains interactive."),
          row("--r8-switch-thumb-blocked-bg", "color", "var(--r8-color-surface)", "Cor da alça quando o Switch estiver em estado desabilitado.", "Thumb color when the Switch is in a disabled state."),
        ],
      });
      break;
    case "theme-switch":
      mergeContract(contract, {
        attributes: [
          row("role", `"switch"`, `"switch"`, "Role acessível para indicar alternancia binaria entre temas.", "Accessible role that indicates binary switching between themes."),
          row("aria-label", "string", "recommended", "Nome acessível do controle, por exemplo `Toggle theme`.", "Accessible name for the control, for example `Toggle theme`."),
        ],
      });
      break;
    case "watermark":
      mergeContract(contract, {
        attributes: [
          row("data-watermark", "string", "required", "Texto exibido pela pseudo-layer de watermark.", "Text displayed by the pseudo watermark layer."),
        ],
      });
      break;
    case "image":
      mergeContract(contract, {
        attributes: [
          row("alt", "string", "recommended", "Texto alternativo quando a mídia real for um `<img>` no moldura.", "Alternative text when the real media is an `<img>` inside the frame."),
          row("loading", `"lazy" | "eager"`, `"eager" (native HTML)`, "Comportamento nativo de carregamento do asset visual.", "Native loading behavior for the visual asset."),
          row("src", "string", "required on real `<img>`", "Fonte da imagem real dentro do moldura.", "Source for the real image inside the frame."),
        ],
        dataAttributes: [
          row("data-r8-fit", `"cover" | "contain" | "fill" | "none" | "scale-down"`, `"cover"`, "Controla como a imagem ocupa a moldura.", "Controls how the image fills the frame."),
          row("data-r8-ratio", `"square" | "landscape" | "wide" | "portrait"`, "none", "Aplica proporções rápidas para thumbnails, cards ou hero prévias.", "Applies quick ratios for thumbnails, cards, or hero previews."),
        ],
        cssVariables: [
          row("--r8-image-height", "length", "12rem", "Define a altura útil quando nenhuma proporção pronta estiver ativa.", "Defines the usable height when no preset ratio is active."),
          row("--r8-image-fit", "keyword", "cover", "Propriedade CSS que ajusta o `object-fit` da mídia.", "Custom property that adjusts the media `object-fit`."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:image-load", `{ alt, src }`, "Emitido quando a imagem termina de carregar com sucesso.", "Emitted when the image finishes loading successfully."),
          event("r8:image-error", `{ alt, src }`, "Emitido quando a mídia falha e o componente entra em estado de erro.", "Emitted when the media fails and the component enters its error state."),
        ],
      });
      break;
    case "navbar":
      mergeContract(contract, withVariantDataAttribute(component.name, `"dark"`));
      mergeContract(contract, {
        attributes: [
          row(
            "aria-label",
            "string",
            "recommended on `<nav>`",
            "Nome acessível do landmark de navegação quando o cabeçalho não tiver título explicito por perto.",
            "Accessible landmark name when the header does not have a nearby explicit title.",
          ),
          row(
            "aria-controls / aria-expanded",
            "string / boolean",
            "managed by runtime",
            "Mantém a relação entre a alternância e o bloco `r8-navbar__collapse` em layouts recolhíveis.",
            "Keeps the relationship between the toggle and the `r8-navbar__collapse` block in collapsible layouts.",
          ),
        ],
        dataAttributes: [
          row(
            "data-r8-expand",
            `"never" | "sm" | "md" | "lg" | "xl" | "xxl" | "always"`,
            `"always"`,
            "Define em qual breakpoint o navbar deixa de colapsar, seguindo a ideia do `navbar-expand-*` do Bootstrap.",
            "Defines the breakpoint where the navbar stops collapsing, following the Bootstrap `navbar-expand-*` idea.",
          ),
          row(
            "data-r8-open",
            `"true" | "false"`,
            `"false"`,
            "Abre o bloco colapsado no primeiro paint, útil para prévias locais e demos guiadas.",
            "Opens the collapsed block on first paint, useful for local previews and guided demos.",
          ),
        ],
        cssVariables: [
          row("--r8-navbar-bg", "color", "var(--r8-color-surface)", "Controlam a estrutura do navbar e o contraste interno de marca, texto e links auxiliares.", "Control the navbar shell and the inner contrast for the brand, text, and secondary links."),
          row("--r8-navbar-color", "color", "var(--r8-color-ink)", "Controlam a estrutura do navbar e o contraste interno de marca, texto e links auxiliares.", "Control the navbar shell and the inner contrast for the brand, text, and secondary links."),
          row("--r8-navbar-muted", "color", "var(--r8-color-ink-muted)", "Controlam a estrutura do navbar e o contraste interno de marca, texto e links auxiliares.", "Control the navbar shell and the inner contrast for the brand, text, and secondary links."),
          row("--r8-navbar-padding-x", "length", "var(--r8-space-4)", "Ajustam a densidade horizontal e vertical do cabeçalho sem alterar a estrutura interna.", "Adjust the header horizontal and vertical density without changing its inner structure."),
          row("--r8-navbar-padding-y", "length", "var(--r8-space-3)", "Ajustam a densidade horizontal e vertical do cabeçalho sem alterar a estrutura interna.", "Adjust the header horizontal and vertical density without changing its inner structure."),
          row("--r8-navbar-gap", "length", "var(--r8-space-3)", "Ajustam a densidade horizontal e vertical do cabeçalho sem alterar a estrutura interna.", "Adjust the header horizontal and vertical density without changing its inner structure."),
          row(
            "--r8-navbar-collapse-max-height",
            "length",
            "18rem",
            "Define a altura máxima do menu rolável quando o navbar estiver em coluna colapsada.",
            "Defines the maximum height of the scrollable menu when the navbar runs in collapsed column mode.",
          ),
          row("--r8-navbar-hover-bg", "color", "var(--r8-color-surface-2)", "Permitem personalizar hover e estado ativo sem criar uma variante estrutural nova.", "Let you customize hover and active states without creating a new structural variant."),
          row("--r8-navbar-accent-bg", "color", "var(--r8-color-primary)", "Permitem personalizar hover e estado ativo sem criar uma variante estrutural nova.", "Let you customize hover and active states without creating a new structural variant."),
          row("--r8-navbar-accent-color", "color", "var(--r8-color-primary-contrast)", "Permitem personalizar hover e estado ativo sem criar uma variante estrutural nova.", "Let you customize hover and active states without creating a new structural variant."),
        ],
        methods: runtimeMethods,
        events: [
          event(
            "r8:navbar-toggle",
            `{ open, navbar, toggle, collapse, expandedLayout, trigger }`,
            "Emitido quando a alternância abre ou fecha a navegação colapsavel do navbar.",
            "Emitted when the toggle opens or closes the navbar collapsible navigation.",
          ),
        ],
      });
      break;
    case "badge":
      mergeContract(contract, withVariantDataAttribute(component.name, `"primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "info" | "dark" | "light"`));
      break;
    case "tag":
      mergeContract(contract, withVariantDataAttribute(component.name, `"success" | "info" | "danger"`));
      break;
    case "window":
      mergeContract(contract, withVariantDataAttribute(component.name, `"success" | "danger"`));
      break;
  }

  if (["input", "input-otp", "input-number", "input-tag", "autocomplete", "cascader", "select", "color-picker", "date-picker", "datetime-picker"].includes(component.id)) {
    contract.cssVariables.push(row(
      "--r8-field-focus-color", "color", "var(--r8-color-primary-strong)",
      "Personaliza o foco interno dos campos sem alterar as dimensões do controle ou a cor de foco de outros componentes.",
      "Customizes the inset field focus without changing control dimensions or the focus color of other components.",
    ));
  }

  return contract;
}
