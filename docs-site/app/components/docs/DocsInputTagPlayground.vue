<script setup lang="ts">
const props = defineProps<{
  site: any;
}>();

type InputTagSize = "sm" | "md" | "lg";
type Retro8Runtime = {
  init?: (root?: Document | HTMLElement) => unknown;
};

const strings = computed(() => props.site.componentPage.inputTagPlayground);

const previewSurface = ref<HTMLElement | null>(null);
const listenersBound = ref(false);

const placeholderText = ref(strings.value.defaultPlaceholder);
const maxTags = ref(5);
const delimiters = ref(",;");
const size = ref<InputTagSize>("md");
const clearable = ref(true);
const disabled = ref(false);
const tags = ref<string[]>([strings.value.initialTags.first, strings.value.initialTags.second]);
const seedTags = ref<string[]>([strings.value.initialTags.first, strings.value.initialTags.second]);
const eventLog = ref<string[]>([strings.value.eventIdle]);

const sizeOptions = computed(() => [
  { value: "sm", label: strings.value.options.sm },
  { value: "md", label: strings.value.options.md },
  { value: "lg", label: strings.value.options.lg },
]);

const resolvedPlaceholder = computed(() => placeholderText.value.trim() || strings.value.defaultPlaceholder);
const previewKey = computed(() =>
  [resolvedPlaceholder.value, maxTags.value, delimiters.value, size.value, clearable.value ? "clear" : "plain", disabled.value ? "disabled" : "enabled"].join(":"),
);

const markup = computed(() => {
  const attrs = ['class="r8-input-tag"', `data-r8-size="${size.value}"`, `data-r8-max-tags="${maxTags.value}"`];
  if (delimiters.value.trim()) {
    attrs.push(`data-r8-delimiters="${escapeAttribute(delimiters.value.trim())}"`);
  }
  if (clearable.value) {
    attrs.push('data-r8-clearable="true"');
  }

  const chips = tags.value
    .map(
      (tag) =>
        `  <span class="r8-input-tag__tag"><span class="r8-input-tag__label">${escapeHtml(tag)}</span><button class="r8-input-tag__remove" type="button" aria-label="Remove ${escapeAttribute(tag)}">x</button></span>`,
    )
    .join("\n");

  return `<div ${attrs.join(" ")}>\n${chips}\n  <input class="r8-input-tag__input" type="text" placeholder="${escapeAttribute(resolvedPlaceholder.value)}"${disabled.value ? " disabled" : ""} />\n</div>`;
});

function escapeAttribute(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

function resetPlayground() {
  placeholderText.value = strings.value.defaultPlaceholder;
  maxTags.value = 5;
  delimiters.value = ",;";
  size.value = "md";
  clearable.value = true;
  disabled.value = false;
  seedTags.value = [strings.value.initialTags.first, strings.value.initialTags.second];
  tags.value = [...seedTags.value];
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

  previewSurface.value.addEventListener("r8:input-tag-add", (event) => {
    const detail = ((event as CustomEvent).detail || {}) as Record<string, unknown>;
    tags.value = Array.isArray(detail.values) ? detail.values.map(String) : tags.value;
    appendEvent(`add: ${detail.value ?? ""}`);
  });

  previewSurface.value.addEventListener("r8:input-tag-remove", (event) => {
    const detail = ((event as CustomEvent).detail || {}) as Record<string, unknown>;
    tags.value = Array.isArray(detail.values) ? detail.values.map(String) : tags.value;
    appendEvent(`remove: ${detail.value ?? ""}`);
  });

  previewSurface.value.addEventListener("r8:input-tag-clear", () => {
    tags.value = [];
    appendEvent("clear-all");
  });

  previewSurface.value.addEventListener("r8:input-tag-change", (event) => {
    const detail = ((event as CustomEvent).detail || {}) as Record<string, unknown>;
    if (Array.isArray(detail.values)) {
      tags.value = detail.values.map(String);
    }
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

watch([placeholderText, maxTags, delimiters, size, clearable, disabled], async () => {
  tags.value = [...seedTags.value];
  eventLog.value = [strings.value.eventIdle];
  await nextTick();
  initPreviewRuntime();
});

onMounted(async () => {
  await nextTick();
  initPreviewRuntime();
});
</script>

<template>
  <section class="r8-panel docs-input-tag-playground">
    <div class="r8-panel__header">
      <div class="docs-input-tag-playground__header">
        <div class="docs-input-tag-playground__intro">
          <h2 class="r8-panel__title">{{ strings.title }}</h2>
          <p class="docs-panel__meta">{{ strings.copy }}</p>
        </div>

        <button class="r8-btn r8-btn--sm r8-btn--secondary" type="button" @click="resetPlayground">
          {{ strings.resetLabel }}
        </button>
      </div>
    </div>

    <div class="r8-panel__body docs-input-tag-playground__body">
      <div class="docs-input-tag-playground__controls">
        <div class="docs-input-tag-playground__field-grid">
          <label class="r8-field">
            <span class="r8-label">{{ strings.placeholderField }}</span>
            <input v-model="placeholderText" class="r8-input" maxlength="36" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.maxTagsField }}</span>
            <input v-model.number="maxTags" class="r8-input" type="number" min="1" max="12" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.delimitersField }}</span>
            <input v-model="delimiters" class="r8-input" maxlength="6" />
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
          <div class="docs-input-tag-playground__toggles">
            <button :class="getToggleClass(clearable)" type="button" :aria-pressed="clearable ? 'true' : 'false'" @click="clearable = !clearable">
              {{ strings.clearableLabel }}
            </button>
            <button :class="getToggleClass(disabled)" type="button" :aria-pressed="disabled ? 'true' : 'false'" @click="disabled = !disabled">
              {{ strings.disabledLabel }}
            </button>
          </div>
        </div>
      </div>

      <div class="docs-demo__stage docs-input-tag-playground__stage">
        <div class="docs-input-tag-playground__preview">
          <span class="r8-label">{{ strings.previewLabel }}</span>
          <div ref="previewSurface" class="docs-input-tag-playground__surface">
            <div
              :key="previewKey"
              class="r8-input-tag"
              :data-r8-size="size"
              :data-r8-max-tags="maxTags"
              :data-r8-delimiters="delimiters.trim() || null"
              :data-r8-clearable="clearable ? 'true' : null"
            >
              <span
                v-for="tag in seedTags"
                :key="`${previewKey}-${tag}`"
                class="r8-input-tag__tag"
              >
                <span class="r8-input-tag__label">{{ tag }}</span>
                <button class="r8-input-tag__remove" type="button" :aria-label="`Remove ${tag}`">x</button>
              </span>
              <input class="r8-input-tag__input" type="text" :placeholder="resolvedPlaceholder" :disabled="disabled" />
            </div>
          </div>
          <p class="r8-help">{{ strings.helperCopy }}</p>
        </div>

        <p class="docs-demo__stage-copy">
          {{ strings.previewCopy }}
        </p>

        <div class="docs-input-tag-playground__events">
          <span class="r8-label">{{ strings.eventsLabel }}</span>
          <div class="docs-input-tag-playground__event-log">
            <p v-for="(entry, index) in eventLog" :key="`${index}-${entry}`" class="r8-text r8-text--xs r8-text--muted">
              {{ entry }}
            </p>
          </div>
        </div>

        <div class="docs-input-tag-playground__markup">
          <span class="r8-label">{{ strings.markupLabel }}</span>
          <pre class="docs-input-tag-playground__code"><code>{{ markup }}</code></pre>
        </div>
      </div>
    </div>
  </section>
</template>
