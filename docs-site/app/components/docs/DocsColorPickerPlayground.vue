<script setup lang="ts">
const props = defineProps<{
  site: any;
}>();

type ColorPickerSize = "sm" | "md" | "lg";
type ColorPickerMode = "fixed" | "dynamic";
type Retro8Runtime = {
  init?: (root?: Document | HTMLElement) => unknown;
};

type ColorPreset = {
  value: string;
  fill: string;
};

const strings = computed(() => props.site.componentPage.colorPickerPlayground);

const previewSurface = ref<HTMLElement | null>(null);
const boundPicker = ref<HTMLElement | null>(null);

const labelText = ref(strings.value.defaultLabel);
const placeholderText = ref(strings.value.defaultPlaceholder);
const size = ref<ColorPickerSize>("md");
const mode = ref<ColorPickerMode>("fixed");
const clearable = ref(true);
const showAlpha = ref(false);
const selectedValue = ref(getDefaultValue("fixed", false));
const eventLog = ref<string[]>([strings.value.eventIdle]);

const sizeOptions = computed(() => [
  { value: "sm", label: strings.value.options.sm },
  { value: "md", label: strings.value.options.md },
  { value: "lg", label: strings.value.options.lg },
]);

const modeOptions = computed(() => [
  { value: "fixed", label: strings.value.options.fixed },
  { value: "dynamic", label: strings.value.options.dynamic },
]);

const palette = computed<ColorPreset[]>(() => {
  if (showAlpha.value) {
    return [
      { value: "rgba(37, 99, 235, 0.78)", fill: "rgba(37, 99, 235, 0.78)" },
      { value: "rgba(2, 6, 23, 0.72)", fill: "rgba(2, 6, 23, 0.72)" },
      { value: "rgba(124, 58, 237, 0.74)", fill: "rgba(124, 58, 237, 0.74)" },
      { value: "rgba(22, 163, 74, 0.72)", fill: "rgba(22, 163, 74, 0.72)" },
      { value: "rgba(250, 204, 21, 0.72)", fill: "rgba(250, 204, 21, 0.72)" },
      { value: "rgba(220, 38, 38, 0.72)", fill: "rgba(220, 38, 38, 0.72)" },
    ];
  }

  return [
    { value: "#2563eb", fill: "#2563eb" },
    { value: "#64748b", fill: "#64748b" },
    { value: "#7c3aed", fill: "#7c3aed" },
    { value: "#16a34a", fill: "#16a34a" },
    { value: "#0891b2", fill: "#0891b2" },
    { value: "#dc2626", fill: "#dc2626" },
  ];
});

const resolvedLabelText = computed(() => labelText.value.trim() || strings.value.defaultLabel);
const resolvedPlaceholder = computed(() => placeholderText.value.trim() || strings.value.defaultPlaceholder);
const displayValue = computed(() => selectedValue.value || resolvedPlaceholder.value);
const helperCopy = computed(() => (mode.value === "dynamic" ? strings.dynamicHelperCopy : strings.helperCopy));

const previewKey = computed(() =>
  [
    resolvedLabelText.value,
    resolvedPlaceholder.value,
    size.value,
    mode.value,
    clearable.value ? "clear" : "fixed",
    showAlpha.value ? "alpha" : "solid",
  ].join(":"),
);

const markup = computed(() => {
  const attributes = ['class="r8-color-picker"', `data-r8-placeholder="${escapeAttribute(resolvedPlaceholder.value)}"`];

  if (clearable.value) {
    attributes.push('data-r8-clearable="true"');
  }

  if (size.value !== "md") {
    attributes.push(`data-r8-size="${size.value}"`);
  }

  if (showAlpha.value) {
    attributes.push('data-r8-show-alpha="true"');
  }

  if (mode.value === "dynamic") {
    attributes.push('data-r8-mode="dynamic"');
    if (selectedValue.value) {
      attributes.push(`data-r8-value="${escapeAttribute(selectedValue.value)}"`);
    }

    return `<div ${attributes.join(" ")}>\n  <button class="r8-color-picker__trigger" type="button" aria-label="${escapeAttribute(resolvedLabelText.value)}">\n    <span class="r8-color-picker__display">\n      <span class="r8-color-picker__sample" data-r8-color-sample aria-hidden="true"></span>\n      <span data-r8-choice-display>${escapeHtml(displayValue.value)}</span>\n    </span>\n    <span class="r8-choice__caret" aria-hidden="true">&gt;</span>\n  </button>\n\n  <div class="r8-color-picker__panel" hidden></div>\n</div>`;
  }

  const swatches = palette.value
    .map((preset) => {
      const className = preset.value === selectedValue.value ? ' class="r8-color-picker__swatch is-selected"' : ' class="r8-color-picker__swatch"';
      return `      <div${className} data-r8-value="${escapeAttribute(preset.value)}" aria-label="${escapeAttribute(preset.value)}" style="background-color:${preset.fill};"></div>`;
    })
    .join("\n");

  const clearButton = clearable.value
    ? `\n      <button class="r8-color-picker__clear r8-btn r8-btn--sm r8-btn--secondary" type="button">${strings.value.clearButtonText}</button>`
    : "";

  return `<div ${attributes.join(" ")}>\n  <button class="r8-color-picker__trigger" type="button" aria-label="${escapeAttribute(resolvedLabelText.value)}">\n    <span class="r8-color-picker__display">\n      <span class="r8-color-picker__sample" data-r8-color-sample aria-hidden="true"></span>\n      <span data-r8-choice-display>${escapeHtml(displayValue.value)}</span>\n    </span>\n    <span class="r8-choice__caret" aria-hidden="true">&gt;</span>\n  </button>\n\n  <div class="r8-color-picker__panel" hidden>\n    <div class="r8-color-picker__toolbar">\n      <p class="r8-text r8-text--xs r8-text--muted">${strings.value.presetLabel}</p>${clearButton}\n    </div>\n\n    <div class="r8-color-picker__swatches">\n${swatches}\n    </div>\n  </div>\n</div>`;
});

function escapeAttribute(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

function getDefaultValue(nextMode: ColorPickerMode, alpha: boolean) {
  if (nextMode === "dynamic") {
    return alpha ? "rgba(64, 158, 255, 0.85)" : "#409eff";
  }

  return alpha ? "rgba(37, 99, 235, 0.78)" : "#2563eb";
}

function resetPlayground() {
  labelText.value = strings.value.defaultLabel;
  placeholderText.value = strings.value.defaultPlaceholder;
  size.value = "md";
  mode.value = "fixed";
  clearable.value = true;
  showAlpha.value = false;
  selectedValue.value = getDefaultValue("fixed", false);
  eventLog.value = [strings.value.eventIdle];
}

function toggleClearable() {
  clearable.value = !clearable.value;
}

function toggleAlpha() {
  showAlpha.value = !showAlpha.value;
}

function getToggleClass(enabled: boolean) {
  return enabled ? "r8-btn r8-btn--sm r8-btn--secondary" : "r8-btn r8-btn--sm r8-btn--ghost";
}

function pushEvent(entry: string) {
  eventLog.value = [entry, ...eventLog.value].slice(0, 6);
}

function bindPreviewEvents() {
  const picker = previewSurface.value?.querySelector(".r8-color-picker");

  if (!(picker instanceof HTMLElement) || boundPicker.value === picker) {
    return;
  }

  boundPicker.value = picker;

  picker.addEventListener("r8:color-active-change", (event) => {
    const detail = ((event as CustomEvent).detail || {}) as Record<string, unknown>;
    const value = typeof detail.value === "string" ? detail.value : "";
    pushEvent(`color-active-change: ${value}`);
  });

  picker.addEventListener("r8:color-change", (event) => {
    const detail = ((event as CustomEvent).detail || {}) as Record<string, unknown>;
    const value = typeof detail.value === "string" ? detail.value : "";

    selectedValue.value = value;
    pushEvent(`color-change: ${value}`);
  });

  picker.addEventListener("r8:color-clear", () => {
    selectedValue.value = "";
    pushEvent(`color-clear: ${strings.value.clearEventText}`);
  });
}

function initPreviewRuntime() {
  if (!import.meta.client || !previewSurface.value) {
    return;
  }

  boundPicker.value = null;
  const runtime = (window as typeof window & { Retro8UI?: Retro8Runtime }).Retro8UI;
  runtime?.init?.(previewSurface.value);
  bindPreviewEvents();
}

watch([mode, showAlpha], ([nextMode, nextAlpha]) => {
  selectedValue.value = getDefaultValue(nextMode, nextAlpha);
  eventLog.value = [strings.value.eventIdle];
});

onMounted(async () => {
  await nextTick();
  initPreviewRuntime();
});

watch([labelText, placeholderText, size, mode, clearable, showAlpha], async () => {
  await nextTick();
  initPreviewRuntime();
});
</script>

<template>
  <section class="r8-panel docs-color-picker-playground">
    <div class="r8-panel__header">
      <div class="docs-color-picker-playground__header">
        <div class="docs-color-picker-playground__intro">
          <h2 class="r8-panel__title">{{ strings.title }}</h2>
          <p class="docs-panel__meta">{{ strings.copy }}</p>
        </div>

        <button class="r8-btn r8-btn--sm r8-btn--secondary" type="button" @click="resetPlayground">
          {{ strings.resetLabel }}
        </button>
      </div>
    </div>

    <div class="r8-panel__body docs-color-picker-playground__body">
      <div class="docs-color-picker-playground__controls">
        <div class="docs-color-picker-playground__field-grid">
          <label class="r8-field">
            <span class="r8-label">{{ strings.labelField }}</span>
            <input v-model="labelText" class="r8-input" maxlength="32" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.placeholderField }}</span>
            <input v-model="placeholderText" class="r8-input" maxlength="32" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.modeField }}</span>
            <DocsControlSelect v-model="mode" :options="modeOptions" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.sizeField }}</span>
            <DocsControlSelect v-model="size" :options="sizeOptions" />
          </label>
        </div>

        <div class="r8-field">
          <span class="r8-label">{{ strings.statesLabel }}</span>
          <div class="docs-color-picker-playground__toggles">
            <button
              :class="getToggleClass(clearable)"
              type="button"
              :aria-pressed="clearable ? 'true' : 'false'"
              @click="toggleClearable"
            >
              {{ strings.clearableLabel }}
            </button>

            <button
              :class="getToggleClass(showAlpha)"
              type="button"
              :aria-pressed="showAlpha ? 'true' : 'false'"
              @click="toggleAlpha"
            >
              {{ strings.alphaLabel }}
            </button>
          </div>
        </div>
      </div>

      <div class="docs-demo__stage docs-color-picker-playground__stage">
        <div class="docs-color-picker-playground__preview">
          <span class="r8-label">{{ strings.previewLabel }}</span>
          <div ref="previewSurface" class="docs-color-picker-playground__surface">
            <div
              :key="previewKey"
              class="r8-color-picker"
              :data-r8-mode="mode === 'dynamic' ? 'dynamic' : null"
              :data-r8-clearable="clearable ? 'true' : null"
              :data-r8-size="size !== 'md' ? size : null"
              :data-r8-show-alpha="showAlpha ? 'true' : null"
              :data-r8-placeholder="resolvedPlaceholder"
              :data-r8-value="mode === 'dynamic' && selectedValue ? selectedValue : null"
            >
              <button class="r8-color-picker__trigger" type="button" :aria-label="resolvedLabelText">
                <span class="r8-color-picker__display">
                  <span class="r8-color-picker__sample" data-r8-color-sample aria-hidden="true"></span>
                  <span data-r8-choice-display>{{ displayValue }}</span>
                </span>
                <span class="r8-choice__caret" aria-hidden="true">&gt;</span>
              </button>

              <div class="r8-color-picker__panel" hidden>
                <template v-if="mode === 'fixed'">
                  <div class="r8-color-picker__toolbar">
                    <p class="r8-text r8-text--xs r8-text--muted">{{ strings.presetLabel }}</p>
                    <button
                      v-if="clearable"
                      class="r8-color-picker__clear r8-btn r8-btn--sm r8-btn--secondary"
                      type="button"
                    >
                      {{ strings.clearButtonText }}
                    </button>
                  </div>

                  <div class="r8-color-picker__swatches">
                    <div
                      v-for="preset in palette"
                      :key="preset.value"
                      class="r8-color-picker__swatch"
                      :class="{ 'is-selected': preset.value === selectedValue }"
                      :data-r8-value="preset.value"
                      :aria-label="preset.value"
                      :style="{ backgroundColor: preset.fill }"
                    />
                  </div>
                </template>
              </div>
            </div>
          </div>
          <p class="docs-color-picker-playground__helper">{{ helperCopy }}</p>
        </div>

        <p class="docs-demo__stage-copy">
          {{ strings.previewCopy }}
        </p>

        <div class="docs-color-picker-playground__events">
          <span class="r8-label">{{ strings.eventsLabel }}</span>
          <div class="docs-color-picker-playground__event-log">
            <p
              v-for="(entry, index) in eventLog"
              :key="`${index}-${entry}`"
              class="r8-text r8-text--xs r8-text--muted"
            >
              {{ entry }}
            </p>
          </div>
        </div>

        <DocsPlaygroundMarkup
          wrapper-class="docs-color-picker-playground__markup"
          code-class="docs-color-picker-playground__code"
          :label="strings.markupLabel"
          :code="markup"
          :button-label="site.componentPage.copyButton"
          :copied-label="site.componentPage.copySuccess"
          :unavailable-label="site.componentPage.copyUnavailable"
        />
      </div>
    </div>
  </section>
</template>
