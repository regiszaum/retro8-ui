<script setup lang="ts">
import { componentOrder, getComponentById, getSiteContent } from "~/utils/docs-data";
import { buildDocsPath } from "~/utils/docs-routing";

const props = defineProps<{
  locale: string;
  currentPath: string;
}>();

const site = computed(() => getSiteContent(props.locale));

const topLinks = computed(() => [
  { id: "getting-started", label: site.value.nav.topLinks[0].label, to: buildDocsPath(props.locale, ["getting-started"]) },
  { id: "components", label: site.value.nav.topLinks[1].label, to: buildDocsPath(props.locale, ["components"]) },
  { id: "tokens", label: site.value.nav.topLinks[2].label, to: buildDocsPath(props.locale, ["tokens"]) },
  { id: "icons", label: site.value.nav.topLinks[3].label, to: buildDocsPath(props.locale, ["icons"]) },
]);

const guideLinks = computed(() => [
  { id: "home", label: site.value.nav.sidebarGroups[0].items[0].label, to: buildDocsPath(props.locale) },
  { id: "getting-started", label: site.value.nav.sidebarGroups[0].items[1].label, to: buildDocsPath(props.locale, ["getting-started"]) },
  { id: "tokens", label: site.value.nav.sidebarGroups[0].items[2].label, to: buildDocsPath(props.locale, ["tokens"]) },
  { id: "icons", label: site.value.nav.sidebarGroups[0].items[3].label, to: buildDocsPath(props.locale, ["icons"]) },
  { id: "components", label: site.value.nav.sidebarGroups[0].items[4].label, to: buildDocsPath(props.locale, ["components"]) },
]);

const componentLinks = computed(() =>
  componentOrder.map((id) => ({
    id,
    label: getComponentById(props.locale, id)?.name ?? id,
    to: buildDocsPath(props.locale, ["components", id]),
  })),
);

function isActive(to: string) {
  return props.currentPath === to;
}
</script>

<template>
  <div class="docs-shell">
    <header class="docs-topbar">
      <nav class="r8-navbar r8-navbar--dark" aria-label="retro8-ui documentation navigation">
        <NuxtLink class="r8-navbar__brand" :to="buildDocsPath(locale)">
          {{ site.meta.title }}
        </NuxtLink>

        <ul class="r8-navbar__menu">
          <li v-for="link in topLinks" :key="link.id">
            <NuxtLink class="r8-navbar__item" :to="link.to" :aria-current="isActive(link.to) ? 'page' : undefined">
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>

        <div class="r8-navbar__actions docs-toolbar">
          <DocsLocaleSwitch :locale="locale" :label="site.localeSwitcher.label" />
          <DocsThemeToggle
            :label="site.theme.label"
            :light-label="site.theme.light"
            :dark-label="site.theme.dark"
          />
        </div>
      </nav>
    </header>

    <div class="docs-layout">
      <aside class="docs-sidebar">
        <div class="r8-panel docs-sidebar__panel">
          <div class="r8-panel__header">
            <h2 class="r8-panel__title">{{ site.nav.sidebarTitle }}</h2>
            <p class="docs-sidebar__copy">{{ site.home.heroCopy }}</p>
          </div>

          <div class="r8-panel__body docs-sidebar__body">
            <div class="docs-sidebar__group">
              <p class="docs-sidebar__eyebrow">{{ site.nav.sidebarGroups[0].title }}</p>
              <NuxtLink
                v-for="link in guideLinks"
                :key="link.id"
                class="docs-sidebar__link"
                :to="link.to"
                :aria-current="isActive(link.to) ? 'page' : undefined"
              >
                <span class="docs-sidebar__dot" aria-hidden="true" />
                <span>{{ link.label }}</span>
              </NuxtLink>
            </div>

            <div class="docs-sidebar__group">
              <p class="docs-sidebar__eyebrow">{{ site.nav.sidebarGroups[1].title }}</p>
              <NuxtLink
                v-for="link in componentLinks"
                :key="link.id"
                class="docs-sidebar__link"
                :to="link.to"
                :aria-current="isActive(link.to) ? 'page' : undefined"
              >
                <span class="docs-sidebar__dot" aria-hidden="true" />
                <span>{{ link.label }}</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </aside>

      <main class="docs-main">
        <slot />

        <footer class="docs-footer">
          <div class="r8-panel r8-panel--muted">
            <div class="r8-panel__body docs-footer__body">
              <p>{{ site.home.footerPrimary }}</p>
              <p>{{ site.home.footerSecondary }}</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  </div>
</template>
