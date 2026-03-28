<script setup lang="ts">
import { buildDocsPath } from "~/utils/docs-routing";

defineProps<{
  locale: string;
  sections: Array<{
    id: string;
    title: string;
    description: string;
    count: number;
    core: boolean;
    components: Array<{
      id: string;
      name: string;
      category: string;
      summary: string;
    }>;
  }>;
}>();
</script>

<template>
  <div class="docs-catalog">
    <section v-for="section in sections" :key="section.id" class="docs-catalog-section">
      <div class="docs-catalog-section__header">
        <div class="docs-catalog-section__copy">
          <div class="r8-row docs-catalog-section__meta">
            <span class="docs-kicker">{{ section.title }}</span>
            <span class="r8-badge" :class="section.core ? 'r8-badge--primary' : 'r8-badge--warning'">
              {{ section.count }}
            </span>
          </div>
          <p class="docs-section__copy">{{ section.description }}</p>
        </div>
      </div>

      <div class="docs-component-index">
        <NuxtLink
          v-for="component in section.components"
          :key="component.id"
          class="r8-panel docs-summary-card"
          :to="buildDocsPath(locale, ['components', component.id])"
        >
          <div class="r8-panel__body">
            <span class="docs-summary-card__kicker">{{ component.category }}</span>
            <h3 class="docs-summary-card__title">{{ component.name }}</h3>
            <p class="docs-summary-card__copy">{{ component.summary }}</p>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
