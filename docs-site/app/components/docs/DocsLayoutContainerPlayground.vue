<script setup lang="ts">
const props = defineProps<{
  site: any;
}>();

type LayoutMode = "sidebarStart" | "sidebarEnd" | "stack";
type AsideWidth = "narrow" | "medium" | "wide";
type ChromeHeight = "auto" | "compact" | "tall";

const strings = computed(() => props.site.componentPage.layoutContainerPlayground);

const layout = ref<LayoutMode>("sidebarStart");
const asideWidth = ref<AsideWidth>("medium");
const chromeHeight = ref<ChromeHeight>("auto");
const showHeader = ref(true);
const showAside = ref(true);
const showFooter = ref(true);

const layoutOptions = computed(() => [
  { value: "sidebarStart", label: strings.value.options.sidebarStart },
  { value: "sidebarEnd", label: strings.value.options.sidebarEnd },
  { value: "stack", label: strings.value.options.stack },
]);

const asideWidthOptions = computed(() => [
  { value: "narrow", label: strings.value.options.narrow },
  { value: "medium", label: strings.value.options.medium },
  { value: "wide", label: strings.value.options.wide },
]);

const chromeHeightOptions = computed(() => [
  { value: "auto", label: strings.value.options.auto },
  { value: "compact", label: strings.value.options.compact },
  { value: "tall", label: strings.value.options.tall },
]);

const renderedClassName = computed(() => {
  const classes = ["r8-container"];

  if (layout.value === "sidebarEnd") {
    classes.push("r8-container--aside-end");
  }

  if (layout.value === "stack") {
    classes.push("r8-container--stack");
  }

  return classes.join(" ");
});

const containerStyles = computed(() => {
  const styles: Record<string, string> = {
    "--r8-container-min-height": "16rem",
  };

  const asideWidthMap: Record<AsideWidth, string> = {
    narrow: "10rem",
    medium: "13rem",
    wide: "16rem",
  };

  styles["--r8-container-aside-width"] = asideWidthMap[asideWidth.value];

  if (chromeHeight.value === "compact") {
    styles["--r8-container-header-height"] = "3rem";
    styles["--r8-container-footer-height"] = "2.5rem";
  }

  if (chromeHeight.value === "tall") {
    styles["--r8-container-header-height"] = "4.25rem";
    styles["--r8-container-footer-height"] = "3.25rem";
  }

  return styles;
});

const markup = computed(() => {
  const styleTokens = ['--r8-container-min-height: 16rem'];
  const asideWidthMap: Record<AsideWidth, string> = {
    narrow: "10rem",
    medium: "13rem",
    wide: "16rem",
  };

  styleTokens.push(`--r8-container-aside-width: ${asideWidthMap[asideWidth.value]}`);

  if (chromeHeight.value === "compact") {
    styleTokens.push("--r8-container-header-height: 3rem");
    styleTokens.push("--r8-container-footer-height: 2.5rem");
  }

  if (chromeHeight.value === "tall") {
    styleTokens.push("--r8-container-header-height: 4.25rem");
    styleTokens.push("--r8-container-footer-height: 3.25rem");
  }

  const lines = [`<div class="${renderedClassName.value}" style="${styleTokens.join("; ")}">`];

  if (showHeader.value) {
    lines.push(`  <header class="r8-container__header">${strings.value.regions.header}</header>`);
  }

  if (showAside.value) {
    lines.push(`  <aside class="r8-container__aside">${strings.value.regions.aside}</aside>`);
  }

  lines.push(`  <main class="r8-container__main">${strings.value.regions.main}</main>`);

  if (showFooter.value) {
    lines.push(`  <footer class="r8-container__footer">${strings.value.regions.footer}</footer>`);
  }

  lines.push(`</div>`);

  return lines.join("\n");
});

function resetPlayground() {
  layout.value = "sidebarStart";
  asideWidth.value = "medium";
  chromeHeight.value = "auto";
  showHeader.value = true;
  showAside.value = true;
  showFooter.value = true;
}

function getToggleClass(enabled: boolean) {
  return enabled ? "r8-btn r8-btn--sm r8-btn--secondary" : "r8-btn r8-btn--sm r8-btn--ghost";
}
</script>

<template>
  <section class="r8-panel docs-layout-container-playground">
    <div class="r8-panel__header">
      <div class="docs-layout-container-playground__header">
        <div class="docs-layout-container-playground__intro">
          <h2 class="r8-panel__title">{{ strings.title }}</h2>
          <p class="docs-panel__meta">{{ strings.copy }}</p>
        </div>

        <button class="r8-btn r8-btn--sm r8-btn--secondary" type="button" @click="resetPlayground">
          {{ strings.resetLabel }}
        </button>
      </div>
    </div>

    <div class="r8-panel__body docs-layout-container-playground__body">
      <div class="docs-layout-container-playground__controls">
        <div class="docs-layout-container-playground__field-grid">
          <label class="r8-field">
            <span class="r8-label">{{ strings.layoutField }}</span>
            <DocsControlSelect v-model="layout" :options="layoutOptions" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.asideWidthField }}</span>
            <DocsControlSelect v-model="asideWidth" :options="asideWidthOptions" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.chromeHeightField }}</span>
            <DocsControlSelect v-model="chromeHeight" :options="chromeHeightOptions" />
          </label>
        </div>

        <div class="r8-field">
          <span class="r8-label">{{ strings.sectionsLabel }}</span>
          <div class="docs-layout-container-playground__toggles">
            <button
              :class="getToggleClass(showHeader)"
              type="button"
              :aria-pressed="showHeader ? 'true' : 'false'"
              @click="showHeader = !showHeader"
            >
              {{ strings.headerLabel }}
            </button>
            <button
              :class="getToggleClass(showAside)"
              type="button"
              :aria-pressed="showAside ? 'true' : 'false'"
              @click="showAside = !showAside"
            >
              {{ strings.asideLabel }}
            </button>
            <button
              :class="getToggleClass(showFooter)"
              type="button"
              :aria-pressed="showFooter ? 'true' : 'false'"
              @click="showFooter = !showFooter"
            >
              {{ strings.footerLabel }}
            </button>
          </div>
        </div>
      </div>

      <div class="docs-demo__stage docs-layout-container-playground__stage">
        <div class="docs-layout-container-playground__preview">
          <span class="r8-label">{{ strings.previewLabel }}</span>
          <div class="docs-layout-container-playground__surface">
            <div :key="`${renderedClassName}-${showHeader}-${showAside}-${showFooter}-${chromeHeight}-${asideWidth}`" :class="renderedClassName" :style="containerStyles">
              <header v-if="showHeader" class="r8-container__header">
                {{ strings.regions.header }}
              </header>
              <aside v-if="showAside" class="r8-container__aside">
                {{ strings.regions.aside }}
              </aside>
              <main class="r8-container__main">
                {{ strings.regions.main }}
              </main>
              <footer v-if="showFooter" class="r8-container__footer">
                {{ strings.regions.footer }}
              </footer>
            </div>
          </div>
        </div>

        <p class="docs-demo__stage-copy">
          {{ strings.previewCopy }}
        </p>

        <DocsPlaygroundMarkup
          wrapper-class="docs-layout-container-playground__markup"
          code-class="docs-layout-container-playground__code"
          :label="strings.markupLabel"
          :code="markup"
          :button-label="site.componentPage.copyButton"
          :copied-label="site.componentPage.copySuccess"
          :unavailable-label="site.componentPage.copyUnavailable"
        />
      </div>
    </div>
  </section>
</template>
