<script setup lang="ts">
const route = useRoute();
const label = computed(() => route.path.startsWith("/pt-br")
  ? "Tabela de referência — role para ver todas as colunas"
  : "Reference table — scroll to view all columns");
</script>

<template>
  <div class="docs-prose-table r8-focus-ring" role="region" :aria-label="label" tabindex="0">
    <table><slot /></table>
  </div>
</template>
