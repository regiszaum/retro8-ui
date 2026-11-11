<script setup lang="ts">
const props = defineProps<{ locale: string }>();
const text = computed(() => props.locale === "pt-br" ? {
  title: "Sua marca, nos dois temas",
  copy: "A mesma UI com primary roxo, success verde-azulado e danger rosa. Cada painel define seus tokens em um escopo independente do tema da documentação.",
  light: "Tema claro", dark: "Tema escuro", primary: "Continuar", success: "Confirmar", danger: "Excluir",
  hint: "Botões, badges e a barra de progresso usam a mesma paleta personalizada.",
} : {
  title: "Your brand, in both themes",
  copy: "The same UI with a purple primary, teal success, and pink danger. Each panel defines its tokens in a scope independent of the documentation theme.",
  light: "Light theme", dark: "Dark theme", primary: "Continue", success: "Confirm", danger: "Delete",
  hint: "Buttons, badges, and the progress bar share the same custom palette.",
});
</script>

<template>
  <section class="docs-section">
    <div class="docs-section__header">
      <h2 class="docs-section__title">{{ text.title }}</h2>
      <p class="docs-section__copy">{{ text.copy }}</p>
    </div>
    <div class="docs-theme-examples">
      <section v-for="theme in ['light', 'dark'] as const" :key="theme" :data-r8-theme="theme" class="r8-panel docs-theme-example">
        <div class="r8-panel__header">
          <h3 class="r8-panel__title">{{ text[theme] }}</h3>
        </div>
        <div class="r8-panel__body r8-stack">
          <div class="r8-row">
            <button class="r8-btn r8-btn--primary" type="button">{{ text.primary }}</button>
            <button class="r8-btn r8-btn--success" type="button">{{ text.success }}</button>
            <button class="r8-btn r8-btn--danger" type="button">{{ text.danger }}</button>
          </div>
          <div class="r8-row">
            <span v-for="tone in ['primary', 'success', 'danger']" :key="tone" class="r8-badge" :class="`r8-badge--${tone}`">{{ tone }}</span>
          </div>
          <div class="r8-progress" data-r8-value="65" role="progressbar" :aria-label="text.primary" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">
            <div class="r8-progress__track">
              <div class="r8-progress__bar" style="width: 65%; min-height: var(--r8-progress-height)" />
            </div>
          </div>
          <p class="r8-text r8-text--sm r8-text--muted">{{ text.hint }}</p>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.docs-theme-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 28rem), 1fr));
  gap: 1rem;
}

.docs-theme-example {
  min-width: 0;
}

.docs-theme-example[data-r8-theme="light"] {
  --r8-color-primary: #7c3aed;
  --r8-color-primary-strong: #6d28d9;
  --r8-color-primary-contrast: #ffffff;
  --r8-color-success: #0f766e;
  --r8-color-success-strong: #115e59;
  --r8-color-success-contrast: #ffffff;
  --r8-color-danger: #be123c;
  --r8-color-danger-strong: #9f1239;
  --r8-color-danger-contrast: #ffffff;
}

.docs-theme-example[data-r8-theme="dark"] {
  --r8-color-primary: #c4b5fd;
  --r8-color-primary-strong: #a78bfa;
  --r8-color-primary-contrast: #2e1065;
  --r8-color-success: #5eead4;
  --r8-color-success-strong: #2dd4bf;
  --r8-color-success-contrast: #042f2e;
  --r8-color-danger: #fda4af;
  --r8-color-danger-strong: #fb7185;
  --r8-color-danger-contrast: #4c0519;
}
</style>
