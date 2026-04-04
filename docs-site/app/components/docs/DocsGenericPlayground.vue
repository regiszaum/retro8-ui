<script setup lang="ts">
type ControlOption = {
  value: string;
  label: string;
};

type PlaygroundControl = {
  key: string;
  label: string;
  type: "text" | "number" | "select";
  max?: number;
  maxlength?: number;
  min?: number;
  options?: ControlOption[];
  step?: number;
};

type PlaygroundToggle = {
  key: string;
  label: string;
};

type PlaygroundConfig = {
  defaults: Record<string, any>;
  fields: PlaygroundControl[];
  surface: "compact" | "default" | "full" | "overlay" | "table" | "watermark" | "wide";
  toggles: PlaygroundToggle[];
  render: () => string;
};

type Retro8Runtime = {
  init?: (root?: Document | HTMLElement) => unknown;
};

const props = defineProps<{
  component: any;
  locale: string;
}>();

const previewSurface = ref<HTMLElement | null>(null);
const state = reactive<Record<string, any>>({});

const isPt = computed(() => props.locale === "pt-br");
const title = computed(() => (isPt.value ? `Playground do ${props.component.name}` : `${props.component.name} playground`));
const introCopy = computed(() =>
  isInteractiveComponent(props.component.id)
    ? localize(
        "Teste a API pública e os estados mais úteis desse componente sem sair da documentação.",
        "Test the public API and the most useful states for this component without leaving the documentation.",
      )
    : localize(
        "Ajuste variações comuns e copie o markup resultante para usar no app.",
        "Adjust common variants and copy the resulting markup to use in the app.",
      ),
);
const stageCopy = computed(() =>
  localize(
    "A prévia abaixo usa a API pública atual da Retro8 UI para validar leitura, estrutura e estados visuais.",
    "The preview below uses the current Retro8 UI public API to validate readability, structure, and visual states.",
  ),
);
const ui = computed(() => ({
  currentMarkup: localize("Markup atual", "Current markup"),
  previewLabel: localize("Prévia configurável", "Configurable preview"),
  quickStates: localize("Estados rápidos", "Quick states"),
  reset: localize("Redefinir", "Reset"),
}));

function localize(pt: string, en: string) {
  return isPt.value ? pt : en;
}

function option(value: string, pt: string, en: string): ControlOption {
  return {
    value,
    label: localize(pt, en),
  };
}

function escapeAttribute(value: string) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function escapeHtml(value: string) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;");
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function classList(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function asNumber(value: unknown, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function isInteractiveComponent(id: string) {
  return new Set([
    "select",
    "slider",
    "switch",
    "theme-switch",
    "transfer",
    "carousel",
    "collapse",
    "pagination",
    "tabs",
    "alert",
    "dialog",
    "drawer",
    "message-box",
    "notification",
    "popover",
    "tooltip",
    "tag",
  ]).has(id);
}

function getRoleLabel(value: string) {
  switch (value) {
    case "engineer":
      return localize("Engineer", "Engineer");
    case "medic":
      return localize("Medic", "Medic");
    default:
      return localize("Explorer", "Explorer");
  }
}

function getActionLabel(value: string) {
  switch (value) {
    case "archive":
      return localize("Archive", "Archive");
    case "delete":
      return localize("Delete", "Delete");
    default:
      return localize("Duplicate", "Duplicate");
  }
}

function buildRateItems(count: number, value: number) {
  return Array.from({ length: count }, (_, index) => {
    const isActive = index < value;
    return `<span class="r8-rate__item${isActive ? " is-active" : ""}" role="radio" aria-checked="${isActive ? "true" : "false"}">*</span>`;
  }).join("\n");
}

function buildUploadFiles(count: number) {
  const files = [
    ["retro8.css", "18 KB"],
    ["sprite-sheet.png", "92 KB"],
    ["deploy-log.txt", "4 KB"],
  ].slice(0, count);

  return files
    .map(
      ([name, size]) =>
        `<div class="r8-upload__file"><span>${escapeHtml(name)}</span><span>${escapeHtml(size)}</span></div>`,
    )
    .join("\n");
}

function buildTableRows(count: number) {
  const rows = [
    ["PIX-07", localize("Online", "Online"), localize("Engineer", "Engineer")],
    ["PIX-11", localize("Queued", "Queued"), localize("Medic", "Medic")],
    ["PIX-21", localize("Stable", "Stable"), localize("Analyst", "Analyst")],
    ["PIX-42", localize("Offline", "Offline"), localize("Scout", "Scout")],
  ].slice(0, count);

  return rows
    .map(
      (row) => `<tr>
      <td>${escapeHtml(row[0])}</td>
      <td>${escapeHtml(row[1])}</td>
      <td>${escapeHtml(row[2])}</td>
    </tr>`,
    )
    .join("\n");
}

function buildTimelineItems(count: number) {
  const items = [
    localize("08:30 - Build finalizado", "08:30 - Build finished"),
    localize("08:45 - Docs publicadas", "08:45 - Docs deployed"),
    localize("09:10 - Cache aquecido", "09:10 - Cache warmed"),
    localize("09:25 - Release estável", "09:25 - Stable release"),
  ].slice(0, count);

  return items
    .map(
      (item) => `<div class="r8-timeline__item">
    <span class="r8-timeline__dot"></span>
    <div class="r8-timeline__content">${escapeHtml(item)}</div>
  </div>`,
    )
    .join("\n");
}

function buildPaginationItems(total: number, active: number) {
  const safeActive = clamp(active, 1, total);

  if (total <= 5) {
    return Array.from({ length: total }, (_, index) => index + 1)
      .map(
        (page) =>
          `<span class="${classList("r8-pagination__item", page === safeActive && "is-active")}">${page}</span>`,
      )
      .join("\n");
  }

  const pages = [1, 2, 3];
  const tail = total;
  return `${pages
    .map(
      (page) =>
        `<span class="${classList("r8-pagination__item", page === safeActive && "is-active")}">${page}</span>`,
    )
    .join("\n")}
  <span class="r8-pagination__more">...</span>
  <span class="${classList("r8-pagination__item", tail === safeActive && "is-active")}">${tail}</span>`;
}

function buildLoadingVisual(variant: string, sizeClass: string, label: string) {
  const rootClass = classList("r8-loading", variant !== "pixels" && `r8-loading--${variant}`, sizeClass);

  if (variant === "dots") {
    return `<div class="${rootClass}" role="status" aria-live="polite">
  <span class="r8-loading__dots" aria-hidden="true">
    <span class="r8-loading__dot"></span>
    <span class="r8-loading__dot"></span>
    <span class="r8-loading__dot"></span>
    <span class="r8-loading__dot"></span>
  </span>
  <span class="r8-loading__label">${escapeHtml(label)}</span>
</div>`;
  }

  if (variant === "bar") {
    return `<div class="${rootClass}" role="status" aria-live="polite">
  <span class="r8-loading__track" aria-hidden="true">
    <span class="r8-loading__fill"></span>
  </span>
  <span class="r8-loading__label">${escapeHtml(label)}</span>
</div>`;
  }

  if (variant === "equalizer") {
    return `<div class="${rootClass}" role="status" aria-live="polite">
  <span class="r8-loading__bars" aria-hidden="true">
    <span class="r8-loading__bar"></span>
    <span class="r8-loading__bar"></span>
    <span class="r8-loading__bar"></span>
    <span class="r8-loading__bar"></span>
  </span>
  <span class="r8-loading__label">${escapeHtml(label)}</span>
</div>`;
  }

  if (variant === "spinner") {
    return `<div class="${rootClass}" role="status" aria-live="polite">
  <span class="r8-loading__spinner" aria-hidden="true">
    <span class="r8-loading__spinner-cell"></span>
    <span class="r8-loading__spinner-cell"></span>
    <span class="r8-loading__spinner-cell"></span>
    <span class="r8-loading__spinner-cell"></span>
    <span class="r8-loading__spinner-cell"></span>
    <span class="r8-loading__spinner-cell"></span>
    <span class="r8-loading__spinner-cell"></span>
    <span class="r8-loading__spinner-cell"></span>
  </span>
  <span class="r8-loading__label">${escapeHtml(label)}</span>
</div>`;
  }

  return `<div class="${rootClass}" role="status" aria-live="polite">
  <span class="r8-loading__pixels" aria-hidden="true">
    <span class="r8-loading__pixel"></span>
    <span class="r8-loading__pixel"></span>
    <span class="r8-loading__pixel"></span>
  </span>
  <span class="r8-loading__label">${escapeHtml(label)}</span>
</div>`;
}

function getDefaults(id: string): Record<string, any> {
  switch (id) {
    case "radio":
      return { bordered: false, disabled: false, selected: "online", size: "md" };
    case "rate":
      return { count: 5, value: 3 };
    case "select":
      return { disabled: false, selected: "explorer" };
    case "slider":
      return { label: localize("Volume", "Volume"), value: 68 };
    case "switch":
      return { checked: true, disabled: false, size: "md" };
    case "theme-switch":
      return { checked: true, disabled: false, size: "md" };
    case "transfer":
      return { selectedSource: "scanner" };
    case "upload":
      return { disabled: false, files: 2, multiple: true };
    case "avatar":
      return { round: false, size: "md", text: "PX" };
    case "badge":
      return { dot: false, text: "new", tone: "primary" };
    case "card":
      return { shadow: "default", title: localize("Resumo da missão", "Mission summary") };
    case "carousel":
      return { active: "1", autoplay: false };
    case "collapse":
      return { accordion: false, open: "display" };
    case "empty":
      return { action: true, title: localize("Nada por aqui", "Nothing here yet") };
    case "image":
      return { caption: localize("Prévia do sprite", "Sprite preview"), tall: false };
    case "pagination":
      return { active: 2, background: false, size: "md", total: 9 };
    case "progress":
      return { thin: false, tone: "default", value: 32 };
    case "skeleton":
      return { block: true, lines: 3 };
    case "table":
      return { rows: 3, striped: false };
    case "tag":
      return { closable: false, text: "synced", tone: "success" };
    case "timeline":
      return { items: 3 };
    case "breadcrumb":
      return { current: "Button" };
    case "dropdown":
      return { selected: "duplicate" };
    case "menu":
      return { active: "overview", horizontal: true };
    case "steps":
      return { active: 2, vertical: false };
    case "tabs":
      return { active: "stats", vertical: false };
    case "alert":
      return { dismissible: false, tone: "primary" };
    case "dialog":
      return { fullscreen: false, tone: "default" };
    case "drawer":
      return { placement: "right" };
    case "loading":
      return { label: localize("Carregando assets...", "Loading assets..."), size: "md", variant: "pixels" };
    case "message-box":
      return { title: localize("Sobrescrever arquivo?", "Overwrite file?") };
    case "notification":
      return { actions: true, title: localize("Nova release disponível", "New release available") };
    case "popover":
      return { placement: "bottom-start", title: localize("Painel de atalhos", "Shortcut panel") };
    case "tooltip":
      return { label: localize("Segure Shift para precisão.", "Hold Shift for precision."), placement: "top" };
    case "divider":
      return { align: "center", dashed: false, label: "checkpoint", orientation: "horizontal" };
    case "watermark":
      return { rotate: -18, size: 16, text: "retro8-ui" };
    default:
      return {};
  }
}

function buildConfig(id: string): PlaygroundConfig {
  switch (id) {
    case "radio": {
      const selected = String(state.selected || "online");
      const size = String(state.size || "md");
      const baseClass = classList(
        size !== "md" && `r8-radio--${size}`,
        state.bordered && "r8-radio--bordered",
        state.disabled && "is-disabled",
      );

      const renderRadio = (value: string, label: string) => `<label class="${classList(
        "r8-radio",
        baseClass,
        selected === value && "is-checked",
      )}"${state.disabled ? ' aria-disabled="true"' : ""}>
  <span class="r8-radio__box" aria-hidden="true"></span>
  <span>${escapeHtml(label)}</span>
</label>`;

      return {
        defaults: getDefaults(id),
        fields: [
          { key: "selected", label: localize("Ativo", "Selected"), options: [option("online", "Online", "Online"), option("offline", "Offline", "Offline")], type: "select" },
          { key: "size", label: localize("Tamanho", "Size"), options: [option("sm", "Pequeno", "Small"), option("md", "Médio", "Medium"), option("lg", "Grande", "Large")], type: "select" },
        ],
        surface: "default",
        toggles: [
          { key: "bordered", label: localize("Com borda", "Bordered") },
          { key: "disabled", label: localize("Desabilitado", "Disabled") },
        ],
        render: () => `<div class="r8-stack" data-r8-radio-group>
  ${renderRadio("online", localize("Modo online", "Online mode"))}
  ${renderRadio("offline", localize("Modo offline", "Offline mode"))}
</div>`,
      };
    }

    case "rate": {
      const count = clamp(asNumber(state.count, 5), 3, 7);
      const value = clamp(asNumber(state.value, 3), 1, count);

      return {
        defaults: getDefaults(id),
        fields: [
          { key: "value", label: localize("Valor", "Value"), max: 7, min: 1, type: "number" },
          { key: "count", label: localize("Itens", "Items"), options: [option("5", "5 níveis", "5 levels"), option("7", "7 níveis", "7 levels")], type: "select" },
        ],
        surface: "compact",
        toggles: [],
        render: () => `<div class="r8-rate">
  ${buildRateItems(count, value)}
</div>`,
      };
    }

    case "select": {
      const selected = String(state.selected || "explorer");
      const selectedLabel = getRoleLabel(selected);

      return {
        defaults: getDefaults(id),
        fields: [
          {
            key: "selected",
            label: localize("Valor inicial", "Initial value"),
            options: [
              option("engineer", "Engineer", "Engineer"),
              option("medic", "Medic", "Medic"),
              option("explorer", "Explorer", "Explorer"),
            ],
            type: "select",
          },
        ],
        surface: "default",
        toggles: [{ key: "disabled", label: localize("Desabilitado", "Disabled") }],
        render: () => `<div class="r8-select">
  <button class="r8-select__trigger" type="button"${state.disabled ? " disabled" : ""}>
    <span data-r8-choice-display>${escapeHtml(selectedLabel)}</span>
    <span class="r8-choice__caret" aria-hidden="true">&gt;</span>
  </button>
  <div class="r8-select__menu" hidden>
    <button class="r8-select__option${selected === "engineer" ? " is-selected" : ""}" type="button" data-r8-value="engineer">Engineer</button>
    <button class="r8-select__option${selected === "medic" ? " is-selected" : ""}" type="button" data-r8-value="medic">Medic</button>
    <button class="r8-select__option${selected === "explorer" ? " is-selected" : ""}" type="button" data-r8-value="explorer">Explorer</button>
  </div>
</div>`,
      };
    }

    case "slider": {
      const value = clamp(asNumber(state.value, 68), 0, 100);
      const label = String(state.label || localize("Volume", "Volume"));

      return {
        defaults: getDefaults(id),
        fields: [
          { key: "label", label: localize("Rótulo", "Label"), maxlength: 24, type: "text" },
          { key: "value", label: localize("Valor", "Value"), max: 100, min: 0, type: "number" },
        ],
        surface: "wide",
        toggles: [],
        render: () => `<div class="r8-slider" data-r8-value="${value}" style="--r8-progress-value: ${value}%;">
  <div class="r8-slider__track" aria-valuenow="${value}">
    <div class="r8-slider__fill"></div>
    <div class="r8-slider__thumb" aria-hidden="true"></div>
  </div>
  <span class="r8-text r8-text--muted" data-r8-slider-output>${escapeHtml(label)}: ${value}%</span>
</div>`,
      };
    }

    case "switch": {
      const size = String(state.size || "md");
      return {
        defaults: getDefaults(id),
        fields: [
          { key: "size", label: localize("Tamanho", "Size"), options: [option("sm", "Pequeno", "Small"), option("md", "Médio", "Medium"), option("lg", "Grande", "Large")], type: "select" },
        ],
        surface: "compact",
        toggles: [
          { key: "checked", label: localize("Ligado", "Checked") },
          { key: "disabled", label: localize("Desabilitado", "Disabled") },
        ],
        render: () => `<label class="${classList("r8-switch", size !== "md" && `r8-switch--${size}`, state.checked && "is-checked", state.disabled && "is-disabled")}"${state.disabled ? ' aria-disabled="true"' : ""}>
  <span class="r8-switch__track"><span class="r8-switch__thumb"></span></span>
  <span>${escapeHtml(localize("Energia principal", "Main power"))}</span>
</label>`,
      };
    }

    case "theme-switch": {
      const size = String(state.size || "md");
      return {
        defaults: getDefaults(id),
        fields: [
          { key: "size", label: localize("Tamanho", "Size"), options: [option("sm", "Pequeno", "Small"), option("md", "Médio", "Medium"), option("lg", "Grande", "Large")], type: "select" },
        ],
        surface: "compact",
        toggles: [
          { key: "checked", label: localize("Modo noturno", "Night mode") },
          { key: "disabled", label: localize("Desabilitado", "Disabled") },
        ],
        render: () => `<button class="${classList("r8-theme-switch", size !== "md" && `r8-theme-switch--${size}`, state.checked && "is-checked", state.disabled && "is-disabled")}" type="button" role="switch" aria-checked="${state.checked ? "true" : "false"}" aria-label="Toggle theme"${state.disabled ? " disabled" : ""}>
  <span class="r8-theme-switch__glyph" aria-hidden="true"></span>
</button>`,
      };
    }

    case "transfer": {
      const selectedSource = String(state.selectedSource || "scanner");
      const sourceLabels = {
        radar: "Radar",
        scanner: "Scanner",
        map: "Map",
      } as Record<string, string>;

      return {
        defaults: getDefaults(id),
        fields: [
          {
            key: "selectedSource",
            label: localize("Item pré-selecionado", "Preselected item"),
            options: [option("radar", "Radar", "Radar"), option("scanner", "Scanner", "Scanner"), option("map", "Map", "Map")],
            type: "select",
          },
        ],
        surface: "wide",
        toggles: [],
        render: () => `<div class="r8-transfer">
  <div class="r8-transfer__panel">
    <div class="r8-transfer__header">${escapeHtml(localize("Disponível", "Available"))}</div>
    <div class="${classList("r8-transfer__item", selectedSource === "radar" && "is-selected")}">${sourceLabels.radar}</div>
    <div class="${classList("r8-transfer__item", selectedSource === "scanner" && "is-selected")}">${sourceLabels.scanner}</div>
    <div class="${classList("r8-transfer__item", selectedSource === "map" && "is-selected")}">${sourceLabels.map}</div>
  </div>
  <div class="r8-transfer__actions">
    <button class="r8-btn r8-btn--sm" type="button">&gt;</button>
    <button class="r8-btn r8-btn--sm" type="button">&lt;</button>
  </div>
  <div class="r8-transfer__panel">
    <div class="r8-transfer__header">${escapeHtml(localize("Selecionado", "Selected"))}</div>
    <div class="r8-transfer__item">Shield</div>
  </div>
</div>`,
      };
    }

    case "upload": {
      const files = clamp(asNumber(state.files, 2), 0, 3);
      return {
        defaults: getDefaults(id),
        fields: [
          { key: "files", label: localize("Arquivos listados", "Listed files"), max: 3, min: 0, type: "number" },
        ],
        surface: "wide",
        toggles: [
          { key: "multiple", label: localize("Múltiplos", "Multiple") },
          { key: "disabled", label: localize("Desabilitado", "Disabled") },
        ],
        render: () => `<div class="r8-upload"${state.disabled ? ' aria-disabled="true"' : ""}>
  <div class="r8-upload__dropzone"${state.disabled ? ' aria-disabled="true"' : ""}>${escapeHtml(localize("Arraste arquivos aqui", "Drop files here"))}</div>
  <div class="r8-upload__list">
    ${buildUploadFiles(files)}
  </div>
</div>`,
      };
    }

    case "avatar": {
      const size = String(state.size || "md");
      return {
        defaults: getDefaults(id),
        fields: [
          { key: "text", label: localize("Conteúdo", "Content"), maxlength: 4, type: "text" },
          { key: "size", label: localize("Tamanho", "Size"), options: [option("sm", "Pequeno", "Small"), option("md", "Médio", "Medium"), option("lg", "Grande", "Large")], type: "select" },
        ],
        surface: "compact",
        toggles: [{ key: "round", label: localize("Redondo", "Round") }],
        render: () => `<span class="${classList("r8-avatar", size === "sm" && "r8-avatar--sm", size === "lg" && "r8-avatar--lg", state.round && "r8-avatar--round")}">${escapeHtml(String(state.text || "PX"))}</span>`,
      };
    }

    case "badge": {
      const tone = String(state.tone || "primary");
      return {
        defaults: getDefaults(id),
        fields: [
          { key: "text", label: localize("Texto", "Text"), maxlength: 16, type: "text" },
          {
            key: "tone",
            label: localize("Tom", "Tone"),
            options: [
              option("default", "Padrão", "Default"),
              option("primary", "Primário", "Primary"),
              option("secondary", "Secundário", "Secondary"),
              option("tertiary", "Terciário", "Tertiary"),
              option("success", "Sucesso", "Success"),
              option("warning", "Aviso", "Warning"),
              option("danger", "Perigo", "Danger"),
              option("info", "Info", "Info"),
              option("dark", "Escuro", "Dark"),
              option("light", "Claro", "Light"),
            ],
            type: "select",
          },
        ],
        surface: "compact",
        toggles: [{ key: "dot", label: localize("Dot", "Dot") }],
        render: () => `<span class="${classList("r8-badge", tone !== "default" && `r8-badge--${tone}`, state.dot && "r8-badge--dot")}">${state.dot ? "" : escapeHtml(String(state.text || "new"))}</span>`,
      };
    }

    case "card": {
      const shadow = String(state.shadow || "default");
      return {
        defaults: getDefaults(id),
        fields: [
          { key: "title", label: localize("Título", "Title"), maxlength: 28, type: "text" },
          {
            key: "shadow",
            label: localize("Sombra", "Shadow"),
            options: [option("default", "Padrão", "Default"), option("hover", "Hover", "Hover"), option("flat", "Sem sombra", "Flat")],
            type: "select",
          },
        ],
        surface: "default",
        toggles: [],
        render: () => `<section class="${classList("r8-card", shadow === "hover" && "r8-card--hover", shadow === "flat" && "r8-card--flat")}">
  <div class="r8-card__header"><strong>${escapeHtml(String(state.title || ""))}</strong></div>
  <div class="r8-card__body">${escapeHtml(localize("Orbital relay synchronized. Shields at 84%.", "Orbital relay synchronized. Shields at 84%."))}</div>
  <div class="r8-card__footer">
    <button class="r8-btn r8-btn--sm r8-btn--primary" type="button">${escapeHtml(localize("Revisar", "Review"))}</button>
  </div>
</section>`,
      };
    }

    case "carousel": {
      const active = clamp(asNumber(state.active, 1), 1, 3);
      return {
        defaults: getDefaults(id),
        fields: [
          { key: "active", label: localize("Slide inicial", "Initial slide"), options: [option("1", "Slide 1", "Slide 1"), option("2", "Slide 2", "Slide 2"), option("3", "Slide 3", "Slide 3")], type: "select" },
        ],
        surface: "wide",
        toggles: [{ key: "autoplay", label: localize("Autoplay", "Autoplay") }],
        render: () => `<div class="r8-carousel"${state.autoplay ? ' data-r8-autoplay="true" data-r8-interval="2600"' : ""}>
  <div class="r8-carousel__viewport">
    <div class="r8-carousel__track">
      <article class="r8-carousel__slide"${active === 1 ? "" : " hidden"}>${escapeHtml(localize("Slide 01", "Slide 01"))}</article>
      <article class="r8-carousel__slide"${active === 2 ? "" : " hidden"}>${escapeHtml(localize("Slide 02", "Slide 02"))}</article>
      <article class="r8-carousel__slide"${active === 3 ? "" : " hidden"}>${escapeHtml(localize("Slide 03", "Slide 03"))}</article>
    </div>
  </div>
  <div class="r8-carousel__dots">
    <span class="${classList("r8-carousel__dot", active === 1 && "is-active")}"></span>
    <span class="${classList("r8-carousel__dot", active === 2 && "is-active")}"></span>
    <span class="${classList("r8-carousel__dot", active === 3 && "is-active")}"></span>
  </div>
</div>`,
      };
    }

    case "collapse": {
      const open = String(state.open || "display");
      const renderItem = (key: string, titleText: string, bodyText: string) => `<section class="${classList("r8-collapse__item", open === key && "is-open")}">
  <div class="r8-collapse__header">
    <strong>${escapeHtml(titleText)}</strong>
    <span>+</span>
  </div>
  <div class="r8-collapse__body"${open === key ? "" : " hidden"}>${escapeHtml(bodyText)}</div>
</section>`;

      return {
        defaults: getDefaults(id),
        fields: [
          {
            key: "open",
            label: localize("Item aberto", "Open item"),
            options: [
              option("display", "Display", "Display"),
              option("accessibility", "Acessibilidade", "Accessibility"),
              option("audio", "Audio", "Audio"),
            ],
            type: "select",
          },
        ],
        surface: "wide",
        toggles: [{ key: "accordion", label: localize("Accordion", "Accordion") }],
        render: () => `<div class="r8-collapse"${state.accordion ? ' data-r8-accordion="true"' : ""}>
  ${renderItem("display", localize("Display settings", "Display settings"), localize("Scanlines, palette and contrast controls.", "Scanlines, palette and contrast controls."))}
  ${renderItem("accessibility", localize("Accessibility settings", "Accessibility settings"), localize("Focus rings, motion fallback and contrast presets.", "Focus rings, motion fallback and contrast presets."))}
  ${renderItem("audio", localize("Audio settings", "Audio settings"), localize("Equalizer, alert volume and output channel.", "Equalizer, alert volume and output channel."))}
</div>`,
      };
    }

    case "empty":
      return {
        defaults: getDefaults(id),
        fields: [{ key: "title", label: localize("Título", "Title"), maxlength: 24, type: "text" }],
        surface: "default",
        toggles: [{ key: "action", label: localize("Com ação", "With action") }],
        render: () => `<div class="r8-empty">
  <div class="r8-empty__icon">NO-DATA</div>
  <div class="r8-empty__title">${escapeHtml(String(state.title || ""))}</div>
  <p class="r8-text r8-text--muted">${escapeHtml(localize("Tente outro filtro ou crie um novo registro.", "Try another filter or create a new record."))}</p>
  ${state.action ? `<button class="r8-btn r8-btn--sm r8-btn--primary" type="button">${escapeHtml(localize("Criar item", "Create item"))}</button>` : ""}
</div>`,
      };

    case "image":
      return {
        defaults: getDefaults(id),
        fields: [{ key: "caption", label: localize("Legenda", "Caption"), maxlength: 28, type: "text" }],
        surface: "default",
        toggles: [{ key: "tall", label: localize("Formato alto", "Tall format") }],
        render: () => `<figure class="r8-image">
  <div class="r8-image__frame" style="${state.tall ? "min-height:14rem;" : ""}">PIXEL PREVIEW</div>
  <figcaption class="r8-image__caption">${escapeHtml(String(state.caption || ""))}</figcaption>
</figure>`,
      };

    case "pagination": {
      const active = clamp(asNumber(state.active, 2), 1, asNumber(state.total, 9));
      const total = clamp(asNumber(state.total, 9), 5, 9);
      const size = String(state.size || "md");
      return {
        defaults: getDefaults(id),
        fields: [
          { key: "active", label: localize("Página ativa", "Active page"), max: 9, min: 1, type: "number" },
          { key: "total", label: localize("Total de páginas", "Total pages"), options: [option("5", "5 páginas", "5 pages"), option("9", "9 páginas", "9 pages")], type: "select" },
          { key: "size", label: localize("Tamanho", "Size"), options: [option("md", "Médio", "Medium"), option("sm", "Pequeno", "Small")], type: "select" },
        ],
        surface: "wide",
        toggles: [{ key: "background", label: localize("Fundo", "Background") }],
        render: () => `<div class="${classList("r8-pagination", size === "sm" && "r8-pagination--sm", state.background && "r8-pagination--background")}">
  ${buildPaginationItems(total, active)}
</div>`,
      };
    }

    case "progress": {
      const value = clamp(asNumber(state.value, 32), 0, 100);
      const tone = String(state.tone || "default");
      return {
        defaults: getDefaults(id),
        fields: [
          { key: "value", label: localize("Valor", "Value"), max: 100, min: 0, type: "number" },
          {
            key: "tone",
            label: localize("Tom", "Tone"),
            options: [
              option("default", "Padrão", "Default"),
              option("success", "Sucesso", "Success"),
              option("warning", "Aviso", "Warning"),
              option("danger", "Perigo", "Danger"),
            ],
            type: "select",
          },
        ],
        surface: "default",
        toggles: [{ key: "thin", label: localize("Fino", "Thin") }],
        render: () => `<div class="${classList("r8-progress", tone !== "default" && `r8-progress--${tone}`, state.thin && "r8-progress--thin")}" data-r8-value="${value}">
  <div class="r8-progress__label">
    <span>${escapeHtml(localize("Upload", "Upload"))}</span>
    <span>${value}%</span>
  </div>
  <div class="r8-progress__track">
    <div class="r8-progress__bar"></div>
  </div>
</div>`,
      };
    }

    case "skeleton": {
      const lines = clamp(asNumber(state.lines, 3), 2, 5);
      return {
        defaults: getDefaults(id),
        fields: [{ key: "lines", label: localize("Linhas", "Lines"), max: 5, min: 2, type: "number" }],
        surface: "default",
        toggles: [{ key: "block", label: localize("Bloco grande", "Large block") }],
        render: () => `<div class="r8-skeleton">
  ${state.block ? '<div class="r8-skeleton__block"></div>' : ""}
  ${Array.from({ length: lines }, () => '<div class="r8-skeleton__line"></div>').join("\n  ")}
</div>`,
      };
    }

    case "table": {
      const rows = clamp(asNumber(state.rows, 3), 2, 5);
      return {
        defaults: getDefaults(id),
        fields: [{ key: "rows", label: localize("Linhas", "Rows"), max: 5, min: 2, type: "number" }],
        surface: "table",
        toggles: [{ key: "striped", label: localize("Zebrada", "Striped") }],
        render: () => `<table class="${classList("r8-table", state.striped && "r8-table--striped")}">
  <thead>
    <tr>
      <th>Name</th>
      <th>Status</th>
      <th>Role</th>
    </tr>
  </thead>
  <tbody>
    ${buildTableRows(rows)}
  </tbody>
</table>`,
      };
    }

    case "tag": {
      const tone = String(state.tone || "success");
      return {
        defaults: getDefaults(id),
        fields: [
          { key: "text", label: localize("Texto", "Text"), maxlength: 16, type: "text" },
          {
            key: "tone",
            label: localize("Tom", "Tone"),
            options: [option("default", "Padrão", "Default"), option("success", "Sucesso", "Success"), option("info", "Info", "Info"), option("danger", "Perigo", "Danger")],
            type: "select",
          },
        ],
        surface: "compact",
        toggles: [{ key: "closable", label: localize("Fechável", "Closable") }],
        render: () => `<span class="${classList("r8-tag", tone !== "default" && `r8-tag--${tone}`)}">
  <span>${escapeHtml(String(state.text || ""))}</span>
  ${state.closable ? `<button class="r8-tag__close" type="button" data-r8-dismiss="true" aria-label="${escapeAttribute(localize("Remover tag", "Remove tag"))}">x</button>` : ""}
</span>`,
      };
    }

    case "timeline": {
      const items = clamp(asNumber(state.items, 3), 2, 4);
      return {
        defaults: getDefaults(id),
        fields: [{ key: "items", label: localize("Itens", "Items"), max: 4, min: 2, type: "number" }],
        surface: "default",
        toggles: [],
        render: () => `<div class="r8-timeline">
  ${buildTimelineItems(items)}
</div>`,
      };
    }

    case "breadcrumb":
      return {
        defaults: getDefaults(id),
        fields: [{ key: "current", label: localize("Página atual", "Current page"), maxlength: 20, type: "text" }],
        surface: "wide",
        toggles: [],
        render: () => `<nav class="r8-breadcrumb" aria-label="Breadcrumb">
  <span class="r8-breadcrumb__item">Home</span>
  <span class="r8-breadcrumb__item">Docs</span>
  <span class="r8-breadcrumb__item">${escapeHtml(String(state.current || ""))}</span>
</nav>`,
      };

    case "dropdown": {
      const selected = String(state.selected || "duplicate");
      return {
        defaults: getDefaults(id),
        fields: [
          {
            key: "selected",
            label: localize("Item em destaque", "Highlighted item"),
            options: [option("duplicate", "Duplicate", "Duplicate"), option("archive", "Archive", "Archive"), option("delete", "Delete", "Delete")],
            type: "select",
          },
        ],
        surface: "default",
        toggles: [],
        render: () => `<div class="r8-dropdown">
  <button class="r8-btn r8-btn--sm" type="button">${escapeHtml(localize("Abrir menu", "Open menu"))}</button>
  <div class="r8-dropdown__menu">
    <div class="${classList("r8-dropdown__item", selected === "duplicate" && "is-selected")}">${escapeHtml(getActionLabel("duplicate"))}</div>
    <div class="${classList("r8-dropdown__item", selected === "archive" && "is-selected")}">${escapeHtml(getActionLabel("archive"))}</div>
    <div class="${classList("r8-dropdown__item", selected === "delete" && "is-selected")}">${escapeHtml(getActionLabel("delete"))}</div>
  </div>
</div>`,
      };
    }

    case "menu": {
      const active = String(state.active || "overview");
      return {
        defaults: getDefaults(id),
        fields: [
          {
            key: "active",
            label: localize("Ativo", "Active"),
            options: [option("overview", "Overview", "Overview"), option("tokens", "Tokens", "Tokens"), option("components", "Components", "Components")],
            type: "select",
          },
        ],
        surface: "wide",
        toggles: [{ key: "horizontal", label: localize("Horizontal", "Horizontal") }],
        render: () => `<ul class="${classList("r8-menu", state.horizontal && "r8-menu--horizontal")}">
  <li class="${classList("r8-menu__item", active === "overview" && "is-active")}">Overview</li>
  <li class="${classList("r8-menu__item", active === "tokens" && "is-active")}">Tokens</li>
  <li class="${classList("r8-menu__submenu", active === "components" && "is-open")}">Components</li>
</ul>`,
      };
    }

    case "steps": {
      const active = clamp(asNumber(state.active, 2), 1, 3);
      const renderStep = (index: number, titleText: string, copyText: string) => `<div class="${classList("r8-step", active === index && "is-active")}">
  <span class="r8-step__index">${index}</span>
  <div class="r8-step__body">
    <strong class="r8-step__title">${escapeHtml(titleText)}</strong>
    <span>${escapeHtml(copyText)}</span>
  </div>
</div>`;

      return {
        defaults: getDefaults(id),
        fields: [{ key: "active", label: localize("Etapa ativa", "Active step"), max: 3, min: 1, type: "number" }],
        surface: "wide",
        toggles: [{ key: "vertical", label: localize("Vertical", "Vertical") }],
        render: () => `<div class="${classList("r8-steps", state.vertical && "r8-steps--vertical")}">
  ${renderStep(1, localize("Instalar", "Install"), localize("Importe retro8.css", "Import retro8.css"))}
  ${renderStep(2, localize("Compor", "Compose"), localize("Use classes r8-*", "Use r8-* classes"))}
  ${renderStep(3, localize("Ajustar", "Tune"), localize("Refine estados e variantes", "Refine states and variants"))}
</div>`,
      };
    }

    case "tabs": {
      const active = String(state.active || "stats");
      const renderPanel = (idValue: string, key: string, copyText: string) => `<div id="${idValue}" class="r8-tabs__panel" role="tabpanel"${active === key ? "" : " hidden"}>
  ${escapeHtml(copyText)}
</div>`;

      return {
        defaults: getDefaults(id),
        fields: [
          {
            key: "active",
            label: localize("Aba inicial", "Initial tab"),
            options: [option("stats", "Stats", "Stats"), option("crew", "Crew", "Crew"), option("loot", "Loot", "Loot")],
            type: "select",
          },
        ],
        surface: "wide",
        toggles: [{ key: "vertical", label: localize("Vertical", "Vertical") }],
        render: () => `<div class="${classList("r8-tabs", state.vertical && "r8-tabs--vertical")}">
  <div class="r8-tabs__list" role="tablist" aria-label="Ship data">
    <button class="${classList("r8-tabs__tab", active === "stats" && "r8-tabs__tab--active")}" type="button" role="tab" aria-selected="${active === "stats" ? "true" : "false"}" aria-controls="docs-generic-tabs-stats">Stats</button>
    <button class="${classList("r8-tabs__tab", active === "crew" && "r8-tabs__tab--active")}" type="button" role="tab" aria-selected="${active === "crew" ? "true" : "false"}" aria-controls="docs-generic-tabs-crew">Crew</button>
    <button class="${classList("r8-tabs__tab", active === "loot" && "r8-tabs__tab--active")}" type="button" role="tab" aria-selected="${active === "loot" ? "true" : "false"}" aria-controls="docs-generic-tabs-loot">Loot</button>
  </div>
  ${renderPanel("docs-generic-tabs-stats", "stats", localize("Hull integrity stable. Fuel reserve at 61%.", "Hull integrity stable. Fuel reserve at 61%."))}
  ${renderPanel("docs-generic-tabs-crew", "crew", localize("Captain, engineer and medic online.", "Captain, engineer and medic online."))}
  ${renderPanel("docs-generic-tabs-loot", "loot", localize("3 relíquias e 1 blueprint disponível.", "3 relics and 1 blueprint available."))}
</div>`,
      };
    }

    case "alert": {
      const tone = String(state.tone || "primary");
      const titleText = tone === "danger" ? localize("Sistema offline", "System offline") : localize("Alerta ativo", "Active alert");
      return {
        defaults: getDefaults(id),
        fields: [
          {
            key: "tone",
            label: localize("Tom", "Tone"),
            options: [
              option("primary", "Primário", "Primary"),
              option("success", "Sucesso", "Success"),
              option("warning", "Aviso", "Warning"),
              option("info", "Info", "Info"),
              option("danger", "Perigo", "Danger"),
              option("dark", "Escuro", "Dark"),
            ],
            type: "select",
          },
        ],
        surface: "wide",
        toggles: [{ key: "dismissible", label: localize("Fechável", "Dismissible") }],
        render: () => `<section class="${classList("r8-alert", `r8-alert--${tone}`, state.dismissible && "r8-alert--dismissible")}" role="alert">
  <div class="r8-alert__content">
    <strong class="r8-alert__title">${escapeHtml(titleText)}</strong>
    <p class="r8-text">${escapeHtml(localize("A interface recebeu as novas variantes seguras desse componente.", "The interface received this component's new safe variants."))}</p>
  </div>
  ${state.dismissible ? `<button class="r8-alert__close" type="button" data-r8-dismiss="true" aria-label="${escapeAttribute(localize("Fechar alerta", "Dismiss alert"))}">x</button>` : ""}
</section>`,
      };
    }

    case "dialog": {
      const tone = String(state.tone || "default");
      const targetId = "docs-generic-dialog-preview";
      return {
        defaults: getDefaults(id),
        fields: [
          {
            key: "tone",
            label: localize("Tom", "Tone"),
            options: [option("default", "Padrão", "Default"), option("danger", "Danger", "Danger")],
            type: "select",
          },
        ],
        surface: "overlay",
        toggles: [{ key: "fullscreen", label: localize("Fullscreen", "Fullscreen") }],
        render: () => `<div class="r8-stack">
  <button class="r8-btn r8-btn--primary" type="button" data-r8-toggle="dialog" data-r8-target="#${targetId}">${escapeHtml(localize("Abrir dialog", "Open dialog"))}</button>
  <section id="${targetId}" class="${classList("r8-dialog", tone === "danger" && "r8-dialog--danger", state.fullscreen && "r8-dialog--fullscreen")}" hidden>
    <div class="r8-dialog__titlebar">
      <h3 class="r8-dialog__title">${escapeHtml(localize("Sair da missão?", "Exit mission?"))}</h3>
    </div>
    <div class="r8-dialog__body">${escapeHtml(localize("Use essa moldura modal para confirmações e interrupções de curta duração.", "Use this modal frame for short confirmation and interruption flows."))}</div>
    <div class="r8-dialog__footer">
      <button class="r8-btn" type="button" data-r8-close="#${targetId}">${escapeHtml(localize("Cancelar", "Cancel"))}</button>
      <button class="r8-btn r8-btn--danger" type="button" data-r8-close="#${targetId}">${escapeHtml(localize("Confirmar", "Confirm"))}</button>
    </div>
  </section>
</div>`,
      };
    }

    case "drawer": {
      const placement = String(state.placement || "right");
      const targetId = "docs-generic-drawer-preview";
      return {
        defaults: getDefaults(id),
        fields: [
          {
            key: "placement",
            label: localize("Posição", "Position"),
            options: [option("right", "Direita", "Right"), option("left", "Esquerda", "Left"), option("top", "Topo", "Top"), option("bottom", "Base", "Bottom")],
            type: "select",
          },
        ],
        surface: "overlay",
        toggles: [],
        render: () => `<div class="r8-stack" data-r8-overlay-scope>
  <button class="r8-btn r8-btn--primary" type="button" data-r8-toggle="drawer" data-r8-target="#${targetId}">${escapeHtml(localize("Abrir drawer", "Open drawer"))}</button>
  <aside id="${targetId}" class="${classList("r8-drawer", `r8-drawer--${placement}`)}" hidden>
    <div class="r8-drawer__header">
      <strong class="r8-drawer__title">${escapeHtml(localize("Configurações rápidas", "Quick settings"))}</strong>
      <button class="r8-btn r8-btn--sm" type="button" data-r8-close="#${targetId}">${escapeHtml(localize("Fechar", "Close"))}</button>
    </div>
    <div class="r8-drawer__body">
      <p class="r8-text">${escapeHtml(localize("Ajuste a paleta ativa e a densidade visual.", "Tune the active palette and the visual density."))}</p>
      <label class="r8-checkbox is-checked">
        <span class="r8-checkbox__box" aria-hidden="true"></span>
        <span>${escapeHtml(localize("Mostrar minimapa", "Show minimap"))}</span>
      </label>
      <label class="r8-checkbox">
        <span class="r8-checkbox__box" aria-hidden="true"></span>
        <span>${escapeHtml(localize("Ativar scanlines", "Enable scanlines"))}</span>
      </label>
    </div>
    <div class="r8-drawer__footer">
      <button class="r8-btn r8-btn--sm" type="button" data-r8-close="#${targetId}">${escapeHtml(localize("Cancelar", "Cancel"))}</button>
      <button class="r8-btn r8-btn--sm r8-btn--primary" type="button" data-r8-close="#${targetId}">${escapeHtml(localize("Aplicar", "Apply"))}</button>
    </div>
  </aside>
</div>`,
      };
    }

    case "loading": {
      const size = String(state.size || "md");
      const sizeClass = size === "sm" ? "r8-loading--sm" : size === "lg" ? "r8-loading--lg" : "";
      return {
        defaults: getDefaults(id),
        fields: [
          {
            key: "variant",
            label: localize("Variação", "Variant"),
            options: [option("pixels", "Pixels", "Pixels"), option("dots", "Dots", "Dots"), option("bar", "Bar", "Bar"), option("equalizer", "Equalizer", "Equalizer"), option("spinner", "Spinner", "Spinner")],
            type: "select",
          },
          { key: "label", label: localize("Texto", "Label"), maxlength: 32, type: "text" },
          { key: "size", label: localize("Tamanho", "Size"), options: [option("sm", "Pequeno", "Small"), option("md", "Médio", "Medium"), option("lg", "Grande", "Large")], type: "select" },
        ],
        surface: "default",
        toggles: [],
        render: () => buildLoadingVisual(String(state.variant || "pixels"), sizeClass, String(state.label || "")),
      };
    }

    case "message-box": {
      const targetId = "docs-generic-message-box-preview";
      return {
        defaults: getDefaults(id),
        fields: [{ key: "title", label: localize("Título", "Title"), maxlength: 28, type: "text" }],
        surface: "overlay",
        toggles: [],
        render: () => `<div class="r8-stack">
  <button class="r8-btn r8-btn--secondary" type="button" data-r8-toggle="message-box" data-r8-target="#${targetId}">${escapeHtml(localize("Abrir message box", "Open message box"))}</button>
  <section id="${targetId}" class="r8-message-box" hidden>
    <strong class="r8-message-box__title">${escapeHtml(String(state.title || ""))}</strong>
    <p class="r8-text">${escapeHtml(localize("Esse fluxo funciona bem para confirmações rápidas e prompts curtos.", "This flow works well for quick confirmations and short prompts."))}</p>
    <div class="r8-message-box__footer">
      <button class="r8-btn r8-btn--sm" type="button" data-r8-close="#${targetId}">${escapeHtml(localize("Cancelar", "Cancel"))}</button>
      <button class="r8-btn r8-btn--sm r8-btn--danger" type="button" data-r8-close="#${targetId}">${escapeHtml(localize("Sobrescrever", "Overwrite"))}</button>
    </div>
  </section>
</div>`,
      };
    }

    case "notification": {
      const targetId = "docs-generic-notification-preview";
      return {
        defaults: getDefaults(id),
        fields: [{ key: "title", label: localize("Título", "Title"), maxlength: 32, type: "text" }],
        surface: "overlay",
        toggles: [{ key: "actions", label: localize("Com ações", "With actions") }],
        render: () => `<div class="r8-stack">
  <button class="r8-btn r8-btn--secondary" type="button" data-r8-toggle="notification" data-r8-target="#${targetId}">${escapeHtml(localize("Mostrar notification", "Show notification"))}</button>
  <section id="${targetId}" class="r8-notification" hidden>
    <strong class="r8-notification__title">${escapeHtml(String(state.title || ""))}</strong>
    <p class="r8-text">${escapeHtml(localize("retro8-ui agora cobre playgrounds para um lote maior de componentes.", "retro8-ui now covers playgrounds for a larger batch of components."))}</p>
    ${state.actions ? `<div class="r8-notification__footer">
      <button class="r8-btn r8-btn--sm" type="button" data-r8-close="#${targetId}">${escapeHtml(localize("Dispensar", "Dismiss"))}</button>
      <button class="r8-btn r8-btn--sm r8-btn--primary" type="button">${escapeHtml(localize("Abrir changelog", "Open changelog"))}</button>
    </div>` : ""}
  </section>
</div>`,
      };
    }

    case "popover": {
      const placement = String(state.placement || "bottom-start");
      const targetId = "docs-generic-popover-preview";
      return {
        defaults: getDefaults(id),
        fields: [
          {
            key: "placement",
            label: localize("Posição", "Placement"),
            options: [
              option("top", "Topo", "Top"),
              option("bottom-start", "Base início", "Bottom start"),
              option("bottom-end", "Base fim", "Bottom end"),
              option("left", "Esquerda", "Left"),
              option("right", "Direita", "Right"),
            ],
            type: "select",
          },
          { key: "title", label: localize("Título", "Title"), maxlength: 28, type: "text" },
        ],
        surface: "overlay",
        toggles: [],
        render: () => `<div class="r8-stack">
  <button class="r8-btn r8-btn--secondary" type="button" data-r8-toggle="popover" data-r8-target="#${targetId}" data-r8-placement="${placement}">${escapeHtml(localize("Alternar popover", "Toggle popover"))}</button>
  <section id="${targetId}" class="r8-popover" data-r8-placement="${placement}" hidden>
    <strong class="r8-popover__title">${escapeHtml(String(state.title || ""))}</strong>
    <p class="r8-text">${escapeHtml(localize("Pressione G para abrir o grid overlay.", "Press G to open the grid overlay."))}</p>
  </section>
</div>`,
      };
    }

    case "tooltip": {
      const placement = String(state.placement || "top");
      const targetId = "docs-generic-tooltip-preview";
      return {
        defaults: getDefaults(id),
        fields: [
          {
            key: "placement",
            label: localize("Posição", "Placement"),
            options: [option("top", "Topo", "Top"), option("bottom", "Base", "Bottom"), option("left", "Esquerda", "Left"), option("right", "Direita", "Right")],
            type: "select",
          },
          { key: "label", label: localize("Texto", "Text"), maxlength: 36, type: "text" },
        ],
        surface: "overlay",
        toggles: [],
        render: () => `<div class="r8-stack">
  <button class="r8-btn" type="button" data-r8-toggle="tooltip" data-r8-target="#${targetId}" data-r8-placement="${placement}">${escapeHtml(localize("Hover ou focus", "Hover or focus"))}</button>
  <div id="${targetId}" class="r8-tooltip" data-r8-placement="${placement}" role="tooltip" hidden>
    ${escapeHtml(String(state.label || ""))}
  </div>
</div>`,
      };
    }

    case "divider": {
      const orientation = String(state.orientation || "horizontal");
      const align = String(state.align || "center");
      const dividerClass = classList(
        "r8-divider",
        orientation === "vertical" && "r8-divider--vertical",
        state.dashed && "r8-divider--dashed",
        orientation === "horizontal" && align !== "center" && `r8-divider--label-${align}`,
      );

      return {
        defaults: getDefaults(id),
        fields: [
          { key: "label", label: localize("Rótulo", "Label"), maxlength: 20, type: "text" },
          { key: "orientation", label: localize("Orientação", "Orientation"), options: [option("horizontal", "Horizontal", "Horizontal"), option("vertical", "Vertical", "Vertical")], type: "select" },
          { key: "align", label: localize("Alinhamento", "Alignment"), options: [option("center", "Centro", "Center"), option("start", "Início", "Start"), option("end", "Fim", "End")], type: "select" },
        ],
        surface: "wide",
        toggles: [{ key: "dashed", label: localize("Tracejado", "Dashed") }],
        render: () =>
          orientation === "vertical"
            ? `<div class="r8-row">
  <span>${escapeHtml(localize("Stats", "Stats"))}</span>
  <span class="${dividerClass}" aria-hidden="true"></span>
  <span>${escapeHtml(localize("Inventory", "Inventory"))}</span>
</div>`
            : `<div class="${dividerClass}" role="separator">
  <span class="r8-divider__label">${escapeHtml(String(state.label || ""))}</span>
</div>`,
      };
    }

    case "watermark": {
      const rotate = clamp(asNumber(state.rotate, -18), -90, 90);
      const size = clamp(asNumber(state.size, 16), 10, 28);
      return {
        defaults: getDefaults(id),
        fields: [
          { key: "text", label: localize("Texto", "Text"), maxlength: 24, type: "text" },
          { key: "rotate", label: localize("Rotação", "Rotation"), max: 90, min: -90, type: "number" },
          { key: "size", label: localize("Tamanho", "Size"), max: 28, min: 10, type: "number" },
        ],
        surface: "watermark",
        toggles: [],
        render: () => `<div class="r8-watermark" data-watermark="${escapeAttribute(String(state.text || ""))}" style="--r8-watermark-rotate:${rotate}deg; --r8-watermark-size:${size}px;"></div>`,
      };
    }

    default:
      return {
        defaults: {},
        fields: [],
        surface: "default",
        toggles: [],
        render: () => "",
      };
  }
}

const config = computed(() => buildConfig(props.component.id));
const previewMarkup = computed(() => config.value.render());
const surfaceClass = computed(() => classList("docs-generic-playground__surface", `docs-generic-playground__surface--${config.value.surface}`));

function resetState(defaults: Record<string, any>) {
  Object.keys(state).forEach((key) => delete state[key]);
  Object.assign(state, defaults);
}

function resetPlayground() {
  resetState(getDefaults(props.component.id));
}

function getToggleClass(enabled: boolean) {
  return enabled ? "r8-btn r8-btn--sm r8-btn--secondary" : "r8-btn r8-btn--sm r8-btn--ghost";
}

function initPreviewRuntime() {
  if (!import.meta.client || !previewSurface.value) {
    return;
  }

  const runtime = (window as typeof window & { Retro8UI?: Retro8Runtime }).Retro8UI;
  runtime?.init?.(previewSurface.value);
}

watch(
  () => `${props.component.id}:${props.locale}`,
  async () => {
    resetPlayground();
    await nextTick();
    initPreviewRuntime();
  },
  { immediate: true },
);

watch(
  previewMarkup,
  async () => {
    await nextTick();
    initPreviewRuntime();
  },
);
</script>

<template>
  <section class="r8-panel docs-generic-playground">
    <div class="r8-panel__header">
      <div class="docs-generic-playground__header">
        <div class="docs-generic-playground__intro">
          <h2 class="r8-panel__title">{{ title }}</h2>
          <p class="docs-panel__meta">{{ introCopy }}</p>
        </div>

        <button class="r8-btn r8-btn--sm r8-btn--secondary" type="button" @click="resetPlayground">
          {{ ui.reset }}
        </button>
      </div>
    </div>

    <div class="r8-panel__body docs-generic-playground__body">
      <div class="docs-generic-playground__controls">
        <div v-if="config.fields.length" class="docs-generic-playground__field-grid">
          <label v-for="field in config.fields" :key="field.key" class="r8-field">
            <span class="r8-label">{{ field.label }}</span>

            <input
              v-if="field.type === 'text'"
              v-model="state[field.key]"
              class="r8-input"
              :maxlength="field.maxlength"
            />

            <input
              v-else-if="field.type === 'number'"
              v-model.number="state[field.key]"
              class="r8-input"
              type="number"
              :max="field.max"
              :min="field.min"
              :step="field.step || 1"
            />

            <select v-else v-model="state[field.key]" class="r8-input">
              <option v-for="item in field.options" :key="item.value" :value="item.value">
                {{ item.label }}
              </option>
            </select>
          </label>
        </div>

        <div v-if="config.toggles.length" class="r8-field">
          <span class="r8-label">{{ ui.quickStates }}</span>
          <div class="docs-generic-playground__toggles">
            <button
              v-for="toggle in config.toggles"
              :key="toggle.key"
              :class="getToggleClass(Boolean(state[toggle.key]))"
              type="button"
              :aria-pressed="state[toggle.key] ? 'true' : 'false'"
              @click="state[toggle.key] = !state[toggle.key]"
            >
              {{ toggle.label }}
            </button>
          </div>
        </div>
      </div>

      <div class="docs-demo__stage docs-generic-playground__stage">
        <div class="docs-generic-playground__preview">
          <span class="r8-label">{{ ui.previewLabel }}</span>
          <div ref="previewSurface" :class="surfaceClass" v-html="previewMarkup" />
        </div>

        <p class="docs-demo__stage-copy">
          {{ stageCopy }}
        </p>

        <div class="docs-generic-playground__markup">
          <span class="r8-label">{{ ui.currentMarkup }}</span>
          <pre class="docs-generic-playground__code"><code>{{ previewMarkup }}</code></pre>
        </div>
      </div>
    </div>
  </section>
</template>
