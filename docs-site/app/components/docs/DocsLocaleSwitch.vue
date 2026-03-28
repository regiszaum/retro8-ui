<script setup lang="ts">
import { localeMeta } from "~/utils/docs-data";
import { swapLocaleInPath } from "~/utils/docs-routing";

const props = defineProps<{
  locale: string;
  label: string;
}>();

const route = useRoute();

const localeLinks = computed(() =>
  Object.values(localeMeta).map((entry) => ({
    ...entry,
    to: swapLocaleInPath(route.path, entry.id),
  })),
);
</script>

<template>
  <div class="docs-toolbar__group" :aria-label="label">
    <NuxtLink
      v-for="entry in localeLinks"
      :key="entry.id"
      class="docs-toolbar__button"
      :class="{ 'is-active': entry.id === locale }"
      :to="entry.to"
      :aria-current="entry.id === locale ? 'page' : undefined"
    >
      {{ entry.label }}
    </NuxtLink>
  </div>
</template>
