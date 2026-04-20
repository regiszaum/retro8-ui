<script setup lang="ts">
type OptionValue = string | number | boolean | null | undefined;

type DocsSelectOption = {
  value: OptionValue;
  label: string;
};

type Retro8Runtime = {
  init?: (root?: Document | HTMLElement) => unknown;
};

const props = defineProps<{
  modelValue: OptionValue;
  options: DocsSelectOption[];
  placeholder?: string;
  ariaLabel?: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: OptionValue): void;
}>();

const rootRef = ref<HTMLElement | null>(null);
const listenersBound = ref(false);

const optionKey = (value: OptionValue) => String(value ?? "");

const serializedOptions = computed(() =>
  props.options.map((option) => `${optionKey(option.value)}:${option.label}`).join("|"),
);

const selectedKey = computed(() => optionKey(props.modelValue));

const selectedOption = computed(
  () => props.options.find((option) => optionKey(option.value) === selectedKey.value) ?? null,
);

const displayLabel = computed(() => selectedOption.value?.label || props.placeholder || "");

const resolvedAriaLabel = computed(() => props.ariaLabel || props.placeholder || displayLabel.value || "Select option");

function resolveValueFromKey(key: string) {
  const match = props.options.find((option) => optionKey(option.value) === key);
  return match ? match.value : key;
}

function bindEvents() {
  if (!(rootRef.value instanceof HTMLElement) || listenersBound.value) {
    return;
  }

  listenersBound.value = true;

  rootRef.value.addEventListener("r8:choice-change", (event) => {
    const detail = ((event as CustomEvent).detail || {}) as Record<string, unknown>;
    const value = typeof detail.value === "string" ? detail.value : "";
    emit("update:modelValue", resolveValueFromKey(value));
  });
}

function initRuntime() {
  if (!import.meta.client || !rootRef.value) {
    return;
  }

  const runtime = (window as typeof window & { Retro8UI?: Retro8Runtime }).Retro8UI;
  runtime?.init?.(rootRef.value);
  bindEvents();
}

watch([selectedKey, serializedOptions, () => props.disabled], async () => {
  await nextTick();
  initRuntime();
});

onMounted(async () => {
  await nextTick();
  initRuntime();
});
</script>

<template>
  <div ref="rootRef" class="r8-select docs-control-select" :data-r8-value="selectedKey">
    <button class="r8-select__trigger" type="button" :aria-label="resolvedAriaLabel" :disabled="disabled ? true : null">
      <span data-r8-choice-display>{{ displayLabel }}</span>
      <span class="r8-choice__caret" aria-hidden="true">&gt;</span>
    </button>

    <div class="r8-select__menu" hidden>
      <button
        v-for="option in options"
        :key="optionKey(option.value)"
        class="r8-select__option"
        :class="{ 'is-selected': optionKey(option.value) === selectedKey }"
        type="button"
        :data-r8-value="optionKey(option.value)"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>
