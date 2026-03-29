<script setup lang="ts">
import { getSiteContent } from "~/utils/docs-data";
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
  { id: "home", label: site.value.nav.homeLabel, to: buildDocsPath(props.locale) },
  { id: "getting-started", label: site.value.nav.topLinks[0].label, to: buildDocsPath(props.locale, ["getting-started"]) },
  { id: "components", label: site.value.nav.topLinks[1].label, to: buildDocsPath(props.locale, ["components"]) },
  { id: "tokens", label: site.value.nav.topLinks[2].label, to: buildDocsPath(props.locale, ["tokens"]) },
  { id: "icons", label: site.value.nav.topLinks[3].label, to: buildDocsPath(props.locale, ["icons"]) },
]);

const componentSections = computed(() => site.value.componentSections);

function isActive(to: string) {
  return props.currentPath === to;
}
</script>

<template>
  <div class="docs-shell">
    <header class="docs-topbar">
      <nav class="r8-navbar r8-navbar--dark" aria-label="retro8-ui documentation navigation">
        <NuxtLink class="r8-navbar__brand" :to="buildDocsPath(locale)">
          <span class="docs-brand">
            <img
              class="docs-brand__mark"
              src="/brand/logo-ui.png"
              alt=""
              width="243"
              height="204"
            >
            <span class="docs-brand__label">{{ site.meta.title }}</span>
          </span>
        </NuxtLink>

        <ul class="r8-navbar__menu">
          <li v-for="link in topLinks" :key="link.id">
            <NuxtLink class="r8-navbar__item" :to="link.to" :aria-current="isActive(link.to) ? 'page' : undefined">
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>

        <div class="r8-navbar__actions docs-toolbar">
          <DocsSearchPalette
            :locale="locale"
            :components="site.components"
            :current-path="currentPath"
            :search-label="site.search.label"
            :search-placeholder="site.search.placeholder"
            :search-hint="site.search.hint"
            :empty-label="site.search.empty"
            :close-label="site.search.close"
          />
          <div class="docs-toolbar__group" aria-label="GitHub">
            <a
              class="docs-toolbar__button docs-toolbar__button--external"
              href="https://github.com/regiszaum/retro8-ui"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <svg
                class="docs-toolbar__icon"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M8 0C3.58 0 0 3.67 0 8.2c0 3.63 2.29 6.72 5.47 7.8.4.08.55-.18.55-.4 0-.2-.01-.87-.01-1.58-2.01.38-2.53-.5-2.69-.95-.09-.24-.48-.96-.82-1.15-.28-.16-.68-.55-.01-.56.63-.01 1.08.59 1.23.83.72 1.24 1.87.89 2.33.68.07-.54.28-.89.51-1.09-1.78-.21-3.64-.92-3.64-4.08 0-.9.31-1.63.82-2.2-.08-.21-.36-1.05.08-2.18 0 0 .67-.22 2.2.84A7.36 7.36 0 0 1 8 4.78c.68 0 1.37.09 2.01.27 1.53-1.06 2.2-.84 2.2-.84.44 1.13.16 1.97.08 2.18.51.57.82 1.29.82 2.2 0 3.17-1.87 3.87-3.65 4.08.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .22.15.49.55.4A8.23 8.23 0 0 0 16 8.2C16 3.67 12.42 0 8 0Z"
                />
              </svg>
            </a>
          </div>
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
              <p class="docs-sidebar__eyebrow">{{ site.nav.guideTitle }}</p>
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

            <div v-for="section in componentSections" :key="section.id" class="docs-sidebar__group">
              <p class="docs-sidebar__eyebrow">
                {{ section.title }}
                <span class="docs-sidebar__count">{{ section.count }}</span>
              </p>
              <NuxtLink
                v-for="component in section.components"
                :key="component.id"
                class="docs-sidebar__link"
                :to="buildDocsPath(props.locale, ['components', component.id])"
                :aria-current="isActive(buildDocsPath(props.locale, ['components', component.id])) ? 'page' : undefined"
              >
                <span class="docs-sidebar__dot" aria-hidden="true" />
                <span>{{ component.name }}</span>
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
