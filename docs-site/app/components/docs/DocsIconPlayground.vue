<script setup lang="ts">
const props = defineProps<{
  site: any;
}>();

type IconSource = "textGlyph" | "pointer" | "grab" | "wait" | "disabled" | "inlineSvg";
type IconTone = "default" | "primary" | "dark" | "success" | "warning";
type IconSize = "sm" | "md" | "lg";

const strings = computed(() => props.site.componentPage.iconPlayground);

const iconLabel = ref(props.site.componentPage.iconPlayground.defaultLabel);
const glyphText = ref(props.site.componentPage.iconPlayground.defaultGlyph);
const source = ref<IconSource>("pointer");
const tone = ref<IconTone>("default");
const size = ref<IconSize>("md");
const isDecorative = ref(true);

const sourceOptions = computed(() => [
  { value: "pointer", label: strings.value.options.pointer },
  { value: "grab", label: strings.value.options.grab },
  { value: "wait", label: strings.value.options.wait },
  { value: "disabled", label: strings.value.options.disabled },
  { value: "inlineSvg", label: strings.value.options.inlineSvg },
  { value: "textGlyph", label: strings.value.options.textGlyph },
]);

const toneOptions = computed(() => [
  { value: "default", label: strings.value.options.default },
  { value: "primary", label: strings.value.options.primary },
  { value: "dark", label: strings.value.options.dark },
  { value: "success", label: strings.value.options.success },
  { value: "warning", label: strings.value.options.warning },
]);

const sizeOptions = computed(() => [
  { value: "sm", label: strings.value.options.sm },
  { value: "md", label: strings.value.options.md },
  { value: "lg", label: strings.value.options.lg },
]);

const resolvedLabel = computed(() => iconLabel.value.trim() || strings.value.defaultLabel);
const resolvedGlyph = computed(() => (glyphText.value.trim() || strings.value.defaultGlyph).slice(0, 3).toUpperCase());

const sourceAssetMap: Record<Exclude<IconSource, "textGlyph" | "inlineSvg">, string> = {
  pointer: "/cursors/pointer.png",
  grab: "/cursors/grab.png",
  wait: "/cursors/wait.png",
  disabled: "/cursors/not-allowed.png",
};

const sourceDescriptionMap = computed<Record<IconSource, string>>(() => ({
  pointer: strings.value.sourceDescriptions.pointer,
  grab: strings.value.sourceDescriptions.grab,
  wait: strings.value.sourceDescriptions.wait,
  disabled: strings.value.sourceDescriptions.disabled,
  inlineSvg: strings.value.sourceDescriptions.inlineSvg,
  textGlyph: strings.value.sourceDescriptions.textGlyph,
}));

const sourceAsset = computed(() => {
  if (source.value === "textGlyph" || source.value === "inlineSvg") {
    return "";
  }

  return sourceAssetMap[source.value];
});

const glyphStyle = computed(() => {
  const style: Record<string, string> = {};
  const sizeMap: Record<IconSize, { size: string; fontSize: string }> = {
    sm: { size: "2.5rem", fontSize: "1rem" },
    md: { size: "3rem", fontSize: "1.25rem" },
    lg: { size: "3.75rem", fontSize: "1.5rem" },
  };

  style["--r8-icon-glyph-size"] = sizeMap[size.value].size;
  style["--r8-icon-glyph-font-size"] = sizeMap[size.value].fontSize;

  const toneMap: Record<Exclude<IconTone, "default">, Record<string, string>> = {
    primary: {
      "--r8-icon-glyph-bg": "var(--r8-color-primary-strong)",
      "--r8-icon-glyph-color": "var(--r8-color-primary-contrast)",
      "--r8-icon-glyph-border": "var(--r8-color-border)",
    },
    dark: {
      "--r8-icon-glyph-bg": "var(--r8-color-dark)",
      "--r8-icon-glyph-color": "var(--r8-color-light)",
      "--r8-icon-glyph-border": "var(--r8-color-dark-strong)",
    },
    success: {
      "--r8-icon-glyph-bg": "var(--r8-color-success-strong)",
      "--r8-icon-glyph-color": "var(--r8-color-success-contrast)",
      "--r8-icon-glyph-border": "var(--r8-color-border)",
    },
    warning: {
      "--r8-icon-glyph-bg": "var(--r8-color-warning-strong)",
      "--r8-icon-glyph-color": "var(--r8-color-warning-contrast)",
      "--r8-icon-glyph-border": "var(--r8-color-border)",
    },
  };

  if (tone.value !== "default") {
    Object.assign(style, toneMap[tone.value]);
  }

  return style;
});

const styleMarkup = computed(() => {
  const entries = Object.entries(glyphStyle.value);

  if (!entries.length) {
    return "";
  }

  return ` style="${entries.map(([name, value]) => `${name}: ${value}`).join("; ")}"`;
});

const glyphMarkup = computed(() => {
  if (source.value === "textGlyph") {
    return resolvedGlyph.value;
  }

  if (source.value === "inlineSvg") {
    return [
      `<svg viewBox="0 0 16 16"${
        isDecorative.value ? ' aria-hidden="true"' : ` role="img" aria-label="${resolvedLabel.value}"`
      }>`,
      "  <rect x=\"2\" y=\"2\" width=\"4\" height=\"4\"></rect>",
      "  <rect x=\"10\" y=\"2\" width=\"4\" height=\"4\"></rect>",
      "  <rect x=\"6\" y=\"6\" width=\"4\" height=\"4\"></rect>",
      "  <rect x=\"2\" y=\"10\" width=\"4\" height=\"4\"></rect>",
      "  <rect x=\"10\" y=\"10\" width=\"4\" height=\"4\"></rect>",
      "</svg>",
    ].join("\n");
  }

  const alt = isDecorative.value ? "" : resolvedLabel.value;
  return `<img src="${sourceAsset.value}" alt="${alt}" />`;
});

const markup = computed(() => {
  const glyphAttributes = [`class="r8-icon-tile__glyph"`];

  if (isDecorative.value) {
    glyphAttributes.push('aria-hidden="true"');
  }

  return `<div class="r8-icon-tile">\n  <span ${glyphAttributes.join(" ")}${styleMarkup.value}>\n    ${glyphMarkup.value.replace(/\n/g, "\n    ")}\n  </span>\n  <span class="r8-icon-tile__label">${resolvedLabel.value}</span>\n</div>`;
});

function resetPlayground() {
  iconLabel.value = strings.value.defaultLabel;
  glyphText.value = strings.value.defaultGlyph;
  source.value = "pointer";
  tone.value = "default";
  size.value = "md";
  isDecorative.value = true;
}

function getToggleClass(enabled: boolean) {
  return enabled ? "r8-btn r8-btn--sm r8-btn--secondary" : "r8-btn r8-btn--sm r8-btn--ghost";
}
</script>

<template>
  <section class="r8-panel docs-icon-playground">
    <div class="r8-panel__header">
      <div class="docs-icon-playground__header">
        <div class="docs-icon-playground__intro">
          <h2 class="r8-panel__title">{{ strings.title }}</h2>
          <p class="docs-panel__meta">{{ strings.copy }}</p>
        </div>

        <button class="r8-btn r8-btn--sm r8-btn--secondary" type="button" @click="resetPlayground">
          {{ strings.resetLabel }}
        </button>
      </div>
    </div>

    <div class="r8-panel__body docs-icon-playground__body">
      <div class="docs-icon-playground__controls">
        <div class="docs-icon-playground__field-grid">
          <label class="r8-field">
            <span class="r8-label">{{ strings.labelField }}</span>
            <input v-model="iconLabel" class="r8-input" maxlength="28" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.glyphField }}</span>
            <input v-model="glyphText" class="r8-input" maxlength="3" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.sourceField }}</span>
            <select v-model="source" class="r8-input">
              <option v-for="option in sourceOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
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
            <span class="r8-label">{{ strings.sizeField }}</span>
            <select v-model="size" class="r8-input">
              <option v-for="option in sizeOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </label>
        </div>

        <div class="r8-field">
          <span class="r8-label">{{ strings.accessibilityLabel }}</span>
          <div class="docs-icon-playground__toggles">
            <button
              :class="getToggleClass(isDecorative)"
              type="button"
              :aria-pressed="isDecorative ? 'true' : 'false'"
              @click="isDecorative = !isDecorative"
            >
              {{ strings.decorativeLabel }}
            </button>
          </div>
        </div>
      </div>

      <div class="docs-demo__stage docs-icon-playground__stage">
        <div class="docs-icon-playground__preview">
          <span class="r8-label">{{ strings.previewLabel }}</span>
          <div class="docs-icon-playground__surface">
            <div class="r8-icon-grid">
              <div class="r8-icon-tile">
                <span :style="glyphStyle" class="r8-icon-tile__glyph" :aria-hidden="isDecorative ? 'true' : undefined">
                  <template v-if="source === 'textGlyph'">
                    {{ resolvedGlyph }}
                  </template>
                  <template v-else-if="source === 'inlineSvg'">
                    <svg
                      viewBox="0 0 16 16"
                      :role="isDecorative ? undefined : 'img'"
                      :aria-hidden="isDecorative ? 'true' : undefined"
                      :aria-label="isDecorative ? undefined : resolvedLabel"
                    >
                      <rect x="2" y="2" width="4" height="4"></rect>
                      <rect x="10" y="2" width="4" height="4"></rect>
                      <rect x="6" y="6" width="4" height="4"></rect>
                      <rect x="2" y="10" width="4" height="4"></rect>
                      <rect x="10" y="10" width="4" height="4"></rect>
                    </svg>
                  </template>
                  <template v-else>
                    <img :src="sourceAsset" :alt="isDecorative ? '' : resolvedLabel" />
                  </template>
                </span>
                <span class="r8-icon-tile__label">{{ resolvedLabel }}</span>
              </div>
            </div>
          </div>
        </div>

        <p class="docs-demo__stage-copy">
          {{ sourceDescriptionMap[source] }} {{ strings.previewCopy }}
        </p>

        <div class="docs-icon-playground__markup">
          <span class="r8-label">{{ strings.markupLabel }}</span>
          <pre class="docs-icon-playground__code"><code>{{ markup }}</code></pre>
        </div>
      </div>
    </div>
  </section>
</template>
