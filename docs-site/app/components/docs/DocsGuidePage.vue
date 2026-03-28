<script setup lang="ts">
const props = defineProps<{
  doc: any;
  locale: string;
  site: any;
  pageId: string;
}>();

const componentPageStrings = computed(() => props.site.componentPage);
</script>

<template>
  <section class="docs-section">
    <div class="docs-section__header">
      <span v-if="doc?.kicker" class="docs-kicker">{{ doc.kicker }}</span>
      <h1 class="docs-section__title">{{ doc?.title }}</h1>
      <p class="docs-section__copy">{{ doc?.description }}</p>
    </div>

    <section class="r8-panel">
      <div class="r8-panel__body docs-prose">
        <ContentRenderer v-if="doc" :value="doc" />
      </div>
    </section>
  </section>

  <section v-if="pageId === 'getting-started'" class="docs-section">
    <div class="docs-snippet-grid">
      <DocsCodeBlock
        v-for="snippet in site.home.quickStartCards"
        :key="snippet.title"
        :title="snippet.title"
        :description="snippet.description"
        :code="snippet.code"
        :hint="componentPageStrings.copyHint"
        :button-label="componentPageStrings.copyButton"
        :copied-label="componentPageStrings.copySuccess"
        :unavailable-label="componentPageStrings.copyUnavailable"
        compact
      />
    </div>

    <div class="docs-framework-grid">
      <section class="r8-panel">
        <div class="r8-panel__header">
          <h2 class="r8-panel__title">{{ site.home.frameworkTitle }}</h2>
        </div>
        <div class="r8-panel__body docs-list-block">
          <ul class="docs-list">
            <li v-for="item in site.home.frameworkItems" :key="item">
              {{ item }}
            </li>
          </ul>
        </div>
      </section>

      <section class="r8-panel">
        <div class="r8-panel__header">
          <h2 class="r8-panel__title">{{ site.home.conventionsTitle }}</h2>
        </div>
        <div class="r8-panel__body docs-list-block">
          <ul class="docs-list">
            <li v-for="item in site.home.conventionsItems" :key="item">
              {{ item }}
            </li>
          </ul>
        </div>
      </section>
    </div>
  </section>

  <section v-if="pageId === 'tokens'" class="docs-section">
    <div class="docs-token-grid">
      <section v-for="group in site.home.tokens" :key="group.title" class="r8-panel docs-token-card">
        <div class="r8-panel__header">
          <h2 class="r8-panel__title">{{ group.title }}</h2>
        </div>
        <div class="r8-panel__body">
          <ul class="docs-token-list">
            <li v-for="item in group.items" :key="`${group.title}-${item.token}`" class="docs-token-list__item">
              <span
                v-if="group.type === 'color'"
                class="docs-token-list__swatch"
                :style="{ background: item.value }"
              />
              <span v-else class="docs-token-list__swatch docs-token-list__swatch--ghost" aria-hidden="true" />
              <span class="docs-token-list__meta">
                <strong>{{ item.label }}</strong>
                <code>{{ item.token }}</code>
              </span>
              <code>{{ item.value }}</code>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </section>

  <section v-if="pageId === 'icons'" class="docs-section">
    <div class="docs-framework-grid">
      <section v-for="card in site.home.iconsCards" :key="card.title" class="r8-panel">
        <div class="r8-panel__header">
          <h2 class="r8-panel__title">{{ card.title }}</h2>
          <p class="docs-panel__meta">{{ card.subtitle }}</p>
        </div>

        <div class="r8-panel__body docs-list-block">
          <p class="docs-panel__copy">{{ card.body }}</p>
          <div class="r8-row">
            <a class="r8-btn r8-btn--primary r8-btn--sm" :href="card.ctaHref" target="_blank" rel="noreferrer">
              {{ card.ctaLabel }}
            </a>
            <a class="r8-btn r8-btn--ghost r8-btn--sm" :href="card.secondaryHref" target="_blank" rel="noreferrer">
              {{ card.secondaryLabel }}
            </a>
          </div>
        </div>
      </section>
    </div>
  </section>

  <section v-if="pageId === 'components'" class="docs-section">
    <div class="docs-component-index">
      <NuxtLink
        v-for="component in site.home.components"
        :key="component.id"
        class="r8-panel docs-summary-card"
        :to="`/${locale}/components/${component.id}`"
      >
        <div class="r8-panel__body">
          <span class="docs-summary-card__kicker">{{ component.category }}</span>
          <h2 class="docs-summary-card__title">{{ component.name }}</h2>
          <p class="docs-summary-card__copy">{{ component.summary }}</p>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>
