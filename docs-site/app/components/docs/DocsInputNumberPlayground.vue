<script setup lang="ts">
const props = defineProps<{
  site: any;
}>();

type InputNumberSize = "sm" | "md" | "lg";
type Retro8Runtime = {
  init?: (root?: Document | HTMLElement) => unknown;
};

const strings = computed(() => props.site.componentPage.inputNumberPlayground);

const previewSurface = ref<HTMLElement | null>(null);
const listenersBound = ref(false);

const value = ref<number | null>(3.5);
const min = ref(0);
const max = ref(12);
const step = ref(0.25);
const precision = ref(2);
const size = ref<InputNumberSize>("md");
const strict = ref(true);
const rightControls = ref(true);
const disabled = ref(false);
const eventLog = ref<string[]>([strings.value.eventIdle]);

const sizeOptions = computed(() => [
  { value: "sm", label: strings.value.options.sm },
  { value: "md", label: strings.value.options.md },
  { value: "lg", label: strings.value.options.lg },
]);

const previewKey = computed(() =>
  [
    min.value,
    max.value,
    step.value,
    precision.value,
    size.value,
    strict.value ? "strict" : "free",
    rightControls.value ? "right" : "default",
    disabled.value ? "disabled" : "enabled",
  ].join(":"),
);

const markup = computed(() => {
  const attrs = ['class="r8-input-number"', `data-r8-size="${size.value}"`];
  if (strict.value) {
    attrs.push('data-r8-step-strictly="true"');
  }
  if (rightControls.value) {
    attrs.push('data-r8-controls-position="right"');
  }
  attrs.push(`data-r8-precision="${precision.value}"`);

  return `<div ${attrs.join(" ")}>\n  <button class="r8-input-number__button" type="button"${disabled.value ? " disabled" : ""}>-</button>\n  <input class="r8-input-number__input" type="number" min="${min.value}" max="${max.value}" step="${step.value}" value="${value.value ?? ""}"${disabled.value ? " disabled" : ""} />\n  <button class="r8-input-number__button" type="button"${disabled.value ? " disabled" : ""}>+</button>\n</div>`;
});

function resetPlayground() {
  value.value = 3.5;
  min.value = 0;
  max.value = 12;
  step.value = 0.25;
  precision.value = 2;
  size.value = "md";
  strict.value = true;
  rightControls.value = true;
  disabled.value = false;
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

  previewSurface.value.addEventListener("r8:input-number-change", (event) => {
    const detail = ((event as CustomEvent).detail || {}) as Record<string, unknown>;
    value.value = typeof detail.value === "number" ? detail.value : null;
    appendEvent(`change: ${detail.value ?? "empty"}${typeof detail.source === "string" ? ` (${detail.source})` : ""}`);
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

watch([min, max, step, precision, size, strict, rightControls, disabled], async () => {
  await nextTick();
  initPreviewRuntime();
});

onMounted(async () => {
  await nextTick();
  initPreviewRuntime();
});
</script>

<template>
  <section class="r8-panel docs-input-number-playground">
    <div class="r8-panel__header">
      <div class="docs-input-number-playground__header">
        <div class="docs-input-number-playground__intro">
          <h2 class="r8-panel__title">{{ strings.title }}</h2>
          <p class="docs-panel__meta">{{ strings.copy }}</p>
        </div>

        <button class="r8-btn r8-btn--sm r8-btn--secondary" type="button" @click="resetPlayground">
          {{ strings.resetLabel }}
        </button>
      </div>
    </div>

    <div class="r8-panel__body docs-input-number-playground__body">
      <div class="docs-input-number-playground__controls">
        <div class="docs-input-number-playground__field-grid">
          <label class="r8-field">
            <span class="r8-label">{{ strings.valueField }}</span>
            <input v-model.number="value" class="r8-input" type="number" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.minField }}</span>
            <input v-model.number="min" class="r8-input" type="number" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.maxField }}</span>
            <input v-model.number="max" class="r8-input" type="number" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.stepField }}</span>
            <input v-model.number="step" class="r8-input" type="number" min="0.01" step="0.01" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.precisionField }}</span>
            <input v-model.number="precision" class="r8-input" type="number" min="0" max="6" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.sizeField }}</span>
            <select v-model="size" class="r8-input">
              <option v-for="option in sizeOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </label>
        </div>

        <div class="r8-field">
          <span class="r8-label">{{ strings.statesLabel }}</span>
          <div class="docs-input-number-playground__toggles">
            <button :class="getToggleClass(strict)" type="button" :aria-pressed="strict ? 'true' : 'false'" @click="strict = !strict">
              {{ strings.strictLabel }}
            </button>
            <button
              :class="getToggleClass(rightControls)"
              type="button"
              :aria-pressed="rightControls ? 'true' : 'false'"
              @click="rightControls = !rightControls"
            >
              {{ strings.rightControlsLabel }}
            </button>
            <button :class="getToggleClass(disabled)" type="button" :aria-pressed="disabled ? 'true' : 'false'" @click="disabled = !disabled">
              {{ strings.disabledLabel }}
            </button>
          </div>
        </div>
      </div>

      <div class="docs-demo__stage docs-input-number-playground__stage">
        <div class="docs-input-number-playground__preview">
          <span class="r8-label">{{ strings.previewLabel }}</span>
          <div ref="previewSurface" class="docs-input-number-playground__surface">
            <div
              :key="previewKey"
              class="r8-input-number"
              :data-r8-size="size"
              :data-r8-step-strictly="strict ? 'true' : null"
              :data-r8-controls-position="rightControls ? 'right' : null"
              :data-r8-precision="precision"
            >
              <button class="r8-input-number__button" type="button" :disabled="disabled">-</button>
              <input
                class="r8-input-number__input"
                type="number"
                :min="min"
                :max="max"
                :step="step"
                :value="value ?? ''"
                :disabled="disabled"
              />
              <button class="r8-input-number__button" type="button" :disabled="disabled">+</button>
            </div>
          </div>
          <p class="r8-help">{{ strings.helperCopy }}</p>
        </div>

        <p class="docs-demo__stage-copy">
          {{ strings.previewCopy }}
        </p>

        <div class="docs-input-number-playground__events">
          <span class="r8-label">{{ strings.eventsLabel }}</span>
          <div class="docs-input-number-playground__event-log">
            <p v-for="(entry, index) in eventLog" :key="`${index}-${entry}`" class="r8-text r8-text--xs r8-text--muted">
              {{ entry }}
            </p>
          </div>
        </div>

        <div class="docs-input-number-playground__markup">
          <span class="r8-label">{{ strings.markupLabel }}</span>
          <pre class="docs-input-number-playground__code"><code>{{ markup }}</code></pre>
        </div>
      </div>
    </div>
  </section>
</template>
