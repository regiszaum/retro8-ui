<script setup lang="ts">
defineProps<{
  label: string;
  lightLabel: string;
  darkLabel: string;
}>();

const { theme, setTheme } = useDocsTheme();
</script>

<template>
  <div class="docs-toolbar__group" :aria-label="label">
    <button
      class="docs-toolbar__button"
      :class="{ 'is-active': theme === 'light' }"
      type="button"
      :aria-pressed="String(theme === 'light')"
      @click="setTheme('light')"
    >
      {{ lightLabel }}
    </button>
    <button
      class="docs-toolbar__button"
      :class="{ 'is-active': theme === 'dark' }"
      type="button"
      :aria-pressed="String(theme === 'dark')"
      @click="setTheme('dark')"
    >
      {{ darkLabel }}
    </button>
  </div>
</template>
