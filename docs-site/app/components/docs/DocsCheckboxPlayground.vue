<script setup lang="ts">
const props = defineProps<{
  site: any;
}>();

type CheckboxSize = "sm" | "md" | "lg";
type Retro8Runtime = {
  init?: (root?: Document | HTMLElement) => unknown;
};

const strings = computed(() => props.site.componentPage.checkboxPlayground);

const previewSurface = ref<HTMLElement | null>(null);
const boundCheckbox = ref<HTMLElement | null>(null);

const labelText = ref(strings.value.defaultLabel);
const size = ref<CheckboxSize>("md");
const isChecked = ref(true);
const isIndeterminate = ref(false);
const isDisabled = ref(false);
const isBordered = ref(false);
const eventLog = ref<string[]>([strings.value.eventIdle]);

const sizeOptions = computed(() => [
  { value: "sm", label: strings.value.options.sm },
  { value: "md", label: strings.value.options.md },
  { value: "lg", label: strings.value.options.lg },
]);

const resolvedLabelText = computed(() => labelText.value.trim() || strings.value.defaultLabel);

const renderedClasses = computed(() => {
  const classes = ["r8-checkbox"];

  if (size.value !== "md") {
    classes.push(`r8-checkbox--${size.value}`);
  }

  if (isBordered.value) {
    classes.push("r8-checkbox--bordered");
  }

  if (isDisabled.value) {
    classes.push("is-disabled");
  }

  if (isIndeterminate.value) {
    classes.push("is-indeterminate");
  } else if (isChecked.value) {
    classes.push("is-checked");
  }

  return classes;
});

const checkboxAttrs = computed(() => {
  const attrs: Record<string, string> = {};

  if (size.value !== "md") {
    attrs["data-r8-size"] = size.value;
  }

  if (isBordered.value) {
    attrs["data-r8-border"] = "true";
  }

  if (isDisabled.value) {
    attrs["aria-disabled"] = "true";
  }

  if (isIndeterminate.value) {
    attrs["data-r8-indeterminate"] = "true";
    attrs["aria-checked"] = "mixed";
  } else {
    attrs["aria-checked"] = isChecked.value ? "true" : "false";
  }

  return attrs;
});

const previewKey = computed(() =>
  [
    labelText.value,
    size.value,
    isChecked.value ? "checked" : "unchecked",
    isIndeterminate.value ? "mixed" : "solid",
    isDisabled.value ? "disabled" : "enabled",
    isBordered.value ? "bordered" : "plain",
  ].join(":"),
);

const markup = computed(() => {
  const attributes = ['class="r8-checkbox"'];

  if (size.value !== "md") {
    attributes.push(`data-r8-size="${size.value}"`);
  }

  if (isBordered.value) {
    attributes.push('data-r8-border="true"');
  }

  if (isDisabled.value) {
    attributes.push('aria-disabled="true"');
  }

  if (isIndeterminate.value) {
    attributes.push('data-r8-indeterminate="true"');
    attributes.push('aria-checked="mixed"');
  } else if (isChecked.value) {
    attributes.push('aria-checked="true"');
  }

  return `<label ${attributes.join(" ")}>\n  <span class="r8-checkbox__box" aria-hidden="true"></span>\n  <span>${resolvedLabelText.value}</span>\n</label>`;
});

function formatEventLine(detail: Record<string, unknown>) {
  const stateLabel =
    detail.indeterminate === true
      ? strings.value.mixedState
      : detail.checked === true
        ? strings.value.checkedState
        : strings.value.uncheckedState;

  return `binary-change: ${stateLabel}`;
}

function bindPreviewEvents() {
  const checkbox = previewSurface.value?.querySelector(".r8-checkbox");

  if (!(checkbox instanceof HTMLElement) || boundCheckbox.value === checkbox) {
    return;
  }

  boundCheckbox.value = checkbox;

  checkbox.addEventListener("r8:binary-change", (event) => {
    const detail = ((event as CustomEvent).detail || {}) as Record<string, unknown>;

    isChecked.value = detail.checked === true;
    isIndeterminate.value = detail.indeterminate === true;
    eventLog.value = [formatEventLine(detail), ...eventLog.value].slice(0, 5);
  });
}

function initPreviewRuntime() {
  if (!import.meta.client || !previewSurface.value) {
    return;
  }

  boundCheckbox.value = null;
  const runtime = (window as typeof window & { Retro8UI?: Retro8Runtime }).Retro8UI;
  runtime?.init?.(previewSurface.value);
  bindPreviewEvents();
}

function resetPlayground() {
  labelText.value = strings.value.defaultLabel;
  size.value = "md";
  isChecked.value = true;
  isIndeterminate.value = false;
  isDisabled.value = false;
  isBordered.value = false;
  eventLog.value = [strings.value.eventIdle];
}

function toggleChecked() {
  const next = !isChecked.value;
  isChecked.value = next;

  if (next && isIndeterminate.value) {
    isIndeterminate.value = false;
  }
}

function toggleIndeterminate() {
  const next = !isIndeterminate.value;
  isIndeterminate.value = next;

  if (next) {
    isChecked.value = false;
  }
}

function getToggleClass(enabled: boolean) {
  return enabled ? "r8-btn r8-btn--sm r8-btn--secondary" : "r8-btn r8-btn--sm r8-btn--ghost";
}

onMounted(async () => {
  await nextTick();
  initPreviewRuntime();
});

watch([labelText, size, isChecked, isIndeterminate, isDisabled, isBordered], async () => {
  await nextTick();
  initPreviewRuntime();
});
</script>

<template>
  <section class="r8-panel docs-checkbox-playground">
    <div class="r8-panel__header">
      <div class="docs-checkbox-playground__header">
        <div class="docs-checkbox-playground__intro">
          <h2 class="r8-panel__title">{{ strings.title }}</h2>
          <p class="docs-panel__meta">{{ strings.copy }}</p>
        </div>

        <button class="r8-btn r8-btn--sm r8-btn--secondary" type="button" @click="resetPlayground">
          {{ strings.resetLabel }}
        </button>
      </div>
    </div>

    <div class="r8-panel__body docs-checkbox-playground__body">
      <div class="docs-checkbox-playground__controls">
        <div class="docs-checkbox-playground__field-grid">
          <label class="r8-field">
            <span class="r8-label">{{ strings.labelField }}</span>
            <input v-model="labelText" class="r8-input" maxlength="32" />
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
          <div class="docs-checkbox-playground__toggles">
            <button
              :class="getToggleClass(isChecked)"
              type="button"
              :aria-pressed="isChecked ? 'true' : 'false'"
              @click="toggleChecked"
            >
              {{ strings.checkedLabel }}
            </button>
            <button
              :class="getToggleClass(isIndeterminate)"
              type="button"
              :aria-pressed="isIndeterminate ? 'true' : 'false'"
              @click="toggleIndeterminate"
            >
              {{ strings.indeterminateLabel }}
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
              :class="getToggleClass(isBordered)"
              type="button"
              :aria-pressed="isBordered ? 'true' : 'false'"
              @click="isBordered = !isBordered"
            >
              {{ strings.borderedLabel }}
            </button>
          </div>
        </div>
      </div>

      <div class="docs-demo__stage docs-checkbox-playground__stage">
        <div class="docs-checkbox-playground__preview">
          <span class="r8-label">{{ strings.previewLabel }}</span>

          <div ref="previewSurface" class="docs-checkbox-playground__surface">
            <label :key="previewKey" :class="renderedClasses" v-bind="checkboxAttrs">
              <span class="r8-checkbox__box" aria-hidden="true"></span>
              <span>{{ resolvedLabelText }}</span>
            </label>

            <p class="r8-text r8-text--muted docs-checkbox-playground__helper">
              {{ strings.helperCopy }}
            </p>
          </div>
        </div>

        <p class="docs-demo__stage-copy">
          {{ strings.previewCopy }}
        </p>

        <div class="docs-checkbox-playground__events">
          <span class="r8-label">{{ strings.eventsLabel }}</span>
          <div class="docs-checkbox-playground__event-log">
            <p v-for="(entry, index) in eventLog" :key="`${index}-${entry}`" class="r8-text r8-text--muted">
              {{ entry }}
            </p>
          </div>
        </div>

        <div class="docs-checkbox-playground__markup">
          <span class="r8-label">{{ strings.markupLabel }}</span>
          <pre class="docs-checkbox-playground__code"><code>{{ markup }}</code></pre>
        </div>
      </div>
    </div>
  </section>
</template>
