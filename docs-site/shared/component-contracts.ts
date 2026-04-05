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
const overlayKinds = new Set(["dialog", "drawer", "popover", "tooltip"]);
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
    "(root?: Document | HTMLElement) => void",
    "Inicializa ou reaplica os bindings do runtime no subtree informado. Use depois de inserir markup novo.",
    "Initializes or reapplies runtime bindings inside the provided subtree. Use it after inserting new markup.",
  ),
  method(
    "Retro8UI.refresh",
    "(root?: Document | HTMLElement) => void",
    "Alias semantico para reprocessar `data-r8-*`, ARIA states e interactive hooks no subtree atual.",
    "Semantic alias for reprocessing `data-r8-*`, ARIA states and interactive hooks in the current subtree.",
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
    if (!target.some((item) => item.name === entry.name)) {
      target.push(entry);
    }
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
        `Nome acessivel opcional para a surface raiz de ${component.name}.`,
        `Optional accessible name for the root ${component.name} surface.`,
      ),
      row(
        "hidden",
        "boolean",
        "false",
        `Esconde ${component.name} usando comportamento nativo do HTML, sem quebrar a classe semantica.`,
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
        `Aplica a variant semanticamente em ${componentName} sem depender de concatenar classes no host app.`,
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
        `${kindLabel} sincroniza esse state entre trigger e panel quando o runtime abre ou fecha a lista.`,
        `${kindLabel} keeps this state in sync between trigger and panel when the runtime opens or closes the list.`,
      ),
      row(
        "aria-controls",
        "string",
        "generated",
        `Conecta trigger/input ao listbox ou panel controlado por ${kindLabel}.`,
        `Connects the trigger or input to the listbox or panel controlled by ${kindLabel}.`,
      ),
      row(
        "aria-selected",
        "boolean",
        "false",
        `Marca a option atualmente ativa ou escolhida dentro de ${kindLabel}.`,
        `Marks the currently active or chosen option inside ${kindLabel}.`,
      ),
      row(
        "hidden",
        "boolean",
        "managed by runtime",
        `O panel usa esse atributo para abrir e fechar sem precisar de framework wrapper.`,
        `The panel uses this attribute to open and close without needing a framework wrapper.`,
      ),
    ],
    dataAttributes: [
      row(
        "data-r8-value",
        "string",
        "option text",
        `Sobrescreve o valor exibido pelo trigger, útil quando o texto visual nao deve ser o payload final.`,
        `Overrides the value shown by the trigger, useful when the visible text should not be the final payload.`,
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
        "Marca o node interno que deve receber o label selecionado no trigger.",
        "Marks the inner node that should receive the selected label in the trigger.",
      ),
    ],
    methods: runtimeMethods,
    events: [
      event(
        "r8:choice-change",
        `{ value, text, kind, option }`,
        "Disparado quando uma option e selecionada pelo runtime da retro8-ui.",
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
          `"true" | "false" | "mixed"`,
          "false",
          `State binario controlado pelo runtime de ${component.name}; Checkbox tambem pode usar o valor misto.`,
          `Binary state controlled by the ${component.name} runtime; Checkbox can also use the mixed value.`,
        ),
        row(
          "disabled",
          "boolean",
          "false",
          `Bloqueia interacao nativa e preserva visual consistente para ${component.name}.`,
          `Disables native interaction and preserves a consistent visual state for ${component.name}.`,
        ),
      ],
      methods: runtimeMethods,
      events: [
        event(
          "r8:binary-change",
          `{ checked, kind, indeterminate }`,
          "Emitido quando checkbox, radio, switch ou theme switch muda de state.",
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
            "Use em hosts customizados quando o Checkbox nao for um input nativo e precisar expor bloqueio semanticamente.",
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
            "Ativa um shell com borda em volta do controle, util para listas selecionaveis e cards curtos.",
            "Turns on a bordered shell around the control, useful for selectable lists and short cards.",
          ),
          row(
            "data-r8-indeterminate",
            `"true" | "false"`,
            `"false"`,
            "Inicializa o Checkbox em estado misto e sincroniza `aria-checked=\"mixed\"` no host.",
            "Boots Checkbox in a mixed state and keeps `aria-checked=\"mixed\"` in sync on the host.",
          ),
        ],
        cssVariables: [
          row(
            "--r8-checkbox-box-size",
            "length",
            "1.25rem",
            "Controla o tamanho da caixa pixelada antes dos modifiers `sm` e `lg` ajustarem a escala.",
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
            "Ajusta a distancia entre a caixa e o label sem alterar a estrutura do host.",
            "Adjusts the distance between the box and the label without changing the host structure.",
          ),
          row(
            "--r8-checkbox-shell-bg / --r8-checkbox-shell-padding / --r8-checkbox-shell-shadow",
            "color | length | box-shadow",
            "theme defaults",
            "Permitem personalizar o shell do modifier `r8-checkbox--bordered` sem sobrescrever toda a regra.",
            "Let you customize the `r8-checkbox--bordered` shell without overriding the whole rule.",
          ),
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
            "Rotulo acessivel recomendado para o trigger quando o contexto da cor nao estiver claro no texto ao redor.",
            "Recommended accessible label for the trigger when the color context is not already clear in nearby copy.",
          ),
        ],
        dataAttributes: [
          row(
            "data-r8-mode",
            `"fixed" | "dynamic"`,
            `"fixed"`,
            "Escolhe entre paleta fixa por swatches e o picker dinamico com board, sliders e confirmacao.",
            "Switches between the fixed swatch palette and the dynamic picker with a board, sliders, and confirmation.",
          ),
          row(
            "data-r8-clearable",
            `"true" | "false"`,
            `"false"`,
            "Mostra e habilita a acao de limpar no panel quando existir um valor confirmado no componente.",
            "Shows and enables the clear action inside the panel when the component currently has a committed value.",
          ),
          row(
            "data-r8-placeholder",
            "string",
            `"Select color"`,
            "Define o texto de fallback exibido no trigger quando nenhuma cor estiver ativa.",
            "Defines the fallback text shown in the trigger when no color is active.",
          ),
          row(
            "data-r8-size",
            `"sm" | "md" | "lg"`,
            `"md"`,
            "Ajusta a densidade do trigger, da amostra, das swatches e do painel dinamico sem trocar o markup base.",
            "Adjusts trigger, sample, swatch, and dynamic panel density without replacing the base markup.",
          ),
          row(
            "data-r8-show-alpha",
            `"true" | "false"`,
            `"false"`,
            "Liga o checkerboard nas amostras translucidas e revela o alpha slider quando o picker estiver em modo dinamico.",
            "Enables the checkerboard treatment on translucent samples and reveals the alpha slider when the picker runs in dynamic mode.",
          ),
        ],
        cssVariables: [
          row(
            "--r8-color-picker-columns",
            "number",
            "6",
            "Controla quantas colunas o grid de swatches usa antes do breakpoint responsivo entrar em cena.",
            "Controls how many columns the swatch grid uses before the responsive breakpoint kicks in.",
          ),
          row(
            "--r8-color-picker-swatch-size",
            "length",
            "2.25rem",
            "Define o footprint base das swatches e ajuda a equilibrar paletas mais densas ou mais generosas.",
            "Defines the base swatch footprint so you can balance denser or roomier palettes.",
          ),
          row(
            "--r8-color-picker-sample-size",
            "length",
            "1.1rem",
            "Escala a amostra de cor dentro do trigger sem redesenhar a estrutura visual do componente.",
            "Scales the color sample inside the trigger without redrawing the component structure.",
          ),
          row(
            "--r8-color-picker-trigger-min-height",
            "length",
            "3rem",
            "Ajusta a altura minima do trigger para dialogos compactos ou paines mais espaçados.",
            "Adjusts the trigger minimum height for compact dialogs or roomier panels.",
          ),
          row(
            "--r8-color-picker-panel-width",
            "length",
            "22rem",
            "Controla a largura do painel dinamico sem afetar o shell externo do componente.",
            "Controls the width of the dynamic panel without changing the component outer shell.",
          ),
          row(
            "--r8-color-picker-spectrum-height",
            "length",
            "12rem",
            "Define a altura do board principal usado para escolher saturacao e luminosidade no modo dinamico.",
            "Defines the height of the main board used to choose saturation and value in dynamic mode.",
          ),
          row(
            "--r8-color-picker-channel-width",
            "length",
            "1rem",
            "Ajusta a largura dos sliders verticais de hue e alpha no modo dinamico.",
            "Adjusts the width of the hue and alpha vertical sliders in dynamic mode.",
          ),
        ],
        events: [
          event(
            "r8:color-active-change",
            `{ value, text, swatch, alpha, mode, source }`,
            "Emitido enquanto o valor ativo muda no board, nos sliders ou no input do modo dinamico.",
            "Emitted while the active value changes through the dynamic mode board, sliders, or input.",
          ),
          event(
            "r8:color-change",
            `{ value, text, swatch, alpha, option, mode, source }`,
            "Emitido quando uma nova cor e confirmada no Color Picker, seja por swatch fixa ou pelo modo dinamico.",
            "Emitted when a new color is committed in the Color Picker, whether through fixed swatches or the dynamic mode.",
          ),
          event(
            "r8:color-clear",
            `{ value, text, kind, mode }`,
            "Emitido quando o valor atual e limpo pelo botao de clear.",
            "Emitted when the current value is cleared through the clear action.",
          ),
        ],
      });
      break;
    case "button":
      mergeContract(contract, {
        attributes: [
          row("type", `"button" | "submit" | "reset"`, `"button"`, "Tipo nativo do `<button>` ou do submit control.", "Native `<button>` or submit control type."),
          row("disabled", "boolean", "false", "Desativa interacao e aplica o disabled treatment da retro8-ui.", "Disables interaction and applies the retro8-ui disabled treatment."),
          row(
            "aria-disabled",
            "boolean",
            "false",
            "Use em links ou hosts customizados quando o disabled nativo nao estiver disponivel.",
            "Use it on links or custom hosts when native disabled is not available.",
          ),
          row("aria-pressed", "boolean", "false", "Marca Buttons toggle ou action states persistentes.", "Marks toggle buttons or persistent action states."),
          row("aria-busy", "boolean", "false", "State sincronizado quando `data-r8-loading` estiver ativo.", "State kept in sync when `data-r8-loading` is active."),
        ],
        dataAttributes: [
          row("data-r8-variant", buttonVariants, "none", "Aplica variant semantica sem concatenar classes no host app.", "Applies a semantic variant without concatenating classes in the host app."),
          row("data-r8-size", buttonSizes, `"md"`, "Troca o tamanho visual preservando a classe base `r8-btn`.", "Switches the visual size while keeping the base `r8-btn` class."),
          row("data-r8-block", `"true" | "false"`, `"false"`, "Expande o Button para toda a largura disponivel.", "Expands the Button to the full available width."),
          row("data-r8-loading", `"true" | "false"`, `"false"`, "Liga o loading state, injeta spinner pixel e trava a action.", "Turns on the loading state, injects the pixel spinner and locks the action."),
          row("data-r8-active", `"true" | "false"`, `"false"`, "Conveniencia para sincronizar `aria-pressed` via markup declarativo.", "Convenience attribute for syncing `aria-pressed` through declarative markup."),
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
            "Controla a cor efetiva da borda e da sombra seca quando o Border usa o estilo padrao.",
            "Controls the effective border and dry-shadow color when Border uses the default style.",
          ),
          row(
            "--r8-border-sample-width",
            "length",
            "var(--r8-border-thick)",
            "Define a espessura base da moldura antes dos modifiers de lado unico entrarem em cena.",
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
            "Ajusta o preenchimento interno da surface sem quebrar o contorno semantico.",
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
            "Exibe `r8-autocomplete__clear` quando houver texto digitado, sem precisar de JS customizado no host app.",
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
            "Texto exibido em `r8-autocomplete__empty` quando nenhum item visivel combina com a busca atual.",
            "Text shown inside `r8-autocomplete__empty` when no visible item matches the current query.",
          ),
          row(
            "data-r8-loading",
            `"true" | "false"`,
            `"false"`,
            "Forca o estado de loading, oculta as options temporariamente e prioriza o feedback de busca remota.",
            "Forces the loading state, temporarily hides options, and prioritizes remote-search feedback.",
          ),
          row(
            "data-r8-loading-label",
            "string",
            `"Loading suggestions..."`,
            "Texto exibido em `r8-autocomplete__loading` enquanto o scope estiver em loading.",
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
            "Emitido quando a action de clear limpa o campo e remove a sugestao selecionada.",
            "Emitted when the clear action resets the field and removes the selected suggestion.",
          ),
        ],
      });
      break;
    case "cascader":
      mergeContract(contract, {
        attributes: [
          row("type", `"button"`, `"button"`, "Use `type=\"button\"` no trigger para evitar submits acidentais.", "Use `type=\"button\"` on the trigger to avoid accidental submits."),
          row("aria-expanded", "boolean", "false", "Sincronizado pelo runtime quando o Cascader panel abre ou fecha.", "Synchronized by the runtime when the Cascader panel opens or closes."),
          row("aria-controls", "string", "generated", "Conecta o trigger ao floating panel controlado pelo Cascader.", "Connects the trigger to the floating panel controlled by the Cascader."),
          row("hidden", "boolean", "managed by runtime", "O panel usa `hidden` para abrir e fechar sem wrapper de framework.", "The panel uses `hidden` to open and close without a framework wrapper."),
        ],
        dataAttributes: [
          row("data-r8-placeholder", "string", `"Select path"`, "Texto inicial exibido no trigger antes da primeira escolha.", "Initial text shown in the trigger before the first selection."),
          row("data-r8-expand-trigger", `"click" | "hover"`, `"click"`, "Define se branches abrem por click ou hover.", "Defines whether branches expand on click or hover."),
          row("data-r8-check-strictly", `"true" | "false"`, `"false"`, "Permite selecionar parent nodes, nao apenas leaf nodes.", "Allows selecting parent nodes, not only leaf nodes."),
          row("data-r8-filterable", `"true" | "false"`, `"false"`, "Ativa o filtro textual do panel usando `r8-cascader__input`.", "Enables panel text filtering using `r8-cascader__input`."),
          row("data-r8-filter-placeholder", "string", `"Filter options..."`, "Placeholder usado quando o runtime precisa gerar `r8-cascader__input` automaticamente.", "Placeholder used when the runtime needs to generate `r8-cascader__input` automatically."),
          row("data-r8-clearable", `"true" | "false"`, `"false"`, "Exibe `r8-cascader__clear` para limpar a escolha atual.", "Shows `r8-cascader__clear` to clear the current selection."),
          row("data-r8-show-all-levels", `"true" | "false"`, `"true"`, "Controla se o trigger mostra o caminho completo ou apenas o ultimo label selecionado.", "Controls whether the trigger shows the full path or only the last selected label."),
          row("data-r8-separator", "string", `" / "`, "Separador usado para compor o label final do caminho.", "Separator used to compose the final path label."),
          row("data-r8-empty-label", "string", `"No matching routes"`, "Mensagem exibida quando o filtro nao encontra resultados.", "Message shown when the filter finds no results."),
          row("data-r8-label", "string", "required on `r8-cascader__node`", "Label semantico de cada node da arvore declarativa.", "Semantic label for each node inside the declarative tree."),
          row("data-r8-disabled", `"true" | "false"`, `"false"`, "Desativa um branch ou leaf node sem remover do fluxo visual.", "Disables a branch or leaf node without removing it from the visual flow."),
          row("data-r8-selected", `"true" | "false"`, `"false"`, "Marca o node inicial selecionado ao montar o Cascader.", "Marks the initial selected node when the Cascader boots."),
          row("data-r8-search", "string", "none", "Texto extra indexado pelo filtro do runtime.", "Extra text indexed by the runtime filter."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:cascader-change", `{ value, label, labels, values, path, node, option, text }`, "Emitido quando o Cascader confirma uma selecao.", "Emitted when the Cascader commits a selection."),
          event("r8:cascader-clear", `{ value, label, labels, values, path, node, option, text }`, "Emitido quando a action de clear remove a selecao atual.", "Emitted when the clear action removes the current selection."),
          event("r8:choice-change", `{ kind, value, label, labels, values, path, node, option, text }`, "Evento generico tambem emitido para manter compatibilidade com o choice runtime.", "Generic event also emitted to preserve compatibility with the choice runtime."),
        ],
      });
      break;
    case "date-picker":
      mergeContract(contract, {
        attributes: [
          row("type", `"button"`, `"button"`, "Use `type=\"button\"` no trigger para evitar submits acidentais em forms.", "Use `type=\"button\"` on the trigger to avoid accidental submits inside forms."),
          row("aria-expanded", "boolean", "false", "Sincronizado pelo runtime quando o panel abre ou fecha.", "Synchronized by the runtime when the panel opens or closes."),
          row("aria-controls", "string", "generated", "Conecta o trigger ao panel gerado pelo calendar runtime.", "Connects the trigger to the panel generated by the calendar runtime."),
          row("aria-haspopup", `"dialog"`, "managed by runtime", "O trigger expone o panel como popup calendar control.", "The trigger exposes the panel as a popup calendar control."),
          row("hidden", "boolean", "managed by runtime", "O panel popup usa `hidden` para open/close sem wrapper de framework.", "The popup panel uses `hidden` for open/close without a framework wrapper."),
        ],
        dataAttributes: [
          row("data-r8-value", `"YYYY-MM-DD"`, "none", "Valor inicial selecionado pelo calendar.", "Initial value selected by the calendar."),
          row("data-r8-month", `"YYYY-MM"`, "selected month", "Mes inicialmente visivel quando o panel abre.", "Month initially visible when the panel opens."),
          row("data-r8-min", `"YYYY-MM-DD"`, "none", "Data minima habilitada no calendar.", "Minimum enabled date in the calendar."),
          row("data-r8-max", `"YYYY-MM-DD"`, "none", "Data maxima habilitada no calendar.", "Maximum enabled date in the calendar."),
          row("data-r8-placeholder", "string", `"Select a date"`, "Texto exibido enquanto nenhuma data estiver selecionada.", "Text shown while no date is selected."),
          row("data-r8-choice-display", "marker", "none", "Marca o node do trigger que recebe o label formatado.", "Marks the trigger node that receives the formatted label."),
          row("data-r8-locale", "BCP 47 locale", "document locale", "Controla month label e weekday labels sem acoplar framework.", "Controls the month label and weekday labels without coupling to a framework."),
          row("data-r8-week-start", "0-6", "0", "Define qual dia comeca a semana no calendar grid.", "Defines which day starts the week in the calendar grid."),
          row(
            "data-r8-shortcuts",
            `"today,yesterday,week-ago"`,
            "none",
            "Gera atalhos declarativos no topo do calendario para saltar para datas recorrentes sem codigo extra.",
            "Generates declarative shortcuts at the top of the calendar so recurring dates can be reached without extra code.",
          ),
          row(
            "data-r8-show-week-number",
            `"true" | "false"`,
            `"false"`,
            "Exibe uma coluna adicional com o numero da semana para fluxos mais orientados a planejamento.",
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
            "Controla a largura e a altura do quadrado que recebe o icone ou glyph.",
            "Controls the width and height of the square that receives the icon or glyph.",
          ),
          row(
            "--r8-icon-glyph-font-size",
            "length",
            "1.25rem",
            "Ajusta o tamanho de glyphs textuais curtos dentro do frame.",
            "Adjusts the size of short text glyphs inside the frame.",
          ),
          row(
            "--r8-icon-glyph-bg",
            "color",
            "var(--r8-color-accent)",
            "Troca o background do frame do icone sem alterar a estrutura do tile.",
            "Changes the icon frame background without altering the tile structure.",
          ),
          row(
            "--r8-icon-glyph-color",
            "color",
            "var(--r8-color-accent-contrast)",
            "Define a cor do texto ou do SVG inline renderizado dentro do glyph.",
            "Defines the color used by text or inline SVG rendered inside the glyph.",
          ),
          row(
            "--r8-icon-glyph-border",
            "color",
            "var(--r8-color-border)",
            "Permite ajustar o contorno do glyph para acompanhar superficies mais claras ou mais escuras.",
            "Lets you tune the glyph outline to match lighter or darker surfaces.",
          ),
        ],
      });
      break;
    case "datetime-picker":
      mergeContract(contract, {
        attributes: [
          row("type", `"button"`, `"button"`, "Use `type=\"button\"` no trigger para manter a experiencia declarativa.", "Use `type=\"button\"` on the trigger to keep the declarative experience."),
          row("aria-expanded", "boolean", "false", "Sincronizado pelo runtime quando o panel abre ou fecha.", "Synchronized by the runtime when the panel opens or closes."),
          row("aria-controls", "string", "generated", "Conecta o trigger ao popup gerado pelo DateTime runtime.", "Connects the trigger to the popup generated by the DateTime runtime."),
          row("aria-haspopup", `"dialog"`, "managed by runtime", "O trigger abre um popup com calendar + time column.", "The trigger opens a popup with a calendar and time column."),
          row("hidden", "boolean", "managed by runtime", "O panel popup usa `hidden` para open/close sem wrapper de framework.", "The popup panel uses `hidden` for open/close without a framework wrapper."),
        ],
        dataAttributes: [
          row("data-r8-value", `"YYYY-MM-DDTHH:mm"`, "none", "Valor inicial completo do DateTime Picker.", "Initial full value for the DateTime Picker."),
          row("data-r8-month", `"YYYY-MM"`, "selected month", "Mes inicialmente visivel no calendar.", "Month initially visible in the calendar."),
          row("data-r8-min", `"YYYY-MM-DDTHH:mm" | "YYYY-MM-DD"`, "none", "Limite minimo aceito para date e time.", "Minimum accepted bound for date and time."),
          row("data-r8-max", `"YYYY-MM-DDTHH:mm" | "YYYY-MM-DD"`, "none", "Limite maximo aceito para date e time.", "Maximum accepted bound for date and time."),
          row("data-r8-time-step", "number", "30", "Intervalo, em minutos, usado para gerar os time slots.", "Interval, in minutes, used to generate the time slots."),
          row("data-r8-placeholder", "string", `"Select date and time"`, "Texto exibido enquanto nenhum valor completo estiver selecionado.", "Text shown while no full value is selected."),
          row("data-r8-choice-display", "marker", "none", "Marca o node do trigger que recebe o label formatado.", "Marks the trigger node that receives the formatted label."),
          row("data-r8-locale", "BCP 47 locale", "document locale", "Controla month label, weekday labels e date formatting.", "Controls the month label, weekday labels and date formatting."),
          row("data-r8-week-start", "0-6", "0", "Define qual dia comeca a semana no calendar grid.", "Defines which day starts the week in the calendar grid."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:datetime-change", `{ kind, value, label, date, time, panel, trigger }`, "Emitido quando date ou time muda no picker.", "Emitted when the date or time changes in the picker."),
        ],
      });
      break;
    case "link":
      mergeContract(contract, {
        attributes: [
          row("href", "string", "required", "Destino nativo do anchor quando `r8-link` e usado em `<a>`.", "Native anchor destination when `r8-link` is used on `<a>`."),
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
            "Permite trocar a cor do texto durante hover e focus sem criar um modifier novo.",
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
            "Define a opacidade aplicada quando o link recebe hover ou focus visivel.",
            "Defines the opacity applied when the link receives hover or visible focus.",
          ),
          row(
            "--r8-link-underline-color",
            "color",
            "var(--r8-link-color)",
            "Controla a cor do underline no estado base, independentemente do texto.",
            "Controls the underline color in the base state independently from the text.",
          ),
          row(
            "--r8-link-hover-underline-color",
            "color",
            "var(--r8-link-hover-color)",
            "Permite destacar o underline no hover com uma cor diferente do texto base.",
            "Lets the underline stand out on hover with a different color from the base text.",
          ),
          row(
            "--r8-link-underline-opacity",
            "percentage",
            "0%",
            "Ajusta quao visivel o underline fica antes do hover.",
            "Adjusts how visible the underline is before hover.",
          ),
          row(
            "--r8-link-hover-underline-opacity",
            "percentage",
            "100%",
            "Define quao forte o underline aparece no hover e no focus visivel.",
            "Defines how strong the underline appears on hover and visible focus.",
          ),
          row(
            "--r8-link-underline-offset",
            "length",
            "0.18em",
            "Controla a distancia entre o texto e o underline sem depender de utilities externas.",
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
            "Controla o espacamento entre as regioes do shell sem alterar padding interno de cada bloco.",
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
            "Estabelece uma altura minima para o shell completo, util em dashboards e demos de app chrome.",
            "Sets a minimum height for the full shell, useful in dashboards and app chrome demos.",
          ),
          row(
            "--r8-container-header-height",
            "length",
            "none",
            "Permite fixar uma altura minima para o header quando o chrome superior precisa de medida mais previsivel.",
            "Lets you set a minimum height for the header when the top chrome needs a more predictable measure.",
          ),
          row(
            "--r8-container-footer-height",
            "length",
            "none",
            "Permite fixar uma altura minima para o footer quando a barra inferior precisa de proporcao mais estavel.",
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
            "Permite trocar a familia tipografica de um trecho isolado sem mexer no token global.",
            "Lets you swap the font family of an isolated snippet without changing the global token.",
          ),
          row(
            "--r8-text-size",
            "length",
            "var(--r8-font-size-sm)",
            "Controla a escala de um trecho `r8-text` ou de um paragrafo especifico dentro do bloco tipografico.",
            "Controls the scale of an `r8-text` snippet or a specific paragraph inside the typography block.",
          ),
          row(
            "--r8-text-line-height",
            "number",
            "1.7",
            "Ajusta o line-height de uma linha ou paragrafo especifico sem alterar o restante do bloco.",
            "Adjusts the line-height of a specific line or paragraph without changing the rest of the block.",
          ),
          row(
            "--r8-typography-gap",
            "length",
            "var(--r8-space-4)",
            "Controla o ritmo vertical entre headings, paragrafos, listas e blockquotes do bloco.",
            "Controls the vertical rhythm between headings, paragraphs, lists, and blockquotes in the block.",
          ),
          row(
            "--r8-typography-measure",
            "length",
            "100%",
            "Define a largura maxima do bloco, util para texto longo, hero copy ou trechos editoriais.",
            "Defines the block maximum width, useful for long text, hero copy, or editorial sections.",
          ),
          row(
            "--r8-typography-heading-font",
            "font-family",
            "var(--r8-font-display)",
            "Troca a familia dos headings apenas neste bloco, mantendo o resto da UI intacto.",
            "Swaps the heading family only in this block while keeping the rest of the UI intact.",
          ),
          row(
            "--r8-typography-body-font",
            "font-family",
            "var(--r8-font-body)",
            "Troca a familia do corpo do texto para um bloco especifico sem acoplar utilitarios externos.",
            "Swaps the body text family for a specific block without relying on external utilities.",
          ),
          row(
            "--r8-typography-body-size",
            "length",
            "var(--r8-font-size-sm)",
            "Permite elevar ou reduzir a escala base de paragrafos, listas e blockquotes do bloco inteiro.",
            "Lets you raise or lower the base scale of paragraphs, lists, and blockquotes across the whole block.",
          ),
          row(
            "--r8-typography-heading-line-height",
            "number",
            "1.2",
            "Controla a compactacao dos headings sem reescrever os seletores internos.",
            "Controls heading compactness without rewriting the internal selectors.",
          ),
          row(
            "--r8-typography-body-line-height",
            "number",
            "1.7",
            "Ajusta a legibilidade do corpo tipografico inteiro, inclusive listas e blockquotes.",
            "Adjusts the readability of the full body copy, including lists and blockquotes.",
          ),
        ],
      });
      break;
    case "splitter":
      mergeContract(contract, {
        attributes: [
          row("aria-orientation", `"horizontal" | "vertical"`, "derived from class", "O runtime aplica a orientation do handle a partir da classe do Splitter.", "The runtime applies the handle orientation from the Splitter class."),
          row("aria-valuenow", "number", "50", "Reflete a posicao atual do handle durante resize.", "Reflects the current handle position during resize."),
          row("aria-valuetext", "string", '"50%"', "Expone a posicao atual em formato textual para tecnologia assistiva.", "Exposes the current position as text for assistive technology."),
          row("aria-disabled", "boolean", "false", "Marca quando o Splitter foi travado e o handle nao deve aceitar interacao.", "Marks when the Splitter is locked and the handle should not accept interaction."),
        ],
        dataAttributes: [
          row("data-r8-splitter-position", "number", "50", "Posicao inicial do handle em porcentagem.", "Initial handle position in percentage."),
          row("data-r8-splitter-min", "number", "20", "Limite minimo do primeiro pane em porcentagem.", "Minimum size of the first pane in percentage."),
          row("data-r8-splitter-max", "number", "80", "Limite maximo do primeiro pane em porcentagem.", "Maximum size of the first pane in percentage."),
          row("data-r8-splitter-step", "number", "5", "Passo de teclado usado nas setas; com Shift o valor dobra.", "Keyboard step used by arrow keys; with Shift the value doubles."),
          row("data-r8-splitter-disabled", `"true" | "false"`, `"false"`, "Bloqueia drag e resize por teclado mantendo a aparencia do Splitter visivel.", "Locks drag and keyboard resize while keeping the Splitter visible."),
        ],
        cssVariables: [
          row("--r8-splitter-position", "percentage", "50%", "Custom property usada pelo layout para distribuir os panes.", "Custom property used by the layout to distribute the panes."),
          row("--r8-splitter-pane-bg", "color", "var(--r8-color-surface)", "Permite trocar o fundo base dos panes sem recriar o componente.", "Lets you change the base pane background without recreating the component."),
          row("--r8-splitter-handle-size", "length", "0.875rem", "Controla a espessura visual do handle no eixo do resize.", "Controls the visual thickness of the handle on the resize axis."),
          row("--r8-splitter-handle-surface", "color", "var(--r8-color-surface-2)", "Cor base usada nas faixas do handle.", "Base color used in the handle stripes."),
          row("--r8-splitter-handle-accent", "color", "var(--r8-color-accent)", "Cor de destaque usada no grip pixelado do handle.", "Accent color used in the pixel grip on the handle."),
          row("--r8-splitter-handle-border", "color", "var(--r8-color-border)", "Ajusta o contorno do handle para contextos claros ou escuros.", "Adjusts the handle outline for light or dark contexts."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:splitter-resize-start", `{ value, min, max, orientation, source }`, "Emitido quando o usuario inicia um resize por pointer ou teclado.", "Emitted when the user starts resizing through pointer or keyboard."),
          event("r8:splitter-change", `{ value, min, max, orientation, source }`, "Emitido a cada resize por pointer ou keyboard.", "Emitted on each resize through pointer or keyboard."),
          event("r8:splitter-resize-end", `{ value, min, max, orientation, source }`, "Emitido quando o resize termina e o Splitter estabiliza no valor final.", "Emitted when resizing ends and the Splitter settles on the final value."),
        ],
      });
      break;
    case "tabs":
      mergeContract(contract, {
        attributes: [
          row("role", `"tablist" | "tab" | "tabpanel"`, "managed by markup/runtime", "Mantem a relacao acessivel entre tabs e panels.", "Keeps the accessible relationship between tabs and panels."),
          row("aria-controls", "string", "required on tab", "Aponta para o panel controlado por cada tab.", "Points to the panel controlled by each tab."),
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
          row("aria-expanded", "boolean", "false", "State exposto no header interativo de cada item.", "State exposed on each interactive item header."),
          row("aria-controls / aria-labelledby", "string", "managed by runtime", "Conecta header e body para leitura assistiva.", "Connects header and body for assistive reading."),
          row("aria-disabled", "boolean", "false", "Marca headers e itens bloqueados sem remover o bloco da tela.", "Marks blocked headers and items without removing the section from the UI."),
          row("hidden", "boolean", "true on closed body", "Esconde o body fechado com semantica nativa.", "Hides the closed body with native semantics."),
        ],
        dataAttributes: [
          row("data-r8-accordion", `"true" | "false"`, `"false"`, "Mantem apenas um item aberto por vez dentro do mesmo grupo.", "Keeps only one item open at a time within the same group."),
          row("data-r8-icon-position", `"left" | "right"`, `"right"`, "Move o icone de expansao para o lado esquerdo ou direito do header.", "Moves the expand icon to the left or right side of the header."),
          row("data-r8-disabled", `"true" | "false"`, `"false"`, "Bloqueia a abertura de um item especifico.", "Blocks opening for a specific item."),
        ],
        cssVariables: [
          row("--r8-collapse-icon-size", "length", "1.25rem", "Escala a area reservada para o icone do header.", "Scales the area reserved for the header icon."),
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
          row("aria-label", "string", "recommended on arrows and dots", "Rotula setas e dots para navegacao assistiva.", "Labels arrows and dots for assistive navigation."),
        ],
        dataAttributes: [
          row("data-r8-autoplay", `"true" | "false"`, `"false"`, "Liga a troca automatica entre slides.", "Turns on automatic slide rotation."),
          row("data-r8-interval", "number", "3400", "Define o tempo entre trocas quando o autoplay estiver ativo.", "Defines the delay between transitions when autoplay is active."),
          row("data-r8-arrows", `"always" | "hover" | "none"`, `"always"`, "Controla quando as setas laterais ficam visiveis.", "Controls when the side arrows stay visible."),
          row("data-r8-direction", `"prev" | "next"`, "none", "Marca a seta como navegacao para tras ou para frente.", "Marks an arrow as backward or forward navigation."),
        ],
        cssVariables: [
          row("--r8-carousel-height", "length", "16rem", "Ajusta a altura util do viewport e dos slides.", "Adjusts the usable height of the viewport and slides."),
          row("--r8-carousel-arrow-size", "length", "2.5rem", "Escala as setas laterais sem trocar o markup.", "Scales the side arrows without changing markup."),
          row("--r8-carousel-media-fit", "string", `"cover"`, "Controla o `object-fit` das imagens dentro de `r8-carousel__media`.", "Controls the image `object-fit` inside `r8-carousel__media`."),
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
          row("readonly", "boolean", "false", "Preserva foco e copia, mas impede edicao.", "Preserves focus and copy behavior while preventing edits."),
          row("required", "boolean", "false", "Integra com validacao nativa do browser.", "Integrates with native browser validation."),
          row("aria-invalid", "boolean", "false", "Ativa invalid feedback junto com `r8-input--invalid`.", "Enables invalid feedback together with `r8-input--invalid`."),
        ],
        dataAttributes: [
          row("data-r8-size", `"sm" | "md" | "lg"`, `"md"`, "Escala o campo base ou o shell opcional sem uma utility externa.", "Scales the base field or optional shell without an external utility."),
          row("data-r8-clearable", `"true" | "false"`, `"false"`, "Exibe um botao de clear dentro de `r8-input-shell` quando houver valor.", "Shows a clear button inside `r8-input-shell` when a value is present."),
          row("data-r8-show-password", `"true" | "false"`, `"false"`, "Ativa o toggle declarativo de senha para inputs do tipo password.", "Enables a declarative password toggle for password inputs."),
          row("data-r8-word-limit", `"true" | "false"`, `"false"`, "Mostra um contador quando `maxlength` estiver presente.", "Shows a counter when `maxlength` is present."),
          row("data-r8-autosize", `"true" | "false"`, `"false"`, "Liga o autosize de textarea no proprio runtime da Retro8 UI.", "Turns textarea autosizing on in the Retro8 UI runtime itself."),
          row("data-r8-min-rows / data-r8-max-rows", "number", "rows / none", "Controlam o piso e o teto do autosize de textarea.", "Control the floor and ceiling of textarea autosizing."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:input-clear", `{ value }`, "Emitido quando o botao de clear zera o campo.", "Emitted when the clear button resets the field."),
          event("r8:input-password-toggle", `{ revealed }`, "Emitido quando o toggle alterna a visibilidade da senha.", "Emitted when the toggle changes password visibility."),
        ],
      });
      break;
    case "input-number":
      mergeContract(contract, {
        attributes: [
          row("min", "number", "none", "Limite minimo do campo nativo.", "Minimum value for the native input."),
          row("max", "number", "none", "Limite maximo do campo nativo.", "Maximum value for the native input."),
          row("step", "number", "1", "Incremento usado pelos Buttons laterais.", "Increment used by the side buttons."),
          row("value", "number", "0", "Valor inicial do input.", "Initial input value."),
        ],
        dataAttributes: [
          row("data-r8-size", `"sm" | "md" | "lg"`, `"md"`, "Escala a altura do controle numerico.", "Scales the numeric control height."),
          row("data-r8-precision", "number", "step decimals", "Arredonda e formata o valor final com casas decimais declarativas.", "Rounds and formats the final value with declarative decimals."),
          row("data-r8-step-strictly", `"true" | "false"`, `"false"`, "Alinha digitacao e clique ao grid do step.", "Aligns typing and button clicks to the step grid."),
          row("data-r8-controls-position", `"default" | "right"`, `"default"`, "Move os botoes para uma coluna na lateral direita.", "Moves the buttons into a right-side column."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:input-number-change", `{ value, source }`, "Emitido depois de cliques, teclado ou digitacao manual normalizada.", "Emitted after button clicks, keyboard stepping, or normalized manual typing."),
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
          row("data-r8-size", `"sm" | "md" | "lg"`, `"md"`, "Escala altura, chips e area de digitacao do conjunto.", "Scales the height, chips, and entry area."),
          row("data-r8-max-tags", "number", "none", "Limita o total de tags aceitas pelo campo.", "Limits the total accepted tags."),
          row("data-r8-delimiters", "string", "none", "Define caracteres que quebram uma entrada em varias tags.", "Defines characters that split one entry into multiple tags."),
          row("data-r8-clearable", `"true" | "false"`, `"false"`, "Mostra um botao de clear all quando houver tags ativas.", "Shows a clear-all button when there are active tags."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:input-tag-add", `{ value, tag, values, source }`, "Emitido quando uma ou mais tags novas entram no conjunto.", "Emitted when one or more new tags enter the set."),
          event("r8:input-tag-remove", `{ value, values, source }`, "Emitido quando uma tag existente e removida.", "Emitted when an existing tag is removed."),
          event("r8:input-tag-clear", `{ values, source }`, "Emitido quando o clear all remove o conjunto inteiro.", "Emitted when clear-all removes the whole set."),
          event("r8:input-tag-change", `{ values }`, "Emitido depois de qualquer mudanca estrutural na lista de tags.", "Emitted after any structural change in the tag list."),
        ],
      });
      break;
    case "avatar":
      mergeContract(contract, {
        attributes: [
          row("alt", "string", "none", "Texto alternativo da imagem interna quando o avatar carrega midia relevante.", "Alternative text for the inner image when the avatar loads meaningful media."),
        ],
        dataAttributes: [
          row("data-r8-avatar-fallback", "string", '"??"', "Define ate 2 caracteres para o fallback quando a imagem falha, esta vazia ou nao existe.", "Defines up to 2 characters for the fallback when the image fails, is empty, or does not exist."),
          row("data-r8-fit", `"cover" | "contain" | "fill" | "none" | "scale-down"`, `"cover"`, "Controla como a imagem ocupa a moldura do avatar.", "Controls how the image fills the avatar frame."),
        ],
        cssVariables: [
          row("--r8-avatar-fit", "keyword", '"cover"', "Custom property que ajusta o `object-fit` da imagem interna.", "Custom property that adjusts the inner image `object-fit`."),
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
          row("accept", "string", "none", "Tipos de arquivo aceitos pelo input nativo do host app.", "Accepted file types for the host app native input."),
          row("multiple", "boolean", "false", "Permite selecao multipla no input nativo.", "Allows multi-file selection in the native input."),
          row("disabled", "boolean", "false", "Desativa dropzone e trigger do upload control.", "Disables the upload dropzone and trigger."),
          row("aria-describedby", "idref", "none", "Conecta a dropzone ou o input a texto auxiliar com limite, formato ou feedback.", "Connects the dropzone or input to helper copy with limits, formats, or feedback."),
        ],
        dataAttributes: [
          row("data-r8-drag-active", `"true" | "false"`, `"false"`, "Ativa o destaque visual da dropzone enquanto o host app acompanha dragover.", "Turns on the dropzone highlight while the host app tracks dragover."),
          row("data-r8-upload-state", `"queued" | "uploading" | "success" | "error"`, `"queued"`, "Aplicado em `r8-upload__file` para colorir cada item conforme o estado do envio.", "Applied on `r8-upload__file` to color each item according to transfer state."),
          row("data-r8-upload-trigger", "marker", "none", "Marca um CTA opcional que deve abrir o input nativo escondido.", "Marks an optional CTA that should open the hidden native input."),
          row("data-r8-upload-preview-label / data-r8-upload-remove-label / data-r8-upload-selected-label / data-r8-upload-empty-label", "string", "English defaults", "Sobrescreve os labels usados pelo runtime local para preview, remove, selecionado e vazio.", "Overrides the labels used by the local runtime for preview, remove, selected, and empty states."),
        ],
        cssVariables: [
          row("--r8-upload-accent", "color", "var(--r8-color-primary)", "Accent local usado na dropzone ativa e nos estados principais do shell.", "Local accent used by the active dropzone and key shell states."),
          row("--r8-upload-min-height", "length", "9rem", "Altura minima da dropzone antes do app hospedeiro preencher a area com thumbs ou instrucoes.", "Minimum dropzone height before the host app fills the area with thumbnails or instructions."),
          row("--r8-upload-thumb-size", "length", "3rem", "Tamanho base dos previews quadrados em lista ou avatar.", "Base size for square previews in list or avatar layouts."),
          row("--r8-upload-progress", "percentage", "0%", "Percentual usado por `r8-upload__progress` para mostrar fila, envio parcial ou retry.", "Percentage used by `r8-upload__progress` to show queued, partial upload, or retry states."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:upload-change", `{ files, items, source }`, "Emitido quando input nativo ou dropzone recebem arquivos e a fila local e sincronizada.", "Emitted when the native input or dropzone receives files and the local queue is synchronized."),
          event("r8:upload-remove", `{ file, files, index, source }`, "Emitido quando um item gerenciado pelo runtime local e removido da fila.", "Emitted when an item managed by the local runtime is removed from the queue."),
          event("r8:upload-preview", `{ file, id, source, url }`, "Emitido quando uma acao de preview abre um arquivo local com object URL.", "Emitted when a preview action opens a local file through an object URL."),
        ],
      });
      break;
    case "slider":
      mergeContract(contract, {
        attributes: [
          row("aria-valuenow", "number", "0", "Valor atual exposto para assistive tech.", "Current value exposed to assistive tech."),
          row("aria-valuemin", "number", "0", "Limite minimo do slider.", "Minimum slider value."),
          row("aria-valuemax", "number", "100", "Limite maximo do slider.", "Maximum slider value."),
        ],
        dataAttributes: [
          row("data-r8-value", "number", "0", "Valor inicial usado para preencher o Slider.", "Initial value used to fill the Slider."),
          row("data-r8-slider-output", "marker", "none", "Marca o node que deve receber a leitura atual em texto.", "Marks the node that should receive the current textual readout."),
        ],
        cssVariables: [
          row("--r8-progress-value", "percentage", "0%", "Custom property compartilhada entre Slider e Progress fill.", "Custom property shared between Slider and Progress fill."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:slider-change", `{ value }`, "Emitido quando pointer ou keyboard ajustam o Slider.", "Emitted when pointer or keyboard adjust the Slider."),
        ],
      });
      break;
    case "progress":
      mergeContract(contract, {
        dataAttributes: [
          row("data-r8-value", "number", "0", "Shortcut declarativo para atualizar o fill e o `aria-valuenow`.", "Declarative shortcut for updating the fill and `aria-valuenow`."),
          row("data-r8-variant", `"default" | "success" | "warning" | "danger"`, "none", "Aplica a tone do Progress via runtime.", "Applies the Progress tone through the runtime."),
          row("data-r8-shape", `"line" | "circle"`, `"line"`, "Alterna entre barra linear e dial circular sem trocar a estrutura principal do componente.", "Switches between a linear bar and a circular dial without replacing the main component structure."),
          row("data-r8-label-position", `"outside" | "inside"`, `"outside"`, "Move a leitura percentual para dentro do track quando a barra precisa ficar mais compacta.", "Moves the percentage readout inside the track when the bar needs a more compact layout."),
          row("data-r8-indeterminate", `"true" | "false"`, `"false"`, "Ativa animacao continua quando o fluxo ainda nao tem percentual definitivo.", "Turns on continuous animation when the flow does not have a definitive percentage yet."),
          row("data-r8-progress-value-output", "marker", "none", "Marca os nodes que o runtime deve manter sincronizados com o valor percentual atual.", "Marks the nodes that the runtime should keep synchronized with the current percentage value."),
        ],
        cssVariables: [
          row("--r8-progress-value", "percentage", "0%", "Controla a largura visual da barra interna.", "Controls the visual width of the inner bar."),
          row("--r8-progress-height", "length", "1.5rem", "Define a espessura do track linear sem trocar classes extras.", "Defines the linear track thickness without extra classes."),
          row("--r8-progress-dial-size", "length", "6.5rem", "Escala o tamanho total do dial circular.", "Scales the full circular dial size."),
          row("--r8-progress-dial-thickness", "length", "0.72rem", "Controla a espessura util do anel circular.", "Controls the usable thickness of the circular ring."),
          row("--r8-progress-bar-color / --r8-progress-track-color", "color", "theme defaults", "Permite personalizar preenchimento e trilha sem sair da API publica.", "Lets you customize fill and track colors without leaving the public API."),
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
        ],
        cssVariables: [
          row("--r8-skeleton-gap", "length", "var(--r8-space-3)", "Controla o espacamento interno entre as pecas do esqueleto.", "Controls internal spacing between skeleton pieces."),
          row("--r8-skeleton-block-height / --r8-skeleton-media-height", "length", "7rem / 9rem", "Ajustam a altura de blocos grandes e areas de media.", "Adjust the height of large blocks and media areas."),
          row("--r8-skeleton-line-height / --r8-skeleton-title-width", "length", "1rem / 48%", "Permitem afinar linhas e controlar a largura visual do titulo.", "Let you slim down lines and control the visual title width."),
          row("--r8-skeleton-avatar-size / --r8-skeleton-button-width", "length", "3rem / 5.5rem", "Escalam avatar e CTA falsa em templates de profile ou card.", "Scale the avatar and fake CTA in profile or card templates."),
          row("--r8-skeleton-speed", "time", "1.2s", "Ajusta a velocidade da animacao do shimmer.", "Adjusts the shimmer animation speed."),
        ],
      });
      break;
    case "table":
      mergeContract(contract, {
        cssVariables: [
          row("--r8-table-max-height", "length", "16rem", "Define a altura maxima do wrapper quando o header fica sticky.", "Defines the wrapper max height when the header becomes sticky."),
          row("--r8-table-cell-padding-x / --r8-table-cell-padding-y", "length", "var(--r8-space-3)", "Ajustam a densidade horizontal e vertical das celulas.", "Adjust the horizontal and vertical density of table cells."),
          row("--r8-table-header-bg / --r8-table-row-bg / --r8-table-row-alt-bg", "color", "theme defaults", "Permitem personalizar header, linhas base e zebra sem trocar a estrutura.", "Let you customize the header, base rows, and zebra striping without changing the structure."),
          row("--r8-table-hover-bg", "color", "mixed primary surface", "Controla o destaque de hover nas linhas quando `r8-table--hover` estiver ativo.", "Controls row hover highlight when `r8-table--hover` is active."),
        ],
      });
      break;
    case "breadcrumb":
      mergeContract(contract, {
        attributes: [
          row("aria-label", "string", `"Breadcrumb" recommended on nav`, "Nome acessivel recomendado no `nav` que envolve a trilha.", "Recommended accessible name on the `nav` wrapping the trail."),
          row("aria-current", `"page"`, "only on current item", "Marca o ultimo item como pagina atual para tecnologia assistiva.", "Marks the last item as the current page for assistive technology."),
        ],
        dataAttributes: [
          row("data-r8-separator", `"slash" | "chevron" | "double" | "dot"`, `"slash"`, "Troca o separador visual entre os itens sem alterar a estrutura do breadcrumb.", "Changes the visual separator between items without altering the breadcrumb structure."),
        ],
        cssVariables: [
          row("--r8-breadcrumb-gap", "length", "var(--r8-space-2)", "Ajusta o espacamento entre os itens e o separador.", "Adjusts spacing between items and the separator."),
          row("--r8-breadcrumb-separator-color", "color", "var(--r8-color-accent)", "Controla a cor usada no caractere separador.", "Controls the color used for the separator character."),
          row("--r8-breadcrumb-current-color", "color", "var(--r8-color-ink)", "Define o destaque do item atual sem transformar o breadcrumb em tabs.", "Defines the current item emphasis without turning the breadcrumb into tabs."),
          row("--r8-breadcrumb-link-color / --r8-breadcrumb-link-hover-color", "color", "muted / primary strong", "Permitem alinhar o tom dos links com o contexto visual local.", "Let you align link tone with the local visual context."),
        ],
      });
      break;
    case "dropdown":
      mergeContract(contract, {
        attributes: [
          row("aria-expanded", "boolean", "false on trigger", "Reflete o estado aberto do trigger principal do dropdown.", "Reflects the open state on the dropdown's main trigger."),
          row("aria-disabled", "boolean", "false", "Bloqueia itens específicos do menu sem removê-los da leitura visual.", "Blocks specific menu items without removing them from visual reading."),
        ],
        dataAttributes: [
          row("data-r8-command", "string", "item text fallback", "Valor emitido no evento `r8:dropdown-command` ao acionar um item.", "Value emitted in the `r8:dropdown-command` event when an item is activated."),
          row("data-r8-close-on-select", `"true" | "false"`, `"true"`, "Quando `false`, mantém o menu aberto após selecionar uma ação.", "When `false`, keeps the menu open after selecting an action."),
        ],
        cssVariables: [
          row("--r8-dropdown-menu-width", "length", "12rem", "Ajusta a largura mínima do painel de ações.", "Adjusts the minimum width of the actions panel."),
          row("--r8-dropdown-item-padding-x / --r8-dropdown-item-padding-y", "length", "var(--r8-space-3) / var(--r8-space-2)", "Controlam a densidade interna dos itens do menu.", "Control the internal density of menu items."),
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
          row("aria-current", "boolean", "false", "Marca a page ativa na lista de items.", "Marks the active page inside the item list."),
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
          row("aria-checked", "boolean", "false", "Cada item reflete se o nivel atual inclui aquela estrela/pixel.", "Each item reflects whether the current level includes that star or pixel."),
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
          event("r8:transfer-change", `{ direction, movedItems }`, "Emitido depois que itens selecionados mudam de panel.", "Emitted after selected items move between panels."),
        ],
      });
      break;
    case "alert":
      mergeContract(contract, {
        attributes: [
          row("role", `"alert" | "status"`, `"alert"`, "Role recomendada para anunciar feedback inline de forma contextual.", "Recommended role for announcing inline contextual feedback."),
          row("aria-live", `"assertive" | "polite"`, `"assertive"`, "Controla como assistive tech anuncia o Alert quando ele muda dinamicamente.", "Controls how assistive tech announces the Alert when it changes dynamically."),
          row("hidden", "boolean", "false", "Opcional para examples dismissible ou live alerts controlados pelo runtime.", "Optional for dismissible examples or live alerts controlled by the runtime."),
        ],
        dataAttributes: [
          row("data-r8-dismiss", `"true" | "false"`, `"false"`, "No close button interno, aciona o dismiss helper e sincroniza o estado do Alert.", "On an inner close button, triggers the dismiss helper and keeps the Alert state in sync."),
          row("data-r8-variant", `"primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "info" | "dark" | "light"`, "none", "Aplica a semantic tone sem concatenar modifier classes no host app.", "Applies a semantic tone without concatenating modifier classes in the host app."),
          row("data-r8-toggle", `"true"`, `"true"`, "No trigger, revela ou recolhe um Alert hidden para live examples e inline callouts.", "On a trigger, reveals or hides a hidden Alert for live examples and inline callouts."),
          row("data-r8-target", "CSS selector", "required on trigger", "Aponta para o Alert controlado pelo helper declarativo.", "Points to the Alert controlled by the declarative helper."),
          row("data-r8-close", "CSS selector | empty", "nearest host", "Fecha o Alert informado ou o host mais proximo pelo helper de runtime.", "Closes the provided Alert or the nearest host through the runtime helper."),
        ],
        cssVariables: [
          row("--r8-alert-background / --r8-alert-foreground / --r8-alert-accent", "color", "tone-specific", "Controlam superficie, contraste e faixa lateral do Alert.", "Control the Alert surface, contrast, and side accent rail."),
          row("--r8-alert-gap / --r8-alert-padding", "length", "space tokens", "Ajustam a densidade interna do bloco sem reescrever a estrutura.", "Adjust the block's internal density without rewriting its structure."),
          row("--r8-alert-icon-size", "length", "2rem", "Escala base do tile usado por `r8-alert__icon`.", "Base size of the tile used by `r8-alert__icon`."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:dismiss", `{ target }`, "Emitido quando o Alert e fechado pelo helper declarativo.", "Emitted when the Alert is closed by the declarative helper."),
          event("r8:target-open", `{ target, trigger }`, "Emitido quando o Alert abre pelo helper declarativo.", "Emitted when the Alert opens through the declarative helper."),
          event("r8:target-close", `{ target, trigger }`, "Emitido quando o Alert fecha pelo helper declarativo.", "Emitted when the Alert closes through the declarative helper."),
        ],
      });
      break;
    case "loading":
      mergeContract(contract, {
        attributes: [
          row("role", `"status"`, `"status"`, "Use no host para anunciar progresso assincrono sem interromper a leitura atual.", "Use on the host to announce asynchronous progress without interrupting current reading."),
          row("aria-live", `"polite" | "off"`, `"polite"`, "Controla se updates do label visivel devem ser anunciados por assistive tech.", "Controls whether visible label updates should be announced by assistive tech."),
          row("aria-label", "string", "recommended when there is no visible label", "Rotulo acessivel quando o Loading nao renderiza `r8-loading__label`.", "Accessible label when the Loading does not render `r8-loading__label`."),
        ],
        cssVariables: [
          row("--r8-loading-accent", "color", "var(--r8-color-accent)", "Accent principal usado por pixels, dots, bars e spinner cells.", "Main accent used by pixels, dots, bars and spinner cells."),
          row("--r8-loading-track", "color", "var(--r8-color-surface-2)", "Surface do track para variants com scan bar.", "Track surface for scan bar variants."),
          row("--r8-loading-size", "length", "0.9rem", "Escala base compartilhada entre todos os subelements do Loading.", "Base scale shared across every Loading sub-element."),
          row("--r8-loading-speed", "time", "0.8s", "Velocidade de animacao compartilhada pelos variants reutilizaveis.", "Animation speed shared by the reusable variants."),
        ],
      });
      break;
    case "dialog":
      mergeContract(contract, {
        attributes: [
          row("open", "boolean", "false", "Pode usar o `<dialog>` nativo ou um container com `hidden`.", "You can use the native `<dialog>` element or a container with `hidden`."),
          row("aria-labelledby", "string", "recommended", "Conecta o title ao container modal.", "Connects the title to the modal container."),
        ],
        dataAttributes: [
          row("data-r8-toggle", `"true"`, `"true"`, "Marca um trigger declarativo para abrir ou fechar o target.", "Marks a declarative trigger for opening or closing the target."),
          row("data-r8-target", "CSS selector", "required", "Selector do Dialog ou overlay controlado.", "Selector of the controlled Dialog or overlay."),
          row("data-r8-close", "CSS selector | empty", "nearest host", "Fecha o target informado ou o overlay mais proximo.", "Closes the provided target or the nearest overlay host."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:target-open", `{ target, trigger }`, "Emitido quando o Dialog abre pelo helper declarativo.", "Emitted when the Dialog opens through the declarative helper."),
          event("r8:target-close", `{ target, trigger }`, "Emitido quando o Dialog fecha pelo helper declarativo.", "Emitted when the Dialog closes through the declarative helper."),
        ],
      });
      break;
    case "popover":
    case "tooltip":
      mergeContract(contract, {
        dataAttributes: [
          row("data-r8-toggle", `"true"`, `"true"`, `Trigger declarativo usado para abrir ${component.name}.`, `Declarative trigger used to open ${component.name}.`),
          row("data-r8-target", "CSS selector", "required", `Target controlado por ${component.name}.`, `Target controlled by ${component.name}.`),
          row("data-r8-close", "CSS selector | empty", "nearest host", `Fecha ${component.name} pelo helper do runtime.`, `Closes ${component.name} through the runtime helper.`),
          row("data-r8-placement", `"top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "right"`, component.name === "Tooltip" ? `"top"` : `"bottom-start"`, "Define o posicionamento flutuante relativo ao trigger.", "Defines the floating placement relative to the trigger."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:target-open", `{ target, trigger }`, `Emitido quando ${component.name} abre pelo helper declarativo.`, `Emitted when ${component.name} opens through the declarative helper.`),
          event("r8:target-close", `{ target, trigger }`, `Emitido quando ${component.name} fecha pelo helper declarativo.`, `Emitted when ${component.name} closes through the declarative helper.`),
        ],
      });
      break;
    case "drawer":
      mergeContract(contract, {
        dataAttributes: [
          row("data-r8-toggle", `"true"`, `"true"`, `Trigger declarativo para abrir ${component.name}.`, `Declarative trigger used to open ${component.name}.`),
          row("data-r8-target", "CSS selector", "required", `Target controlado por ${component.name}.`, `Target controlled by ${component.name}.`),
          row("data-r8-close", "CSS selector | empty", "nearest host", `Fecha ${component.name} pelo helper do runtime.`, `Closes ${component.name} through the runtime helper.`),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:target-open", `{ target, trigger }`, `Emitido quando ${component.name} abre pelo helper declarativo.`, `Emitted when ${component.name} opens through the declarative helper.`),
          event("r8:target-close", `{ target, trigger }`, `Emitido quando ${component.name} fecha pelo helper declarativo.`, `Emitted when ${component.name} closes through the declarative helper.`),
        ],
      });

      if (component.id === "drawer") {
        mergeContract(contract, {
          dataAttributes: [
            row("data-r8-overlay-scope", "marker", "none", "Opcional no wrapper para conter drawer e backdrop dentro de uma area local de preview ou app shell.", "Optional on a wrapper to contain the drawer and backdrop inside a local preview area or app shell."),
          ],
        });
      }
      break;
    case "config-provider":
      mergeContract(contract, {
        dataAttributes: [
          row("data-theme", `"night" | "terminal" | "danger"`, "none", "Opcional no host app quando quiser combinar `Config Provider` com theme switches externos ou estado vindo de CMS.", "Optional in the host app when you want to pair `Config Provider` with external theme switches or CMS-driven state."),
          row("data-density", `"compact" | "comfortable"`, "none", "Permite controlar a densidade local do scope por atributo, sem depender de classes utilitarias adicionais.", "Lets you control local scope density through an attribute without relying on extra utility classes."),
        ],
        cssVariables: [
          row("--r8-config-provider-padding", "length", "var(--r8-space-4)", "Ajusta o padding do shell do provider sem alterar os componentes internos diretamente.", "Adjusts the provider shell padding without directly altering inner components."),
          row("--r8-config-provider-gap", "length", "var(--r8-space-4)", "Controla o espacamento entre os filhos imediatos do scope.", "Controls spacing between the scope immediate children."),
          row("--r8-config-provider-surface", "color", "var(--r8-color-surface)", "Troca a superficie do wrapper local enquanto os descendants continuam herdando os tokens do scope.", "Changes the local wrapper surface while descendants continue inheriting the scope tokens."),
          row("--r8-config-provider-border", "color", "var(--r8-color-border)", "Permite afinar o contorno do provider para shells mais claros, escuros ou tematicos.", "Lets you tune the provider outline for lighter, darker, or themed shells."),
          row("--r8-config-provider-shadow", "shadow", "var(--r8-shadow-md)", "Controla a sombra estrutural do wrapper local.", "Controls the structural shadow of the local wrapper."),
          row("--r8-config-provider-text", "color", "var(--r8-color-ink)", "Define a cor base do texto do wrapper sem quebrar a heranca de tokens.", "Defines the wrapper base text color without breaking token inheritance."),
          row("--r8-color-surface", "color", "theme default", "Superficie base reaplicada para todos os filhos dentro do scope.", "Base surface reapplied to all children inside the scope."),
          row("--r8-color-ink", "color", "theme default", "Texto principal dos descendants dentro do scope.", "Primary descendant text inside the scope."),
          row("--r8-color-primary", "color", "theme default", "Accent principal para Buttons, badges e controls no scope.", "Primary accent for Buttons, badges and controls inside the scope."),
          row("--r8-font-size-sm", "length", "theme default", "Ajusta a escala media de texto dentro do scope, util para presets de densidade local.", "Adjusts the medium text scale inside the scope, useful for local density presets."),
          row("--r8-space-4", "length", "theme default", "Ajusta o ritmo de espacamento usado por varios componentes dentro do scope.", "Adjusts the spacing rhythm used by many components inside the scope."),
          row("--r8-shadow-md", "shadow", "theme default", "Shadow principal usada pelas surfaces dentro do scope.", "Main shadow used by surfaces inside the scope."),
          row("--r8-dialog-backdrop", "color", "theme default", "Backdrop reaplicado para overlays renderizados dentro do scope.", "Backdrop reapplied to overlays rendered inside the scope."),
        ],
      });
      break;
    case "switch":
      mergeContract(contract, {
        cssVariables: [
          row("--r8-switch-enabled-bg", "color", "var(--r8-color-success)", "Cor do track quando o Switch estiver ligado ou com `aria-checked=\"true\"`.", "Track color when the Switch is on or using `aria-checked=\"true\"`."),
          row("--r8-switch-disabled-bg", "color", "var(--r8-color-surface-2)", "Cor do track quando o Switch estiver desligado, mas ainda interativo.", "Track color when the Switch is off but still interactive."),
          row("--r8-switch-blocked-bg", "color", "var(--r8-color-disabled-bg)", "Cor do track quando o controle em si estiver desabilitado e sem interacao.", "Track color when the control itself is disabled and non-interactive."),
          row("--r8-switch-thumb-bg", "color", "var(--r8-color-surface-raised)", "Cor base do thumb enquanto o Switch estiver interativo.", "Base thumb color while the Switch remains interactive."),
          row("--r8-switch-thumb-blocked-bg", "color", "var(--r8-color-surface)", "Cor do thumb quando o Switch estiver em estado desabilitado.", "Thumb color when the Switch is in a disabled state."),
        ],
      });
      break;
    case "theme-switch":
      mergeContract(contract, {
        attributes: [
          row("role", `"switch"`, `"switch"`, "Role acessivel para indicar alternancia binaria entre themes.", "Accessible role that indicates binary switching between themes."),
          row("aria-label", "string", "recommended", "Nome acessivel do control, por exemplo `Toggle theme`.", "Accessible name for the control, for example `Toggle theme`."),
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
          row("alt", "string", "recommended", "Texto alternativo quando a media real for um `<img>` no frame.", "Alternative text when the real media is an `<img>` inside the frame."),
          row("loading", `"lazy" | "eager"`, `"lazy"`, "Comportamento nativo de carregamento do asset visual.", "Native loading behavior for the visual asset."),
          row("src", "string", "required on real `<img>`", "Fonte da imagem real dentro do frame.", "Source for the real image inside the frame."),
        ],
        dataAttributes: [
          row("data-r8-fit", `"cover" | "contain" | "fill" | "none" | "scale-down"`, `"cover"`, "Controla como a imagem ocupa a moldura.", "Controls how the image fills the frame."),
          row("data-r8-ratio", `"square" | "landscape" | "wide" | "portrait"`, "none", "Aplica proporções rápidas para thumbnails, cards ou hero previews.", "Applies quick ratios for thumbnails, cards, or hero previews."),
        ],
        cssVariables: [
          row("--r8-image-height", "length", "12rem", "Define a altura útil quando nenhuma proporção pronta estiver ativa.", "Defines the usable height when no preset ratio is active."),
          row("--r8-image-fit", "keyword", `"cover"`, "Custom property que ajusta o `object-fit` da mídia.", "Custom property that adjusts the media `object-fit`."),
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

  return contract;
}
