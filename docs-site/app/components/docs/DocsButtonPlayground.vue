<script setup lang="ts">
const props = defineProps<{
  site: any;
}>();

type ButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "info"
  | "danger"
  | "dark"
  | "light"
  | "ghost";

type ButtonSize = "sm" | "md" | "lg";

const strings = computed(() => props.site.componentPage.buttonPlayground);

const buttonText = ref(props.site.componentPage.buttonPlayground.defaultText);
const variant = ref<ButtonVariant>("primary");
const size = ref<ButtonSize>("md");
const isActive = ref(false);
const isLoading = ref(false);
const isDisabled = ref(false);
const isBlock = ref(false);

const variantOptions = computed(() => [
  { value: "default", label: strings.value.options.default },
  { value: "primary", label: strings.value.options.primary },
  { value: "secondary", label: strings.value.options.secondary },
  { value: "tertiary", label: strings.value.options.tertiary },
  { value: "success", label: strings.value.options.success },
  { value: "info", label: strings.value.options.info },
  { value: "danger", label: strings.value.options.danger },
  { value: "dark", label: strings.value.options.dark },
  { value: "light", label: strings.value.options.light },
  { value: "ghost", label: strings.value.options.ghost },
]);

const sizeOptions = computed(() => [
  { value: "sm", label: strings.value.options.sm },
  { value: "md", label: strings.value.options.md },
  { value: "lg", label: strings.value.options.lg },
]);

const resolvedButtonText = computed(() => buttonText.value.trim() || strings.value.defaultText);

const renderedClasses = computed(() => {
  const classes = ["r8-btn"];

  if (variant.value !== "default") {
    classes.push(`r8-btn--${variant.value}`);
  }

  if (size.value !== "md") {
    classes.push(`r8-btn--${size.value}`);
  }

  if (isBlock.value) {
    classes.push("r8-btn--block");
  }

  if (isLoading.value) {
    classes.push("is-loading");
  }

  return classes;
});

const markup = computed(() => {
  const attributes = [`class="${renderedClasses.value.join(" ")}"`, 'type="button"'];

  if (isDisabled.value) {
    attributes.push("disabled");
  }

  if (isActive.value) {
    attributes.push('aria-pressed="true"');
  }

  if (isLoading.value) {
    attributes.push('aria-busy="true"');
  }

  const innerMarkup = isLoading.value
    ? `  <span class="r8-btn__spinner" aria-hidden="true"></span>\n  <span>${resolvedButtonText.value}</span>`
    : `  <span>${resolvedButtonText.value}</span>`;

  return `<button ${attributes.join(" ")}>\n${innerMarkup}\n</button>`;
});

function resetPlayground() {
  buttonText.value = strings.value.defaultText;
  variant.value = "primary";
  size.value = "md";
  isActive.value = false;
  isLoading.value = false;
  isDisabled.value = false;
  isBlock.value = false;
}

function getToggleClass(enabled: boolean) {
  return enabled ? "r8-btn r8-btn--sm r8-btn--secondary" : "r8-btn r8-btn--sm r8-btn--ghost";
}
</script>

<template>
  <section class="r8-panel docs-button-playground">
    <div class="r8-panel__header">
      <div class="docs-button-playground__header">
        <div class="docs-button-playground__intro">
          <h2 class="r8-panel__title">{{ strings.title }}</h2>
          <p class="docs-panel__meta">{{ strings.copy }}</p>
        </div>

        <button class="r8-btn r8-btn--sm r8-btn--secondary" type="button" @click="resetPlayground">
          {{ strings.resetLabel }}
        </button>
      </div>
    </div>

    <div class="r8-panel__body docs-button-playground__body">
      <div class="docs-button-playground__controls">
        <div class="docs-button-playground__field-grid">
          <label class="r8-field">
            <span class="r8-label">{{ strings.labelField }}</span>
            <input v-model="buttonText" class="r8-input" maxlength="28" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.variantField }}</span>
            <select v-model="variant" class="r8-input">
              <option v-for="option in variantOptions" :key="option.value" :value="option.value">
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
          <span class="r8-label">{{ strings.statesLabel }}</span>
          <div class="docs-button-playground__toggles">
            <button
              :class="getToggleClass(isActive)"
              type="button"
              :aria-pressed="isActive ? 'true' : 'false'"
              @click="isActive = !isActive"
            >
              {{ strings.activeLabel }}
            </button>
            <button
              :class="getToggleClass(isLoading)"
              type="button"
              :aria-pressed="isLoading ? 'true' : 'false'"
              @click="isLoading = !isLoading"
            >
              {{ strings.loadingLabel }}
            </button>
            <button
              :class="getToggleClass(isDisabled)"
              type="button"
              :aria-pressed="isDisabled ? 'true' : 'false'"
              @click="isDisabled = !isDisabled"
            >
              {{ strings.disabledLabel }}
            </button>
            <button
              :class="getToggleClass(isBlock)"
              type="button"
              :aria-pressed="isBlock ? 'true' : 'false'"
              @click="isBlock = !isBlock"
            >
              {{ strings.blockLabel }}
            </button>
          </div>
        </div>
      </div>

      <div class="docs-demo__stage docs-button-playground__stage">
        <div class="docs-button-playground__preview">
          <span class="r8-label">{{ strings.previewLabel }}</span>
          <div class="docs-button-playground__surface" :class="{ 'docs-button-playground__surface--block': isBlock }">
            <button
              :class="renderedClasses"
              type="button"
              :disabled="isDisabled"
              :aria-pressed="isActive ? 'true' : undefined"
              :aria-busy="isLoading ? 'true' : undefined"
            >
              <span v-if="isLoading" class="r8-btn__spinner" aria-hidden="true" />
              <span>{{ resolvedButtonText }}</span>
            </button>
          </div>
        </div>

        <p class="docs-demo__stage-copy">
          {{ strings.previewCopy }}
        </p>

        <div class="docs-button-playground__markup">
          <span class="r8-label">{{ strings.markupLabel }}</span>
          <pre class="docs-button-playground__code"><code>{{ markup }}</code></pre>
        </div>
      </div>
    </div>
  </section>
</template>
