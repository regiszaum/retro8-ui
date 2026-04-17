<script setup lang="ts">
const props = defineProps<{
  label: string;
  code: string;
  buttonLabel: string;
  copiedLabel: string;
  unavailableLabel: string;
  wrapperClass?: string;
  codeClass?: string;
}>();

const buttonText = ref(props.buttonLabel);

const wrapperClasses = computed(() => [props.wrapperClass || "", "docs-playground-markup"].filter(Boolean));
const codeClasses = computed(() => [props.codeClass || ""].filter(Boolean));

watch(
  () => props.buttonLabel,
  (value) => {
    buttonText.value = value;
  },
);

async function copyCode() {
  const previousLabel = buttonText.value;

  try {
    await navigator.clipboard.writeText(props.code);
    buttonText.value = props.copiedLabel;
  } catch {
    buttonText.value = props.unavailableLabel;
  }

  window.setTimeout(() => {
    buttonText.value = previousLabel;
  }, 1200);
}
</script>

<template>
  <div :class="wrapperClasses">
    <div class="docs-playground-markup__header">
      <span class="r8-label">{{ label }}</span>
      <button class="r8-btn r8-btn--sm r8-btn--secondary" type="button" @click="copyCode">
        {{ buttonText }}
      </button>
    </div>
    <pre :class="codeClasses"><code>{{ code }}</code></pre>
  </div>
</template>
