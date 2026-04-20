<script setup lang="ts">
const props = defineProps<{
  site: any;
}>();

type RoleValue = "engineer" | "medic" | "explorer";
type ChannelValue = "online" | "offline";
type Retro8Runtime = {
  init?: (root?: Document | HTMLElement) => unknown;
};

const strings = computed(() => props.site.componentPage.formPlayground);

const previewSurface = ref<HTMLElement | null>(null);
const listenersBound = ref(false);

const emailValue = ref(strings.value.defaultEmail);
const passwordValue = ref(strings.value.defaultPassword);
const roleValue = ref<RoleValue>("explorer");
const channelValue = ref<ChannelValue>("online");
const ratingValue = ref(3);
const policyAccepted = ref(true);
const submitDisabled = ref(false);
const eventLog = ref<string[]>([strings.value.eventIdle]);

const roleOptions = computed(() => [
  { value: "engineer", label: strings.value.options.engineer },
  { value: "medic", label: strings.value.options.medic },
  { value: "explorer", label: strings.value.options.explorer },
]);

const channelOptions = computed(() => [
  { value: "online", label: strings.value.options.online },
  { value: "offline", label: strings.value.options.offline },
]);

const resolvedRoleLabel = computed(() => {
  const option = roleOptions.value.find((item) => item.value === roleValue.value);
  return option?.label || strings.value.options.explorer;
});

const previewKey = computed(() =>
  [
    roleValue.value,
    channelValue.value,
    ratingValue.value,
    policyAccepted.value ? "checked" : "unchecked",
    submitDisabled.value ? "disabled" : "enabled",
  ].join(":"),
);

const markup = computed(() => {
  const safeEmail = escapeAttribute(emailValue.value);
  const safePassword = escapeAttribute(passwordValue.value);
  const roleMarkup = roleOptions.value
    .map((option) => {
      const isSelected = option.value === roleValue.value;
      return `          <button class="r8-select__option${isSelected ? " is-selected" : ""}" type="button" data-r8-value="${option.value}">${escapeHtml(option.label)}</button>`;
    })
    .join("\n");

  const rateMarkup = Array.from({ length: 5 }, (_, index) => {
    const isActive = index < ratingValue.value;
    return `        <span class="r8-rate__item${isActive ? " is-active" : ""}" role="radio" aria-checked="${isActive ? "true" : "false"}">*</span>`;
  }).join("\n");

  return `<form class="r8-form">
  <div class="r8-form__row">
    <label class="r8-form__item">
      <span class="r8-form__label">${escapeHtml(strings.value.emailField)}</span>
      <input class="r8-input" type="email" name="email" value="${safeEmail}" placeholder="${escapeAttribute(strings.value.defaultEmail)}" />
      <span class="r8-form__help">${escapeHtml(strings.value.emailHelp)}</span>
    </label>
    <label class="r8-form__item">
      <span class="r8-form__label">${escapeHtml(strings.value.passwordField)}</span>
      <input class="r8-input" type="password" name="password" value="${safePassword}" placeholder="${escapeAttribute(strings.value.defaultPassword)}" />
      <span class="r8-form__help">${escapeHtml(strings.value.passwordHelp)}</span>
    </label>
  </div>
  <div class="r8-form__row">
    <label class="r8-form__item">
      <span class="r8-form__label">${escapeHtml(strings.value.roleField)}</span>
      <div class="r8-select" data-r8-value="${roleValue.value}">
        <button class="r8-select__trigger" type="button">
          <span data-r8-choice-display>${escapeHtml(resolvedRoleLabel.value)}</span>
          <span class="r8-choice__caret" aria-hidden="true">&gt;</span>
        </button>
        <div class="r8-select__menu" hidden>
${roleMarkup}
        </div>
      </div>
      <span class="r8-form__help">${escapeHtml(strings.value.roleHelp)}</span>
    </label>
    <div class="r8-form__item">
      <p class="r8-form__legend">${escapeHtml(strings.value.rateField)}</p>
      <div class="r8-rate" role="radiogroup" aria-label="${escapeAttribute(strings.value.rateField)}">
${rateMarkup}
      </div>
      <span class="r8-form__help">${escapeHtml(strings.value.rateHelp)}</span>
    </div>
  </div>
  <div class="r8-form__row">
    <div class="r8-form__item" data-r8-radio-group>
      <p class="r8-form__legend">${escapeHtml(strings.value.channelField)}</p>
      <div class="r8-stack">
        <label class="r8-radio${channelValue.value === "online" ? " is-checked" : ""}" data-r8-value="online" aria-checked="${channelValue.value === "online" ? "true" : "false"}">
          <span class="r8-radio__box" aria-hidden="true"></span>
          <span>${escapeHtml(strings.value.options.online)}</span>
        </label>
        <label class="r8-radio${channelValue.value === "offline" ? " is-checked" : ""}" data-r8-value="offline" aria-checked="${channelValue.value === "offline" ? "true" : "false"}">
          <span class="r8-radio__box" aria-hidden="true"></span>
          <span>${escapeHtml(strings.value.options.offline)}</span>
        </label>
      </div>
    </div>
    <div class="r8-form__item">
      <p class="r8-form__legend">${escapeHtml(strings.value.policyLegend)}</p>
      <label class="r8-checkbox${policyAccepted.value ? " is-checked" : ""}" aria-checked="${policyAccepted.value ? "true" : "false"}">
        <span class="r8-checkbox__box" aria-hidden="true"></span>
        <span>${escapeHtml(strings.value.policyText)}</span>
      </label>
    </div>
  </div>
  <div class="r8-form__actions">
    <button class="r8-btn r8-btn--primary" type="button" data-r8-submit-action="true"${submitDisabled.value ? " disabled" : ""}>${escapeHtml(strings.value.submitLabel)}</button>
    <button class="r8-btn r8-btn--ghost" type="button">${escapeHtml(strings.value.cancelLabel)}</button>
  </div>
</form>`;
});

function isRoleValue(value: unknown): value is RoleValue {
  return value === "engineer" || value === "medic" || value === "explorer";
}

function isChannelValue(value: unknown): value is ChannelValue {
  return value === "online" || value === "offline";
}

function normalizeRate(value: unknown, fallback = 3) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.min(5, Math.max(1, Math.round(parsed)));
}

function escapeAttribute(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

function getToggleClass(enabled: boolean) {
  return enabled ? "r8-btn r8-btn--sm r8-btn--secondary" : "r8-btn r8-btn--sm r8-btn--ghost";
}

function appendEvent(entry: string) {
  eventLog.value = [entry, ...eventLog.value].slice(0, 6);
}

function resetPlayground() {
  emailValue.value = strings.value.defaultEmail;
  passwordValue.value = strings.value.defaultPassword;
  roleValue.value = "explorer";
  channelValue.value = "online";
  ratingValue.value = 3;
  policyAccepted.value = true;
  submitDisabled.value = false;
  eventLog.value = [strings.value.eventIdle];
}

function bindPreviewEvents() {
  if (!(previewSurface.value instanceof HTMLElement) || listenersBound.value) {
    return;
  }

  listenersBound.value = true;

  previewSurface.value.addEventListener("change", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    if (target.name === "email") {
      emailValue.value = target.value;
      appendEvent(`${strings.value.emailEventLabel}: ${target.value || strings.value.emptyValue}`);
      return;
    }

    if (target.name === "password") {
      passwordValue.value = target.value;
      appendEvent(`${strings.value.passwordEventLabel}: ${target.value ? strings.value.passwordUpdated : strings.value.emptyValue}`);
    }
  });

  previewSurface.value.addEventListener("r8:choice-change", (event) => {
    const detail = ((event as CustomEvent).detail || {}) as Record<string, unknown>;
    const nextRole = detail.value;

    if (!isRoleValue(nextRole)) {
      return;
    }

    roleValue.value = nextRole;
    const roleLabel = roleOptions.value.find((option) => option.value === nextRole)?.label || nextRole;
    appendEvent(`${strings.value.roleEventLabel}: ${roleLabel}`);
  });

  previewSurface.value.addEventListener("r8:rate-change", (event) => {
    const detail = ((event as CustomEvent).detail || {}) as Record<string, unknown>;
    const nextValue = normalizeRate(detail.value, ratingValue.value);
    ratingValue.value = nextValue;
    appendEvent(`${strings.value.rateEventLabel}: ${nextValue}/5`);
  });

  previewSurface.value.addEventListener("r8:binary-change", (event) => {
    const detail = ((event as CustomEvent).detail || {}) as Record<string, unknown>;
    const kind = typeof detail.kind === "string" ? detail.kind : "";
    const checked = detail.checked === true;

    if (kind === "radio") {
      const target = event.target;
      const nextChannel = target instanceof HTMLElement ? target.dataset.r8Value : "";

      if (!isChannelValue(nextChannel)) {
        return;
      }

      channelValue.value = nextChannel;
      const channelLabel = channelOptions.value.find((option) => option.value === nextChannel)?.label || nextChannel;
      appendEvent(`${strings.value.channelEventLabel}: ${channelLabel}`);
      return;
    }

    if (kind === "checkbox") {
      policyAccepted.value = checked;
      appendEvent(`${strings.value.checkboxEventLabel}: ${checked ? strings.value.checkedState : strings.value.uncheckedState}`);
    }
  });

  previewSurface.value.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLElement) || !target.closest("[data-r8-submit-action]")) {
      return;
    }

    if (!submitDisabled.value) {
      appendEvent(strings.value.submitEventText);
    }
  });
}

function initPreviewRuntime() {
  if (!import.meta.client || !previewSurface.value) {
    return;
  }

  const runtime = (window as typeof window & { Retro8UI?: Retro8Runtime }).Retro8UI;
  runtime?.init?.(previewSurface.value);
  bindPreviewEvents();
}

watch(ratingValue, (nextValue) => {
  const normalized = normalizeRate(nextValue);
  if (normalized !== nextValue) {
    ratingValue.value = normalized;
  }
});

watch([roleValue, channelValue, ratingValue, policyAccepted, submitDisabled], async () => {
  await nextTick();
  initPreviewRuntime();
});

onMounted(async () => {
  await nextTick();
  initPreviewRuntime();
});
</script>

<template>
  <section class="r8-panel docs-form-playground">
    <div class="r8-panel__header">
      <div class="docs-form-playground__header">
        <div class="docs-form-playground__intro">
          <h2 class="r8-panel__title">{{ strings.title }}</h2>
          <p class="docs-panel__meta">{{ strings.copy }}</p>
        </div>

        <button class="r8-btn r8-btn--sm r8-btn--secondary" type="button" @click="resetPlayground">
          {{ strings.resetLabel }}
        </button>
      </div>
    </div>

    <div class="r8-panel__body docs-form-playground__body">
      <div class="docs-form-playground__controls">
        <div class="docs-form-playground__field-grid">
          <label class="r8-field">
            <span class="r8-label">{{ strings.emailField }}</span>
            <input v-model="emailValue" class="r8-input" type="email" maxlength="72" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.passwordField }}</span>
            <input v-model="passwordValue" class="r8-input" type="password" maxlength="48" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.roleField }}</span>
            <DocsControlSelect v-model="roleValue" :options="roleOptions" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.channelField }}</span>
            <DocsControlSelect v-model="channelValue" :options="channelOptions" />
          </label>

          <label class="r8-field">
            <span class="r8-label">{{ strings.rateField }}</span>
            <input v-model.number="ratingValue" class="r8-input" type="number" min="1" max="5" />
          </label>
        </div>

        <div class="r8-field">
          <span class="r8-label">{{ strings.statesLabel }}</span>
          <div class="docs-form-playground__toggles">
            <button
              :class="getToggleClass(policyAccepted)"
              type="button"
              :aria-pressed="policyAccepted ? 'true' : 'false'"
              @click="policyAccepted = !policyAccepted"
            >
              {{ strings.policyLabel }}
            </button>
            <button
              :class="getToggleClass(submitDisabled)"
              type="button"
              :aria-pressed="submitDisabled ? 'true' : 'false'"
              @click="submitDisabled = !submitDisabled"
            >
              {{ strings.submitDisabledLabel }}
            </button>
          </div>
        </div>
      </div>

      <div class="docs-demo__stage docs-form-playground__stage">
        <div class="docs-form-playground__preview">
          <span class="r8-label">{{ strings.previewLabel }}</span>
          <div ref="previewSurface" class="docs-form-playground__surface">
            <div :key="previewKey" v-html="markup" />
          </div>
        </div>

        <p class="docs-demo__stage-copy">
          {{ strings.previewCopy }}
        </p>

        <div class="docs-form-playground__events">
          <span class="r8-label">{{ strings.eventsLabel }}</span>
          <div class="docs-form-playground__event-log">
            <p v-for="(entry, index) in eventLog" :key="`${index}-${entry}`" class="r8-text r8-text--xs r8-text--muted">
              {{ entry }}
            </p>
          </div>
        </div>

        <DocsPlaygroundMarkup
          wrapper-class="docs-form-playground__markup"
          code-class="docs-form-playground__code"
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
