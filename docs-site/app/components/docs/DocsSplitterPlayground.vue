<script setup lang="ts">
const props = defineProps<{
  site: any;
}>();

type SplitterOrientation = "horizontal" | "vertical";
type SplitterHandleSize = "sm" | "md" | "lg";

type Retro8Runtime = {
  init?: (root?: Document | HTMLElement) => unknown;
};

const strings = computed(() => props.site.componentPage.splitterPlayground);

const previewSurface = ref<HTMLElement | null>(null);
const boundSplitter = ref<HTMLElement | null>(null);

const orientation = ref<SplitterOrientation>("horizontal");
const position = ref(42);
const min = ref(20);
const max = ref(80);
const step = ref(5);
const handleSize = ref<SplitterHandleSize>("md");
const isDisabled = ref(false);
const eventLog = ref<string[]>([]);

function clampNumber(value: number, minValue: number, maxValue: number) {
  return Math.min(maxValue, Math.max(minValue, value));
}

const safeMin = computed(() => clampNumber(Math.round(min.value || 20), 5, 94));
const safeMax = computed(() => clampNumber(Math.round(max.value || 80), safeMin.value + 1, 95));
const safePosition = computed(() => clampNumber(Math.round(position.value || 50), safeMin.value, safeMax.value));
const safeStep = computed(() => clampNumber(Math.round(step.value || 5), 1, 25));

const orientationOptions = computed(() => [
  { value: "horizontal", label: strings.value.options.horizontal },
  { value: "vertical", label: strings.value.options.vertical },
]);

const handleSizeOptions = computed(() => [
  { value: "sm", label: strings.value.options.sm },
  { value: "md", label: strings.value.options.md },
  { value: "lg", label: strings.value.options.lg },
]);

const renderedClassName = computed(() => {
  const classes = ["r8-splitter"];

  if (orientation.value === "vertical") {
    classes.push("r8-splitter--vertical");
  }

  return classes.join(" ");
});

const splitterStyles = computed(() => {
  const sizeMap: Record<SplitterHandleSize, string> = {
    sm: "0.75rem",
    md: "0.875rem",
    lg: "1.125rem",
  };

  return {
    "--r8-splitter-handle-size": sizeMap[handleSize.value],
  };
});

const splitterKey = computed(() =>
  [
    orientation.value,
    safePosition.value,
    safeMin.value,
    safeMax.value,
    safeStep.value,
    handleSize.value,
    isDisabled.value,
  ].join(":"),
);

const markup = computed(() => {
  const attributes = [`class="${renderedClassName.value}"`];

  attributes.push(`data-r8-splitter-position="${safePosition.value}"`);
  attributes.push(`data-r8-splitter-min="${safeMin.value}"`);
  attributes.push(`data-r8-splitter-max="${safeMax.value}"`);
  attributes.push(`data-r8-splitter-step="${safeStep.value}"`);

  if (isDisabled.value) {
    attributes.push('data-r8-splitter-disabled="true"');
  }

  if (handleSize.value !== "md") {
    attributes.push(`style="--r8-splitter-handle-size: ${splitterStyles.value["--r8-splitter-handle-size"]}"`);
  }

  return `<div ${attributes.join(" ")}>\n  <section class="r8-splitter__pane">${strings.value.regions.primary}</section>\n  <div class="r8-splitter__handle" aria-label="${strings.value.handleLabel}"></div>\n  <section class="r8-splitter__pane">${strings.value.regions.secondary}</section>\n</div>`;
});

function formatEventLine(eventName: string, detail: Record<string, unknown>) {
  const value = typeof detail.value === "number" ? Math.round(detail.value) : detail.value;
  const source = typeof detail.source === "string" ? detail.source : "runtime";
  return `${eventName}: ${value}% · ${source}`;
}

function bindPreviewEvents() {
  const splitter = previewSurface.value?.querySelector(".r8-splitter");

  if (!(splitter instanceof HTMLElement) || boundSplitter.value === splitter) {
    return;
  }

  boundSplitter.value = splitter;
  eventLog.value = [strings.value.eventIdle];

  splitter.addEventListener("r8:splitter-resize-start", (event) => {
    const detail = (event as CustomEvent).detail || {};
    eventLog.value = [formatEventLine("start", detail), ...eventLog.value].slice(0, 4);
  });

  splitter.addEventListener("r8:splitter-change", (event) => {
    const detail = (event as CustomEvent).detail || {};
    eventLog.value = [formatEventLine("change", detail), ...eventLog.value].slice(0, 4);
  });

  splitter.addEventListener("r8:splitter-resize-end", (event) => {
    const detail = (event as CustomEvent).detail || {};
    eventLog.value = [formatEventLine("end", detail), ...eventLog.value].slice(0, 4);
  });
}

function initPreviewRuntime() {
  if (!import.meta.client || !previewSurface.value) {
    return;
  }

  boundSplitter.value = null;
  const runtime = (window as typeof window & { Retro8UI?: Retro8Runtime }).Retro8UI;
  runtime?.init?.(previewSurface.value);
  bindPreviewEvents();
}

function resetPlayground() {
  orientation.value = "horizontal";
  position.value = 42;
  min.value = 20;
  max.value = 80;
  step.value = 5;
  handleSize.value = "md";
  isDisabled.value = false;
  eventLog.value = [strings.value.eventIdle];
}

function getToggleClass(enabled: boolean) {
  return enabled ? "r8-btn r8-btn--sm r8-btn--secondary" : "r8-btn r8-btn--sm r8-btn--ghost";
}

onMounted(async () => {
  await nextTick();
  initPreviewRuntime();
});

watch([orientation, position, min, max, step, handleSize, isDisabled], async () => {
  await nextTick();
  initPreviewRuntime();
});
</script>

<template>
  <section class="r8-panel docs-splitter-playground">
    <div class="r8-panel__header">
      <div class="docs-splitter-playground__header">
        <div class="docs-splitter-playground__intro">
          <h2 class="r8-panel__title">{{ strings.title }}</h2>
          <p class="docs-panel__meta">{{ strings.copy }}</p>
        </div>

        <button class="r8-btn r8-btn--sm r8-btn--secondary" type="button" @click="resetPlayground">
          {{ strings.resetLabel }}
        </button>
      </div>
    </div>

    <div class="r8-panel__body docs-splitter-playground__body">
      <div class="docs-splitter-playground__controls">
        <div class="docs-splitter-playground__field-grid">
          <label class="r8-field">
            <span class="r8-label">{{ strings.orientationField }}</span>
            <select v-model="orientation" class="r8-input">
              <option v-for="option in orientationOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.positionField }}</span>
            <input v-model.number="position" class="r8-input" type="number" min="5" max="95" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.minField }}</span>
            <input v-model.number="min" class="r8-input" type="number" min="5" max="94" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.maxField }}</span>
            <input v-model.number="max" class="r8-input" type="number" min="6" max="95" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.stepField }}</span>
            <input v-model.number="step" class="r8-input" type="number" min="1" max="25" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.handleSizeField }}</span>
            <select v-model="handleSize" class="r8-input">
              <option v-for="option in handleSizeOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </label>
        </div>

        <div class="r8-field">
          <span class="r8-label">{{ strings.statesLabel }}</span>
          <div class="docs-splitter-playground__toggles">
            <button
              :class="getToggleClass(isDisabled)"
              type="button"
              :aria-pressed="isDisabled ? 'true' : 'false'"
              @click="isDisabled = !isDisabled"
            >
              {{ strings.disabledLabel }}
            </button>
          </div>
        </div>
      </div>

      <div class="docs-demo__stage docs-splitter-playground__stage">
        <div class="docs-splitter-playground__preview">
          <span class="r8-label">{{ strings.previewLabel }}</span>
          <div ref="previewSurface" class="docs-splitter-playground__surface">
            <div
              :key="splitterKey"
              :class="renderedClassName"
              :style="splitterStyles"
              :data-r8-splitter-position="safePosition"
              :data-r8-splitter-min="safeMin"
              :data-r8-splitter-max="safeMax"
              :data-r8-splitter-step="safeStep"
              :data-r8-splitter-disabled="isDisabled ? 'true' : undefined"
            >
              <section class="r8-splitter__pane">
                <strong>{{ strings.regions.primary }}</strong>
                <p class="r8-text r8-text--muted">{{ strings.regions.primaryCopy }}</p>
              </section>
              <div class="r8-splitter__handle" :aria-label="strings.handleLabel"></div>
              <section class="r8-splitter__pane">
                <strong>{{ strings.regions.secondary }}</strong>
                <p class="r8-text r8-text--muted">{{ strings.regions.secondaryCopy }}</p>
              </section>
            </div>
          </div>
        </div>

        <p class="docs-demo__stage-copy">
          {{ strings.previewCopy }}
        </p>

        <div class="docs-splitter-playground__events">
          <span class="r8-label">{{ strings.eventsLabel }}</span>
          <div class="docs-splitter-playground__event-log">
            <p v-for="(entry, index) in eventLog" :key="`${index}-${entry}`" class="r8-text r8-text--muted">
              {{ entry }}
            </p>
          </div>
        </div>

        <DocsPlaygroundMarkup
          wrapper-class="docs-splitter-playground__markup"
          code-class="docs-splitter-playground__code"
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
