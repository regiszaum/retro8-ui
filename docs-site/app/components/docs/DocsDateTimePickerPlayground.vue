<script setup lang="ts">
const props = defineProps<{
  site: any;
}>();

type DatePickerLocale = "en-US" | "pt-BR";
type WeekStart = "0" | "1";
type TimeStep = "15" | "30" | "60";
type Retro8Runtime = {
  init?: (root?: Document | HTMLElement) => unknown;
};

const strings = computed(() => props.site.componentPage.dateTimePickerPlayground);

const previewSurface = ref<HTMLElement | null>(null);
const boundPicker = ref<HTMLElement | null>(null);

const placeholderText = ref(strings.value.defaultPlaceholder);
const locale = ref<DatePickerLocale>("en-US");
const weekStart = ref<WeekStart>("0");
const timeStep = ref<TimeStep>("30");
const constrained = ref(true);
const selectedValue = ref("2026-03-28T09:00");
const eventLog = ref<string[]>([strings.value.eventIdle]);

const localeOptions = computed(() => [
  { value: "en-US", label: strings.value.options.enUS },
  { value: "pt-BR", label: strings.value.options.ptBR },
]);

const weekStartOptions = computed(() => [
  { value: "0", label: strings.value.options.sunday },
  { value: "1", label: strings.value.options.monday },
]);

const timeStepOptions = computed(() => [
  { value: "15", label: strings.value.options.step15 },
  { value: "30", label: strings.value.options.step30 },
  { value: "60", label: strings.value.options.step60 },
]);

const resolvedPlaceholder = computed(() => placeholderText.value.trim() || strings.value.defaultPlaceholder);
const previewKey = computed(() =>
  [
    resolvedPlaceholder.value,
    locale.value,
    weekStart.value,
    timeStep.value,
    constrained.value ? "bounded" : "free",
  ].join(":"),
);

const displayValue = computed(() => formatDateTimeLabel(selectedValue.value, locale.value) || resolvedPlaceholder.value);

const markup = computed(() => {
  const attributes = [
    'class="r8-datetime-picker"',
    `data-r8-placeholder="${escapeAttribute(resolvedPlaceholder.value)}"`,
    `data-r8-locale="${locale.value}"`,
    `data-r8-week-start="${weekStart.value}"`,
    `data-r8-time-step="${timeStep.value}"`,
    'data-r8-month="2026-03"',
  ];

  if (selectedValue.value) {
    attributes.push(`data-r8-value="${selectedValue.value}"`);
  }

  if (constrained.value) {
    attributes.push('data-r8-min="2026-03-15T08:00"');
    attributes.push('data-r8-max="2026-04-18T22:00"');
  }

  return `<div ${attributes.join(" ")}>\n  <button class="r8-datetime-picker__trigger" type="button" aria-label="${escapeAttribute(resolvedPlaceholder.value)}">\n    <span data-r8-choice-display>${escapeHtml(displayValue.value)}</span>\n    <span class="r8-badge r8-badge--success">${escapeHtml(`${timeStep.value}m`)}</span>\n  </button>\n  <div class="r8-datetime-picker__panel"></div>\n</div>`;
});

function escapeAttribute(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

function parseDateTime(value: string) {
  if (!value) {
    return null;
  }

  const [datePart, timePart = ""] = value.split("T");
  const [year, month, day] = datePart.split("-").map((part) => Number(part));
  const [hours, minutes] = timePart.split(":").map((part) => Number(part));

  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day) ||
    !Number.isInteger(hours) ||
    !Number.isInteger(minutes)
  ) {
    return null;
  }

  const parsed = new Date(year, month - 1, day, hours, minutes, 0, 0);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatDateTimeLabel(value: string, nextLocale: DatePickerLocale) {
  const parsed = parseDateTime(value);
  if (!parsed) {
    return "";
  }

  return new Intl.DateTimeFormat(nextLocale, {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

function snapDateTimeToStep(value: string, nextStep: TimeStep) {
  const parsed = parseDateTime(value);
  if (!parsed) {
    return value;
  }

  const minutes = parsed.getHours() * 60 + parsed.getMinutes();
  const step = Number(nextStep);
  const snappedMinutes = Math.floor(minutes / step) * step;
  const nextHours = Math.max(0, Math.min(23, Math.floor(snappedMinutes / 60)));
  const nextMinutes = Math.max(0, Math.min(59, snappedMinutes % 60));

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  const hours = String(nextHours).padStart(2, "0");
  const minuteLabel = String(nextMinutes).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minuteLabel}`;
}

function resetPlayground() {
  placeholderText.value = strings.value.defaultPlaceholder;
  locale.value = "en-US";
  weekStart.value = "0";
  timeStep.value = "30";
  constrained.value = true;
  selectedValue.value = "2026-03-28T09:00";
  eventLog.value = [strings.value.eventIdle];
}

function toggleConstrained() {
  constrained.value = !constrained.value;
}

function getToggleClass(enabled: boolean) {
  return enabled ? "r8-btn r8-btn--sm r8-btn--secondary" : "r8-btn r8-btn--sm r8-btn--ghost";
}

function bindPreviewEvents() {
  const picker = previewSurface.value?.querySelector(".r8-datetime-picker");

  if (!(picker instanceof HTMLElement) || boundPicker.value === picker) {
    return;
  }

  boundPicker.value = picker;

  picker.addEventListener("r8:datetime-change", (event) => {
    const detail = ((event as CustomEvent).detail || {}) as Record<string, unknown>;
    const value = typeof detail.value === "string" ? detail.value : "";
    const label = typeof detail.label === "string" ? detail.label : "";

    selectedValue.value = value;
    eventLog.value = [`datetime-change: ${value || strings.value.clearedLabel}${label ? ` (${label})` : ""}`, ...eventLog.value].slice(0, 5);
  });
}

function initPreviewRuntime() {
  if (!import.meta.client || !previewSurface.value) {
    return;
  }

  boundPicker.value = null;
  const runtime = (window as typeof window & { Retro8UI?: Retro8Runtime }).Retro8UI;
  runtime?.init?.(previewSurface.value);
  bindPreviewEvents();
}

watch(timeStep, (nextStep) => {
  selectedValue.value = snapDateTimeToStep(selectedValue.value, nextStep);
});

watch([placeholderText, locale, weekStart, timeStep, constrained], async () => {
  await nextTick();
  initPreviewRuntime();
});

onMounted(async () => {
  await nextTick();
  initPreviewRuntime();
});
</script>

<template>
  <section class="r8-panel docs-date-picker-playground docs-datetime-picker-playground">
    <div class="r8-panel__header">
      <div class="docs-date-picker-playground__header">
        <div class="docs-date-picker-playground__intro">
          <h2 class="r8-panel__title">{{ strings.title }}</h2>
          <p class="docs-panel__meta">{{ strings.copy }}</p>
        </div>

        <button class="r8-btn r8-btn--sm r8-btn--secondary" type="button" @click="resetPlayground">
          {{ strings.resetLabel }}
        </button>
      </div>
    </div>

    <div class="r8-panel__body docs-date-picker-playground__body">
      <div class="docs-date-picker-playground__controls">
        <div class="docs-date-picker-playground__field-grid">
          <label class="r8-field">
            <span class="r8-label">{{ strings.placeholderField }}</span>
            <input v-model="placeholderText" class="r8-input" maxlength="32" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.localeField }}</span>
            <DocsControlSelect v-model="locale" :options="localeOptions" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.weekStartField }}</span>
            <DocsControlSelect v-model="weekStart" :options="weekStartOptions" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.timeStepField }}</span>
            <DocsControlSelect v-model="timeStep" :options="timeStepOptions" />
          </label>
        </div>

        <div class="r8-field">
          <span class="r8-label">{{ strings.statesLabel }}</span>
          <div class="docs-date-picker-playground__toggles">
            <button
              :class="getToggleClass(constrained)"
              type="button"
              :aria-pressed="constrained ? 'true' : 'false'"
              @click="toggleConstrained"
            >
              {{ strings.constrainedLabel }}
            </button>
          </div>
        </div>
      </div>

      <div class="docs-demo__stage docs-date-picker-playground__stage">
        <div class="docs-date-picker-playground__preview">
          <span class="r8-label">{{ strings.previewLabel }}</span>
          <div ref="previewSurface" class="docs-date-picker-playground__surface">
            <div
              :key="previewKey"
              class="r8-datetime-picker"
              :data-r8-value="selectedValue || null"
              data-r8-month="2026-03"
              :data-r8-placeholder="resolvedPlaceholder"
              :data-r8-locale="locale"
              :data-r8-week-start="weekStart"
              :data-r8-time-step="timeStep"
              :data-r8-min="constrained ? '2026-03-15T08:00' : null"
              :data-r8-max="constrained ? '2026-04-18T22:00' : null"
            >
              <button class="r8-datetime-picker__trigger" type="button" :aria-label="resolvedPlaceholder">
                <span data-r8-choice-display>{{ displayValue }}</span>
                <span class="r8-badge r8-badge--success">{{ `${timeStep}m` }}</span>
              </button>
              <div class="r8-datetime-picker__panel"></div>
            </div>
          </div>
          <p class="docs-date-picker-playground__helper">{{ strings.helperCopy }}</p>
        </div>

        <p class="docs-demo__stage-copy">
          {{ strings.previewCopy }}
        </p>

        <div class="docs-date-picker-playground__events">
          <span class="r8-label">{{ strings.eventsLabel }}</span>
          <div class="docs-date-picker-playground__event-log">
            <p v-for="(entry, index) in eventLog" :key="`${index}-${entry}`" class="r8-text r8-text--xs r8-text--muted">
              {{ entry }}
            </p>
          </div>
        </div>

        <DocsPlaygroundMarkup
          wrapper-class="docs-date-picker-playground__markup"
          code-class="docs-date-picker-playground__code"
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
