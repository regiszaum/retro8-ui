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

const buttonVariants = `"default" | "primary" | "secondary" | "tertiary" | "success" | "info" | "danger" | "dark" | "light" | "ghost"`;
const buttonSizes = `"sm" | "md" | "lg"`;
const choiceKinds = new Set([
  "autocomplete",
  "cascader",
  "color-picker",
  "color-picker-panel",
  "mention",
  "select",
  "virtual-select",
  "time-picker",
  "time-select",
  "tree-select",
  "dropdown",
]);
const overlayKinds = new Set(["dialog", "drawer", "message-box", "notification", "popover", "tooltip"]);
const binaryKinds = new Set(["checkbox", "radio", "switch", "theme-switch"]);
const runtimeKinds = new Set([
  "button",
  ...choiceKinds,
  "date-picker",
  "date-picker-panel",
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
          "boolean",
          "false",
          `State binario controlado pelo runtime de ${component.name}.`,
          `Binary state controlled by the ${component.name} runtime.`,
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
          `{ checked, kind }`,
          "Emitido quando checkbox, radio, switch ou theme switch muda de state.",
          "Emitted when a checkbox, radio, switch or theme switch changes state.",
        ),
      ],
    });
  }

  switch (component.id) {
    case "button":
      mergeContract(contract, {
        attributes: [
          row("type", `"button" | "submit" | "reset"`, `"button"`, "Tipo nativo do `<button>` ou do submit control.", "Native `<button>` or submit control type."),
          row("disabled", "boolean", "false", "Desativa interacao e aplica o disabled treatment da retro8-ui.", "Disables interaction and applies the retro8-ui disabled treatment."),
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
          row("data-r8-clearable", `"true" | "false"`, `"false"`, "Exibe `r8-cascader__clear` para limpar a escolha atual.", "Shows `r8-cascader__clear` to clear the current selection."),
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
          event("r8:choice-change", `{ kind, value, label, labels, values, path, node, option, text }`, "Evento generico tambem emitido para manter compatibilidade com o choice runtime.", "Generic event also emitted to preserve compatibility with the choice runtime."),
        ],
      });
      break;
    case "date-picker-panel":
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
        ],
        methods: runtimeMethods,
        events: [
          event("r8:date-change", `{ kind, value, label, date, panel, trigger }`, "Emitido quando o date selection muda.", "Emitted when the date selection changes."),
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
          row("aria-disabled", "boolean", "false", "Permite expor um link visualmente desabilitado sem trocar o elemento.", "Lets you expose a visually disabled link without changing the element."),
        ],
      });
      break;
    case "splitter":
      mergeContract(contract, {
        attributes: [
          row("aria-orientation", `"horizontal" | "vertical"`, "derived from class", "O runtime aplica a orientation do handle a partir da classe do Splitter.", "The runtime applies the handle orientation from the Splitter class."),
          row("aria-valuenow", "number", "50", "Reflete a posicao atual do handle durante resize.", "Reflects the current handle position during resize."),
        ],
        dataAttributes: [
          row("data-r8-splitter-position", "number", "50", "Posicao inicial do handle em porcentagem.", "Initial handle position in percentage."),
          row("data-r8-splitter-min", "number", "20", "Limite minimo do primeiro pane em porcentagem.", "Minimum size of the first pane in percentage."),
          row("data-r8-splitter-max", "number", "80", "Limite maximo do primeiro pane em porcentagem.", "Maximum size of the first pane in percentage."),
        ],
        cssVariables: [
          row("--r8-splitter-position", "percentage", "50%", "Custom property usada pelo layout para distribuir os panes.", "Custom property used by the layout to distribute the panes."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:splitter-change", `{ value, min, max, orientation }`, "Emitido a cada resize por pointer ou keyboard.", "Emitted on each resize through pointer or keyboard."),
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
          row("hidden", "boolean", "true on closed body", "Esconde o body fechado com semantica nativa.", "Hides the closed body with native semantics."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:collapse-toggle", `{ open, item }`, "Emitido quando um item abre ou fecha.", "Emitted when an item opens or closes."),
        ],
      });
      break;
    case "carousel":
      mergeContract(contract, {
        attributes: [
          row("hidden", "boolean", "true on inactive slides", "Somente o slide ativo fica exposto pelo runtime.", "Only the active slide stays exposed by the runtime."),
          row("aria-current", "boolean", "false", "Marca o dot atualmente ativo.", "Marks the currently active dot."),
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
        methods: runtimeMethods,
        events: [
          event("r8:input-number-change", `{ value }`, "Emitido depois que os Buttons alteram o numero.", "Emitted after the buttons change the number."),
        ],
      });
      break;
    case "input-tag":
      mergeContract(contract, {
        attributes: [
          row("placeholder", "string", "none", "Placeholder do input interno para novas tags.", "Placeholder for the inner input used for new tags."),
          row("maxlength", "number", "none", "Limita o tamanho de cada nova tag no input nativo.", "Limits the size of each new tag in the native input."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:input-tag-add", `{ value, tag }`, "Emitido quando uma tag nova e criada pelo Enter.", "Emitted when a new tag is created on Enter."),
          event("r8:input-tag-remove", `{ value }`, "Emitido quando uma tag existente e removida.", "Emitted when an existing tag is removed."),
        ],
      });
      break;
    case "upload":
      mergeContract(contract, {
        attributes: [
          row("accept", "string", "none", "Tipos de arquivo aceitos pelo input nativo do host app.", "Accepted file types for the host app native input."),
          row("multiple", "boolean", "false", "Permite selecao multipla no input nativo.", "Allows multi-file selection in the native input."),
          row("disabled", "boolean", "false", "Desativa dropzone e trigger do upload control.", "Disables the upload dropzone and trigger."),
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
        ],
        cssVariables: [
          row("--r8-progress-value", "percentage", "0%", "Controla a largura visual da barra interna.", "Controls the visual width of the inner bar."),
        ],
        methods: runtimeMethods,
      });
      mergeContract(contract, withVariantDataAttribute(component.name, `"success" | "warning" | "danger"`));
      break;
    case "pagination":
      mergeContract(contract, {
        attributes: [
          row("aria-current", "boolean", "false", "Marca a page ativa na lista de items.", "Marks the active page inside the item list."),
        ],
        methods: runtimeMethods,
        events: [
          event("r8:pagination-change", `{ item, index }`, "Emitido quando a page ativa muda.", "Emitted when the active page changes."),
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
          row("role", `"alert" | "status"`, `"alert"`, "Role recomendada para anunciar feedback immediato.", "Recommended role for announcing immediate feedback."),
          row("aria-live", `"assertive" | "polite"`, `"assertive"`, "Controla como assistive tech anuncia o Alert.", "Controls how assistive tech announces the Alert."),
        ],
        dataAttributes: [
          row("data-r8-dismiss", `"true" | "false"`, `"false"`, "Liga o dismiss helper quando houver Button interno com esse atributo.", "Enables the dismiss helper when an inner button carries this attribute."),
          row("data-r8-variant", `"success" | "info" | "danger"`, "none", "Aplica a tone sem concatenar modifier classes no host app.", "Applies the tone without concatenating modifier classes in the host app."),
          row("data-r8-placement", `"top-left" | "bottom-left" | "top-right" | "bottom-right"`, "none", "Quando presente no Alert, ativa o comportamento de toast posicionado no canto informado.", "When present on the Alert, enables toast behavior positioned in the chosen corner."),
          row("data-r8-duration", "number", `"4500" for positioned toasts`, "Controla por quantos milissegundos o toast fica visivel antes de fechar automaticamente. Use `0` para manter aberto.", "Controls how many milliseconds the toast stays visible before closing automatically. Use `0` to keep it open."),
          row("data-r8-toggle", `"true"`, `"true"`, "No trigger, abre o Alert/overlay declarativamente.", "On the trigger, opens the Alert overlay declaratively."),
          row("data-r8-target", "CSS selector", "required on trigger", "Aponta para o Alert controlado pelo helper declarativo.", "Points to the Alert controlled by the declarative helper."),
          row("data-r8-close", "CSS selector | empty", "nearest host", "Fecha o Alert informado ou o host mais proximo.", "Closes the provided Alert or the nearest host."),
          row("data-r8-overlay-scope", "marker", "none", "Opcional no wrapper quando voce quiser conter alerts posicionados dentro de uma area especifica.", "Optional on a wrapper when you want to contain positioned alerts inside a specific region."),
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
    case "message-box":
    case "notification":
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
        attributes: [
          row("data-theme", "string", "none", "Opcional no host app quando quiser combinar `Config Provider` com theme switches externos.", "Optional in the host app when you want to pair `Config Provider` with external theme switches."),
        ],
        cssVariables: [
          row("--r8-color-surface", "color", "theme default", "Superficie base reaplicada para todos os filhos dentro do scope.", "Base surface reapplied to all children inside the scope."),
          row("--r8-color-ink", "color", "theme default", "Texto principal dos descendants dentro do scope.", "Primary descendant text inside the scope."),
          row("--r8-color-primary", "color", "theme default", "Accent principal para Buttons, badges e controls no scope.", "Primary accent for Buttons, badges and controls inside the scope."),
          row("--r8-shadow-md", "shadow", "theme default", "Shadow principal usada pelas surfaces dentro do scope.", "Main shadow used by surfaces inside the scope."),
          row("--r8-dialog-backdrop", "color", "theme default", "Backdrop reaplicado para overlays renderizados dentro do scope.", "Backdrop reapplied to overlays rendered inside the scope."),
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
