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
  en: {
    id: "en",
    htmlLang: "en",
    label: "EN",
  },
  "pt-br": {
    id: "pt-br",
    htmlLang: "pt-BR",
    label: "PT-BR",
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
      title: "Retro8 UI",
      description:
        "Documentação da Retro8 UI com catálogo amplo de componentes, navegação por categorias e suporte a tema claro e escuro.",
    },
    nav: {
      topLinks: [
        { label: "Início rápido", to: "getting-started" },
        { label: "Componentes", to: "components" },
        { label: "Tokens", to: "tokens" },
        { label: "Ícones", to: "icons" },
      ],
      homeLabel: "Visão geral",
      guideTitle: "Guia",
      sidebarTitle: "Documentação",
      backToCatalog: "Voltar para o catálogo",
      nextComponent: "Próximo componente",
      previousComponent: "Componente anterior",
    },
    theme: {
      label: "Tema",
      light: "Claro",
      dark: "Escuro",
    },
    localeSwitcher: {
      label: "Idioma",
    },
    search: {
      label: "Buscar componentes",
      placeholder: "Buscar componentes...",
      hint: "Use as setas para navegar e Enter para abrir.",
      empty: "Nenhum componente encontrado.",
      close: "Esc",
    },
    home: {
      heroWindowTitle: "Catálogo retro em escala real",
      heroKicker: `${coreComponentCount} componentes principais + extras da Retro8 UI`,
      heroTitle: "A Retro8 UI agora oferece um catálogo amplo em linguagem visual 8 bits.",
      heroCopy:
        "Retro8 UI é uma biblioteca de interface focada em CSS que pode ser usada em diferentes tecnologias web. A documentação está organizada com componentes por categoria e suporte a tema claro e escuro.",
      heroPrimary: "Explorar catálogo",
      heroSecondary: "Abrir início rápido",
      heroStatus:
        "Cobertura ampla de componentes, mantendo CSS semântico e JS.",
      statsTitle: "Cobertura da biblioteca",
      overviewTitle: "Princípios da UI",
      overviewItems: [
        `A Retro8 UI reúne ${coreComponentCount} componentes principais, além de extras nativos, para cobrir interfaces completas com consistência visual.`,
        "Os componentes compartilham a mesma linguagem visual, com categorias claras e padrões que facilitam combinar diferentes peças na mesma interface.",
        "Elementos mais interativos mantêm a identidade da UI e podem ganhar comportamentos mais avançados quando a experiência pedir.",
      ],
      quickStartTitle: "Instale, importe CSS + JS e use HTML semântico",
      quickStartCopy:
        "O uso continua simples: importe o CSS final, adicione o JS e monte uma marcação curta com classes r8-* previsíveis.",
      quickStartKicker: "Início rápido",
      quickStartCards: [
        {
          title: "Instalação",
          description: "Adicione a biblioteca ao projeto consumidor ou ao espaço de trabalho local.",
          code: `npm install retro8-ui`,
        },
        {
          title: "Importe o CSS",
          description: "O CSS compilado continua sendo a base da biblioteca.",
          code: `import "retro8-ui/retro8.css";`,
        },
        {
          title: "Importe o JS",
          description: "Adicione o JS quando componentes interativos precisarem de comportamento pronto.",
          code: `import "retro8-ui/retro8.js";`,
        },
        {
          title: "Marcação semântica",
          description: "Combine uma classe base com modificadores claros, em vez de classes utilitárias enormes.",
          code: `<button class="r8-btn r8-btn--primary" type="button">
  Iniciar missão
</button>`,
        },
      ],
      frameworkTitle: "Use em diferentes tecnologias",
      frameworkItems: [
        "HTML puro: inclua retro8.css e retro8.js, depois use classes r8-* direto na marcação.",
        "React / Next / Vite: importe retro8-ui/retro8.css e retro8-ui/retro8.js uma vez na aplicação.",
        "Vue / Nuxt: mesmo fluxo, sem encapsulamentos ou adaptadores obrigatórios.",
        "Laravel / Blade: publique ou copie o CSS compilado e o JS para os arquivos estáticos da aplicação.",
      ],
      conventionsTitle: "Convenções da API",
      conventionsItems: [
        "Classes base como r8-btn, r8-card, r8-dialog e r8-table organizam a API pública.",
        "Modificadores seguem o padrão --primary, --danger, --vertical e --dark quando fizer sentido.",
        "Elementos internos usam __header, __body, __footer e nomes parecidos para manter a composição previsível.",
        "Variáveis CSS entram apenas quando agregam valor real, como --r8-progress-value.",
      ],
      tokensTitle: "Tokens que seguram a identidade visual",
      tokensCopy:
        "Cores, espaçamento, bordas, sombras, tipografia e estados de interação usam propriedades customizadas de CSS para manter consistência e facilitar a evolução.",
      tokensKicker: "Base",
      tokensGroupTitles: {
        colors: "Cores semânticas",
        spacing: "Espaçamento",
        borders: "Bordas e sombras",
        typeAndMotion: "Tipografia e interação",
      },
      tokenItemLabels: {
        background: "Fundo",
        surface: "Superfície",
        primary: "Primária",
        secondary: "Secundária",
        tertiary: "Terciária",
        info: "Informação",
        danger: "Perigo",
        success: "Sucesso",
        dark: "Escuro",
        light: "Claro",
        focus: "Foco",
        xs: "XS",
        sm: "SM",
        md: "MD",
        lg: "LG",
        thinBorder: "Borda fina",
        thickBorder: "Borda grossa",
        shadowMd: "Sombra média",
        pressed: "Pressionado",
        display: "Destaque",
        body: "Corpo",
        lift: "Elevação",
        press: "Pressão",
      },
      iconsTitle: "Pacote opcional de ícones",
      iconsCopy:
        "A Retro8 UI não injeta ícones na API principal. A documentação recomenda um pacote separado para manter a biblioteca enxuta e combinável.",
      iconsKicker: "Ecossistema",
      iconsCards: [
        {
          title: "Recomendado: Pixelarticons",
          subtitle: "Melhor combinação com a Retro8 UI",
          body:
            "O projeto oficial oferece centenas de ícones gratuitos em SVG, npm, CDN e webfont. Funciona muito bem com uma biblioteca focada em CSS e sem depender de uma tecnologia específica.",
          ctaLabel: "Abrir site",
          ctaHref: "https://pixelarticons.com/",
          secondaryLabel: "GitHub",
          secondaryHref: "https://github.com/halfmage/pixelarticons",
        },
        {
          title: "Alternativa: HackerNoon Pixel Icon Library",
          subtitle: "Boa opção para quem quer um pacote de ícones pronto",
          body:
            "Tem um conjunto grande de ícones em fonte e SVG. Eu usaria como opção complementar, mantendo a interface principal livre de qualquer pacote de ícones.",
          ctaLabel: "Abrir repositório",
          ctaHref: "https://github.com/hackernoon/pixel-icon-library",
          secondaryLabel: "NPM",
          secondaryHref: "https://www.npmjs.com/package/@hackernoon/pixel-icon-library",
        },
      ],
      componentIndexTitle: "Catálogo completo por grupos",
      componentIndexCopy:
        "O catálogo abaixo organiza a biblioteca em grupos previsíveis e ainda preserva extras próprios da Retro8 UI.",
      componentIndexKicker: "Componentes",
      footerPrimary:
        "A documentação pública agora escala como um site de componentes de verdade, com navegação por grupo, idioma e tema.",
      footerSecondary:
        "A biblioteca continua focada em CSS compilado, JS e classes semânticas. Os extras de documentação, i18n e ícones recomendados continuam desacoplados.",
      stats: {
        coreLabel: "componentes principais",
        coreCopy: "",
        docsLabel: "páginas de componentes",
        docsCopy: "incluindo extras nativos da Retro8 UI",
        groupsLabel: "grupos",
        groupsCopy: "entre Básicos, Formulários, Dados, Feedback e extras",
      },
    },
    componentPage: {
      previewLabel: "Prévia",
      previewStatus: "Prévia ao vivo usando o CSS compilado e o JS da Retro8 UI",
      apiTitle: "API semântica",
      attributesTitle: "Atributos",
      dataAttributesTitle: "Atributos de dados",
      cssVariablesTitle: "Variáveis CSS",
      methodsTitle: "Métodos",
      eventsTitle: "Eventos",
      anatomyTitle: "Estrutura",
      accessibilityTitle: "Acessibilidade",
      tableColumns: {
        name: "Nome",
        type: "Tipo",
        defaultValue: "Padrão",
        description: "Descrição",
        signature: "Assinatura",
        payload: "Carga",
      },
      htmlTitleSuffix: "HTML",
      copyHint: "",
      copyButton: "Copiar",
      copySuccess: "Copiado",
      copyUnavailable: "Área de transferência indisponível",
      dialogTitle: "Diálogo nativo",
      dialogBody:
        "Esta janela existe apenas na documentação para demonstrar o componente Dialog. A biblioteca continua sem JS obrigatório.",
      dialogClose: "Fechar",
      dialogConfirm: "Confirmar",
    },
  },
  en: {
    meta: {
      title: "Retro8 UI",
      description:
        "Retro8 UI documentation with a broad component catalog, category-based navigation, and support for light and dark themes.",
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
      heroKicker: `${coreComponentCount} core components + retro8 extras`,
      heroTitle: "Retro8 UI now ships a broad component catalog in an 8-bit visual language.",
      heroCopy:
        "Retro8 UI is a CSS-focused interface library that works with any framework. The documentation is organized with components grouped by category and support for both light and dark themes.",
      heroPrimary: "Explore catalog",
      heroSecondary: "See quick start",
      heroStatus:
        "Broad component coverage, while keeping semantic CSS and optional runtime behavior.",
      statsTitle: "Library coverage",
      overviewTitle: "UI principles",
      overviewItems: [
        `Retro8 UI brings together ${coreComponentCount} core components, plus native extras, to cover complete interfaces with visual consistency.`,
        "Components share the same visual language, with clear categories and patterns that make different pieces work together naturally across the UI.",
        "More interactive elements keep the same UI identity and can take on richer behavior when the experience calls for it.",
      ],
      quickStartTitle: "Install, import CSS + JS and use semantic HTML",
      quickStartCopy:
        "Consumption still stays simple: import the final CSS, add the JS runtime when interaction is needed and compose short markup with predictable r8-* classes.",
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
          description: "Add the runtime when interactive components need ready-to-use behavior.",
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
        "Retro8 UI does not inject icons into the core API. The docs recommend a separate package to keep the library lean and composable.",
      iconsKicker: "Ecosystem",
      iconsCards: [
        {
          title: "Recommended: Pixelarticons",
          subtitle: "Best fit to pair with Retro8 UI",
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
        "The catalog below organizes the library into predictable groups while preserving Retro8 UI native extras.",
      componentIndexKicker: "Components",
      footerPrimary:
        "The public documentation now scales like a real component site, with grouped navigation, localization and theming.",
      footerSecondary:
        "The library still focuses on compiled CSS, a JS runtime and semantic classes. Docs features, i18n and recommended icons remain decoupled.",
      stats: {
        coreLabel: "core components",
        coreCopy: "",
        docsLabel: "component pages",
        docsCopy: "including Retro8 UI native extras",
        groupsLabel: "groups",
        groupsCopy: "across basics, forms, data, feedback and extras",
      },
    },
    componentPage: {
      previewLabel: "Preview",
      previewStatus: "Live preview using the compiled Retro8 UI CSS and optional runtime",
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
      copyHint: "",
      copyButton: "Copy",
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

export function getSiteContent(locale = "en") {
  const safeLocale = isDocsLocale(locale) ? locale : "en";
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
