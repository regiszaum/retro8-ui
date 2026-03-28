import "@fontsource/press-start-2p/index.css";
import "../dist/retro8.css";
import "./playground.css";
import {
  componentOrder,
  getComponentById,
  getComponentNeighbors,
  getPath,
  getSiteContent,
  localeMeta,
} from "./site-data.mjs";

const THEME_KEY = "retro8-ui-docs-theme";
const LOCALE_KEY = "retro8-ui-docs-locale";
const app = document.querySelector("#app");
const documentRoot = document.documentElement;
const pageKind = documentRoot.dataset.pageKind ?? "root";
const currentLocale = localeMeta[documentRoot.dataset.locale] ? documentRoot.dataset.locale : "pt-br";
const currentComponentId = documentRoot.dataset.componentId ?? "";
const activeSite = pageKind === "root" ? getSiteContent("pt-br") : getSiteContent(currentLocale);

applyTheme(getInitialTheme());

if (!(app instanceof HTMLElement)) {
  throw new Error("Docs root not found.");
}

if (pageKind === "root") {
  app.innerHTML = renderRootPage();
} else {
  app.innerHTML = renderDocsPage(activeSite, pageKind, currentComponentId);
}

bindInteractions();
syncThemeControls();

function renderRootPage() {
  const site = activeSite;
  const english = getSiteContent("en");

  return `
    <div class="docs-root">
      <section class="r8-window docs-root__window">
        <div class="r8-window__titlebar">
          <span class="r8-window__title">retro8-ui docs</span>
          <div class="docs-toolbar">
            ${renderThemeSwitcher(site.theme)}
          </div>
        </div>
        <div class="r8-window__body docs-root__body">
          <span class="docs-kicker">${site.root.kicker}</span>
          <h1 class="docs-root__title">${site.root.title}</h1>
          <p class="docs-root__copy">${site.root.copy}</p>
          <div class="docs-root__grid">
            <a class="r8-panel docs-root__card" href="${getPath({ locale: "pt-br" })}" data-locale-link="pt-br">
              <div class="r8-panel__body">
                <span class="docs-summary-card__kicker">PT-BR</span>
                <h2 class="docs-summary-card__title">${site.root.primaryAction}</h2>
                <p class="docs-summary-card__copy">${site.home.heroTitle}</p>
              </div>
            </a>
            <a class="r8-panel docs-root__card" href="${getPath({ locale: "en" })}" data-locale-link="en">
              <div class="r8-panel__body">
                <span class="docs-summary-card__kicker">EN</span>
                <h2 class="docs-summary-card__title">${english.root.secondaryAction}</h2>
                <p class="docs-summary-card__copy">${english.home.heroTitle}</p>
              </div>
            </a>
          </div>
        </div>
        <div class="r8-window__statusbar">${site.root.status}</div>
      </section>
    </div>
  `;
}

function renderDocsPage(site, kind, componentId) {
  const currentComponent = kind === "component" ? getComponentById(site.locale, componentId) : null;

  return `
    <div class="docs-shell">
      <header class="docs-topbar">
        <nav class="r8-navbar r8-navbar--dark" aria-label="retro8-ui documentation navigation">
          <a class="r8-navbar__brand" href="${getPath({ locale: site.locale })}">retro8-ui docs</a>
          <ul class="r8-navbar__menu">
            ${site.nav.topLinks
              .map(
                (link) => `
                  <li><a class="r8-navbar__item" href="${getPath({ locale: site.locale, anchor: link.anchor })}">${link.label}</a></li>
                `,
              )
              .join("")}
          </ul>
          <div class="r8-navbar__actions docs-toolbar">
            ${renderLocaleSwitcher(site.locale, kind, componentId, site.localeSwitcher)}
            ${renderThemeSwitcher(site.theme)}
          </div>
        </nav>
      </header>

      <div class="docs-layout">
        <aside class="docs-sidebar">
          ${renderSidebar(site, kind, componentId)}
        </aside>

        <main class="docs-main">
          ${kind === "home" ? renderHomePage(site) : renderComponentPage(site, currentComponent)}
          ${renderFooter(site.home)}
        </main>
      </div>
    </div>

    ${renderDialogDemo(site.componentPage)}
  `;
}

function renderSidebar(site, pageKindValue, componentId) {
  return `
    <div class="r8-panel docs-sidebar__panel">
      <div class="r8-panel__header">
        <h2 class="r8-panel__title">${site.nav.sidebarTitle}</h2>
        <p class="docs-sidebar__copy">${site.home.heroCopy}</p>
      </div>
      <div class="r8-panel__body docs-sidebar__body">
        ${site.nav.sidebarGroups
          .map(
            (group) => `
              <div class="docs-sidebar__group">
                <p class="docs-sidebar__eyebrow">${group.title}</p>
                ${group.items.map((item) => renderSidebarItem(site.locale, pageKindValue, componentId, item)).join("")}
              </div>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderSidebarItem(locale, pageKindValue, componentId, item) {
  if (typeof item === "string") {
    const href = getPath({ locale, pageKind: "component", componentId: item });
    const active = pageKindValue === "component" && componentId === item ? ' aria-current="page"' : "";
    return `
      <a class="docs-sidebar__link" href="${href}"${active}>
        <span class="docs-sidebar__dot" aria-hidden="true"></span>
        <span>${getComponentById(locale, item)?.name ?? item}</span>
      </a>
    `;
  }

  return `
    <a class="docs-sidebar__link" href="${getPath({ locale, anchor: item.id })}">
      <span class="docs-sidebar__dot" aria-hidden="true"></span>
      <span>${item.label}</span>
    </a>
  `;
}

function renderHomePage(site) {
  return `
    ${renderHero(site.home, site.components, site.locale)}
    ${renderQuickStart(site.home)}
    ${renderTokens(site.home)}
    ${renderIconsSection(site.home)}
    ${renderComponentIndex(site.home, site.locale)}
  `;
}

function renderHero(home, components, locale) {
  return `
    <section class="docs-section docs-hero" id="overview">
      <div class="docs-hero__layout">
        <section class="r8-window docs-hero__window">
          <div class="r8-window__titlebar">
            <span class="r8-window__title">${home.heroWindowTitle}</span>
            <div class="r8-window__controls" aria-hidden="true">
              <span class="r8-window__control"></span>
              <span class="r8-window__control"></span>
              <span class="r8-window__control"></span>
            </div>
          </div>
          <div class="r8-window__body docs-hero__body">
            <span class="docs-kicker">${home.heroKicker}</span>
            <h1 class="docs-hero__title">${home.heroTitle}</h1>
            <p class="docs-hero__copy">${home.heroCopy}</p>
            <div class="r8-row">
              <a class="r8-btn r8-btn--primary" href="${getPath({ locale, anchor: "components" })}">${home.heroPrimary}</a>
              <a class="r8-btn r8-btn--secondary" href="${getPath({ locale, anchor: "quick-start" })}">${home.heroSecondary}</a>
              <button class="r8-btn r8-btn--ghost" type="button" data-open-dialog-demo>${home.heroTertiary}</button>
            </div>
          </div>
          <div class="r8-window__statusbar">${home.heroStatus}</div>
        </section>

        <div class="docs-hero__stats">
          <section class="r8-panel">
            <div class="r8-panel__header">
              <h2 class="r8-panel__title">${home.statsTitle}</h2>
            </div>
            <div class="r8-panel__body docs-hero__card-body">
              ${home.stats
                .map(
                  (stat) => `
                    <div class="docs-stat">
                      <strong>${stat.value}</strong>
                      <span>${stat.label}</span>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </section>

          <section class="r8-panel r8-panel--muted">
            <div class="r8-panel__header">
              <h2 class="r8-panel__title">${home.overviewTitle}</h2>
            </div>
            <div class="r8-panel__body docs-checklist">
              ${home.overviewItems.map((item) => `<p>${item}</p>`).join("")}
            </div>
          </section>
        </div>
      </div>
    </section>
  `;
}

function renderQuickStart(home) {
  return `
    <section class="docs-section" id="quick-start">
      <div class="docs-section__header">
        <span class="docs-kicker">${home.quickStartKicker}</span>
        <h2 class="docs-section__title">${home.quickStartTitle}</h2>
        <p class="docs-section__copy">${home.quickStartCopy}</p>
      </div>

      <div class="docs-snippet-grid">
        ${home.quickStartCards.map(renderSnippetCard).join("")}
      </div>

      <div class="docs-framework-grid">
        <section class="r8-panel">
          <div class="r8-panel__header">
            <h3 class="r8-panel__title">${home.frameworkTitle}</h3>
          </div>
          <div class="r8-panel__body docs-list-block">
            <ul class="docs-list">
              ${home.frameworkItems.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
        </section>

        <section class="r8-panel">
          <div class="r8-panel__header">
            <h3 class="r8-panel__title">${home.conventionsTitle}</h3>
          </div>
          <div class="r8-panel__body docs-list-block">
            <ul class="docs-list">
              ${home.conventionsItems.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
        </section>
      </div>
    </section>
  `;
}

function renderSnippetCard(snippet) {
  return `
    <section class="r8-window docs-code docs-code--compact">
      <div class="r8-window__titlebar">
        <span class="r8-window__title">${snippet.title}</span>
      </div>
      <div class="r8-window__body">
        <p class="docs-code__description">${snippet.description}</p>
        <pre class="docs-code__pre"><code>${escapeHtml(snippet.code)}</code></pre>
      </div>
    </section>
  `;
}

function renderTokens(home) {
  return `
    <section class="docs-section" id="tokens">
      <div class="docs-section__header">
        <span class="docs-kicker">${home.tokensKicker}</span>
        <h2 class="docs-section__title">${home.tokensTitle}</h2>
        <p class="docs-section__copy">${home.tokensCopy}</p>
      </div>

      <div class="docs-token-grid">
        ${home.tokens.map(renderTokenGroup).join("")}
      </div>
    </section>
  `;
}

function renderTokenGroup(group) {
  return `
    <section class="r8-panel docs-token-card">
      <div class="r8-panel__header">
        <h3 class="r8-panel__title">${group.title}</h3>
      </div>
      <div class="r8-panel__body">
        <ul class="docs-token-list">
          ${group.items
            .map((item) =>
              group.type === "color"
                ? `
                  <li class="docs-token-list__item">
                    <span class="docs-token-list__swatch" style="background:${item.value};"></span>
                    <span class="docs-token-list__meta">
                      <strong>${item.label}</strong>
                      <code>${item.token}</code>
                    </span>
                    <code>${item.value}</code>
                  </li>
                `
                : `
                  <li class="docs-token-list__item">
                    <span class="docs-token-list__meta">
                      <strong>${item.label}</strong>
                      <code>${item.token}</code>
                    </span>
                    <code>${item.value}</code>
                  </li>
                `,
            )
            .join("")}
        </ul>
      </div>
    </section>
  `;
}

function renderIconsSection(home) {
  return `
    <section class="docs-section" id="icons">
      <div class="docs-section__header">
        <span class="docs-kicker">${home.iconsKicker}</span>
        <h2 class="docs-section__title">${home.iconsTitle}</h2>
        <p class="docs-section__copy">${home.iconsCopy}</p>
      </div>
      <div class="docs-framework-grid">
        ${home.iconsCards
          .map(
            (card) => `
              <section class="r8-panel">
                <div class="r8-panel__header">
                  <h3 class="r8-panel__title">${card.title}</h3>
                  <p class="docs-panel__meta">${card.subtitle}</p>
                </div>
                <div class="r8-panel__body docs-list-block">
                  <p class="docs-panel__copy">${card.body}</p>
                  <div class="r8-row">
                    <a class="r8-btn r8-btn--primary r8-btn--sm" href="${card.ctaHref}" target="_blank" rel="noreferrer">${card.ctaLabel}</a>
                    <a class="r8-btn r8-btn--ghost r8-btn--sm" href="${card.secondaryHref}" target="_blank" rel="noreferrer">${card.secondaryLabel}</a>
                  </div>
                </div>
              </section>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderComponentIndex(home, locale) {
  return `
    <section class="docs-section" id="components">
      <div class="docs-section__header">
        <span class="docs-kicker">${home.componentIndexKicker}</span>
        <h2 class="docs-section__title">${home.componentIndexTitle}</h2>
        <p class="docs-section__copy">${home.componentIndexCopy}</p>
      </div>

      <div class="docs-component-index">
        ${home.components.map((component) => renderSummaryCard(component, locale)).join("")}
      </div>
    </section>
  `;
}

function renderSummaryCard(component, locale) {
  return `
    <a class="r8-panel docs-summary-card" href="${getPath({ locale, pageKind: "component", componentId: component.id })}">
      <div class="r8-panel__body">
        <span class="docs-summary-card__kicker">${component.category}</span>
        <h3 class="docs-summary-card__title">${component.name}</h3>
        <p class="docs-summary-card__copy">${component.summary}</p>
      </div>
    </a>
  `;
}

function renderComponentPage(site, component) {
  if (!component) {
    return "";
  }

  const neighbors = getComponentNeighbors(component.id);

  return `
    <section class="docs-section docs-component-page">
      <div class="docs-breadcrumbs">
        <a class="r8-btn r8-btn--sm r8-btn--ghost" href="${getPath({ locale: site.locale, anchor: "components" })}">
          ${site.nav.backToCatalog}
        </a>
      </div>

      <div class="docs-section__header">
        <span class="docs-kicker">${component.category}</span>
        <h1 class="docs-section__title">${component.name}</h1>
        <p class="docs-section__copy">${component.summary}</p>
      </div>

      <div class="docs-component__layout">
        <section class="r8-window docs-preview">
          <div class="r8-window__titlebar">
            <span class="r8-window__title">${site.componentPage.previewLabel}</span>
          </div>
          <div class="r8-window__body">
            <div class="docs-preview__surface">
              ${component.preview}
            </div>
          </div>
          <div class="r8-window__statusbar">${site.componentPage.previewStatus}</div>
        </section>

        <div class="docs-component__meta">
          <section class="r8-panel docs-meta-card">
            <div class="r8-panel__header">
              <h2 class="r8-panel__title">${site.componentPage.apiTitle}</h2>
            </div>
            <div class="r8-panel__body docs-list-block">
              <ul class="docs-list">
                ${component.api.map((item) => `<li><code>${item.name}</code> ${item.description}</li>`).join("")}
              </ul>
            </div>
          </section>

          <section class="r8-panel docs-meta-card">
            <div class="r8-panel__header">
              <h2 class="r8-panel__title">${site.componentPage.anatomyTitle}</h2>
            </div>
            <div class="r8-panel__body docs-list-block">
              <ul class="docs-list">
                ${component.anatomy.map((item) => `<li>${item}</li>`).join("")}
              </ul>
            </div>
          </section>

          <section class="r8-panel docs-meta-card">
            <div class="r8-panel__header">
              <h2 class="r8-panel__title">${site.componentPage.accessibilityTitle}</h2>
            </div>
            <div class="r8-panel__body docs-list-block">
              <ul class="docs-list">
                ${component.accessibility.map((item) => `<li>${item}</li>`).join("")}
              </ul>
            </div>
          </section>
        </div>
      </div>

      <section class="r8-window docs-code">
        <div class="r8-window__titlebar">
          <span class="r8-window__title">${component.name} ${site.componentPage.htmlTitleSuffix}</span>
        </div>
        <div class="r8-window__body">
          <div class="docs-code__toolbar">
            <span class="docs-code__hint">${site.componentPage.copyHint}</span>
            <button class="r8-btn r8-btn--sm r8-btn--secondary" type="button" data-copy-button>
              ${site.componentPage.copyButton}
            </button>
          </div>
          <pre class="docs-code__pre"><code>${escapeHtml(component.code)}</code></pre>
        </div>
      </section>

      <section class="docs-pager">
        ${neighbors.previous
          ? `<a class="r8-btn r8-btn--ghost" href="${getPath({ locale: site.locale, pageKind: "component", componentId: neighbors.previous })}">${site.nav.previousComponent}</a>`
          : `<span></span>`}
        ${neighbors.next
          ? `<a class="r8-btn r8-btn--secondary" href="${getPath({ locale: site.locale, pageKind: "component", componentId: neighbors.next })}">${site.nav.nextComponent}</a>`
          : `<span></span>`}
      </section>
    </section>
  `;
}

function renderFooter(home) {
  return `
    <footer class="docs-footer">
      <div class="r8-panel r8-panel--muted">
        <div class="r8-panel__body docs-footer__body">
          <p>${home.footerPrimary}</p>
          <p>${home.footerSecondary}</p>
        </div>
      </div>
    </footer>
  `;
}

function renderLocaleSwitcher(locale, pageKindValue, componentId, localeSwitcher) {
  return `
    <div class="docs-toolbar__group" aria-label="${localeSwitcher.label}">
      ${Object.values(localeMeta)
        .map((target) => {
          const href =
            pageKindValue === "component"
              ? getPath({ locale: target.id, pageKind: "component", componentId })
              : getPath({ locale: target.id });

          const current = target.id === locale;
          return `
            <a
              class="docs-toolbar__button${current ? " is-active" : ""}"
              href="${href}"
              data-locale-link="${target.id}"
              ${current ? 'aria-current="page"' : ""}
            >
              ${target.label}
            </a>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderThemeSwitcher(theme) {
  return `
    <div class="docs-toolbar__group" aria-label="${theme.label}">
      <button class="docs-toolbar__button" type="button" data-theme-value="light">${theme.light}</button>
      <button class="docs-toolbar__button" type="button" data-theme-value="dark">${theme.dark}</button>
    </div>
  `;
}

function renderDialogDemo(componentPage) {
  return `
    <dialog class="r8-dialog" id="docs-dialog-demo" aria-labelledby="docs-dialog-demo-title">
      <div class="r8-dialog__titlebar">
        <h2 class="r8-dialog__title" id="docs-dialog-demo-title">${componentPage.dialogTitle}</h2>
      </div>
      <div class="r8-dialog__body">${componentPage.dialogBody}</div>
      <div class="r8-dialog__footer">
        <button class="r8-btn" type="button" data-close-dialog-demo>${componentPage.dialogClose}</button>
        <button class="r8-btn r8-btn--primary" type="button">${componentPage.dialogConfirm}</button>
      </div>
    </dialog>
  `;
}

function bindInteractions() {
  const nativeDialog = document.querySelector("#docs-dialog-demo");
  const dialogOpeners = document.querySelectorAll("[data-open-dialog-demo]");
  const dialogClosers = document.querySelectorAll("[data-close-dialog-demo]");
  const copyButtons = document.querySelectorAll("[data-copy-button]");
  const themeButtons = document.querySelectorAll("[data-theme-value]");
  const localeLinks = document.querySelectorAll("[data-locale-link]");

  if (nativeDialog instanceof HTMLDialogElement) {
    dialogOpeners.forEach((button) => {
      button.addEventListener("click", () => {
        nativeDialog.showModal();
      });
    });

    dialogClosers.forEach((button) => {
      button.addEventListener("click", () => {
        nativeDialog.close();
      });
    });
  }

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const code = button.closest(".docs-code")?.querySelector("code");
      if (!(code instanceof HTMLElement)) {
        return;
      }

      const previousLabel = button.textContent;

      try {
        await navigator.clipboard.writeText(code.textContent ?? "");
        button.textContent = activeSite.componentPage.copySuccess;
        window.setTimeout(() => {
          button.textContent = previousLabel;
        }, 1200);
      } catch {
        button.textContent = activeSite.componentPage.copyUnavailable;
        window.setTimeout(() => {
          button.textContent = previousLabel;
        }, 1200);
      }
    });
  });

  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextTheme = button.getAttribute("data-theme-value");
      if (!nextTheme) {
        return;
      }

      localStorage.setItem(THEME_KEY, nextTheme);
      applyTheme(nextTheme);
      syncThemeControls();
    });
  });

  localeLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const nextLocale = link.getAttribute("data-locale-link");
      if (nextLocale) {
        localStorage.setItem(LOCALE_KEY, nextLocale);
      }
    });
  });
}

function getInitialTheme() {
  const storedTheme = localStorage.getItem(THEME_KEY);
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  documentRoot.dataset.theme = theme;
}

function syncThemeControls() {
  const currentTheme = documentRoot.dataset.theme;
  document.querySelectorAll("[data-theme-value]").forEach((button) => {
    const active = button.getAttribute("data-theme-value") === currentTheme;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
