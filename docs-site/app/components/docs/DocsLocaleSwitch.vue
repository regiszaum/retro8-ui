<script setup lang="ts">
import { localeMeta } from "~/utils/docs-data";
import { swapLocaleInPath } from "~/utils/docs-routing";

const props = defineProps<{
  locale: string;
  label: string;
}>();

const route = useRoute();
const containerRef = ref<HTMLElement | null>(null);

const localeOptions = computed(() =>
  Object.values(localeMeta).map((entry) => ({
    ...entry,
    to: swapLocaleInPath(route.path, entry.id),
  })),
);

const currentLabel = computed(() => localeMeta[props.locale]?.label ?? "EN");

type ChoiceChangeDetail = {
  value?: string;
  option?: HTMLElement | null;
};

type Retro8Runtime = {
  init?: (root?: Document | HTMLElement) => void;
  refresh?: (root?: Document | HTMLElement) => void;
};

function getRuntime() {
  return (window as Window & { Retro8UI?: Retro8Runtime }).Retro8UI;
}

async function syncLocaleSelect() {
  await nextTick();

  const container = containerRef.value;
  if (!container) {
    return;
  }

  const runtime = getRuntime();
  runtime?.refresh?.(container) ?? runtime?.init?.(container);
}

function handleChoiceChange(event: Event) {
  const detail = (event as CustomEvent<ChoiceChangeDetail>).detail;
  const option = detail?.option;
  const nextLocale = option?.dataset.r8Locale || detail?.value;
  const targetPath = option?.dataset.r8Route || (nextLocale ? swapLocaleInPath(route.path, nextLocale) : "");

  if (!nextLocale || nextLocale === props.locale || !targetPath) {
    return;
  }

  void navigateTo(targetPath);
}

onMounted(() => {
  const container = containerRef.value;
  if (!container) {
    return;
  }

  container.addEventListener("r8:choice-change", handleChoiceChange as EventListener);
  void syncLocaleSelect();
});

onBeforeUnmount(() => {
  containerRef.value?.removeEventListener("r8:choice-change", handleChoiceChange as EventListener);
});

watch(
  () => [props.locale, route.path],
  () => {
    void syncLocaleSelect();
  },
);
</script>

<template>
  <div class="docs-toolbar__group docs-toolbar__group--locale" :aria-label="label">
    <div ref="containerRef" class="r8-select docs-locale-select" :data-r8-value="locale">
      <button class="r8-select__trigger" type="button" :aria-label="label">
        <span data-r8-choice-display>{{ currentLabel }}</span>
        <span class="r8-choice__caret docs-locale-select__caret" aria-hidden="true">&gt;</span>
      </button>

      <div class="r8-select__menu" hidden>
        <button
          v-for="entry in localeOptions"
          :key="entry.id"
          class="r8-select__option"
          :class="{ 'is-selected': entry.id === locale }"
          type="button"
          :data-r8-value="entry.id"
          :data-r8-locale="entry.id"
          :data-r8-route="entry.to"
          :aria-label="entry.label"
        >
          {{ entry.label }}
        </button>
      </div>
    </div>
  </div>
</template>
