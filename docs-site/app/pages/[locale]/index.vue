<script setup lang="ts">
const { locale } = useDocsLocale();
const site = computed(() => getSiteContent(locale.value));
const { data: doc } = await useAsyncData(`docs:${locale.value}:index`, () =>
  queryCollection("docs").where("stem", "=", `${locale.value}/index`).first(),
);

if (!doc.value) {
  throw createError({ statusCode: 404, statusMessage: "Page not found" });
}

useSeoMeta({
  title: doc.value.title,
  description: doc.value.description,
});
</script>

<template>
  <DocsShell :locale="locale" :current-path="`/${locale}`">
    <DocsHomePage :doc="doc" :locale="locale" :site="site" />
  </DocsShell>
</template>
