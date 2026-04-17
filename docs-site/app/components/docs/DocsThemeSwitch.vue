<script setup lang="ts">
const props = defineProps<{
  label: string;
  lightLabel: string;
  darkLabel: string;
}>();

const { theme, setTheme } = useDocsTheme();
const switchRef = ref<HTMLElement | null>(null);

const isDark = computed(() => theme.value === "dark");
const currentLabel = computed(() => (isDark.value ? props.darkLabel : props.lightLabel));
const switchAriaLabel = computed(() => `${props.label}: ${currentLabel.value}`);

function syncSwitchState() {
  const element = switchRef.value;
  if (!element) {
    return;
  }

  const checked = isDark.value;
  element.classList.toggle("is-checked", checked);
  element.setAttribute("aria-checked", checked ? "true" : "false");
}

function handleBinaryChange(event: Event) {
  const checked = (event as CustomEvent<{ checked?: boolean; kind?: string }>).detail?.checked;
  setTheme(checked ? "dark" : "light");
}

watch(isDark, () => {
  syncSwitchState();
});

onMounted(() => {
  const element = switchRef.value;
  if (!element) {
    return;
  }

  element.addEventListener("r8:binary-change", handleBinaryChange as EventListener);
  (window as Window & { Retro8UI?: { init?: (root?: Document | HTMLElement) => void } }).Retro8UI?.init?.(element);
  syncSwitchState();
});

onBeforeUnmount(() => {
  switchRef.value?.removeEventListener("r8:binary-change", handleBinaryChange as EventListener);
});
</script>

<template>
  <button
    ref="switchRef"
    class="r8-theme-switch docs-theme-switch"
    :class="{ 'is-checked': isDark }"
    data-r8-size="sm"
    type="button"
    role="switch"
    :aria-checked="String(isDark)"
    :aria-label="switchAriaLabel"
    :title="switchAriaLabel"
  >
    <span class="r8-theme-switch__glyph" aria-hidden="true" />
  </button>
</template>
