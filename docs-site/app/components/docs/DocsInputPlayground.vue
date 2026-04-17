<script setup lang="ts">
const props = defineProps<{
  site: any;
}>();

type InputKind = "text" | "password" | "textarea";
type InputSize = "sm" | "md" | "lg";
type Retro8Runtime = {
  init?: (root?: Document | HTMLElement) => unknown;
};

const strings = computed(() => props.site.componentPage.inputPlayground);

const previewSurface = ref<HTMLElement | null>(null);
const listenersBound = ref(false);

const fieldType = ref<InputKind>("text");
const size = ref<InputSize>("md");
const placeholderText = ref(strings.value.defaultPlaceholder);
const valueText = ref(strings.value.defaultValue);
const maxLength = ref(18);
const clearable = ref(true);
const wordLimit = ref(true);
const passwordToggle = ref(true);
const autosize = ref(true);
const invalid = ref(false);
const eventLog = ref<string[]>([strings.value.eventIdle]);

const typeOptions = computed(() => [
  { value: "text", label: strings.value.options.text },
  { value: "password", label: strings.value.options.password },
  { value: "textarea", label: strings.value.options.textarea },
]);

const sizeOptions = computed(() => [
  { value: "sm", label: strings.value.options.sm },
  { value: "md", label: strings.value.options.md },
  { value: "lg", label: strings.value.options.lg },
]);

const resolvedPlaceholder = computed(() => placeholderText.value.trim() || strings.value.defaultPlaceholder);
const previewKey = computed(() =>
  [
    fieldType.value,
    size.value,
    resolvedPlaceholder.value,
    maxLength.value,
    clearable.value ? "clear" : "plain",
    wordLimit.value ? "count" : "nocount",
    passwordToggle.value ? "toggle" : "static",
    autosize.value ? "autosize" : "fixed",
    invalid.value ? "invalid" : "valid",
  ].join(":"),
);

const markup = computed(() => {
  const invalidAttr = invalid.value ? ' aria-invalid="true"' : "";
  if (fieldType.value === "textarea") {
    const attrs = [
      'class="r8-input"',
      `data-r8-size="${size.value}"`,
      `placeholder="${escapeAttribute(resolvedPlaceholder.value)}"`,
      `maxlength="${maxLength.value}"`,
    ];

    if (autosize.value) {
      attrs.push('data-r8-autosize="true"');
      attrs.push('data-r8-min-rows="3"');
      attrs.push('data-r8-max-rows="6"');
    }

    return `<label class="r8-field">\n  <span class="r8-label">Mission notes</span>\n  <textarea ${attrs.join(" ")}${invalidAttr}>${escapeHtml(valueText.value)}</textarea>\n  <span class="r8-help">${escapeHtml(strings.value.helperCopy)}</span>\n</label>`;
  }

  const shellAttrs = [`class="r8-input-shell"`, `data-r8-size="${size.value}"`];
  if (clearable.value) {
    shellAttrs.push('data-r8-clearable="true"');
  }
  if (wordLimit.value) {
    shellAttrs.push('data-r8-word-limit="true"');
  }
  if (fieldType.value === "password" && passwordToggle.value) {
    shellAttrs.push('data-r8-show-password="true"');
  }

  const prefix = fieldType.value === "text" ? '\n    <span class="r8-input__prefix">@</span>' : "";
  return `<label class="r8-field">\n  <span class="r8-label">Pilot name</span>\n  <div ${shellAttrs.join(" ")}>${prefix}\n    <input class="r8-input" type="${fieldType.value}" data-r8-size="${size.value}" maxlength="${maxLength.value}" placeholder="${escapeAttribute(resolvedPlaceholder.value)}" value="${escapeAttribute(valueText.value)}"${invalidAttr} />\n  </div>\n  <span class="r8-help">${escapeHtml(strings.value.helperCopy)}</span>\n</label>`;
});

function escapeAttribute(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

function resetPlayground() {
  fieldType.value = "text";
  size.value = "md";
  placeholderText.value = strings.value.defaultPlaceholder;
  valueText.value = strings.value.defaultValue;
  maxLength.value = 18;
  clearable.value = true;
  wordLimit.value = true;
  passwordToggle.value = true;
  autosize.value = true;
  invalid.value = false;
  eventLog.value = [strings.value.eventIdle];
}

function getToggleClass(enabled: boolean) {
  return enabled ? "r8-btn r8-btn--sm r8-btn--secondary" : "r8-btn r8-btn--sm r8-btn--ghost";
}

function appendEvent(entry: string) {
  eventLog.value = [entry, ...eventLog.value].slice(0, 6);
}

function bindPreviewEvents() {
  if (!(previewSurface.value instanceof HTMLElement) || listenersBound.value) {
    return;
  }

  listenersBound.value = true;

  previewSurface.value.addEventListener("input", (event) => {
    const target = event.target;
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
      valueText.value = target.value;
    }
  });

  previewSurface.value.addEventListener("change", (event) => {
    const target = event.target;
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
      appendEvent(`change: ${target.value || "empty"}`);
    }
  });

  previewSurface.value.addEventListener("r8:input-clear", () => {
    valueText.value = "";
    appendEvent(strings.value.clearEventText);
  });

  previewSurface.value.addEventListener("r8:input-password-toggle", (event) => {
    const detail = ((event as CustomEvent).detail || {}) as Record<string, unknown>;
    appendEvent(detail.revealed ? strings.value.revealEventText : strings.value.hideEventText);
  });
}

function initPreviewRuntime() {
  if (!import.meta.client || !previewSurface.value) {
    return;
  }

  const runtime = (window as typeof window & { Retro8UI?: Retro8Runtime }).Retro8UI;
  runtime?.init?.(previewSurface.value);
  bindPreviewEvents();
}

watch([fieldType, size, placeholderText, maxLength, clearable, wordLimit, passwordToggle, autosize, invalid], async () => {
  await nextTick();
  initPreviewRuntime();
});

onMounted(async () => {
  await nextTick();
  initPreviewRuntime();
});
</script>

<template>
  <section class="r8-panel docs-input-playground">
    <div class="r8-panel__header">
      <div class="docs-input-playground__header">
        <div class="docs-input-playground__intro">
          <h2 class="r8-panel__title">{{ strings.title }}</h2>
          <p class="docs-panel__meta">{{ strings.copy }}</p>
        </div>

        <button class="r8-btn r8-btn--sm r8-btn--secondary" type="button" @click="resetPlayground">
          {{ strings.resetLabel }}
        </button>
      </div>
    </div>

    <div class="r8-panel__body docs-input-playground__body">
      <div class="docs-input-playground__controls">
        <div class="docs-input-playground__field-grid">
          <label class="r8-field">
            <span class="r8-label">{{ strings.typeField }}</span>
            <select v-model="fieldType" class="r8-input">
              <option v-for="option in typeOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.sizeField }}</span>
            <select v-model="size" class="r8-input">
              <option v-for="option in sizeOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.placeholderField }}</span>
            <input v-model="placeholderText" class="r8-input" maxlength="32" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.maxLengthField }}</span>
            <input v-model.number="maxLength" class="r8-input" type="number" min="4" max="120" />
          </label>
        </div>

        <div class="r8-field">
          <span class="r8-label">{{ strings.statesLabel }}</span>
          <div class="docs-input-playground__toggles">
            <button :class="getToggleClass(clearable)" type="button" :aria-pressed="clearable ? 'true' : 'false'" @click="clearable = !clearable">
              {{ strings.clearableLabel }}
            </button>
            <button :class="getToggleClass(wordLimit)" type="button" :aria-pressed="wordLimit ? 'true' : 'false'" @click="wordLimit = !wordLimit">
              {{ strings.wordLimitLabel }}
            </button>
            <button
              :class="getToggleClass(passwordToggle)"
              type="button"
              :aria-pressed="passwordToggle ? 'true' : 'false'"
              @click="passwordToggle = !passwordToggle"
            >
              {{ strings.passwordToggleLabel }}
            </button>
            <button :class="getToggleClass(autosize)" type="button" :aria-pressed="autosize ? 'true' : 'false'" @click="autosize = !autosize">
              {{ strings.autosizeLabel }}
            </button>
            <button :class="getToggleClass(invalid)" type="button" :aria-pressed="invalid ? 'true' : 'false'" @click="invalid = !invalid">
              {{ strings.invalidLabel }}
            </button>
          </div>
        </div>
      </div>

      <div class="docs-demo__stage docs-input-playground__stage">
        <div class="docs-input-playground__preview">
          <span class="r8-label">{{ strings.previewLabel }}</span>
          <div ref="previewSurface" class="docs-input-playground__surface">
            <label class="r8-field">
              <span class="r8-label">{{ fieldType === "textarea" ? "Mission notes" : "Pilot name" }}</span>

              <template v-if="fieldType === 'textarea'">
                <textarea
                  :key="previewKey"
                  class="r8-input"
                  :data-r8-size="size"
                  :data-r8-autosize="autosize ? 'true' : null"
                  :data-r8-min-rows="autosize ? '3' : null"
                  :data-r8-max-rows="autosize ? '6' : null"
                  :maxlength="maxLength"
                  :placeholder="resolvedPlaceholder"
                  :aria-invalid="invalid ? 'true' : null"
                >{{ valueText }}</textarea>
              </template>

              <template v-else>
                <div
                  :key="previewKey"
                  class="r8-input-shell"
                  :data-r8-size="size"
                  :data-r8-clearable="clearable ? 'true' : null"
                  :data-r8-word-limit="wordLimit ? 'true' : null"
                  :data-r8-show-password="fieldType === 'password' && passwordToggle ? 'true' : null"
                >
                  <span v-if="fieldType === 'text'" class="r8-input__prefix">@</span>
                  <input
                    class="r8-input"
                    :data-r8-size="size"
                    :type="fieldType"
                    :maxlength="maxLength"
                    :placeholder="resolvedPlaceholder"
                    :value="valueText"
                    :aria-invalid="invalid ? 'true' : null"
                  />
                </div>
              </template>

              <span class="r8-help">{{ strings.helperCopy }}</span>
            </label>
          </div>
        </div>

        <p class="docs-demo__stage-copy">
          {{ strings.previewCopy }}
        </p>

        <div class="docs-input-playground__events">
          <span class="r8-label">{{ strings.eventsLabel }}</span>
          <div class="docs-input-playground__event-log">
            <p v-for="(entry, index) in eventLog" :key="`${index}-${entry}`" class="r8-text r8-text--xs r8-text--muted">
              {{ entry }}
            </p>
          </div>
        </div>

        <DocsPlaygroundMarkup
          wrapper-class="docs-input-playground__markup"
          code-class="docs-input-playground__code"
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
