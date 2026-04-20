<script setup lang="ts">
const props = defineProps<{
  site: any;
}>();

type ColorTone =
  | "default"
  | "muted"
  | "subtle"
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "warning"
  | "info"
  | "danger"
  | "dark"
  | "light";

type ColorSurface = "surface" | "surface2" | "surface3" | "darkSurface" | "primarySurface" | "warningSurface";

const strings = computed(() => props.site.componentPage.colorPlayground);

const sampleText = ref(props.site.componentPage.colorPlayground.defaultText);
const tone = ref<ColorTone>("primary");
const surface = ref<ColorSurface>("surface");

const toneOptions = computed(() => [
  { value: "default", label: strings.value.options.default },
  { value: "muted", label: strings.value.options.muted },
  { value: "subtle", label: strings.value.options.subtle },
  { value: "primary", label: strings.value.options.primary },
  { value: "secondary", label: strings.value.options.secondary },
  { value: "tertiary", label: strings.value.options.tertiary },
  { value: "success", label: strings.value.options.success },
  { value: "warning", label: strings.value.options.warning },
  { value: "info", label: strings.value.options.info },
  { value: "danger", label: strings.value.options.danger },
  { value: "dark", label: strings.value.options.dark },
  { value: "light", label: strings.value.options.light },
]);

const surfaceOptions = computed(() => [
  { value: "surface", label: strings.value.options.surface },
  { value: "surface2", label: strings.value.options.surface2 },
  { value: "surface3", label: strings.value.options.surface3 },
  { value: "darkSurface", label: strings.value.options.darkSurface },
  { value: "primarySurface", label: strings.value.options.primarySurface },
  { value: "warningSurface", label: strings.value.options.warningSurface },
]);

const resolvedText = computed(() => sampleText.value.trim() || strings.value.defaultText);

const renderedClassName = computed(() => {
  const classes = ["r8-text"];

  if (tone.value !== "default") {
    classes.push(`r8-text--${tone.value}`);
  }

  return classes.join(" ");
});

const surfaceStyles = computed(() => {
  const map: Record<ColorSurface, Record<string, string>> = {
    surface: {
      background: "var(--r8-color-surface)",
      borderColor: "var(--r8-color-border)",
      boxShadow: "var(--r8-shadow-sm)",
    },
    surface2: {
      background: "var(--r8-color-surface-2)",
      borderColor: "var(--r8-color-border)",
      boxShadow: "var(--r8-shadow-sm)",
    },
    surface3: {
      background: "var(--r8-color-surface-3)",
      borderColor: "var(--r8-color-border)",
      boxShadow: "var(--r8-shadow-sm)",
    },
    darkSurface: {
      background: "var(--r8-color-dark)",
      borderColor: "var(--r8-color-dark-strong)",
      boxShadow: "none",
    },
    primarySurface: {
      background: "var(--r8-color-primary-strong)",
      borderColor: "var(--r8-color-border)",
      boxShadow: "none",
    },
    warningSurface: {
      background: "var(--r8-color-warning)",
      borderColor: "var(--r8-color-warning-strong)",
      boxShadow: "none",
    },
  };

  return map[surface.value];
});

const markup = computed(() => {
  const surfaceTokenMap: Record<ColorSurface, string> = {
    surface: "--r8-color-surface",
    surface2: "--r8-color-surface-2",
    surface3: "--r8-color-surface-3",
    darkSurface: "--r8-color-dark",
    primarySurface: "--r8-color-primary-strong",
    warningSurface: "--r8-color-warning",
  };

  return `<section style="padding: var(--r8-space-4); background: var(${surfaceTokenMap[surface.value]});">\n  <p class="${renderedClassName.value}">${resolvedText.value}</p>\n</section>`;
});

function resetPlayground() {
  sampleText.value = strings.value.defaultText;
  tone.value = "primary";
  surface.value = "surface";
}
</script>

<template>
  <section class="r8-panel docs-color-playground">
    <div class="r8-panel__header">
      <div class="docs-color-playground__header">
        <div class="docs-color-playground__intro">
          <h2 class="r8-panel__title">{{ strings.title }}</h2>
          <p class="docs-panel__meta">{{ strings.copy }}</p>
        </div>

        <button class="r8-btn r8-btn--sm r8-btn--secondary" type="button" @click="resetPlayground">
          {{ strings.resetLabel }}
        </button>
      </div>
    </div>

    <div class="r8-panel__body docs-color-playground__body">
      <div class="docs-color-playground__controls">
        <div class="docs-color-playground__field-grid">
          <label class="r8-field">
            <span class="r8-label">{{ strings.labelField }}</span>
            <input v-model="sampleText" class="r8-input" maxlength="64" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.toneField }}</span>
            <DocsControlSelect v-model="tone" :options="toneOptions" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.surfaceField }}</span>
            <DocsControlSelect v-model="surface" :options="surfaceOptions" />
          </label>
        </div>
      </div>

      <div class="docs-demo__stage docs-color-playground__stage">
        <div class="docs-color-playground__preview">
          <span class="r8-label">{{ strings.previewLabel }}</span>
          <div class="docs-color-playground__surface" :style="surfaceStyles">
            <p :key="`${renderedClassName}-${surface}`" :class="renderedClassName">
              {{ resolvedText }}
            </p>
          </div>
        </div>

        <p class="docs-demo__stage-copy">
          {{ strings.previewCopy }}
        </p>

        <DocsPlaygroundMarkup
          wrapper-class="docs-color-playground__markup"
          code-class="docs-color-playground__code"
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
