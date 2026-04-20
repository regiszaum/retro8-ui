<script setup lang="ts">
const props = defineProps<{
  site: any;
}>();

type BorderTone = "default" | "primary" | "secondary" | "success" | "info" | "danger";
type BorderWidth = "thin" | "thick";
type BorderEdge = "all" | "top" | "end" | "bottom" | "start";

const strings = computed(() => props.site.componentPage.borderPlayground);

const blockTitle = ref(props.site.componentPage.borderPlayground.defaultTitle);
const tone = ref<BorderTone>("primary");
const width = ref<BorderWidth>("thick");
const edge = ref<BorderEdge>("all");
const isGhost = ref(false);

const toneOptions = computed(() => [
  { value: "default", label: strings.value.options.default },
  { value: "primary", label: strings.value.options.primary },
  { value: "secondary", label: strings.value.options.secondary },
  { value: "success", label: strings.value.options.success },
  { value: "info", label: strings.value.options.info },
  { value: "danger", label: strings.value.options.danger },
]);

const widthOptions = computed(() => [
  { value: "thin", label: strings.value.options.thin },
  { value: "thick", label: strings.value.options.thick },
]);

const edgeOptions = computed(() => [
  { value: "all", label: strings.value.options.all },
  { value: "top", label: strings.value.options.top },
  { value: "end", label: strings.value.options.end },
  { value: "bottom", label: strings.value.options.bottom },
  { value: "start", label: strings.value.options.start },
]);

const resolvedTitle = computed(() => blockTitle.value.trim() || strings.value.defaultTitle);

const renderedClassName = computed(() => {
  const classes = ["r8-border-sample"];

  if (width.value === "thin") {
    classes.push("r8-border-sample--thin");
  }

  if (tone.value !== "default") {
    classes.push(`r8-border-sample--${tone.value}`);
  }

  if (edge.value !== "all") {
    classes.push(`r8-border-sample--${edge.value}`);
  }

  if (isGhost.value) {
    classes.push("r8-border-sample--ghost");
  }

  return classes.join(" ");
});

const markup = computed(() => {
  return `<div class="${renderedClassName.value}">\n  <strong>${resolvedTitle.value}</strong>\n  <span>${strings.value.helperCopy}</span>\n</div>`;
});

function resetPlayground() {
  blockTitle.value = strings.value.defaultTitle;
  tone.value = "primary";
  width.value = "thick";
  edge.value = "all";
  isGhost.value = false;
}

function getToggleClass(enabled: boolean) {
  return enabled ? "r8-btn r8-btn--sm r8-btn--secondary" : "r8-btn r8-btn--sm r8-btn--ghost";
}
</script>

<template>
  <section class="r8-panel docs-border-playground">
    <div class="r8-panel__header">
      <div class="docs-border-playground__header">
        <div class="docs-border-playground__intro">
          <h2 class="r8-panel__title">{{ strings.title }}</h2>
          <p class="docs-panel__meta">{{ strings.copy }}</p>
        </div>

        <button class="r8-btn r8-btn--sm r8-btn--secondary" type="button" @click="resetPlayground">
          {{ strings.resetLabel }}
        </button>
      </div>
    </div>

    <div class="r8-panel__body docs-border-playground__body">
      <div class="docs-border-playground__controls">
        <div class="docs-border-playground__field-grid">
          <label class="r8-field">
            <span class="r8-label">{{ strings.labelField }}</span>
            <input v-model="blockTitle" class="r8-input" maxlength="32" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.toneField }}</span>
            <DocsControlSelect v-model="tone" :options="toneOptions" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.widthField }}</span>
            <DocsControlSelect v-model="width" :options="widthOptions" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.edgeField }}</span>
            <DocsControlSelect v-model="edge" :options="edgeOptions" />
          </label>
        </div>

        <div class="r8-field">
          <span class="r8-label">{{ strings.statesLabel }}</span>
          <div class="docs-border-playground__toggles">
            <button
              :class="getToggleClass(isGhost)"
              type="button"
              :aria-pressed="isGhost ? 'true' : 'false'"
              @click="isGhost = !isGhost"
            >
              {{ strings.ghostLabel }}
            </button>
          </div>
        </div>
      </div>

      <div class="docs-demo__stage docs-border-playground__stage">
        <div class="docs-border-playground__preview">
          <span class="r8-label">{{ strings.previewLabel }}</span>
          <div class="docs-border-playground__surface">
            <div :key="renderedClassName" :class="renderedClassName">
              <strong>{{ resolvedTitle }}</strong>
              <span>{{ strings.helperCopy }}</span>
            </div>
          </div>
        </div>

        <p class="docs-demo__stage-copy">
          {{ strings.previewCopy }}
        </p>

        <DocsPlaygroundMarkup
          wrapper-class="docs-border-playground__markup"
          code-class="docs-border-playground__code"
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
