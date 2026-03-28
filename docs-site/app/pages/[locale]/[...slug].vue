<script setup lang="ts">
import { getComponentById, getSiteContent } from "~/utils/docs-data";
import { buildDocsPath, normalizeSlug } from "~/utils/docs-routing";

const route = useRoute();
const { locale } = useDocsLocale();

const slug = computed(() => normalizeSlug(route.params.slug));
const currentPath = computed(() => buildDocsPath(locale.value, slug.value));
const contentStem = computed(() => `${locale.value}/${slug.value.join("/")}`);
const site = computed(() => getSiteContent(locale.value));
const notFoundMessage = computed(() => (locale.value === "en" ? "Page not found." : "Pagina nao encontrada."));
const isComponentPage = computed(
  () => slug.value[0] === "components" && slug.value.length === 2 && typeof slug.value[1] === "string",
);
const componentId = computed(() => (isComponentPage.value ? slug.value[1] : ""));
const component = computed(() => (componentId.value ? getComponentById(locale.value, componentId.value) : null));

let docData: any = null;

if (!isComponentPage.value) {
  const { data } = await useAsyncData(`docs:${locale.value}:${slug.value.join("/")}`, () =>
    queryCollection("docs").where("stem", "=", contentStem.value).first(),
  );
  docData = data;

  if (!docData.value) {
    throw createError({ statusCode: 404, statusMessage: notFoundMessage.value });
  }
} else if (!component.value) {
  throw createError({ statusCode: 404, statusMessage: notFoundMessage.value });
}

const pageId = computed(() => (isComponentPage.value ? "component" : slug.value[0]));
const pageTitle = computed(() => {
  if (isComponentPage.value) {
    return component.value?.name ?? site.value.meta.title;
  }

  return docData?.value?.title ?? site.value.meta.title;
});

const pageDescription = computed(() => {
  if (isComponentPage.value) {
    return component.value?.summary ?? site.value.meta.description;
  }

  return docData?.value?.description ?? site.value.meta.description;
});

useHead(() => ({
  title: pageTitle.value,
  meta: [
    {
      name: "description",
      content: pageDescription.value,
    },
  ],
}));
</script>

<template>
  <DocsShell :locale="locale" :current-path="currentPath">
    <DocsComponentPage
      v-if="isComponentPage && component"
      :component="component"
      :locale="locale"
      :site="site"
    />

    <DocsGuidePage
      v-else-if="docData"
      :doc="docData"
      :locale="locale"
      :site="site"
      :page-id="pageId"
    />
  </DocsShell>
</template>
