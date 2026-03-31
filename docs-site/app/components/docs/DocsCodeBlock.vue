<script setup lang="ts">
const props = defineProps<{
  code: string;
  hint: string;
  buttonLabel: string;
  copiedLabel: string;
  unavailableLabel: string;
  compact?: boolean;
  title?: string;
  description?: string;
}>();

const buttonText = ref(props.buttonLabel);

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
  <section class="r8-window docs-code" :class="{ 'docs-code--compact': compact }">
    <div class="r8-window__titlebar">
      <span class="r8-window__title">{{ title }}</span>
    </div>
    <div class="r8-window__body">
      <p v-if="description" class="docs-code__description">
        {{ description }}
      </p>
      <div class="docs-code__toolbar">
        <span v-if="hint" class="docs-code__hint">{{ hint }}</span>
        <button class="r8-btn r8-btn--sm r8-btn--secondary" type="button" @click="copyCode">
          {{ buttonText }}
        </button>
      </div>
      <pre class="docs-code__pre"><code>{{ code }}</code></pre>
    </div>
  </section>
</template>
