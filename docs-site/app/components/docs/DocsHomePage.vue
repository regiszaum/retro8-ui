<script setup lang="ts">
const props = defineProps<{
  doc: any;
  locale: string;
  site: any;
}>();
</script>

<template>
  <section class="docs-section docs-hero">
    <div class="docs-hero__layout">
      <section class="r8-window docs-hero__window">
        <div class="r8-window__titlebar">
          <span class="r8-window__title">{{ site.home.heroWindowTitle }}</span>
          <div class="r8-window__controls" aria-hidden="true">
            <span class="r8-window__control" />
            <span class="r8-window__control" />
            <span class="r8-window__control" />
          </div>
        </div>

        <div class="r8-window__body docs-hero__body">
          <span class="docs-kicker">{{ site.home.heroKicker }}</span>
          <h1 class="docs-hero__title">{{ site.home.heroTitle }}</h1>
          <p class="docs-hero__copy">{{ site.home.heroCopy }}</p>
          <div class="r8-row">
            <NuxtLink class="r8-btn r8-btn--primary" :to="`/${locale}/components`">
              {{ site.home.heroPrimary }}
            </NuxtLink>
            <NuxtLink class="r8-btn r8-btn--secondary" :to="`/${locale}/getting-started`">
              {{ site.home.heroSecondary }}
            </NuxtLink>
          </div>
        </div>

        <div class="r8-window__statusbar">
          {{ site.home.heroStatus }}
        </div>
      </section>

      <div class="docs-hero__stats">
        <section class="r8-panel">
          <div class="r8-panel__header">
            <h2 class="r8-panel__title">{{ site.home.statsTitle }}</h2>
          </div>

          <div class="r8-panel__body docs-hero__card-body">
            <div v-for="stat in site.home.stats" :key="stat.value" class="docs-stat">
              <strong>{{ stat.value }}</strong>
              <span>{{ stat.label }}</span>
              <small>{{ stat.copy }}</small>
            </div>
          </div>
        </section>

        <section class="r8-panel r8-panel--muted">
          <div class="r8-panel__header">
            <h2 class="r8-panel__title">{{ site.home.overviewTitle }}</h2>
          </div>

          <div class="r8-panel__body docs-checklist">
            <p v-for="item in site.home.overviewItems" :key="item">
              {{ item }}
            </p>
          </div>
        </section>
      </div>
    </div>
  </section>

  <section class="docs-section">
    <div class="docs-section__header">
      <span v-if="doc?.kicker" class="docs-kicker">{{ doc.kicker }}</span>
      <h2 class="docs-section__title">{{ doc?.title }}</h2>
      <p class="docs-section__copy">{{ doc?.description }}</p>
    </div>

    <section class="r8-panel">
      <div class="r8-panel__body docs-prose">
        <ContentRenderer v-if="doc" :value="doc" />
      </div>
    </section>
  </section>

  <section class="docs-section">
    <div class="docs-section__header">
      <span class="docs-kicker">{{ site.home.quickStartKicker }}</span>
      <h2 class="docs-section__title">{{ site.home.quickStartTitle }}</h2>
      <p class="docs-section__copy">{{ site.home.quickStartCopy }}</p>
    </div>

    <div class="docs-snippet-grid">
      <DocsCodeBlock
        v-for="snippet in site.home.quickStartCards"
        :key="snippet.title"
        :title="snippet.title"
        :description="snippet.description"
        :code="snippet.code"
        :hint="site.componentPage.copyHint"
        :button-label="site.componentPage.copyButton"
        :copied-label="site.componentPage.copySuccess"
        :unavailable-label="site.componentPage.copyUnavailable"
        compact
      />
    </div>
  </section>

  <section class="docs-section">
    <div class="docs-section__header">
      <span class="docs-kicker">{{ site.home.componentIndexKicker }}</span>
      <h2 class="docs-section__title">{{ site.home.componentIndexTitle }}</h2>
      <p class="docs-section__copy">{{ site.home.componentIndexCopy }}</p>
    </div>

    <DocsComponentCatalog :locale="locale" :sections="site.home.componentSections" />
  </section>
</template>
