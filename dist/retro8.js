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
      root: ".r8-date-picker-panel",
      trigger: "",
      panel: ".r8-date-picker-panel",
      option: ".r8-date-picker__day",
      closeOnSelect: false,
      kind: "date",
    },
    {
      root: ".r8-date-picker",
      trigger: ".r8-date-picker__trigger",
      panel: ".r8-date-picker__panel",
      option: ".r8-date-picker__day",
      kind: "date",
    },
    {
      root: ".r8-datetime-picker",
      trigger: ".r8-datetime-picker__trigger",
      panel: ".r8-datetime-picker__panel",
      option: ".r8-date-picker__day, .r8-time-picker__slot",
      kind: "datetime",
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
  const floatingStates = new Set();
  const genericTargets = new Set();
  const observers = new WeakSet();
  let uniqueId = 0;

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
    setExpanded(state.trigger, false);
    floatingStates.delete(container);
  }

  function openFloating(container) {
    const state = choiceStates.get(container);
    if (!state?.panel) {
      return;
    }

    setHidden(state.panel, false);
    setExpanded(state.trigger, true);
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
    if (!state?.trigger) {
      return;
    }

    const value = getTextValue(option);
    const display = getChoiceDisplay(state.trigger);

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

  function markChoiceSelection(container, option, family) {
    const state = choiceStates.get(container);
    if (!state?.options?.length) {
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

    element.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handler(event);
      }
    });
  }

  function initChoices(root) {
    choiceFamilies.forEach((family) => {
      toArray(root.querySelectorAll(family.root)).forEach((container) => {
        if (!(container instanceof HTMLElement) || container.dataset.r8ChoiceReady === "true") {
          return;
        }

        container.dataset.r8ChoiceReady = "true";

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
          initialOptions.forEach((option) => markChoiceSelection(container, option, family));
          return;
        }

        const initialOption =
          options.find((option) => option.classList.contains("is-selected")) || (!trigger ? options[0] : null);
        if (initialOption) {
          markChoiceSelection(container, initialOption, family);
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

      function activateTab(targetTab) {
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
      }

      items.forEach((tab) => {
        tab.addEventListener("click", () => activateTab(tab));
        bindKeyboardActivation(tab, () => activateTab(tab));
      });

      activateTab(items.find((item) => item.getAttribute("aria-selected") === "true") || items[0]);
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

      function activate(index) {
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
      }

      dots.forEach((dot, index) => {
        prepareActionLikeElement(dot);
        dot.addEventListener("click", () => activate(index));
        bindKeyboardActivation(dot, () => activate(index));
      });

      activate(dots.findIndex((dot) => dot.classList.contains("is-active")) >= 0 ? dots.findIndex((dot) => dot.classList.contains("is-active")) : 0);
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
          return;
        }

        setBinaryState(control, !control.classList.contains("is-checked"));
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
        }

        items.forEach((item) => {
          prepareActionLikeElement(item);
          item.addEventListener("click", () => activate(item));
          bindKeyboardActivation(item, () => activate(item));
        });
      });
    });
  }

  function updateSlider(component, nextValue) {
    const value = clamp(Number(nextValue) || 0, 0, 100);
    component.style.setProperty("--r8-progress-value", `${value}%`);
    component.dataset.r8Value = String(value);
    component.setAttribute("aria-valuenow", String(value));

    const output = component.querySelector("[data-r8-slider-output]") || component.querySelector(".r8-text");
    if (output instanceof HTMLElement) {
      output.textContent = (output.textContent || "").replace(/\d+%/, `${value}%`);
    }
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
      updateSlider(component, component.dataset.r8Value || component.style.getPropertyValue("--r8-progress-value"));

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

        target.closest(".r8-input-tag__tag")?.remove();
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
          toArray(source.querySelectorAll(".r8-transfer__item.is-selected")).forEach((item) => {
            item.classList.remove("is-selected");
            destination.appendChild(item);
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

  function closeTarget(target) {
    if (!target) {
      return;
    }

    if (isDialog(target)) {
      if (target.open) {
        target.close();
      }
      return;
    }

    setHidden(target, true);
    genericTargets.forEach((entry) => {
      if (entry.target === target) {
        setExpanded(entry.trigger, false);
      }
    });
  }

  function openTarget(target, trigger) {
    if (!target) {
      return;
    }

    if (isDialog(target)) {
      if (!target.open) {
        target.showModal();
      }
      return;
    }

    setHidden(target, false);
    setExpanded(trigger, true);
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
      genericTargets.add({ trigger, target });

      const toggle = () => {
        if (isOpen(target)) {
          closeTarget(target);
        } else {
          openTarget(target, trigger);
        }
      };

      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        toggle();
      });
      bindKeyboardActivation(trigger, toggle);
    });

    toArray(root.querySelectorAll("[data-r8-close]")).forEach((button) => {
      if (!(button instanceof HTMLElement) || button.dataset.r8CloseReady === "true") {
        return;
      }

      button.dataset.r8CloseReady = "true";
      button.addEventListener("click", () => {
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
      });
    });

    toArray(root.querySelectorAll("[data-r8-dismiss]")).forEach((button) => {
      if (!(button instanceof HTMLElement) || button.dataset.r8DismissReady === "true") {
        return;
      }

      button.dataset.r8DismissReady = "true";
      button.addEventListener("click", () => {
        const host = button.closest(".r8-alert, .r8-message, .r8-notification, .r8-message-box");
        if (host instanceof HTMLElement) {
          setHidden(host, true);
        }
      });
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

      if (!entry.target || !isOpen(entry.target) || isDialog(entry.target)) {
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
    initChoices(scope);
    initTabs(scope);
    initCollapse(scope);
    initCarousels(scope);
    initInputNumbers(scope);
    initBinaryControls(scope);
    initRates(scope);
    initSegmentedAndPagination(scope);
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
    version: "0.2.0",
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => init(document), { once: true });
  } else {
    init(document);
  }
})();
