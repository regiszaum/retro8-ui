<script setup lang="ts">
const props = defineProps<{
  site: any;
}>();

type ConfigTheme = "default" | "night" | "terminal" | "danger";
type ConfigDensity = "regular" | "compact" | "comfortable";
type ConfigAccent = "primary" | "secondary" | "success" | "warning";
type ConfigShell = "defaultShell" | "soft" | "strong";

const strings = computed(() => props.site.componentPage.configProviderPlayground);

const theme = ref<ConfigTheme>("night");
const density = ref<ConfigDensity>("compact");
const accent = ref<ConfigAccent>("primary");
const shell = ref<ConfigShell>("defaultShell");
const showNested = ref(true);

const themeOptions = computed(() => [
  { value: "default", label: strings.value.options.default },
  { value: "night", label: strings.value.options.night },
  { value: "terminal", label: strings.value.options.terminal },
  { value: "danger", label: strings.value.options.danger },
]);

const densityOptions = computed(() => [
  { value: "regular", label: strings.value.options.regular },
  { value: "compact", label: strings.value.options.compact },
  { value: "comfortable", label: strings.value.options.comfortable },
]);

const accentOptions = computed(() => [
  { value: "primary", label: strings.value.options.primary },
  { value: "secondary", label: strings.value.options.secondary },
  { value: "success", label: strings.value.options.success },
  { value: "warning", label: strings.value.options.warning },
]);

const shellOptions = computed(() => [
  { value: "defaultShell", label: strings.value.options.defaultShell },
  { value: "soft", label: strings.value.options.soft },
  { value: "strong", label: strings.value.options.strong },
]);

const providerAttrs = computed(() => {
  const attrs: Record<string, string> = {};

  if (theme.value !== "default") {
    attrs["data-theme"] = theme.value;
  }

  if (density.value !== "regular") {
    attrs["data-density"] = density.value;
  }

  return attrs;
});

const providerStyles = computed(() => {
  const styles: Record<string, string> = {};

  if (accent.value === "secondary") {
    styles["--r8-color-primary"] = "var(--r8-color-secondary)";
    styles["--r8-color-primary-strong"] = "var(--r8-color-secondary-strong)";
    styles["--r8-color-primary-contrast"] = "var(--r8-color-secondary-contrast)";
  }

  if (accent.value === "success") {
    styles["--r8-color-primary"] = "var(--r8-color-success)";
    styles["--r8-color-primary-strong"] = "var(--r8-color-success-strong)";
    styles["--r8-color-primary-contrast"] = "var(--r8-color-success-contrast)";
  }

  if (accent.value === "warning") {
    styles["--r8-color-primary"] = "var(--r8-color-warning)";
    styles["--r8-color-primary-strong"] = "var(--r8-color-warning-strong)";
    styles["--r8-color-primary-contrast"] = "var(--r8-color-warning-contrast)";
  }

  if (shell.value === "soft") {
    styles["--r8-config-provider-surface"] = "var(--r8-color-surface-2)";
    styles["--r8-config-provider-shadow"] = "var(--r8-shadow-sm)";
  }

  if (shell.value === "strong") {
    styles["--r8-config-provider-surface"] = "var(--r8-color-surface-3)";
    styles["--r8-config-provider-shadow"] = "var(--r8-shadow-lg)";
    styles["--r8-config-provider-padding"] = "var(--r8-space-5)";
  }

  return styles;
});

function attrsToString(attrs: Record<string, string>) {
  return Object.entries(attrs)
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");
}

function styleToString(styles: Record<string, string>) {
  return Object.entries(styles)
    .map(([key, value]) => `${key}: ${value}`)
    .join("; ");
}

const markup = computed(() => {
  const attrs = attrsToString(providerAttrs.value);
  const styleString = styleToString(providerStyles.value);
  const openingParts = ['<section class="r8-config-provider"'];

  if (attrs) {
    openingParts.push(attrs);
  }

  if (styleString) {
    openingParts.push(`style="${styleString}"`);
  }

  const lines = [`${openingParts.join(" ")}>`];

  lines.push(`  <span class="r8-badge r8-badge--primary">${strings.value.regions.badge}</span>`);
  lines.push(`  <input class="r8-input" type="text" value="${strings.value.regions.input}" aria-label="${strings.value.regions.input}" />`);
  lines.push("  <div class=\"r8-cluster\">");
  lines.push(`    <button class="r8-btn r8-btn--primary" type="button">${strings.value.regions.primaryAction}</button>`);
  lines.push(`    <button class="r8-btn r8-btn--secondary" type="button">${strings.value.regions.secondaryAction}</button>`);
  lines.push("  </div>");
  lines.push(`  <p class="r8-text r8-text--muted">${strings.value.regions.helper}</p>`);

  if (showNested.value) {
    lines.push("  <section class=\"r8-config-provider\" data-theme=\"danger\" style=\"--r8-color-primary: var(--r8-color-warning); --r8-color-primary-strong: var(--r8-color-warning-strong); --r8-color-primary-contrast: var(--r8-color-warning-contrast);\">");
    lines.push(`    <span class="r8-badge r8-badge--warning">${strings.value.regions.nestedBadge}</span>`);
    lines.push(`    <button class="r8-btn r8-btn--primary" type="button">${strings.value.regions.nestedAction}</button>`);
    lines.push("  </section>");
  }

  lines.push("</section>");

  return lines.join("\n");
});

function resetPlayground() {
  theme.value = "night";
  density.value = "compact";
  accent.value = "primary";
  shell.value = "defaultShell";
  showNested.value = true;
}
</script>

<template>
  <section class="r8-panel docs-config-provider-playground">
    <div class="r8-panel__header">
      <div class="docs-config-provider-playground__header">
        <div class="docs-config-provider-playground__intro">
          <h2 class="r8-panel__title">{{ strings.title }}</h2>
          <p class="docs-panel__meta">{{ strings.copy }}</p>
        </div>

        <button class="r8-btn r8-btn--sm r8-btn--secondary" type="button" @click="resetPlayground">
          {{ strings.resetLabel }}
        </button>
      </div>
    </div>

    <div class="r8-panel__body docs-config-provider-playground__body">
      <div class="docs-config-provider-playground__controls">
        <div class="docs-config-provider-playground__field-grid">
          <label class="r8-field">
            <span class="r8-label">{{ strings.themeField }}</span>
            <select v-model="theme" class="r8-input">
              <option v-for="option in themeOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.densityField }}</span>
            <select v-model="density" class="r8-input">
              <option v-for="option in densityOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.accentField }}</span>
            <select v-model="accent" class="r8-input">
              <option v-for="option in accentOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.shellField }}</span>
            <select v-model="shell" class="r8-input">
              <option v-for="option in shellOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </label>
        </div>

        <label class="r8-check">
          <input v-model="showNested" class="r8-check__input" type="checkbox" />
          <span class="r8-check__box" aria-hidden="true"></span>
          <span class="r8-check__label">{{ strings.nestedLabel }}</span>
        </label>
      </div>

      <div class="docs-demo__stage docs-config-provider-playground__stage">
        <div class="docs-config-provider-playground__preview">
          <span class="r8-label">{{ strings.previewLabel }}</span>

          <div class="docs-config-provider-playground__surface">
            <section class="r8-config-provider" v-bind="providerAttrs" :style="providerStyles">
              <span class="r8-badge r8-badge--primary">{{ strings.regions.badge }}</span>
              <input class="r8-input" type="text" :value="strings.regions.input" :aria-label="strings.regions.input" />
              <div class="r8-cluster">
                <button class="r8-btn r8-btn--primary" type="button">
                  {{ strings.regions.primaryAction }}
                </button>
                <button class="r8-btn r8-btn--secondary" type="button">
                  {{ strings.regions.secondaryAction }}
                </button>
              </div>
              <p class="r8-text r8-text--muted">
                {{ strings.regions.helper }}
              </p>

              <section
                v-if="showNested"
                class="r8-config-provider"
                data-theme="danger"
                style="--r8-color-primary: var(--r8-color-warning); --r8-color-primary-strong: var(--r8-color-warning-strong); --r8-color-primary-contrast: var(--r8-color-warning-contrast);"
              >
                <span class="r8-badge r8-badge--warning">{{ strings.regions.nestedBadge }}</span>
                <button class="r8-btn r8-btn--primary" type="button">
                  {{ strings.regions.nestedAction }}
                </button>
              </section>
            </section>
          </div>
        </div>

        <p class="docs-demo__stage-copy">
          {{ strings.previewCopy }}
        </p>

        <DocsPlaygroundMarkup
          wrapper-class="docs-config-provider-playground__markup"
          code-class="docs-config-provider-playground__code"
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
