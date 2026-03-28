<script setup lang="ts">
import { getComponentNeighbors } from "~/utils/docs-data";
import { buildDocsPath } from "~/utils/docs-routing";

const props = defineProps<{
  component: any;
  locale: string;
  site: any;
}>();

const nativeDialog = ref<HTMLDialogElement | null>(null);
const neighbors = computed(() => getComponentNeighbors(props.component.id));

function onPreviewClick(event: MouseEvent) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  if (target.closest("[data-open-dialog-demo]")) {
    nativeDialog.value?.showModal();
  }
}
</script>

<template>
  <section class="docs-section docs-component-page">
    <div class="docs-breadcrumbs">
      <NuxtLink class="r8-btn r8-btn--sm r8-btn--ghost" :to="buildDocsPath(locale, ['components'])">
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
          <div class="docs-preview__surface" @click="onPreviewClick" v-html="component.preview" />
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

    <DocsCodeBlock
      :title="`${component.name} ${site.componentPage.htmlTitleSuffix}`"
      :code="component.code"
      :hint="site.componentPage.copyHint"
      :button-label="site.componentPage.copyButton"
      :copied-label="site.componentPage.copySuccess"
      :unavailable-label="site.componentPage.copyUnavailable"
    />

    <section class="docs-pager">
      <NuxtLink
        v-if="neighbors.previous"
        class="r8-btn r8-btn--ghost"
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

    <dialog ref="nativeDialog" class="r8-dialog" aria-labelledby="docs-dialog-demo-title">
      <div class="r8-dialog__titlebar">
        <h2 id="docs-dialog-demo-title" class="r8-dialog__title">{{ site.componentPage.dialogTitle }}</h2>
      </div>
      <div class="r8-dialog__body">{{ site.componentPage.dialogBody }}</div>
      <div class="r8-dialog__footer">
        <button class="r8-btn" type="button" @click="nativeDialog?.close()">
          {{ site.componentPage.dialogClose }}
        </button>
        <button class="r8-btn r8-btn--primary" type="button">
          {{ site.componentPage.dialogConfirm }}
        </button>
      </div>
    </dialog>
  </section>
</template>
