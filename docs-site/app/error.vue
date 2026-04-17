<script setup lang="ts">
import type { NuxtError } from "#app";
import { buildDocsPath } from "~/utils/docs-routing";

const props = defineProps<{
  error: NuxtError;
}>();

const route = useRoute();
const { locale } = useDocsLocale();

const activeLocale = computed(() => (locale.value === "pt-br" ? "pt-br" : "en"));
const isNotFound = computed(() => Number(props.error?.statusCode ?? 500) === 404);
const statusCode = computed(() => String(props.error?.statusCode ?? 500));

const copy = computed(() => {
  if (activeLocale.value === "pt-br") {
    return {
      windowTitle: "Retro8 UI // sistema de rotas",
      title404: "Setor nao encontrado",
      titleFallback: "Erro inesperado no sistema",
      message404: "A rota que voce tentou abrir nao existe neste mapa.",
      messageFallback: "Ocorreu uma falha inesperada ao carregar esta tela.",
      pathLabel: "Rota solicitada",
      statusLabel: "Status",
      localeLabel: "Idioma",
      hint:
        "Use um dos atalhos abaixo para voltar ao catalogo, abrir componentes ou trocar de idioma.",
      actionHome: "Voltar ao inicio",
      actionComponents: "Abrir componentes",
      actionPT: "Ir para PT-BR",
      actionEN: "Go to EN",
      footer: "Retro8 UI docs online",
    };
  }

  return {
    windowTitle: "Retro8 UI // routing system",
    title404: "Sector not found",
    titleFallback: "Unexpected system failure",
    message404: "The route you requested does not exist on this map.",
    messageFallback: "An unexpected issue happened while loading this screen.",
    pathLabel: "Requested path",
    statusLabel: "Status",
    localeLabel: "Locale",
    hint:
      "Use one of the shortcuts below to return to the catalog, open components, or change language.",
    actionHome: "Back to home",
    actionComponents: "Open components",
    actionPT: "Ir para PT-BR",
    actionEN: "Go to EN",
    footer: "Retro8 UI docs online",
  };
});

const statusMessage = computed(() => {
  if (props.error?.statusMessage) {
    return props.error.statusMessage;
  }

  return isNotFound.value ? copy.value.message404 : copy.value.messageFallback;
});

const headline = computed(() => (isNotFound.value ? copy.value.title404 : copy.value.titleFallback));
const currentPath = computed(() => route.fullPath || route.path || "/");

useSeoMeta(() => ({
  title: `${statusCode.value} · ${headline.value}`,
  description: statusMessage.value,
}));

function recoverTo(path: string) {
  return clearError({ redirect: path });
}
</script>

<template>
  <main class="docs-error">
    <section class="r8-window docs-error__window" :class="{ 'r8-window--danger': !isNotFound }">
      <div class="r8-window__titlebar">
        <span class="r8-window__title">{{ copy.windowTitle }}</span>
        <div class="r8-window__controls" aria-hidden="true">
          <span class="r8-window__control" />
          <span class="r8-window__control" />
          <span class="r8-window__control" />
        </div>
      </div>

      <div class="r8-window__body docs-error__body">
        <section class="r8-panel docs-error__panel">
          <div class="r8-panel__header">
            <p class="docs-error__eyebrow">ERROR {{ statusCode }}</p>
            <h1 class="r8-panel__title">{{ headline }}</h1>
            <p class="docs-error__copy">{{ statusMessage }}</p>
          </div>

          <div class="r8-panel__body docs-error__details">
            <div class="docs-error__line">
              <span>{{ copy.pathLabel }}</span>
              <code>{{ currentPath }}</code>
            </div>
            <div class="docs-error__line">
              <span>{{ copy.statusLabel }}</span>
              <span class="r8-badge" :class="isNotFound ? 'r8-badge--warning' : 'r8-badge--danger'">
                {{ statusCode }}
              </span>
            </div>
            <div class="docs-error__line">
              <span>{{ copy.localeLabel }}</span>
              <span class="r8-badge r8-badge--info">{{ activeLocale }}</span>
            </div>
            <p class="docs-error__hint">
              {{ copy.hint }}
            </p>
          </div>

          <div class="r8-panel__footer docs-error__actions">
            <button class="r8-btn r8-btn--primary" type="button" @click="recoverTo(buildDocsPath(activeLocale))">
              {{ copy.actionHome }}
            </button>
            <button
              class="r8-btn r8-btn--secondary"
              type="button"
              @click="recoverTo(buildDocsPath(activeLocale, ['components']))"
            >
              {{ copy.actionComponents }}
            </button>
            <button class="r8-btn r8-btn--ghost" type="button" @click="recoverTo(buildDocsPath('pt-br'))">
              {{ copy.actionPT }}
            </button>
            <button class="r8-btn r8-btn--ghost" type="button" @click="recoverTo(buildDocsPath('en'))">
              {{ copy.actionEN }}
            </button>
          </div>
        </section>
      </div>

      <div class="r8-window__statusbar">{{ copy.footer }}</div>
    </section>
  </main>
</template>

<style scoped>
.docs-error {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: clamp(1rem, 3vw, 2.25rem);
}

.docs-error__window {
  width: min(100%, 64rem);
}

.docs-error__body {
  padding: clamp(0.75rem, 2vw, 1.5rem);
}

.docs-error__panel {
  width: 100%;
}

.docs-error__eyebrow {
  margin: 0;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: var(--docs-panel-soft);
}

.docs-error__copy {
  margin: 0;
  color: var(--docs-panel-muted);
}

.docs-error__details {
  display: grid;
  gap: 0.75rem;
}

.docs-error__line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.docs-error__line code {
  font-family: inherit;
  font-size: 0.85rem;
  padding: 0.25rem 0.5rem;
  border: 2px solid var(--docs-panel-border-soft);
  background: var(--docs-inline-code-bg);
  color: var(--docs-panel-text);
}

.docs-error__hint {
  margin: 0.5rem 0 0;
  color: var(--docs-panel-muted);
}

.docs-error__actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.65rem;
}

.docs-error__actions .r8-btn {
  width: 100%;
}

@media (max-width: 44rem) {
  .docs-error {
    padding: 0.75rem;
  }

  .docs-error__actions {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
