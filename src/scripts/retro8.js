(() => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  if (window.Retro8UI?.init) {
    return;
  }

  const choiceFamilies = [
    {
      root: ".r8-autocomplete",
      trigger: ".r8-autocomplete__trigger",
      panel: ".r8-autocomplete__menu",
      option: ".r8-autocomplete__option",
      kind: "autocomplete",
    },
    {
      root: ".r8-cascader",
      trigger: ".r8-cascader__trigger",
      panel: ".r8-cascader__panel",
      option: ".r8-cascader__option",
    },
    {
      root: ".r8-color-picker-panel",
      trigger: "",
      panel: ".r8-color-picker-panel",
      option: ".r8-color-picker__swatch",
      closeOnSelect: false,
      kind: "color",
    },
    {
      root: ".r8-color-picker",
      trigger: ".r8-color-picker__trigger",
      panel: ".r8-color-picker__panel",
      option: ".r8-color-picker__swatch",
      kind: "color",
    },
    {
      root: ".r8-mention",
      trigger: ".r8-mention__trigger",
      panel: ".r8-mention__menu",
      option: ".r8-mention__option",
      kind: "mention",
    },
    {
      root: ".r8-select",
      trigger: ".r8-select__trigger",
      panel: ".r8-select__menu",
      option: ".r8-select__option",
    },
    {
      root: ".r8-virtual-select",
      trigger: ".r8-virtual-select__trigger",
      panel: ".r8-virtual-select__menu",
      option: ".r8-virtual-select__option",
    },
    {
      root: ".r8-time-picker",
      trigger: ".r8-time-picker__trigger",
      panel: ".r8-time-picker__panel",
      option: ".r8-time-picker__slot",
      kind: "time",
    },
    {
      root: ".r8-time-select",
      trigger: ".r8-time-select__trigger",
      panel: ".r8-time-select__menu",
      option: ".r8-time-select__option",
      kind: "time",
    },
    {
      root: ".r8-tree-select",
      trigger: ".r8-tree-select__trigger",
      panel: ".r8-tree-select__panel",
      option: ".r8-tree-select__node",
    },
    {
      root: ".r8-dropdown",
      trigger: ".r8-btn, .r8-dropdown__trigger",
      panel: ".r8-dropdown__menu",
      option: ".r8-dropdown__item",
      kind: "dropdown",
    },
  ];

  const choiceStates = new WeakMap();
  const splitterStates = new WeakMap();
  const overlayTimers = new WeakMap();
  const floatingStates = new Set();
  const genericTargets = new Set();
  const observers = new WeakSet();
  const drawerTransitionMs = 270;
  let uniqueId = 0;
  const buttonVariants = ["primary", "secondary", "tertiary", "success", "info", "danger", "dark", "light", "ghost"];
  const badgeVariants = ["primary", "secondary", "tertiary", "success", "warning", "danger", "info", "dark", "light"];
  const tagVariants = ["success", "info", "danger"];
  const alertVariants = ["success", "info", "danger"];
  const alertPlacements = ["top-left", "bottom-left", "top-right", "bottom-right"];
  const progressVariants = ["success", "warning", "danger"];
  const windowVariants = ["success", "danger"];
  const navbarVariants = ["dark"];

  function toArray(value) {
    return Array.from(value || []);
  }

  function isElement(value) {
    return value instanceof HTMLElement;
  }

  function isDialog(value) {
    return typeof HTMLDialogElement !== "undefined" && value instanceof HTMLDialogElement;
  }

  function nextId(prefix) {
    uniqueId += 1;
    return `${prefix}-${uniqueId}`;
  }

  function firstMatch(root, selectorList) {
    if (!selectorList) {
      return null;
    }

    return root.querySelector(selectorList);
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function ensureId(element, prefix) {
    if (!isElement(element)) {
      return "";
    }

    if (!element.id) {
      element.id = nextId(prefix);
    }

    return element.id;
  }

  function isValidDate(value) {
    return value instanceof Date && !Number.isNaN(value.getTime());
  }

  function padNumber(value) {
    return String(value).padStart(2, "0");
  }

  function normalizeLocale(value) {
    if (typeof value !== "string" || !value.trim()) {
      return "en-US";
    }

    if (value.includes("-")) {
      const [language, region] = value.split("-");
      if (language && region) {
        return `${language.toLowerCase()}-${region.toUpperCase()}`;
      }
    }

    return value;
  }

  function createCalendarDate(year, month, day) {
    return new Date(year, month, day, 12, 0, 0, 0);
  }

  function createDateTime(date, timeValue = "00:00") {
    if (!isValidDate(date)) {
      return null;
    }

    const [hoursText, minutesText] = String(timeValue).split(":");
    const hours = clamp(Number(hoursText) || 0, 0, 23);
    const minutes = clamp(Number(minutesText) || 0, 0, 59);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes, 0, 0);
  }

  function addCalendarDays(date, amount) {
    if (!isValidDate(date)) {
      return null;
    }

    return createCalendarDate(date.getFullYear(), date.getMonth(), date.getDate() + amount);
  }

  function addCalendarMonths(date, amount) {
    if (!isValidDate(date)) {
      return null;
    }

    return createCalendarDate(date.getFullYear(), date.getMonth() + amount, 1);
  }

  function startOfMonth(date) {
    if (!isValidDate(date)) {
      return null;
    }

    return createCalendarDate(date.getFullYear(), date.getMonth(), 1);
  }

  function startOfWeek(date, weekStart) {
    if (!isValidDate(date)) {
      return null;
    }

    const safeWeekStart = clamp(Number(weekStart) || 0, 0, 6);
    const start = createCalendarDate(date.getFullYear(), date.getMonth(), date.getDate());
    const diff = (start.getDay() - safeWeekStart + 7) % 7;
    start.setDate(start.getDate() - diff);
    return createCalendarDate(start.getFullYear(), start.getMonth(), start.getDate());
  }

  function toDateKey(date) {
    if (!isValidDate(date)) {
      return "";
    }

    return `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(date.getDate())}`;
  }

  function toMonthKey(date) {
    if (!isValidDate(date)) {
      return "";
    }

    return `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}`;
  }

  function parseDateValue(value) {
    if (typeof value !== "string" || !value.trim()) {
      return null;
    }

    const match = value.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) {
      return null;
    }

    const [, yearText, monthText, dayText] = match;
    const year = Number(yearText);
    const month = Number(monthText);
    const day = Number(dayText);
    const date = createCalendarDate(year, month - 1, day);
    return toDateKey(date) === value.trim() ? date : null;
  }

  function parseMonthValue(value) {
    if (typeof value !== "string" || !value.trim()) {
      return null;
    }

    const match = value.trim().match(/^(\d{4})-(\d{2})$/);
    if (!match) {
      return null;
    }

    const [, yearText, monthText] = match;
    const year = Number(yearText);
    const month = Number(monthText);
    const date = createCalendarDate(year, month - 1, 1);
    return toMonthKey(date) === value.trim() ? date : null;
  }

  function parseDateTimeValue(value) {
    if (typeof value !== "string" || !value.trim()) {
      return null;
    }

    const match = value
      .trim()
      .match(/^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2}))?$/);
    if (!match) {
      return null;
    }

    const [, yearText, monthText, dayText, hoursText = "00", minutesText = "00"] = match;
    const year = Number(yearText);
    const month = Number(monthText);
    const day = Number(dayText);
    const hours = Number(hoursText);
    const minutes = Number(minutesText);
    const date = new Date(year, month - 1, day, hours, minutes, 0, 0);

    if (!isValidDate(date)) {
      return null;
    }

    const normalizedDate = toDateKey(date);
    const normalizedTime = `${padNumber(hours)}:${padNumber(minutes)}`;
    return {
      date: createCalendarDate(date.getFullYear(), date.getMonth(), date.getDate()),
      time: normalizedTime,
      hasTime: Boolean(match[4]),
      timestamp: date.getTime(),
      dateKey: normalizedDate,
      raw: value.trim(),
    };
  }

  function formatStorageValue(date) {
    return toDateKey(date);
  }

  function formatDateTimeStorageValue(date, timeValue) {
    const dateKey = formatStorageValue(date);
    return dateKey ? `${dateKey}T${timeValue}` : "";
  }

  function isSameCalendarDay(left, right) {
    return toDateKey(left) !== "" && toDateKey(left) === toDateKey(right);
  }

  function buildWeekdayLabels(locale, weekStart) {
    const formatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
    const baseDate = createCalendarDate(2026, 2, 1);
    const labels = [];

    for (let offset = 0; offset < 7; offset += 1) {
      const date = addCalendarDays(baseDate, (Number(weekStart) || 0) + offset);
      labels.push(formatter.format(date || baseDate));
    }

    return labels;
  }

  function formatMonthTitle(date, locale) {
    if (!isValidDate(date)) {
      return "";
    }

    return new Intl.DateTimeFormat(locale, {
      month: "long",
      year: "numeric",
    }).format(date);
  }

  function formatDateLabel(date, locale) {
    if (!isValidDate(date)) {
      return "";
    }

    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  }

  function formatDateTimeLabel(date, timeValue, locale) {
    const dateTime = createDateTime(date, timeValue);
    if (!isValidDate(dateTime)) {
      return formatDateLabel(date, locale);
    }

    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(dateTime);
  }

  function roundTimeToStep(stepMinutes) {
    const now = new Date();
    const totalMinutes = now.getHours() * 60 + now.getMinutes();
    const rounded = Math.round(totalMinutes / stepMinutes) * stepMinutes;
    const hours = clamp(Math.floor((rounded % (24 * 60)) / 60), 0, 23);
    const minutes = clamp(rounded % 60, 0, 59);
    return `${padNumber(hours)}:${padNumber(minutes)}`;
  }

  function buildTimeSlots(stepMinutes) {
    const safeStep = clamp(Number(stepMinutes) || 30, 5, 720);
    const slots = [];

    for (let minutes = 0; minutes < 24 * 60; minutes += safeStep) {
      const hours = Math.floor(minutes / 60);
      const remainder = minutes % 60;
      slots.push(`${padNumber(hours)}:${padNumber(remainder)}`);
    }

    return slots;
  }

  function compareTimeValues(left, right) {
    const [leftHours, leftMinutes] = String(left).split(":").map((chunk) => Number(chunk) || 0);
    const [rightHours, rightMinutes] = String(right).split(":").map((chunk) => Number(chunk) || 0);
    return leftHours * 60 + leftMinutes - (rightHours * 60 + rightMinutes);
  }

  function emitComponentEvent(target, name, detail = {}) {
    if (!isElement(target)) {
      return;
    }

    target.dispatchEvent(
      new CustomEvent(`r8:${name}`, {
        bubbles: true,
        detail,
      }),
    );
  }

  function matchesTrue(value) {
    return value === "true" || value === "";
  }

  function syncVariantClasses(element, baseClass, variants, variantValue) {
    if (!isElement(element)) {
      return;
    }

    if (!variantValue || !variants.includes(variantValue)) {
      return;
    }

    variants.forEach((variant) => element.classList.remove(`${baseClass}--${variant}`));
    element.classList.add(`${baseClass}--${variantValue}`);
  }

  function ensureButtonSpinner(button) {
    let spinner = button.querySelector(".r8-btn__spinner");
    if (spinner instanceof HTMLElement) {
      return spinner;
    }

    spinner = document.createElement("span");
    spinner.className = "r8-btn__spinner";
    spinner.setAttribute("aria-hidden", "true");
    button.prepend(spinner);
    return spinner;
  }

  function syncButtons(root) {
    toArray(root.querySelectorAll(".r8-btn")).forEach((button) => {
      if (!(button instanceof HTMLElement)) {
        return;
      }

      if (button.dataset.r8ButtonReady !== "true") {
        button.dataset.r8ButtonReady = "true";
        if (button instanceof HTMLButtonElement) {
          button.dataset.r8BaseDisabled = button.disabled ? "true" : "false";
        } else {
          button.dataset.r8BaseDisabled = button.getAttribute("aria-disabled") === "true" ? "true" : "false";
        }

        button.dataset.r8BaseAriaPressed = button.getAttribute("aria-pressed") === "true" ? "true" : "false";
      }

      const variantValue = button.dataset.r8Variant || "";
      const sizeValue = button.dataset.r8Size || "";
      const hasBlockBinding = Object.prototype.hasOwnProperty.call(button.dataset, "r8Block");
      const hasLoadingBinding = Object.prototype.hasOwnProperty.call(button.dataset, "r8Loading");
      const hasActiveBinding = Object.prototype.hasOwnProperty.call(button.dataset, "r8Active");

      syncVariantClasses(button, "r8-btn", buttonVariants, variantValue);

      if (sizeValue) {
        button.classList.remove("r8-btn--sm", "r8-btn--lg");

        if (sizeValue === "sm") {
          button.classList.add("r8-btn--sm");
        } else if (sizeValue === "lg") {
          button.classList.add("r8-btn--lg");
        }
      }

      if (hasBlockBinding) {
        button.classList.toggle("r8-btn--block", matchesTrue(button.dataset.r8Block || "false"));
      }

      const isLoading = hasLoadingBinding && matchesTrue(button.dataset.r8Loading || "false");
      const isActive = hasActiveBinding ? matchesTrue(button.dataset.r8Active || "false") : matchesTrue(button.dataset.r8BaseAriaPressed || "false");
      const baseDisabled = matchesTrue(button.dataset.r8BaseDisabled || "false");

      if (hasLoadingBinding) {
        button.classList.toggle("is-loading", isLoading);
        button.setAttribute("aria-busy", isLoading ? "true" : "false");
      }

      if (hasActiveBinding) {
        button.setAttribute("aria-pressed", isActive ? "true" : "false");
      }

      if (hasLoadingBinding) {
        if (button instanceof HTMLButtonElement) {
          button.disabled = isLoading || baseDisabled;
        }

        if (isLoading || baseDisabled) {
          button.setAttribute("aria-disabled", "true");
        } else {
          button.removeAttribute("aria-disabled");
        }
      }

      if (isLoading) {
        ensureButtonSpinner(button);
      } else if (hasLoadingBinding) {
        button.querySelector(".r8-btn__spinner")?.remove();
      }
    });
  }

  function syncVariantDrivenSurfaces(root) {
    const families = [
      { selector: ".r8-badge", baseClass: "r8-badge", variants: badgeVariants },
      { selector: ".r8-tag", baseClass: "r8-tag", variants: tagVariants },
      { selector: ".r8-alert", baseClass: "r8-alert", variants: alertVariants },
      { selector: ".r8-progress", baseClass: "r8-progress", variants: progressVariants },
      { selector: ".r8-window", baseClass: "r8-window", variants: windowVariants },
      { selector: ".r8-navbar", baseClass: "r8-navbar", variants: navbarVariants },
    ];

    families.forEach((family) => {
      toArray(root.querySelectorAll(family.selector)).forEach((element) => {
        if (!(element instanceof HTMLElement)) {
          return;
        }

        syncVariantClasses(element, family.baseClass, family.variants, element.dataset.r8Variant || "");

        if (family.selector === ".r8-alert" && typeof element.dataset.r8Placement === "string" && element.dataset.r8Placement.trim()) {
          alertPlacements.forEach((placement) => {
            element.classList.remove(`r8-alert--${placement}`);
          });

          const placement = element.dataset.r8Placement || "";
          if (alertPlacements.includes(placement)) {
            element.classList.add(`r8-alert--${placement}`);
          }
        }
      });
    });
  }

  function getTextValue(element) {
    if (!isElement(element)) {
      return "";
    }

    const explicitValue = element.dataset.r8Value || element.getAttribute("aria-label");
    if (explicitValue) {
      return explicitValue.trim();
    }

    const text = (element.textContent || "").trim();
    if (text) {
      return text;
    }

    const inlineBackground = element.style?.background || element.style?.backgroundColor;
    return inlineBackground ? inlineBackground.trim() : "";
  }

  function getChoiceDisplay(trigger) {
    if (!isElement(trigger)) {
      return null;
    }

    return (
      trigger.querySelector("[data-r8-choice-display]") ||
      trigger.querySelector(".r8-badge") ||
      trigger.querySelector("strong") ||
      trigger.querySelector("span")
    );
  }

  function setExpanded(trigger, expanded) {
    if (!isElement(trigger)) {
      return;
    }

    trigger.setAttribute("aria-expanded", expanded ? "true" : "false");
  }

  function syncExpandedState(state, expanded) {
    if (!state) {
      return;
    }

    setExpanded(state.trigger, expanded);

    if (state.input instanceof HTMLElement) {
      state.input.setAttribute("aria-expanded", expanded ? "true" : "false");
    }
  }

  function setHidden(target, hidden) {
    if (!target) {
      return;
    }

    if (hidden) {
      target.setAttribute("hidden", "");
      if (!isDialog(target)) {
        target.setAttribute("aria-hidden", "true");
      }
      return;
    }

    target.removeAttribute("hidden");
    if (!isDialog(target)) {
      target.removeAttribute("aria-hidden");
    }
  }

  function isOpen(target) {
    if (!target) {
      return false;
    }

    if (isDialog(target)) {
      return Boolean(target.open);
    }

    return !target.hasAttribute("hidden");
  }

  function closeFloating(container) {
    const state = choiceStates.get(container);
    if (!state?.panel) {
      return;
    }

    setHidden(state.panel, true);
    state.panel.classList.remove("is-open");
    syncExpandedState(state, false);
    floatingStates.delete(container);
  }

  function openFloating(container) {
    const state = choiceStates.get(container);
    if (!state?.panel) {
      return;
    }

    setHidden(state.panel, false);
    state.panel.classList.add("is-open");
    syncExpandedState(state, true);
    floatingStates.add(container);
  }

  function toggleFloating(container) {
    const state = choiceStates.get(container);
    if (!state?.panel) {
      return;
    }

    if (isOpen(state.panel)) {
      closeFloating(container);
      return;
    }

    openFloating(container);
  }

  function updateChoiceDisplay(container, option, family) {
    const state = choiceStates.get(container);
    if (!state?.trigger && !(state?.input instanceof HTMLInputElement)) {
      return;
    }

    const value = getTextValue(option);
    const display = getChoiceDisplay(state.trigger);

    if (family.kind === "autocomplete") {
      if (state.input instanceof HTMLInputElement && value) {
        state.input.value = value;
      }
      return;
    }

    if (family.kind === "color") {
      if (display) {
        display.textContent = value || "#3dc2ff";
        if (isElement(option)) {
          const colorValue = option.dataset.r8Value || option.style.background || option.style.backgroundColor;
          if (colorValue) {
            display.style.background = colorValue;
          }
        }
      }
      return;
    }

    if (family.kind === "mention") {
      const token = state.trigger.querySelector(".r8-mention__token");
      if (token) {
        token.textContent = value;
      }
      return;
    }

    if (family.kind === "datetime") {
      const display = getChoiceDisplay(state.trigger);
      if (!display) {
        return;
      }

      const dateValue = getTextValue(state.selectedDate);
      const timeValue = getTextValue(state.selectedTime);
      display.textContent = [dateValue, timeValue].filter(Boolean).join(" ");
      return;
    }

    if (display && value) {
      display.textContent = value;
    }
  }

  function markChoiceSelection(container, option, family, options = {}) {
    const state = choiceStates.get(container);
    if (!state?.options?.length) {
      return;
    }

    const silent = options.silent === true;

    if (family.kind === "autocomplete") {
      state.options.forEach((item) => {
        const isSelected = item === option;
        item.classList.toggle("is-selected", isSelected);
        item.classList.toggle("is-active", isSelected);
        item.setAttribute("aria-selected", isSelected ? "true" : "false");
      });

      state.activeOption = option;
      state.selectedOption = option;
      updateChoiceDisplay(container, option, family);

      if (state.input instanceof HTMLInputElement) {
        state.input.setAttribute("aria-activedescendant", ensureId(option, "r8-autocomplete-option"));
      }

      if (family.closeOnSelect !== false && state.panel) {
        closeFloating(container);
      }

      if (!silent) {
        emitComponentEvent(container, "choice-change", {
          kind: family.kind,
          option,
          text: getTextValue(option),
          value: getTextValue(option),
        });
      }

      return;
    }

    if (family.kind === "datetime") {
      const isDateOption = option.matches(".r8-date-picker__day");
      state.options.forEach((item) => {
        const matchesGroup = isDateOption ? item.matches(".r8-date-picker__day") : item.matches(".r8-time-picker__slot");
        if (!matchesGroup) {
          return;
        }

        item.classList.toggle("is-selected", item === option);
        item.setAttribute("aria-selected", item === option ? "true" : "false");
      });

      if (isDateOption) {
        state.selectedDate = option;
      } else {
        state.selectedTime = option;
      }

      updateChoiceDisplay(container, option, family);

      if (!isDateOption && family.closeOnSelect !== false && state.panel && state.trigger) {
        closeFloating(container);
      }

      if (!silent) {
        emitComponentEvent(container, "choice-change", {
          kind: family.kind,
          option,
          text: getTextValue(option),
          value: getTextValue(option),
        });
      }

      return;
    }

    state.options.forEach((item) => {
      item.classList.toggle("is-selected", item === option);
      item.setAttribute("aria-selected", item === option ? "true" : "false");
    });

    updateChoiceDisplay(container, option, family);

    if (family.closeOnSelect !== false && state.panel && state.trigger) {
      closeFloating(container);
    }

    if (!silent) {
      emitComponentEvent(container, "choice-change", {
        kind: family.kind || "choice",
        option,
        text: getTextValue(option),
        value: getTextValue(option),
      });
    }
  }

  function prepareActionLikeElement(element, fallbackRole = "button") {
    if (!isElement(element)) {
      return;
    }

    if (element.tagName !== "BUTTON" && element.tagName !== "A") {
      element.setAttribute("role", element.getAttribute("role") || fallbackRole);
      if (!element.hasAttribute("tabindex")) {
        element.tabIndex = 0;
      }
    }
  }

  function bindKeyboardActivation(element, handler) {
    if (!isElement(element)) {
      return;
    }

    if (element.tagName === "BUTTON" || element.tagName === "A") {
      return;
    }

    element.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handler(event);
      }
    });
  }

  function getVisibleOptions(state) {
    return (state?.options || []).filter((item) => item instanceof HTMLElement && !item.hasAttribute("hidden"));
  }

  function syncAutocompleteCount(state) {
    if (!state?.count) {
      return;
    }

    const visibleCount = getVisibleOptions(state).length;
    state.count.textContent = String(visibleCount);
  }

  function setAutocompleteActiveOption(state, option) {
    if (!state?.options?.length) {
      return;
    }

    state.options.forEach((item) => {
      item.classList.toggle("is-active", item === option);
    });

    state.activeOption = option || null;

    if (state.input instanceof HTMLInputElement) {
      if (option) {
        state.input.setAttribute("aria-activedescendant", ensureId(option, "r8-autocomplete-option"));
      } else {
        state.input.removeAttribute("aria-activedescendant");
      }
    }
  }

  function filterAutocompleteOptions(container) {
    const state = choiceStates.get(container);
    if (!state?.options?.length || !(state.input instanceof HTMLInputElement)) {
      return;
    }

    const query = state.input.value.trim().toLowerCase();
    state.options.forEach((option) => {
      const searchValue = `${option.dataset.r8Search || ""} ${getTextValue(option)} ${(option.textContent || "").trim()}`.toLowerCase();
      const shouldShow = !query || searchValue.includes(query);
      if (shouldShow) {
        option.removeAttribute("hidden");
      } else {
        option.setAttribute("hidden", "");
      }
    });

    const visibleOptions = getVisibleOptions(state);
    const nextActive =
      visibleOptions.find((option) => option.classList.contains("is-selected")) ||
      visibleOptions[0] ||
      null;

    setAutocompleteActiveOption(state, nextActive);
    syncAutocompleteCount(state);
  }

  function initAutocomplete(container, family) {
    const trigger = firstMatch(container, family.trigger);
    const panel = firstMatch(container, family.panel);
    const input = container.querySelector(".r8-autocomplete__input");
    const count = trigger?.querySelector("[data-r8-autocomplete-count]") || trigger?.querySelector(".r8-badge") || null;
    const options = toArray(container.querySelectorAll(family.option)).filter((item) => item instanceof HTMLElement);

    if (!(trigger instanceof HTMLElement) || !(panel instanceof HTMLElement) || !(input instanceof HTMLInputElement)) {
      return;
    }

    ensureId(panel, "r8-autocomplete-listbox");
    panel.setAttribute("role", "listbox");

    input.setAttribute("role", "combobox");
    input.setAttribute("aria-autocomplete", "list");
    input.setAttribute("aria-controls", panel.id);
    input.setAttribute("aria-expanded", "false");
    input.setAttribute("autocomplete", input.getAttribute("autocomplete") || "off");
    input.setAttribute("spellcheck", input.getAttribute("spellcheck") || "false");

    choiceStates.set(container, {
      trigger,
      panel,
      options,
      input,
      count,
      activeOption: null,
      selectedOption: null,
    });

    setHidden(panel, true);
    setExpanded(trigger, false);

    trigger.addEventListener("click", () => {
      input.focus();
      openFloating(container);
      filterAutocompleteOptions(container);
    });

    input.addEventListener("focus", () => {
      openFloating(container);
      filterAutocompleteOptions(container);
    });

    input.addEventListener("input", () => {
      filterAutocompleteOptions(container);
    });

    input.addEventListener("keydown", (event) => {
      const state = choiceStates.get(container);
      if (!state) {
        return;
      }

      const visibleOptions = getVisibleOptions(state);
      const currentIndex = visibleOptions.indexOf(state.activeOption);

      if (event.key === "ArrowDown") {
        event.preventDefault();
        if (!isOpen(panel)) {
          openFloating(container);
          filterAutocompleteOptions(container);
        }

        const nextOption =
          visibleOptions[currentIndex >= 0 ? clamp(currentIndex + 1, 0, visibleOptions.length - 1) : 0] || null;
        setAutocompleteActiveOption(state, nextOption);
        nextOption?.scrollIntoView({ block: "nearest" });
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        if (!isOpen(panel)) {
          openFloating(container);
          filterAutocompleteOptions(container);
        }

        const nextOption =
          visibleOptions[currentIndex >= 0 ? clamp(currentIndex - 1, 0, visibleOptions.length - 1) : visibleOptions.length - 1] ||
          null;
        setAutocompleteActiveOption(state, nextOption);
        nextOption?.scrollIntoView({ block: "nearest" });
        return;
      }

      if (event.key === "Enter" && state.activeOption) {
        event.preventDefault();
        markChoiceSelection(container, state.activeOption, family);
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        closeFloating(container);
      }
    });

    options.forEach((option) => {
      prepareActionLikeElement(option, "option");
      ensureId(option, "r8-autocomplete-option");
      option.setAttribute("aria-selected", option.classList.contains("is-selected") ? "true" : "false");
      option.addEventListener("click", () => markChoiceSelection(container, option, family));
      bindKeyboardActivation(option, () => markChoiceSelection(container, option, family));
    });

    const initialOption = options.find((option) => option.classList.contains("is-selected")) || null;
    if (initialOption) {
      markChoiceSelection(container, initialOption, family, { silent: true });
    }

    filterAutocompleteOptions(container);
  }

  function getDatePickerMessages(locale) {
    const isPortuguese = normalizeLocale(locale).toLowerCase().startsWith("pt");

    if (isPortuguese) {
      return {
        previousMonth: "Mes anterior",
        nextMonth: "Proximo mes",
        today: "Hoje",
        now: "Agora",
        clear: "Clear",
        calendar: "Calendario",
        time: "Time",
        empty: "Selecione uma data",
        emptyDateTime: "Selecione data e time",
      };
    }

    return {
      previousMonth: "Previous month",
      nextMonth: "Next month",
      today: "Today",
      now: "Now",
      clear: "Clear",
      calendar: "Calendar",
      time: "Time",
      empty: "Select a date",
      emptyDateTime: "Select date and time",
    };
  }

  function isDateDisabled(state, date) {
    const dateKey = toDateKey(date);
    if (!dateKey) {
      return true;
    }

    if (state.minDateKey && dateKey < state.minDateKey) {
      return true;
    }

    if (state.maxDateKey && dateKey > state.maxDateKey) {
      return true;
    }

    return false;
  }

  function isTimeDisabled(state, timeValue) {
    if (state.kind !== "datetime" || !state.valueDate) {
      return false;
    }

    if (state.minConstraint?.hasTime && isSameCalendarDay(state.valueDate, state.minConstraint.date)) {
      if (compareTimeValues(timeValue, state.minConstraint.time) < 0) {
        return true;
      }
    }

    if (state.maxConstraint?.hasTime && isSameCalendarDay(state.valueDate, state.maxConstraint.date)) {
      if (compareTimeValues(timeValue, state.maxConstraint.time) > 0) {
        return true;
      }
    }

    return false;
  }

  function findNearestEnabledDate(state, preferredDate) {
    if (isValidDate(preferredDate) && !isDateDisabled(state, preferredDate)) {
      return createCalendarDate(preferredDate.getFullYear(), preferredDate.getMonth(), preferredDate.getDate());
    }

    const baseDate =
      (isValidDate(preferredDate) && preferredDate) ||
      state.valueDate ||
      state.viewDate ||
      createCalendarDate(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

    for (let offset = 1; offset <= 370; offset += 1) {
      const forward = addCalendarDays(baseDate, offset);
      if (isValidDate(forward) && !isDateDisabled(state, forward)) {
        return forward;
      }

      const backward = addCalendarDays(baseDate, -offset);
      if (isValidDate(backward) && !isDateDisabled(state, backward)) {
        return backward;
      }
    }

    return null;
  }

  function findBestTimeValue(state, preferredTime) {
    const availableSlots = state.timeSlots.filter((slot) => !isTimeDisabled(state, slot));
    if (!availableSlots.length) {
      return "";
    }

    if (preferredTime && availableSlots.includes(preferredTime)) {
      return preferredTime;
    }

    const safePreferred = preferredTime || roundTimeToStep(state.timeStep);
    const nextSlot = availableSlots.find((slot) => compareTimeValues(slot, safePreferred) >= 0);
    return nextSlot || availableSlots[availableSlots.length - 1];
  }

  function getDatePickerValue(state) {
    if (!state.valueDate) {
      return "";
    }

    if (state.kind === "datetime") {
      return state.selectedTime ? formatDateTimeStorageValue(state.valueDate, state.selectedTime) : formatStorageValue(state.valueDate);
    }

    return formatStorageValue(state.valueDate);
  }

  function getDatePickerLabel(state) {
    if (!state.valueDate) {
      return state.placeholder;
    }

    if (state.kind === "datetime") {
      return state.selectedTime ? formatDateTimeLabel(state.valueDate, state.selectedTime, state.locale) : formatDateLabel(state.valueDate, state.locale);
    }

    return formatDateLabel(state.valueDate, state.locale);
  }

  function syncDatePickerDisplay(state) {
    if (!(state.display instanceof HTMLElement)) {
      return;
    }

    const hasValue = isValidDate(state.valueDate);
    state.display.textContent = getDatePickerLabel(state);
    state.display.classList.toggle("is-placeholder", !hasValue);
    state.display.setAttribute("data-r8-value", getDatePickerValue(state));
  }

  function emitDatePickerEvent(state, options = {}) {
    if (options.silent === true) {
      return;
    }

    const detail = {
      kind: state.kind,
      value: getDatePickerValue(state),
      label: getDatePickerLabel(state),
      date: state.valueDate ? formatStorageValue(state.valueDate) : "",
      time: state.kind === "datetime" ? state.selectedTime || "" : "",
      panel: state.panel,
      trigger: state.trigger,
    };

    emitComponentEvent(state.container, state.kind === "datetime" ? "datetime-change" : "date-change", detail);
    emitComponentEvent(state.container, "choice-change", detail);
  }

  function focusDateButton(state, date) {
    if (!(state.panel instanceof HTMLElement)) {
      return;
    }

    const dateKey = typeof date === "string" ? date : toDateKey(date);
    const button = state.panel.querySelector(`.r8-date-picker__day[data-r8-date="${dateKey}"]`);
    if (button instanceof HTMLElement && !button.hasAttribute("disabled")) {
      button.focus();
    }
  }

  function focusTimeButton(state, timeValue) {
    if (!(state.panel instanceof HTMLElement)) {
      return;
    }

    const button = state.panel.querySelector(`.r8-time-picker__slot[data-r8-time="${timeValue}"]`);
    if (button instanceof HTMLElement && !button.hasAttribute("disabled")) {
      button.focus();
      button.scrollIntoView({ block: "nearest" });
    }
  }

  function focusDatePickerEntry(state) {
    if (state.kind === "datetime" && state.selectedTime) {
      focusDateButton(state, state.valueDate || state.viewDate);
      return;
    }

    focusDateButton(state, state.valueDate || findNearestEnabledDate(state, new Date()) || state.viewDate);
  }

  function ensureDateTimeDefaults(state) {
    if (state.kind !== "datetime") {
      return;
    }

    if (!state.valueDate) {
      return;
    }

    const nextTime = findBestTimeValue(state, state.selectedTime || roundTimeToStep(state.timeStep));
    state.selectedTime = nextTime;
  }

  function setDatePickerValue(state, nextDate, options = {}) {
    const silent = options.silent === true;
    const closeOnCommit = options.closeOnCommit !== false;

    if (nextDate && isDateDisabled(state, nextDate)) {
      return;
    }

    state.valueDate = nextDate
      ? createCalendarDate(nextDate.getFullYear(), nextDate.getMonth(), nextDate.getDate())
      : null;

    if (state.valueDate) {
      state.viewDate = startOfMonth(state.valueDate) || state.viewDate;
    }

    ensureDateTimeDefaults(state);
    renderDatePicker(state);
    syncDatePickerDisplay(state);
    emitDatePickerEvent(state, { silent });

    if (state.valueDate) {
      if (state.kind === "date" && state.trigger && closeOnCommit) {
        closeFloating(state.container);
        state.trigger.focus();
      } else if (state.kind === "datetime") {
        focusDateButton(state, state.valueDate);
      }
    }
  }

  function setDateTimeValue(state, nextTime, options = {}) {
    const silent = options.silent === true;
    const closeOnCommit = options.closeOnCommit !== false;

    if (state.kind !== "datetime") {
      return;
    }

    if (!state.valueDate) {
      state.valueDate = findNearestEnabledDate(state, new Date()) || state.viewDate;
    }

    if (!state.valueDate || isTimeDisabled(state, nextTime)) {
      return;
    }

    state.selectedTime = nextTime;
    renderDatePicker(state);
    syncDatePickerDisplay(state);
    emitDatePickerEvent(state, { silent });

    if (state.trigger && closeOnCommit) {
      closeFloating(state.container);
      state.trigger.focus();
    } else {
      focusTimeButton(state, nextTime);
    }
  }

  function clearDatePickerValue(state, options = {}) {
    state.valueDate = null;
    state.selectedTime = state.kind === "datetime" ? "" : state.selectedTime;
    state.viewDate = startOfMonth(state.viewDate || createCalendarDate(new Date().getFullYear(), new Date().getMonth(), 1));
    renderDatePicker(state);
    syncDatePickerDisplay(state);
    emitDatePickerEvent(state, options);
  }

  function selectToday(state, options = {}) {
    const today = findNearestEnabledDate(
      state,
      createCalendarDate(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
    );

    if (!today) {
      return;
    }

    state.viewDate = startOfMonth(today) || state.viewDate;

    if (state.kind === "datetime") {
      state.valueDate = today;
      state.selectedTime = findBestTimeValue(state, roundTimeToStep(state.timeStep));
      renderDatePicker(state);
      syncDatePickerDisplay(state);
      emitDatePickerEvent(state, options);
      if (options.closeOnCommit !== false && state.trigger) {
        closeFloating(state.container);
        state.trigger.focus();
      }
      return;
    }

    setDatePickerValue(state, today, options);
  }

  function renderDatePicker(state) {
    if (!(state.panel instanceof HTMLElement)) {
      return;
    }

    const visibleMonth = startOfMonth(state.viewDate || state.valueDate || new Date()) || createCalendarDate(new Date().getFullYear(), new Date().getMonth(), 1);
    state.viewDate = visibleMonth;

    const calendar = document.createElement("div");
    calendar.className = "r8-date-picker__calendar";

    const header = document.createElement("div");
    header.className = "r8-date-picker__header";

    const previousButton = document.createElement("button");
    previousButton.className = "r8-date-picker__nav";
    previousButton.type = "button";
    previousButton.setAttribute("data-r8-date-nav", "prev");
    previousButton.setAttribute("aria-label", state.messages.previousMonth);
    previousButton.textContent = "<";

    const title = document.createElement("div");
    title.className = "r8-date-picker__title";
    title.setAttribute("aria-live", "polite");
    title.textContent = formatMonthTitle(visibleMonth, state.locale);

    const nextButton = document.createElement("button");
    nextButton.className = "r8-date-picker__nav";
    nextButton.type = "button";
    nextButton.setAttribute("data-r8-date-nav", "next");
    nextButton.setAttribute("aria-label", state.messages.nextMonth);
    nextButton.textContent = ">";

    header.append(previousButton, title, nextButton);
    calendar.append(header);

    const weekdays = document.createElement("div");
    weekdays.className = "r8-date-picker__weekdays";
    state.weekdayLabels.forEach((label) => {
      const weekday = document.createElement("span");
      weekday.className = "r8-date-picker__weekday";
      weekday.textContent = label;
      weekdays.append(weekday);
    });
    calendar.append(weekdays);

    const grid = document.createElement("div");
    grid.className = "r8-date-picker__grid";
    grid.setAttribute("role", "grid");
    grid.setAttribute("aria-label", `${state.messages.calendar} ${formatMonthTitle(visibleMonth, state.locale)}`);

    const gridStart = startOfWeek(visibleMonth, state.weekStart) || visibleMonth;
    const todayKey = toDateKey(new Date());

    for (let index = 0; index < 42; index += 1) {
      const dayDate = addCalendarDays(gridStart, index) || visibleMonth;
      const dayButton = document.createElement("button");
      const dateKey = toDateKey(dayDate);
      const isCurrentMonth = dayDate.getMonth() === visibleMonth.getMonth();
      const isSelected = isSameCalendarDay(dayDate, state.valueDate);
      const isToday = dateKey === todayKey;
      const disabled = isDateDisabled(state, dayDate);

      dayButton.className = "r8-date-picker__day";
      dayButton.type = "button";
      dayButton.setAttribute("data-r8-date", dateKey);
      dayButton.setAttribute("aria-label", formatDateLabel(dayDate, state.locale));
      dayButton.setAttribute("aria-selected", isSelected ? "true" : "false");

      if (!isCurrentMonth) {
        dayButton.classList.add("is-other-month");
      }

      if (isSelected) {
        dayButton.classList.add("is-selected");
      }

      if (isToday) {
        dayButton.classList.add("is-today");
        dayButton.setAttribute("aria-current", "date");
      }

      if (disabled) {
        dayButton.classList.add("is-disabled");
        dayButton.disabled = true;
      }

      const number = document.createElement("span");
      number.className = "r8-date-picker__day-number";
      number.textContent = padNumber(dayDate.getDate());
      dayButton.append(number);
      grid.append(dayButton);
    }

    calendar.append(grid);

    if (state.kind === "datetime") {
      const layout = document.createElement("div");
      layout.className = "r8-datetime-picker__layout";
      layout.append(calendar);

      const timeColumn = document.createElement("div");
      timeColumn.className = "r8-time-picker__column";

      const timeHeading = document.createElement("div");
      timeHeading.className = "r8-time-picker__heading";
      timeHeading.textContent = state.messages.time;

      const timeSlots = document.createElement("div");
      timeSlots.className = "r8-time-picker__slots";
      timeSlots.setAttribute("role", "listbox");
      timeSlots.setAttribute("aria-label", state.messages.time);

      state.timeSlots.forEach((slot) => {
        const slotButton = document.createElement("button");
        const disabled = isTimeDisabled(state, slot);
        slotButton.className = "r8-time-picker__slot";
        slotButton.type = "button";
        slotButton.textContent = slot;
        slotButton.setAttribute("data-r8-time", slot);
        slotButton.setAttribute("aria-selected", state.selectedTime === slot ? "true" : "false");

        if (state.selectedTime === slot) {
          slotButton.classList.add("is-selected");
        }

        if (disabled) {
          slotButton.classList.add("is-disabled");
          slotButton.disabled = true;
        }

        timeSlots.append(slotButton);
      });

      timeColumn.append(timeHeading, timeSlots);
      layout.append(timeColumn);
      state.panel.replaceChildren(layout);
    } else {
      state.panel.replaceChildren(calendar);
    }

    const footer = document.createElement("div");
    footer.className = "r8-date-picker__footer";

    const summary = document.createElement("div");
    summary.className = "r8-date-picker__summary";
    summary.textContent = getDatePickerLabel(state);
    summary.classList.toggle("is-placeholder", !state.valueDate);

    const actions = document.createElement("div");
    actions.className = "r8-date-picker__actions";

    const primaryAction = document.createElement("button");
    primaryAction.className = "r8-date-picker__action";
    primaryAction.type = "button";
    primaryAction.setAttribute("data-r8-action", state.kind === "datetime" ? "now" : "today");
    primaryAction.textContent = state.kind === "datetime" ? state.messages.now : state.messages.today;

    const clearAction = document.createElement("button");
    clearAction.className = "r8-date-picker__action r8-date-picker__action--ghost";
    clearAction.type = "button";
    clearAction.setAttribute("data-r8-action", "clear");
    clearAction.textContent = state.messages.clear;
    clearAction.disabled = !state.valueDate;

    const today = createCalendarDate(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    primaryAction.disabled = state.kind === "datetime"
      ? !findNearestEnabledDate(state, today)
      : isDateDisabled(state, today);

    actions.append(primaryAction, clearAction);
    footer.append(summary, actions);
    state.panel.append(footer);
  }

  function handleDatePickerDayKeydown(state, event, button) {
    const currentDate = parseDateValue(button.dataset.r8Date || "");
    if (!currentDate) {
      return;
    }

    let nextDate = null;

    if (event.key === "ArrowLeft") {
      nextDate = addCalendarDays(currentDate, -1);
    } else if (event.key === "ArrowRight") {
      nextDate = addCalendarDays(currentDate, 1);
    } else if (event.key === "ArrowUp") {
      nextDate = addCalendarDays(currentDate, -7);
    } else if (event.key === "ArrowDown") {
      nextDate = addCalendarDays(currentDate, 7);
    } else if (event.key === "Home") {
      nextDate = addCalendarDays(currentDate, -((currentDate.getDay() - state.weekStart + 7) % 7));
    } else if (event.key === "End") {
      nextDate = addCalendarDays(currentDate, 6 - ((currentDate.getDay() - state.weekStart + 7) % 7));
    } else if (event.key === "PageUp") {
      nextDate = createCalendarDate(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
    } else if (event.key === "PageDown") {
      nextDate = createCalendarDate(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      button.click();
      return;
    } else if (event.key === "Escape" && state.trigger) {
      event.preventDefault();
      closeFloating(state.container);
      state.trigger.focus();
      return;
    } else {
      return;
    }

    event.preventDefault();
    const candidate = findNearestEnabledDate(state, nextDate);
    if (!candidate) {
      return;
    }

    const sameMonth = state.viewDate && candidate.getMonth() === state.viewDate.getMonth() && candidate.getFullYear() === state.viewDate.getFullYear();
    if (!sameMonth) {
      state.viewDate = startOfMonth(candidate) || state.viewDate;
      renderDatePicker(state);
    }

    focusDateButton(state, candidate);
  }

  function handleTimeSlotKeydown(state, event, button) {
    const slots = toArray(state.panel?.querySelectorAll(".r8-time-picker__slot")).filter(
      (item) => item instanceof HTMLButtonElement && !item.disabled,
    );
    const currentIndex = slots.indexOf(button);
    if (currentIndex < 0) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      slots[clamp(currentIndex + 1, 0, slots.length - 1)]?.focus();
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      slots[clamp(currentIndex - 1, 0, slots.length - 1)]?.focus();
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      slots[0]?.focus();
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      slots[slots.length - 1]?.focus();
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      button.click();
      return;
    }

    if (event.key === "Escape" && state.trigger) {
      event.preventDefault();
      closeFloating(state.container);
      state.trigger.focus();
    }
  }

  function initDatePicker(container, options = {}) {
    if (!(container instanceof HTMLElement) || container.dataset.r8DatePickerReady === "true") {
      return;
    }

    container.dataset.r8DatePickerReady = "true";

    const kind = options.kind || "date";
    const trigger = options.triggerSelector ? firstMatch(container, options.triggerSelector) : null;
    const panel = options.panelSelector ? firstMatch(container, options.panelSelector) : container;

    if (!(panel instanceof HTMLElement)) {
      return;
    }

    const locale =
      normalizeLocale(container.dataset.r8Locale || document.documentElement.lang || navigator.language || "en-US");
    const messages = getDatePickerMessages(locale);
    const initialDateTime = parseDateTimeValue(container.dataset.r8Value || "");
    const initialMonth = parseMonthValue(container.dataset.r8Month || "");
    const minConstraint = parseDateTimeValue(container.dataset.r8Min || "");
    const maxConstraint = parseDateTimeValue(container.dataset.r8Max || "");
    const timeStep = clamp(Number(container.dataset.r8TimeStep || "30") || 30, 5, 720);
    const viewDate =
      startOfMonth(initialMonth || initialDateTime?.date || createCalendarDate(new Date().getFullYear(), new Date().getMonth(), 1)) ||
      createCalendarDate(new Date().getFullYear(), new Date().getMonth(), 1);
    const display = trigger ? getChoiceDisplay(trigger) : null;
    const placeholder =
      container.dataset.r8Placeholder ||
      display?.textContent?.trim() ||
      (kind === "datetime" ? messages.emptyDateTime : messages.empty);

    if (trigger instanceof HTMLElement) {
      prepareActionLikeElement(trigger);
      trigger.setAttribute("aria-haspopup", "dialog");
    }

    ensureId(panel, kind === "datetime" ? "r8-datetime-picker-panel" : "r8-date-picker-panel");
    if (trigger instanceof HTMLElement) {
      trigger.setAttribute("aria-controls", panel.id);
    }

    panel.setAttribute("role", trigger ? "dialog" : "group");
    panel.setAttribute("aria-label", kind === "datetime" ? messages.emptyDateTime : messages.calendar);

    const state = {
      container,
      kind,
      trigger,
      panel,
      display,
      locale,
      messages,
      placeholder,
      weekStart: clamp(Number(container.dataset.r8WeekStart || "0") || 0, 0, 6),
      weekdayLabels: buildWeekdayLabels(locale, container.dataset.r8WeekStart || "0"),
      timeStep,
      timeSlots: buildTimeSlots(timeStep),
      minConstraint,
      maxConstraint,
      minDateKey: minConstraint?.dateKey || "",
      maxDateKey: maxConstraint?.dateKey || "",
      valueDate: initialDateTime?.date || null,
      selectedTime: kind === "datetime" ? (initialDateTime?.hasTime ? initialDateTime.time : "") : "",
      viewDate,
    };

    if (trigger instanceof HTMLElement) {
      choiceStates.set(container, { trigger, panel });
      setHidden(panel, true);
      setExpanded(trigger, false);

      const togglePanel = () => {
        if (isOpen(panel)) {
          closeFloating(container);
          return;
        }

        openFloating(container);
        requestAnimationFrame(() => focusDatePickerEntry(state));
      };

      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        togglePanel();
      });

      bindKeyboardActivation(trigger, (event) => {
        event.preventDefault();
        togglePanel();
      });

      trigger.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          openFloating(container);
          requestAnimationFrame(() => focusDatePickerEntry(state));
        }
      });
    } else {
      setHidden(panel, false);
    }

    panel.addEventListener("click", (event) => {
      if (!(event.target instanceof HTMLElement)) {
        return;
      }

      const navButton = event.target.closest("[data-r8-date-nav]");
      if (navButton instanceof HTMLButtonElement) {
        const direction = navButton.dataset.r8DateNav === "prev" ? -1 : 1;
        state.viewDate = addCalendarMonths(state.viewDate, direction) || state.viewDate;
        renderDatePicker(state);
        requestAnimationFrame(() => focusDateButton(state, state.valueDate || state.viewDate));
        return;
      }

      const dayButton = event.target.closest(".r8-date-picker__day");
      if (dayButton instanceof HTMLButtonElement && !dayButton.disabled) {
        const nextDate = parseDateValue(dayButton.dataset.r8Date || "");
        if (nextDate) {
          setDatePickerValue(state, nextDate, { closeOnCommit: kind === "date" });
        }
        return;
      }

      const timeButton = event.target.closest(".r8-time-picker__slot");
      if (timeButton instanceof HTMLButtonElement && !timeButton.disabled) {
        setDateTimeValue(state, timeButton.dataset.r8Time || "", { closeOnCommit: true });
        return;
      }

      const actionButton = event.target.closest("[data-r8-action]");
      if (actionButton instanceof HTMLButtonElement) {
        const action = actionButton.dataset.r8Action;
        if (action === "clear") {
          clearDatePickerValue(state);
        } else if (action === "today" || action === "now") {
          selectToday(state, { closeOnCommit: true });
        }
      }
    });

    panel.addEventListener("keydown", (event) => {
      if (!(event.target instanceof HTMLElement)) {
        return;
      }

      const dayButton = event.target.closest(".r8-date-picker__day");
      if (dayButton instanceof HTMLButtonElement) {
        handleDatePickerDayKeydown(state, event, dayButton);
        return;
      }

      const timeButton = event.target.closest(".r8-time-picker__slot");
      if (timeButton instanceof HTMLButtonElement) {
        handleTimeSlotKeydown(state, event, timeButton);
      }
    });

    ensureDateTimeDefaults(state);
    renderDatePicker(state);
    syncDatePickerDisplay(state);
  }

  function initDatePickers(root) {
    toArray(root.querySelectorAll(".r8-date-picker-panel")).forEach((panel) => {
      initDatePicker(panel, {
        kind: "date",
      });
    });

    toArray(root.querySelectorAll(".r8-date-picker")).forEach((container) => {
      initDatePicker(container, {
        kind: "date",
        triggerSelector: ".r8-date-picker__trigger",
        panelSelector: ".r8-date-picker__panel",
      });
    });

    toArray(root.querySelectorAll(".r8-datetime-picker")).forEach((container) => {
      initDatePicker(container, {
        kind: "datetime",
        triggerSelector: ".r8-datetime-picker__trigger",
        panelSelector: ".r8-datetime-picker__panel",
      });
    });
  }

  function initChoices(root) {
    choiceFamilies.forEach((family) => {
      toArray(root.querySelectorAll(family.root)).forEach((container) => {
        if (!(container instanceof HTMLElement) || container.dataset.r8ChoiceReady === "true") {
          return;
        }

        container.dataset.r8ChoiceReady = "true";

        if (family.kind === "autocomplete") {
          initAutocomplete(container, family);
          return;
        }

        const trigger = family.trigger ? firstMatch(container, family.trigger) : null;
        const panel = firstMatch(container, family.panel);
        const options = toArray(container.querySelectorAll(family.option)).filter((item) => item instanceof HTMLElement);

        choiceStates.set(container, { trigger, panel, options });

        if (trigger) {
          prepareActionLikeElement(trigger);
          setExpanded(trigger, false);

          if (panel) {
            setHidden(panel, true);
          }

          trigger.addEventListener("click", (event) => {
            event.preventDefault();
            toggleFloating(container);
          });

          bindKeyboardActivation(trigger, (event) => {
            event.preventDefault();
            toggleFloating(container);
          });
        }

        options.forEach((option) => {
          prepareActionLikeElement(option, "option");
          option.setAttribute("aria-selected", option.classList.contains("is-selected") ? "true" : "false");
          option.addEventListener("click", () => markChoiceSelection(container, option, family));
          bindKeyboardActivation(option, () => markChoiceSelection(container, option, family));
        });

        if (family.kind === "datetime") {
          const initialOptions = options.filter((option) => option.classList.contains("is-selected"));
          initialOptions.forEach((option) => markChoiceSelection(container, option, family, { silent: true }));
          return;
        }

        const initialOption =
          options.find((option) => option.classList.contains("is-selected")) || (!trigger ? options[0] : null);
        if (initialOption) {
          markChoiceSelection(container, initialOption, family, { silent: true });
        }
      });
    });
  }

  function initTabs(root) {
    toArray(root.querySelectorAll(".r8-tabs")).forEach((tabs) => {
      if (!(tabs instanceof HTMLElement) || tabs.dataset.r8TabsReady === "true") {
        return;
      }

      tabs.dataset.r8TabsReady = "true";

      const tabList = tabs.querySelector(".r8-tabs__list");
      const items = toArray(tabs.querySelectorAll(".r8-tabs__tab")).filter((item) => item instanceof HTMLElement);
      const panels = toArray(tabs.querySelectorAll(".r8-tabs__panel")).filter((item) => item instanceof HTMLElement);

      if (tabList && !tabList.hasAttribute("role")) {
        tabList.setAttribute("role", "tablist");
      }

      items.forEach((tab, index) => {
        prepareActionLikeElement(tab, "tab");
        const panel =
          panels.find((item) => item.id && item.id === tab.getAttribute("aria-controls")) ||
          panels[index] ||
          panels[0] ||
          null;

        if (panel && !panel.id) {
          panel.id = nextId("r8-tab-panel");
        }

        if (panel) {
          tab.setAttribute("aria-controls", panel.id);
        }
      });

      function activateTab(targetTab, options = {}) {
        const silent = options.silent === true;
        items.forEach((tab) => {
          const isActive = tab === targetTab;
          const panelId = tab.getAttribute("aria-controls");
          const panel = panelId ? tabs.querySelector(`#${panelId}`) : panels[0];
          tab.classList.toggle("r8-tabs__tab--active", isActive);
          tab.setAttribute("aria-selected", isActive ? "true" : "false");
          tab.tabIndex = isActive ? 0 : -1;

          if (panel instanceof HTMLElement) {
            if (isActive) {
              panel.removeAttribute("hidden");
            } else {
              panel.setAttribute("hidden", "");
            }
          }
        });

        const panelId = targetTab?.getAttribute("aria-controls");
        const panel = panelId ? tabs.querySelector(`#${panelId}`) : null;
        if (!silent) {
          emitComponentEvent(tabs, "tabs-change", {
            tab: targetTab,
            panel,
            index: items.indexOf(targetTab),
          });
        }
      }

      items.forEach((tab) => {
        tab.addEventListener("click", () => activateTab(tab));
        bindKeyboardActivation(tab, () => activateTab(tab));
      });

      activateTab(items.find((item) => item.getAttribute("aria-selected") === "true") || items[0], { silent: true });
    });
  }

  function initCollapse(root) {
    toArray(root.querySelectorAll(".r8-collapse__item")).forEach((item) => {
      if (!(item instanceof HTMLElement) || item.dataset.r8CollapseReady === "true") {
        return;
      }

      item.dataset.r8CollapseReady = "true";
      const trigger = item.querySelector(".r8-collapse__header");
      const panel = item.querySelector(".r8-collapse__body");
      if (!(trigger instanceof HTMLElement) || !(panel instanceof HTMLElement)) {
        return;
      }

      prepareActionLikeElement(trigger);
      const initiallyOpen = !panel.hasAttribute("hidden");
      setHidden(panel, !initiallyOpen);
      setExpanded(trigger, initiallyOpen);

      const toggle = () => {
        const nextState = !isOpen(panel);
        setHidden(panel, !nextState);
        setExpanded(trigger, nextState);
        item.classList.toggle("is-open", nextState);
        emitComponentEvent(item, "collapse-toggle", {
          open: nextState,
          item,
        });
      };

      trigger.addEventListener("click", toggle);
      bindKeyboardActivation(trigger, toggle);
    });
  }

  function initCarousels(root) {
    toArray(root.querySelectorAll(".r8-carousel")).forEach((carousel) => {
      if (!(carousel instanceof HTMLElement) || carousel.dataset.r8CarouselReady === "true") {
        return;
      }

      carousel.dataset.r8CarouselReady = "true";
      const slides = toArray(carousel.querySelectorAll(".r8-carousel__slide")).filter((item) => item instanceof HTMLElement);
      const dots = toArray(carousel.querySelectorAll(".r8-carousel__dot")).filter((item) => item instanceof HTMLElement);

      if (!slides.length) {
        return;
      }

      function activate(index, options = {}) {
        const silent = options.silent === true;
        const safeIndex = clamp(index, 0, slides.length - 1);
        slides.forEach((slide, slideIndex) => {
          if (slideIndex === safeIndex) {
            slide.removeAttribute("hidden");
          } else {
            slide.setAttribute("hidden", "");
          }
        });

        dots.forEach((dot, dotIndex) => {
          dot.classList.toggle("is-active", dotIndex === safeIndex);
          dot.setAttribute("aria-current", dotIndex === safeIndex ? "true" : "false");
        });

        if (!silent) {
          emitComponentEvent(carousel, "carousel-change", {
            index: safeIndex,
            slide: slides[safeIndex] || null,
          });
        }
      }

      dots.forEach((dot, index) => {
        prepareActionLikeElement(dot);
        dot.addEventListener("click", () => activate(index));
        bindKeyboardActivation(dot, () => activate(index));
      });

      activate(dots.findIndex((dot) => dot.classList.contains("is-active")) >= 0 ? dots.findIndex((dot) => dot.classList.contains("is-active")) : 0, {
        silent: true,
      });
    });
  }

  function initInputNumbers(root) {
    toArray(root.querySelectorAll(".r8-input-number")).forEach((component) => {
      if (!(component instanceof HTMLElement) || component.dataset.r8InputNumberReady === "true") {
        return;
      }

      component.dataset.r8InputNumberReady = "true";
      const input = component.querySelector(".r8-input-number__input");
      const buttons = toArray(component.querySelectorAll(".r8-input-number__button")).filter((item) => item instanceof HTMLElement);
      if (!(input instanceof HTMLInputElement) || buttons.length < 2) {
        return;
      }

      buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
          const step = Number(input.step || "1") || 1;
          const min = input.min === "" ? Number.NEGATIVE_INFINITY : Number(input.min);
          const max = input.max === "" ? Number.POSITIVE_INFINITY : Number(input.max);
          const direction = index === 0 ? -1 : 1;
          const nextValue = clamp((Number(input.value || "0") || 0) + step * direction, min, max);
          input.value = String(nextValue);
          input.dispatchEvent(new Event("input", { bubbles: true }));
          input.dispatchEvent(new Event("change", { bubbles: true }));
          emitComponentEvent(component, "input-number-change", {
            value: nextValue,
          });
        });
      });
    });
  }

  function setBinaryState(control, checked) {
    control.classList.toggle("is-checked", checked);
    control.setAttribute("aria-checked", checked ? "true" : "false");
  }

  function findRadioGroup(control) {
    const scope =
      control.closest("[data-r8-radio-group]") ||
      control.parentElement ||
      control.closest(".r8-space") ||
      control.closest(".r8-form") ||
      document.body;

    return toArray(scope.querySelectorAll(".r8-radio")).filter((item) => item instanceof HTMLElement);
  }

  function initBinaryControls(root) {
    toArray(root.querySelectorAll(".r8-checkbox, .r8-radio, .r8-switch")).forEach((control) => {
      if (!(control instanceof HTMLElement) || control.dataset.r8BinaryReady === "true") {
        return;
      }

      control.dataset.r8BinaryReady = "true";
      const kind = control.classList.contains("r8-radio")
        ? "radio"
        : control.classList.contains("r8-switch")
          ? "switch"
          : "checkbox";

      prepareActionLikeElement(control, kind === "switch" ? "switch" : kind);
      setBinaryState(control, control.classList.contains("is-checked") || control.getAttribute("aria-checked") === "true");

      const toggle = () => {
        if (kind === "radio") {
          findRadioGroup(control).forEach((item) => setBinaryState(item, item === control));
          emitComponentEvent(control, "binary-change", {
            checked: true,
            kind,
          });
          return;
        }

        setBinaryState(control, !control.classList.contains("is-checked"));
        emitComponentEvent(control, "binary-change", {
          checked: control.classList.contains("is-checked"),
          kind,
        });
      };

      control.addEventListener("click", toggle);
      bindKeyboardActivation(control, toggle);
    });
  }

  function initRates(root) {
    toArray(root.querySelectorAll(".r8-rate")).forEach((component) => {
      if (!(component instanceof HTMLElement) || component.dataset.r8RateReady === "true") {
        return;
      }

      component.dataset.r8RateReady = "true";
      const items = toArray(component.querySelectorAll(".r8-rate__item")).filter((item) => item instanceof HTMLElement);

      function activate(index) {
        items.forEach((item, itemIndex) => {
          const isActive = itemIndex <= index;
          item.classList.toggle("is-active", isActive);
          item.setAttribute("aria-checked", isActive ? "true" : "false");
        });

        emitComponentEvent(component, "rate-change", {
          value: index + 1,
        });
      }

      items.forEach((item, index) => {
        prepareActionLikeElement(item, "radio");
        item.addEventListener("click", () => activate(index));
        bindKeyboardActivation(item, () => activate(index));
      });
    });
  }

  function initSegmentedAndPagination(root) {
    [
      { root: ".r8-segmented", item: ".r8-segmented__item", activeClass: "is-active" },
      { root: ".r8-pagination", item: ".r8-pagination__item", activeClass: "is-active" },
    ].forEach((group) => {
      toArray(root.querySelectorAll(group.root)).forEach((component) => {
        if (!(component instanceof HTMLElement) || component.dataset.r8SegmentedReady === "true") {
          return;
        }

        component.dataset.r8SegmentedReady = "true";
        const items = toArray(component.querySelectorAll(group.item)).filter((item) => item instanceof HTMLElement);

        function activate(target) {
          items.forEach((item) => {
            const isActive = item === target;
            item.classList.toggle(group.activeClass, isActive);
            item.setAttribute("aria-current", isActive ? "true" : "false");
          });

          emitComponentEvent(component, group.root === ".r8-pagination" ? "pagination-change" : "segmented-change", {
            item: target,
            index: items.indexOf(target),
          });
        }

        items.forEach((item) => {
          prepareActionLikeElement(item);
          item.addEventListener("click", () => activate(item));
          bindKeyboardActivation(item, () => activate(item));
        });
      });
    });
  }

  function updateSplitter(component, nextValue, options = {}) {
    const state = splitterStates.get(component);
    if (!state?.handle) {
      return;
    }

    const silent = options.silent === true;
    const value = clamp(Number(nextValue) || 50, state.min, state.max);
    component.style.setProperty("--r8-splitter-position", `${value}%`);
    component.dataset.r8SplitterPosition = String(value);
    state.handle.setAttribute("aria-valuenow", String(Math.round(value)));
    if (!silent) {
      emitComponentEvent(component, "splitter-change", {
        value,
        min: state.min,
        max: state.max,
        orientation: state.isVertical ? "horizontal" : "vertical",
      });
    }
  }

  function initSplitters(root) {
    toArray(root.querySelectorAll(".r8-splitter")).forEach((component) => {
      if (!(component instanceof HTMLElement) || component.dataset.r8SplitterReady === "true") {
        return;
      }

      component.dataset.r8SplitterReady = "true";

      const panes = toArray(component.querySelectorAll(".r8-splitter__pane")).filter((item) => item instanceof HTMLElement);
      const handle = component.querySelector(".r8-splitter__handle");
      if (!(handle instanceof HTMLElement) || panes.length < 2) {
        return;
      }

      const isVertical = component.classList.contains("r8-splitter--vertical");
      const min = clamp(Number(component.dataset.r8SplitterMin || "20") || 20, 5, 95);
      const max = clamp(Number(component.dataset.r8SplitterMax || "80") || 80, min + 1, 95);
      const initialValue = clamp(Number(component.dataset.r8SplitterPosition || "50") || 50, min, max);

      panes.forEach((pane, index) => ensureId(pane, `r8-splitter-pane-${index + 1}`));

      prepareActionLikeElement(handle, "separator");
      handle.setAttribute("role", "separator");
      handle.setAttribute("aria-orientation", isVertical ? "horizontal" : "vertical");
      handle.setAttribute("aria-controls", panes.map((pane) => pane.id).join(" "));
      handle.setAttribute("aria-valuemin", String(min));
      handle.setAttribute("aria-valuemax", String(max));
      handle.setAttribute("aria-label", handle.getAttribute("aria-label") || "Resize panes");

      splitterStates.set(component, {
        handle,
        panes,
        isVertical,
        min,
        max,
      });

      updateSplitter(component, initialValue, { silent: true });

      const setFromPointer = (clientX, clientY) => {
        const rect = component.getBoundingClientRect();
        const ratio = isVertical
          ? rect.height === 0
            ? 0
            : (clientY - rect.top) / rect.height
          : rect.width === 0
            ? 0
            : (clientX - rect.left) / rect.width;

        updateSplitter(component, Math.round(clamp(ratio, 0, 1) * 100));
      };

      const onPointerMove = (event) => {
        if (!("clientX" in event) || !("clientY" in event)) {
          return;
        }

        setFromPointer(event.clientX, event.clientY);
      };

      const onPointerUp = () => {
        component.classList.remove("is-resizing");
        document.body.style.cursor = "";
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
      };

      handle.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        component.classList.add("is-resizing");
        document.body.style.cursor = isVertical
          ? "var(--r8-runtime-cursor-row-resize, row-resize)"
          : "var(--r8-runtime-cursor-col-resize, col-resize)";
        handle.setPointerCapture?.(event.pointerId);
        setFromPointer(event.clientX, event.clientY);
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
      });

      handle.addEventListener("keydown", (event) => {
        const step = event.shiftKey ? 10 : 5;
        const current = Number(component.dataset.r8SplitterPosition || initialValue);

        if (!isVertical && event.key === "ArrowLeft") {
          event.preventDefault();
          updateSplitter(component, current - step);
          return;
        }

        if (!isVertical && event.key === "ArrowRight") {
          event.preventDefault();
          updateSplitter(component, current + step);
          return;
        }

        if (isVertical && event.key === "ArrowUp") {
          event.preventDefault();
          updateSplitter(component, current - step);
          return;
        }

        if (isVertical && event.key === "ArrowDown") {
          event.preventDefault();
          updateSplitter(component, current + step);
          return;
        }

        if (event.key === "Home") {
          event.preventDefault();
          updateSplitter(component, min);
          return;
        }

        if (event.key === "End") {
          event.preventDefault();
          updateSplitter(component, max);
        }
      });
    });
  }

  function updateSlider(component, nextValue, options = {}) {
    const silent = options.silent === true;
    const value = clamp(Number(nextValue) || 0, 0, 100);
    component.style.setProperty("--r8-progress-value", `${value}%`);
    component.dataset.r8Value = String(value);
    component.setAttribute("aria-valuenow", String(value));

    const output = component.querySelector("[data-r8-slider-output]") || component.querySelector(".r8-text");
    if (output instanceof HTMLElement) {
      output.textContent = (output.textContent || "").replace(/\d+%/, `${value}%`);
    }

    if (!silent) {
      emitComponentEvent(component, "slider-change", {
        value,
      });
    }
  }

  function syncProgressBars(root) {
    toArray(root.querySelectorAll(".r8-progress")).forEach((component) => {
      if (!(component instanceof HTMLElement)) {
        return;
      }

      if (!component.hasAttribute("role")) {
        component.setAttribute("role", "progressbar");
      }

      component.setAttribute("aria-valuemin", "0");
      component.setAttribute("aria-valuemax", "100");

      if (component.dataset.r8Value) {
        const value = clamp(Number(component.dataset.r8Value) || 0, 0, 100);
        component.style.setProperty("--r8-progress-value", `${value}%`);
        component.setAttribute("aria-valuenow", String(value));

        const label = component.querySelector(".r8-progress__label span:last-child");
        if (label instanceof HTMLElement) {
          label.textContent = `${value}%`;
        }
      }
    });
  }

  function initSliders(root) {
    toArray(root.querySelectorAll(".r8-slider")).forEach((component) => {
      if (!(component instanceof HTMLElement) || component.dataset.r8SliderReady === "true") {
        return;
      }

      component.dataset.r8SliderReady = "true";
      const track = component.querySelector(".r8-slider__track");
      if (!(track instanceof HTMLElement)) {
        return;
      }

      prepareActionLikeElement(track, "slider");
      component.setAttribute("aria-valuemin", "0");
      component.setAttribute("aria-valuemax", "100");
      updateSlider(component, component.dataset.r8Value || component.style.getPropertyValue("--r8-progress-value"), { silent: true });

      const setFromPointer = (clientX) => {
        const rect = track.getBoundingClientRect();
        const ratio = rect.width === 0 ? 0 : (clientX - rect.left) / rect.width;
        updateSlider(component, Math.round(clamp(ratio, 0, 1) * 100));
      };

      const onPointerMove = (event) => {
        if ("clientX" in event) {
          setFromPointer(event.clientX);
        }
      };

      const onPointerUp = () => {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
      };

      track.addEventListener("pointerdown", (event) => {
        setFromPointer(event.clientX);
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
      });

      bindKeyboardActivation(track, () => {
        updateSlider(component, (Number(component.dataset.r8Value || "0") || 0) + 5);
      });
    });
  }

  function initInputTags(root) {
    toArray(root.querySelectorAll(".r8-input-tag")).forEach((component) => {
      if (!(component instanceof HTMLElement) || component.dataset.r8InputTagReady === "true") {
        return;
      }

      component.dataset.r8InputTagReady = "true";
      const input = component.querySelector(".r8-input-tag__input");
      if (!(input instanceof HTMLInputElement)) {
        return;
      }

      component.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement) || !target.closest(".r8-input-tag__remove")) {
          return;
        }

        const tag = target.closest(".r8-input-tag__tag");
        const value = (tag?.textContent || "").replace(/\s*x\s*$/i, "").trim();
        tag?.remove();
        emitComponentEvent(component, "input-tag-remove", {
          value,
        });
      });

      input.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") {
          return;
        }

        event.preventDefault();
        const value = input.value.trim();
        if (!value) {
          return;
        }

        const tag = document.createElement("span");
        tag.className = "r8-input-tag__tag";
        tag.innerHTML = `${value} <span class="r8-input-tag__remove">x</span>`;
        component.insertBefore(tag, input);
        input.value = "";
        emitComponentEvent(component, "input-tag-add", {
          value,
          tag,
        });
      });
    });
  }

  function initTransfers(root) {
    toArray(root.querySelectorAll(".r8-transfer")).forEach((component) => {
      if (!(component instanceof HTMLElement) || component.dataset.r8TransferReady === "true") {
        return;
      }

      component.dataset.r8TransferReady = "true";
      const panels = toArray(component.querySelectorAll(".r8-transfer__panel")).filter((item) => item instanceof HTMLElement);
      const actionButtons = toArray(component.querySelectorAll(".r8-transfer__actions .r8-btn")).filter((item) => item instanceof HTMLElement);

      component.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
          return;
        }

        const item = target.closest(".r8-transfer__item");
        if (!item) {
          return;
        }

        item.classList.toggle("is-selected");
      });

      actionButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
          if (panels.length < 2) {
            return;
          }

          const toRight = index === 0;
          const source = toRight ? panels[0] : panels[1];
          const destination = toRight ? panels[1] : panels[0];
          const movedItems = [];
          toArray(source.querySelectorAll(".r8-transfer__item.is-selected")).forEach((item) => {
            item.classList.remove("is-selected");
            destination.appendChild(item);
            movedItems.push(item);
          });

          emitComponentEvent(component, "transfer-change", {
            direction: toRight ? "right" : "left",
            movedItems,
          });
        });
      });
    });
  }

  function initBacktops(root) {
    toArray(root.querySelectorAll(".r8-backtop")).forEach((button) => {
      if (!(button instanceof HTMLElement) || button.dataset.r8BacktopReady === "true") {
        return;
      }

      button.dataset.r8BacktopReady = "true";
      button.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        emitComponentEvent(button, "backtop", {
          top: 0,
        });
      });
    });
  }

  function resolveTarget(trigger) {
    const selector = trigger.getAttribute("data-r8-target");
    if (!selector) {
      return null;
    }

    try {
      return document.querySelector(selector);
    } catch {
      return null;
    }
  }

  function registerGenericTarget(trigger, target) {
    if (!(trigger instanceof HTMLElement) || !(target instanceof HTMLElement)) {
      return;
    }

    const hasEntry = toArray(genericTargets).some(
      (entry) => entry.trigger === trigger && entry.target === target,
    );

    if (!hasEntry) {
      genericTargets.add({ trigger, target });
    }
  }

  function handleToggleTrigger(trigger) {
    if (!(trigger instanceof HTMLElement)) {
      return;
    }

    const target = resolveTarget(trigger);
    if (!target) {
      return;
    }

    prepareActionLikeElement(trigger);
    registerGenericTarget(trigger, target);

    if (isToastAlertTarget(target)) {
      openTarget(target, trigger);
      return;
    }

    if (isOpen(target)) {
      closeTarget(target, trigger);
      return;
    }

    openTarget(target, trigger);
  }

  function handleCloseAction(button) {
    if (!(button instanceof HTMLElement)) {
      return;
    }

    const targetSelector = button.getAttribute("data-r8-close");
    const target =
      (targetSelector && document.querySelector(targetSelector)) ||
      button.closest("dialog") ||
      button.closest(".r8-drawer") ||
      button.closest(".r8-popover") ||
      button.closest(".r8-popconfirm") ||
      button.closest(".r8-tooltip") ||
      button.closest(".r8-message") ||
      button.closest(".r8-message-box") ||
      button.closest(".r8-notification") ||
      button.closest(".r8-alert");

    closeTarget(target);
  }

  function handleDismissAction(button) {
    if (!(button instanceof HTMLElement)) {
      return;
    }

    const host = button.closest(".r8-alert, .r8-message, .r8-notification, .r8-message-box");
    if (host instanceof HTMLElement) {
      if (isToastAlertTarget(host)) {
        closeTarget(host);
      } else {
        setHidden(host, true);
      }

      emitComponentEvent(host, "dismiss", {
        target: host,
      });
    }
  }

  function getAlertPlacement(target) {
    if (!(target instanceof HTMLElement) || !target.classList.contains("r8-alert")) {
      return "";
    }

    const explicitPlacement = target.dataset.r8Placement || "";
    if (alertPlacements.includes(explicitPlacement)) {
      return explicitPlacement;
    }

    return (
      alertPlacements.find((placement) => target.classList.contains(`r8-alert--${placement}`)) ||
      ""
    );
  }

  function isToastAlertTarget(target) {
    return target instanceof HTMLElement && target.classList.contains("r8-alert") && Boolean(getAlertPlacement(target));
  }

  function getToastDuration(target) {
    if (!(target instanceof HTMLElement)) {
      return 0;
    }

    const rawValue = target.dataset.r8Duration || "";
    if (!rawValue.trim()) {
      return isToastAlertTarget(target) ? 4500 : 0;
    }

    const duration = Number(rawValue);
    if (!Number.isFinite(duration) || duration < 0) {
      return 0;
    }

    return duration;
  }

  function ensureToastStack(target) {
    if (!(target instanceof HTMLElement)) {
      return null;
    }

    const placement = getAlertPlacement(target);
    if (!placement) {
      return null;
    }

    const scope = target.closest("[data-r8-overlay-scope]") || document.body;
    const selector = `.r8-toast-stack[data-r8-placement="${placement}"]`;
    const existingStack = scope.querySelector(selector);
    if (existingStack instanceof HTMLElement) {
      return existingStack;
    }

    const stack = document.createElement("div");
    stack.className = `r8-toast-stack r8-toast-stack--${placement}`;
    stack.dataset.r8Placement = placement;
    stack.setAttribute("aria-live", "polite");
    stack.setAttribute("aria-atomic", "false");
    scope.append(stack);
    return stack;
  }

  function cleanupToastStack(target) {
    const stack = target?.parentElement;
    if (!(stack instanceof HTMLElement) || !stack.classList.contains("r8-toast-stack")) {
      return;
    }

    if (stack.children.length === 0) {
      stack.remove();
    }
  }

  function clearOverlayTimer(target) {
    const timer = overlayTimers.get(target);
    if (typeof timer === "number") {
      window.clearTimeout(timer);
      overlayTimers.delete(target);
    }
  }

  function isDrawerTarget(target) {
    return target instanceof HTMLElement && target.classList.contains("r8-drawer");
  }

  function collapseGenericTargetTriggers(target) {
    genericTargets.forEach((entry) => {
      if (entry.target === target) {
        setExpanded(entry.trigger, false);
      }
    });
  }

  function syncDrawerBodyLock() {
    if (!(document.body instanceof HTMLBodyElement)) {
      return;
    }

    const hasOpenDrawer = toArray(document.querySelectorAll(".r8-drawer.is-open")).some(
      (drawer) =>
        drawer instanceof HTMLElement &&
        !drawer.hasAttribute("hidden") &&
        !drawer.closest("[data-r8-overlay-scope]"),
    );

    document.body.style.overflow = hasOpenDrawer ? "hidden" : "";
    document.body.classList.toggle("r8-has-overlay", hasOpenDrawer);
  }

  function removeDrawerBackdrop(target) {
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const targetId = ensureId(target, "r8-drawer");
    toArray(document.querySelectorAll(`.r8-drawer-backdrop[data-r8-drawer-backdrop="${targetId}"]`)).forEach((backdrop) => {
      backdrop.remove();
    });
    syncDrawerBodyLock();
  }

  function setDrawerBackdropOpen(target, open) {
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const targetId = ensureId(target, "r8-drawer");
    toArray(document.querySelectorAll(`.r8-drawer-backdrop[data-r8-drawer-backdrop="${targetId}"]`)).forEach((backdrop) => {
      backdrop.classList.toggle("is-open", open);
    });
  }

  function ensureDrawerBackdrop(target, trigger) {
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const targetId = ensureId(target, "r8-drawer");
    removeDrawerBackdrop(target);

    const backdrop = document.createElement("div");
    backdrop.className = "r8-drawer-backdrop";
    backdrop.dataset.r8DrawerBackdrop = targetId;
    backdrop.setAttribute("aria-hidden", "true");
    backdrop.addEventListener("click", () => {
      closeTarget(target, trigger);
    });

    const scope = target.closest("[data-r8-overlay-scope]") || document.body;
    scope.append(backdrop);
  }

  function closeTarget(target, trigger = null) {
    if (!target) {
      return;
    }

    if (isDialog(target)) {
      if (target.open) {
        target.close();
        emitComponentEvent(target, "target-close", {
          target,
          trigger,
        });
      }
      return;
    }

    if (isToastAlertTarget(target)) {
      clearOverlayTimer(target);
      target.classList.remove("is-open");
      collapseGenericTargetTriggers(target);

      const closeTimer = window.setTimeout(() => {
        setHidden(target, true);
        cleanupToastStack(target);
        emitComponentEvent(target, "target-close", {
          target,
          trigger,
        });
      }, 140);

      overlayTimers.set(target, closeTimer);
      return;
    }

    if (isDrawerTarget(target)) {
      clearOverlayTimer(target);
      target.classList.remove("is-open");
      setDrawerBackdropOpen(target, false);
      collapseGenericTargetTriggers(target);

      const closeTimer = window.setTimeout(() => {
        setHidden(target, true);
        removeDrawerBackdrop(target);
        emitComponentEvent(target, "target-close", {
          target,
          trigger,
        });
      }, drawerTransitionMs);

      overlayTimers.set(target, closeTimer);
      return;
    }

    setHidden(target, true);
    emitComponentEvent(target, "target-close", {
      target,
      trigger,
    });
    collapseGenericTargetTriggers(target);
  }

  function openTarget(target, trigger) {
    if (!target) {
      return;
    }

    if (isDialog(target)) {
      if (!target.open) {
        target.showModal();
        emitComponentEvent(target, "target-open", {
          target,
          trigger,
        });
      }
      return;
    }

    if (isToastAlertTarget(target)) {
      clearOverlayTimer(target);
      const stack = ensureToastStack(target);
      if (stack instanceof HTMLElement && target.parentElement !== stack) {
        stack.append(target);
      }

      setHidden(target, false);
      setExpanded(trigger, true);
      void target.offsetWidth;
      target.classList.add("is-open");

      const duration = getToastDuration(target);
      if (duration > 0) {
        const dismissTimer = window.setTimeout(() => {
          closeTarget(target, trigger);
        }, duration);
        overlayTimers.set(target, dismissTimer);
      }

      emitComponentEvent(target, "target-open", {
        target,
        trigger,
      });
      return;
    }

    if (isDrawerTarget(target)) {
      clearOverlayTimer(target);
      ensureDrawerBackdrop(target, trigger);
      setHidden(target, false);
      setExpanded(trigger, true);
      requestAnimationFrame(() => {
        setDrawerBackdropOpen(target, true);
        target.classList.add("is-open");
        syncDrawerBodyLock();
      });
      emitComponentEvent(target, "target-open", {
        target,
        trigger,
      });
      return;
    }

    setHidden(target, false);
    setExpanded(trigger, true);
    emitComponentEvent(target, "target-open", {
      target,
      trigger,
    });
  }

  function initGenericToggles(root) {
    toArray(root.querySelectorAll("[data-r8-toggle][data-r8-target]")).forEach((trigger) => {
      if (!(trigger instanceof HTMLElement) || trigger.dataset.r8ToggleReady === "true") {
        return;
      }

      trigger.dataset.r8ToggleReady = "true";
      prepareActionLikeElement(trigger);
      const target = resolveTarget(trigger);
      if (!target) {
        return;
      }

      if (!isDialog(target) && !target.hasAttribute("hidden")) {
        setHidden(target, true);
      }

      setExpanded(trigger, false);
      registerGenericTarget(trigger, target);
      bindKeyboardActivation(trigger, () => handleToggleTrigger(trigger));
    });

    toArray(root.querySelectorAll("[data-r8-close]")).forEach((button) => {
      if (!(button instanceof HTMLElement) || button.dataset.r8CloseReady === "true") {
        return;
      }

      button.dataset.r8CloseReady = "true";
      prepareActionLikeElement(button);
      bindKeyboardActivation(button, () => handleCloseAction(button));
    });

    toArray(root.querySelectorAll("[data-r8-dismiss]")).forEach((button) => {
      if (!(button instanceof HTMLElement) || button.dataset.r8DismissReady === "true") {
        return;
      }

      button.dataset.r8DismissReady = "true";
      prepareActionLikeElement(button);
      bindKeyboardActivation(button, () => handleDismissAction(button));
    });
  }

  function closeAllFloating(target) {
    floatingStates.forEach((container) => {
      if (!container.isConnected) {
        floatingStates.delete(container);
        return;
      }

      const state = choiceStates.get(container);
      if (!state) {
        return;
      }

      const clickedInsideTrigger = state.trigger instanceof HTMLElement && state.trigger.contains(target);
      const clickedInsidePanel = state.panel instanceof HTMLElement && state.panel.contains(target);
      if (!clickedInsideTrigger && !clickedInsidePanel) {
        closeFloating(container);
      }
    });

    genericTargets.forEach((entry) => {
      if (!entry.trigger?.isConnected || !entry.target?.isConnected) {
        genericTargets.delete(entry);
        return;
      }

      if (!entry.target || !isOpen(entry.target) || isDialog(entry.target) || isToastAlertTarget(entry.target)) {
        return;
      }

      const clickedInsideTrigger = entry.trigger.contains(target);
      const clickedInsideTarget = entry.target.contains(target);
      if (!clickedInsideTrigger && !clickedInsideTarget) {
        closeTarget(entry.target);
      }
    });
  }

  function attachGlobalListeners() {
    if (document.body.dataset.r8GlobalReady === "true") {
      return;
    }

    document.body.dataset.r8GlobalReady = "true";

    document.addEventListener("click", (event) => {
      if (event.target instanceof HTMLElement) {
        const toggleTrigger = event.target.closest("[data-r8-toggle][data-r8-target]");
        const closeButton = event.target.closest("[data-r8-close]");
        const dismissButton = event.target.closest("[data-r8-dismiss]");

        if (closeButton instanceof HTMLElement) {
          handleCloseAction(closeButton);
        } else if (dismissButton instanceof HTMLElement) {
          handleDismissAction(dismissButton);
        } else if (toggleTrigger instanceof HTMLElement) {
          event.preventDefault();
          handleToggleTrigger(toggleTrigger);
        }

        closeAllFloating(event.target);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") {
        return;
      }

      floatingStates.forEach((container) => closeFloating(container));
      genericTargets.forEach((entry) => {
        if (isOpen(entry.target)) {
          closeTarget(entry.target);
        }
      });
    });
  }

  function observe(root) {
    if (!(root instanceof HTMLElement) || observers.has(root)) {
      return;
    }

    const observer = new MutationObserver((entries) => {
      entries.forEach((entry) => {
        entry.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            init(node);
          }
        });
      });
    });

    observer.observe(root, { childList: true, subtree: true });
    observers.add(root);
  }

  function init(root = document) {
    const scope = root instanceof Document ? root : root instanceof HTMLElement ? root : document;
    syncButtons(scope);
    syncVariantDrivenSurfaces(scope);
    syncProgressBars(scope);
    initDatePickers(scope);
    initChoices(scope);
    initTabs(scope);
    initCollapse(scope);
    initCarousels(scope);
    initInputNumbers(scope);
    initBinaryControls(scope);
    initRates(scope);
    initSegmentedAndPagination(scope);
    initSplitters(scope);
    initSliders(scope);
    initInputTags(scope);
    initTransfers(scope);
    initBacktops(scope);
    initGenericToggles(scope);
    attachGlobalListeners();

    if (scope === document && document.body) {
      observe(document.body);
    } else if (scope instanceof HTMLElement) {
      observe(scope);
    }

    return scope;
  }

  window.Retro8UI = {
    init,
    refresh: init,
    version: "0.3.0",
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => init(document), { once: true });
  } else {
    init(document);
  }
})();
