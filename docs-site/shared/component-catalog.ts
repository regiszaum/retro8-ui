export const localeIds = ["pt-br", "en"] as const;

export type DocsLocale = (typeof localeIds)[number];

export type LocalizedString = Record<DocsLocale, string>;
export type LocalizedList = Record<DocsLocale, string[]>;

const l = (ptBr: string, en: string): LocalizedString => ({ "pt-br": ptBr, en });
const ll = (ptBr: string[], en: string[]): LocalizedList => ({ "pt-br": ptBr, en });

export const componentGroups = [
  {
    id: "basic",
    core: true,
    title: l("Basic", "Basic"),
    description: l(
      "Primitivos visuais, layout e blocos semanticos para montar interfaces retro com consistencia.",
      "Visual primitives, layout helpers and semantic building blocks for consistent retro interfaces.",
    ),
  },
  {
    id: "configuration",
    core: true,
    title: l("Configuration", "Configuration"),
    description: l(
      "Camada de configuration visual para trocar contexto, skin ou theme local sem mudar a API publica.",
      "Visual configuration layer for swapping local context, skins or themes without changing the public API.",
    ),
  },
  {
    id: "form",
    core: true,
    title: l("Form", "Form"),
    description: l(
      "Campos, seletores e shells de entrada de dados pensados para HTML nativo e integracao sem runtime obrigatorio.",
      "Fields, selectors and data-entry shells designed for native HTML and runtime-free integration.",
    ),
  },
  {
    id: "data",
    core: true,
    title: l("Data", "Data"),
    description: l(
      "Componentes de leitura, visualizacao e estrutura para dashboards, listas, tabelas e estados de conteudo.",
      "Reading, visualization and structure components for dashboards, lists, tables and content states.",
    ),
  },
  {
    id: "navigation",
    core: true,
    title: l("Navigation", "Navigation"),
    description: l(
      "Padroes de deslocamento, orientacao e fluxo entre areas da interface com personalidade retro.",
      "Movement, orientation and flow patterns between interface areas with a retro personality.",
    ),
  },
  {
    id: "feedback",
    core: true,
    title: l("Feedback", "Feedback"),
    description: l(
      "Superficies visuais para alertas, overlays e estados temporarios que o app hospedeiro pode controlar.",
      "Visual surfaces for alerts, overlays and temporary states that the host app can control.",
    ),
  },
  {
    id: "others",
    core: true,
    title: l("Others", "Others"),
    description: l(
      "Pecas auxiliares que aparecem com frequencia em interfaces reais, como separadores e watermark.",
      "Utility pieces that show up often in real interfaces, such as dividers and watermarks.",
    ),
  },
  {
    id: "retro-extras",
    core: false,
    title: l("retro8 extras", "retro8 extras"),
    description: l(
      "Componentes nativos da retro8-ui que vao alem da paridade com o catalogo do Element Plus.",
      "retro8-ui native components that go beyond parity with the Element Plus catalog.",
    ),
  },
] as const;

export type ComponentGroupId = (typeof componentGroups)[number]["id"];

export type CatalogApiEntry = {
  name: string;
  description: LocalizedString;
};

export type CatalogEntry = {
  id: string;
  name: string;
  group: ComponentGroupId;
  core?: boolean;
  summary: LocalizedString;
  classes: string[];
  preview: string;
  code?: string;
  anatomy?: LocalizedList;
  accessibility?: LocalizedList;
  api?: CatalogApiEntry[];
};

const basicComponents = [
  {
    id: "button",
    name: "Button",
    group: "basic",
    summary: l(
      "Botao de acao com hover e active em pixel shift, ideal para CTAs e controles de interface.",
      "Action button with pixel-shift hover and active states, ideal for CTAs and interface controls.",
    ),
    classes: [
      "r8-btn",
      "r8-btn--primary",
      "r8-btn--secondary",
      "r8-btn--tertiary",
      "r8-btn--success",
      "r8-btn--info",
      "r8-btn--danger",
      "r8-btn--dark",
      "r8-btn--light",
      "r8-btn--ghost",
      "r8-btn--sm",
      "r8-btn--lg",
      "r8-btn--block",
      "r8-btn__icon",
      "r8-btn__spinner",
      "is-loading",
    ],
    preview: `<div class="docs-demo__stack">
  <div class="r8-cluster">
    <button class="r8-btn" type="button">Default</button>
    <button class="r8-btn r8-btn--primary" type="button">Primary</button>
    <button class="r8-btn r8-btn--secondary" type="button">Secondary</button>
    <button class="r8-btn r8-btn--tertiary" type="button">Tertiary</button>
  </div>
  <div class="r8-cluster">
    <button class="r8-btn r8-btn--success" type="button">Success</button>
    <button class="r8-btn r8-btn--info" type="button">Info</button>
    <button class="r8-btn r8-btn--danger" type="button">Danger</button>
    <button class="r8-btn r8-btn--dark" type="button">Dark</button>
  </div>
  <div class="r8-cluster">
    <button class="r8-btn r8-btn--light" type="button">Light</button>
    <button class="r8-btn r8-btn--ghost" type="button">Ghost</button>
    <button class="r8-btn r8-btn--sm" type="button">Small</button>
    <button class="r8-btn r8-btn--lg" type="button">Large</button>
    <button class="r8-btn" type="button" disabled>Disabled</button>
  </div>
  <div class="r8-cluster">
    <button class="r8-btn" type="button" data-r8-variant="primary">Data variant</button>
    <button class="r8-btn" type="button" data-r8-variant="danger" data-r8-size="lg">Boss alert</button>
    <button class="r8-btn" type="button" data-r8-variant="secondary" data-r8-loading="true">Saving</button>
  </div>
  <button class="r8-btn" type="button" data-r8-variant="dark" data-r8-block="true">Full width action</button>
</div>`,
    code: `<div class="docs-demo__stack">
  <div class="r8-cluster">
    <button class="r8-btn r8-btn--primary" type="button">Primary</button>
    <button class="r8-btn r8-btn--ghost" type="button">Ghost</button>
    <button class="r8-btn r8-btn--sm" type="button">Small</button>
    <button class="r8-btn r8-btn--lg" type="button">Large</button>
  </div>

  <div class="r8-cluster">
    <button class="r8-btn" type="button" data-r8-variant="primary">Data variant</button>
    <button class="r8-btn" type="button" data-r8-variant="danger" data-r8-size="lg">Boss alert</button>
    <button class="r8-btn" type="button" data-r8-variant="secondary" data-r8-loading="true">Saving</button>
  </div>

  <button class="r8-btn" type="button" data-r8-variant="dark" data-r8-block="true">
    Full width action
  </button>
</div>`,
  },
  {
    id: "border",
    name: "Border",
    group: "basic",
    summary: l(
      "Mostra combinacoes de borda dura e sombra seca para definir a textura visual do sistema.",
      "Showcases hard-edge border and hard-shadow combinations that define the system texture.",
    ),
    classes: ["r8-border-showcase", "r8-border-sample", "r8-border-sample--thin", "r8-border-sample--ghost"],
    preview: `<div class="r8-border-showcase">
  <div class="r8-border-sample">Thick retro border</div>
  <div class="r8-border-sample r8-border-sample--thin">Thin border</div>
  <div class="r8-border-sample r8-border-sample--ghost">Ghost border</div>
</div>`,
  },
  {
    id: "color",
    name: "Color",
    group: "basic",
    summary: l(
      "Apresenta a paleta limitada da biblioteca, com contraste alto e leitura rapida.",
      "Presents the library limited palette with strong contrast and quick readability.",
    ),
    classes: ["r8-color-grid", "r8-color-card", "r8-color-card__swatch", "r8-color-card__meta"],
    preview: `<div class="r8-color-grid">
  <div class="r8-color-card">
    <div class="r8-color-card__swatch" style="background:#0f172a;"></div>
    <div class="r8-color-card__meta">
      <strong>Background</strong>
      <span>#0f172a</span>
    </div>
  </div>
  <div class="r8-color-card">
    <div class="r8-color-card__swatch" style="background:#2563eb;"></div>
    <div class="r8-color-card__meta">
      <strong>Primary</strong>
      <span>#2563eb</span>
    </div>
  </div>
  <div class="r8-color-card">
    <div class="r8-color-card__swatch" style="background:#64748b;"></div>
    <div class="r8-color-card__meta">
      <strong>Secondary</strong>
      <span>#64748b</span>
    </div>
  </div>
  <div class="r8-color-card">
    <div class="r8-color-card__swatch" style="background:#16a34a;"></div>
    <div class="r8-color-card__meta">
      <strong>Success</strong>
      <span>#16a34a</span>
    </div>
  </div>
  <div class="r8-color-card">
    <div class="r8-color-card__swatch" style="background:#dc2626;"></div>
    <div class="r8-color-card__meta">
      <strong>Danger</strong>
      <span>#dc2626</span>
    </div>
  </div>
  <div class="r8-color-card">
    <div class="r8-color-card__swatch" style="background:#7c3aed;"></div>
    <div class="r8-color-card__meta">
      <strong>Tertiary</strong>
      <span>#7c3aed</span>
    </div>
  </div>
</div>`,
  },
  {
    id: "layout-container",
    name: "Layout Container",
    group: "basic",
    summary: l(
      "Estrutura completa com header, aside, main e footer para shells de app e dashboards.",
      "Complete shell with header, aside, main and footer for app shells and dashboards.",
    ),
    classes: ["r8-container", "r8-container__header", "r8-container__aside", "r8-container__main", "r8-container__footer"],
    preview: `<div class="r8-container">
  <header class="r8-container__header">Header</header>
  <aside class="r8-container__aside">Aside</aside>
  <main class="r8-container__main">Main content</main>
  <footer class="r8-container__footer">Footer</footer>
</div>`,
  },
  {
    id: "icon",
    name: "Icon",
    group: "basic",
    summary: l(
      "Grade de placeholders para combinar a UI com um pacote de icones pixelados externo.",
      "Placeholder grid for pairing the UI with an external pixel-art icon pack.",
    ),
    classes: ["r8-icon-grid", "r8-icon-tile", "r8-icon-tile__glyph", "r8-icon-tile__label"],
    preview: `<div class="r8-icon-grid">
  <div class="r8-icon-tile">
    <span class="r8-icon-tile__glyph">HP</span>
    <span class="r8-icon-tile__label">Health</span>
  </div>
  <div class="r8-icon-tile">
    <span class="r8-icon-tile__glyph">XP</span>
    <span class="r8-icon-tile__label">Experience</span>
  </div>
  <div class="r8-icon-tile">
    <span class="r8-icon-tile__glyph">LV</span>
    <span class="r8-icon-tile__label">Level</span>
  </div>
</div>`,
  },
  {
    id: "layout",
    name: "Layout",
    group: "basic",
    summary: l(
      "Grid semantico de 12 colunas para compor paginas, paines e dashboards em retro pixel art.",
      "Semantic 12-column grid for composing pages, panels and dashboards in retro pixel art.",
    ),
    classes: [
      "r8-layout",
      "r8-layout__cell",
      "r8-layout__cell--span-3",
      "r8-layout__cell--span-4",
      "r8-layout__cell--span-6",
      "r8-layout__cell--span-8",
      "r8-layout__cell--span-12",
    ],
    preview: `<div class="r8-layout">
  <div class="r8-layout__cell r8-layout__cell--span-4">4 cols</div>
  <div class="r8-layout__cell r8-layout__cell--span-8">8 cols</div>
  <div class="r8-layout__cell r8-layout__cell--span-3">3 cols</div>
  <div class="r8-layout__cell r8-layout__cell--span-3">3 cols</div>
  <div class="r8-layout__cell r8-layout__cell--span-6">6 cols</div>
</div>`,
  },
  {
    id: "link",
    name: "Link",
    group: "basic",
    summary: l(
      "Link textual curto com foco visivel e microdeslocamento ao passar o mouse.",
      "Compact text link with visible focus and a tiny hover shift.",
    ),
    classes: ["r8-link"],
    preview: `<div class="r8-cluster">
  <a class="r8-link" href="#0">Read docs</a>
  <a class="r8-link" href="#0">Install package</a>
  <a class="r8-link" href="#0" aria-disabled="true">Disabled state</a>
</div>`,
  },
  {
    id: "text",
    name: "Text",
    group: "basic",
    summary: l(
      "Texto de apoio com variantes semanticas para enfase, sucesso, perigo e estados suaves.",
      "Supporting text with semantic variants for emphasis, success, danger and muted states.",
    ),
    classes: [
      "r8-text",
      "r8-text--muted",
      "r8-text--primary",
      "r8-text--secondary",
      "r8-text--tertiary",
      "r8-text--success",
      "r8-text--info",
      "r8-text--danger",
    ],
    preview: `<div class="docs-demo__stack">
  <p class="r8-text">Default body text for mission logs and dense UI labels.</p>
  <p class="r8-text r8-text--muted">Muted helper copy for secondary details.</p>
  <p class="r8-text r8-text--primary">Primary text to highlight key information.</p>
  <p class="r8-text r8-text--secondary">Secondary text for supportive hierarchy.</p>
  <p class="r8-text r8-text--tertiary">Tertiary text for premium or elevated states.</p>
  <p class="r8-text r8-text--success">Success text for positive states.</p>
  <p class="r8-text r8-text--info">Info text for contextual guidance.</p>
  <p class="r8-text r8-text--danger">Danger text for critical states.</p>
</div>`,
  },
  {
    id: "scrollbar",
    name: "Scrollbar",
    group: "basic",
    summary: l(
      "Container rolavel com trilha estilizada em 8-bit para listas, logs e areas de overflow.",
      "Scrollable container with an 8-bit styled track for lists, logs and overflow areas.",
    ),
    classes: ["r8-scrollbar"],
    preview: `<div class="r8-scrollbar">
  <div class="r8-stack">
    <p>Mission log 01</p>
    <p>Mission log 02</p>
    <p>Mission log 03</p>
    <p>Mission log 04</p>
    <p>Mission log 05</p>
    <p>Mission log 06</p>
    <p>Mission log 07</p>
    <p>Mission log 08</p>
  </div>
</div>`,
  },
  {
    id: "space",
    name: "Space",
    group: "basic",
    summary: l(
      "Agrupador leve para espaciar itens inline ou em coluna sem escrever utilitarios no HTML consumidor.",
      "Lightweight wrapper for spacing inline or vertical items without exposing utility-heavy markup.",
    ),
    classes: ["r8-space", "r8-space--vertical", "r8-space--lg"],
    preview: `<div class="docs-demo__stack">
  <div class="r8-space">
    <span class="r8-badge">Alpha</span>
    <span class="r8-badge r8-badge--primary">Beta</span>
    <span class="r8-badge r8-badge--success">Gamma</span>
  </div>
  <div class="r8-space r8-space--vertical r8-space--lg">
    <span class="r8-badge">Vertical</span>
    <span class="r8-badge r8-badge--warning">Large gap</span>
  </div>
</div>`,
  },
  {
    id: "splitter",
    name: "Splitter",
    group: "basic",
    summary: l(
      "Shell visual para layouts redimensionaveis com handle pixelado horizontal ou vertical.",
      "Visual shell for resizable layouts with a pixelated horizontal or vertical handle.",
    ),
    classes: ["r8-splitter", "r8-splitter--vertical", "r8-splitter__pane", "r8-splitter__handle"],
    preview: `<div class="docs-demo__stack">
  <div class="r8-splitter" data-r8-splitter-position="42">
    <div class="r8-splitter__pane">Navigator pane</div>
    <div class="r8-splitter__handle" aria-label="Resize horizontal panes"></div>
    <div class="r8-splitter__pane">Viewport pane</div>
  </div>
  <div class="r8-splitter r8-splitter--vertical" data-r8-splitter-position="58">
    <div class="r8-splitter__pane">Inspector pane</div>
    <div class="r8-splitter__handle" aria-label="Resize vertical panes"></div>
    <div class="r8-splitter__pane">Console pane</div>
  </div>
</div>`,
  },
  {
    id: "typography",
    name: "Typography",
    group: "basic",
    summary: l(
      "Escala tipografica base para docs, paines e texto corrido mantendo o contraste retro da marca.",
      "Base typographic scale for docs, panels and body copy while preserving the retro brand feel.",
    ),
    classes: ["r8-typography"],
    preview: `<div class="r8-typography">
  <h1>Retro heading</h1>
  <p>Build framework-agnostic UI with compiled CSS and semantic classes.</p>
  <ul>
    <li>Consistent tokens</li>
    <li>Strong hierarchy</li>
    <li>Readable body copy</li>
  </ul>
</div>`,
  },
] satisfies CatalogEntry[];

const configurationComponents = [
  {
    id: "config-provider",
    name: "Config Provider",
    group: "configuration",
    summary: l(
      "Theme scope local para trocar tokens, contraste e skin apenas em uma parte da interface.",
      "Local theme scope for swapping tokens, contrast and skins in only one part of the interface.",
    ),
    classes: [
      "r8-config-provider",
      "r8-config-provider--night",
      "r8-config-provider--terminal",
      "r8-config-provider--danger",
    ],
    preview: `<div class="docs-demo__stack">
  <section class="r8-config-provider">
    <span class="r8-badge r8-badge--primary">Default scope</span>
    <input class="r8-input" type="text" value="Mission briefing" aria-label="Default scope input" />
    <div class="r8-cluster">
      <button class="r8-btn r8-btn--primary" type="button">Launch</button>
      <button class="r8-btn r8-btn--secondary" type="button">Review</button>
    </div>
  </section>
  <section class="r8-config-provider r8-config-provider--night">
    <span class="r8-badge">Night skin</span>
    <input class="r8-input" type="text" value="Night console" aria-label="Night scope input" />
    <div class="r8-cluster">
      <button class="r8-btn r8-btn--primary" type="button">Open console</button>
      <button class="r8-btn" type="button">Ping</button>
    </div>
  </section>
  <section class="r8-config-provider r8-config-provider--terminal">
    <span class="r8-badge r8-badge--primary">Terminal skin</span>
    <input class="r8-input" type="text" value="grep --color retro8" aria-label="Terminal scope input" />
    <div class="r8-cluster">
      <button class="r8-btn r8-btn--primary" type="button">Run</button>
      <button class="r8-btn r8-btn--secondary" type="button">Inspect</button>
    </div>
  </section>
  <section class="r8-config-provider r8-config-provider--danger">
    <span class="r8-badge r8-badge--danger">Danger zone</span>
    <input class="r8-input" type="text" value="Confirm shutdown" aria-label="Danger scope input" />
    <div class="r8-cluster">
      <button class="r8-btn r8-btn--danger" type="button">Shutdown</button>
      <button class="r8-btn r8-btn--light" type="button">Cancel</button>
    </div>
  </section>
</div>`,
  },
] satisfies CatalogEntry[];

const formComponents = [
  {
    id: "autocomplete",
    name: "Autocomplete",
    group: "form",
    summary: l(
      "Campo com trigger e lista de sugestoes para busca rapida e escolha guiada.",
      "Field with a trigger and suggestion list for quick search and guided selection.",
    ),
    classes: ["r8-autocomplete", "r8-autocomplete__trigger", "r8-autocomplete__input", "r8-autocomplete__menu", "r8-autocomplete__option"],
    preview: `<div class="r8-autocomplete">
  <div class="r8-autocomplete__trigger">
    <input
      class="r8-autocomplete__input"
      type="text"
      placeholder="Search pilot..."
      aria-label="Search pilot"
    />
    <span class="r8-badge" data-r8-autocomplete-count>4</span>
  </div>
  <div class="r8-autocomplete__menu" hidden>
    <div class="r8-autocomplete__option" data-r8-search="pix-07 vanguard scout recon">
      PIX-07 Vanguard
    </div>
    <div class="r8-autocomplete__option" data-r8-search="pix-11 sentinel support command">
      PIX-11 Sentinel
    </div>
    <div class="r8-autocomplete__option" data-r8-search="pix-12 striker assault frontline">
      PIX-12 Striker
    </div>
    <div class="r8-autocomplete__option" data-r8-search="pix-21 oracle analyst intel">
      PIX-21 Oracle
    </div>
  </div>
</div>`,
  },
  {
    id: "cascader",
    name: "Cascader",
    group: "form",
    summary: l(
      "Selecao hierarquica para arvore de categorias, areas ou taxonomias em varias etapas.",
      "Hierarchical selection for category trees, areas or taxonomies across multiple steps.",
    ),
    classes: ["r8-cascader", "r8-cascader__trigger", "r8-cascader__panel", "r8-cascader__trail", "r8-cascader__option"],
    preview: `<div class="r8-cascader">
  <div class="r8-cascader__trigger">
    <span data-r8-choice-display>World / Sector / Base</span>
    <span>&gt;</span>
  </div>
  <div class="r8-cascader__panel">
    <div class="r8-cascader__trail">
      <div class="r8-cascader__option">World 01</div>
      <div class="r8-cascader__option">Sector 04</div>
      <div class="r8-cascader__option">Base Delta</div>
    </div>
  </div>
</div>`,
  },
  {
    id: "checkbox",
    name: "Checkbox",
    group: "form",
    summary: l(
      "Controle binario para multiplas selecoes com caixa retro e feedback visual imediato.",
      "Binary control for multiple selections with a retro box and immediate visual feedback.",
    ),
    classes: ["r8-checkbox", "r8-checkbox__box"],
    preview: `<div class="r8-space r8-space--vertical">
  <label class="r8-checkbox is-checked">
    <span class="r8-checkbox__box" aria-hidden="true"></span>
    <span>Enable scanlines</span>
  </label>
  <label class="r8-checkbox">
    <span class="r8-checkbox__box" aria-hidden="true"></span>
    <span>Mute sound effects</span>
  </label>
</div>`,
  },
  {
    id: "color-picker-panel",
    name: "Color Picker Panel",
    group: "form",
    summary: l(
      "Painel puro de selecao de cor para embutir em dropdowns, drawers ou settings pages.",
      "Standalone color selection panel ready to embed in dropdowns, drawers or settings pages.",
    ),
    classes: ["r8-color-picker-panel", "r8-color-picker__swatches", "r8-color-picker__swatch"],
    preview: `<div class="r8-color-picker-panel">
  <div class="r8-color-picker__swatches">
    <div class="r8-color-picker__swatch is-selected" data-r8-value="#2563eb" style="background:#2563eb;"></div>
    <div class="r8-color-picker__swatch" data-r8-value="#64748b" style="background:#64748b;"></div>
    <div class="r8-color-picker__swatch" data-r8-value="#7c3aed" style="background:#7c3aed;"></div>
    <div class="r8-color-picker__swatch" data-r8-value="#16a34a" style="background:#16a34a;"></div>
    <div class="r8-color-picker__swatch" data-r8-value="#0891b2" style="background:#0891b2;"></div>
    <div class="r8-color-picker__swatch" data-r8-value="#dc2626" style="background:#dc2626;"></div>
  </div>
</div>`,
  },
  {
    id: "color-picker",
    name: "Color Picker",
    group: "form",
    summary: l(
      "Trigger visual de cor com painel acoplado para themes, avatar accents e customizacao de UI.",
      "Color trigger with an attached panel for themes, avatar accents and UI customization.",
    ),
    classes: ["r8-color-picker", "r8-color-picker__trigger", "r8-color-picker__panel", "r8-color-picker__swatches", "r8-color-picker__swatch"],
    preview: `<div class="r8-color-picker">
  <div class="r8-color-picker__trigger">
    <span>Primary color</span>
    <span class="r8-badge r8-badge--primary" data-r8-choice-display>#2563eb</span>
  </div>
  <div class="r8-color-picker__panel">
    <div class="r8-color-picker__swatches">
      <div class="r8-color-picker__swatch is-selected" data-r8-value="#2563eb" style="background:#2563eb;"></div>
      <div class="r8-color-picker__swatch" data-r8-value="#64748b" style="background:#64748b;"></div>
      <div class="r8-color-picker__swatch" data-r8-value="#7c3aed" style="background:#7c3aed;"></div>
      <div class="r8-color-picker__swatch" data-r8-value="#16a34a" style="background:#16a34a;"></div>
      <div class="r8-color-picker__swatch" data-r8-value="#0891b2" style="background:#0891b2;"></div>
      <div class="r8-color-picker__swatch" data-r8-value="#dc2626" style="background:#dc2626;"></div>
    </div>
  </div>
</div>`,
  },
  {
    id: "date-picker-panel",
    name: "Date Picker Panel",
    group: "form",
    summary: l(
      "Grade de calendario reutilizavel para composicoes inline ou paines persistentes.",
      "Reusable calendar grid for inline compositions or persistent panels.",
    ),
    classes: [
      "r8-date-picker-panel",
      "r8-date-picker__calendar",
      "r8-date-picker__header",
      "r8-date-picker__nav",
      "r8-date-picker__title",
      "r8-date-picker__weekdays",
      "r8-date-picker__weekday",
      "r8-date-picker__grid",
      "r8-date-picker__day",
      "r8-date-picker__footer",
      "r8-date-picker__action",
    ],
    preview: `<div
  class="r8-date-picker-panel"
  data-r8-value="2026-03-28"
  data-r8-month="2026-03"
  data-r8-min="2026-03-05"
  data-r8-max="2026-04-18"
></div>`,
  },
  {
    id: "date-picker",
    name: "Date Picker",
    group: "form",
    summary: l(
      "Campo de data com trigger e painel retro para agendas, filtros e programacao.",
      "Date field with a retro trigger and panel for schedules, filters and planning.",
    ),
    classes: [
      "r8-date-picker",
      "r8-date-picker__trigger",
      "r8-date-picker__panel",
      "r8-date-picker__calendar",
      "r8-date-picker__header",
      "r8-date-picker__grid",
      "r8-date-picker__day",
      "r8-date-picker__footer",
    ],
    preview: `<div
  class="r8-date-picker"
  data-r8-value="2026-03-28"
  data-r8-month="2026-03"
  data-r8-placeholder="Select launch date"
  data-r8-min="2026-03-05"
  data-r8-max="2026-04-18"
>
  <button class="r8-date-picker__trigger" type="button">
    <span data-r8-choice-display>Select launch date</span>
    <span class="r8-badge r8-badge--info">UTC-3</span>
  </button>
  <div class="r8-date-picker__panel"></div>
</div>`,
  },
  {
    id: "datetime-picker",
    name: "DateTime Picker",
    group: "form",
    summary: l(
      "Composicao de data e hora para eventos, logs e jobs com precisao temporal.",
      "Date and time composition for events, logs and jobs with time precision.",
    ),
    classes: [
      "r8-datetime-picker",
      "r8-datetime-picker__trigger",
      "r8-datetime-picker__panel",
      "r8-datetime-picker__layout",
      "r8-date-picker__calendar",
      "r8-date-picker__grid",
      "r8-date-picker__day",
      "r8-time-picker__column",
      "r8-time-picker__heading",
      "r8-time-picker__slots",
      "r8-time-picker__slot",
    ],
    preview: `<div
  class="r8-datetime-picker"
  data-r8-value="2026-03-28T08:30"
  data-r8-month="2026-03"
  data-r8-time-step="30"
  data-r8-placeholder="Select maintenance window"
  data-r8-min="2026-03-15T08:00"
  data-r8-max="2026-04-18T22:00"
>
  <button class="r8-datetime-picker__trigger" type="button">
    <span data-r8-choice-display>Select maintenance window</span>
    <span class="r8-badge r8-badge--success">Local</span>
  </button>
  <div class="r8-datetime-picker__panel"></div>
</div>`,
  },
  {
    id: "form",
    name: "Form",
    group: "form",
    summary: l(
      "Estrutura de formulario com linhas, itens, legenda e area de acoes para inputs semanticos.",
      "Form structure with rows, items, legends and an actions area for semantic inputs.",
    ),
    classes: ["r8-form", "r8-form__row", "r8-form__item", "r8-form__label", "r8-form__help", "r8-form__actions"],
    preview: `<form class="r8-form">
  <div class="r8-form__row">
    <label class="r8-form__item">
      <span class="r8-form__label">Pilot</span>
      <input class="r8-input" type="text" value="PIX-07" />
      <span class="r8-form__help">Use a short codename.</span>
    </label>
    <label class="r8-form__item">
      <span class="r8-form__label">Role</span>
      <select class="r8-input">
        <option>Engineer</option>
      </select>
    </label>
  </div>
  <div class="r8-form__actions">
    <button class="r8-btn r8-btn--primary" type="button">Save</button>
    <button class="r8-btn r8-btn--ghost" type="button">Cancel</button>
  </div>
</form>`,
  },
  {
    id: "input",
    name: "Input",
    group: "form",
    summary: l(
      "Campo base para texto, select e textarea com foco visivel e sombra interna retro.",
      "Base field for text, select and textarea with visible focus and an inset retro shadow.",
    ),
    classes: ["r8-field", "r8-field--inline", "r8-label", "r8-help", "r8-input", "r8-input--invalid"],
    preview: `<div class="docs-demo__stack">
  <label class="r8-field">
    <span class="r8-label">Pilot name</span>
    <input class="r8-input" type="text" placeholder="PIX-07" />
    <span class="r8-help">Use a short readable alias.</span>
  </label>
  <label class="r8-field">
    <span class="r8-label">Notes</span>
    <textarea class="r8-input" placeholder="No anomalies detected."></textarea>
  </label>
</div>`,
  },
  {
    id: "input-number",
    name: "Input Number",
    group: "form",
    summary: l(
      "Controle numerico com botoes laterais e area central para contagens e quantidades.",
      "Numeric control with side buttons and a central field for counts and quantities.",
    ),
    classes: ["r8-input-number", "r8-input-number__button", "r8-input-number__input"],
    preview: `<div class="r8-input-number">
  <button class="r8-input-number__button" type="button">-</button>
  <input class="r8-input-number__input" type="number" value="8" />
  <button class="r8-input-number__button" type="button">+</button>
</div>`,
  },
  {
    id: "input-tag",
    name: "Input Tag",
    group: "form",
    summary: l(
      "Campo de tags para labels, filtros e chips curtos com remocao inline.",
      "Tag entry field for labels, filters and short chips with inline removal.",
    ),
    classes: ["r8-input-tag", "r8-input-tag__tag", "r8-input-tag__remove", "r8-input-tag__input"],
    preview: `<div class="r8-input-tag">
  <span class="r8-input-tag__tag">HUD <span class="r8-input-tag__remove">x</span></span>
  <span class="r8-input-tag__tag">PIXEL <span class="r8-input-tag__remove">x</span></span>
  <input class="r8-input-tag__input" type="text" value="add-tag" />
</div>`,
  },
  {
    id: "mention",
    name: "Mention",
    group: "form",
    summary: l(
      "Campo para referenciar usuarios ou entidades com token visual e lista de sugestoes.",
      "Field for referencing users or entities with a visual token and suggestion list.",
    ),
    classes: ["r8-mention", "r8-mention__trigger", "r8-mention__token", "r8-mention__menu", "r8-mention__option"],
    preview: `<div class="r8-mention">
  <div class="r8-mention__trigger">
    <span class="r8-mention__token">@captain</span>
    <span> please review this mission log</span>
  </div>
  <div class="r8-mention__menu">
    <div class="r8-mention__option">@captain</div>
    <div class="r8-mention__option">@engineer</div>
    <div class="r8-mention__option">@medic</div>
  </div>
</div>`,
  },
  {
    id: "radio",
    name: "Radio",
    group: "form",
    summary: l(
      "Escolha unica com circulo pixelado e leitura clara de estado ativo.",
      "Single-choice control with a pixelated circle and a clear active state.",
    ),
    classes: ["r8-radio", "r8-radio__box"],
    preview: `<div class="r8-space r8-space--vertical">
  <label class="r8-radio is-checked">
    <span class="r8-radio__box" aria-hidden="true"></span>
    <span>Online mode</span>
  </label>
  <label class="r8-radio">
    <span class="r8-radio__box" aria-hidden="true"></span>
    <span>Offline mode</span>
  </label>
</div>`,
  },
  {
    id: "rate",
    name: "Rate",
    group: "form",
    summary: l(
      "Escala curta de avaliacao para feedback, ranking ou preferencia visual.",
      "Short rating scale for feedback, ranking or visual preference.",
    ),
    classes: ["r8-rate", "r8-rate__item"],
    preview: `<div class="r8-rate">
  <span class="r8-rate__item is-active">*</span>
  <span class="r8-rate__item is-active">*</span>
  <span class="r8-rate__item is-active">*</span>
  <span class="r8-rate__item">*</span>
  <span class="r8-rate__item">*</span>
</div>`,
  },
  {
    id: "select",
    name: "Select",
    group: "form",
    summary: l(
      "Lista de escolha com trigger compacto e opcoes retro em painel destacado.",
      "Choice list with a compact trigger and retro options inside a highlighted panel.",
    ),
    classes: ["r8-select", "r8-select__trigger", "r8-select__menu", "r8-select__option"],
    preview: `<div class="r8-select">
  <div class="r8-select__trigger">
    <span data-r8-choice-display>Explorer</span>
    <span>&gt;</span>
  </div>
  <div class="r8-select__menu">
    <div class="r8-select__option">Engineer</div>
    <div class="r8-select__option">Medic</div>
    <div class="r8-select__option is-selected">Explorer</div>
  </div>
</div>`,
  },
  {
    id: "virtualized-select",
    name: "Virtualized Select",
    group: "form",
    summary: l(
      "Variacao visual do select para catalogos longos e listas grandes virtualizadas pelo app.",
      "Visual select variant for long catalogs and large lists virtualized by the host app.",
    ),
    classes: ["r8-virtual-select", "r8-virtual-select__trigger", "r8-virtual-select__menu", "r8-virtual-select__option"],
    preview: `<div class="r8-virtual-select">
  <div class="r8-virtual-select__trigger">
    <span data-r8-choice-display>Sector 128 / item 440</span>
    <span class="r8-badge">virtual</span>
  </div>
  <div class="r8-virtual-select__menu">
    <div class="r8-virtual-select__option">Item 438</div>
    <div class="r8-virtual-select__option">Item 439</div>
    <div class="r8-virtual-select__option is-selected">Item 440</div>
  </div>
</div>`,
  },
  {
    id: "slider",
    name: "Slider",
    group: "form",
    summary: l(
      "Controle de faixa com track pixelado, thumb quadrado e valor exposto por CSS custom property.",
      "Range control with a pixelated track, square thumb and a value exposed through a CSS custom property.",
    ),
    classes: ["r8-slider", "r8-slider__track", "r8-slider__fill", "r8-slider__thumb", "--r8-progress-value"],
    preview: `<div class="r8-slider" style="--r8-progress-value: 68%;">
  <div class="r8-slider__track">
    <div class="r8-slider__fill"></div>
    <div class="r8-slider__thumb" aria-hidden="true"></div>
  </div>
  <span class="r8-text r8-text--muted">Volume: 68%</span>
</div>`,
  },
  {
    id: "switch",
    name: "Switch",
    group: "form",
    summary: l(
      "Toggle compacto para ligado e desligado com pista colorida e thumb destacado.",
      "Compact on/off toggle with a colored track and a highlighted thumb.",
    ),
    classes: ["r8-switch", "r8-switch__track", "r8-switch__thumb"],
    preview: `<div class="r8-space r8-space--vertical">
  <label class="r8-switch is-checked">
    <span class="r8-switch__track"><span class="r8-switch__thumb"></span></span>
    <span>Power enabled</span>
  </label>
  <label class="r8-switch">
    <span class="r8-switch__track"><span class="r8-switch__thumb"></span></span>
    <span>Night mode</span>
  </label>
</div>`,
  },
  {
    id: "time-picker",
    name: "Time Picker",
    group: "form",
    summary: l(
      "Selecao de hora com slots destacados para horas e minutos em formato retro.",
      "Time selection with highlighted slots for hours and minutes in a retro format.",
    ),
    classes: ["r8-time-picker", "r8-time-picker__trigger", "r8-time-picker__panel", "r8-time-picker__slots", "r8-time-picker__slot"],
    preview: `<div class="r8-time-picker">
  <div class="r8-time-picker__trigger">
    <span data-r8-choice-display>08:30</span>
    <span class="r8-badge">UTC</span>
  </div>
  <div class="r8-time-picker__panel">
    <div class="r8-time-picker__slots">
      <div class="r8-time-picker__slot">08:00</div>
      <div class="r8-time-picker__slot is-selected">08:30</div>
      <div class="r8-time-picker__slot">09:00</div>
    </div>
  </div>
</div>`,
  },
  {
    id: "time-select",
    name: "Time Select",
    group: "form",
    summary: l(
      "Lista de horarios predefinidos para agendas, turnos e janelas operacionais.",
      "Preset time list for schedules, shifts and operational windows.",
    ),
    classes: ["r8-time-select", "r8-time-select__trigger", "r8-time-select__menu", "r8-time-select__option"],
    preview: `<div class="r8-time-select">
  <div class="r8-time-select__trigger">
    <span data-r8-choice-display>08:30</span>
    <span>&gt;</span>
  </div>
  <div class="r8-time-select__menu">
    <div class="r8-time-select__option">08:00</div>
    <div class="r8-time-select__option is-selected">08:30</div>
    <div class="r8-time-select__option">09:00</div>
  </div>
</div>`,
  },
  {
    id: "transfer",
    name: "Transfer",
    group: "form",
    summary: l(
      "Duas listas lado a lado para mover itens entre grupos com acoes centrais.",
      "Two side-by-side lists for moving items between groups with central actions.",
    ),
    classes: ["r8-transfer", "r8-transfer__panel", "r8-transfer__header", "r8-transfer__item", "r8-transfer__actions"],
    preview: `<div class="r8-transfer">
  <div class="r8-transfer__panel">
    <div class="r8-transfer__header">Available</div>
    <div class="r8-transfer__item">Radar</div>
    <div class="r8-transfer__item">Scanner</div>
  </div>
  <div class="r8-transfer__actions">
    <button class="r8-btn r8-btn--sm" type="button">&gt;</button>
    <button class="r8-btn r8-btn--sm" type="button">&lt;</button>
  </div>
  <div class="r8-transfer__panel">
    <div class="r8-transfer__header">Selected</div>
    <div class="r8-transfer__item">Shield</div>
  </div>
</div>`,
  },
  {
    id: "tree-select",
    name: "TreeSelect",
    group: "form",
    summary: l(
      "Combina trigger de selecao com arvore visual para categorias hierarquicas profundas.",
      "Combines a selection trigger with a visual tree for deeper hierarchical categories.",
    ),
    classes: ["r8-tree-select", "r8-tree-select__trigger", "r8-tree-select__panel", "r8-tree-select__tree", "r8-tree-select__node"],
    preview: `<div class="r8-tree-select">
  <div class="r8-tree-select__trigger">
    <span data-r8-choice-display>UI / Navigation / Menu</span>
    <span class="r8-badge">tree</span>
  </div>
  <div class="r8-tree-select__panel">
    <div class="r8-tree-select__tree">
      <div class="r8-tree-select__node">UI</div>
      <div class="r8-tree-select__node">Navigation</div>
      <div class="r8-tree-select__node is-selected">Menu</div>
    </div>
  </div>
</div>`,
  },
  {
    id: "upload",
    name: "Upload",
    group: "form",
    summary: l(
      "Area de dropzone e lista de arquivos para fluxos de envio controlados pelo host app.",
      "Dropzone area and file list for upload flows controlled by the host app.",
    ),
    classes: ["r8-upload", "r8-upload__dropzone", "r8-upload__list", "r8-upload__file"],
    preview: `<div class="r8-upload">
  <div class="r8-upload__dropzone">Drop files here</div>
  <div class="r8-upload__list">
    <div class="r8-upload__file"><span>retro8.css</span><span>18 KB</span></div>
    <div class="r8-upload__file"><span>sprite-sheet.png</span><span>92 KB</span></div>
  </div>
</div>`,
  },
] satisfies CatalogEntry[];

const dataComponents = [
  {
    id: "avatar",
    name: "Avatar",
    group: "data",
    summary: l(
      "Avatar quadrado e pixelado para perfis, squads e blocos de identidade.",
      "Square pixel-like avatar for profiles, squads and identity blocks.",
    ),
    classes: ["r8-avatar", "r8-avatar--lg"],
    preview: `<div class="r8-cluster">
  <span class="r8-avatar">PX</span>
  <span class="r8-avatar r8-avatar--lg">R8</span>
</div>`,
  },
  {
    id: "badge",
    name: "Badge",
    group: "data",
    summary: l(
      "Rotulo compacto para status, categorias, versoes e metadados curtos.",
      "Compact label for statuses, categories, versions and short metadata.",
    ),
    classes: [
      "r8-badge",
      "r8-badge--primary",
      "r8-badge--secondary",
      "r8-badge--tertiary",
      "r8-badge--success",
      "r8-badge--warning",
      "r8-badge--danger",
      "r8-badge--info",
      "r8-badge--dark",
      "r8-badge--light",
    ],
    preview: `<div class="r8-cluster">
  <span class="r8-badge">default</span>
  <span class="r8-badge r8-badge--primary">new</span>
  <span class="r8-badge r8-badge--secondary">beta</span>
  <span class="r8-badge r8-badge--tertiary">pro</span>
  <span class="r8-badge r8-badge--success">online</span>
  <span class="r8-badge r8-badge--warning">queued</span>
  <span class="r8-badge r8-badge--danger">critical</span>
  <span class="r8-badge r8-badge--info">docs</span>
  <span class="r8-badge r8-badge--dark">night</span>
  <span class="r8-badge r8-badge--light">light</span>
</div>`,
  },
  {
    id: "calendar",
    name: "Calendar",
    group: "data",
    summary: l(
      "Calendario mensal para roadmap, eventos e planejamento visual.",
      "Monthly calendar for roadmaps, events and visual planning.",
    ),
    classes: ["r8-calendar", "r8-calendar__header", "r8-calendar__title", "r8-calendar__grid", "r8-calendar__day"],
    preview: `<div class="r8-calendar">
  <div class="r8-calendar__header">
    <span class="r8-calendar__title">March 2026</span>
    <span class="r8-badge">UTC</span>
  </div>
  <div class="r8-calendar__grid">
    <div class="r8-calendar__day">24</div>
    <div class="r8-calendar__day">25</div>
    <div class="r8-calendar__day">26</div>
    <div class="r8-calendar__day">27</div>
    <div class="r8-calendar__day is-today">28</div>
    <div class="r8-calendar__day">29</div>
    <div class="r8-calendar__day">30</div>
  </div>
</div>`,
  },
  {
    id: "card",
    name: "Card",
    group: "data",
    summary: l(
      "Superficie padrao para blocos de conteudo com header, body e footer previsiveis.",
      "Standard surface for content blocks with predictable header, body and footer areas.",
    ),
    classes: ["r8-card", "r8-card__header", "r8-card__body", "r8-card__footer"],
    preview: `<section class="r8-card">
  <div class="r8-card__header">
    <strong>Mission summary</strong>
  </div>
  <div class="r8-card__body">
    Orbital relay synchronized. Shields at 84%.
  </div>
  <div class="r8-card__footer">
    <button class="r8-btn r8-btn--sm r8-btn--primary" type="button">Review</button>
  </div>
</section>`,
  },
  {
    id: "carousel",
    name: "Carousel",
    group: "data",
    summary: l(
      "Trilho horizontal de slides para banners, destaques e showcases visuais.",
      "Horizontal slide track for banners, highlights and visual showcases.",
    ),
    classes: ["r8-carousel", "r8-carousel__viewport", "r8-carousel__track", "r8-carousel__slide", "r8-carousel__dots", "r8-carousel__dot"],
    preview: `<div class="r8-carousel">
  <div class="r8-carousel__viewport">
    <div class="r8-carousel__track">
      <article class="r8-carousel__slide">Slide 01</article>
      <article class="r8-carousel__slide" hidden>Slide 02</article>
      <article class="r8-carousel__slide" hidden>Slide 03</article>
    </div>
  </div>
  <div class="r8-carousel__dots">
    <span class="r8-carousel__dot is-active"></span>
    <span class="r8-carousel__dot"></span>
    <span class="r8-carousel__dot"></span>
  </div>
</div>`,
  },
  {
    id: "collapse",
    name: "Collapse",
    group: "data",
    summary: l(
      "Acordeao visual para blocos expansivos, FAQs e configuracoes densas.",
      "Visual accordion for expandable blocks, FAQs and dense settings.",
    ),
    classes: ["r8-collapse", "r8-collapse__item", "r8-collapse__header", "r8-collapse__body"],
    preview: `<div class="r8-collapse">
  <section class="r8-collapse__item is-open">
    <div class="r8-collapse__header">
      <strong>Display settings</strong>
      <span>+</span>
    </div>
    <div class="r8-collapse__body">Scanlines, palette and contrast controls.</div>
  </section>
  <section class="r8-collapse__item">
    <div class="r8-collapse__header">
      <strong>Accessibility settings</strong>
      <span>+</span>
    </div>
    <div class="r8-collapse__body" hidden>Focus rings, motion fallback and contrast presets.</div>
  </section>
</div>`,
  },
  {
    id: "descriptions",
    name: "Descriptions",
    group: "data",
    summary: l(
      "Lista label/valor para detalhes de entidade, metadata tecnica e specs de itens.",
      "Label/value list for entity details, technical metadata and item specs.",
    ),
    classes: ["r8-descriptions", "r8-descriptions__label", "r8-descriptions__value"],
    preview: `<div class="r8-descriptions">
  <div class="r8-descriptions__label">Engine</div>
  <div class="r8-descriptions__value">MK-II</div>
  <div class="r8-descriptions__label">Shield</div>
  <div class="r8-descriptions__value">84%</div>
</div>`,
  },
  {
    id: "empty",
    name: "Empty",
    group: "data",
    summary: l(
      "Estado vazio para listas, busca e telas sem conteudo disponivel.",
      "Empty state for lists, search and screens with no available content.",
    ),
    classes: ["r8-empty", "r8-empty__icon", "r8-empty__title"],
    preview: `<div class="r8-empty">
  <div class="r8-empty__icon">NO-DATA</div>
  <div class="r8-empty__title">Nothing here yet</div>
  <p class="r8-text r8-text--muted">Try another filter or create a new record.</p>
</div>`,
  },
  {
    id: "image",
    name: "Image",
    group: "data",
    summary: l(
      "Moldura de imagem com caption curta para assets, covers e thumbnails retro.",
      "Image frame with a short caption for assets, covers and retro thumbnails.",
    ),
    classes: ["r8-image", "r8-image__frame", "r8-image__caption"],
    preview: `<figure class="r8-image">
  <div class="r8-image__frame">PIXEL PREVIEW</div>
  <figcaption class="r8-image__caption">Sprite sheet preview</figcaption>
</figure>`,
  },
  {
    id: "infinite-scroll",
    name: "Infinite Scroll",
    group: "data",
    summary: l(
      "Lista com viewport limitada e sentinela visual para feeds longos ou logs infinitos.",
      "List with a bounded viewport and visual sentinel for long feeds or infinite logs.",
    ),
    classes: ["r8-infinite-scroll", "r8-infinite-scroll__item", "r8-infinite-scroll__sentinel"],
    preview: `<div class="r8-infinite-scroll">
  <div class="r8-infinite-scroll__item">Feed entry 01</div>
  <div class="r8-infinite-scroll__item">Feed entry 02</div>
  <div class="r8-infinite-scroll__item">Feed entry 03</div>
  <div class="r8-infinite-scroll__item">Feed entry 04</div>
  <div class="r8-infinite-scroll__sentinel">Load next chunk</div>
</div>`,
  },
  {
    id: "pagination",
    name: "Pagination",
    group: "data",
    summary: l(
      "Controle de paginas com botoes pixelados e estado ativo facil de escanear.",
      "Paging control with pixelated buttons and an easy-to-scan active state.",
    ),
    classes: ["r8-pagination", "r8-pagination__item", "r8-pagination__more"],
    preview: `<div class="r8-pagination">
  <span class="r8-pagination__item">1</span>
  <span class="r8-pagination__item is-active">2</span>
  <span class="r8-pagination__item">3</span>
  <span class="r8-pagination__more">...</span>
  <span class="r8-pagination__item">9</span>
</div>`,
  },
  {
    id: "progress",
    name: "Progress",
    group: "data",
    summary: l(
      "Barra de progresso com fill retro listrado e valor controlado por custom property ou `data-r8-value`.",
      "Progress bar with a retro striped fill and a value controlled through a custom property or `data-r8-value`.",
    ),
    classes: ["r8-progress", "r8-progress__label", "r8-progress__track", "r8-progress__bar", "--r8-progress-value", "r8-progress--success", "r8-progress--warning", "r8-progress--danger"],
    preview: `<div class="docs-demo__stack">
  <div class="r8-progress" data-r8-value="32">
    <div class="r8-progress__label">
      <span>Upload</span>
      <span>32%</span>
    </div>
    <div class="r8-progress__track">
      <div class="r8-progress__bar"></div>
    </div>
  </div>
  <div class="r8-progress r8-progress--success" data-r8-value="84">
    <div class="r8-progress__label">
      <span>Shield sync</span>
      <span>84%</span>
    </div>
    <div class="r8-progress__track">
      <div class="r8-progress__bar"></div>
    </div>
  </div>
</div>`,
  },
  {
    id: "result",
    name: "Result",
    group: "data",
    summary: l(
      "Estado final de sucesso, aviso ou falha para conclusoes de fluxo e paginas de retorno.",
      "Final success, warning or failure state for flow endings and return pages.",
    ),
    classes: ["r8-result", "r8-result__icon", "r8-result__title"],
    preview: `<div class="r8-result">
  <div class="r8-result__icon">OK</div>
  <div class="r8-result__title">Deploy complete</div>
  <p class="r8-text r8-text--muted">All assets are live and responding.</p>
</div>`,
  },
  {
    id: "skeleton",
    name: "Skeleton",
    group: "data",
    summary: l(
      "Placeholders animados para carregamento de cards, listas e paines de dados.",
      "Animated placeholders for loading cards, lists and data panels.",
    ),
    classes: ["r8-skeleton", "r8-skeleton__block", "r8-skeleton__line"],
    preview: `<div class="r8-skeleton">
  <div class="r8-skeleton__block"></div>
  <div class="r8-skeleton__line"></div>
  <div class="r8-skeleton__line"></div>
</div>`,
  },
  {
    id: "table",
    name: "Table",
    group: "data",
    summary: l(
      "Tabela retro para dados tabulares com header forte e corpo altamente legivel.",
      "Retro table for tabular data with a strong header and highly readable body.",
    ),
    classes: ["r8-table"],
    preview: `<table class="r8-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Status</th>
      <th>Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>PIX-07</td>
      <td>Online</td>
      <td>Engineer</td>
    </tr>
    <tr>
      <td>PIX-11</td>
      <td>Queued</td>
      <td>Medic</td>
    </tr>
  </tbody>
</table>`,
  },
  {
    id: "virtualized-table",
    name: "Virtualized Table",
    group: "data",
    summary: l(
      "Shell visual de tabela para datasets extensos virtualizados pelo framework hospedeiro.",
      "Visual table shell for extensive datasets virtualized by the host framework.",
    ),
    classes: ["r8-virtual-table"],
    preview: `<table class="r8-virtual-table">
  <thead>
    <tr>
      <th>Row</th>
      <th>Chunk</th>
      <th>Latency</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>438</td>
      <td>active</td>
      <td>12ms</td>
    </tr>
    <tr>
      <td>439</td>
      <td>active</td>
      <td>10ms</td>
    </tr>
  </tbody>
</table>`,
  },
  {
    id: "tag",
    name: "Tag",
    group: "data",
    summary: l(
      "Tag compacta para agrupamento visual de estado, categoria e contexto curto.",
      "Compact tag for visually grouping status, category and short context.",
    ),
    classes: ["r8-tag", "r8-tag--success", "r8-tag--danger"],
    preview: `<div class="r8-cluster">
  <span class="r8-tag">default</span>
  <span class="r8-tag r8-tag--success">synced</span>
  <span class="r8-tag r8-tag--danger">error</span>
</div>`,
  },
  {
    id: "timeline",
    name: "Timeline",
    group: "data",
    summary: l(
      "Sequencia vertical de eventos para changelog, deploys e historico de atividade.",
      "Vertical sequence of events for changelogs, deploys and activity history.",
    ),
    classes: ["r8-timeline", "r8-timeline__item", "r8-timeline__dot", "r8-timeline__content"],
    preview: `<div class="r8-timeline">
  <div class="r8-timeline__item">
    <span class="r8-timeline__dot"></span>
    <div class="r8-timeline__content">08:30 - Build finished</div>
  </div>
  <div class="r8-timeline__item">
    <span class="r8-timeline__dot"></span>
    <div class="r8-timeline__content">08:45 - Docs deployed</div>
  </div>
</div>`,
  },
  {
    id: "tour",
    name: "Tour",
    group: "data",
    summary: l(
      "Baloon de onboarding para guiar usuarios por etapas e hotspots importantes.",
      "Onboarding balloon used to guide users through steps and important hotspots.",
    ),
    classes: ["r8-tour"],
    preview: `<div class="r8-tour">
  <strong>Quick tour</strong>
  <p class="r8-text">This panel highlights the next action in the interface.</p>
  <div class="r8-row">
    <button class="r8-btn r8-btn--sm" type="button">Skip</button>
    <button class="r8-btn r8-btn--sm r8-btn--primary" type="button">Next</button>
  </div>
</div>`,
  },
  {
    id: "tree",
    name: "Tree",
    group: "data",
    summary: l(
      "Arvore visual para entidades hierarquicas, arquivos e menus de estrutura profunda.",
      "Visual tree for hierarchical entities, files and deep-structure menus.",
    ),
    classes: ["r8-tree", "r8-tree__node", "r8-tree__node--child"],
    preview: `<div class="r8-tree">
  <div class="r8-tree__node">src</div>
  <div class="r8-tree__node r8-tree__node--child">styles</div>
  <div class="r8-tree__node r8-tree__node--child">components</div>
</div>`,
  },
  {
    id: "virtualized-tree",
    name: "Virtualized Tree",
    group: "data",
    summary: l(
      "Variacao de arvore para estruturas maiores, com renderizacao controlada pela aplicacao hospedeira.",
      "Tree variant for larger structures, with rendering controlled by the host application.",
    ),
    classes: ["r8-virtual-tree", "r8-virtual-tree__node", "r8-virtual-tree__node--child"],
    preview: `<div class="r8-virtual-tree">
  <div class="r8-virtual-tree__node">root / chunk 12</div>
  <div class="r8-virtual-tree__node r8-virtual-tree__node--child">node / 438</div>
  <div class="r8-virtual-tree__node r8-virtual-tree__node--child">node / 439</div>
</div>`,
  },
  {
    id: "statistic",
    name: "Statistic",
    group: "data",
    summary: l(
      "Bloco numerico para KPI, metricas e counters com alto contraste.",
      "Numeric block for KPIs, metrics and counters with high contrast.",
    ),
    classes: ["r8-statistic", "r8-statistic__label", "r8-statistic__value"],
    preview: `<div class="r8-statistic">
  <span class="r8-statistic__label">Active users</span>
  <strong class="r8-statistic__value">1,284</strong>
</div>`,
  },
  {
    id: "segmented",
    name: "Segmented",
    group: "data",
    summary: l(
      "Alternador visual entre modos proximos, filtros rapidos e view presets.",
      "Visual switcher between nearby modes, quick filters and view presets.",
    ),
    classes: ["r8-segmented", "r8-segmented__item"],
    preview: `<div class="r8-segmented">
  <button class="r8-segmented__item is-active" type="button">Day</button>
  <button class="r8-segmented__item" type="button">Week</button>
  <button class="r8-segmented__item" type="button">Month</button>
</div>`,
  },
] satisfies CatalogEntry[];

const navigationComponents = [
  {
    id: "affix",
    name: "Affix",
    group: "navigation",
    summary: l(
      "Wrapper sticky para fixar blocos uteis durante a rolagem, como filtros e acoes.",
      "Sticky wrapper for pinning useful blocks during scroll, such as filters and actions.",
    ),
    classes: ["r8-affix"],
    preview: `<div class="r8-affix">
  <button class="r8-btn r8-btn--primary" type="button">Pinned action</button>
</div>`,
  },
  {
    id: "anchor",
    name: "Anchor",
    group: "navigation",
    summary: l(
      "Indice de links internos para navegar por secao dentro de paginas longas.",
      "Internal link index for moving across sections inside long pages.",
    ),
    classes: ["r8-anchor", "r8-anchor__link"],
    preview: `<nav class="r8-anchor">
  <a class="r8-anchor__link" href="#installation">Installation</a>
  <a class="r8-anchor__link" href="#usage">Usage</a>
  <a class="r8-anchor__link" href="#api">API</a>
</nav>`,
  },
  {
    id: "backtop",
    name: "Backtop",
    group: "navigation",
    summary: l(
      "Botao fixo para voltar ao topo em listas e docs longas.",
      "Fixed button for jumping back to the top on long docs and lists.",
    ),
    classes: ["r8-backtop"],
    preview: `<button class="r8-backtop" style="position: static; right: auto; bottom: auto;" type="button">TOP</button>`,
  },
  {
    id: "breadcrumb",
    name: "Breadcrumb",
    group: "navigation",
    summary: l(
      "Trilha de navegacao para orientacao de caminho e profundidade de pagina.",
      "Navigation trail for path orientation and page depth.",
    ),
    classes: ["r8-breadcrumb", "r8-breadcrumb__item"],
    preview: `<nav class="r8-breadcrumb" aria-label="Breadcrumb">
  <span class="r8-breadcrumb__item">Home</span>
  <span class="r8-breadcrumb__item">Docs</span>
  <span class="r8-breadcrumb__item">Button</span>
</nav>`,
  },
  {
    id: "dropdown",
    name: "Dropdown",
    group: "navigation",
    summary: l(
      "Menu suspenso compacto para acoes, atalhos e opcoes contextuais.",
      "Compact flyout menu for actions, shortcuts and contextual options.",
    ),
    classes: ["r8-dropdown", "r8-dropdown__menu", "r8-dropdown__item"],
    preview: `<div class="r8-dropdown">
  <button class="r8-btn r8-btn--sm" type="button">Open menu</button>
  <div class="r8-dropdown__menu">
    <div class="r8-dropdown__item">Duplicate</div>
    <div class="r8-dropdown__item">Archive</div>
    <div class="r8-dropdown__item">Delete</div>
  </div>
</div>`,
  },
  {
    id: "menu",
    name: "Menu",
    group: "navigation",
    summary: l(
      "Menu primario vertical ou horizontal para apps, sidebars e dashboards.",
      "Primary vertical or horizontal menu for apps, sidebars and dashboards.",
    ),
    classes: ["r8-menu", "r8-menu--horizontal", "r8-menu__item", "r8-menu__submenu"],
    preview: `<ul class="r8-menu r8-menu--horizontal">
  <li class="r8-menu__item is-active">Overview</li>
  <li class="r8-menu__item">Tokens</li>
  <li class="r8-menu__submenu is-open">Components</li>
</ul>`,
  },
  {
    id: "page-header",
    name: "Page Header",
    group: "navigation",
    summary: l(
      "Cabecalho de pagina com titulo, contexto e area superior para acoes ou breadcrumb.",
      "Page-level header with title, context and a top row for actions or breadcrumbs.",
    ),
    classes: ["r8-page-header", "r8-page-header__topline", "r8-page-header__title", "r8-page-header__content"],
    preview: `<section class="r8-page-header">
  <div class="r8-page-header__topline">
    <span class="r8-badge">Docs</span>
    <button class="r8-btn r8-btn--sm" type="button">Edit</button>
  </div>
  <strong class="r8-page-header__title">Component overview</strong>
  <p class="r8-page-header__content">A grouped catalog of the full retro8-ui surface area.</p>
</section>`,
  },
  {
    id: "steps",
    name: "Steps",
    group: "navigation",
    summary: l(
      "Fluxo sequencial em etapas para onboarding, checkout e assistentes.",
      "Sequential flow pattern for onboarding, checkout and wizard-like journeys.",
    ),
    classes: ["r8-steps", "r8-step", "r8-step__index", "r8-step__body", "r8-step__title"],
    preview: `<div class="r8-steps">
  <div class="r8-step is-active">
    <span class="r8-step__index">1</span>
    <div class="r8-step__body">
      <strong class="r8-step__title">Install</strong>
      <span>Import retro8.css</span>
    </div>
  </div>
  <div class="r8-step">
    <span class="r8-step__index">2</span>
    <div class="r8-step__body">
      <strong class="r8-step__title">Compose</strong>
      <span>Use r8-* classes</span>
    </div>
  </div>
</div>`,
  },
  {
    id: "tabs",
    name: "Tabs",
    group: "navigation",
    summary: l(
      "Estrutura visual para conteudo em abas com tablist clara e painel associado.",
      "Visual structure for tabbed content with a clear tablist and associated panel.",
    ),
    classes: ["r8-tabs", "r8-tabs__list", "r8-tabs__tab", "r8-tabs__tab--active", "r8-tabs__panel"],
    preview: `<div class="r8-tabs">
  <div class="r8-tabs__list" role="tablist" aria-label="Ship data">
    <button
      class="r8-tabs__tab r8-tabs__tab--active"
      type="button"
      role="tab"
      aria-controls="docs-tabs-stats"
      aria-selected="true"
    >
      Stats
    </button>
    <button class="r8-tabs__tab" type="button" role="tab" aria-controls="docs-tabs-crew" aria-selected="false">Crew</button>
    <button class="r8-tabs__tab" type="button" role="tab" aria-controls="docs-tabs-loot" aria-selected="false">Loot</button>
  </div>
  <div id="docs-tabs-stats" class="r8-tabs__panel" role="tabpanel">
    Hull integrity stable. Fuel reserve at 61%. Crew morale high.
  </div>
  <div id="docs-tabs-crew" class="r8-tabs__panel" role="tabpanel" hidden>
    Captain, engineer and medic are all online for the next deploy window.
  </div>
  <div id="docs-tabs-loot" class="r8-tabs__panel" role="tabpanel" hidden>
    3 relics, 2 keycards and 1 encrypted blueprint available in storage.
  </div>
</div>`,
  },
] satisfies CatalogEntry[];

const feedbackComponents = [
  {
    id: "alert",
    name: "Alert",
    group: "feedback",
    summary: l(
      "Alert semantico que tambem pode funcionar como toast posicionado para feedback importante.",
      "Semantic alert that can also behave as a positioned toast for important feedback.",
    ),
    classes: [
      "r8-alert",
      "r8-alert--success",
      "r8-alert--info",
      "r8-alert--danger",
      "r8-alert--top-left",
      "r8-alert--bottom-left",
      "r8-alert--top-right",
      "r8-alert--bottom-right",
      "r8-alert__title",
      "r8-alert__actions",
    ],
    preview: `<div class="docs-demo__stack">
  <div class="docs-demo__actions">
    <button class="r8-btn r8-btn--secondary" type="button" data-r8-toggle="alert" data-r8-target="#docs-alert-top-left">
      Top left
    </button>
    <button class="r8-btn r8-btn--secondary" type="button" data-r8-toggle="alert" data-r8-target="#docs-alert-bottom-left">
      Bottom left
    </button>
    <button class="r8-btn r8-btn--secondary" type="button" data-r8-toggle="alert" data-r8-target="#docs-alert-top-right">
      Top right
    </button>
    <button class="r8-btn r8-btn--secondary" type="button" data-r8-toggle="alert" data-r8-target="#docs-alert-bottom-right">
      Bottom right
    </button>
  </div>
  <div class="docs-demo__stage" data-r8-overlay-scope>
    <p class="docs-demo__stage-copy">
      Click a button to spawn the alert inside this contained preview. The same position classes pin it to the viewport in real app layouts.
    </p>

    <section id="docs-alert-top-left" class="r8-alert r8-alert--info r8-alert--top-left" role="alert" aria-live="assertive" data-r8-duration="4500" hidden>
      <strong class="r8-alert__title">Radar drift</strong>
      <p class="r8-text">Signal integrity dropped below 82% on the left cluster.</p>
      <div class="r8-alert__actions">
        <button class="r8-btn r8-btn--sm r8-btn--dark" type="button" data-r8-close="#docs-alert-top-left">Dismiss</button>
      </div>
    </section>

    <section id="docs-alert-bottom-left" class="r8-alert r8-alert--success r8-alert--bottom-left" role="status" aria-live="polite" data-r8-duration="4500" hidden>
      <strong class="r8-alert__title">Build shipped</strong>
      <p class="r8-text">The deploy completed and all four shards are synchronized.</p>
      <div class="r8-alert__actions">
        <button class="r8-btn r8-btn--sm r8-btn--dark" type="button" data-r8-close="#docs-alert-bottom-left">Close</button>
      </div>
    </section>

    <section id="docs-alert-top-right" class="r8-alert r8-alert--danger r8-alert--top-right" role="alert" aria-live="assertive" data-r8-duration="4500" hidden>
      <strong class="r8-alert__title">Boss alert</strong>
      <p class="r8-text">The reactor core is overheating and needs immediate cooldown.</p>
      <div class="r8-alert__actions">
        <button class="r8-btn r8-btn--sm r8-btn--light" type="button" data-r8-close="#docs-alert-top-right">Dismiss</button>
      </div>
    </section>

    <section id="docs-alert-bottom-right" class="r8-alert r8-alert--bottom-right" role="alert" aria-live="assertive" data-r8-duration="4500" hidden>
      <strong class="r8-alert__title">Quest updated</strong>
      <p class="r8-text">A new objective marker was added to the east corridor.</p>
      <div class="r8-alert__actions">
        <button class="r8-btn r8-btn--sm r8-btn--dark" type="button" data-r8-close="#docs-alert-bottom-right">Close</button>
      </div>
    </section>
  </div>
</div>`,
    code: `<div class="r8-space r8-space--vertical">
  <div class="r8-row">
    <button class="r8-btn r8-btn--secondary" type="button" data-r8-toggle="alert" data-r8-target="#alert-top-left">
      Top left
    </button>
    <button class="r8-btn r8-btn--secondary" type="button" data-r8-toggle="alert" data-r8-target="#alert-bottom-left">
      Bottom left
    </button>
    <button class="r8-btn r8-btn--secondary" type="button" data-r8-toggle="alert" data-r8-target="#alert-top-right">
      Top right
    </button>
    <button class="r8-btn r8-btn--secondary" type="button" data-r8-toggle="alert" data-r8-target="#alert-bottom-right">
      Bottom right
    </button>
  </div>

  <div data-r8-overlay-scope style="min-height: 18rem;">
    <section id="alert-top-left" class="r8-alert r8-alert--info r8-alert--top-left" role="alert" aria-live="assertive" data-r8-duration="4500" hidden>
      <strong class="r8-alert__title">Radar drift</strong>
      <p class="r8-text">Signal integrity dropped below 82%.</p>
      <div class="r8-alert__actions">
        <button class="r8-btn r8-btn--sm r8-btn--dark" type="button" data-r8-close="#alert-top-left">Dismiss</button>
      </div>
    </section>

    <section id="alert-bottom-left" class="r8-alert r8-alert--success r8-alert--bottom-left" role="status" aria-live="polite" data-r8-duration="4500" hidden>
      <strong class="r8-alert__title">Build shipped</strong>
      <p class="r8-text">All shards are synchronized.</p>
      <div class="r8-alert__actions">
        <button class="r8-btn r8-btn--sm r8-btn--dark" type="button" data-r8-close="#alert-bottom-left">Close</button>
      </div>
    </section>

    <section id="alert-top-right" class="r8-alert r8-alert--danger r8-alert--top-right" role="alert" aria-live="assertive" data-r8-duration="4500" hidden>
      <strong class="r8-alert__title">Boss alert</strong>
      <p class="r8-text">The reactor core is overheating.</p>
      <div class="r8-alert__actions">
        <button class="r8-btn r8-btn--sm r8-btn--light" type="button" data-r8-close="#alert-top-right">Dismiss</button>
      </div>
    </section>

    <section id="alert-bottom-right" class="r8-alert r8-alert--bottom-right" role="alert" aria-live="assertive" data-r8-duration="4500" hidden>
      <strong class="r8-alert__title">Quest updated</strong>
      <p class="r8-text">A new objective marker was added.</p>
      <div class="r8-alert__actions">
        <button class="r8-btn r8-btn--sm r8-btn--dark" type="button" data-r8-close="#alert-bottom-right">Close</button>
      </div>
    </section>
  </div>
</div>`,
  },
  {
    id: "dialog",
    name: "Dialog",
    group: "feedback",
    summary: l(
      "Moldura modal para confirmacoes e interrupcoes, pronta para usar com dialog nativo ou runtime do app.",
      "Modal frame for confirmations and interruptions, ready for native dialog or host app runtime.",
    ),
    classes: ["r8-dialog", "r8-dialog__titlebar", "r8-dialog__title", "r8-dialog__body", "r8-dialog__footer", "r8-dialog--danger"],
    preview: `<div class="docs-demo__stack">
  <button
    class="r8-btn r8-btn--primary"
    type="button"
    data-r8-toggle="dialog"
    data-r8-target="#docs-dialog-preview"
  >
    Open dialog
  </button>
  <dialog id="docs-dialog-preview" class="r8-dialog" aria-labelledby="docs-dialog-preview-title">
    <div class="r8-dialog__titlebar">
      <h3 id="docs-dialog-preview-title" class="r8-dialog__title">Exit mission?</h3>
    </div>
    <div class="r8-dialog__body">
      The optional runtime already wires open, close and escape behavior for this preview.
    </div>
    <div class="r8-dialog__footer">
      <button class="r8-btn" type="button" data-r8-close="#docs-dialog-preview">Cancel</button>
      <button class="r8-btn r8-btn--danger" type="button" data-r8-close="#docs-dialog-preview">Exit</button>
    </div>
  </dialog>
</div>`,
  },
  {
    id: "drawer",
    name: "Drawer",
    group: "feedback",
    summary: l(
      "Painel lateral para filtros, settings e detalhes contextuais sem trocar de pagina.",
      "Side panel for filters, settings and contextual details without leaving the page.",
    ),
    classes: ["r8-drawer", "r8-drawer--right", "r8-drawer--left", "r8-drawer__header", "r8-drawer__title", "r8-drawer__body", "r8-drawer__footer", "r8-drawer-backdrop"],
    preview: `<div class="docs-demo__stack">
  <div class="docs-demo__actions">
    <button
      class="r8-btn r8-btn--primary"
      type="button"
      data-r8-toggle="drawer"
      data-r8-target="#docs-drawer-preview"
    >
      Open drawer
    </button>
  </div>
  <div class="docs-demo__stage" data-r8-overlay-scope>
    <p class="docs-demo__stage-copy">
      This preview uses the same runtime as the library package: backdrop, escape close, outside click, and button helpers are all active.
    </p>
    <aside id="docs-drawer-preview" class="r8-drawer r8-drawer--right" hidden>
      <div class="r8-drawer__header">
        <strong class="r8-drawer__title">Quick settings</strong>
        <button class="r8-btn r8-btn--sm" type="button" data-r8-close="#docs-drawer-preview">Close</button>
      </div>
      <div class="r8-drawer__body">
        <p class="r8-text">Tune the active color palette and HUD density.</p>
        <label class="r8-checkbox is-checked">
          <span class="r8-checkbox__box" aria-hidden="true"></span>
          <span>Show minimap</span>
        </label>
        <label class="r8-checkbox">
          <span class="r8-checkbox__box" aria-hidden="true"></span>
          <span>Enable scanlines</span>
        </label>
      </div>
      <div class="r8-drawer__footer">
        <button class="r8-btn r8-btn--sm" type="button" data-r8-close="#docs-drawer-preview">Cancel</button>
        <button class="r8-btn r8-btn--sm r8-btn--primary" type="button" data-r8-close="#docs-drawer-preview">Apply</button>
      </div>
    </aside>
  </div>
</div>`,
    code: `<div class="r8-space r8-space--vertical">
  <button
    class="r8-btn r8-btn--primary"
    type="button"
    data-r8-toggle="drawer"
    data-r8-target="#settings-drawer"
  >
    Open drawer
  </button>

  <div data-r8-overlay-scope style="min-height: 20rem;">
    <aside id="settings-drawer" class="r8-drawer r8-drawer--right" hidden>
      <div class="r8-drawer__header">
        <strong class="r8-drawer__title">Quick settings</strong>
        <button class="r8-btn r8-btn--sm" type="button" data-r8-close="#settings-drawer">Close</button>
      </div>

      <div class="r8-drawer__body">
        <p class="r8-text">Tune palette and HUD density.</p>
        <label class="r8-checkbox is-checked">
          <span class="r8-checkbox__box" aria-hidden="true"></span>
          <span>Show minimap</span>
        </label>
        <label class="r8-checkbox">
          <span class="r8-checkbox__box" aria-hidden="true"></span>
          <span>Enable scanlines</span>
        </label>
      </div>

      <div class="r8-drawer__footer">
        <button class="r8-btn r8-btn--sm" type="button" data-r8-close="#settings-drawer">Cancel</button>
        <button class="r8-btn r8-btn--sm r8-btn--primary" type="button" data-r8-close="#settings-drawer">Apply</button>
      </div>
    </aside>
  </div>
</div>`,
  },
  {
    id: "loading",
    name: "Loading",
    group: "feedback",
    summary: l(
      "Indicador de atividade com pixels piscando para carregamentos curtos.",
      "Activity indicator with blinking pixels for short loading states.",
    ),
    classes: ["r8-loading", "r8-loading__pixel"],
    preview: `<div class="r8-loading" aria-label="Loading">
  <span class="r8-loading__pixel"></span>
  <span class="r8-loading__pixel"></span>
  <span class="r8-loading__pixel"></span>
  <span class="r8-text r8-text--muted">Loading assets...</span>
</div>`,
  },
  {
    id: "message",
    name: "Message",
    group: "feedback",
    summary: l(
      "Toast compacto para feedback rapido, curto e temporario.",
      "Compact toast for quick, short-lived feedback.",
    ),
    classes: ["r8-message", "r8-message__title"],
    preview: `<div class="docs-demo__stack">
  <button
    class="r8-btn r8-btn--secondary"
    type="button"
    data-r8-toggle="message"
    data-r8-target="#docs-message-preview"
  >
    Show message
  </button>
  <section id="docs-message-preview" class="r8-message" hidden>
    <strong class="r8-message__title">Saved</strong>
    <p class="r8-text">retro8.css exported successfully.</p>
    <div class="r8-row">
      <button class="r8-btn r8-btn--sm" type="button" data-r8-dismiss>Dismiss</button>
    </div>
  </section>
</div>`,
  },
  {
    id: "message-box",
    name: "Message Box",
    group: "feedback",
    summary: l(
      "Caixa de mensagem para confirmacoes e prompts de curta duracao.",
      "Message box for short confirmation and prompt flows.",
    ),
    classes: ["r8-message-box", "r8-message-box__title", "r8-message-box__footer"],
    preview: `<div class="docs-demo__stack">
  <button
    class="r8-btn r8-btn--secondary"
    type="button"
    data-r8-toggle="message-box"
    data-r8-target="#docs-message-box-preview"
  >
    Open message box
  </button>
  <section id="docs-message-box-preview" class="r8-message-box" hidden>
    <strong class="r8-message-box__title">Overwrite file?</strong>
    <p class="r8-text">This action will replace the current build artifact.</p>
    <div class="r8-message-box__footer">
      <button class="r8-btn r8-btn--sm" type="button" data-r8-close="#docs-message-box-preview">Cancel</button>
      <button class="r8-btn r8-btn--sm r8-btn--danger" type="button" data-r8-close="#docs-message-box-preview">Overwrite</button>
    </div>
  </section>
</div>`,
  },
  {
    id: "notification",
    name: "Notification",
    group: "feedback",
    summary: l(
      "Cartao de notificacao maior para comunicados persistentes e detalhes extras.",
      "Larger notification card for persistent announcements and extra detail.",
    ),
    classes: ["r8-notification", "r8-notification__title", "r8-notification__footer"],
    preview: `<div class="docs-demo__stack">
  <button
    class="r8-btn r8-btn--secondary"
    type="button"
    data-r8-toggle="notification"
    data-r8-target="#docs-notification-preview"
  >
    Show notification
  </button>
  <section id="docs-notification-preview" class="r8-notification" hidden>
    <strong class="r8-notification__title">New release available</strong>
    <p class="r8-text">retro8-ui 0.2 ships with the extended component catalog.</p>
    <div class="r8-notification__footer">
      <button class="r8-btn r8-btn--sm" type="button" data-r8-close="#docs-notification-preview">Dismiss</button>
      <button class="r8-btn r8-btn--sm r8-btn--primary" type="button">Read notes</button>
    </div>
  </section>
</div>`,
  },
  {
    id: "popconfirm",
    name: "Popconfirm",
    group: "feedback",
    summary: l(
      "Confirmacao pequena e ancorada, boa para acoes destrutivas perto do gatilho.",
      "Small anchored confirmation, great for destructive actions near the trigger.",
    ),
    classes: ["r8-popconfirm", "r8-popconfirm__title", "r8-popconfirm__footer"],
    preview: `<div class="docs-demo__stack">
  <button
    class="r8-btn r8-btn--danger"
    type="button"
    data-r8-toggle="popconfirm"
    data-r8-target="#docs-popconfirm-preview"
  >
    Delete item
  </button>
  <section id="docs-popconfirm-preview" class="r8-popconfirm" hidden>
    <strong class="r8-popconfirm__title">Delete item?</strong>
    <p class="r8-text">This cannot be undone.</p>
    <div class="r8-popconfirm__footer">
      <button class="r8-btn r8-btn--sm" type="button" data-r8-close="#docs-popconfirm-preview">Cancel</button>
      <button class="r8-btn r8-btn--sm r8-btn--danger" type="button" data-r8-close="#docs-popconfirm-preview">Delete</button>
    </div>
  </section>
</div>`,
  },
  {
    id: "popover",
    name: "Popover",
    group: "feedback",
    summary: l(
      "Conteudo flutuante com titulo opcional para detalhes, acoes rapidas e metadata.",
      "Floating content with an optional title for details, quick actions and metadata.",
    ),
    classes: ["r8-popover", "r8-popover__title"],
    preview: `<div class="docs-demo__stack">
  <button
    class="r8-btn r8-btn--secondary"
    type="button"
    data-r8-toggle="popover"
    data-r8-target="#docs-popover-preview"
  >
    Toggle popover
  </button>
  <section id="docs-popover-preview" class="r8-popover" hidden>
    <strong class="r8-popover__title">Shortcut panel</strong>
    <p class="r8-text">Press G to open the grid overlay.</p>
  </section>
</div>`,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    group: "feedback",
    summary: l(
      "Dica breve para explicar icones, acoes compactas e controles densos.",
      "Short hint for explaining icons, compact actions and dense controls.",
    ),
    classes: ["r8-tooltip"],
    preview: `<div class="docs-demo__stack">
  <button
    class="r8-btn"
    type="button"
    data-r8-toggle="tooltip"
    data-r8-target="#docs-tooltip-preview"
  >
    Show tooltip
  </button>
  <div id="docs-tooltip-preview" class="r8-tooltip" role="tooltip" hidden>
    Hold Shift to toggle precision mode.
  </div>
</div>`,
  },
] satisfies CatalogEntry[];

const otherComponents = [
  {
    id: "divider",
    name: "Divider",
    group: "others",
    summary: l(
      "Separador horizontal ou vertical para grupos de conteudo e toolbars.",
      "Horizontal or vertical separator for content groups and toolbars.",
    ),
    classes: ["r8-divider", "r8-divider__label", "r8-divider--vertical"],
    preview: `<div class="docs-demo__stack">
  <div class="r8-row">
    <span>Stats</span>
    <span class="r8-divider r8-divider--vertical" aria-hidden="true"></span>
    <span>Inventory</span>
    <span class="r8-divider r8-divider--vertical" aria-hidden="true"></span>
    <span>Map</span>
  </div>
  <div class="r8-divider" role="separator">
    <span class="r8-divider__label">checkpoint</span>
  </div>
</div>`,
  },
  {
    id: "watermark",
    name: "Watermark",
    group: "others",
    summary: l(
      "Marca d'agua retro para previews, assets internos e areas de protecao visual.",
      "Retro watermark layer for previews, internal assets and protected visual areas.",
    ),
    classes: ["r8-watermark"],
    preview: `<div class="r8-watermark" data-watermark="retro8-ui"></div>`,
  },
] satisfies CatalogEntry[];

const retroExtraComponents = [
  {
    id: "panel",
    name: "Panel",
    group: "retro-extras",
    core: false,
    summary: l(
      "Superficie nativa da retro8-ui para cards e blocos editoriais, paralela ao Card do catalogo core.",
      "Native retro8-ui surface for cards and editorial blocks, complementing the core Card component.",
    ),
    classes: ["r8-panel", "r8-panel--muted", "r8-panel__header", "r8-panel__title", "r8-panel__meta", "r8-panel__body", "r8-panel__footer"],
    preview: `<section class="r8-panel">
  <div class="r8-panel__header">
    <h3 class="r8-panel__title">Mission log</h3>
    <p class="r8-panel__meta">Last update: 02:14 ago</p>
  </div>
  <div class="r8-panel__body r8-stack">
    <p>Orbital repairs complete. Shield calibration in progress.</p>
    <div class="r8-cluster">
      <span class="r8-badge r8-badge--success">stable</span>
      <span class="r8-badge r8-badge--info">channel open</span>
    </div>
  </div>
  <div class="r8-panel__footer">
    <button class="r8-btn r8-btn--primary" type="button">Review</button>
  </div>
</section>`,
  },
  {
    id: "window",
    name: "Window",
    group: "retro-extras",
    core: false,
    summary: l(
      "Janela estilo desktop 8-bit com titlebar e statusbar para HUDs, consoles e overlays persistentes.",
      "8-bit desktop-like window with a titlebar and statusbar for HUDs, consoles and persistent overlays.",
    ),
    classes: ["r8-window", "r8-window__titlebar", "r8-window__title", "r8-window__controls", "r8-window__control", "r8-window__body", "r8-window__statusbar", "r8-window--danger", "r8-window--success"],
    preview: `<section class="r8-window">
  <div class="r8-window__titlebar">
    <span class="r8-window__title">Inventory</span>
    <div class="r8-window__controls" aria-hidden="true">
      <span class="r8-window__control"></span>
      <span class="r8-window__control"></span>
      <span class="r8-window__control"></span>
    </div>
  </div>
  <div class="r8-window__body r8-stack">
    <div class="r8-row">
      <span class="r8-badge r8-badge--warning">rare</span>
      <strong>Copper keycard</strong>
    </div>
    <div class="r8-row">
      <span class="r8-badge r8-badge--info">slot 4</span>
      <strong>Signal decoder</strong>
    </div>
  </div>
  <div class="r8-window__statusbar">2 active items</div>
</section>`,
  },
  {
    id: "navbar",
    name: "Navbar",
    group: "retro-extras",
    core: false,
    summary: l(
      "Barra superior pronta para docs, landing pages e dashboards com brand, links e acoes.",
      "Top bar ready for docs, landing pages and dashboards with brand, links and actions.",
    ),
    classes: ["r8-navbar", "r8-navbar__brand", "r8-navbar__menu", "r8-navbar__item", "r8-navbar__actions", "r8-navbar--dark"],
    preview: `<nav class="r8-navbar">
  <a class="r8-navbar__brand" href="#0">retro8-ui</a>
  <ul class="r8-navbar__menu">
    <li><a class="r8-navbar__item" aria-current="page" href="#0">Docs</a></li>
    <li><a class="r8-navbar__item" href="#0">Components</a></li>
    <li><a class="r8-navbar__item" href="#0">Examples</a></li>
  </ul>
  <div class="r8-navbar__actions">
    <span class="r8-badge r8-badge--info">v1</span>
    <button class="r8-btn r8-btn--sm r8-btn--primary" type="button">Install</button>
  </div>
</nav>`,
  },
] satisfies CatalogEntry[];

export const componentCatalog = [
  ...basicComponents,
  ...configurationComponents,
  ...formComponents,
  ...dataComponents,
  ...navigationComponents,
  ...feedbackComponents,
  ...otherComponents,
  ...retroExtraComponents,
] satisfies CatalogEntry[];

export const componentOrder = componentCatalog.map((component) => component.id);
export const componentCount = componentCatalog.length;
export const coreComponentCount = componentCatalog.filter((component) => component.core !== false).length;
export const componentGroupOrder = componentGroups.map((group) => group.id);

export const defaultAnatomyByGroup: Record<ComponentGroupId, LocalizedList> = {
  basic: ll(
    [
      "Use a classe base como o bloco principal e combine somente os modificadores que fazem sentido para o contexto.",
      "Esses componentes servem como fundacao visual para outras superficies, layouts e documentos da biblioteca.",
    ],
    [
      "Use the base class as the main block and only combine modifiers that make sense for the context.",
      "These components act as visual foundations for other library surfaces, layouts and documents.",
    ],
  ),
  configuration: ll(
    [
      "Aplique o provider em um escopo local quando quiser alterar skin ou contraste sem afetar a pagina inteira.",
      "Use esse padrao para demonstracao, theming localizado e containers de preview.",
    ],
    [
      "Apply the provider to a local scope when you want to change skin or contrast without affecting the whole page.",
      "Use this pattern for demos, localized theming and preview containers.",
    ],
  ),
  form: ll(
    [
      "Prefira HTML nativo para o comportamento e use as classes r8-* como shell visual previsivel.",
      "Agrupe labels, ajuda e feedback proximo do campo para manter leitura e acessibilidade.",
    ],
    [
      "Prefer native HTML for behavior and use r8-* classes as the predictable visual shell.",
      "Keep labels, help text and feedback close to the field for better readability and accessibility.",
    ],
  ),
  data: ll(
    [
      "Esses componentes priorizam leitura, agrupamento e ritmo visual em dashboards, docs e paineis.",
      "Combine badges, texto e superficies para adicionar contexto sem poluir o HTML consumidor.",
    ],
    [
      "These components prioritize readability, grouping and visual rhythm in dashboards, docs and panels.",
      "Combine badges, text and surfaces to add context without cluttering consumer HTML.",
    ],
  ),
  navigation: ll(
    [
      "Use estados ativos, ordem logica e landmarks semanticos para deixar o fluxo de navegacao claro.",
      "As classes lidam com a casca visual; a aplicacao pode conectar rotas, scroll ou expansao conforme necessario.",
    ],
    [
      "Use active states, logical order and semantic landmarks to keep navigation flow clear.",
      "The classes handle the visual shell; your application can connect routes, scroll or expansion as needed.",
    ],
  ),
  feedback: ll(
    [
      "A retro8-ui entrega a superficie visual, enquanto exibicao, fechamento e stack podem ficar no app hospedeiro.",
      "Prefira acoplamento leve com dialog nativo, portais ou runtime proprio apenas quando o caso exigir.",
    ],
    [
      "retro8-ui provides the visual surface, while showing, closing and stacking can stay in the host app.",
      "Prefer light integration with native dialog, portals or your own runtime only when the use case requires it.",
    ],
  ),
  others: ll(
    [
      "Sao pecas de apoio que ajudam a costurar a interface sem exigir JavaScript adicional.",
      "Funcionam melhor quando reforcam hierarquia e legibilidade, nao apenas decoracao.",
    ],
    [
      "These are support pieces that help stitch the interface together without extra JavaScript.",
      "They work best when they reinforce hierarchy and readability rather than decoration alone.",
    ],
  ),
  "retro-extras": ll(
    [
      "Esses componentes nasceram da linguagem propria da retro8-ui e complementam o catalogo core.",
      "Use-os quando quiser uma camada mais forte de fantasia desktop, HUD ou shell proprietario.",
    ],
    [
      "These components come from retro8-ui own visual language and complement the core catalog.",
      "Use them when you want a stronger desktop, HUD or custom shell fantasy.",
    ],
  ),
};

export const defaultAccessibilityByGroup: Record<ComponentGroupId, LocalizedList> = {
  basic: ll(
    [
      "Prefira o elemento HTML semanticamente correto: button para acoes, a para links e headings reais para titulos.",
      "Mantenha foco visivel e contraste suficiente, especialmente nas variacoes de cor mais fortes.",
    ],
    [
      "Prefer the semantically correct HTML element: button for actions, a for links and real headings for titles.",
      "Keep focus visible and contrast sufficient, especially on stronger color variations.",
    ],
  ),
  configuration: ll(
    [
      "Trocas de tema ou skin nao devem reduzir contraste nem esconder estados de foco.",
      "Quando mudar o contexto visual, valide componentes de formulario e texto dentro do novo escopo.",
    ],
    [
      "Theme or skin changes should not reduce contrast or hide focus states.",
      "When changing visual context, validate form controls and text inside the new scope.",
    ],
  ),
  form: ll(
    [
      "Associe labels e mensagens de erro aos campos com os atributos nativos apropriados sempre que houver interacao real.",
      "Nao dependa apenas de cor para estados de validacao; exponha texto, estado ou valor junto do controle.",
    ],
    [
      "Associate labels and error messages with fields using the proper native attributes whenever there is real interaction.",
      "Do not rely on color alone for validation states; expose text, status or value alongside the control.",
    ],
  ),
  data: ll(
    [
      "Ofereca equivalentes textuais para estados visuais, icones ou indicadores quando eles carregarem informacao importante.",
      "Em tabelas, listas e metricas, mantenha ordem de leitura coerente e headings claros.",
    ],
    [
      "Provide textual equivalents for visual states, icons or indicators when they carry important meaning.",
      "In tables, lists and metrics, keep reading order coherent and headings clear.",
    ],
  ),
  navigation: ll(
    [
      "Use aria-current, nav e labels descritivos quando houver mais de uma area de navegacao na tela.",
      "Se o componente for interativo, sincronize o estado visual com foco, tecla e rota atual.",
    ],
    [
      "Use aria-current, nav and descriptive labels when there is more than one navigation area on the screen.",
      "If the component is interactive, keep the visual state in sync with focus, keyboard support and the current route.",
    ],
  ),
  feedback: ll(
    [
      "Mensagens importantes devem ser anunciadas de forma adequada, com dialog nativo, aria-live ou outra estrategia do app.",
      "Bloqueios modais e overlays precisam respeitar foco, fechamento e escape no runtime que hospedar o componente.",
    ],
    [
      "Important messages should be announced appropriately, using native dialog, aria-live or another app strategy.",
      "Modal blocks and overlays need to respect focus, dismissal and escape behavior in the runtime that hosts the component.",
    ],
  ),
  others: ll(
    [
      "Divisores devem ser usados com moderacao e watermarks nao devem comprometer legibilidade do conteudo.",
      "Quando houver significado semantico, mantenha roles ou textos auxiliares adequados.",
    ],
    [
      "Dividers should be used sparingly and watermarks should not compromise content readability.",
      "When there is semantic meaning, keep appropriate roles or supporting text.",
    ],
  ),
  "retro-extras": ll(
    [
      "Mesmo em shells mais decorativos, preserve landmarks, headings reais e ordem de leitura consistente.",
      "Evite usar fantasia visual para esconder controles essenciais ou informacao critica.",
    ],
    [
      "Even in more decorative shells, preserve landmarks, real headings and a consistent reading order.",
      "Avoid using visual fantasy to hide essential controls or critical information.",
    ],
  ),
};
