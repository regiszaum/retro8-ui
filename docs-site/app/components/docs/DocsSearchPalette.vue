<script setup lang="ts">
import { buildDocsPath } from "~/utils/docs-routing";

type SearchComponentEntry = {
  id: string;
  name: string;
  summary: string;
  category: string;
};

const props = defineProps<{
  locale: string;
  components: SearchComponentEntry[];
  currentPath: string;
  searchLabel: string;
  searchPlaceholder: string;
  searchHint: string;
  emptyLabel: string;
  closeLabel: string;
}>();

const router = useRouter();
const route = useRoute();
const inputRef = ref<HTMLInputElement | null>(null);
const isOpen = ref(false);
const query = ref("");
const selectedIndex = ref(0);
const shortcutLabel = ref("Ctrl K");
const previousBodyOverflow = ref<string | null>(null);

const searchResults = computed(() => {
  const normalizedQuery = query.value.trim().toLowerCase();
  const entries = props.components.map((component) => ({
    ...component,
    to: buildDocsPath(props.locale, ["components", component.id]),
  }));

  if (!normalizedQuery) {
    return entries.slice(0, 12);
  }

  return entries
    .map((entry) => {
      const haystack = `${entry.name} ${entry.id} ${entry.category} ${entry.summary}`.toLowerCase();
      const startsWithName = entry.name.toLowerCase().startsWith(normalizedQuery);
      const startsWithId = entry.id.toLowerCase().startsWith(normalizedQuery);
      const includesName = entry.name.toLowerCase().includes(normalizedQuery);
      const includesId = entry.id.toLowerCase().includes(normalizedQuery);
      const includesCategory = entry.category.toLowerCase().includes(normalizedQuery);
      const includesSummary = haystack.includes(normalizedQuery);

      let score = 0;

      if (startsWithName) score += 120;
      if (startsWithId) score += 100;
      if (includesName) score += 60;
      if (includesId) score += 40;
      if (includesCategory) score += 20;
      if (includesSummary) score += 10;

      return {
        ...entry,
        score,
      };
    })
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score || left.name.localeCompare(right.name))
    .slice(0, 12);
});

const activeResult = computed(() => searchResults.value[selectedIndex.value] ?? null);

function focusInput() {
  nextTick(() => {
    inputRef.value?.focus();
    inputRef.value?.select();
  });
}

function openSearch() {
  isOpen.value = true;
  selectedIndex.value = 0;
  focusInput();
}

function closeSearch() {
  isOpen.value = false;
  query.value = "";
  selectedIndex.value = 0;
}

async function selectResult(to: string) {
  await router.push(to);
  closeSearch();
}

function onInputKeydown(event: KeyboardEvent) {
  if (!isOpen.value) {
    return;
  }

  if (event.key === "ArrowDown") {
    event.preventDefault();
    selectedIndex.value = Math.min(selectedIndex.value + 1, Math.max(searchResults.value.length - 1, 0));
    return;
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0);
    return;
  }

  if (event.key === "Enter" && activeResult.value) {
    event.preventDefault();
    void selectResult(activeResult.value.to);
    return;
  }

  if (event.key === "Escape") {
    event.preventDefault();
    closeSearch();
  }
}

function onWindowKeydown(event: KeyboardEvent) {
  const key = event.key.toLowerCase();

  if ((event.metaKey || event.ctrlKey) && key === "k") {
    event.preventDefault();
    if (isOpen.value) {
      closeSearch();
    } else {
      openSearch();
    }
    return;
  }

  if (event.key === "Escape" && isOpen.value) {
    event.preventDefault();
    closeSearch();
  }
}

watch(searchResults, (results) => {
  if (!results.length) {
    selectedIndex.value = 0;
    return;
  }

  if (selectedIndex.value > results.length - 1) {
    selectedIndex.value = 0;
  }
});

watch(query, () => {
  selectedIndex.value = 0;
});

watch(
  () => route.path,
  () => {
    if (isOpen.value) {
      closeSearch();
    }
  },
);

watch(isOpen, (open) => {
  if (!import.meta.client) {
    return;
  }

  if (open) {
    previousBodyOverflow.value = document.body.style.overflow || "";
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = previousBodyOverflow.value ?? "";
  }

  if (open) {
    focusInput();
  }
});

onMounted(() => {
  window.addEventListener("keydown", onWindowKeydown);

  const userAgent = navigator.userAgent.toLowerCase();
  const platform = navigator.platform.toLowerCase();
  if (platform.includes("mac") || userAgent.includes("mac")) {
    shortcutLabel.value = "Cmd K";
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onWindowKeydown);

  if (import.meta.client) {
    document.body.style.overflow = previousBodyOverflow.value ?? "";
  }
});
</script>

<template>
  <div class="docs-search">
    <button
      class="docs-search__trigger"
      type="button"
      :aria-label="searchLabel"
      :aria-expanded="isOpen ? 'true' : 'false'"
      aria-haspopup="dialog"
      aria-controls="docs-search-dialog"
      @click="openSearch"
    >
      <span class="docs-search__trigger-copy">
        <span class="docs-search__trigger-label">{{ searchPlaceholder }}</span>
      </span>
      <span class="docs-search__shortcut">{{ shortcutLabel }}</span>
    </button>

    <Teleport to="body">
      <div
        v-if="isOpen"
        class="docs-search__overlay"
        @click="closeSearch"
      >
        <section
          id="docs-search-dialog"
          class="docs-search__dialog r8-panel"
          role="dialog"
          aria-modal="true"
          :aria-label="searchLabel"
          @click.stop
        >
          <div class="r8-panel__header docs-search__header">
            <div class="docs-search__input-wrap">
              <input
                ref="inputRef"
                v-model="query"
                class="docs-search__input"
                type="text"
                :placeholder="searchPlaceholder"
                :aria-label="searchLabel"
                @keydown="onInputKeydown"
              />
            </div>
            <button class="docs-search__close" type="button" @click="closeSearch">
              {{ closeLabel }}
            </button>
          </div>

          <div class="r8-panel__body docs-search__body">
            <p class="docs-search__hint">{{ searchHint }}</p>

            <div v-if="searchResults.length" class="docs-search__results">
              <button
                v-for="(result, index) in searchResults"
                :key="result.id"
                class="docs-search__result"
                :class="{
                  'is-active': index === selectedIndex,
                  'is-current': result.to === currentPath,
                }"
                type="button"
                @mouseenter="selectedIndex = index"
                @click="selectResult(result.to)"
              >
                <span class="docs-search__result-main">
                  <strong>{{ result.name }}</strong>
                  <small>{{ result.category }}</small>
                </span>
                <span class="docs-search__result-copy">{{ result.summary }}</span>
              </button>
            </div>

            <div v-else class="docs-search__empty">
              {{ emptyLabel }}
            </div>
          </div>
        </section>
      </div>
    </Teleport>
  </div>
</template>
