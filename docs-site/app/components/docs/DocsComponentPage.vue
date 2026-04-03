<script setup lang="ts">
import { getComponentNeighbors } from "~/utils/docs-data";
import { buildDocsPath } from "~/utils/docs-routing";

const props = defineProps<{
  component: any;
  locale: string;
  site: any;
}>();

type Retro8Runtime = {
  init?: (root?: Document | HTMLElement) => unknown;
};

const previewSurface = ref<HTMLElement | null>(null);
const neighbors = computed(() => getComponentNeighbors(props.component.id));
const componentTables = computed(() => {
  const columns = props.site.componentPage.tableColumns;

  return [
    {
      key: "attributes",
      title: props.site.componentPage.attributesTitle,
      rows: props.component.attributes,
      columns: [
        { key: "name", label: columns.name, code: true },
        { key: "type", label: columns.type, code: true },
        { key: "defaultValue", label: columns.defaultValue, code: true },
        { key: "description", label: columns.description },
      ],
    },
    {
      key: "dataAttributes",
      title: props.site.componentPage.dataAttributesTitle,
      rows: props.component.dataAttributes,
      columns: [
        { key: "name", label: columns.name, code: true },
        { key: "type", label: columns.type, code: true },
        { key: "defaultValue", label: columns.defaultValue, code: true },
        { key: "description", label: columns.description },
      ],
    },
    {
      key: "cssVariables",
      title: props.site.componentPage.cssVariablesTitle,
      rows: props.component.cssVariables,
      columns: [
        { key: "name", label: columns.name, code: true },
        { key: "type", label: columns.type, code: true },
        { key: "defaultValue", label: columns.defaultValue, code: true },
        { key: "description", label: columns.description },
      ],
    },
    {
      key: "methods",
      title: props.site.componentPage.methodsTitle,
      rows: props.component.methods,
      columns: [
        { key: "name", label: columns.name, code: true },
        { key: "signature", label: columns.signature, code: true },
        { key: "description", label: columns.description },
      ],
    },
    {
      key: "events",
      title: props.site.componentPage.eventsTitle,
      rows: props.component.events,
      columns: [
        { key: "name", label: columns.name, code: true },
        { key: "payload", label: columns.payload, code: true },
        { key: "description", label: columns.description },
      ],
    },
  ].filter((section) => Array.isArray(section.rows) && section.rows.length > 0);
});

function initPreviewRuntime() {
  if (!import.meta.client || !previewSurface.value) {
    return;
  }

  const runtime = (window as typeof window & { Retro8UI?: Retro8Runtime }).Retro8UI;
  runtime?.init?.(previewSurface.value);
}

onMounted(async () => {
  await nextTick();
  initPreviewRuntime();
});

watch(
  () => props.component.id,
  async () => {
    await nextTick();
    initPreviewRuntime();
  },
);
</script>

<template>
  <section class="docs-section docs-component-page">
    <div class="docs-breadcrumbs">
      <NuxtLink class="r8-btn r8-btn--sm r8-btn--secondary" :to="buildDocsPath(locale, ['components'])">
        {{ site.nav.backToCatalog }}
      </NuxtLink>
    </div>

    <div class="docs-section__header">
      <span class="docs-kicker">{{ component.category }}</span>
      <h1 class="docs-section__title">{{ component.name }}</h1>
      <p class="docs-section__copy">{{ component.summary }}</p>
    </div>

    <div class="docs-component__layout">
      <section class="r8-window docs-preview">
        <div class="r8-window__titlebar">
          <span class="r8-window__title">{{ site.componentPage.previewLabel }}</span>
        </div>
        <div class="r8-window__body">
          <div ref="previewSurface" class="docs-preview__surface" v-html="component.preview" />
        </div>
        <div class="r8-window__statusbar">
          {{ site.componentPage.previewStatus }}
        </div>
      </section>

      <div class="docs-component__meta">
        <section class="r8-panel docs-meta-card">
          <div class="r8-panel__header">
            <h2 class="r8-panel__title">{{ site.componentPage.apiTitle }}</h2>
          </div>
          <div class="r8-panel__body docs-list-block">
            <ul class="docs-list">
              <li v-for="item in component.api" :key="item.name">
                <code>{{ item.name }}</code> {{ item.description }}
              </li>
            </ul>
          </div>
        </section>

        <section class="r8-panel docs-meta-card">
          <div class="r8-panel__header">
            <h2 class="r8-panel__title">{{ site.componentPage.anatomyTitle }}</h2>
          </div>
          <div class="r8-panel__body docs-list-block">
            <ul class="docs-list">
              <li v-for="item in component.anatomy" :key="item">
                {{ item }}
              </li>
            </ul>
          </div>
        </section>

        <section class="r8-panel docs-meta-card">
          <div class="r8-panel__header">
            <h2 class="r8-panel__title">{{ site.componentPage.accessibilityTitle }}</h2>
          </div>
          <div class="r8-panel__body docs-list-block">
            <ul class="docs-list">
              <li v-for="item in component.accessibility" :key="item">
                {{ item }}
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>

    <DocsButtonPlayground v-if="component.id === 'button'" :site="site" />
    <DocsBorderPlayground v-if="component.id === 'border'" :site="site" />
    <DocsColorPlayground v-if="component.id === 'color'" :site="site" />
    <DocsIconPlayground v-if="component.id === 'icon'" :site="site" />
    <DocsLinkPlayground v-if="component.id === 'link'" :site="site" />
    <DocsLayoutContainerPlayground v-if="component.id === 'layout-container'" :site="site" />

    <DocsCodeBlock
      :title="`${component.name} ${site.componentPage.htmlTitleSuffix}`"
      :code="component.code"
      :hint="site.componentPage.copyHint"
      :button-label="site.componentPage.copyButton"
      :copied-label="site.componentPage.copySuccess"
      :unavailable-label="site.componentPage.copyUnavailable"
    />

    <section v-if="componentTables.length" class="docs-component__contracts">
      <DocsApiTable
        v-for="section in componentTables"
        :key="section.key"
        :title="section.title"
        :rows="section.rows"
        :columns="section.columns"
      />
    </section>

    <section class="docs-pager">
      <NuxtLink
        v-if="neighbors.previous"
        class="r8-btn r8-btn--secondary"
        :to="buildDocsPath(locale, ['components', neighbors.previous])"
      >
        {{ site.nav.previousComponent }}
      </NuxtLink>
      <span v-else />

      <NuxtLink
        v-if="neighbors.next"
        class="r8-btn r8-btn--secondary"
        :to="buildDocsPath(locale, ['components', neighbors.next])"
      >
        {{ site.nav.nextComponent }}
      </NuxtLink>
      <span v-else />
    </section>
  </section>
</template>
