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

function handleChoiceChange(event: Event) {
  const nextLocale = (event as CustomEvent<{ value?: string }>).detail?.value;

  if (!nextLocale || nextLocale === props.locale) {
    return;
  }

  void navigateTo(swapLocaleInPath(route.path, nextLocale));
}

onMounted(() => {
  const container = containerRef.value;
  if (!container) {
    return;
  }

  container.addEventListener("r8:choice-change", handleChoiceChange as EventListener);
  (window as Window & { Retro8UI?: { init?: (root?: Document | HTMLElement) => void } }).Retro8UI?.init?.(container);
});

onBeforeUnmount(() => {
  containerRef.value?.removeEventListener("r8:choice-change", handleChoiceChange as EventListener);
});
</script>

<template>
  <div class="docs-toolbar__group docs-toolbar__group--locale" :aria-label="label">
    <div ref="containerRef" class="r8-select docs-locale-select">
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
          :aria-label="entry.label"
        >
          {{ entry.label }}
        </button>
      </div>
    </div>
  </div>
</template>
