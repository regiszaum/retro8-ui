<script setup lang="ts">
const props = defineProps<{
  site: any;
}>();

type LinkTone = "default" | "secondary" | "tertiary" | "success" | "warning" | "info" | "danger" | "dark" | "muted";
type LinkOpacity = "100" | "75" | "50";
type UnderlineMode = "hover" | "always" | "soft";
type UnderlineOffset = "default" | "relaxed" | "wide";

const strings = computed(() => props.site.componentPage.linkPlayground);

const linkText = ref(props.site.componentPage.linkPlayground.defaultText);
const tone = ref<LinkTone>("default");
const opacity = ref<LinkOpacity>("100");
const underlineMode = ref<UnderlineMode>("hover");
const underlineOffset = ref<UnderlineOffset>("default");
const isDisabled = ref(false);
const isExternal = ref(false);

const toneOptions = computed(() => [
  { value: "default", label: strings.value.options.default },
  { value: "secondary", label: strings.value.options.secondary },
  { value: "tertiary", label: strings.value.options.tertiary },
  { value: "success", label: strings.value.options.success },
  { value: "warning", label: strings.value.options.warning },
  { value: "info", label: strings.value.options.info },
  { value: "danger", label: strings.value.options.danger },
  { value: "dark", label: strings.value.options.dark },
  { value: "muted", label: strings.value.options.muted },
]);

const opacityOptions = computed(() => [
  { value: "100", label: strings.value.options.opacity100 },
  { value: "75", label: strings.value.options.opacity75 },
  { value: "50", label: strings.value.options.opacity50 },
]);

const underlineModeOptions = computed(() => [
  { value: "hover", label: strings.value.options.hover },
  { value: "always", label: strings.value.options.always },
  { value: "soft", label: strings.value.options.soft },
]);

const underlineOffsetOptions = computed(() => [
  { value: "default", label: strings.value.options.offsetDefault },
  { value: "relaxed", label: strings.value.options.offsetRelaxed },
  { value: "wide", label: strings.value.options.offsetWide },
]);

const resolvedText = computed(() => linkText.value.trim() || strings.value.defaultText);

const renderedClassName = computed(() => {
  const classes = ["r8-link"];

  if (tone.value !== "default") {
    classes.push(`r8-link--${tone.value}`);
  }

  if (underlineMode.value === "always") {
    classes.push("r8-link--underline");
  }

  if (opacity.value === "75") {
    classes.push("r8-link--quiet");
  }

  return classes.join(" ");
});

const linkStyles = computed(() => {
  const styles: Record<string, string> = {};

  if (opacity.value === "50") {
    styles["--r8-link-opacity"] = "0.5";
    styles["--r8-link-hover-opacity"] = "1";
  }

  if (underlineMode.value === "soft") {
    styles["--r8-link-underline-opacity"] = "40%";
    styles["--r8-link-hover-underline-opacity"] = "100%";
  }

  const offsetMap: Record<UnderlineOffset, string> = {
    default: "0.18em",
    relaxed: "0.28em",
    wide: "0.38em",
  };

  if (underlineOffset.value !== "default") {
    styles["--r8-link-underline-offset"] = offsetMap[underlineOffset.value];
  }

  return styles;
});

const markup = computed(() => {
  const attributes = [`class="${renderedClassName.value}"`];
  const styleEntries = Object.entries(linkStyles.value);

  if (!isDisabled.value) {
    attributes.push('href="/docs"');
  }

  if (styleEntries.length) {
    attributes.push(`style="${styleEntries.map(([name, value]) => `${name}: ${value}`).join("; ")}"`);
  }

  if (isExternal.value && !isDisabled.value) {
    attributes.push('target="_blank"');
    attributes.push('rel="noreferrer noopener"');
  }

  if (isDisabled.value) {
    attributes.push('aria-disabled="true"');
  }

  return `<a ${attributes.join(" ")}>${resolvedText.value}</a>`;
});

function resetPlayground() {
  linkText.value = strings.value.defaultText;
  tone.value = "default";
  opacity.value = "100";
  underlineMode.value = "hover";
  underlineOffset.value = "default";
  isDisabled.value = false;
  isExternal.value = false;
}

function getToggleClass(enabled: boolean) {
  return enabled ? "r8-btn r8-btn--sm r8-btn--secondary" : "r8-btn r8-btn--sm r8-btn--ghost";
}
</script>

<template>
  <section class="r8-panel docs-link-playground">
    <div class="r8-panel__header">
      <div class="docs-link-playground__header">
        <div class="docs-link-playground__intro">
          <h2 class="r8-panel__title">{{ strings.title }}</h2>
          <p class="docs-panel__meta">{{ strings.copy }}</p>
        </div>

        <button class="r8-btn r8-btn--sm r8-btn--secondary" type="button" @click="resetPlayground">
          {{ strings.resetLabel }}
        </button>
      </div>
    </div>

    <div class="r8-panel__body docs-link-playground__body">
      <div class="docs-link-playground__controls">
        <div class="docs-link-playground__field-grid">
          <label class="r8-field">
            <span class="r8-label">{{ strings.labelField }}</span>
            <input v-model="linkText" class="r8-input" maxlength="32" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.toneField }}</span>
            <select v-model="tone" class="r8-input">
              <option v-for="option in toneOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.opacityField }}</span>
            <select v-model="opacity" class="r8-input">
              <option v-for="option in opacityOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.underlineField }}</span>
            <select v-model="underlineMode" class="r8-input">
              <option v-for="option in underlineModeOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.offsetField }}</span>
            <select v-model="underlineOffset" class="r8-input">
              <option v-for="option in underlineOffsetOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </label>
        </div>

        <div class="r8-field">
          <span class="r8-label">{{ strings.statesLabel }}</span>
          <div class="docs-link-playground__toggles">
            <button
              :class="getToggleClass(isDisabled)"
              type="button"
              :aria-pressed="isDisabled ? 'true' : 'false'"
              @click="isDisabled = !isDisabled"
            >
              {{ strings.disabledLabel }}
            </button>
            <button
              :class="getToggleClass(isExternal)"
              type="button"
              :aria-pressed="isExternal ? 'true' : 'false'"
              @click="isExternal = !isExternal"
            >
              {{ strings.externalLabel }}
            </button>
          </div>
        </div>
      </div>

      <div class="docs-demo__stage docs-link-playground__stage">
        <div class="docs-link-playground__preview">
          <span class="r8-label">{{ strings.previewLabel }}</span>
          <div class="docs-link-playground__surface">
            <p class="r8-text">
              {{ strings.contextPrefix }}
              <a
                :class="renderedClassName"
                :style="linkStyles"
                :href="isDisabled ? undefined : '/docs'"
                :target="isExternal && !isDisabled ? '_blank' : undefined"
                :rel="isExternal && !isDisabled ? 'noreferrer noopener' : undefined"
                :aria-disabled="isDisabled ? 'true' : undefined"
              >
                {{ resolvedText }}
              </a>
              {{ strings.contextSuffix }}
            </p>
          </div>
        </div>

        <p class="docs-demo__stage-copy">
          {{ strings.previewCopy }}
        </p>

        <div class="docs-link-playground__markup">
          <span class="r8-label">{{ strings.markupLabel }}</span>
          <pre class="docs-link-playground__code"><code>{{ markup }}</code></pre>
        </div>
      </div>
    </div>
  </section>
</template>
