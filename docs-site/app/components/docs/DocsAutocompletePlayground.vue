<script setup lang="ts">
const props = defineProps<{
  site: any;
}>();

type AutocompleteBehavior = "focus" | "typing";

type Retro8Runtime = {
  init?: (root?: Document | HTMLElement) => unknown;
};

const strings = computed(() => props.site.componentPage.autocompletePlayground);

const previewSurface = ref<HTMLElement | null>(null);
const boundAutocomplete = ref<HTMLElement | null>(null);

const behavior = ref<AutocompleteBehavior>("focus");
const isClearable = ref(true);
const isLoading = ref(false);
const hasRichOptions = ref(true);
const eventLog = ref<string[]>([]);

const behaviorOptions = computed(() => [
  { value: "focus", label: strings.value.options.focus },
  { value: "typing", label: strings.value.options.typing },
]);

const suggestions = computed(() => [
  {
    value: strings.value.suggestions.first,
    search: "pix-07 vanguard scout recon pilot",
    meta: strings.value.suggestions.firstMeta,
  },
  {
    value: strings.value.suggestions.second,
    search: "pix-11 sentinel support command relay",
    meta: strings.value.suggestions.secondMeta,
  },
  {
    value: strings.value.suggestions.third,
    search: "pix-12 striker assault breach frontline",
    meta: strings.value.suggestions.thirdMeta,
  },
  {
    value: strings.value.suggestions.fourth,
    search: "pix-21 oracle intel analyst routes",
    meta: strings.value.suggestions.fourthMeta,
  },
]);

const autocompleteAttrs = computed(() => {
  const attrs: Record<string, string> = {
    "data-r8-empty-label": strings.value.emptyLabel,
    "data-r8-loading-label": strings.value.loadingText,
  };

  if (behavior.value === "typing") {
    attrs["data-r8-trigger-on-focus"] = "false";
  }

  if (isClearable.value) {
    attrs["data-r8-clearable"] = "true";
  }

  if (isLoading.value) {
    attrs["data-r8-loading"] = "true";
  }

  return attrs;
});

const previewKey = computed(() =>
  [behavior.value, isClearable.value ? "clear" : "noclear", isLoading.value ? "loading" : "ready", hasRichOptions.value ? "rich" : "plain"].join(":"),
);

const markup = computed(() => {
  const attributes = ['class="r8-autocomplete"'];

  Object.entries(autocompleteAttrs.value).forEach(([name, value]) => {
    attributes.push(`${name}="${value}"`);
  });

  const lines = [`<div ${attributes.join(" ")}>`];

  lines.push('  <div class="r8-autocomplete__trigger">');
  lines.push(
    `    <input class="r8-autocomplete__input" type="text" placeholder="${strings.value.placeholder}" aria-label="${strings.value.placeholder}" />`,
  );

  if (isClearable.value) {
    lines.push(`    <button class="r8-autocomplete__clear" type="button" aria-label="${strings.value.clearButtonLabel}">X</button>`);
  }

  lines.push(`    <span class="r8-badge" data-r8-autocomplete-count>${isLoading.value ? 0 : suggestions.value.length}</span>`);
  lines.push("  </div>");
  lines.push("");
  lines.push('  <div class="r8-autocomplete__menu" hidden>');

  suggestions.value.forEach((option) => {
    if (hasRichOptions.value) {
      lines.push(`    <div class="r8-autocomplete__option" data-r8-value="${option.value}" data-r8-search="${option.search}">`);
      lines.push(`      <strong>${option.value}</strong>`);
      lines.push(`      <p class="r8-text r8-text--xs r8-text--muted">${option.meta}</p>`);
      lines.push("    </div>");
      return;
    }

    lines.push(`    <div class="r8-autocomplete__option" data-r8-value="${option.value}" data-r8-search="${option.search}">${option.value}</div>`);
  });

  lines.push(`    <div class="r8-autocomplete__empty" hidden>${strings.value.emptyLabel}</div>`);
  lines.push(`    <div class="r8-autocomplete__loading" hidden>${strings.value.loadingText}</div>`);
  lines.push("  </div>");
  lines.push("</div>");

  return lines.join("\n");
});

function formatEventLine(eventName: string, detail: Record<string, unknown>) {
  if (eventName === "clear") {
    return `clear: ${strings.value.clearEventText}`;
  }

  const value = typeof detail.value === "string" && detail.value ? detail.value : typeof detail.text === "string" ? detail.text : "n/a";
  return `${eventName}: ${value}`;
}

function bindPreviewEvents() {
  const autocomplete = previewSurface.value?.querySelector(".r8-autocomplete");

  if (!(autocomplete instanceof HTMLElement) || boundAutocomplete.value === autocomplete) {
    return;
  }

  boundAutocomplete.value = autocomplete;
  eventLog.value = [strings.value.eventIdle];

  autocomplete.addEventListener("r8:autocomplete-select", (event) => {
    const detail = (event as CustomEvent).detail || {};
    eventLog.value = [formatEventLine("select", detail), ...eventLog.value].slice(0, 5);
  });

  autocomplete.addEventListener("r8:autocomplete-clear", (event) => {
    const detail = (event as CustomEvent).detail || {};
    eventLog.value = [formatEventLine("clear", detail), ...eventLog.value].slice(0, 5);
  });

  autocomplete.addEventListener("r8:choice-change", (event) => {
    const detail = (event as CustomEvent).detail || {};
    eventLog.value = [formatEventLine("choice-change", detail), ...eventLog.value].slice(0, 5);
  });
}

function initPreviewRuntime() {
  if (!import.meta.client || !previewSurface.value) {
    return;
  }

  boundAutocomplete.value = null;
  const runtime = (window as typeof window & { Retro8UI?: Retro8Runtime }).Retro8UI;
  runtime?.init?.(previewSurface.value);
  bindPreviewEvents();
}

function resetPlayground() {
  behavior.value = "focus";
  isClearable.value = true;
  isLoading.value = false;
  hasRichOptions.value = true;
  eventLog.value = [strings.value.eventIdle];
}

function getToggleClass(enabled: boolean) {
  return enabled ? "r8-btn r8-btn--sm r8-btn--secondary" : "r8-btn r8-btn--sm r8-btn--ghost";
}

onMounted(async () => {
  await nextTick();
  initPreviewRuntime();
});

watch([behavior, isClearable, isLoading, hasRichOptions], async () => {
  await nextTick();
  initPreviewRuntime();
});
</script>

<template>
  <section class="r8-panel docs-autocomplete-playground">
    <div class="r8-panel__header">
      <div class="docs-autocomplete-playground__header">
        <div class="docs-autocomplete-playground__intro">
          <h2 class="r8-panel__title">{{ strings.title }}</h2>
          <p class="docs-panel__meta">{{ strings.copy }}</p>
        </div>

        <button class="r8-btn r8-btn--sm r8-btn--secondary" type="button" @click="resetPlayground">
          {{ strings.resetLabel }}
        </button>
      </div>
    </div>

    <div class="r8-panel__body docs-autocomplete-playground__body">
      <div class="docs-autocomplete-playground__controls">
        <div class="docs-autocomplete-playground__field-grid">
          <label class="r8-field">
            <span class="r8-label">{{ strings.behaviorField }}</span>
            <DocsControlSelect v-model="behavior" :options="behaviorOptions" />
          </label>
        </div>

        <div class="r8-field">
          <span class="r8-label">{{ strings.statesLabel }}</span>
          <div class="docs-autocomplete-playground__toggles">
            <button
              :class="getToggleClass(isClearable)"
              type="button"
              :aria-pressed="isClearable ? 'true' : 'false'"
              @click="isClearable = !isClearable"
            >
              {{ strings.clearableLabel }}
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
              :class="getToggleClass(hasRichOptions)"
              type="button"
              :aria-pressed="hasRichOptions ? 'true' : 'false'"
              @click="hasRichOptions = !hasRichOptions"
            >
              {{ strings.richLabel }}
            </button>
          </div>
        </div>
      </div>

      <div class="docs-demo__stage docs-autocomplete-playground__stage">
        <div class="docs-autocomplete-playground__preview">
          <span class="r8-label">{{ strings.previewLabel }}</span>

          <div ref="previewSurface" class="docs-autocomplete-playground__surface">
            <div :key="previewKey" class="r8-autocomplete" v-bind="autocompleteAttrs">
              <div class="r8-autocomplete__trigger">
                <input
                  class="r8-autocomplete__input"
                  type="text"
                  :placeholder="strings.placeholder"
                  :aria-label="strings.placeholder"
                />
                <button
                  v-if="isClearable"
                  class="r8-autocomplete__clear"
                  type="button"
                  :aria-label="strings.clearButtonLabel"
                >
                  X
                </button>
                <span class="r8-badge" data-r8-autocomplete-count>{{ isLoading ? 0 : suggestions.length }}</span>
              </div>

              <div class="r8-autocomplete__menu" hidden>
                <template v-for="option in suggestions" :key="option.value">
                  <div
                    v-if="hasRichOptions"
                    class="r8-autocomplete__option"
                    :data-r8-value="option.value"
                    :data-r8-search="option.search"
                  >
                    <strong>{{ option.value }}</strong>
                    <p class="r8-text r8-text--xs r8-text--muted">{{ option.meta }}</p>
                  </div>
                  <div
                    v-else
                    class="r8-autocomplete__option"
                    :data-r8-value="option.value"
                    :data-r8-search="option.search"
                  >
                    {{ option.value }}
                  </div>
                </template>

                <div class="r8-autocomplete__empty" hidden>{{ strings.emptyLabel }}</div>
                <div class="r8-autocomplete__loading" hidden>{{ strings.loadingText }}</div>
              </div>
            </div>
          </div>
        </div>

        <p class="docs-demo__stage-copy">
          {{ strings.previewCopy }}
        </p>

        <div class="docs-autocomplete-playground__events">
          <span class="r8-label">{{ strings.eventsLabel }}</span>
          <div class="docs-autocomplete-playground__event-log">
            <p v-for="(entry, index) in eventLog" :key="`${index}-${entry}`" class="r8-text r8-text--muted">
              {{ entry }}
            </p>
          </div>
        </div>

        <DocsPlaygroundMarkup
          wrapper-class="docs-autocomplete-playground__markup"
          code-class="docs-autocomplete-playground__code"
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
