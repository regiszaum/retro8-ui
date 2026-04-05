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

function getSwitchColorToken(value: string) {
  switch (value) {
    case "surface":
      return "var(--r8-color-surface)";
    case "surface3":
      return "var(--r8-color-surface-3)";
    case "primary":
      return "var(--r8-color-primary)";
    case "secondary":
      return "var(--r8-color-secondary)";
    case "tertiary":
      return "var(--r8-color-tertiary)";
    case "success":
      return "var(--r8-color-success)";
    case "warning":
      return "var(--r8-color-warning)";
    case "danger":
      return "var(--r8-color-danger)";
    case "info":
      return "var(--r8-color-info)";
    case "dark":
      return "var(--r8-color-dark)";
    case "light":
      return "var(--r8-color-light)";
    case "surface2":
    default:
      return "var(--r8-color-surface-2)";
  }
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
    "upload",
    "carousel",
    "collapse",
    "dropdown",
    "pagination",
    "tabs",
    "alert",
    "dialog",
    "drawer",
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

function getUploadStatusLabel(value: string) {
  switch (value) {
    case "uploading":
      return localize("Enviando", "Uploading");
    case "success":
      return localize("Pronto", "Ready");
    case "error":
      return localize("Falhou", "Failed");
    default:
      return localize("Na fila", "Queued");
  }
}

function resolveUploadStatus(value: string, index: number) {
  if (value !== "mixed") {
    return value;
  }

  return ["uploading", "success", "error", "queued"][index % 4];
}

function buildUploadFiles(count: number, statusValue: string) {
  const files = [
    ["hero-banner.png", "2.4 MB", "PNG"],
    ["release-bundle.zip", "18 MB", "ZIP"],
    ["pilot-portrait.jpg", "1.1 MB", "JPG"],
    ["voice-lines.wav", "7.8 MB", "WAV"],
  ].slice(0, count);

  return files
    .map(([name, size, thumb], index) => {
      const status = resolveUploadStatus(statusValue, index);
      const progress = status === "uploading" ? "68%" : status === "error" ? "24%" : status === "success" ? "100%" : "0%";
      const primaryAction =
        status === "error"
          ? localize("Repetir", "Retry")
          : status === "uploading"
            ? localize("Pausar", "Pause")
            : localize("Visualizar", "Preview");

      return `<div class="r8-upload__file" data-r8-upload-state="${status}"${status === "uploading" ? ' aria-busy="true"' : ""}${status === "error" ? ' aria-invalid="true"' : ""} style="--r8-upload-progress: ${progress};">
  <div class="r8-upload__thumb">${escapeHtml(thumb)}</div>
  <div class="r8-upload__meta">
    <strong class="r8-upload__name">${escapeHtml(name)}</strong>
    <div class="r8-upload__details">
      <span>${escapeHtml(size)}</span>
      <span>${escapeHtml(getUploadStatusLabel(status))}</span>
    </div>
    ${status === "uploading" || status === "error" ? '<div class="r8-upload__progress"><span></span></div>' : ""}
  </div>
  <div class="r8-upload__actions">
    <button class="r8-upload__action" type="button">${escapeHtml(primaryAction)}</button>
    <button class="r8-upload__action" type="button">${escapeHtml(localize("Remover", "Remove"))}</button>
  </div>
</div>`;
    })
    .join("\n");
}

function buildTableRows(
  count: number,
  options: {
    statusRows?: boolean;
    truncate?: boolean;
  } = {},
) {
  const rows = [
    ["PIX-07", localize("Stable", "Stable"), localize("Engineer", "Engineer"), localize("Orbital dock / maintenance corridor / west sector", "Orbital dock / maintenance corridor / west sector"), "98"],
    ["PIX-11", localize("Queued", "Queued"), localize("Medic", "Medic"), localize("Forward wing / command relay / upper rail", "Forward wing / command relay / upper rail"), "64"],
    ["PIX-21", localize("Review", "Review"), localize("Analyst", "Analyst"), localize("Gamma gate / archive lane / checkpoint 04", "Gamma gate / archive lane / checkpoint 04"), "72"],
    ["PIX-42", localize("Offline", "Offline"), localize("Scout", "Scout"), localize("Dust line / sensor break / lower canyon", "Dust line / sensor break / lower canyon"), "12"],
    ["PIX-55", localize("Synced", "Synced"), localize("Navigator", "Navigator"), localize("Hangar 09 / route board / central path", "Hangar 09 / route board / central path"), "88"],
    ["PIX-77", localize("Muted", "Muted"), localize("Pilot", "Pilot"), localize("North ridge / fallback route / node B", "North ridge / fallback route / node B"), "41"],
  ].slice(0, count);

  return rows
    .map((row, index) => {
      const rowTone =
        options.statusRows
          ? ["r8-table__row--success", "r8-table__row--warning", "", "r8-table__row--danger", "r8-table__row--info", ""][index] || ""
          : "";

      return `<tr class="${rowTone}">
      <td>${escapeHtml(row[0])}</td>
      <td>${escapeHtml(row[1])}</td>
      <td>${escapeHtml(row[2])}</td>
      <td class="${options.truncate ? "r8-table__cell--truncate" : ""}"${options.truncate ? ` title="${escapeAttribute(row[3])}"` : ""}>${escapeHtml(row[3])}</td>
      <td class="r8-table__cell--numeric">${escapeHtml(row[4])}</td>
    </tr>`;
    })
    .join("\n");
}

function buildBreadcrumbTrail(
  current: string,
  levels: number,
  options: {
    compact?: boolean;
    links?: boolean;
    nowrap?: boolean;
    separator?: string;
  } = {},
) {
  const currentLabel = String(current || localize("Breadcrumb", "Breadcrumb"));
  const baseTrail = [
    localize("Home", "Home"),
    localize("Docs", "Docs"),
    localize("Navigation", "Navigation"),
    localize("Components", "Components"),
  ];
  const safeLevels = clamp(levels, 3, 5);
  const items = [...baseTrail.slice(0, safeLevels - 1), currentLabel];

  return `<nav aria-label="Breadcrumb">
  <ol class="${classList("r8-breadcrumb", options.compact && "r8-breadcrumb--compact", options.nowrap && "r8-breadcrumb--nowrap")}" data-r8-separator="${escapeAttribute(String(options.separator || "slash"))}">
    ${items
      .map((item, index) => {
        const isCurrent = index === items.length - 1;

        return `<li class="r8-breadcrumb__item"${isCurrent ? ' aria-current="page"' : ""}>${
          !isCurrent && options.links
            ? `<a class="r8-breadcrumb__link" href="#">${escapeHtml(item)}</a>`
            : escapeHtml(item)
        }</li>`;
      })
      .join("\n    ")}
  </ol>
</nav>`;
}

function buildPaginationItems(total: number, active: number, pagerCount: number) {
  const safeTotal = clamp(total, 1, 99);
  const safeActive = clamp(active, 1, safeTotal);
  const normalizedCount = Math.max(5, Math.min(11, pagerCount % 2 === 0 ? pagerCount - 1 : pagerCount));

  const buildModel = () => {
    if (safeTotal <= normalizedCount) {
      return Array.from({ length: safeTotal }, (_, index) => index + 1);
    }

    const innerCount = Math.max(1, normalizedCount - 2);
    let start = Math.max(2, safeActive - Math.floor(innerCount / 2));
    let end = start + innerCount - 1;

    if (end > safeTotal - 1) {
      end = safeTotal - 1;
      start = Math.max(2, end - innerCount + 1);
    }

    const model: Array<number | "more"> = [1];
    if (start > 2) {
      model.push("more");
    }

    for (let page = start; page <= end; page += 1) {
      model.push(page);
    }

    if (end < safeTotal - 1) {
      model.push("more");
    }

    model.push(safeTotal);
    return model;
  };

  return buildModel()
    .map((entry) => {
      if (entry === "more") {
        return '<span class="r8-pagination__more" aria-hidden="true">...</span>';
      }

      return `<button class="${classList("r8-pagination__item", entry === safeActive && "is-active")}" type="button" data-r8-page="${entry}" aria-current="${entry === safeActive ? "true" : "false"}">${entry}</button>`;
    })
    .join("\n");
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

function buildSkeletonLines(lines: number) {
  const widths = ["", "", "r8-skeleton__line--medium", "r8-skeleton__line--short", "r8-skeleton__line--medium"];

  return Array.from({ length: lines }, (_, index) => {
    const widthClass = widths[index] || "r8-skeleton__line--short";
    return `<div class="${classList("r8-skeleton__line", widthClass)}"></div>`;
  }).join("\n  ");
}

function buildSkeletonTemplate(template: string, lines: number, animated: boolean, count: number) {
  const animatedAttr = animated ? "" : ' data-r8-animated="false"';
  const safeCount = clamp(count, 1, 4);

  const buildOne = () => {
    switch (template) {
      case "profile":
        return `<div class="r8-skeleton r8-skeleton--card"${animatedAttr}>
  <div class="r8-skeleton__header">
    <div class="r8-skeleton__avatar"></div>
    <div class="r8-skeleton__text">
      <div class="r8-skeleton__title"></div>
      ${buildSkeletonLines(Math.max(2, lines))}
    </div>
  </div>
  <div class="r8-skeleton__footer">
    <div class="r8-skeleton__line r8-skeleton__line--medium"></div>
    <div class="r8-skeleton__button"></div>
  </div>
</div>`;
      case "card":
        return `<div class="r8-skeleton r8-skeleton--card"${animatedAttr}>
  <div class="r8-skeleton__media"></div>
  <div class="r8-skeleton__title"></div>
  ${buildSkeletonLines(lines)}
  <div class="r8-skeleton__footer">
    <div class="r8-skeleton__line r8-skeleton__line--short"></div>
    <div class="r8-skeleton__button"></div>
  </div>
</div>`;
      case "list":
        return `<div class="r8-skeleton"${animatedAttr}>
  <div class="r8-skeleton__header">
    <div class="r8-skeleton__avatar"></div>
    <div class="r8-skeleton__text">
      <div class="r8-skeleton__title"></div>
      <div class="r8-skeleton__line"></div>
      <div class="r8-skeleton__line r8-skeleton__line--short"></div>
    </div>
  </div>
</div>`;
      default:
        return `<div class="r8-skeleton"${animatedAttr}>
  <div class="r8-skeleton__title"></div>
  ${buildSkeletonLines(lines)}
</div>`;
    }
  };

  const items = Array.from({ length: safeCount }, () => buildOne()).join("\n");
  return safeCount === 1 ? items : `<div class="docs-demo__stack">${items}</div>`;
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
      return { checked: true, disabled: false, size: "md", enabledTone: "success", disabledTone: "surface2" };
    case "theme-switch":
      return { checked: true, disabled: false, size: "md" };
    case "transfer":
      return { selectedSource: "scanner" };
    case "upload":
      return { disabled: false, dragActive: false, files: 2, layout: "default", multiple: true, status: "mixed", tip: true };
    case "avatar":
      return { fallback: "PX", mode: "text", round: false, size: "md", fit: "cover" };
    case "badge":
      return { dot: false, text: "new", tone: "primary" };
    case "card":
      return { shadow: "default", title: localize("Resumo da missão", "Mission summary") };
    case "carousel":
      return { active: "1", arrows: "always", autoplay: false, captions: true, fit: "cover", interval: 3200 };
    case "collapse":
      return { accordion: false, disabledItem: false, icon: ">", iconPosition: "right", meta: true, open: "display" };
    case "empty":
      return {
        action: true,
        align: "center",
        description: localize("Tente outro filtro ou crie um novo registro.", "Try another filter or create a new record."),
        mediaSize: 128,
        title: localize("Nada por aqui", "Nothing here yet"),
        visual: "icon",
      };
    case "image":
      return {
        caption: localize("Prévia da rota da floresta", "Forest route preview"),
        fit: "cover",
        loading: "lazy",
        ratio: "wide",
        status: "ready",
      };
    case "pagination":
      return { active: 2, background: false, hideSingle: false, jumper: false, pagerCount: 7, size: "md", summary: true, total: 9 };
    case "progress":
      return {
        customColor: false,
        indeterminate: false,
        inside: false,
        label: localize("Upload", "Upload"),
        shape: "line",
        size: "md",
        thin: false,
        tone: "default",
        value: 32,
      };
    case "skeleton":
      return { animated: true, count: 1, lines: 3, template: "card" };
    case "table":
      return { compact: false, fixedHead: false, hover: true, rows: 4, statusRows: true, striped: true, truncate: true };
    case "tag":
      return { closable: false, text: "synced", tone: "success" };
    case "breadcrumb":
      return { compact: false, current: "Breadcrumb", links: true, levels: 4, nowrap: false, separator: "chevron" };
    case "dropdown":
      return { danger: true, divided: true, end: false, keepOpen: false, selected: "archive", split: false };
    case "steps":
      return { active: 2, vertical: false };
    case "tabs":
      return { active: "stats", vertical: false };
    case "alert":
      return {
        actions: false,
        center: false,
        closeText: "x",
        description: true,
        dismissible: false,
        effect: "surface",
        showIcon: true,
        tone: "primary",
      };
    case "dialog":
      return { fullscreen: false, tone: "default" };
    case "drawer":
      return {
        closeButton: true,
        closeOnBackdrop: true,
        closeOnEscape: true,
        content: "settings",
        footer: true,
        header: true,
        lockScroll: true,
        modal: true,
        placement: "right",
        size: "md",
      };
    case "loading":
      return { label: localize("Carregando assets...", "Loading assets..."), size: "md", variant: "pixels" };
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
      const enabledTone = String(state.enabledTone || "success");
      const disabledTone = String(state.disabledTone || "surface2");
      const switchStyle = escapeAttribute(
        `--r8-switch-enabled-bg: ${getSwitchColorToken(enabledTone)}; --r8-switch-disabled-bg: ${getSwitchColorToken(disabledTone)};`,
      );
      return {
        defaults: getDefaults(id),
        fields: [
          { key: "size", label: localize("Tamanho", "Size"), options: [option("sm", "Pequeno", "Small"), option("md", "Médio", "Medium"), option("lg", "Grande", "Large")], type: "select" },
          {
            key: "enabledTone",
            label: localize("Cor ligada", "On color"),
            options: [
              option("success", "Sucesso", "Success"),
              option("primary", "Primário", "Primary"),
              option("secondary", "Secundário", "Secondary"),
              option("tertiary", "Terciário", "Tertiary"),
              option("warning", "Aviso", "Warning"),
              option("danger", "Perigo", "Danger"),
              option("info", "Info", "Info"),
              option("dark", "Escuro", "Dark"),
              option("light", "Claro", "Light"),
            ],
            type: "select",
          },
          {
            key: "disabledTone",
            label: localize("Cor desligada", "Off color"),
            options: [
              option("surface2", "Superfície 2", "Surface 2"),
              option("surface", "Superfície", "Surface"),
              option("surface3", "Superfície 3", "Surface 3"),
              option("light", "Claro", "Light"),
              option("dark", "Escuro", "Dark"),
              option("primary", "Primário", "Primary"),
              option("secondary", "Secundário", "Secondary"),
              option("tertiary", "Terciário", "Tertiary"),
              option("warning", "Aviso", "Warning"),
              option("danger", "Perigo", "Danger"),
              option("info", "Info", "Info"),
            ],
            type: "select",
          },
        ],
        surface: "compact",
        toggles: [
          { key: "checked", label: localize("Ligado", "Checked") },
          { key: "disabled", label: localize("Desabilitado", "Disabled") },
        ],
        render: () => `<label class="${classList("r8-switch", size !== "md" && `r8-switch--${size}`, state.checked && "is-checked", state.disabled && "is-disabled")}" style="${switchStyle}"${state.disabled ? ' aria-disabled="true"' : ""}>
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
      const layout = String(state.layout || "default");
      const files = clamp(asNumber(state.files, 2), 0, layout === "avatar" ? 1 : 4);
      const status = String(state.status || "mixed");
      const chooseLabel =
        layout === "avatar"
          ? localize("Escolher avatar", "Choose avatar")
          : state.multiple
            ? localize("Escolher arquivos", "Choose files")
            : localize("Escolher arquivo", "Choose file");
      const dropLabel =
        layout === "avatar"
          ? files > 0
            ? localize("Trocar avatar", "Replace avatar")
            : localize("Enviar avatar", "Upload avatar")
          : state.multiple
            ? localize("Arraste arquivos aqui", "Drop files here")
            : localize("Arraste um arquivo aqui", "Drop a file here");
      const hintLabel =
        layout === "avatar"
          ? localize("PNG ou JPG quadrado até 2 MB.", "Square PNG or JPG up to 2 MB.")
          : localize("PNG, JPG ou ZIP até 8 MB. O app host valida e envia os arquivos.", "PNG, JPG, or ZIP up to 8 MB. The host app validates and sends files.");
      const classes = classList("r8-upload", layout === "picture" && "r8-upload--picture", layout === "avatar" && "r8-upload--avatar");

      return {
        defaults: getDefaults(id),
        fields: [
          { key: "files", label: localize("Arquivos listados", "Listed files"), max: 4, min: 0, type: "number" },
          {
            key: "layout",
            label: localize("Layout", "Layout"),
            options: [
              option("default", "Lista", "List"),
              option("picture", "Thumbs", "Thumbnails"),
              option("avatar", "Avatar", "Avatar"),
            ],
            type: "select",
          },
          {
            key: "status",
            label: localize("Estado", "State"),
            options: [
              option("mixed", "Misturado", "Mixed"),
              option("queued", "Na fila", "Queued"),
              option("uploading", "Enviando", "Uploading"),
              option("success", "Pronto", "Ready"),
              option("error", "Falhou", "Failed"),
            ],
            type: "select",
          },
        ],
        surface: "wide",
        toggles: [
          { key: "multiple", label: localize("Múltiplos", "Multiple") },
          { key: "dragActive", label: localize("Drag ativo", "Active drag") },
          { key: "disabled", label: localize("Desabilitado", "Disabled") },
          { key: "tip", label: localize("Mostrar dica", "Show hint") },
        ],
        render: () =>
          layout === "avatar"
            ? `<div class="${classes}" accept=".png,.jpg,.jpeg"${state.disabled ? ' aria-disabled="true"' : ""}${state.dragActive ? ' data-r8-drag-active="true"' : ""} data-r8-upload-preview-label="${escapeAttribute(localize("Visualizar", "Preview"))}" data-r8-upload-remove-label="${escapeAttribute(localize("Remover", "Remove"))}" data-r8-upload-selected-label="${escapeAttribute(localize("Selecionado", "Selected"))}" data-r8-upload-empty-label="${escapeAttribute(localize("Nenhum arquivo ainda", "No file yet"))}">
  <div class="r8-upload__toolbar">
    <div class="r8-upload__copy">
      <strong class="r8-upload__title">${escapeHtml(localize("Avatar da missão", "Mission avatar"))}</strong>
      ${state.tip ? `<span class="r8-upload__tip">${escapeHtml(hintLabel)}</span>` : ""}
    </div>
  </div>
  <input class="r8-upload__input" type="file" accept=".png,.jpg,.jpeg" />
  <div class="r8-upload__dropzone" role="button" tabindex="0"${state.disabled ? ' aria-disabled="true"' : ""}>
    <div class="r8-upload__thumb">${escapeHtml(files > 0 ? "PX" : "+")}</div>
    <strong>${escapeHtml(dropLabel)}</strong>
    <div class="r8-upload__details">
      <span>${escapeHtml(files > 0 ? "avatar-ready.png" : localize("Nenhum arquivo ainda", "No file yet"))}</span>
      <span>${escapeHtml(files > 0 ? getUploadStatusLabel(resolveUploadStatus(status, 0)) : localize("Aguardando", "Waiting"))}</span>
    </div>
  </div>
</div>`
            : `<div class="${classes}" accept=".png,.jpg,.jpeg,.zip"${state.multiple ? " multiple" : ""}${state.disabled ? ' aria-disabled="true"' : ""}${state.dragActive ? ' data-r8-drag-active="true"' : ""} data-r8-upload-preview-label="${escapeAttribute(localize("Visualizar", "Preview"))}" data-r8-upload-remove-label="${escapeAttribute(localize("Remover", "Remove"))}" data-r8-upload-selected-label="${escapeAttribute(localize("Selecionado", "Selected"))}" data-r8-upload-empty-label="${escapeAttribute(localize("Nenhum arquivo ainda", "No file yet"))}">
  <div class="r8-upload__toolbar">
    <div class="r8-upload__copy">
      <strong class="r8-upload__title">${escapeHtml(localize("Assets da missão", "Mission assets"))}</strong>
      ${state.tip ? `<span class="r8-upload__tip">${escapeHtml(hintLabel)}</span>` : ""}
    </div>
    <input class="r8-upload__input" type="file" accept=".png,.jpg,.jpeg,.zip"${state.multiple ? " multiple" : ""} />
    <button class="r8-btn r8-btn--sm r8-btn--primary" data-r8-upload-trigger="button" type="button"${state.disabled ? ' aria-disabled="true"' : ""}>${escapeHtml(chooseLabel)}</button>
  </div>
  <div class="r8-upload__dropzone" role="button" tabindex="0"${state.disabled ? ' aria-disabled="true"' : ""}>
    <strong>${escapeHtml(dropLabel)}</strong>
    <span class="r8-text r8-text--xs r8-text--muted">${escapeHtml(localize("Ou cole, navegue e reorganize a fila no host app.", "Or paste, browse, and reorder the queue in the host app."))}</span>
  </div>
  ${files > 0 ? `<div class="r8-upload__list">
    ${buildUploadFiles(files, status)}
  </div>` : ""}
</div>`,
      };
    }

    case "avatar": {
      const size = String(state.size || "md");
      const mode = String(state.mode || "text");
      const fit = String(state.fit || "cover");
      const fallback = String(state.fallback || "PX");
      const src = mode === "image1" ? "/imgs/p1.png" : mode === "image2" ? "/imgs/p2.png" : mode === "broken" ? "/missing-avatar.png" : "";
      return {
        defaults: getDefaults(id),
        fields: [
          { key: "fallback", label: localize("Fallback", "Fallback"), maxlength: 2, type: "text" },
          {
            key: "mode",
            label: localize("Conteúdo", "Content"),
            options: [
              option("text", "Texto", "Text"),
              option("image1", "Imagem 1", "Image 1"),
              option("image2", "Imagem 2", "Image 2"),
              option("broken", "Imagem quebrada", "Broken image"),
            ],
            type: "select",
          },
          { key: "size", label: localize("Tamanho", "Size"), options: [option("sm", "Pequeno", "Small"), option("md", "Médio", "Medium"), option("lg", "Grande", "Large")], type: "select" },
          {
            key: "fit",
            label: localize("Fit", "Fit"),
            options: [
              option("cover", "Cover", "Cover"),
              option("contain", "Contain", "Contain"),
              option("fill", "Fill", "Fill"),
              option("scale-down", "Scale down", "Scale down"),
            ],
            type: "select",
          },
        ],
        surface: "compact",
        toggles: [{ key: "round", label: localize("Redondo", "Round") }],
        render: () =>
          mode === "text"
            ? `<span class="${classList("r8-avatar", size === "sm" && "r8-avatar--sm", size === "lg" && "r8-avatar--lg", state.round && "r8-avatar--round")}" data-r8-avatar-fallback="${escapeAttribute(fallback)}">${escapeHtml(fallback)}</span>`
            : `<span class="${classList("r8-avatar", size === "sm" && "r8-avatar--sm", size === "lg" && "r8-avatar--lg", state.round && "r8-avatar--round")}" data-r8-avatar-fallback="${escapeAttribute(fallback)}" data-r8-fit="${escapeAttribute(fit)}">
  <img src="${escapeAttribute(src)}" alt="${escapeAttribute(localize("Avatar de exemplo", "Sample avatar"))}" />
</span>`,
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
      const arrowMode = String(state.arrows || "always");
      const fit = String(state.fit || "cover");
      const interval = clamp(asNumber(state.interval, 3200), 1200, 12000);
      const slides = [
        {
          alt: localize("Banner do centro de comando", "Command center banner"),
          body: localize("Hero visual para destaques, covers e lancamentos em destaque.", "Hero visual for highlights, covers, and featured releases."),
          src: "/imgs/carousel1.png",
          title: localize("Mission control", "Mission control"),
        },
        {
          alt: localize("Mostruario pixelado da interface", "Pixel interface showcase"),
          body: localize("Slides de imagem continuam aceitando copy curta e contexto adicional.", "Image slides still support short copy and extra context."),
          src: "/imgs/carousel2.png",
          title: localize("Pixel showcase", "Pixel showcase"),
        },
        {
          alt: localize("Banner de destaque do produto", "Product highlight banner"),
          body: localize("Setas laterais e dots deixam a navegacao direta e leve.", "Side arrows and dots keep navigation direct and lightweight."),
          src: "/imgs/carousel3.png",
          title: localize("Product highlight", "Product highlight"),
        },
      ];

      return {
        defaults: getDefaults(id),
        fields: [
          { key: "active", label: localize("Slide inicial", "Initial slide"), options: [option("1", "Slide 1", "Slide 1"), option("2", "Slide 2", "Slide 2"), option("3", "Slide 3", "Slide 3")], type: "select" },
          {
            key: "arrows",
            label: localize("Setas", "Arrows"),
            options: [
              option("always", "Sempre", "Always"),
              option("hover", "No hover", "On hover"),
              option("none", "Sem setas", "No arrows"),
            ],
            type: "select",
          },
          {
            key: "fit",
            label: localize("Encaixe da imagem", "Image fit"),
            options: [
              option("cover", "Cover", "Cover"),
              option("contain", "Contain", "Contain"),
              option("fill", "Fill", "Fill"),
              option("scale-down", "Scale down", "Scale down"),
            ],
            type: "select",
          },
          { key: "interval", label: localize("Intervalo (ms)", "Interval (ms)"), max: 12000, min: 1200, type: "number" },
        ],
        surface: "wide",
        toggles: [
          { key: "autoplay", label: localize("Autoplay", "Autoplay") },
          { key: "captions", label: localize("Legendas", "Captions") },
        ],
        render: () => `<div class="r8-carousel" data-r8-arrows="${escapeHtml(arrowMode)}"${state.autoplay ? ` data-r8-autoplay="true" data-r8-interval="${interval}"` : ""} style="--r8-carousel-media-fit: ${escapeHtml(fit)};">
  <div class="r8-carousel__viewport">
    <button class="r8-carousel__arrow r8-carousel__arrow--prev" data-r8-direction="prev" type="button" aria-label="${escapeHtml(localize("Slide anterior", "Previous slide"))}">&lt;</button>
    <button class="r8-carousel__arrow r8-carousel__arrow--next" data-r8-direction="next" type="button" aria-label="${escapeHtml(localize("Próximo slide", "Next slide"))}">&gt;</button>
    <div class="r8-carousel__track">
      ${slides
        .map(
          (slide, index) => `<article class="r8-carousel__slide"${active === index + 1 ? "" : " hidden"}>
        <figure class="r8-carousel__media">
          <img src="${slide.src}" alt="${escapeHtml(slide.alt)}" />
        </figure>
        ${
          state.captions
            ? `<div class="r8-carousel__caption">
          <strong>${escapeHtml(slide.title)}</strong>
          <span class="r8-text r8-text--sm r8-text--muted">${escapeHtml(slide.body)}</span>
        </div>`
            : ""
        }
      </article>`,
        )
        .join("\n      ")}
    </div>
  </div>
  <div class="r8-carousel__dots">
    <button class="${classList("r8-carousel__dot", active === 1 && "is-active")}" type="button" aria-label="${escapeHtml(localize("Ir para o slide 1", "Go to slide 1"))}"></button>
    <button class="${classList("r8-carousel__dot", active === 2 && "is-active")}" type="button" aria-label="${escapeHtml(localize("Ir para o slide 2", "Go to slide 2"))}"></button>
    <button class="${classList("r8-carousel__dot", active === 3 && "is-active")}" type="button" aria-label="${escapeHtml(localize("Ir para o slide 3", "Go to slide 3"))}"></button>
  </div>
</div>`,
      };
    }

    case "collapse": {
      const open = String(state.open || "display");
      const icon = String(state.icon || ">").slice(0, 2) || ">";
      const iconPosition = String(state.iconPosition || "right");
      const renderItem = (key: string, titleText: string, metaText: string, bodyText: string, disabled = false) => {
        const isOpen = open === key;
        return `<section class="${classList("r8-collapse__item", isOpen && "is-open", disabled && "is-disabled")}"${disabled ? ' data-r8-disabled="true" aria-disabled="true"' : ""}>
  <button class="r8-collapse__header" type="button" aria-expanded="${isOpen ? "true" : "false"}"${disabled ? ' aria-disabled="true"' : ""}>
    <span class="r8-collapse__copy">
      <span class="r8-collapse__title">${escapeHtml(titleText)}</span>
      ${
        state.meta
          ? `<span class="r8-collapse__meta">${escapeHtml(metaText)}</span>`
          : ""
      }
    </span>
    <span class="r8-collapse__icon" aria-hidden="true">${escapeHtml(icon)}</span>
  </button>
  <div class="r8-collapse__body"${isOpen ? "" : " hidden"}>${escapeHtml(bodyText)}</div>
</section>`;
      };

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
          {
            key: "iconPosition",
            label: localize("Posição do ícone", "Icon position"),
            options: [
              option("right", "Direita", "Right"),
              option("left", "Esquerda", "Left"),
            ],
            type: "select",
          },
          { key: "icon", label: localize("Ícone", "Icon"), maxlength: 2, type: "text" },
        ],
        surface: "wide",
        toggles: [
          { key: "accordion", label: localize("Accordion", "Accordion") },
          { key: "meta", label: localize("Meta no header", "Header meta") },
          { key: "disabledItem", label: localize("3º item desabilitado", "3rd item disabled") },
        ],
        render: () => `<div class="r8-collapse"${state.accordion ? ' data-r8-accordion="true"' : ""} data-r8-icon-position="${escapeHtml(iconPosition)}">
  ${renderItem(
    "display",
    localize("Display settings", "Display settings"),
    localize("Palette, scanlines and contrast", "Palette, scanlines, and contrast"),
    localize("Scanlines, palette and contrast controls.", "Scanlines, palette and contrast controls."),
  )}
  ${renderItem(
    "accessibility",
    localize("Accessibility settings", "Accessibility settings"),
    localize("Readable copy and motion fallback", "Readable copy and motion fallback"),
    localize("Focus rings, motion fallback and contrast presets.", "Focus rings, motion fallback and contrast presets."),
  )}
  ${renderItem(
    "audio",
    localize("Audio settings", "Audio settings"),
    localize("Mixer and alert routing", "Mixer and alert routing"),
    localize("Equalizer, alert volume and output channel.", "Equalizer, alert volume and output channel."),
    Boolean(state.disabledItem),
  )}
</div>`,
      };
    }

    case "empty":
      return {
        defaults: getDefaults(id),
        fields: [
          { key: "title", label: localize("Título", "Title"), maxlength: 24, type: "text" },
          { key: "description", label: localize("Descrição", "Description"), maxlength: 56, type: "text" },
          {
            key: "visual",
            label: localize("Visual", "Visual"),
            options: [
              option("icon", "Ícone", "Icon"),
              option("image", "Imagem", "Image"),
            ],
            type: "select",
          },
          {
            key: "align",
            label: localize("Alinhamento", "Alignment"),
            options: [
              option("center", "Centro", "Center"),
              option("left", "Esquerda", "Left"),
            ],
            type: "select",
          },
          { key: "mediaSize", label: localize("Tamanho da mídia", "Media size"), max: 180, min: 72, type: "number" },
        ],
        surface: "default",
        toggles: [{ key: "action", label: localize("Com ação", "With action") }],
        render: () => `<div class="r8-empty" data-r8-align="${escapeHtml(String(state.align || "center"))}" style="--r8-empty-media-size: ${clamp(asNumber(state.mediaSize, 128), 72, 180)}px;">
  ${
    state.visual === "image"
      ? `<div class="r8-empty__media">
    <img src="/imgs/carousel2.png" alt="" />
  </div>`
      : `<div class="r8-empty__icon">NO-DATA</div>`
  }
  <div class="r8-empty__copy">
    <div class="r8-empty__title">${escapeHtml(String(state.title || ""))}</div>
    <p class="r8-empty__description">${escapeHtml(String(state.description || ""))}</p>
  </div>
  ${state.action ? `<div class="r8-empty__actions"><button class="r8-btn r8-btn--sm r8-btn--primary" type="button">${escapeHtml(localize("Criar item", "Create item"))}</button></div>` : ""}
</div>`,
      };

    case "image":
      return {
        defaults: getDefaults(id),
        fields: [
          { key: "caption", label: localize("Legenda", "Caption"), maxlength: 28, type: "text" },
          {
            key: "status",
            label: localize("Estado", "State"),
            options: [
              option("ready", "Carregada", "Loaded"),
              option("broken", "Com erro", "Broken"),
            ],
            type: "select",
          },
          {
            key: "fit",
            label: localize("Encaixe", "Fit"),
            options: [
              option("cover", "Cover", "Cover"),
              option("contain", "Contain", "Contain"),
              option("fill", "Fill", "Fill"),
              option("scale-down", "Scale down", "Scale down"),
            ],
            type: "select",
          },
          {
            key: "ratio",
            label: localize("Proporção", "Ratio"),
            options: [
              option("wide", "Wide", "Wide"),
              option("landscape", "Landscape", "Landscape"),
              option("square", "Square", "Square"),
              option("portrait", "Portrait", "Portrait"),
            ],
            type: "select",
          },
          {
            key: "loading",
            label: localize("Loading", "Loading"),
            options: [
              option("lazy", "Lazy", "Lazy"),
              option("eager", "Eager", "Eager"),
            ],
            type: "select",
          },
        ],
        surface: "default",
        toggles: [],
        render: () => `<figure class="r8-image" data-r8-fit="${escapeHtml(String(state.fit || "cover"))}" data-r8-ratio="${escapeHtml(String(state.ratio || "wide"))}">
  <div class="r8-image__frame">
    <img src="${state.status === "broken" ? "/missing-image.png" : "/imgs/carousel1.png"}" alt="${escapeHtml(localize("Prévia da rota da floresta", "Forest route preview"))}" loading="${escapeHtml(String(state.loading || "lazy"))}" />
    <div class="r8-image__placeholder">LOADING...</div>
    <div class="r8-image__error">FILE LOST</div>
  </div>
  <figcaption class="r8-image__caption">${escapeHtml(String(state.caption || ""))}</figcaption>
</figure>`,
      };

    case "pagination": {
      const total = clamp(asNumber(state.total, 9), 1, 30);
      const active = clamp(asNumber(state.active, 2), 1, total);
      const pagerCount = clamp(asNumber(state.pagerCount, 7), 5, 11);
      const size = String(state.size || "md");
      return {
        defaults: getDefaults(id),
        fields: [
          { key: "active", label: localize("Página ativa", "Active page"), max: 30, min: 1, type: "number" },
          { key: "total", label: localize("Total de páginas", "Total pages"), max: 30, min: 1, type: "number" },
          { key: "pagerCount", label: localize("Pagers visíveis", "Visible pagers"), max: 11, min: 5, step: 2, type: "number" },
          { key: "size", label: localize("Tamanho", "Size"), options: [option("md", "Médio", "Medium"), option("sm", "Pequeno", "Small")], type: "select" },
        ],
        surface: "wide",
        toggles: [
          { key: "background", label: localize("Fundo", "Background") },
          { key: "summary", label: localize("Resumo total", "Total summary") },
          { key: "jumper", label: localize("Jumper", "Jumper") },
          { key: "hideSingle", label: localize("Ocultar com 1 página", "Hide on single page") },
        ],
        render: () => `<div class="${classList("r8-pagination", size === "sm" && "r8-pagination--sm", state.background && "r8-pagination--background")}" data-r8-total-pages="${total}" data-r8-current-page="${active}" data-r8-pager-count="${pagerCount}"${state.hideSingle ? ' data-r8-hide-on-single-page="true"' : ""}>
  ${state.summary ? `<span class="r8-pagination__summary">Total ${total}</span>` : ""}
  <button class="r8-pagination__nav" type="button" data-r8-page-action="prev" aria-label="${escapeHtml(localize("Página anterior", "Previous page"))}">&lt;</button>
  <div class="r8-pagination__pages">
    ${buildPaginationItems(total, active, pagerCount)}
  </div>
  <button class="r8-pagination__nav" type="button" data-r8-page-action="next" aria-label="${escapeHtml(localize("Próxima página", "Next page"))}">&gt;</button>
  ${
    state.jumper
      ? `<label class="r8-pagination__jumper">
    <span>${escapeHtml(localize("Ir para", "Go to"))}</span>
    <input class="r8-pagination__jump-input r8-input" type="number" min="1" max="${total}" value="${active}" data-r8-page-jump-input />
    <button class="r8-btn r8-btn--sm" type="button" data-r8-page-action="jump">${escapeHtml(localize("OK", "OK"))}</button>
  </label>`
      : ""
  }
</div>`,
      };
    }

    case "progress": {
      const value = clamp(asNumber(state.value, 32), 0, 100);
      const tone = String(state.tone || "default");
      const shape = String(state.shape || "line");
      const size = String(state.size || "md");
      const label = String(state.label || localize("Upload", "Upload"));
      const isCircle = shape === "circle";
      const hasInsideLabel = Boolean(state.inside) && !Boolean(state.thin) && !isCircle;
      const sizeStyle =
        shape === "circle"
          ? size === "sm"
            ? "--r8-progress-dial-size: 5rem;"
            : size === "lg"
              ? "--r8-progress-dial-size: 8rem;"
              : "--r8-progress-dial-size: 6.5rem;"
          : size === "sm"
            ? "--r8-progress-height: 0.9rem;"
            : size === "lg"
              ? "--r8-progress-height: 1.85rem;"
              : "--r8-progress-height: 1.5rem;";
      const customColorStyle = state.customColor ? " --r8-progress-bar-color: #7c3aed;" : "";
      return {
        defaults: getDefaults(id),
        fields: [
          { key: "label", label: localize("Rótulo", "Label"), maxlength: 18, type: "text" },
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
          {
            key: "shape",
            label: localize("Forma", "Shape"),
            options: [option("line", "Linha", "Line"), option("circle", "Circular", "Circle")],
            type: "select",
          },
          {
            key: "size",
            label: localize("Tamanho", "Size"),
            options: [option("sm", "Pequeno", "Small"), option("md", "Médio", "Medium"), option("lg", "Grande", "Large")],
            type: "select",
          },
        ],
        surface: isCircle ? "compact" : "wide",
        toggles: [
          { key: "thin", label: localize("Fino", "Thin") },
          { key: "inside", label: localize("Label interna", "Inside label") },
          { key: "indeterminate", label: localize("Indeterminado", "Indeterminate") },
          { key: "customColor", label: localize("Cor local", "Local color") },
        ],
        render: () =>
          isCircle
            ? `<div class="r8-progress" data-r8-value="${value}" data-r8-shape="circle"${tone !== "default" ? ` data-r8-variant="${tone}"` : ""} style="${sizeStyle}${customColorStyle}">
  <div class="r8-progress__dial">
    <div class="r8-progress__content">
      <strong class="r8-progress__value" data-r8-progress-value-output>${value}%</strong>
      <span class="r8-progress__meta">${escapeHtml(localize("complete", "complete"))}</span>
    </div>
  </div>
  <div class="r8-progress__label">
    <span>${escapeHtml(label)}</span>
  </div>
</div>`
            : `<div class="${classList("r8-progress", state.thin && "r8-progress--thin")}" data-r8-value="${value}"${tone !== "default" ? ` data-r8-variant="${tone}"` : ""}${hasInsideLabel ? ' data-r8-label-position="inside"' : ""}${state.indeterminate ? ' data-r8-indeterminate="true"' : ""} style="${sizeStyle}${customColorStyle}">
  <div class="r8-progress__label">
    <span>${escapeHtml(label)}</span>
    <span class="r8-progress__value" data-r8-progress-value-output>${value}%</span>
  </div>
  <div class="r8-progress__track">
    <div class="r8-progress__bar"></div>
    ${hasInsideLabel ? `<span class="r8-progress__inside-value" data-r8-progress-value-output>${value}%</span>` : ""}
  </div>
</div>`,
      };
    }

    case "skeleton": {
      const lines = clamp(asNumber(state.lines, 3), 2, 5);
      const template = String(state.template || "card");
      const count = clamp(asNumber(state.count, 1), 1, 4);
      return {
        defaults: getDefaults(id),
        fields: [
          {
            key: "template",
            label: localize("Template", "Template"),
            options: [
              option("card", "Card", "Card"),
              option("profile", "Perfil", "Profile"),
              option("list", "Lista", "List"),
              option("rows", "Linhas", "Rows"),
            ],
            type: "select",
          },
          { key: "lines", label: localize("Linhas", "Lines"), max: 5, min: 2, type: "number" },
          { key: "count", label: localize("Quantidade", "Count"), max: 4, min: 1, type: "number" },
        ],
        surface: template === "card" || template === "profile" || count > 1 ? "wide" : "default",
        toggles: [{ key: "animated", label: localize("Animado", "Animated") }],
        render: () => buildSkeletonTemplate(template, lines, Boolean(state.animated), count),
      };
    }

    case "table": {
      const rows = clamp(asNumber(state.rows, 4), 2, 6);
      const tableMarkup = `<table class="${classList("r8-table", state.striped && "r8-table--striped", state.hover && "r8-table--hover", state.compact && "r8-table--sm")}">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Status</th>
      <th scope="col">Role</th>
      <th scope="col">Address</th>
      <th scope="col">Score</th>
    </tr>
  </thead>
  <tbody>
    ${buildTableRows(rows, { statusRows: Boolean(state.statusRows), truncate: Boolean(state.truncate) })}
  </tbody>
</table>`;
      return {
        defaults: getDefaults(id),
        fields: [{ key: "rows", label: localize("Linhas", "Rows"), max: 6, min: 2, type: "number" }],
        surface: "table",
        toggles: [
          { key: "striped", label: localize("Zebrada", "Striped") },
          { key: "hover", label: localize("Hover", "Hover") },
          { key: "compact", label: localize("Compacta", "Compact") },
          { key: "fixedHead", label: localize("Header fixo", "Fixed header") },
          { key: "statusRows", label: localize("Estados por linha", "Row states") },
          { key: "truncate", label: localize("Truncar texto", "Truncate text") },
        ],
        render: () =>
          state.fixedHead
            ? `<div class="r8-table-wrap r8-table-wrap--fixed" style="--r8-table-max-height: 12rem;">
  ${tableMarkup}
</div>`
            : tableMarkup,
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

    case "breadcrumb": {
      const current = String(state.current || localize("Breadcrumb", "Breadcrumb"));
      const levels = clamp(asNumber(state.levels, 4), 3, 5);
      const separator = String(state.separator || "chevron");

      return {
        defaults: getDefaults(id),
        fields: [
          { key: "current", label: localize("Página atual", "Current page"), maxlength: 20, type: "text" },
          { key: "levels", label: localize("Níveis", "Levels"), max: 5, min: 3, type: "number" },
          {
            key: "separator",
            label: localize("Separador", "Separator"),
            options: [
              option("slash", "Barra /", "Slash /"),
              option("chevron", "Chevron >", "Chevron >"),
              option("double", "Duplo >>", "Double >>"),
              option("dot", "Ponto •", "Dot •"),
            ],
            type: "select",
          },
        ],
        surface: "wide",
        toggles: [
          { key: "links", label: localize("Links clicáveis", "Clickable links") },
          { key: "compact", label: localize("Compacto", "Compact") },
          { key: "nowrap", label: localize("Sem quebra", "No wrap") },
        ],
        render: () =>
          buildBreadcrumbTrail(current, levels, {
            compact: Boolean(state.compact),
            links: Boolean(state.links),
            nowrap: Boolean(state.nowrap),
            separator,
          }),
      };
    }

    case "dropdown": {
      const selected = String(state.selected || "archive");
      const items = [
        {
          key: "duplicate",
          label: getActionLabel("duplicate"),
        },
        {
          key: "archive",
          label: getActionLabel("archive"),
        },
        {
          key: "share",
          label: localize("Compartilhar", "Share"),
          disabled: Boolean(state.keepOpen),
        },
        {
          key: "delete",
          label: getActionLabel("delete"),
          danger: Boolean(state.danger),
          divided: Boolean(state.divided),
        },
      ];

      return {
        defaults: getDefaults(id),
        fields: [
          {
            key: "selected",
            label: localize("Selecionado", "Selected"),
            options: [
              option("duplicate", "Duplicate", "Duplicate"),
              option("archive", "Archive", "Archive"),
              option("delete", "Delete", "Delete"),
            ],
            type: "select",
          },
        ],
        surface: "wide",
        toggles: [
          { key: "split", label: localize("Split trigger", "Split trigger") },
          { key: "end", label: localize("Alinhar à direita", "Align end") },
          { key: "divided", label: localize("Item dividido", "Divided item") },
          { key: "danger", label: localize("Ação danger", "Danger action") },
          { key: "keepOpen", label: localize("Manter aberto", "Keep open") },
        ],
        render: () => `<div class="${classList("r8-dropdown", state.end && "r8-dropdown--end")}"${state.keepOpen ? ' data-r8-close-on-select="false"' : ""}>
  ${
    state.split
      ? `<div class="r8-dropdown__split">
    <button class="r8-btn r8-btn--sm r8-dropdown__action" type="button">${escapeHtml(localize("Executar", "Run now"))}</button>
    <button class="r8-btn r8-btn--sm r8-dropdown__trigger" type="button">${escapeHtml(localize("Mais ações", "More actions"))}</button>
  </div>`
      : `<button class="r8-btn r8-btn--sm r8-dropdown__trigger" type="button">${escapeHtml(localize("Abrir menu", "Open menu"))}</button>`
  }
  <div class="r8-dropdown__menu" style="--r8-dropdown-menu-width: 13rem;" hidden>
    ${items
      .map(
        (item) => `<button
      class="${classList(
        "r8-dropdown__item",
        selected === item.key && "is-selected",
        item.divided && "r8-dropdown__item--divided",
        item.danger && "r8-dropdown__item--danger",
      )}"
      type="button"
      data-r8-command="${item.key}"
      ${item.disabled ? 'aria-disabled="true"' : ""}
    >${escapeHtml(item.label)}</button>`,
      )
      .join("\n    ")}
  </div>
</div>`,
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
      const effect = String(state.effect || "surface");
      const titleText = tone === "danger" ? localize("Sistema offline", "System offline") : localize("Alerta ativo", "Active alert");
      const descriptionText =
        tone === "danger"
          ? localize(
              "O core principal entrou em resfriamento e a interface migrou para energia reduzida.",
              "The main core entered cooldown and the interface moved to reduced power.",
            )
          : localize(
              "A interface recebeu as novas variantes seguras desse componente.",
              "The interface received this component's new safe variants.",
            );
      const closeTextMap: Record<string, string> = {
        close: localize("Fechar", "Close"),
        gotit: localize("Entendi", "Got it"),
        x: "x",
      };
      const iconMap: Record<string, string> = {
        primary: "i",
        secondary: ">",
        tertiary: "*",
        success: "OK",
        warning: "!",
        info: "i",
        danger: "!!",
        dark: "*",
        light: "i",
      };
      return {
        defaults: getDefaults(id),
        fields: [
          {
            key: "tone",
            label: localize("Tom", "Tone"),
            options: [
              option("primary", "Primário", "Primary"),
              option("secondary", "Secundário", "Secondary"),
              option("tertiary", "Terciário", "Tertiary"),
              option("success", "Sucesso", "Success"),
              option("warning", "Aviso", "Warning"),
              option("info", "Info", "Info"),
              option("danger", "Perigo", "Danger"),
              option("dark", "Escuro", "Dark"),
              option("light", "Claro", "Light"),
            ],
            type: "select",
          },
          {
            key: "effect",
            label: localize("Efeito", "Effect"),
            options: [
              option("surface", "Surface", "Surface"),
              option("solid", "Solid", "Solid"),
            ],
            type: "select",
          },
          {
            key: "closeText",
            label: localize("Texto do close", "Close text"),
            options: [
              option("x", "x", "x"),
              option("close", "Fechar", "Close"),
              option("gotit", "Entendi", "Got it"),
            ],
            type: "select",
          },
        ],
        surface: "wide",
        toggles: [
          { key: "showIcon", label: localize("Com ícone", "Show icon") },
          { key: "description", label: localize("Com descrição", "Description") },
          { key: "actions", label: localize("Com ações", "Actions") },
          { key: "center", label: localize("Centralizado", "Centered") },
          { key: "dismissible", label: localize("Fechável", "Dismissible") },
        ],
        render: () => `<section class="${classList(
          "r8-alert",
          `r8-alert--${tone}`,
          effect === "surface" && "r8-alert--surface",
          state.center && "r8-alert--center",
          state.dismissible && "r8-alert--dismissible",
        )}" role="${tone === "success" ? "status" : "alert"}"${tone === "success" ? ' aria-live="polite"' : ""}>
  <div class="r8-alert__layout">
    ${state.showIcon ? `<span class="r8-alert__icon" aria-hidden="true">${escapeHtml(iconMap[tone] || "i")}</span>` : ""}
    <div class="r8-alert__content">
      <strong class="r8-alert__title">${escapeHtml(titleText)}</strong>
      ${state.description ? `<p class="r8-alert__description">${escapeHtml(descriptionText)}</p>` : ""}
      ${
        state.actions
          ? `<div class="r8-alert__actions">
        <button class="r8-btn r8-btn--sm ${tone === "danger" || effect !== "surface" ? "" : "r8-btn--primary"}" type="button">${escapeHtml(localize("Revisar", "Review"))}</button>
        <button class="r8-btn r8-btn--sm ${tone === "danger" ? "r8-btn--light" : "r8-btn--ghost"}" type="button">${escapeHtml(localize("Depois", "Later"))}</button>
      </div>`
          : ""
      }
    </div>
  </div>
  ${state.dismissible ? `<button class="r8-alert__close" type="button" data-r8-dismiss="true" aria-label="${escapeAttribute(localize("Fechar alerta", "Dismiss alert"))}">${escapeHtml(closeTextMap[String(state.closeText || "x")] || "x")}</button>` : ""}
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
      const size = String(state.size || "md");
      const placement = String(state.placement || "right");
      const content = String(state.content || "settings");
      const targetId = "docs-generic-drawer-preview";
      const title = localize("Configurações rápidas", "Quick settings");
      const sizeValue = size === "sm" ? "18rem" : size === "lg" ? "32rem" : "24rem";
      const closeButton = state.header && state.closeButton
        ? `<button class="r8-drawer__close" type="button" data-r8-close="#${targetId}" aria-label="${escapeAttribute(localize("Fechar drawer", "Close drawer"))}">x</button>`
        : "";

      let bodyMarkup = "";
      if (content === "form") {
        bodyMarkup = `<div class="r8-stack">
  <label class="r8-stack">
    <span>${escapeHtml(localize("Nome da squad", "Squad name"))}</span>
    <input class="r8-input" type="text" value="${escapeAttribute(localize("Exploradores alpha", "Alpha explorers"))}" />
  </label>
  <label class="r8-stack">
    <span>${escapeHtml(localize("Região", "Region"))}</span>
    <input class="r8-input" type="text" value="${escapeAttribute(localize("Setor gamma", "Gamma sector"))}" />
  </label>
  <label class="r8-stack">
    <span>${escapeHtml(localize("Notas", "Notes"))}</span>
    <textarea class="r8-input" rows="4">${escapeHtml(localize("Levar kits extras e manter o canal de suporte ativo.", "Bring extra kits and keep the support channel active."))}</textarea>
  </label>
</div>`;
      } else if (content === "table") {
        bodyMarkup = `<div class="r8-table-wrap r8-table-wrap--sticky">
  <table class="r8-table r8-table--striped r8-table--hover">
    <thead>
      <tr>
        <th>${escapeHtml(localize("Item", "Item"))}</th>
        <th>${escapeHtml(localize("Status", "Status"))}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${escapeHtml(localize("Mapa local", "Local map"))}</td>
        <td>${escapeHtml(localize("Sincronizado", "Synced"))}</td>
      </tr>
      <tr>
        <td>${escapeHtml(localize("Slots de equipe", "Crew slots"))}</td>
        <td>${escapeHtml(localize("4 livres", "4 free"))}</td>
      </tr>
      <tr>
        <td>${escapeHtml(localize("Canal de rádio", "Radio channel"))}</td>
        <td>${escapeHtml(localize("Seguro", "Secure"))}</td>
      </tr>
    </tbody>
  </table>
</div>`;
      } else {
        bodyMarkup = `<p class="r8-text">${escapeHtml(localize("Ajuste a paleta ativa, a densidade visual e os atalhos rapidos sem sair da tela atual.", "Tune the active palette, visual density, and quick shortcuts without leaving the current screen."))}</p>
<label class="r8-checkbox is-checked">
  <span class="r8-checkbox__box" aria-hidden="true"></span>
  <span>${escapeHtml(localize("Mostrar minimapa", "Show minimap"))}</span>
</label>
<label class="r8-checkbox">
  <span class="r8-checkbox__box" aria-hidden="true"></span>
  <span>${escapeHtml(localize("Ativar scanlines", "Enable scanlines"))}</span>
</label>
<label class="r8-checkbox is-checked">
  <span class="r8-checkbox__box" aria-hidden="true"></span>
  <span>${escapeHtml(localize("Modo compacto", "Compact mode"))}</span>
</label>`;
      }

      const drawerAttributes = [
        `class="${classList("r8-drawer", `r8-drawer--${placement}`)}"`,
        `style="--r8-drawer-size: ${sizeValue};"`,
        state.header ? `aria-labelledby="${targetId}-title"` : `aria-label="${escapeAttribute(title)}"`,
        !state.modal && `data-r8-modal="false"`,
        !state.closeOnBackdrop && `data-r8-close-on-backdrop="false"`,
        !state.closeOnEscape && `data-r8-close-on-escape="false"`,
        !state.lockScroll && `data-r8-lock-scroll="false"`,
      ]
        .filter(Boolean)
        .join(" ");

      return {
        defaults: getDefaults(id),
        fields: [
          {
            key: "placement",
            label: localize("Posição", "Position"),
            options: [option("right", "Direita", "Right"), option("left", "Esquerda", "Left"), option("top", "Topo", "Top"), option("bottom", "Base", "Bottom")],
            type: "select",
          },
          {
            key: "size",
            label: localize("Tamanho", "Size"),
            options: [option("sm", "Pequeno", "Small"), option("md", "Médio", "Medium"), option("lg", "Grande", "Large")],
            type: "select",
          },
          {
            key: "content",
            label: localize("Conteúdo", "Content"),
            options: [option("settings", "Settings", "Settings"), option("form", "Formulário", "Form"), option("table", "Tabela", "Table")],
            type: "select",
          },
        ],
        surface: "overlay",
        toggles: [
          { key: "header", label: localize("Header", "Header") },
          { key: "closeButton", label: localize("Botão fechar", "Close button") },
          { key: "footer", label: localize("Footer", "Footer") },
          { key: "modal", label: localize("Com backdrop", "With backdrop") },
          { key: "closeOnBackdrop", label: localize("Fecha no backdrop", "Close on backdrop") },
          { key: "closeOnEscape", label: localize("Fecha no Esc", "Close on Esc") },
          { key: "lockScroll", label: localize("Trava scroll", "Lock scroll") },
        ],
        render: () => `<div class="r8-stack" data-r8-overlay-scope>
  <button class="r8-btn r8-btn--primary" type="button" data-r8-toggle="drawer" data-r8-target="#${targetId}">${escapeHtml(localize("Abrir drawer", "Open drawer"))}</button>
  <aside id="${targetId}" ${drawerAttributes} hidden>
    ${state.header ? `<div class="r8-drawer__header">
      <div class="r8-drawer__copy">
        <strong id="${targetId}-title" class="r8-drawer__title">${escapeHtml(title)}</strong>
        <p class="r8-drawer__meta">${escapeHtml(localize("Teste posição, tamanho e regras de fechamento sem sair do preview.", "Test placement, size, and closing rules without leaving the preview."))}</p>
      </div>
      ${closeButton}
    </div>` : ""}
    <div class="r8-drawer__body">
      ${bodyMarkup}
    </div>
    ${state.footer ? `<div class="r8-drawer__footer">
      <button class="r8-btn r8-btn--sm" type="button" data-r8-close="#${targetId}">${escapeHtml(localize("Cancelar", "Cancel"))}</button>
      <button class="r8-btn r8-btn--sm r8-btn--primary" type="button" data-r8-close="#${targetId}">${escapeHtml(localize("Aplicar", "Apply"))}</button>
    </div>` : ""}
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
