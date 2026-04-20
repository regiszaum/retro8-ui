<script setup lang="ts">
const route = useRoute();
const preRef = ref<HTMLElement | null>(null);
const state = ref<"idle" | "copied" | "unavailable">("idle");
let resetTimer: ReturnType<typeof setTimeout> | null = null;

const isPtBr = computed(() => {
  const localeParam = Array.isArray(route.params.locale) ? route.params.locale[0] : route.params.locale;
  return localeParam === "pt-br" || route.path.startsWith("/pt-br");
});

const labels = computed(() =>
  isPtBr.value
    ? {
        copy: "Copiar",
        copied: "Copiado",
        unavailable: "Sem clipboard",
      }
    : {
        copy: "Copy",
        copied: "Copied",
        unavailable: "No clipboard",
      },
);

const buttonLabel = computed(() => {
  if (state.value === "copied") {
    return labels.value.copied;
  }

  if (state.value === "unavailable") {
    return labels.value.unavailable;
  }

  return labels.value.copy;
});

function scheduleReset() {
  if (resetTimer) {
    clearTimeout(resetTimer);
  }

  resetTimer = setTimeout(() => {
    state.value = "idle";
    resetTimer = null;
  }, 1400);
}

async function copyCode() {
  if (!import.meta.client) {
    return;
  }

  const codeElement = preRef.value?.querySelector("code");
  const code = (codeElement?.textContent ?? "").trim();

  if (!code) {
    return;
  }

  if (!navigator.clipboard?.writeText) {
    state.value = "unavailable";
    scheduleReset();
    return;
  }

  try {
    await navigator.clipboard.writeText(code);
    state.value = "copied";
  } catch {
    state.value = "unavailable";
  }

  scheduleReset();
}

onBeforeUnmount(() => {
  if (resetTimer) {
    clearTimeout(resetTimer);
  }
});
</script>

<template>
  <div class="docs-prose-pre">
    <div class="docs-prose-pre__toolbar">
      <button
        class="r8-btn r8-btn--sm r8-btn--secondary"
        type="button"
        :aria-label="buttonLabel"
        @click="copyCode"
      >
        {{ buttonLabel }}
      </button>
    </div>
    <pre ref="preRef">
      <slot />
    </pre>
  </div>
</template>
