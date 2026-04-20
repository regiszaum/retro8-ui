<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    href?: string;
    target?: string;
    rel?: string;
    title?: string;
  }>(),
  {
    href: "",
    target: undefined,
    rel: undefined,
    title: undefined,
  },
);

const attrs = useAttrs();

const href = computed(() => props.href ?? "");

const isExternalHref = computed(() => {
  const value = href.value;
  return /^(?:[a-z]+:)?\/\//i.test(value) || value.startsWith("mailto:") || value.startsWith("tel:");
});

const isHashLink = computed(() => href.value.startsWith("#"));
const isStaticFilePath = computed(() => /^\/[^?#]+\.[a-z0-9]+(?:[?#].*)?$/i.test(href.value));
const hasDownloadAttr = computed(() => {
  const attributes = attrs as Record<string, unknown>;
  return Object.prototype.hasOwnProperty.call(attributes, "download");
});

const shouldUseNativeAnchor = computed(() => (
  isExternalHref.value
  || isHashLink.value
  || isStaticFilePath.value
  || hasDownloadAttr.value
));

const resolvedRel = computed(() => {
  if (props.rel) {
    return props.rel;
  }

  return props.target === "_blank" ? "noopener noreferrer" : undefined;
});

const forwardedAttrs = computed(() => {
  const {
    href: _href,
    to: _to,
    target: _target,
    rel: _rel,
    title: _title,
    ...rest
  } = attrs as Record<string, unknown>;

  return rest;
});
</script>

<template>
  <a
    v-if="shouldUseNativeAnchor"
    :href="href"
    :target="target"
    :rel="resolvedRel"
    :title="title"
    v-bind="forwardedAttrs"
  >
    <slot />
  </a>

  <NuxtLink
    v-else
    :to="href"
    :target="target"
    :rel="resolvedRel"
    :title="title"
    v-bind="forwardedAttrs"
  >
    <slot />
  </NuxtLink>
</template>
