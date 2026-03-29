import {
  componentCatalog,
  componentCount,
  componentGroups,
  componentOrder,
  coreComponentCount,
  defaultAccessibilityByGroup,
  defaultAnatomyByGroup,
  type CatalogEntry,
  type CatalogApiEntry,
  type DocsLocale,
} from "~~/shared/component-catalog";
import {
  getComponentContract,
  type CatalogEventEntry,
  type CatalogMethodEntry,
  type CatalogTableEntry,
} from "~~/shared/component-contracts";

export const localeMeta = {
  "pt-br": {
    id: "pt-br",
    htmlLang: "pt-BR",
    label: "PT-BR",
  },
  en: {
    id: "en",
    htmlLang: "en",
    label: "EN",
  },
} as const;

const sharedTokenGroups = [
  {
    key: "colors",
    type: "color",
    items: [
      { labelKey: "background", token: "--r8-color-bg", value: "#0f172a" },
      { labelKey: "surface", token: "--r8-color-surface", value: "#f8fafc" },
      { labelKey: "primary", token: "--r8-color-primary", value: "#2563eb" },
      { labelKey: "secondary", token: "--r8-color-secondary", value: "#64748b" },
      { labelKey: "tertiary", token: "--r8-color-tertiary", value: "#7c3aed" },
      { labelKey: "success", token: "--r8-color-success", value: "#16a34a" },
      { labelKey: "info", token: "--r8-color-info", value: "#0891b2" },
      { labelKey: "danger", token: "--r8-color-danger", value: "#dc2626" },
      { labelKey: "dark", token: "--r8-color-dark", value: "#1e293b" },
      { labelKey: "light", token: "--r8-color-light", value: "#f8fafc" },
      { labelKey: "focus", token: "--r8-color-focus", value: "#facc15" },
    ],
  },
  {
    key: "spacing",
    type: "token",
    items: [
      { labelKey: "xs", token: "--r8-space-2", value: "0.25rem" },
      { labelKey: "sm", token: "--r8-space-3", value: "0.5rem" },
      { labelKey: "md", token: "--r8-space-5", value: "1rem" },
      { labelKey: "lg", token: "--r8-space-8", value: "1.75rem" },
    ],
  },
  {
    key: "borders",
    type: "token",
    items: [
      { labelKey: "thinBorder", token: "--r8-border-thin", value: "2px" },
      { labelKey: "thickBorder", token: "--r8-border-thick", value: "4px" },
      { labelKey: "shadowMd", token: "--r8-shadow-md", value: "4px 4px 0 0" },
      { labelKey: "pressed", token: "--r8-shadow-pressed", value: "1px 1px 0 0" },
    ],
  },
  {
    key: "typeAndMotion",
    type: "token",
    items: [
      { labelKey: "display", token: "--r8-font-display", value: "Press Start 2P" },
      { labelKey: "body", token: "--r8-font-body", value: "IBM Plex Mono" },
      { labelKey: "lift", token: "--r8-motion-lift", value: "-1px" },
      { labelKey: "press", token: "--r8-motion-press", value: "2px" },
    ],
  },
] as const;

const localized = {
  "pt-br": {
    meta: {
      title: "retro8-ui Docs",
      description:
        "Documentacao bilingue da retro8-ui com catalog expandido, pages individuais por component e light/dark mode.",
    },
    nav: {
      topLinks: [
        { label: "Quick start", to: "getting-started" },
        { label: "Components", to: "components" },
        { label: "Tokens", to: "tokens" },
        { label: "Icons", to: "icons" },
      ],
      homeLabel: "Overview",
      guideTitle: "Guide",
      sidebarTitle: "Documentation",
      backToCatalog: "Back to catalog",
      nextComponent: "Next component",
      previousComponent: "Previous component",
    },
    theme: {
      label: "Theme",
      light: "Light",
      dark: "Dark",
    },
    localeSwitcher: {
      label: "Language",
    },
    search: {
      label: "Search components",
      placeholder: "Search components...",
      hint: "Use Arrow keys to navigate and Enter to open.",
      empty: "No matching components found.",
      close: "Esc",
    },
    home: {
      heroWindowTitle: "Retro catalog em escala real",
      heroKicker: "81 componentes core + extras retro8",
      heroTitle: "A retro8-ui agora entrega um catalogo amplo em linguagem visual 8-bit.",
      heroCopy:
        "A library continua framework-agnostic e CSS-first, mas a docs agora escalam como um produto real: catalog agrupado, pages individuais, light/dark themes e uma fundacao ampla para evoluir o sistema.",
      heroPrimary: "Explore catalog",
      heroSecondary: "Open Quick start",
      heroStatus:
        "Cobertura ampla de components, mantendo CSS semantico e runtime opcional.",
      statsTitle: "Library coverage",
      overviewTitle: "Architecture decisions",
      overviewItems: [
        "O catalogo principal cobre 81 components core, alem de extras nativos da retro8-ui.",
        "A docs continua separada da library: Nuxt para a experiencia publica, CSS compilado para o produto final.",
        "Componentes com comportamento complexo agora podem usar o runtime JS opcional da retro8-ui ou o app host.",
      ],
      quickStartTitle: "Instale, importe CSS + JS e use semantic HTML",
      quickStartCopy:
        "O consumo continua simples: importe o CSS final, adicione o runtime JS quando houver interacao e monte markup curto com classes r8-* previsiveis.",
      quickStartKicker: "Quick start",
      quickStartCards: [
        {
          title: "Installation",
          description: "Adicione a library no projeto consumidor ou no workspace local.",
          code: `npm install retro8-ui`,
        },
        {
          title: "Import the CSS",
          description: "O CSS compilado continua sendo a base da library.",
          code: `import "retro8-ui/retro8.css";`,
        },
        {
          title: "Import the JS runtime",
          description: "Adicione o runtime opcional quando components interativos precisarem de comportamento pronto.",
          code: `import "retro8-ui/retro8.js";`,
        },
        {
          title: "Semantic markup",
          description: "Combine classe base e modificadores claros, em vez de utility classes enormes.",
          code: `<button class="r8-btn r8-btn--primary" type="button">
  Start mission
</button>`,
        },
      ],
      frameworkTitle: "Use it in any framework",
      frameworkItems: [
        "HTML puro: linke retro8.css e retro8.js, depois use classes r8-* direto no markup.",
        "React / Next / Vite: importe retro8-ui/retro8.css e retro8-ui/retro8.js uma vez na app.",
        "Vue / Nuxt: mesmo fluxo, sem wrappers ou adapters obrigatorios.",
        "Laravel / Blade: publique ou copie o CSS compilado e o runtime JS para os assets da app.",
      ],
      conventionsTitle: "API conventions",
      conventionsItems: [
        "Classes base como r8-btn, r8-card, r8-dialog e r8-table organizam a API publica.",
        "Modificadores seguem o padrao --primary, --danger, --vertical, --dark quando fizer sentido.",
        "Elementos internos usam __header, __body, __footer e similares para manter a composicao previsivel.",
        "CSS variables entram apenas quando agregam valor real, como --r8-progress-value.",
      ],
      tokensTitle: "Tokens que seguram a identidade visual",
      tokensCopy:
        "Cores, spacing, bordas, sombras, tipografia e interactive states vivem em CSS custom properties para manter consistencia e facilitar evolucao.",
      tokensKicker: "Foundation",
      tokensGroupTitles: {
        colors: "Semantic colors",
        spacing: "Spacing",
        borders: "Borders and shadows",
        typeAndMotion: "Typography and interaction",
      },
      tokenItemLabels: {
        background: "Background",
        surface: "Surface",
        primary: "Primary",
        secondary: "Secondary",
        tertiary: "Tertiary",
        info: "Info",
        danger: "Danger",
        success: "Success",
        dark: "Dark",
        light: "Light",
        focus: "Focus",
        xs: "XS",
        sm: "SM",
        md: "MD",
        lg: "LG",
        thinBorder: "Thin border",
        thickBorder: "Thick border",
        shadowMd: "Shadow md",
        pressed: "Pressed",
        display: "Display",
        body: "Body",
        lift: "Lift",
        press: "Press",
      },
      iconsTitle: "Optional icon package",
      iconsCopy:
        "A retro8-ui nao injeta icons na API principal. A docs recomenda um package separado para manter a library enxuta e combinavel.",
      iconsKicker: "Ecosystem",
      iconsCards: [
        {
          title: "Recommended: Pixelarticons",
          subtitle: "Best fit para combinar com a retro8-ui",
          body:
            "O projeto oficial oferece centenas de icons gratuitos em SVG, npm, CDN e webfont. Funciona muito bem com uma library CSS-first e framework-agnostic.",
          ctaLabel: "Open website",
          ctaHref: "https://pixelarticons.com/",
          secondaryLabel: "GitHub",
          secondaryHref: "https://github.com/halfmage/pixelarticons",
        },
        {
          title: "Alternativa: HackerNoon Pixel Icon Library",
          subtitle: "Boa opcao para quem quer um icon package pronto",
          body:
            "Tem um conjunto grande de icons em fonte e SVG. Eu usaria como opcao complementar, mantendo a UI core livre de qualquer icon bundle.",
          ctaLabel: "Open repo",
          ctaHref: "https://github.com/hackernoon/pixel-icon-library",
          secondaryLabel: "NPM",
          secondaryHref: "https://www.npmjs.com/package/@hackernoon/pixel-icon-library",
        },
      ],
      componentIndexTitle: "Full grouped catalog",
      componentIndexCopy:
        "Cada component tem sua propria route. O catalog abaixo organiza a library por groups previsiveis e ainda preserva extras proprios da retro8-ui.",
      componentIndexKicker: "Components",
      footerPrimary:
        "A documentacao publica agora escala como um component site de verdade, com navegacao por group, locale e theme.",
      footerSecondary:
        "A library continua focada em CSS compilado, runtime JS opcional e classes semanticas. Os extras de docs, i18n e recommended icons permanecem desacoplados.",
      stats: {
        coreLabel: "core components",
        coreCopy: "como base ampla para a primeira versao publica",
        docsLabel: "component pages",
        docsCopy: "incluindo extras nativos da retro8-ui",
        groupsLabel: "groups",
        groupsCopy: "entre Basic, Form, Data, Feedback e extras",
      },
    },
    componentPage: {
      previewLabel: "Preview",
      previewStatus: "Live preview usando o CSS compilado e o runtime opcional da retro8-ui",
      apiTitle: "Semantic API",
      attributesTitle: "Attributes",
      dataAttributesTitle: "Data attributes",
      cssVariablesTitle: "CSS variables",
      methodsTitle: "Methods",
      eventsTitle: "Events",
      anatomyTitle: "Anatomy",
      accessibilityTitle: "Accessibility",
      tableColumns: {
        name: "Name",
        type: "Type",
        defaultValue: "Default",
        description: "Description",
        signature: "Signature",
        payload: "Payload",
      },
      htmlTitleSuffix: "HTML",
      copyHint: "Copy o snippet e adapte ao seu projeto.",
      copyButton: "Copy HTML",
      copySuccess: "Copied",
      copyUnavailable: "No clipboard",
      dialogTitle: "Native dialog",
      dialogBody:
        "Esta janela existe apenas na documentacao para demonstrar o component Dialog. A library continua sem runtime JS obrigatorio.",
      dialogClose: "Close",
      dialogConfirm: "Confirm",
    },
  },
  en: {
    meta: {
      title: "retro8-ui Docs",
      description:
        "Bilingual retro8-ui documentation with an expanded catalog, per-component pages and light/dark mode.",
    },
    nav: {
      topLinks: [
        { label: "Quick start", to: "getting-started" },
        { label: "Components", to: "components" },
        { label: "Tokens", to: "tokens" },
        { label: "Icons", to: "icons" },
      ],
      homeLabel: "Overview",
      guideTitle: "Guide",
      sidebarTitle: "Documentation",
      backToCatalog: "Back to catalog",
      nextComponent: "Next component",
      previousComponent: "Previous component",
    },
    theme: {
      label: "Theme",
      light: "Light",
      dark: "Dark",
    },
    localeSwitcher: {
      label: "Language",
    },
    search: {
      label: "Search components",
      placeholder: "Search components...",
      hint: "Use Arrow keys to navigate and Enter to open.",
      empty: "No matching components found.",
      close: "Esc",
    },
    home: {
      heroWindowTitle: "Retro catalog at full scale",
      heroKicker: "81 core components + retro8 extras",
      heroTitle: "retro8-ui now ships a broad component catalog in an 8-bit visual language.",
      heroCopy:
        "The library stays framework-agnostic and CSS-first, while the docs now scale like a real product: grouped catalog, dedicated pages, light/dark themes and a broad foundation for the design system to grow.",
      heroPrimary: "Explore catalog",
      heroSecondary: "See quick start",
      heroStatus:
        "Broad component coverage, while keeping semantic CSS and optional runtime behavior.",
      statsTitle: "Library coverage",
      overviewTitle: "Architecture decisions",
      overviewItems: [
        "The main catalog covers 81 core components, plus native retro8-ui extras.",
        "The docs stay separate from the library: Nuxt powers the public experience, compiled CSS remains the product.",
        "Behavior-heavy components can use the optional retro8-ui runtime or stay wired by the host app.",
      ],
      quickStartTitle: "Install, import CSS + JS and use semantic HTML",
      quickStartCopy:
        "Consumption still stays simple: import the final CSS, add the optional JS runtime when interaction is needed and compose short markup with predictable r8-* classes.",
      quickStartKicker: "Quick start",
      quickStartCards: [
        {
          title: "Installation",
          description: "Add the library to your consumer project or local workspace.",
          code: `npm install retro8-ui`,
        },
        {
          title: "Import the CSS",
          description: "Compiled CSS remains the main visual layer.",
          code: `import "retro8-ui/retro8.css";`,
        },
        {
          title: "Import the JS runtime",
          description: "Add the optional runtime when interactive components need ready-to-use behavior.",
          code: `import "retro8-ui/retro8.js";`,
        },
        {
          title: "Semantic markup",
          description: "Combine a base class with clear modifiers instead of shipping utility-heavy HTML.",
          code: `<button class="r8-btn r8-btn--primary" type="button">
  Start mission
</button>`,
        },
      ],
      frameworkTitle: "Use it in any framework",
      frameworkItems: [
        "Plain HTML: link retro8.css and retro8.js, then use r8-* classes directly in the markup.",
        "React / Next / Vite: import retro8-ui/retro8.css and retro8-ui/retro8.js once in your app.",
        "Vue / Nuxt: same workflow, with no mandatory wrappers or adapters.",
        "Laravel / Blade: publish or copy the compiled CSS and JS runtime into your app assets.",
      ],
      conventionsTitle: "API conventions",
      conventionsItems: [
        "Base classes like r8-btn, r8-card, r8-dialog and r8-table organize the public API.",
        "Modifiers follow patterns such as --primary, --danger, --vertical and --dark when appropriate.",
        "Internal elements use __header, __body, __footer and similar names to keep composition predictable.",
        "CSS variables only appear when they add real value, such as --r8-progress-value.",
      ],
      tokensTitle: "Tokens that hold the visual identity together",
      tokensCopy:
        "Color, spacing, borders, shadows, typography and interaction states live in custom properties so the system stays consistent and easy to evolve.",
      tokensKicker: "Foundation",
      tokensGroupTitles: {
        colors: "Semantic colors",
        spacing: "Spacing",
        borders: "Borders and shadows",
        typeAndMotion: "Typography and interaction",
      },
      tokenItemLabels: {
        background: "Background",
        surface: "Surface",
        primary: "Primary",
        secondary: "Secondary",
        tertiary: "Tertiary",
        info: "Info",
        danger: "Danger",
        success: "Success",
        dark: "Dark",
        light: "Light",
        focus: "Focus",
        xs: "XS",
        sm: "SM",
        md: "MD",
        lg: "LG",
        thinBorder: "Thin border",
        thickBorder: "Thick border",
        shadowMd: "Shadow md",
        pressed: "Pressed",
        display: "Display",
        body: "Body",
        lift: "Lift",
        press: "Press",
      },
      iconsTitle: "Optional icon package",
      iconsCopy:
        "retro8-ui does not inject icons into the core API. The docs recommend a separate package to keep the library lean and composable.",
      iconsKicker: "Ecosystem",
      iconsCards: [
        {
          title: "Recommended: Pixelarticons",
          subtitle: "Best fit to pair with retro8-ui",
          body:
            "The official project offers hundreds of free icons across SVG, npm, CDN and webfont formats. It pairs extremely well with a CSS-first, framework-agnostic UI library.",
          ctaLabel: "Open website",
          ctaHref: "https://pixelarticons.com/",
          secondaryLabel: "GitHub",
          secondaryHref: "https://github.com/halfmage/pixelarticons",
        },
        {
          title: "Alternative: HackerNoon Pixel Icon Library",
          subtitle: "A good option when you want a ready-made pixel icon set",
          body:
            "It ships a large icon set across font and SVG formats. I would treat it as an optional pairing while keeping the core UI free from icon bundles.",
          ctaLabel: "Open repo",
          ctaHref: "https://github.com/hackernoon/pixel-icon-library",
          secondaryLabel: "NPM",
          secondaryHref: "https://www.npmjs.com/package/@hackernoon/pixel-icon-library",
        },
      ],
      componentIndexTitle: "Full grouped catalog",
      componentIndexCopy:
        "Every component has its own route. The catalog below organizes the library into predictable groups while preserving retro8-ui native extras.",
      componentIndexKicker: "Components",
      footerPrimary:
        "The public documentation now scales like a real component site, with grouped navigation, localization and theming.",
      footerSecondary:
        "The library still focuses on compiled CSS, an optional JS runtime and semantic classes. Docs features, i18n and recommended icons remain decoupled.",
      stats: {
        coreLabel: "core components",
        coreCopy: "as a broad foundation for the first public release",
        docsLabel: "component pages",
        docsCopy: "including retro8-ui native extras",
        groupsLabel: "groups",
        groupsCopy: "across basics, forms, data, feedback and extras",
      },
    },
    componentPage: {
      previewLabel: "Preview",
      previewStatus: "Live preview using the compiled retro8-ui CSS and optional runtime",
      apiTitle: "Semantic API",
      attributesTitle: "Attributes",
      dataAttributesTitle: "Data attributes",
      cssVariablesTitle: "CSS variables",
      methodsTitle: "Methods",
      eventsTitle: "Events",
      anatomyTitle: "Anatomy",
      accessibilityTitle: "Accessibility",
      tableColumns: {
        name: "Name",
        type: "Type",
        defaultValue: "Default",
        description: "Description",
        signature: "Signature",
        payload: "Payload",
      },
      htmlTitleSuffix: "HTML",
      copyHint: "Copy the snippet and adapt it to your project.",
      copyButton: "Copy HTML",
      copySuccess: "Copied",
      copyUnavailable: "No clipboard",
      dialogTitle: "Native dialog",
      dialogBody:
        "This window only exists in the docs to demonstrate the Dialog component. The library still ships with no required JS runtime.",
      dialogClose: "Close",
      dialogConfirm: "Confirm",
    },
  },
} as const;

function isDocsLocale(locale: string): locale is DocsLocale {
  return locale in localeMeta;
}

function describeApiClass(name: string, componentName: string, locale: DocsLocale) {
  if (name.startsWith("--")) {
    return locale === "en"
      ? `CSS custom property used to control a visual state in the ${componentName} family.`
      : `CSS custom property usada para controlar um estado visual na familia ${componentName}.`;
  }

  if (name.includes("__")) {
    return locale === "en"
      ? `Inner element exposed for richer ${componentName} compositions.`
      : `Inner element exposto para composicoes mais ricas de ${componentName}.`;
  }

  if (name.includes("--")) {
    return locale === "en"
      ? `Optional modifier for tone, layout, size or state inside the ${componentName} family.`
      : `Optional modifier para tone, layout, tamanho ou state na familia ${componentName}.`;
  }

  return locale === "en"
    ? `Semantic class exposed by the ${componentName} component family.`
    : `Semantic class exposta pela familia de components ${componentName}.`;
}

function localizeApiEntry(entry: CatalogApiEntry, locale: DocsLocale) {
  return {
    name: entry.name,
    description: entry.description[locale],
  };
}

function localizeTableEntry(entry: CatalogTableEntry, locale: DocsLocale) {
  return {
    name: entry.name,
    type: entry.type,
    defaultValue: entry.defaultValue,
    description: entry.description[locale],
  };
}

function localizeMethodEntry(entry: CatalogMethodEntry, locale: DocsLocale) {
  return {
    name: entry.name,
    signature: entry.signature,
    description: entry.description[locale],
  };
}

function localizeEventEntry(entry: CatalogEventEntry, locale: DocsLocale) {
  return {
    name: entry.name,
    payload: entry.payload,
    description: entry.description[locale],
  };
}

function createComponentPayload(locale: DocsLocale, component: CatalogEntry, groupTitle: string) {
  const contract = getComponentContract(component);

  return {
    id: component.id,
    name: component.name,
    category: groupTitle,
    group: component.group,
    core: component.core !== false,
    summary: component.summary[locale],
    preview: component.preview,
    code: component.code ?? component.preview,
    api: component.api
      ? component.api.map((entry) => localizeApiEntry(entry, locale))
      : component.classes.map((name) => ({
          name,
          description: describeApiClass(name, component.name, locale),
        })),
    attributes: contract.attributes.map((entry) => localizeTableEntry(entry, locale)),
    dataAttributes: contract.dataAttributes.map((entry) => localizeTableEntry(entry, locale)),
    cssVariables: contract.cssVariables.map((entry) => localizeTableEntry(entry, locale)),
    methods: contract.methods.map((entry) => localizeMethodEntry(entry, locale)),
    events: contract.events.map((entry) => localizeEventEntry(entry, locale)),
    anatomy: component.anatomy?.[locale] ?? defaultAnatomyByGroup[component.group][locale],
    accessibility: component.accessibility?.[locale] ?? defaultAccessibilityByGroup[component.group][locale],
  };
}

function buildComponentSections(locale: DocsLocale) {
  return componentGroups
    .map((group) => {
      const components = componentCatalog
        .filter((component) => component.group === group.id)
        .map((component) => createComponentPayload(locale, component, group.title[locale]));

      if (!components.length) {
        return null;
      }

      return {
        id: group.id,
        title: group.title[locale],
        description: group.description[locale],
        core: group.core,
        count: components.length,
        components,
      };
    })
    .filter(Boolean);
}

export function getSiteContent(locale = "pt-br") {
  const safeLocale = isDocsLocale(locale) ? locale : "pt-br";
  const dictionary = localized[safeLocale];
  const componentSections = buildComponentSections(safeLocale);
  const components = componentSections.flatMap((section) => section.components);

  const tokens = sharedTokenGroups.map((group) => ({
    title: dictionary.home.tokensGroupTitles[group.key],
    type: group.type,
    items: group.items.map((item) => ({
      label: dictionary.home.tokenItemLabels[item.labelKey],
      token: item.token,
      value: item.value,
    })),
  }));

  const stats =
    safeLocale === "en"
      ? [
          {
            value: `${coreComponentCount}`,
            label: dictionary.home.stats.coreLabel,
            copy: dictionary.home.stats.coreCopy,
          },
          {
            value: `${componentCount}`,
            label: dictionary.home.stats.docsLabel,
            copy: dictionary.home.stats.docsCopy,
          },
          {
            value: `${componentSections.length}`,
            label: dictionary.home.stats.groupsLabel,
            copy: dictionary.home.stats.groupsCopy,
          },
        ]
      : [
          {
            value: `${coreComponentCount}`,
            label: dictionary.home.stats.coreLabel,
            copy: dictionary.home.stats.coreCopy,
          },
          {
            value: `${componentCount}`,
            label: dictionary.home.stats.docsLabel,
            copy: dictionary.home.stats.docsCopy,
          },
          {
            value: `${componentSections.length}`,
            label: dictionary.home.stats.groupsLabel,
            copy: dictionary.home.stats.groupsCopy,
          },
        ];

  return {
    locale: safeLocale,
    localeInfo: localeMeta[safeLocale],
    meta: dictionary.meta,
    nav: dictionary.nav,
    theme: dictionary.theme,
    localeSwitcher: dictionary.localeSwitcher,
    search: dictionary.search,
    home: {
      ...dictionary.home,
      stats,
      tokens,
      componentSections,
      components,
    },
    componentPage: dictionary.componentPage,
    componentSections,
    components,
    metrics: {
      coreComponentCount,
      componentCount,
      sectionCount: componentSections.length,
    },
  };
}

export function getComponentById(locale: string, componentId: string) {
  return getSiteContent(locale).components.find((component) => component.id === componentId) ?? null;
}

export function getComponentNeighbors(componentId: string) {
  const index = componentOrder.indexOf(componentId);
  return {
    previous: index > 0 ? componentOrder[index - 1] : null,
    next: index >= 0 && index < componentOrder.length - 1 ? componentOrder[index + 1] : null,
  };
}

export { componentCatalog, componentGroups, componentOrder, componentCount, coreComponentCount };
