<script setup lang="ts">
const props = defineProps<{
  site: any;
}>();

type HeadingLevel = "h1" | "h2" | "h3";
type TypographyTone = "default" | "muted" | "subtle" | "primary" | "secondary" | "success" | "warning" | "danger";
type TypographySize = "xs" | "sm" | "base" | "lg";
type TypographyFlow = "regular" | "compact" | "loose";
type TypographyMeasure = "auto" | "reading";

const strings = computed(() => props.site.componentPage.typographyPlayground);

const headingText = ref(props.site.componentPage.typographyPlayground.defaultHeading);
const bodyText = ref(props.site.componentPage.typographyPlayground.defaultBody);
const headingLevel = ref<HeadingLevel>("h1");
const tone = ref<TypographyTone>("default");
const size = ref<TypographySize>("base");
const flow = ref<TypographyFlow>("regular");
const measure = ref<TypographyMeasure>("reading");
const showQuote = ref(true);
const showMeta = ref(true);

const headingOptions = computed(() => [
  { value: "h1", label: strings.value.options.h1 },
  { value: "h2", label: strings.value.options.h2 },
  { value: "h3", label: strings.value.options.h3 },
]);

const toneOptions = computed(() => [
  { value: "default", label: strings.value.options.default },
  { value: "muted", label: strings.value.options.muted },
  { value: "subtle", label: strings.value.options.subtle },
  { value: "primary", label: strings.value.options.primary },
  { value: "secondary", label: strings.value.options.secondary },
  { value: "success", label: strings.value.options.success },
  { value: "warning", label: strings.value.options.warning },
  { value: "danger", label: strings.value.options.danger },
]);

const sizeOptions = computed(() => [
  { value: "xs", label: strings.value.options.xs },
  { value: "sm", label: strings.value.options.sm },
  { value: "base", label: strings.value.options.base },
  { value: "lg", label: strings.value.options.lg },
]);

const flowOptions = computed(() => [
  { value: "regular", label: strings.value.options.regular },
  { value: "compact", label: strings.value.options.compact },
  { value: "loose", label: strings.value.options.loose },
]);

const measureOptions = computed(() => [
  { value: "auto", label: strings.value.options.auto },
  { value: "reading", label: strings.value.options.reading },
]);

const resolvedHeading = computed(() => headingText.value.trim() || strings.value.defaultHeading);
const resolvedBody = computed(() => bodyText.value.trim() || strings.value.defaultBody);

const typographyClasses = computed(() => {
  const classes = ["r8-typography"];

  if (flow.value !== "regular") {
    classes.push(`r8-typography--${flow.value}`);
  }

  if (measure.value === "reading") {
    classes.push("r8-typography--measure");
  }

  return classes;
});

const bodyClasses = computed(() => {
  const classes = ["r8-text", `r8-text--${size.value}`];

  if (tone.value !== "default") {
    classes.push(`r8-text--${tone.value}`);
  }

  return classes;
});

const helperClasses = computed(() => {
  const classes = ["r8-text", "r8-text--xs", "r8-text--muted"];

  if (flow.value !== "regular") {
    classes.push(`r8-text--${flow.value}`);
  }

  return classes;
});

const headingTag = computed(() => headingLevel.value);

function classAttr(classes: string[]) {
  return classes.length ? ` class="${classes.join(" ")}"` : "";
}

const markup = computed(() => {
  const lines = [`<article${classAttr(typographyClasses.value)}>`,];

  if (showMeta.value) {
    lines.push(`  <small>${strings.value.metaLine}</small>`);
  }

  lines.push(`  <${headingLevel.value}>${resolvedHeading.value}</${headingLevel.value}>`);
  lines.push(`  <p${classAttr(bodyClasses.value)}>${resolvedBody.value}</p>`);
  lines.push("  <ul>");
  lines.push(`    <li>${strings.value.list.first}</li>`);
  lines.push(`    <li>${strings.value.list.second}</li>`);
  lines.push(`    <li>${strings.value.list.third}</li>`);
  lines.push("  </ul>");

  if (showQuote.value) {
    lines.push(`  <blockquote>${strings.value.quoteText}</blockquote>`);
  }

  lines.push("</article>");
  lines.push("");
  lines.push(`<p${classAttr(helperClasses.value)}>${strings.value.helperNote}</p>`);

  return lines.join("\n");
});

function resetPlayground() {
  headingText.value = strings.value.defaultHeading;
  bodyText.value = strings.value.defaultBody;
  headingLevel.value = "h1";
  tone.value = "default";
  size.value = "base";
  flow.value = "regular";
  measure.value = "reading";
  showQuote.value = true;
  showMeta.value = true;
}
</script>

<template>
  <section class="r8-panel docs-typography-playground">
    <div class="r8-panel__header">
      <div class="docs-typography-playground__header">
        <div class="docs-typography-playground__intro">
          <h2 class="r8-panel__title">{{ strings.title }}</h2>
          <p class="docs-panel__meta">{{ strings.copy }}</p>
        </div>

        <button class="r8-btn r8-btn--sm r8-btn--secondary" type="button" @click="resetPlayground">
          {{ strings.resetLabel }}
        </button>
      </div>
    </div>

    <div class="r8-panel__body docs-typography-playground__body">
      <div class="docs-typography-playground__controls">
        <div class="docs-typography-playground__field-grid">
          <label class="r8-field">
            <span class="r8-label">{{ strings.headingField }}</span>
            <input v-model="headingText" class="r8-input" maxlength="64" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.headingLevelField }}</span>
            <DocsControlSelect v-model="headingLevel" :options="headingOptions" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.bodyField }}</span>
            <input v-model="bodyText" class="r8-input" maxlength="160" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.toneField }}</span>
            <DocsControlSelect v-model="tone" :options="toneOptions" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.sizeField }}</span>
            <DocsControlSelect v-model="size" :options="sizeOptions" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.flowField }}</span>
            <DocsControlSelect v-model="flow" :options="flowOptions" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.measureField }}</span>
            <DocsControlSelect v-model="measure" :options="measureOptions" />
          </label>
        </div>

        <div class="docs-typography-playground__toggles">
          <span class="r8-label">{{ strings.extrasLabel }}</span>

          <label class="r8-check">
            <input v-model="showQuote" class="r8-check__input" type="checkbox" />
            <span class="r8-check__box" aria-hidden="true"></span>
            <span class="r8-check__label">{{ strings.quoteLabel }}</span>
          </label>

          <label class="r8-check">
            <input v-model="showMeta" class="r8-check__input" type="checkbox" />
            <span class="r8-check__box" aria-hidden="true"></span>
            <span class="r8-check__label">{{ strings.metaLabel }}</span>
          </label>
        </div>
      </div>

      <div class="docs-demo__stage docs-typography-playground__stage">
        <div class="docs-typography-playground__preview">
          <span class="r8-label">{{ strings.previewLabel }}</span>

          <div class="docs-typography-playground__surface">
            <article :class="typographyClasses">
              <small v-if="showMeta">{{ strings.metaLine }}</small>
              <component :is="headingTag">{{ resolvedHeading }}</component>
              <p :class="bodyClasses">{{ resolvedBody }}</p>
              <ul>
                <li>{{ strings.list.first }}</li>
                <li>{{ strings.list.second }}</li>
                <li>{{ strings.list.third }}</li>
              </ul>
              <blockquote v-if="showQuote">{{ strings.quoteText }}</blockquote>
            </article>

            <p :class="helperClasses">
              {{ strings.helperNote }}
            </p>
          </div>
        </div>

        <p class="docs-demo__stage-copy">
          {{ strings.previewCopy }}
        </p>

        <DocsPlaygroundMarkup
          wrapper-class="docs-typography-playground__markup"
          code-class="docs-typography-playground__code"
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
