<script setup lang="ts">
const props = defineProps<{
  site: any;
}>();

type CascaderTriggerMode = "click" | "hover";

type Retro8Runtime = {
  init?: (root?: Document | HTMLElement) => unknown;
};

const strings = computed(() => props.site.componentPage.cascaderPlayground);

const previewSurface = ref<HTMLElement | null>(null);
const boundCascader = ref<HTMLElement | null>(null);

const triggerMode = ref<CascaderTriggerMode>("click");
const separator = ref(" / ");
const filterPlaceholder = ref(strings.value.filterPlaceholder);
const isFilterable = ref(true);
const isClearable = ref(true);
const isStrict = ref(false);
const isCompactTrigger = ref(false);
const eventLog = ref<string[]>([]);

const triggerOptions = computed(() => [
  { value: "click", label: strings.value.options.click },
  { value: "hover", label: strings.value.options.hover },
]);

const resolvedSeparator = computed(() => separator.value || " / ");

const initialTriggerText = computed(() =>
  isCompactTrigger.value ? "Hangar 09" : `Solaris${resolvedSeparator.value}Gamma Gate${resolvedSeparator.value}Hangar 09`,
);

const cascaderAttrs = computed(() => {
  const attrs: Record<string, string> = {
    "data-r8-placeholder": strings.value.placeholder,
    "data-r8-empty-label": strings.value.emptyLabel,
    "data-r8-separator": resolvedSeparator.value,
  };

  if (triggerMode.value === "hover") {
    attrs["data-r8-expand-trigger"] = "hover";
  }

  if (isFilterable.value) {
    attrs["data-r8-filterable"] = "true";
    attrs["data-r8-filter-placeholder"] = filterPlaceholder.value || strings.value.filterPlaceholder;
  }

  if (isClearable.value) {
    attrs["data-r8-clearable"] = "true";
  }

  if (isStrict.value) {
    attrs["data-r8-check-strictly"] = "true";
  }

  if (isCompactTrigger.value) {
    attrs["data-r8-show-all-levels"] = "false";
  }

  return attrs;
});

const previewKey = computed(() =>
  [
    triggerMode.value,
    separator.value,
    filterPlaceholder.value,
    isFilterable.value ? "filter" : "nofilter",
    isClearable.value ? "clear" : "noclear",
    isStrict.value ? "strict" : "leaf",
    isCompactTrigger.value ? "compact" : "path",
  ].join(":"),
);

const markup = computed(() => {
  const attributes = ['class="r8-cascader"'];

  Object.entries(cascaderAttrs.value).forEach(([name, value]) => {
    attributes.push(`${name}="${value}"`);
  });

  const lines = [`<div ${attributes.join(" ")}>`];
  lines.push(`  <button class="r8-cascader__trigger" type="button" aria-label="${strings.value.placeholder}">`);
  lines.push(`    <span data-r8-choice-display>${initialTriggerText.value}</span>`);
  lines.push('    <span class="r8-choice__caret" aria-hidden="true">&gt;</span>');
  lines.push("  </button>");
  lines.push("");
  lines.push('  <div class="r8-cascader__panel" hidden>');

  if (isFilterable.value || isClearable.value) {
    lines.push('    <div class="r8-cascader__toolbar">');
    if (isFilterable.value) {
      lines.push(
        `      <input class="r8-cascader__input" type="text" placeholder="${filterPlaceholder.value || strings.value.filterPlaceholder}" aria-label="${filterPlaceholder.value || strings.value.filterPlaceholder}" />`,
      );
    }
    if (isClearable.value) {
      lines.push(`      <button class="r8-cascader__clear r8-btn r8-btn--sm r8-btn--secondary" type="button">${strings.value.clearButtonText}</button>`);
    }
    lines.push("    </div>");
    lines.push("");
  }

  lines.push('    <div class="r8-cascader__menus"></div>');
  lines.push("");
  lines.push('    <div class="r8-cascader__tree" hidden>');
  lines.push('      <div class="r8-cascader__node" data-r8-label="Solaris" data-r8-value="solaris" data-r8-search="system core capital">');
  lines.push('        <div class="r8-cascader__children">');
  lines.push('          <div class="r8-cascader__node" data-r8-label="Alpha Rim" data-r8-value="alpha-rim">');
  lines.push('            <div class="r8-cascader__children">');
  lines.push('              <div class="r8-cascader__node" data-r8-label="Dock 01" data-r8-value="dock-01"></div>');
  lines.push('              <div class="r8-cascader__node" data-r8-label="Dock 02" data-r8-value="dock-02"></div>');
  lines.push("            </div>");
  lines.push("          </div>");
  lines.push('          <div class="r8-cascader__node" data-r8-label="Gamma Gate" data-r8-value="gamma-gate">');
  lines.push('            <div class="r8-cascader__children">');
  lines.push('              <div class="r8-cascader__node" data-r8-label="Hangar 09" data-r8-value="hangar-09" data-r8-search="hangar cargo repair" data-r8-selected="true"></div>');
  lines.push('              <div class="r8-cascader__node" data-r8-label="Hangar 11" data-r8-value="hangar-11"></div>');
  lines.push("            </div>");
  lines.push("          </div>");
  lines.push("        </div>");
  lines.push("      </div>");
  lines.push('      <div class="r8-cascader__node" data-r8-label="Nebula Reach" data-r8-value="nebula-reach" data-r8-search="expedition frontier">');
  lines.push('        <div class="r8-cascader__children">');
  lines.push('          <div class="r8-cascader__node" data-r8-label="Beacon Array" data-r8-value="beacon-array">');
  lines.push('            <div class="r8-cascader__children">');
  lines.push('              <div class="r8-cascader__node" data-r8-label="Node A" data-r8-value="node-a"></div>');
  lines.push('              <div class="r8-cascader__node" data-r8-label="Node B" data-r8-value="node-b"></div>');
  lines.push("            </div>");
  lines.push("          </div>");
  lines.push('          <div class="r8-cascader__node" data-r8-label="Shadow Wharf" data-r8-value="shadow-wharf" data-r8-disabled="true">');
  lines.push('            <div class="r8-cascader__children">');
  lines.push('              <div class="r8-cascader__node" data-r8-label="Pier 03" data-r8-value="pier-03"></div>');
  lines.push("            </div>");
  lines.push("          </div>");
  lines.push("        </div>");
  lines.push("      </div>");
  lines.push("    </div>");
  lines.push("  </div>");
  lines.push("</div>");

  return lines.join("\n");
});

function formatEventLine(eventName: string, detail: Record<string, unknown>) {
  if (eventName === "clear") {
    return `clear: ${strings.value.clearEventText}`;
  }

  const label = typeof detail.label === "string" && detail.label ? detail.label : typeof detail.value === "string" ? detail.value : "n/a";
  return `${eventName}: ${label}`;
}

function bindPreviewEvents() {
  const cascader = previewSurface.value?.querySelector(".r8-cascader");

  if (!(cascader instanceof HTMLElement) || boundCascader.value === cascader) {
    return;
  }

  boundCascader.value = cascader;
  eventLog.value = [strings.value.eventIdle];

  cascader.addEventListener("r8:cascader-change", (event) => {
    const detail = (event as CustomEvent).detail || {};
    eventLog.value = [formatEventLine("change", detail), ...eventLog.value].slice(0, 5);
  });

  cascader.addEventListener("r8:cascader-clear", (event) => {
    const detail = (event as CustomEvent).detail || {};
    eventLog.value = [formatEventLine("clear", detail), ...eventLog.value].slice(0, 5);
  });

  cascader.addEventListener("r8:choice-change", (event) => {
    const detail = (event as CustomEvent).detail || {};
    eventLog.value = [formatEventLine("choice-change", detail), ...eventLog.value].slice(0, 5);
  });
}

function initPreviewRuntime() {
  if (!import.meta.client || !previewSurface.value) {
    return;
  }

  boundCascader.value = null;
  const runtime = (window as typeof window & { Retro8UI?: Retro8Runtime }).Retro8UI;
  runtime?.init?.(previewSurface.value);
  bindPreviewEvents();
}

function resetPlayground() {
  triggerMode.value = "click";
  separator.value = " / ";
  filterPlaceholder.value = strings.value.filterPlaceholder;
  isFilterable.value = true;
  isClearable.value = true;
  isStrict.value = false;
  isCompactTrigger.value = false;
  eventLog.value = [strings.value.eventIdle];
}

function getToggleClass(enabled: boolean) {
  return enabled ? "r8-btn r8-btn--sm r8-btn--secondary" : "r8-btn r8-btn--sm r8-btn--ghost";
}

onMounted(async () => {
  await nextTick();
  initPreviewRuntime();
});

watch([triggerMode, separator, filterPlaceholder, isFilterable, isClearable, isStrict, isCompactTrigger], async () => {
  await nextTick();
  initPreviewRuntime();
});
</script>

<template>
  <section class="r8-panel docs-cascader-playground">
    <div class="r8-panel__header">
      <div class="docs-cascader-playground__header">
        <div class="docs-cascader-playground__intro">
          <h2 class="r8-panel__title">{{ strings.title }}</h2>
          <p class="docs-panel__meta">{{ strings.copy }}</p>
        </div>

        <button class="r8-btn r8-btn--sm r8-btn--secondary" type="button" @click="resetPlayground">
          {{ strings.resetLabel }}
        </button>
      </div>
    </div>

    <div class="r8-panel__body docs-cascader-playground__body">
      <div class="docs-cascader-playground__controls">
        <div class="docs-cascader-playground__field-grid">
          <label class="r8-field">
            <span class="r8-label">{{ strings.triggerField }}</span>
            <select v-model="triggerMode" class="r8-input">
              <option v-for="option in triggerOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.separatorField }}</span>
            <input v-model="separator" class="r8-input" maxlength="6" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.filterPlaceholderField }}</span>
            <input v-model="filterPlaceholder" class="r8-input" maxlength="28" />
          </label>
        </div>

        <div class="r8-field">
          <span class="r8-label">{{ strings.statesLabel }}</span>
          <div class="docs-cascader-playground__toggles">
            <button
              :class="getToggleClass(isFilterable)"
              type="button"
              :aria-pressed="isFilterable ? 'true' : 'false'"
              @click="isFilterable = !isFilterable"
            >
              {{ strings.filterableLabel }}
            </button>
            <button
              :class="getToggleClass(isClearable)"
              type="button"
              :aria-pressed="isClearable ? 'true' : 'false'"
              @click="isClearable = !isClearable"
            >
              {{ strings.clearableLabel }}
            </button>
            <button
              :class="getToggleClass(isStrict)"
              type="button"
              :aria-pressed="isStrict ? 'true' : 'false'"
              @click="isStrict = !isStrict"
            >
              {{ strings.strictLabel }}
            </button>
            <button
              :class="getToggleClass(isCompactTrigger)"
              type="button"
              :aria-pressed="isCompactTrigger ? 'true' : 'false'"
              @click="isCompactTrigger = !isCompactTrigger"
            >
              {{ strings.compactLabel }}
            </button>
          </div>
        </div>
      </div>

      <div class="docs-demo__stage docs-cascader-playground__stage">
        <div class="docs-cascader-playground__preview">
          <span class="r8-label">{{ strings.previewLabel }}</span>

          <div ref="previewSurface" class="docs-cascader-playground__surface">
            <div :key="previewKey" class="r8-cascader" v-bind="cascaderAttrs">
              <button class="r8-cascader__trigger" type="button" :aria-label="strings.placeholder">
                <span data-r8-choice-display>{{ initialTriggerText }}</span>
                <span class="r8-choice__caret" aria-hidden="true">&gt;</span>
              </button>

              <div class="r8-cascader__panel" hidden>
                <div v-if="isFilterable || isClearable" class="r8-cascader__toolbar">
                  <input
                    v-if="isFilterable"
                    class="r8-cascader__input"
                    type="text"
                    :placeholder="filterPlaceholder || strings.filterPlaceholder"
                    :aria-label="filterPlaceholder || strings.filterPlaceholder"
                  />
                  <button
                    v-if="isClearable"
                    class="r8-cascader__clear r8-btn r8-btn--sm r8-btn--secondary"
                    type="button"
                  >
                    {{ strings.clearButtonText }}
                  </button>
                </div>

                <div class="r8-cascader__menus"></div>

                <div class="r8-cascader__tree" hidden>
                  <div class="r8-cascader__node" data-r8-label="Solaris" data-r8-value="solaris" data-r8-search="system core capital">
                    <div class="r8-cascader__children">
                      <div class="r8-cascader__node" data-r8-label="Alpha Rim" data-r8-value="alpha-rim">
                        <div class="r8-cascader__children">
                          <div class="r8-cascader__node" data-r8-label="Dock 01" data-r8-value="dock-01"></div>
                          <div class="r8-cascader__node" data-r8-label="Dock 02" data-r8-value="dock-02"></div>
                        </div>
                      </div>

                      <div class="r8-cascader__node" data-r8-label="Gamma Gate" data-r8-value="gamma-gate">
                        <div class="r8-cascader__children">
                          <div
                            class="r8-cascader__node"
                            data-r8-label="Hangar 09"
                            data-r8-value="hangar-09"
                            data-r8-search="hangar cargo repair"
                            data-r8-selected="true"
                          ></div>
                          <div class="r8-cascader__node" data-r8-label="Hangar 11" data-r8-value="hangar-11"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="r8-cascader__node" data-r8-label="Nebula Reach" data-r8-value="nebula-reach" data-r8-search="expedition frontier">
                    <div class="r8-cascader__children">
                      <div class="r8-cascader__node" data-r8-label="Beacon Array" data-r8-value="beacon-array">
                        <div class="r8-cascader__children">
                          <div class="r8-cascader__node" data-r8-label="Node A" data-r8-value="node-a"></div>
                          <div class="r8-cascader__node" data-r8-label="Node B" data-r8-value="node-b"></div>
                        </div>
                      </div>

                      <div class="r8-cascader__node" data-r8-label="Shadow Wharf" data-r8-value="shadow-wharf" data-r8-disabled="true">
                        <div class="r8-cascader__children">
                          <div class="r8-cascader__node" data-r8-label="Pier 03" data-r8-value="pier-03"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p class="docs-demo__stage-copy">
          {{ strings.previewCopy }}
        </p>

        <div class="docs-cascader-playground__events">
          <span class="r8-label">{{ strings.eventsLabel }}</span>
          <div class="docs-cascader-playground__event-log">
            <p v-for="(entry, index) in eventLog" :key="`${index}-${entry}`" class="r8-text r8-text--muted">
              {{ entry }}
            </p>
          </div>
        </div>

        <DocsPlaygroundMarkup
          wrapper-class="docs-cascader-playground__markup"
          code-class="docs-cascader-playground__code"
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
