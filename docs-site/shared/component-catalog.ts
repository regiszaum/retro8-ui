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
    title: l("Básicos", "Basic"),
    description: l(
      "Primitivos visuais, layout e blocos semânticos para montar interfaces retrô com consistência.",
      "Visual primitives, layout helpers and semantic building blocks for consistent retro interfaces.",
    ),
  },
  {
    id: "configuration",
    core: true,
    title: l("Configuração", "Configuration"),
    description: l(
      "Configuração visual local para alterar tema e densidade sem mudar a API pública.",
      "Visual configuration layer for swapping local context, skins or themes without changing the public API.",
    ),
  },
  {
    id: "form",
    core: true,
    title: l("Formulários", "Form"),
    description: l(
      "Campos, seletores e estruturas de formulário com comportamento HTML nativo ou interações do runtime opcional.",
      "Form controls and data-entry structures with native HTML behavior or optional runtime interactions.",
    ),
  },
  {
    id: "data",
    core: true,
    title: l("Dados", "Data"),
    description: l(
      "Componentes de leitura, visualização e estrutura para dashboards, listas, tabelas e estados de conteúdo.",
      "Reading, visualization and structure components for dashboards, lists, tables and content states.",
    ),
  },
  {
    id: "navigation",
    core: true,
    title: l("Navegação", "Navigation"),
    description: l(
      "Padrões de deslocamento, orientação e fluxo entre áreas da interface com personalidade retrô.",
      "Movement, orientation and flow patterns between interface areas with a retro personality.",
    ),
  },
  {
    id: "feedback",
    core: true,
    title: l("Retorno visual", "Feedback"),
    description: l(
      "Superfícies visuais para alertas, overlays e estados temporários que a aplicação hospedeira pode controlar.",
      "Visual surfaces for alerts, overlays and temporary states that the host app can control.",
    ),
  },
  {
    id: "others",
    core: true,
    title: l("Outros", "Others"),
    description: l(
      "Peças auxiliares que aparecem com frequência em interfaces reais, como separadores e watermark.",
      "Utility pieces that show up often in real interfaces, such as dividers and watermarks.",
    ),
  },
  {
    id: "retro-extras",
    core: false,
    title: l("Extras Retro8", "retro8 extras"),
    description: l(
      "Componentes nativos da Retro8 UI que complementam o catálogo principal com peças próprias do sistema.",
      "Retro8 UI native components that extend the main catalog with system-specific pieces.",
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
      "Botão de ação com estados de foco, carregamento e pressão em estilo pixelado.",
      "Action button with pixelated hover, pressed, focus, and loading states.",
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
    <button class="r8-btn r8-btn--ghost" type="button">Ghost</button>
  </div>
  <div class="r8-cluster">
    <button class="r8-btn r8-btn--tertiary" type="button">Tertiary</button>
    <button class="r8-btn r8-btn--success" type="button">Success</button>
    <button class="r8-btn r8-btn--info" type="button">Info</button>
    <button class="r8-btn r8-btn--danger" type="button">Danger</button>
    <button class="r8-btn r8-btn--light" type="button">Light</button>
  </div>
  <div class="r8-cluster">
    <button class="r8-btn r8-btn--sm" type="button">Small</button>
    <button class="r8-btn r8-btn--primary" type="button" aria-pressed="true">Pressed</button>
    <button class="r8-btn r8-btn--lg" type="button">
      <span class="r8-btn__icon" aria-hidden="true">></span>
      Launch
    </button>
    <button class="r8-btn" type="button" disabled>Disabled</button>
  </div>
  <div class="docs-demo__actions">
    <button class="r8-btn" type="button" data-r8-variant="secondary" data-r8-loading="true">Saving</button>
    <a class="r8-btn r8-btn--dark r8-btn--sm" href="#0">Open docs</a>
  </div>
  <button class="r8-btn r8-btn--dark r8-btn--block" type="button">Full width action</button>
</div>`,
    code: `<div class="docs-demo__stack">
  <div class="r8-cluster">
    <button class="r8-btn r8-btn--primary" type="button">Save changes</button>
    <button class="r8-btn r8-btn--ghost" type="button">Cancel</button>
  </div>

  <button class="r8-btn" type="button" aria-pressed="true">
    Toggle filters
  </button>

  <button class="r8-btn" type="button" data-r8-variant="secondary" data-r8-loading="true">
    Syncing
  </button>

  <a class="r8-btn r8-btn--sm r8-btn--light" href="/release-notes">
    Release notes
  </a>

  <button class="r8-btn r8-btn--lg" type="button">
    <span class="r8-btn__icon" aria-hidden="true">></span>
    Launch mission
  </button>

  <button class="r8-btn r8-btn--dark r8-btn--block" type="button">
    Full width action
  </button>
</div>`,
    anatomy: ll(
      [
        "`r8-btn` é a estrutura base e funciona melhor em `<button>` para ações e em `<a>` apenas quando a navegação pedir visual de CTA.",
        "Modificadores como `--primary`, `--ghost`, `--sm`, `--lg` e `--block` ajustam tom, escala e largura sem trocar a estrutura base.",
        "`r8-btn__icon` adiciona um símbolo curto antes ou depois do rótulo mantendo alinhamento previsível.",
        "`r8-btn__spinner` representa carregamento visual e pode ser usado manualmente ou pelo auxiliar declarativo.",
      ],
      [
        "`r8-btn` is the base shell and works best on `<button>` for actions and on `<a>` only when navigation needs CTA styling.",
        "Modifiers such as `--primary`, `--ghost`, `--sm`, `--lg` and `--block` adjust tone, scale and width without changing the base structure.",
        "`r8-btn__icon` adds a short glyph before or after the label while keeping alignment predictable.",
        "`r8-btn__spinner` represents the loading visual and can be used manually or through the declarative helper.",
      ],
    ),
    accessibility: ll(
      [
        "Prefira `<button>` para ações reais e use `<a>` apenas quando houver navegação de verdade.",
        "Dentro de forms, defina `type=\"button\"` nas ações que não devem submeter o formulário.",
        "Use `aria-pressed` somente quando o Button representar um estado persistente de liga/desliga ou selecionado.",
        "Quando um link for exibido como Button e estiver indisponivel, exponha `aria-disabled=\"true\"` e proteja ou remova o `href`.",
        "Estados de carregamento devem manter texto visível; não dependa apenas do spinner para comunicar o que esta acontecendo.",
      ],
      [
        "Prefer `<button>` for real actions and use `<a>` only when there is actual navigation.",
        "Inside forms, set `type=\"button\"` on actions that should not submit the form.",
        "Use `aria-pressed` only when the Button represents a persistent selected or on/off state.",
        "When a link is styled as a Button and unavailable, expose `aria-disabled=\"true\"` and guard or remove the `href`.",
        "Loading states should keep visible text; do not rely on the spinner alone to communicate what is happening.",
      ],
    ),
    api: [
      {
        name: "r8-btn",
        description: l(
          "Classe base para a superfície clicável com textura retrô, foco visível e estados de hover/press.",
          "Base class for the clickable surface with retro texture, visible focus and hover/press states.",
        ),
      },
      {
        name: "r8-btn--primary / --secondary / --tertiary / --success / --info / --danger / --dark / --light / --ghost",
        description: l(
          "Modificadores semânticos para trocar o peso visual da ação sem mudar a estrutura da marcação.",
          "Semantic modifiers for changing the visual weight of the action without changing the markup structure.",
        ),
      },
      {
        name: "r8-btn--sm / --lg / --block",
        description: l(
          "Ajustam escala e largura do Button para toolbars compactas, CTAs maiores ou ações em largura total.",
          "Adjust the Button scale and width for compact toolbars, larger CTAs or full-width actions.",
        ),
      },
      {
        name: "r8-btn__icon / r8-btn__spinner",
        description: l(
          "Slots visuais para símbolos curtos e indicacao de carregamento dentro do próprio Button.",
          "Visual slots for short glyphs and a loading indicator inside the Button itself.",
        ),
      },
      {
        name: "data-r8-variant / data-r8-size / data-r8-loading / data-r8-active",
        description: l(
          "Auxiliares declarativos para sincronizar variante, tamanho, carregamento e estado pressed sem concatenacao manual.",
          "Declarative helpers for syncing variant, size, loading and pressed state without manual class concatenation.",
        ),
      },
    ],
  },
  {
    id: "border",
    name: "Border",
    group: "basic",
    summary: l(
      "Borda retrô com espessura, cor, lados e sombra configuráveis.",
      "Retro border with configurable width, color, edges, and shadow.",
    ),
    classes: [
      "r8-border-showcase",
      "r8-border-sample",
      "r8-border-sample--thin",
      "r8-border-sample--ghost",
      "r8-border-sample--primary",
      "r8-border-sample--secondary",
      "r8-border-sample--success",
      "r8-border-sample--info",
      "r8-border-sample--danger",
      "r8-border-sample--top",
      "r8-border-sample--end",
      "r8-border-sample--bottom",
      "r8-border-sample--start",
    ],
    preview: `<div class="r8-border-showcase">
  <div class="r8-border-sample">
    <strong>Default shell</strong>
    <span>Thick border and dry shadow for framed surfaces.</span>
  </div>
  <div class="r8-border-sample r8-border-sample--thin">
    <strong>Thin border</strong>
    <span>Lighter edge for quieter containers and helper blocks.</span>
  </div>
  <div class="r8-border-sample r8-border-sample--primary">
    <strong>Primary tone</strong>
    <span>Use a semantic accent without replacing the base structure.</span>
  </div>
  <div class="r8-border-sample r8-border-sample--success r8-border-sample--top">
    <strong>Top edge</strong>
    <span>Single-edge border works well for separators and docked sections.</span>
  </div>
  <div class="r8-border-sample r8-border-sample--danger r8-border-sample--start">
    <strong>Start edge</strong>
    <span>A stronger side cue for alerts, status rails or pinned lists.</span>
  </div>
  <div class="r8-border-sample r8-border-sample--ghost">
    <strong>Ghost border</strong>
    <span>Transparent fill when only the outline should stay visible.</span>
  </div>
</div>`,
    code: `<div class="r8-border-showcase">
  <div class="r8-border-sample r8-border-sample--primary">
    <strong>Primary frame</strong>
    <span>Semantic accent using the default thick border.</span>
  </div>

  <div class="r8-border-sample r8-border-sample--thin r8-border-sample--bottom">
    <strong>Bottom edge only</strong>
    <span>Useful for stacked sections, list headers or inline separators.</span>
  </div>

  <div
    class="r8-border-sample r8-border-sample--ghost"
    style="
      --r8-border-sample-color: var(--r8-color-tertiary-strong);
      --r8-border-sample-width: 6px;
      --r8-border-sample-shadow: none;
    "
  >
    <strong>Custom variable override</strong>
    <span>Dial the exact border color and width without creating a new modifier.</span>
  </div>
</div>`,
    anatomy: ll(
      [
        "`r8-border-sample` é um contêiner visual genérico para destacar blocos, avisos curtos, cards auxiliares e trilhos laterais.",
        "Modificadores como `--thin` e `--ghost` ajustam peso e preenchimento sem trocar o elemento hospedeiro.",
        "Tons semânticos como `--primary`, `--success` e `--danger` ajudam a puxar a borda para o contexto certo sem depender só do fundo.",
        "Modificadores de lado único como `--top`, `--end`, `--bottom` e `--start` funcionam bem para separadores, cabeçalhos e faixas laterais.",
      ],
      [
        "`r8-border-sample` is a generic visual wrapper for highlighted blocks, short notices, helper cards and side rails.",
        "Modifiers such as `--thin` and `--ghost` adjust weight and fill without changing the host element.",
        "Semantic tones like `--primary`, `--success` and `--danger` help pull the border into the right context without relying on the background alone.",
        "Single-edge modifiers such as `--top`, `--end`, `--bottom` and `--start` work well for separators, headers and side rails.",
      ],
    ),
    accessibility: ll(
      [
        "Border e apenas tratamento visual; escolha o elemento semântico certo, como `<section>`, `<article>` ou `<aside>`, de acordo com o conteúdo.",
        "Não dependa só da cor da borda para comunicar estado crítico ou sucesso; mantenha texto, ícone ou rótulo explicito.",
        "Quando usar borda em um único lado, preserve espaçamento suficiente para que a faixa continue perceptivel sem colidir com o conteúdo.",
      ],
      [
        "Border is a visual treatment only; choose the right semantic host, such as `<section>`, `<article>` or `<aside>`, based on the content.",
        "Do not rely on border color alone to communicate critical or success states; keep explicit text, icon or label support.",
        "When using a single-edge border, preserve enough spacing so the rail stays visible without colliding with the content.",
      ],
    ),
    api: [
      {
        name: "r8-border-sample",
        description: l(
          "Classe base para uma superfície emoldurada com borda dura, fundo opcional e sombra seca no estilo Retro8 UI.",
          "Base class for a framed surface with a hard border, optional fill and dry shadow in the Retro8 UI style.",
        ),
      },
      {
        name: "r8-border-sample--thin / --ghost",
        description: l(
          "Ajustam espessura e preenchimento para superfícies mais discretas ou outlines transparentes.",
          "Adjust thickness and fill for quieter surfaces or transparent outlines.",
        ),
      },
      {
        name: "r8-border-sample--primary / --secondary / --success / --info / --danger",
        description: l(
          "Trocam o tom da borda usando cores semânticas já presentes nos tokens da biblioteca.",
          "Change the border tone using semantic colors already present in the library tokens.",
        ),
      },
      {
        name: "r8-border-sample--top / --end / --bottom / --start",
        description: l(
          "Mantém apenas uma face da borda visível para casos de separacao, encaixe lateral ou destaque de faixa.",
          "Keep only one border edge visible for separator, docked or side-rail scenarios.",
        ),
      },
      {
        name: "--r8-border-sample-*",
        description: l(
          "Propriedades CSS para ajustar cor, largura, sombra e fundo sem precisar criar novos modificadores fixos.",
          "Custom properties for dialing color, width, shadow and background without creating new fixed modifiers.",
        ),
      },
    ],
  },
  {
    id: "color",
    name: "Color",
    group: "basic",
    summary: l(
      "Paleta semântica e classes de cor para texto, superfícies e estados da interface.",
      "Semantic palette and text color classes for surfaces, content, and interface states.",
    ),
    classes: [
      "r8-color-grid",
      "r8-color-card",
      "r8-color-card__swatch",
      "r8-color-card__meta",
      "r8-text",
      "r8-text--muted",
      "r8-text--subtle",
      "r8-text--primary",
      "r8-text--secondary",
      "r8-text--tertiary",
      "r8-text--success",
      "r8-text--warning",
      "r8-text--info",
      "r8-text--danger",
      "r8-text--dark",
      "r8-text--light",
    ],
    preview: `<div class="docs-demo__stack">
  <div class="r8-color-grid">
  <div class="r8-color-card">
    <div class="r8-color-card__swatch" style="background:var(--r8-color-bg);"></div>
    <div class="r8-color-card__meta">
      <strong>Background</strong>
      <span>--r8-color-bg</span>
    </div>
  </div>
  <div class="r8-color-card">
    <div class="r8-color-card__swatch" style="background:var(--r8-color-primary);"></div>
    <div class="r8-color-card__meta">
      <strong>Primary</strong>
      <span>--r8-color-primary</span>
    </div>
  </div>
  <div class="r8-color-card">
    <div class="r8-color-card__swatch" style="background:var(--r8-color-secondary);"></div>
    <div class="r8-color-card__meta">
      <strong>Secondary</strong>
      <span>--r8-color-secondary</span>
    </div>
  </div>
  <div class="r8-color-card">
    <div class="r8-color-card__swatch" style="background:var(--r8-color-tertiary);"></div>
    <div class="r8-color-card__meta">
      <strong>Tertiary</strong>
      <span>--r8-color-tertiary</span>
    </div>
  </div>
  <div class="r8-color-card">
    <div class="r8-color-card__swatch" style="background:var(--r8-color-success);"></div>
    <div class="r8-color-card__meta">
      <strong>Success</strong>
      <span>--r8-color-success</span>
    </div>
  </div>
  <div class="r8-color-card">
    <div class="r8-color-card__swatch" style="background:var(--r8-color-warning);"></div>
    <div class="r8-color-card__meta">
      <strong>Warning</strong>
      <span>--r8-color-warning</span>
    </div>
  </div>
  <div class="r8-color-card">
    <div class="r8-color-card__swatch" style="background:var(--r8-color-info);"></div>
    <div class="r8-color-card__meta">
      <strong>Info</strong>
      <span>--r8-color-info</span>
    </div>
  </div>
  <div class="r8-color-card">
    <div class="r8-color-card__swatch" style="background:var(--r8-color-danger);"></div>
    <div class="r8-color-card__meta">
      <strong>Danger</strong>
      <span>--r8-color-danger</span>
    </div>
  </div>
  <div class="r8-color-card">
    <div class="r8-color-card__swatch" style="background:var(--r8-color-dark);"></div>
    <div class="r8-color-card__meta">
      <strong>Dark</strong>
      <span>--r8-color-dark</span>
    </div>
  </div>
  <div class="r8-color-card">
    <div class="r8-color-card__swatch" style="background:var(--r8-color-light);"></div>
    <div class="r8-color-card__meta">
      <strong>Light</strong>
      <span>--r8-color-light</span>
    </div>
  </div>
  </div>

  <div class="docs-demo__stack">
    <p class="r8-text">Default body tone for base UI copy.</p>
    <p class="r8-text r8-text--muted">Muted tone for helper text and secondary context.</p>
    <p class="r8-text r8-text--subtle">Subtle tone for tertiary metadata and quiet labels.</p>
    <p class="r8-text r8-text--primary">Primary tone for key actions and highlights.</p>
    <p class="r8-text r8-text--warning">Warning tone for caution states that need attention.</p>
    <div
      class="r8-border-sample"
      style="
        --r8-border-sample-color: var(--r8-color-dark-strong);
        --r8-border-sample-shadow: none;
        --r8-border-sample-bg: var(--r8-color-dark);
      "
    >
      <p class="r8-text r8-text--light">Light tone stays readable on dark Retro8 surfaces.</p>
    </div>
  </div>
</div>`,
    code: `<div class="r8-color-grid">
  <div class="r8-color-card">
    <div class="r8-color-card__swatch" style="background:var(--r8-color-primary);"></div>
    <div class="r8-color-card__meta">
      <strong>Primary</strong>
      <span>--r8-color-primary</span>
    </div>
  </div>

  <div class="r8-color-card">
    <div class="r8-color-card__swatch" style="background:var(--r8-color-warning);"></div>
    <div class="r8-color-card__meta">
      <strong>Warning</strong>
      <span>--r8-color-warning</span>
    </div>
  </div>
</div>

<p class="r8-text r8-text--primary">Primary emphasis for key information.</p>
<p class="r8-text r8-text--warning">Warning emphasis for caution states.</p>
<p class="r8-text r8-text--subtle">Subtle tone for tertiary metadata.</p>

<section style="padding: var(--r8-space-4); background: var(--r8-color-dark);">
  <p class="r8-text r8-text--light">Readable copy on dark surfaces.</p>
</section>`,
    anatomy: ll(
      [
        "`r8-color-grid` organiza amostras de cor em uma grade responsiva para inspecionar a paleta rapidamente.",
        "`r8-color-card`, `__swatch` e `__meta` formam o bloco visual de cada token de cor exibido na documentacao.",
        "`r8-text` e os modificadores `--*` aplicam cor semântica ao texto corrido sem precisar criar estilos locais para cada contexto.",
      ],
      [
        "`r8-color-grid` organizes swatches in a responsive grid so the palette can be scanned quickly.",
        "`r8-color-card`, `__swatch` and `__meta` form the visual block used to present each color token in the documentation.",
        "`r8-text` and its `--*` modifiers apply semantic color to body copy without needing local one-off styles for each context.",
      ],
    ),
    accessibility: ll(
      [
        "Não use cor sozinha para comunicar meaning; combine o tom com texto claro, ícone ou rótulo visível.",
        "Tons claros como `r8-text--light` funcionam melhor sobre superfícies escuras ou coloridas com contraste suficiente.",
        "Para metadata discreta, prefira `--muted` ou `--subtle` em vez de reduzir opacidade e comprometer a leitura.",
      ],
      [
        "Do not use color alone to communicate meaning; pair the tone with clear text, an icon or a visible label.",
        "Light tones such as `r8-text--light` work best on dark or saturated surfaces with enough contrast.",
        "For quieter metadata, prefer `--muted` or `--subtle` instead of lowering opacity and hurting readability.",
      ],
    ),
    api: [
      {
        name: "r8-color-grid / r8-color-card / r8-color-card__swatch / r8-color-card__meta",
        description: l(
          "Estrutura visual para apresentar tokens, amostras e nomes de cor em uma grade consistente.",
          "Visual structure for presenting tokens, swatches and color names in a consistent grid.",
        ),
      },
      {
        name: "r8-text",
        description: l(
          "Classe base para texto corrido, rótulos e pequenos blocos de texto onde a cor pode variar semanticamente.",
          "Base class for body copy, labels and short text blocks where color may vary semantically.",
        ),
      },
      {
        name: "r8-text--muted / --subtle",
        description: l(
          "Reduzem o peso visual para detalhes secundarios e metadata mais quieta.",
          "Reduce visual weight for secondary details and quieter metadata.",
        ),
      },
      {
        name: "r8-text--primary / --secondary / --tertiary / --success / --warning / --info / --danger",
        description: l(
          "Aplicam os tons semânticos principais da Retro8 UI diretamente no texto.",
          "Apply the main Retro8 UI semantic tones directly to text.",
        ),
      },
      {
        name: "r8-text--dark / --light",
        description: l(
          "Ajudam a ajustar leitura em superfícies muito claras ou muito escuras quando o contexto pedir contraste explicito.",
          "Help adjust readability on very light or very dark surfaces when the context needs explicit contrast.",
        ),
      },
    ],
  },
  {
    id: "layout-container",
    name: "Layout Container",
    group: "basic",
    summary: l(
      "Estrutura de página com cabeçalho, conteúdo principal, barra lateral e rodapé.",
      "Page structure with a header, main content, sidebar, and footer.",
    ),
    classes: [
      "r8-container",
      "r8-container--aside-end",
      "r8-container--stack",
      "r8-container__header",
      "r8-container__aside",
      "r8-container__main",
      "r8-container__footer",
    ],
    preview: `<div class="docs-demo__stack">
  <div class="r8-container" style="--r8-container-aside-width: 12rem; --r8-container-min-height: 16rem;">
    <header class="r8-container__header">Header</header>
    <aside class="r8-container__aside">Aside</aside>
    <main class="r8-container__main">Main content</main>
    <footer class="r8-container__footer">Footer</footer>
  </div>

  <div class="r8-container r8-container--aside-end" style="--r8-container-aside-width: 11rem;">
    <header class="r8-container__header">Toolbar</header>
    <main class="r8-container__main">Content first, rail after</main>
    <aside class="r8-container__aside">Inspector</aside>
  </div>

  <div class="r8-container r8-container--stack" style="--r8-container-min-height: 0;">
    <header class="r8-container__header">Stacked header</header>
    <main class="r8-container__main">Main content without sidebar</main>
    <footer class="r8-container__footer">Footer</footer>
  </div>
</div>`,
    code: `<div class="r8-container" style="--r8-container-aside-width: 13rem;">
  <header class="r8-container__header">Header</header>
  <aside class="r8-container__aside">Navigation</aside>
  <main class="r8-container__main">Main content</main>
  <footer class="r8-container__footer">Footer</footer>
</div>

<div class="r8-container r8-container--aside-end">
  <main class="r8-container__main">Primary pane</main>
  <aside class="r8-container__aside">Secondary rail</aside>
</div>

<div class="r8-container r8-container--stack" style="--r8-container-min-height: 0;">
  <header class="r8-container__header">Header</header>
  <main class="r8-container__main">Main content</main>
</div>`,
    anatomy: ll(
      [
        "`r8-container` é o contêiner estrutural que distribui os blocos principais da estrutura e aceita nesting quando a hierarquia pedir.",
        "`r8-container__header` e `r8-container__footer` ocupam a largura total e funcionam bem para barras de contexto, status e ações.",
        "`r8-container__aside` cria a coluna lateral e pode ficar no início ou no fim usando `r8-container--aside-end`.",
        "`r8-container__main` recebe a área principal e continua responsiva mesmo quando o aside desaparece.",
        "`r8-container--stack` simplifica a estrutura para um fluxo vertical sem sidebar, útil para páginas simples ou áreas compactas.",
      ],
      [
        "`r8-container` is the structural wrapper that distributes the main shell regions and accepts nesting when the hierarchy needs it.",
        "`r8-container__header` and `r8-container__footer` span the full width and work well for contextual bars, status areas and actions.",
        "`r8-container__aside` creates the side column and can move to the trailing side with `r8-container--aside-end`.",
        "`r8-container__main` receives the primary area and stays responsive even when the aside disappears.",
        "`r8-container--stack` simplifies the shell into a vertical flow without a sidebar, useful for simpler pages or compact areas.",
      ],
    ),
    accessibility: ll(
      [
        "Use elementos semânticos nativos como `<header>`, `<aside>`, `<main>` e `<footer>` sempre que eles fizerem sentido para a estrutura real.",
        "Mantenha apenas um `<main>` por página ou por landmark principal do app para evitar landmarks duplicados.",
        "Se o aside for navegação, exponha links e títulos claros; se for painel auxiliar, rotule o bloco para orientar tecnologias assistivas.",
      ],
      [
        "Use native semantic elements such as `<header>`, `<aside>`, `<main>` and `<footer>` whenever they match the real structure.",
        "Keep only one `<main>` per page or per primary app landmark to avoid duplicate landmarks.",
        "If the aside is navigation, expose clear links and headings; if it is a supporting panel, label the region for assistive tech.",
      ],
    ),
    api: [
      {
        name: "r8-container",
        description: l(
          "Classe base da estrutura, com espaçamento, altura mínima e largura lateral controladas por CSS variables.",
          "Base shell class, with gap, minimum height and sidebar width controlled by CSS variables.",
        ),
      },
      {
        name: "r8-container--aside-end / r8-container--stack",
        description: l(
          "Modificadores para mover o aside para a direita lógica ou simplificar o layout para um fluxo vertical.",
          "Modifiers for moving the aside to the logical end or simplifying the layout into a vertical flow.",
        ),
      },
      {
        name: "r8-container__header / __aside / __main / __footer",
        description: l(
          "Regioes semânticas da estrutura que podem ser combinadas conforme a necessidade do layout.",
          "Semantic shell regions that can be combined based on the layout needs.",
        ),
      },
      {
        name: "--r8-container-*",
        description: l(
          "Propriedades CSS para ajustar espaçamento, largura do aside, altura mínima e alturas do cabeçalho/rodapé sem criar novos modificadores fixos.",
          "Custom properties for adjusting gap, aside width, minimum height and header/footer heights without creating new fixed modifiers.",
        ),
      },
    ],
  },
  {
    id: "icon",
    name: "Icon",
    group: "basic",
    summary: l(
      "Moldura visual para ícones externos, imagens de cursores ou símbolos de texto, sem pacote de ícones obrigatório.",
      "Visual frame for external icons, cursor images, or text glyphs, with no required icon package.",
    ),
    classes: ["r8-icon-grid", "r8-icon-tile", "r8-icon-tile__glyph", "r8-icon-tile__label"],
    preview: `<div class="docs-demo__stack">
  <div class="r8-icon-grid">
    <div class="r8-icon-tile">
      <span class="r8-icon-tile__glyph" aria-hidden="true">
        <img src="/cursors/default.png" alt="" />
      </span>
      <span class="r8-icon-tile__label">Docs default cursor</span>
    </div>
    <div class="r8-icon-tile">
      <span class="r8-icon-tile__glyph" aria-hidden="true">
        <img src="/cursors/pointer.png" alt="" />
      </span>
      <span class="r8-icon-tile__label">Pointer state</span>
    </div>
    <div class="r8-icon-tile">
      <span class="r8-icon-tile__glyph" aria-hidden="true">
        <img src="/cursors/text.png" alt="" />
      </span>
      <span class="r8-icon-tile__label">Text input state</span>
    </div>
    <div class="r8-icon-tile">
      <span class="r8-icon-tile__glyph" aria-hidden="true">
        <img src="/cursors/grab.png" alt="" />
      </span>
      <span class="r8-icon-tile__label">Grab state</span>
    </div>
  </div>

  <div class="r8-icon-grid">
    <div class="r8-icon-tile">
      <span class="r8-icon-tile__glyph" aria-hidden="true">HP</span>
      <span class="r8-icon-tile__label">Short glyph fallback</span>
    </div>
    <div class="r8-icon-tile">
      <span class="r8-icon-tile__glyph" aria-hidden="true">
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <rect x="2" y="2" width="4" height="4"></rect>
          <rect x="10" y="2" width="4" height="4"></rect>
          <rect x="6" y="6" width="4" height="4"></rect>
          <rect x="2" y="10" width="4" height="4"></rect>
          <rect x="10" y="10" width="4" height="4"></rect>
        </svg>
      </span>
      <span class="r8-icon-tile__label">Inline SVG drop-in</span>
    </div>
    <div class="r8-icon-tile">
      <span
        class="r8-icon-tile__glyph"
        aria-hidden="true"
        style="
          --r8-icon-glyph-bg: var(--r8-color-dark);
          --r8-icon-glyph-color: var(--r8-color-light);
          --r8-icon-glyph-border: var(--r8-color-dark-strong);
        "
      >
        <img src="/cursors/wait.png" alt="" />
      </span>
      <span class="r8-icon-tile__label">Waiting state</span>
    </div>
  </div>
</div>`,
    code: `<div class="r8-icon-grid">
  <div class="r8-icon-tile">
    <span class="r8-icon-tile__glyph" aria-hidden="true">
      <img src="/cursors/pointer.png" alt="" />
    </span>
    <span class="r8-icon-tile__label">Pointer cursor</span>
  </div>

  <div class="r8-icon-tile">
    <span class="r8-icon-tile__glyph" aria-hidden="true">
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <rect x="2" y="2" width="4" height="4"></rect>
        <rect x="10" y="2" width="4" height="4"></rect>
        <rect x="6" y="6" width="4" height="4"></rect>
        <rect x="2" y="10" width="4" height="4"></rect>
        <rect x="10" y="10" width="4" height="4"></rect>
      </svg>
    </span>
    <span class="r8-icon-tile__label">Inline SVG</span>
  </div>

  <div class="r8-icon-tile">
    <span
      class="r8-icon-tile__glyph"
      aria-hidden="true"
      style="
        --r8-icon-glyph-size: 3.5rem;
        --r8-icon-glyph-bg: var(--r8-color-primary-strong);
        --r8-icon-glyph-color: var(--r8-color-primary-contrast);
      "
    >
      HP
    </span>
    <span class="r8-icon-tile__label">Short glyph fallback</span>
  </div>
</div>`,
    anatomy: ll(
      [
        "`r8-icon-grid` organiza galerias de ícones, cursores ou estados visuais em uma grade leve e responsiva.",
        "`r8-icon-tile` emoldura cada item com a mesma superfície retrô usada em outros blocos da UI, mantendo consistência com cards e samples.",
        "`r8-icon-tile__glyph` aceita texto curto, `<img>` ou `<svg>` inline, entao voce pode encaixar assets externos sem trocar a estrutura.",
        "`r8-icon-tile__label` nomeia o item e ajuda a explicar o significado do ícone quando ele aparece fora de um contexto maior.",
      ],
      [
        "`r8-icon-grid` organizes icon galleries, cursor assets or state markers in a light responsive grid.",
        "`r8-icon-tile` frames each item with the same retro surface language used by other UI blocks, keeping it consistent with cards and samples.",
        "`r8-icon-tile__glyph` accepts short text, `<img>` or inline `<svg>`, so external assets can drop in without changing the structure.",
        "`r8-icon-tile__label` names the item and helps explain the icon meaning when it appears outside a larger context.",
      ],
    ),
    accessibility: ll(
      [
        "Se o ícone for apenas decorativo, marque o símbolo como `aria-hidden=\"true\"` e use `alt=\"\"` em imagens para evitar redundancia.",
        "Quando o ícone carregar significado próprio, mantenha rótulo visível ou um nome acessível claro no elemento interativo hospedeiro.",
        "O bloco não e interativo por si só; se o ícone abrir uma ação ou navegação, hospede a estrutura dentro de `<button>` ou `<a>` sem perder o rótulo.",
        "Não dependa só do ícone para comunicar estado importante; combine com texto, cor e contexto visível.",
      ],
      [
        "If the icon is purely decorative, mark the glyph as `aria-hidden=\"true\"` and use `alt=\"\"` on images to avoid redundancy.",
        "When the icon carries meaning, keep a visible label or a clear accessible name on the interactive host element.",
        "The tile is not interactive on its own; if the icon triggers an action or navigation, host the structure inside a `<button>` or `<a>` without losing the label.",
        "Do not rely on the icon alone for important status; combine it with text, color and visible context.",
      ],
    ),
    api: [
      {
        name: "r8-icon-grid",
        description: l(
          "Grid responsiva para listar opções de pacote, estados de cursor, ações iconicas ou galerias curtas dentro da documentacao e do produto.",
          "Responsive grid for listing package options, cursor states, icon actions or short galleries in docs and product surfaces.",
        ),
      },
      {
        name: "r8-icon-tile",
        description: l(
          "Bloco base com moldura retrô para agrupar um símbolo e seu rótulo sem precisar montar um card bespoke.",
          "Base tile with a retro frame for grouping a glyph and its label without building a bespoke card.",
        ),
      },
      {
        name: "r8-icon-tile__glyph",
        description: l(
          "Janela visual do ícone. Funciona com texto curto, `<img>` ou `<svg>` inline e aceita customizacao por CSS variables.",
          "Visual icon frame. Works with short text, `<img>` or inline `<svg>` and accepts CSS variable overrides.",
        ),
      },
      {
        name: "r8-icon-tile__label",
        description: l(
          "Rótulo em caixa alta para nomear o asset, estado ou significado do ícone de forma previsível.",
          "Uppercase label for naming the asset, state or icon meaning predictably.",
        ),
      },
      {
        name: "--r8-icon-glyph-*",
        description: l(
          "Propriedades CSS para ajustar tamanho, cor de frente, fundo e borda do símbolo quando o contexto pedir outra ênfase.",
          "Custom properties for adjusting glyph size, foreground color, background and border when the context needs different emphasis.",
        ),
      },
    ],
  },
  {
    id: "link",
    name: "Link",
    group: "basic",
    summary: l(
      "Link de texto com cores semânticas e controle de sublinhado e opacidade.",
      "Text link with semantic colors and configurable underlines and opacity.",
    ),
    classes: [
      "r8-link",
      "r8-link--secondary",
      "r8-link--tertiary",
      "r8-link--success",
      "r8-link--warning",
      "r8-link--info",
      "r8-link--danger",
      "r8-link--dark",
      "r8-link--muted",
      "r8-link--quiet",
      "r8-link--underline",
    ],
    preview: `<div class="docs-demo__stack">
  <p class="r8-text">
    Start with the <a class="r8-link" href="#0">installation guide</a> for the default inline action.
  </p>
  <p class="r8-text">
    Open the <a class="r8-link r8-link--secondary r8-link--underline" href="#0">release notes</a> when the link should stay visible even before hover.
  </p>
  <p class="r8-text">
    Keep supporting actions quieter with a <a class="r8-link r8-link--muted r8-link--quiet" href="#0">secondary docs trail</a>.
  </p>
  <p class="r8-text">
    Use a <a class="r8-link r8-link--warning" href="#0" style="--r8-link-underline-opacity: 35%; --r8-link-underline-offset: 0.28em;">warning link</a> when the destination deserves extra care.
  </p>
  <p class="r8-text">
    <a class="r8-link r8-link--dark" href="https://retro8-ui.dev" target="_blank" rel="noreferrer noopener">External docs</a>
  </p>
  <p class="r8-text">
    <a class="r8-link" aria-disabled="true">Disabled state</a>
  </p>
</div>`,
    code: `<div class="docs-demo__stack">
  <p class="r8-text">
    Read the <a class="r8-link" href="/getting-started">quick start</a>.
  </p>

  <p class="r8-text">
    Open the
    <a class="r8-link r8-link--secondary r8-link--underline" href="/release-notes">
      release notes
    </a>
    for migration details.
  </p>

  <p class="r8-text">
    Keep lower-priority actions subtle with
    <a class="r8-link r8-link--muted r8-link--quiet" href="/changelog">
      a quieter supporting link
    </a>.
  </p>

  <a
    class="r8-link r8-link--warning"
    href="/migration"
    style="
      --r8-link-opacity: 0.75;
      --r8-link-underline-opacity: 40%;
      --r8-link-hover-underline-opacity: 100%;
      --r8-link-underline-offset: 0.3em;
    "
  >
    Migration guide
  </a>
</div>`,
    anatomy: ll(
      [
        "`r8-link` é a base para anchors, `NuxtLink` e outras navegacoes textuais curtas que precisam manter a linguagem visual da Retro8 UI.",
        "Modificadores de tom como `--secondary`, `--warning`, `--danger` e `--muted` mudam a cor sem perder foco visível nem comportamento de hover.",
        "`r8-link--quiet` reduz a presenca visual do link, enquanto `r8-link--underline` deixa o sublinhado sempre presente antes mesmo do hover.",
        "CSS variables `--r8-link-*` refinam opacidade, cor e offset do sublinhado sem multiplicar modificadores utilitarios.",
      ],
      [
        "`r8-link` is the base for anchors, `NuxtLink`, and other short text navigation patterns that should stay within the Retro8 UI visual language.",
        "Tone modifiers such as `--secondary`, `--warning`, `--danger`, and `--muted` change color without losing visible focus or hover behavior.",
        "`r8-link--quiet` lowers visual presence, while `r8-link--underline` keeps the underline visible even before hover.",
        "`--r8-link-*` CSS variables refine opacity, color, and underline offset without multiplying utility-like modifiers.",
      ],
    ),
    accessibility: ll(
      [
        "Mantenha texto de destino explicito; evite rótulos vagas como 'clique aqui' quando o link aparecer fora de contexto.",
        "Se usar `target=\"_blank\"`, combine com `rel=\"noreferrer noopener\"` e deixe claro quando a navegação abrir outra aba.",
        "Opacidade mais baixa pode prejudicar contraste; use `r8-link--quiet` e overrides de opacity com moderação, principalmente em texto corrido pequeno.",
        "Para links indisponiveis, exponha `aria-disabled=\"true\"` e proteja ou remova o `href` para evitar navegação acidental.",
      ],
      [
        "Keep destination text explicit; avoid vague labels such as 'click here' when the link appears outside its surrounding context.",
        "If you use `target=\"_blank\"`, pair it with `rel=\"noreferrer noopener\"` and make it clear when navigation opens a new tab.",
        "Lower opacity can hurt contrast; use `r8-link--quiet` and opacity overrides sparingly, especially in small inline copy.",
        "For unavailable links, expose `aria-disabled=\"true\"` and guard or remove the `href` to avoid accidental navigation.",
      ],
    ),
    api: [
      {
        name: "r8-link",
        description: l(
          "Classe base para links textuais com foco visível, hover com pixel shift e sublinhado controlado por CSS variables.",
          "Base class for text links with visible focus, pixel-shift hover, and underline driven by CSS variables.",
        ),
      },
      {
        name: "r8-link--secondary / --tertiary / --success / --warning / --info / --danger / --dark / --muted",
        description: l(
          "Modificadores semânticos para mudar o tom do link sem trocar a estrutura do anchor ou do router link.",
          "Semantic modifiers for changing the link tone without changing the anchor or router-link structure.",
        ),
      },
      {
        name: "r8-link--quiet / --underline",
        description: l(
          "Presets seguros para reduzir a opacidade base do link ou manter o sublinhado visível desde o estado idle.",
          "Safe presets for lowering the base link opacity or keeping the underline visible from the idle state.",
        ),
      },
      {
        name: "--r8-link-*",
        description: l(
          "Propriedades CSS para ajustar cor, opacity, sublinhado opacity e sublinhado offset seguindo o contexto da tela.",
          "Custom properties for tuning color, opacity, underline opacity, and underline offset to match the screen context.",
        ),
      },
    ],
  },
  {
    id: "splitter",
    name: "Splitter",
    group: "basic",
    summary: l(
      "Divisor redimensionável horizontal ou vertical, com controle por ponteiro e teclado.",
      "Horizontal or vertical resizable divider with pointer and keyboard controls.",
    ),
    classes: [
      "r8-splitter",
      "r8-splitter--vertical",
      "r8-splitter__pane",
      "r8-splitter__handle",
      "is-disabled",
    ],
    preview: `<div class="docs-demo__stack">
  <div class="r8-splitter" data-r8-splitter-position="42">
    <div class="r8-splitter__pane">Navigator pane</div>
    <div class="r8-splitter__handle" aria-label="Resize horizontal panes"></div>
    <div class="r8-splitter__pane">Viewport pane</div>
  </div>
  <div class="r8-splitter r8-splitter--vertical" data-r8-splitter-position="58" style="--r8-splitter-handle-size: 1rem;">
    <div class="r8-splitter__pane">Inspector pane</div>
    <div class="r8-splitter__handle" aria-label="Resize vertical panes"></div>
    <div class="r8-splitter__pane">Console pane</div>
  </div>
  <div class="r8-splitter" data-r8-splitter-position="35" data-r8-splitter-disabled="true">
    <div class="r8-splitter__pane">Locked navigation rail</div>
    <div class="r8-splitter__handle" aria-label="Resize disabled panes"></div>
    <div class="r8-splitter__pane">Pinned preview area</div>
  </div>
</div>`,
    code: `<div
  class="r8-splitter"
  data-r8-splitter-position="42"
  data-r8-splitter-min="24"
  data-r8-splitter-max="76"
  data-r8-splitter-step="4"
  style="
    --r8-splitter-handle-size: 1rem;
    --r8-splitter-handle-accent: var(--r8-color-primary-strong);
  "
>
  <section class="r8-splitter__pane">Navigator pane</section>
  <div class="r8-splitter__handle" aria-label="Resize panes"></div>
  <section class="r8-splitter__pane">Viewport pane</section>
</div>

<div class="r8-splitter r8-splitter--vertical" data-r8-splitter-position="58">
  <section class="r8-splitter__pane">Inspector pane</section>
  <div class="r8-splitter__handle" aria-label="Resize stacked panes"></div>
  <section class="r8-splitter__pane">Console pane</section>
</div>`,
    anatomy: ll(
      [
        "`r8-splitter` é a estrutura base que distribui dois painéis e uma alça central controlada pelo runtime.",
        "`r8-splitter__pane` representa cada área redimensionável e pode receber qualquer conteúdo, de listas a painéis de prévia.",
        "`r8-splitter__handle` é o separador focável usado para arraste com ponteiro e ajuste por teclado.",
        "`r8-splitter--vertical` troca o eixo do layout quando a divisão precisa acontecer em linhas, não colunas.",
      ],
      [
        "`r8-splitter` is the base shell that distributes two panes and a central handle governed by the runtime.",
        "`r8-splitter__pane` represents each resizable area and can host anything from lists to preview panes.",
        "`r8-splitter__handle` is the focusable separator used for pointer dragging and keyboard adjustment.",
        "`r8-splitter--vertical` swaps the layout axis when the split should happen in rows rather than columns.",
      ],
    ),
    accessibility: ll(
      [
        "Mantenha um `aria-label` claro na alça para explicar o que esta sendo redimensionado.",
        "O alça já expoe `role=\"separator\"`, orientation e valores ARIA; preserve isso se voce personalizar o elemento.",
        "Use `data-r8-splitter-disabled=\"true\"` quando o layout estiver travado para não sugerir arraste em um estado indisponivel.",
        "Em áreas criticas, deixe cada painel com títulos ou landmarks claros para que a divisão espacial faca sentido também em leitores de tela.",
      ],
      [
        "Keep a clear `aria-label` on the handle so it explains what is being resized.",
        "The handle already exposes `role=\"separator\"`, orientation, and ARIA values; preserve that if you customize the host.",
        "Use `data-r8-splitter-disabled=\"true\"` when the layout is locked so drag is not implied in an unavailable state.",
        "In critical app areas, give each pane clear headings or landmarks so the spatial split also makes sense in screen readers.",
      ],
    ),
    api: [
      {
        name: "r8-splitter / r8-splitter--vertical",
        description: l(
          "Estrutura base para o layout redimensionável, com variante vertical quando a divisão precisa acontecer em linhas.",
          "Base shell for the resizable layout, with a vertical variant when the split needs to happen in rows.",
        ),
      },
      {
        name: "r8-splitter__pane / r8-splitter__handle",
        description: l(
          "Os painéis recebem o conteúdo real e a alça fica responsável pela interação de redimensionamento via ponteiro e teclado.",
          "The panes host the real content while the handle is responsible for resize interaction through pointer and keyboard.",
        ),
      },
      {
        name: "data-r8-splitter-position / -min / -max / -step / -disabled",
        description: l(
          "Controlam posição inicial, limites, passo de teclado e bloqueio de interação sem exigir JS customizado na aplicação hospedeira.",
          "Control initial position, limits, keyboard step, and interaction lock without requiring custom JS in the host app.",
        ),
      },
      {
        name: "--r8-splitter-*",
        description: l(
          "Propriedades CSS para ajustar posição, tamanho da alça, acento visual do grip e fundo dos painéis.",
          "Custom properties for adjusting position, handle size, grip accent, and pane background.",
        ),
      },
    ],
  },
  {
    id: "typography",
    name: "Typography",
    group: "basic",
    summary: l(
      "Classes de tipografia para títulos, texto, largura de leitura e hierarquia visual.",
      "Typography classes for headings, body text, reading width, and visual hierarchy.",
    ),
    classes: [
      "r8-typography",
      "r8-typography--compact",
      "r8-typography--loose",
      "r8-typography--measure",
      "r8-text",
      "r8-text--xs",
      "r8-text--sm",
      "r8-text--base",
      "r8-text--lg",
      "r8-text--compact",
      "r8-text--loose",
      "r8-text--muted",
      "r8-text--subtle",
      "r8-text--primary",
      "r8-text--secondary",
      "r8-text--tertiary",
      "r8-text--success",
      "r8-text--warning",
      "r8-text--info",
      "r8-text--danger",
      "r8-text--dark",
      "r8-text--light",
    ],
    preview: `<div class="docs-demo__stack">
  <article class="r8-typography r8-typography--measure">
    <small>Mission log / readable measure</small>
    <h1>Readable retro hierarchy</h1>
    <p class="r8-text r8-text--base">
      Build long-form UI copy with a display heading, comfortable measure and a body scale that still fits dense interfaces.
    </p>
    <blockquote>Keep the display font for hierarchy, not for full paragraphs.</blockquote>
    <ul>
      <li>Display font for headings only</li>
      <li>Body scale driven by tokens</li>
      <li>Optional readable measure for longer copy</li>
    </ul>
  </article>

  <div class="docs-demo__stack">
    <p class="r8-text r8-text--xs r8-text--muted">Extra-small helper copy for metadata and timestamps.</p>
    <p class="r8-text">Default body size for compact interface copy.</p>
    <p class="r8-text r8-text--base r8-text--primary">Base size gives intro copy and highlighted paragraphs more air.</p>
    <p class="r8-text r8-text--lg r8-text--loose">Large relaxed copy helps banners, empty states and longer explanatory messages.</p>
  </div>
</div>`,
    code: `<article class="r8-typography r8-typography--measure">
  <small>Mission log / readable measure</small>
  <h1>Readable retro hierarchy</h1>
  <p class="r8-text r8-text--base">
    Build long-form UI copy with a display heading, comfortable measure and a body scale that still fits dense interfaces.
  </p>
  <blockquote>Keep the display font for hierarchy, not for full paragraphs.</blockquote>
  <ul>
    <li>Display font for headings only</li>
    <li>Body scale driven by tokens</li>
    <li>Optional readable measure for longer copy</li>
  </ul>
</article>

<p class="r8-text r8-text--xs r8-text--muted">Extra-small helper copy for metadata and timestamps.</p>
<p class="r8-text r8-text--base r8-text--primary">Base size gives intro copy and highlighted paragraphs more air.</p>
<p class="r8-text r8-text--lg r8-text--loose">Large relaxed copy helps banners, empty states and longer explanatory messages.</p>`,
    anatomy: ll(
      [
        "`r8-typography` é o contêiner para títulos, parágrafos, listas, code, blockquotes e pequenos apoios como `small`.",
        "`r8-typography--measure` limita a largura da leitura para blocos mais longos sem criar um contêiner extra.",
        "`r8-typography--compact` e `r8-typography--loose` ajustam espaçamento e line-height do bloco inteiro para contextos mais densos ou mais relaxados.",
        "`r8-text` funciona dentro ou fora do bloco tipográfico quando você precisa aplicar tom, escala ou line-height em um trecho específico.",
        "Os modificadores de escala `r8-text--xs / --sm / --base / --lg` usam os tokens da UI em vez de tamanhos arbitrários soltos.",
      ],
      [
        "`r8-typography` is the wrapper for headings, paragraphs, lists, code, blockquotes, and lighter support copy such as `small`.",
        "`r8-typography--measure` limits reading width for longer blocks without needing an extra wrapper.",
        "`r8-typography--compact` and `r8-typography--loose` adjust gap and line-height for denser or more relaxed reading contexts.",
        "`r8-text` works inside or outside the main prose block whenever a specific line needs tone, scale, or line-height adjustments.",
        "The `r8-text--xs / --sm / --base / --lg` scale modifiers stay tied to UI tokens instead of ad-hoc sizes.",
      ],
    ),
    accessibility: ll(
      [
        "Mantenha a ordem semântica de títulos (`h1`, `h2`, `h3`) mesmo quando o visual parecer resolvido com apenas classes.",
        "Use os tons semânticos como apoio, não como único canal para erro, sucesso ou alerta; sempre combine com contexto textual.",
        "Prefira `r8-typography--measure` e line-heights mais relaxados quando houver parágrafos longos ou instruções importantes.",
        "Use os modos compactos com parcimonia em áreas densas; leitura longa com line-height apertado cansa mais rapido.",
      ],
      [
        "Keep semantic heading order (`h1`, `h2`, `h3`) even when the visual hierarchy looks solved by classes alone.",
        "Use semantic tones as support, not as the only signal for error, success, or warning states; always pair them with text context.",
        "Prefer `r8-typography--measure` and looser line-heights for longer paragraphs or important instructions.",
        "Use compact modes sparingly in dense UI areas; extended reading with tight line-height becomes tiring faster.",
      ],
    ),
    api: [
      {
        name: "r8-typography",
        description: l(
          "Wrapper base para hierarquia tipografica, com títulos retrô, corpo em mono legível e suporte a listas, blockquotes, code e small.",
          "Base wrapper for typographic hierarchy, with retro headings, readable mono body copy, and support for lists, blockquotes, code, and small text.",
        ),
      },
      {
        name: "r8-typography--compact / --loose / --measure",
        description: l(
          "Modificadores para densidade vertical e largura de leitura sem precisar criar contêineres ou CSS local para cada bloco.",
          "Modifiers for vertical density and reading width without creating extra wrappers or local CSS for every prose block.",
        ),
      },
      {
        name: "r8-text",
        description: l(
          "Classe base para textos curtas, rótulos e parágrafos que precisam de ajustes fora ou dentro de um bloco tipográfico.",
          "Base class for short copy, labels, and paragraphs that need adjustments outside or inside a prose block.",
        ),
      },
      {
        name: "r8-text--xs / --sm / --base / --lg",
        description: l(
          "Escala de texto baseada nos tokens da UI para metadata, corpo compacto, intros e mensagens de maior destaque.",
          "Token-based text scale for metadata, compact body copy, intros, and more prominent messages.",
        ),
      },
      {
        name: "r8-text--compact / --loose",
        description: l(
          "Ajustam line-height de um trecho específico quando a densidade precisa fugir do valor padrão do bloco.",
          "Adjust line-height for a specific line or paragraph when density needs to differ from the block default.",
        ),
      },
      {
        name: "r8-text--muted / --subtle / --primary / --secondary / --tertiary / --success / --warning / --info / --danger / --dark / --light",
        description: l(
          "Tons semânticos para apoio visual, ênfase contextual e contraste explicito em superfícies mais claras ou escuras.",
          "Semantic tones for visual support, contextual emphasis, and explicit contrast on lighter or darker surfaces.",
        ),
      },
      {
        name: "--r8-text-* / --r8-typography-*",
        description: l(
          "Propriedades CSS para trocar família, escala, line-height, espaçamento e largura de leitura sem abrir novos modificadores fixos.",
          "Custom properties for swapping family, scale, line-height, gap, and reading width without expanding the modifier surface.",
        ),
      },
    ],
  },
] satisfies CatalogEntry[];

const configurationComponents = [
  {
    id: "config-provider",
    name: "Config Provider",
    group: "configuration",
    summary: l(
      "Escopo local de tokens para ajustar tema, densidade e cores sem alterar o restante da interface.",
      "Local token scope for adjusting theme, density, and colors without changing the surrounding interface.",
    ),
    classes: [
      "r8-config-provider",
      "r8-config-provider--compact",
      "r8-config-provider--comfortable",
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

  <section class="r8-config-provider r8-config-provider--night r8-config-provider--compact">
    <span class="r8-badge">Night compact scope</span>
    <input class="r8-input" type="text" value="Night console" aria-label="Night scope input" />
    <div class="r8-cluster">
      <button class="r8-btn r8-btn--primary" type="button">Open console</button>
      <button class="r8-btn" type="button">Ping</button>
    </div>
  </section>

  <section class="r8-config-provider" data-theme="terminal" data-density="comfortable">
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

    <section class="r8-config-provider" style="--r8-color-primary: var(--r8-color-warning); --r8-color-primary-strong: var(--r8-color-warning-strong); --r8-color-primary-contrast: var(--r8-color-warning-contrast);">
      <span class="r8-badge r8-badge--warning">Nested override</span>
      <button class="r8-btn r8-btn--primary" type="button">Require final confirmation</button>
    </section>
  </section>
</div>`,
    code: `<section class="r8-config-provider r8-config-provider--night r8-config-provider--compact">
  <span class="r8-badge">Night compact scope</span>
  <input class="r8-input" type="text" value="Night console" aria-label="Night scope input" />
  <div class="r8-cluster">
    <button class="r8-btn r8-btn--primary" type="button">Open console</button>
    <button class="r8-btn" type="button">Ping</button>
  </div>
</section>

<section class="r8-config-provider" data-theme="terminal" data-density="comfortable">
  <span class="r8-badge r8-badge--primary">Terminal skin</span>
  <button class="r8-btn r8-btn--primary" type="button">Run</button>
</section>

<section
  class="r8-config-provider"
  style="
    --r8-color-primary: var(--r8-color-warning);
    --r8-color-primary-strong: var(--r8-color-warning-strong);
    --r8-color-primary-contrast: var(--r8-color-warning-contrast);
  "
>
  <button class="r8-btn r8-btn--primary" type="button">Warn inside local scope</button>
</section>`,
    anatomy: ll(
      [
        "`r8-config-provider` cria um escopo local de tokens; tudo dentro dele herda cores, sombras, espaçamento e tipografia desse contexto.",
        "As variantes `--night`, `--terminal` e `--danger` trocam o tema local sem exigir um interruptor global de tema no documento inteiro.",
        "`--compact` e `--comfortable` ajustam densidade local ao reescrever tokens de espaçamento e escala tipográfica dentro do escopo.",
        "Você pode combinar classes com `data-theme` e `data-density` quando a aplicação hospedeira controla estado por atributo.",
        "Escopos aninhados funcionam para sobrescrever apenas uma ilha da interface, mantendo o resto da estrutura intacto.",
      ],
      [
        "`r8-config-provider` creates a local token scope; everything inside inherits colors, shadows, spacing, and typography from that context.",
        "The `--night`, `--terminal`, and `--danger` variants swap the local skin without requiring a global theme switch on the whole document.",
        "`--compact` and `--comfortable` adjust local density by rewriting spacing and type-scale tokens inside the scope.",
        "You can combine classes with `data-theme` and `data-density` when the host app drives state through attributes.",
        "Nested providers work for overriding a small island of UI while keeping the rest of the shell intact.",
      ],
    ),
    accessibility: ll(
      [
        "Use o `Config Provider` para contraste e densidade, mas mantenha rótulos, títulos e estado textual visíveis mesmo quando o tema mudar.",
        "Temas locais escuros ou danger precisam continuar respeitando contraste suficiente entre superfície, texto e foco.",
        "Se usar aninhados providers, preserve a ordem semântica da interface; o escopo visual não deve confundir landmarks ou hierarquia real.",
        "Atributos como `data-theme` ajudam quando a mudança vem da aplicação hospedeira, mas a experiência acessível continua dependendo da marcação interna correta.",
      ],
      [
        "Use `Config Provider` for contrast and density, but keep labels, headings, and state text visible even when the local theme changes.",
        "Dark or danger local themes still need enough contrast between surface, text, and focus styles.",
        "If you use nested providers, preserve the semantic order of the UI; the visual scope should not blur real landmarks or hierarchy.",
        "Attributes such as `data-theme` help when the host app drives the change, but accessible behavior still depends on correct inner markup.",
      ],
    ),
    api: [
      {
        name: "r8-config-provider",
        description: l(
          "Wrapper base do escopo local, usado para reaplicar tokens de cor, sombra, espaçamento e tipografia apenas nos descendentes.",
          "Base local-scope wrapper used to reapply color, shadow, spacing, and typography tokens only to descendants.",
        ),
      },
      {
        name: "r8-config-provider--night / --terminal / --danger",
        description: l(
          "Presets de tema para trocar o visual local sem alterar o restante da aplicação.",
          "Skin presets for changing the local visual language without altering the rest of the application.",
        ),
      },
      {
        name: "r8-config-provider--compact / --comfortable",
        description: l(
          "Presets de densidade local, inspirados na ideia de configuração global de tamanho, mas resolvidos via tokens em cascata.",
          "Local density presets inspired by global size configuration, but solved through cascading tokens.",
        ),
      },
      {
        name: "data-theme / data-density",
        description: l(
          "Aliases por atributo para integrar o escopo com switches externos, CMS ou estruturas que controlam estado sem tocar classes.",
          "Attribute aliases for integrating the scope with external switches, CMS data, or shells that drive state without touching classes.",
        ),
      },
      {
        name: "--r8-color-* / --r8-shadow-* / --r8-font-size-* / --r8-space-*",
        description: l(
          "Tokens globais da Retro8 UI continuam sobrescreviveis localmente para criar acentos e densidades específicas dentro do escopo.",
          "Retro8 UI global tokens remain locally overridable so you can create scope-specific accents and density inside the provider.",
        ),
      },
      {
        name: "--r8-config-provider-*",
        description: l(
          "Propriedades CSS do contêiner para ajustar espaçamento interno, espaçamento, superfície, borda, sombra e cor base do próprio provider.",
          "Wrapper custom properties for adjusting padding, gap, surface, border, shadow, and the provider shell base color.",
        ),
      },
    ],
  },
] satisfies CatalogEntry[];

const formComponents = [
  {
    id: "autocomplete",
    name: "Autocomplete",
    group: "form",
    summary: l(
      "Campo de busca com sugestões locais, navegação por teclado e estados de carregamento e lista vazia.",
      "Search field with local suggestions, keyboard navigation, and loading and empty states.",
    ),
    classes: [
      "r8-autocomplete",
      "r8-autocomplete__trigger",
      "r8-autocomplete__input",
      "r8-autocomplete__clear",
      "r8-autocomplete__menu",
      "r8-autocomplete__option",
      "r8-autocomplete__empty",
      "r8-autocomplete__loading",
    ],
    preview: `<div class="docs-demo__stack docs-demo__stack--autocomplete">
  <div
    class="r8-autocomplete"
    data-r8-clearable="true"
    data-r8-empty-label="No pilots matched this query."
  >
    <div class="r8-autocomplete__trigger">
      <input
        class="r8-autocomplete__input"
        type="text"
        placeholder="Search pilot..."
        aria-label="Search pilot"
      />
      <button class="r8-autocomplete__clear" type="button" aria-label="Clear search">X</button>
      <span class="r8-badge" data-r8-autocomplete-count>4</span>
    </div>
    <div class="r8-autocomplete__menu" hidden>
      <div class="r8-autocomplete__option" data-r8-search="pix-07 vanguard scout recon" data-r8-value="PIX-07 Vanguard">
        <strong>PIX-07 Vanguard</strong>
        <p class="r8-text r8-text--xs r8-text--muted">Recon pilot / scout division</p>
      </div>
      <div class="r8-autocomplete__option" data-r8-search="pix-11 sentinel support command" data-r8-value="PIX-11 Sentinel">
        <strong>PIX-11 Sentinel</strong>
        <p class="r8-text r8-text--xs r8-text--muted">Support wing / command relay</p>
      </div>
      <div class="r8-autocomplete__option" data-r8-search="pix-12 striker assault frontline" data-r8-value="PIX-12 Striker">
        <strong>PIX-12 Striker</strong>
        <p class="r8-text r8-text--xs r8-text--muted">Frontline assault / breach lead</p>
      </div>
      <div class="r8-autocomplete__option" data-r8-search="pix-21 oracle analyst intel" data-r8-value="PIX-21 Oracle">
        <strong>PIX-21 Oracle</strong>
        <p class="r8-text r8-text--xs r8-text--muted">Intel analyst / route prediction</p>
      </div>
      <div class="r8-autocomplete__empty" hidden>No pilots matched this query.</div>
      <div class="r8-autocomplete__loading" hidden>Loading suggestions...</div>
    </div>
  </div>

  <div
    class="r8-autocomplete"
    data-r8-trigger-on-focus="false"
    data-r8-loading="true"
    data-r8-loading-label="Syncing remote routes..."
  >
    <div class="r8-autocomplete__trigger">
      <input
        class="r8-autocomplete__input"
        type="text"
        placeholder="Search route..."
        aria-label="Search route"
      />
      <span class="r8-badge" data-r8-autocomplete-count>0</span>
    </div>
    <div class="r8-autocomplete__menu" hidden>
      <div class="r8-autocomplete__loading" hidden>Syncing remote routes...</div>
      <div class="r8-autocomplete__empty" hidden>No routes available.</div>
    </div>
  </div>
</div>`,
    code: `<div
  class="r8-autocomplete"
  data-r8-clearable="true"
  data-r8-trigger-on-focus="false"
  data-r8-empty-label="No pilots matched this query."
>
  <div class="r8-autocomplete__trigger">
    <input
      class="r8-autocomplete__input"
      type="text"
      placeholder="Search pilot..."
      aria-label="Search pilot"
    />
    <button class="r8-autocomplete__clear" type="button" aria-label="Clear search">X</button>
    <span class="r8-badge" data-r8-autocomplete-count>4</span>
  </div>

  <div class="r8-autocomplete__menu" hidden>
    <div class="r8-autocomplete__option" data-r8-value="PIX-07 Vanguard" data-r8-search="recon scout">
      <strong>PIX-07 Vanguard</strong>
      <p class="r8-text r8-text--xs r8-text--muted">Recon pilot / scout division</p>
    </div>
    <div class="r8-autocomplete__option" data-r8-value="PIX-11 Sentinel" data-r8-search="support command">
      <strong>PIX-11 Sentinel</strong>
      <p class="r8-text r8-text--xs r8-text--muted">Support wing / command relay</p>
    </div>
    <div class="r8-autocomplete__empty" hidden>No pilots matched this query.</div>
    <div class="r8-autocomplete__loading" hidden>Loading suggestions...</div>
  </div>
</div>`,
    anatomy: ll(
      [
        "`r8-autocomplete` é o contêiner raiz que conecta acionador, input, painel e opções no mesmo escopo do runtime.",
        "O painel de sugestões acompanha a largura do campo e flutua sobre o conteúdo seguinte sem deslocar o layout.",
        "`r8-autocomplete__trigger` agrupa o input, o botão opcional de limpar e um badge de contagem ou retorno visual curto.",
        "`r8-autocomplete__option` aceita marcação rico; use `data-r8-value` para controlar o texto que volta ao input e `data-r8-search` para indexacao extra.",
        "`r8-autocomplete__empty` e `r8-autocomplete__loading` funcionam como retorno visual para busca vazia ou remota.",
        "`r8-autocomplete__clear` e opcional e aparece apenas quando o escopo estiver marcado como clearable e houver texto digitado.",
      ],
      [
        "`r8-autocomplete` is the root wrapper that keeps trigger, input, panel, and options in the same runtime scope.",
        "The suggestions panel matches the field width and floats over the following content without moving the layout.",
        "`r8-autocomplete__trigger` groups the input, optional clear action, and a count badge or short feedback token.",
        "`r8-autocomplete__option` accepts richer markup; use `data-r8-value` to control the text written back to the input and `data-r8-search` for extra indexing.",
        "`r8-autocomplete__empty` and `r8-autocomplete__loading` work as visual feedback for empty or remote states.",
        "`r8-autocomplete__clear` is optional and only appears when the scope is marked as clearable and the field has typed text.",
      ],
    ),
    accessibility: ll(
      [
        "Mantenha `aria-label` ou um rótulo visível associado ao input, porque o campo atua como combobox e precisa de nome acessível claro.",
        "Quando usar marcação rico nas opções, preserve um `data-r8-value` curto e objetivo para o valor que volta ao input.",
        "Use `data-r8-trigger-on-focus=\"false\"` quando a lista só fizer sentido depois da primeira digitacao, evitando ruído na abertura do campo.",
        "Em carregamento remoto, prefira retorno visual textual visível e atualize as opções no DOM antes de chamar `Retro8UI.refresh()` no árvore de elementos.",
      ],
      [
        "Keep `aria-label` or a visible associated label on the input, because the field behaves like a combobox and needs a clear accessible name.",
        "When using richer option markup, keep a short `data-r8-value` for the value written back to the input.",
        "Use `data-r8-trigger-on-focus=\"false\"` when the list only makes sense after the first keystroke, avoiding noisy open-on-focus behavior.",
        "For remote loading, prefer visible textual feedback and update the options in the DOM before calling `Retro8UI.refresh()` on the subtree.",
      ],
    ),
    api: [
      {
        name: "r8-autocomplete",
        description: l(
          "Wrapper base do combobox, com filtro local, teclado e seleção sincronizados pelo runtime.",
          "Base combobox wrapper with local filtering, keyboard navigation, and selection synchronized by the runtime.",
        ),
      },
      {
        name: "r8-autocomplete__trigger / __input / __menu / __option",
        description: l(
          "Partes semânticas do componente para acionador, campo digitavel, lista e items selecionaveis.",
          "Semantic parts for the trigger, typing field, list, and selectable items.",
        ),
      },
      {
        name: "r8-autocomplete__clear / __empty / __loading",
        description: l(
          "Elementos opcionais para limpar o campo e comunicar estados de vazio ou carregamento sem CSS ad-hoc.",
          "Optional elements for clearing the field and communicating empty or loading states without ad-hoc CSS.",
        ),
      },
      {
        name: "data-r8-clearable / data-r8-trigger-on-focus / data-r8-empty-label / data-r8-loading / data-r8-loading-label",
        description: l(
          "Auxiliares declarativos para controlar abertura no foco, limpeza, retorno visual vazio e carregamento remoto pelo próprio marcação.",
          "Declarative helpers for controlling open-on-focus, clear behavior, empty feedback, and remote loading through markup itself.",
        ),
      },
      {
        name: "data-r8-value / data-r8-search",
        description: l(
          "Permitem separar o texto exibido no opção do valor final e enriquecer a indexacao do filtro local.",
          "Let you separate the visible option text from the final value and enrich local filter indexing.",
        ),
      },
    ],
  },
  {
    id: "cascader",
    name: "Cascader",
    group: "form",
    summary: l(
      "Seletor hierárquico com busca opcional, limpeza e exibição do caminho completo ou do último nível.",
      "Hierarchical selector with optional search, clearing, and full-path or final-level labels.",
    ),
    classes: [
      "r8-cascader",
      "r8-cascader__trigger",
      "r8-cascader__panel",
      "r8-cascader__toolbar",
      "r8-cascader__input",
      "r8-cascader__clear",
      "r8-cascader__menus",
      "r8-cascader__menu",
      "r8-cascader__option",
      "r8-cascader__tree",
      "r8-cascader__node",
      "r8-cascader__children",
    ],
    preview: `<div class="docs-demo__stack docs-demo__stack--cascader">
  <div class="r8-cascader" data-r8-filterable="true" data-r8-clearable="true" data-r8-placeholder="Select outpost">
    <button class="r8-cascader__trigger" type="button" aria-label="Select outpost">
      <span data-r8-choice-display>Select outpost</span>
      <span class="r8-choice__caret" aria-hidden="true">&gt;</span>
    </button>
    <div class="r8-cascader__panel" hidden>
      <div class="r8-cascader__toolbar">
        <input class="r8-cascader__input" type="text" placeholder="Filter routes..." aria-label="Filter routes" />
        <button class="r8-cascader__clear r8-btn r8-btn--sm r8-btn--secondary" type="button">Clear</button>
      </div>
      <div class="r8-cascader__menus"></div>
      <div class="r8-cascader__tree" hidden>
        <div class="r8-cascader__node" data-r8-label="Solaris" data-r8-value="solaris" data-r8-search="system core capital">
          <div class="r8-cascader__children">
            <div class="r8-cascader__node" data-r8-label="Alpha Rim" data-r8-value="alpha-rim">
              <div class="r8-cascader__children">
                <div class="r8-cascader__node" data-r8-label="Dock 01" data-r8-value="dock-01"></div>
                <div class="r8-cascader__node" data-r8-label="Dock 02" data-r8-value="dock-02"></div>
              </div>
            </div>
            <div class="r8-cascader__node" data-r8-label="Gamma Gate" data-r8-value="gamma-gate">
              <div class="r8-cascader__children">
                <div class="r8-cascader__node" data-r8-label="Hangar 09" data-r8-value="hangar-09" data-r8-selected="true"></div>
                <div class="r8-cascader__node" data-r8-label="Hangar 11" data-r8-value="hangar-11"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="r8-cascader__node" data-r8-label="Nebula Reach" data-r8-value="nebula-reach" data-r8-search="expedition frontier">
          <div class="r8-cascader__children">
            <div class="r8-cascader__node" data-r8-label="Beacon Array" data-r8-value="beacon-array">
              <div class="r8-cascader__children">
                <div class="r8-cascader__node" data-r8-label="Node A" data-r8-value="node-a"></div>
                <div class="r8-cascader__node" data-r8-label="Node B" data-r8-value="node-b"></div>
              </div>
            </div>
            <div class="r8-cascader__node" data-r8-label="Shadow Wharf" data-r8-value="shadow-wharf" data-r8-disabled="true">
              <div class="r8-cascader__children">
                <div class="r8-cascader__node" data-r8-label="Pier 03" data-r8-value="pier-03"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="r8-cascader"
    data-r8-expand-trigger="hover"
    data-r8-check-strictly="true"
    data-r8-show-all-levels="false"
    data-r8-placeholder="Hover or select any level"
  >
    <button class="r8-cascader__trigger" type="button" aria-label="Hover or select any level">
      <span data-r8-choice-display>Research</span>
      <span class="r8-choice__caret" aria-hidden="true">&gt;</span>
    </button>
    <div class="r8-cascader__panel" hidden>
      <div class="r8-cascader__menus"></div>
      <div class="r8-cascader__tree" hidden>
        <div class="r8-cascader__node" data-r8-label="Terran Union" data-r8-value="terran-union">
          <div class="r8-cascader__children">
            <div class="r8-cascader__node" data-r8-label="Command" data-r8-value="command">
              <div class="r8-cascader__children">
                <div class="r8-cascader__node" data-r8-label="Tower East" data-r8-value="tower-east"></div>
              </div>
            </div>
            <div class="r8-cascader__node" data-r8-label="Research" data-r8-value="research" data-r8-selected="true"></div>
          </div>
        </div>
        <div class="r8-cascader__node" data-r8-label="Outer Colonies" data-r8-value="outer-colonies">
          <div class="r8-cascader__children">
            <div class="r8-cascader__node" data-r8-label="Atlas Hub" data-r8-value="atlas-hub"></div>
            <div class="r8-cascader__node" data-r8-label="Drift Labs" data-r8-value="drift-labs"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
    code: `<div
  class="r8-cascader"
  data-r8-filterable="true"
  data-r8-filter-placeholder="Filter routes..."
  data-r8-clearable="true"
  data-r8-show-all-levels="false"
  data-r8-placeholder="Select outpost"
>
  <button class="r8-cascader__trigger" type="button" aria-label="Select outpost">
    <span data-r8-choice-display>Select outpost</span>
    <span class="r8-choice__caret" aria-hidden="true">&gt;</span>
  </button>

  <div class="r8-cascader__panel" hidden>
    <div class="r8-cascader__toolbar">
      <input class="r8-cascader__input" type="text" placeholder="Filter routes..." aria-label="Filter routes" />
      <button class="r8-cascader__clear r8-btn r8-btn--sm r8-btn--secondary" type="button">Clear</button>
    </div>

    <div class="r8-cascader__menus"></div>

    <div class="r8-cascader__tree" hidden>
      <div class="r8-cascader__node" data-r8-label="Solaris" data-r8-value="solaris">
        <div class="r8-cascader__children">
          <div class="r8-cascader__node" data-r8-label="Alpha Rim" data-r8-value="alpha-rim">
            <div class="r8-cascader__children">
              <div class="r8-cascader__node" data-r8-label="Dock 01" data-r8-value="dock-01"></div>
              <div class="r8-cascader__node" data-r8-label="Dock 02" data-r8-value="dock-02"></div>
            </div>
          </div>
          <div class="r8-cascader__node" data-r8-label="Gamma Gate" data-r8-value="gamma-gate">
            <div class="r8-cascader__children">
              <div class="r8-cascader__node" data-r8-label="Hangar 09" data-r8-value="hangar-09" data-r8-selected="true"></div>
              <div class="r8-cascader__node" data-r8-label="Hangar 11" data-r8-value="hangar-11"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
    anatomy: ll(
      [
        "`r8-cascader` é o estrutura raiz e recebe os atributos de comportamento via `data-r8-*`.",
        "`r8-cascader__trigger` abre o floating painel e expoe o caminho selecionado.",
        "`r8-cascader__panel` acompanha a largura do campo; suas colunas rolam internamente quando não há espaço para todos os níveis.",
        "`r8-cascader__node` e `r8-cascader__children` definem a hierarquia declarativa.",
        "`data-r8-show-all-levels=\"false\"` deixa o acionador mais compacto ao exibir apenas o último rótulo, sem perder `data-r8-path` no elemento.",
      ],
      [
        "`r8-cascader` is the root shell and receives `data-r8-*` behavior flags.",
        "`r8-cascader__trigger` opens the floating panel and exposes the selected path.",
        "`r8-cascader__panel` matches the field width; its columns scroll internally when there is not enough space for every level.",
        "`r8-cascader__node` and `r8-cascader__children` define the declarative hierarchy.",
        "`data-r8-show-all-levels=\"false\"` keeps the trigger more compact by showing only the last label while preserving `data-r8-path` on the host.",
      ],
    ),
    accessibility: ll(
      [
        "Use `aria-label` no acionador quando o rótulo visível não for descritivo o bastante.",
        "Marque desabilitado branches com `data-r8-disabled=\"true\"` para preservar teclado semantics.",
        "Mantenha instances pesquisaveis com `r8-cascader__input` devidamente rotulado.",
        "Quando optar por mostrar só o último nível no acionador, preserve contexto adicional no rótulo visível ao redor do campo.",
      ],
      [
        "Use `aria-label` on the trigger when the visible label is not descriptive enough.",
        "Mark disabled branches with `data-r8-disabled=\"true\"` to preserve keyboard semantics.",
        "Keep searchable instances with a labeled `r8-cascader__input` for screen-reader clarity.",
        "When you choose a last-level-only trigger display, keep extra context in nearby visible copy around the field.",
      ],
    ),
    api: [
      {
        name: "data-r8-expand-trigger",
        description: l("Switches expansion between clique and hover.", "Switches expansion between click and hover."),
      },
      {
        name: "data-r8-check-strictly",
        description: l("Allows selecting parent nós instead of leaves only.", "Allows selecting parent nodes instead of leaves only."),
      },
      {
        name: "data-r8-show-all-levels / data-r8-filter-placeholder",
        description: l(
          "Controla se o acionador mostra o caminho inteiro ou só o último nível, e permite ajustar o placeholder do filtro gerado pelo runtime.",
          "Controls whether the trigger shows the full path or only the last level, and lets you tune the placeholder of the runtime-generated filter input.",
        ),
      },
      {
        name: "r8:cascader-change",
        description: l("Emits the final value, rótulos and full path after selection.", "Emits the final value, labels and full path after selection."),
      },
      {
        name: "r8:cascader-clear",
        description: l("Emits an vazio dados do evento when the current selection is cleared.", "Emits an empty payload when the current selection is cleared."),
      },
    ],
  },
  {
    id: "checkbox",
    name: "Checkbox",
    group: "form",
    summary: l(
      "Caixa de seleção com estado marcado, desmarcado ou misto, tamanhos e borda opcional.",
      "Checkbox with checked, unchecked, and mixed states, size options, and an optional border.",
    ),
    classes: [
      "r8-checkbox",
      "r8-checkbox__box",
      "r8-checkbox--sm",
      "r8-checkbox--lg",
      "r8-checkbox--bordered",
      "is-checked",
      "is-indeterminate",
    ],
    preview: `<div class="r8-stack">
  <label class="r8-checkbox is-checked">
    <span class="r8-checkbox__box" aria-hidden="true"></span>
    <span>Enable scanlines</span>
  </label>
  <label class="r8-checkbox" data-r8-border="true" data-r8-indeterminate="true" aria-checked="mixed">
    <span class="r8-checkbox__box" aria-hidden="true"></span>
    <span>Sync selected modules only</span>
  </label>
  <label class="r8-checkbox" data-r8-size="lg" aria-disabled="true">
    <span class="r8-checkbox__box" aria-hidden="true"></span>
    <span>Locked by mission policy</span>
  </label>
</div>`,
    code: `<label
  class="r8-checkbox"
  data-r8-size="lg"
  data-r8-border="true"
  data-r8-indeterminate="true"
  aria-checked="mixed"
  aria-label="Partial module selection"
>
  <span class="r8-checkbox__box" aria-hidden="true"></span>
  <span>Sync selected modules only</span>
</label>`,
    anatomy: ll(
      [
        "`r8-checkbox` é o elemento clicável que recebe estado, foco e os auxiliares declarativos do componente.",
        "`r8-checkbox__box` desenha a caixa pixelada, o checkmark e a barra do estado misto.",
        "O texto ao lado do box funciona como rótulo visível e ajuda a ampliar a área de clique.",
        "`data-r8-indeterminate=\"true\"` e `aria-checked=\"mixed\"` comunicam seleção parcial sem inventar marcação extra.",
        "`data-r8-size` e `data-r8-border` ajustam footprint e estrutura visual sem trocar a estrutura base.",
      ],
      [
        "`r8-checkbox` is the clickable host that receives state, focus, and the component's declarative helpers.",
        "`r8-checkbox__box` draws the pixel box, the checkmark, and the mixed-state dash.",
        "The text beside the box acts as the visible label and enlarges the click target.",
        "`data-r8-indeterminate=\"true\"` plus `aria-checked=\"mixed\"` communicate partial selection without extra markup.",
        "`data-r8-size` and `data-r8-border` adjust footprint and shell styling without changing the base structure.",
      ],
    ),
    accessibility: ll(
      [
        "Mantenha texto visível ou `aria-label` quando o texto ao lado do controle não explicar a ação sozinho.",
        "Use `aria-checked=\"mixed\"` apenas para estados parciais, como um parent controle que resume um grupo.",
        "Em hosts não nativos, prefira `aria-disabled=\"true\"` para expor bloqueio sem perder semântica.",
        "Se o estado precisar participar de submit HTML tradicional, espelhe o valor em um input nativo ou hidden controlado pela aplicação hospedeira.",
      ],
      [
        "Keep visible text or an `aria-label` when the copy beside the control does not fully explain the action.",
        "Use `aria-checked=\"mixed\"` only for partial states, such as a parent control summarizing a group.",
        "On non-native hosts, prefer `aria-disabled=\"true\"` so the blocked state remains semantic.",
        "If the state must participate in traditional HTML form submission, mirror it into a native or hidden input controlled by the host application.",
      ],
    ),
    api: [
      {
        name: "r8-checkbox / r8-checkbox__box",
        description: l(
          "Root clicável e caixa visual que sustentam o estado binário sem depender de contêineres extras.",
          "Clickable root and visual box that carry the binary state without extra wrappers.",
        ),
      },
      {
        name: "r8-checkbox--sm / --lg / --bordered",
        description: l(
          "Modificadores para reduzir, ampliar ou envolver o controle em uma estrutura com borda sem trocar a marcação base.",
          "Modifiers for compact, large, or bordered treatments without replacing the base markup.",
        ),
      },
      {
        name: "data-r8-size / data-r8-border / data-r8-indeterminate",
        description: l(
          "Auxiliares declarativos para tamanho, estrutura com borda e estado misto antes da primeira interação do usuário.",
          "Declarative helpers for size, bordered shell, and mixed state before the user's first interaction.",
        ),
      },
      {
        name: "aria-checked=\"mixed\" / aria-disabled=\"true\"",
        description: l(
          "Explicita estados parcial e desabilitado quando o elemento não é um input nativo.",
          "Makes partial and disabled states explicit when the host is not a native input.",
        ),
      },
      {
        name: "r8:binary-change",
        description: l(
          "Evento emitido quando o Checkbox muda de estado, incluindo o recorte de `indeterminate` no dados do evento.",
          "Event emitted when Checkbox changes state, including the `indeterminate` slice in the payload.",
        ),
      },
    ],
  },
  {
    id: "color-picker",
    name: "Color Picker",
    group: "form",
    summary: l(
      "Seletor de cores com paleta predefinida ou controles dinâmicos de matiz e transparência.",
      "Color selector with a preset palette or dynamic hue and optional transparency controls.",
    ),
    classes: [
      "r8-color-picker",
      "r8-color-picker__trigger",
      "r8-color-picker__display",
      "r8-color-picker__sample",
      "r8-color-picker__panel",
      "r8-color-picker__toolbar",
      "r8-color-picker__clear",
      "r8-color-picker__swatches",
      "r8-color-picker__swatch",
      "r8-color-picker__workspace",
      "r8-color-picker__dynamic-shell",
      "r8-color-picker__spectrum",
      "r8-color-picker__channel",
      "r8-color-picker__input",
      "r8-color-picker__confirm",
    ],
    preview: `<div class="docs-demo__stack docs-demo__stack--color-picker">
  <div
    class="r8-color-picker"
    data-r8-clearable="true"
    data-r8-placeholder="Pick accent color"
  >
    <button class="r8-color-picker__trigger" type="button" aria-label="Pick accent color">
      <span class="r8-color-picker__display">
        <span class="r8-color-picker__sample" data-r8-color-sample aria-hidden="true"></span>
        <span data-r8-choice-display>#2563eb</span>
      </span>
      <span class="r8-choice__caret" aria-hidden="true">&gt;</span>
    </button>
    <div class="r8-color-picker__panel" hidden>
      <div class="r8-color-picker__toolbar">
        <p class="r8-text r8-text--xs r8-text--muted">Core palette</p>
        <button class="r8-color-picker__clear r8-btn r8-btn--sm r8-btn--secondary" type="button">Clear</button>
      </div>
      <div class="r8-color-picker__swatches">
        <div class="r8-color-picker__swatch is-selected" data-r8-value="#2563eb" aria-label="Primary blue" style="background-color:#2563eb;"></div>
        <div class="r8-color-picker__swatch" data-r8-value="#64748b" aria-label="Slate" style="background-color:#64748b;"></div>
        <div class="r8-color-picker__swatch" data-r8-value="#7c3aed" aria-label="Violet" style="background-color:#7c3aed;"></div>
        <div class="r8-color-picker__swatch" data-r8-value="#16a34a" aria-label="Green" style="background-color:#16a34a;"></div>
        <div class="r8-color-picker__swatch" data-r8-value="#0891b2" aria-label="Cyan" style="background-color:#0891b2;"></div>
        <div class="r8-color-picker__swatch" data-r8-value="#dc2626" aria-label="Red" style="background-color:#dc2626;"></div>
      </div>
    </div>
  </div>

  <div
    class="r8-color-picker"
    data-r8-mode="dynamic"
    data-r8-clearable="true"
    data-r8-size="lg"
    data-r8-value="#409eff"
    data-r8-placeholder="Pick any accent"
  >
    <button class="r8-color-picker__trigger" type="button" aria-label="Pick any accent">
      <span class="r8-color-picker__display">
        <span class="r8-color-picker__sample" data-r8-color-sample aria-hidden="true"></span>
        <span data-r8-choice-display>#409eff</span>
      </span>
      <span class="r8-choice__caret" aria-hidden="true">&gt;</span>
    </button>
    <div class="r8-color-picker__panel" hidden></div>
  </div>
</div>`,
    code: `<div
  class="r8-color-picker"
  data-r8-mode="dynamic"
  data-r8-clearable="true"
  data-r8-size="lg"
  data-r8-show-alpha="true"
  data-r8-value="rgba(64, 158, 255, 0.82)"
  data-r8-placeholder="Pick accent color"
>
  <button class="r8-color-picker__trigger" type="button" aria-label="Pick accent color">
    <span class="r8-color-picker__display">
      <span class="r8-color-picker__sample" data-r8-color-sample aria-hidden="true"></span>
      <span data-r8-choice-display>rgba(64, 158, 255, 0.82)</span>
    </span>
    <span class="r8-choice__caret" aria-hidden="true">&gt;</span>
  </button>

  <div class="r8-color-picker__panel" hidden></div>
</div>`,
    anatomy: ll(
      [
        "`r8-color-picker` continua sendo a estrutura único do componente, agora com `data-r8-mode=\"fixed\"` para amostras de cor ou `data-r8-mode=\"dynamic\"` para o seletor livre.",
        "`r8-color-picker__trigger` é a superfície clicável que abre o painel e espelha o valor atual no estado fechado.",
        "`r8-color-picker__display` combina amostra visual e valor textual sem precisar improvisar badges soltas.",
        "No modo fixo, `r8-color-picker__toolbar`, `r8-color-picker__clear`, `r8-color-picker__swatches` e `r8-color-picker__swatch` organizam presets curados.",
        "No modo dinâmico, `r8-color-picker__workspace`, `r8-color-picker__spectrum`, `r8-color-picker__channel`, `r8-color-picker__input` e `r8-color-picker__confirm` montam o fluxo de arraste, input e confirmação.",
      ],
      [
        "`r8-color-picker` stays the single shell for the component, now with `data-r8-mode=\"fixed\"` for swatches or `data-r8-mode=\"dynamic\"` for the free picker.",
        "`r8-color-picker__trigger` is the clickable surface that opens the panel and mirrors the current value in the closed state.",
        "`r8-color-picker__display` combines the visual sample and the textual value so you do not need loose badges.",
        "In fixed mode, `r8-color-picker__toolbar`, `r8-color-picker__clear`, `r8-color-picker__swatches`, and `r8-color-picker__swatch` organize curated presets.",
        "In dynamic mode, `r8-color-picker__workspace`, `r8-color-picker__spectrum`, `r8-color-picker__channel`, `r8-color-picker__input`, and `r8-color-picker__confirm` build the drag, input, and confirmation flow.",
      ],
    ),
    accessibility: ll(
      [
        "Mantenha `aria-label` ou um texto visível forte no acionador para explicar o contexto da cor escolhida.",
        "Cada swatch deve ter `aria-label` descritivo quando a diferenca entre as opções não puder ser entendida só pela cor.",
        "No modo dinâmico, preserve o valor textual e o input para que a escolha não dependa apenas do painel visual visual.",
        "Use `data-r8-show-alpha` com valor textual visível para não depender apenas da transparencia como significado.",
        "Se a cor final precisar entrar em submit HTML, espelhe `data-r8-value` em um input real controlado pela aplicação hospedeira.",
      ],
      [
        "Keep an `aria-label` or strong visible trigger text so the chosen color has context beyond the swatch alone.",
        "Each swatch should carry a descriptive `aria-label` when options cannot be understood by color alone.",
        "In dynamic mode, keep the textual value and input visible so the choice does not rely on the visual board alone.",
        "Use `data-r8-show-alpha` together with a visible textual value so transparency is not the only carrier of meaning.",
        "If the final color must participate in HTML form submission, mirror `data-r8-value` into a real input controlled by the host app.",
      ],
    ),
    api: [
      {
        name: "r8-color-picker__display / r8-color-picker__sample",
        description: l(
          "Par visual para mostrar a cor atual com texto legível e uma amostra pequena dentro do acionador.",
          "Visual pair for showing the current color with readable text and a compact sample inside the trigger.",
        ),
      },
      {
        name: "data-r8-mode / data-r8-clearable / data-r8-placeholder",
        description: l(
          "Escolhe entre a paleta fixa e o seletor dinâmico, liga a ação de limpar e define qual texto volta para o acionador quando nenhuma cor estiver ativa.",
          "Chooses between the fixed palette and the dynamic picker, enables the clear action, and defines which copy returns to the trigger when no color is active.",
        ),
      },
      {
        name: "data-r8-size / data-r8-show-alpha",
        description: l(
          "Controlam densidade do acionador e do painel, além do alpha slider no modo dinâmico e do checkerboard nas amostras translucidas.",
          "Control trigger and panel density, plus the alpha slider in dynamic mode and checkerboard treatment for translucent samples.",
        ),
      },
      {
        name: "r8-color-picker__toolbar / r8-color-picker__workspace / r8-color-picker__clear",
        description: l(
          "Organizam tanto os presets fixos quanto o workspace dinâmico sem precisar criar contêineres paralelos fora do painel.",
          "Organize both the fixed presets and the dynamic workspace without parallel wrappers outside the panel.",
        ),
      },
      {
        name: "r8:color-active-change / r8:color-change / r8:color-clear",
        description: l(
          "Eventos dedicados para prévia ativo, confirmação final e reset, além do fallback genérico `r8:choice-change`.",
          "Dedicated events for active preview, final confirmation, and reset, alongside the generic `r8:choice-change` fallback.",
        ),
      },
    ],
  },
  {
    id: "date-picker",
    name: "Date Picker",
    group: "form",
    summary: l(
      "Seletor de data com idioma configurável, atalhos e exibição opcional do número da semana.",
      "Date selector with configurable locale, shortcuts, and optional week numbers.",
    ),
    classes: [
      "r8-date-picker",
      "r8-date-picker__trigger",
      "r8-date-picker__panel",
      "r8-date-picker__calendar",
      "r8-date-picker__shortcuts",
      "r8-date-picker__shortcut",
      "r8-date-picker__header",
      "r8-date-picker__weekdays",
      "r8-date-picker__week-number",
      "r8-date-picker__grid",
      "r8-date-picker__day",
      "r8-date-picker__footer",
    ],
    preview: `<div class="docs-demo__stack docs-demo__stack--date-picker">
  <div
    class="r8-date-picker"
    data-r8-value="2026-03-28"
    data-r8-month="2026-03"
    data-r8-placeholder="Select launch date"
    data-r8-shortcuts="today,yesterday,week-ago"
    data-r8-show-week-number="true"
    data-r8-week-start="1"
    data-r8-min="2026-03-05"
    data-r8-max="2026-04-18"
  >
    <button class="r8-date-picker__trigger" type="button" aria-label="Select launch date">
      <span data-r8-choice-display>Select launch date</span>
      <span class="r8-badge r8-badge--info">Mon start</span>
    </button>
    <div class="r8-date-picker__panel"></div>
  </div>
</div>`,
    code: `<div
  class="r8-date-picker"
  data-r8-value="2026-03-28"
  data-r8-month="2026-03"
  data-r8-placeholder="Select launch date"
  data-r8-locale="en-US"
  data-r8-week-start="1"
  data-r8-shortcuts="today,yesterday,week-ago"
  data-r8-show-week-number="true"
  data-r8-min="2026-03-05"
  data-r8-max="2026-04-18"
>
  <button class="r8-date-picker__trigger" type="button" aria-label="Select launch date">
    <span data-r8-choice-display>Select launch date</span>
    <span class="r8-badge r8-badge--info">Mon start</span>
  </button>
  <div class="r8-date-picker__panel"></div>
</div>`,
    anatomy: ll(
      [
        "`r8-date-picker` agrupa acionador e popup calendar em uma estrutura único para seleção de datas.",
        "`r8-date-picker__trigger` é a superfície clicável que espelha o rótulo final formatado pelo runtime.",
        "`r8-date-picker__shortcuts` e `r8-date-picker__shortcut` criam atalhos recorrentes no topo do calendário sem contêineres extras.",
        "`r8-date-picker__week-number`, quando ativado, adiciona contexto semanal sem interferir na grade principal de dias.",
        "`r8-date-picker__footer` fecha o fluxo com resumo da data atual e ações de hoje/limpeza.",
      ],
      [
        "`r8-date-picker` groups the trigger and popup calendar into a single shell for date selection.",
        "`r8-date-picker__trigger` is the clickable surface that mirrors the final label formatted by the runtime.",
        "`r8-date-picker__shortcuts` and `r8-date-picker__shortcut` create recurring shortcut actions at the top of the calendar without extra wrappers.",
        "`r8-date-picker__week-number`, when enabled, adds weekly context without interfering with the main day grid.",
        "`r8-date-picker__footer` closes the flow with the current date summary and today/clear actions.",
      ],
    ),
    accessibility: ll(
      [
        "Use `aria-label` forte no acionador quando o contexto da data não estiver evidente no texto ao redor.",
        "Mantenha o valor textual visível no acionador para não depender apenas da posição visual dentro do calendário.",
        "Atalhos devem usar rótulos claras, porque eles aparecem como ações e não como dias na grade.",
        "Se a data fizer parte de submit HTML, espelhe `data-r8-value` em um input real controlado pela aplicação.",
      ],
      [
        "Use a strong `aria-label` on the trigger when the date context is not already obvious in nearby copy.",
        "Keep the textual value visible in the trigger so the choice does not rely only on the visual calendar position.",
        "Shortcuts should use clear labels because they appear as actions rather than days inside the grid.",
        "If the date must participate in HTML form submission, mirror `data-r8-value` into a real input controlled by the host app.",
      ],
    ),
    api: [
      {
        name: "data-r8-locale / data-r8-week-start",
        description: l(
          "Controlam a linguagem dos rótulos e o dia inicial da semana sem acoplar o componente a um framework.",
          "Control label language and which day starts the week without coupling the component to a framework.",
        ),
      },
      {
        name: "data-r8-shortcuts / r8-date-picker__shortcut",
        description: l(
          "Geram atalhos declarativos no topo do painel para saltar a datas recorrentes como hoje, ontem e uma semana atrás.",
          "Generate declarative shortcuts at the top of the panel for recurring dates such as today, yesterday, and a week ago.",
        ),
      },
      {
        name: "data-r8-show-week-number / r8-date-picker__week-number",
        description: l(
          "Adicionam o contexto de planejamento semanal sem mudar a lógica principal de seleção de dia.",
          "Add weekly planning context without changing the main day-selection logic.",
        ),
      },
      {
        name: "data-r8-min / data-r8-max / data-r8-month",
        description: l(
          "Limitam o intervalo disponível e definem o mês inicialmente visível quando o popup abre.",
          "Limit the available range and define the initially visible month when the popup opens.",
        ),
      },
      {
        name: "r8:date-change",
        description: l(
          "Evento emitido quando a data muda, incluindo o valor de armazenamento e o rótulo formatado.",
          "Event emitted when the date changes, including the storage value and formatted label.",
        ),
      },
    ],
  },
  {
    id: "datetime-picker",
    name: "DateTime Picker",
    group: "form",
    summary: l(
      "Seletor de data e hora com limites configuráveis e intervalos de tempo em minutos.",
      "Date and time selector with configurable bounds and time intervals in minutes.",
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
      "Estrutura de formulário com campos, rótulos, textos de ajuda, validação visual e área de ações.",
      "Form structure with fields, labels, help text, validation styles, and an actions area.",
    ),
    classes: ["r8-form", "r8-form__row", "r8-form__item", "r8-form__label", "r8-form__help", "r8-form__actions"],
    preview: `<form class="r8-form">
  <div class="r8-form__row">
    <label class="r8-form__item">
      <span class="r8-form__label">Pilot email</span>
      <input class="r8-input" type="email" value="pilot@retro8.dev" />
      <span class="r8-form__help">Use the monitored inbox for alerts.</span>
    </label>
    <label class="r8-form__item">
      <span class="r8-form__label">Access code</span>
      <input class="r8-input" type="password" value="retro-88" />
      <span class="r8-form__help">Rotate this secret every mission.</span>
    </label>
  </div>
  <div class="r8-form__row">
    <label class="r8-form__item">
      <span class="r8-form__label">Role</span>
      <div class="r8-select" data-r8-value="explorer">
        <button class="r8-select__trigger" type="button">
          <span data-r8-choice-display>Explorer</span>
          <span class="r8-choice__caret" aria-hidden="true">&gt;</span>
        </button>
        <div class="r8-select__menu" hidden>
          <button class="r8-select__option" type="button" data-r8-value="engineer">Engineer</button>
          <button class="r8-select__option" type="button" data-r8-value="medic">Medic</button>
          <button class="r8-select__option is-selected" type="button" data-r8-value="explorer">Explorer</button>
        </div>
      </div>
      <span class="r8-form__help">Pick who owns this route.</span>
    </label>
    <div class="r8-form__item">
      <p class="r8-form__legend">Readiness</p>
      <div class="r8-rate" role="radiogroup" aria-label="Readiness">
        <span class="r8-rate__item is-active" role="radio" aria-checked="true">*</span>
        <span class="r8-rate__item is-active" role="radio" aria-checked="true">*</span>
        <span class="r8-rate__item is-active" role="radio" aria-checked="true">*</span>
        <span class="r8-rate__item" role="radio" aria-checked="false">*</span>
        <span class="r8-rate__item" role="radio" aria-checked="false">*</span>
      </div>
      <span class="r8-form__help">Quick confidence score before submit.</span>
    </div>
  </div>
  <div class="r8-form__row">
    <div class="r8-form__item" data-r8-radio-group>
      <p class="r8-form__legend">Sync mode</p>
      <div class="r8-stack">
        <label class="r8-radio is-checked" data-r8-value="online">
          <span class="r8-radio__box" aria-hidden="true"></span>
          <span>Online</span>
        </label>
        <label class="r8-radio" data-r8-value="offline">
          <span class="r8-radio__box" aria-hidden="true"></span>
          <span>Offline</span>
        </label>
      </div>
    </div>
    <div class="r8-form__item">
      <p class="r8-form__legend">Agreement</p>
      <label class="r8-checkbox is-checked">
        <span class="r8-checkbox__box" aria-hidden="true"></span>
        <span>Allow scheduled notifications</span>
      </label>
    </div>
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
      "Campos de texto, e-mail, senha, número e texto multilinha, com controles opcionais de limpeza e contagem.",
      "Text, email, password, number, and multiline fields with optional clearing and character counts.",
    ),
    classes: [
      "r8-field",
      "r8-field--inline",
      "r8-label",
      "r8-help",
      "r8-input-shell",
      "r8-input",
      "r8-input__prefix",
      "r8-input__suffix",
      "r8-input__actions",
      "r8-input__clear",
      "r8-input__toggle",
      "r8-input__count",
      "r8-input--invalid",
    ],
    preview: `<div class="docs-demo__stack docs-demo__stack--input">
  <label class="r8-field">
    <span class="r8-label">Pilot name</span>
    <div class="r8-input-shell" data-r8-clearable="true" data-r8-word-limit="true">
      <span class="r8-input__prefix">@</span>
      <input class="r8-input" type="text" value="PIX-07 Vanguard" maxlength="18" placeholder="Enter callsign" />
    </div>
    <span class="r8-help">Clear and live count come from the optional shell runtime.</span>
  </label>
  <label class="r8-field">
    <span class="r8-label">Pilot email</span>
    <div class="r8-input-shell" data-r8-clearable="true">
      <input class="r8-input" type="email" value="pilot@retro8.dev" placeholder="pilot@retro8.dev" />
    </div>
  </label>
  <label class="r8-field">
    <span class="r8-label">Access code</span>
    <div class="r8-input-shell" data-r8-show-password="true">
      <input class="r8-input" type="password" value="retro-88" placeholder="Enter access code" />
    </div>
  </label>
  <label class="r8-field">
    <span class="r8-label">Crew count</span>
    <div class="r8-input-shell" data-r8-clearable="true">
      <input class="r8-input" type="number" min="0" max="12" step="1" value="7" placeholder="Enter quantity" />
    </div>
  </label>
  <label class="r8-field">
    <span class="r8-label">Mission notes</span>
    <textarea class="r8-input" data-r8-autosize="true" data-r8-min-rows="3" data-r8-max-rows="6" maxlength="96" placeholder="No anomalies detected.">No anomalies detected. Keep scanners warm and confirm route once the console sync finishes.</textarea>
  </label>
</div>`,
    code: `<label class="r8-field">
  <span class="r8-label">Pilot name</span>
  <div class="r8-input-shell" data-r8-clearable="true" data-r8-word-limit="true">
    <span class="r8-input__prefix">@</span>
    <input class="r8-input" type="text" maxlength="18" placeholder="Enter callsign" value="PIX-07 Vanguard" />
  </div>
  <span class="r8-help">Clear and live count come from the optional shell runtime.</span>
</label>

<label class="r8-field">
  <span class="r8-label">Pilot email</span>
  <div class="r8-input-shell" data-r8-clearable="true">
    <input class="r8-input" type="email" placeholder="pilot@retro8.dev" value="pilot@retro8.dev" />
  </div>
</label>

<label class="r8-field">
  <span class="r8-label">Access code</span>
  <div class="r8-input-shell" data-r8-show-password="true">
    <input class="r8-input" type="password" placeholder="Enter access code" value="retro-88" />
  </div>
</label>

<label class="r8-field">
  <span class="r8-label">Crew count</span>
  <div class="r8-input-shell" data-r8-clearable="true">
    <input class="r8-input" type="number" min="0" max="12" step="1" value="7" />
  </div>
</label>

<label class="r8-field">
  <span class="r8-label">Mission notes</span>
  <textarea class="r8-input" data-r8-autosize="true" data-r8-min-rows="3" data-r8-max-rows="6" maxlength="96">No anomalies detected.</textarea>
</label>`,
    anatomy: ll(
      [
        "`r8-input` continua sendo a superfície base para texto, email, senha, number, select e textarea.",
        "`r8-input-shell` envolve o campo quando ele precisa de prefixo, sufixo, limpeza, contador ou alternância de senha.",
        "`r8-input__prefix` e `r8-input__suffix` adicionam contexto curto sem trocar a semântica do input nativo.",
        "`r8-input__actions` agrupa limpeza, alternância e contador no lado direito da estrutura.",
        "`data-r8-autosize` deixa o textarea crescer com o conteúdo sem um layout extra de framework.",
      ],
      [
        "`r8-input` remains the base surface for text, email, password, number, select, and textarea fields.",
        "`r8-input-shell` wraps the field when it needs prefix, suffix, clear, counting, or password reveal actions.",
        "`r8-input__prefix` and `r8-input__suffix` add small context cues without changing the native input semantics.",
        "`r8-input__actions` groups clear, reveal, and count affordances on the right side of the shell.",
        "`data-r8-autosize` lets the textarea grow with its content without a framework-specific layout layer.",
      ],
    ),
    accessibility: ll(
      [
        "Mantenha `label` ou `aria-label` forte no campo, porque limpeza e alternância sao ações auxiliares e não substituem o nome acessível principal.",
        "Se usar contador, combine `maxlength` com texto de ajuda para que o limite não apareca só como número solto.",
        "No modo senha, deixe o contexto do segredo claro no rótulo para que a alternância não fique ambiguo para teclado e leitores de tela.",
        "Autosize melhora leitura, mas ainda vale limitar `max-rows` em blocos longos para o layout não crescer sem controle.",
      ],
      [
        "Keep a strong `label` or `aria-label` on the field because clear and reveal are helper actions, not the main accessible name.",
        "When using a counter, pair `maxlength` with nearby help text so the limit does not appear as a stray number.",
        "In password mode, make the secret context clear in the label so the toggle stays understandable to keyboard and screen-reader users.",
        "Autosize improves reading, but it still helps to cap `max-rows` on longer blocks so the layout does not grow without control.",
      ],
    ),
    api: [
      {
        name: "r8-input-shell / r8-input__prefix / r8-input__suffix",
        description: l(
          "Montam uma estrutura opcional para adornos curtos e ações auxiliares sem trocar o input nativo.",
          "Build an optional shell for short adornments and helper actions without replacing the native input.",
        ),
      },
      {
        name: "data-r8-clearable / r8-input__clear",
        description: l(
          "Mostram um botão de limpeza quando o campo tem valor e a estrutura estiver habilitado para isso.",
          "Show a clear button when the field has a value and the shell is configured for it.",
        ),
      },
      {
        name: "data-r8-show-password / r8-input__toggle",
        description: l(
          "Ativam a alternância declarativo de senha para alternar entre texto oculto e visível.",
          "Enable a declarative password toggle so the field can switch between hidden and visible text.",
        ),
      },
      {
        name: "data-r8-word-limit / r8-input__count",
        description: l(
          "Exibem o contador na estrutura quando `maxlength` estiver presente no input ou textarea.",
          "Display a live counter inside the shell when `maxlength` is present on the input or textarea.",
        ),
      },
      {
        name: "data-r8-autosize / data-r8-min-rows / data-r8-max-rows",
        description: l(
          "Controlam o crescimento automático do textarea sem depender de JS externo da aplicação.",
          "Control textarea autosizing without depending on extra app-side JavaScript.",
        ),
      },
    ],
  },
  {
    id: "input-otp",
    name: "Input OTP",
    group: "form",
    summary: l(
      "Entrada de código numérico com campos individuais, navegação por teclado e suporte à colagem do código completo.",
      "Numeric code input with individual digit fields, keyboard navigation, and full-code paste support.",
    ),
    classes: ["r8-input-otp", "r8-input-otp__slot", "r8-input-otp__separator", "is-complete", "is-disabled"],
    preview: `<div class="r8-input-otp" data-r8-otp-length="6" aria-label="Verification code"></div>`,
    code: `<div class="docs-demo__stack">
  <div class="r8-input-otp" data-r8-otp-length="4" aria-label="4 digit code"></div>
  <div class="r8-input-otp" data-r8-otp-length="6" data-r8-size="sm" aria-label="6 digit code"></div>
  <div class="r8-input-otp" data-r8-otp-length="8" data-r8-size="lg" data-r8-otp-mask="true" aria-label="8 digit code"></div>
</div>`,
    anatomy: ll(
      [
        "`r8-input-otp` é o contêiner raiz dos campos e controla tamanho, estado desabilitado e comprimento esperado.",
        "`r8-input-otp__slot` representa cada dígito do código e aceita digitacao, navegação por setas e foco automático.",
        "`r8-input-otp__separator` e opcional para agrupar visualmente blocos como 3+3 ou 4+4 sem quebrar o runtime.",
        "Com `data-r8-otp-length`, o runtime pode gerar os campos automaticamente para 4, 6 ou 8 dígitos.",
      ],
      [
        "`r8-input-otp` is the root wrapper for slots and controls size, disabled state, and expected length.",
        "`r8-input-otp__slot` represents each code digit and supports typing, arrow navigation, and automatic focus movement.",
        "`r8-input-otp__separator` is optional for visually grouping chunks such as 3+3 or 4+4 without breaking runtime behavior.",
        "With `data-r8-otp-length`, the runtime can auto-generate slots for 4, 6, or 8 digits.",
      ],
    ),
    accessibility: ll(
      [
        "Defina `aria-label` ou `label` claro no contêiner para indicar o contexto do código (login, 2FA, validação etc.).",
        "Mantenha cada slot com `maxlength=\"1\"` para preservar o fluxo de teclado e evitar ambiguidade de leitura.",
        "Quando o código for sensivel, use `data-r8-otp-mask=\"true\"` e evite expor o valor completo em texto próximo.",
      ],
      [
        "Set a clear `aria-label` or linked `label` on the wrapper so the code context is explicit (login, 2FA, validation, etc.).",
        "Keep each slot at `maxlength=\"1\"` to preserve keyboard flow and avoid ambiguous screen-reader output.",
        "When the code is sensitive, use `data-r8-otp-mask=\"true\"` and avoid exposing the full value in nearby plain text.",
      ],
    ),
    api: [
      {
        name: "data-r8-otp-length",
        description: l(
          "Define comprimento esperado do OTP e gera campos automaticos para 4, 6 ou 8 dígitos.",
          "Defines the expected OTP length and auto-generates slots for 4, 6, or 8 digits.",
        ),
      },
      {
        name: "data-r8-size",
        description: l(
          "Escala dimensao dos campos em `sm`, `md` ou `lg` sem alterar a marcação base.",
          "Scales slot dimensions with `sm`, `md`, or `lg` without changing base markup.",
        ),
      },
      {
        name: "data-r8-otp-mask",
        description: l(
          "Alterna os campos para modo mascarado mantendo o fluxo de preenchimento e navegação.",
          "Toggles masked slot mode while preserving the fill and navigation flow.",
        ),
      },
      {
        name: "r8:input-otp-change / r8:input-otp-complete",
        description: l(
          "Eventos com valor atual e status de completude para sincronizar validação, submit e retorno visual.",
          "Events with current value and completion state for validation, submit flows, and feedback.",
        ),
      },
    ],
  },
  {
    id: "input-number",
    name: "Input Number",
    group: "form",
    summary: l(
      "Campo numérico com limites, precisão decimal, incrementos e controles laterais configuráveis.",
      "Numeric field with bounds, decimal precision, step alignment, and configurable side controls.",
    ),
    classes: ["r8-input-number", "r8-input-number__button", "r8-input-number__input"],
    preview: `<div class="r8-input-number" data-r8-step-strictly="true" data-r8-precision="2" data-r8-controls-position="right">
  <button class="r8-input-number__button" type="button">-</button>
  <input class="r8-input-number__input" type="number" aria-label="Quantity" min="0" max="12" step="0.25" value="3.5" />
  <button class="r8-input-number__button" type="button">+</button>
</div>`,
    code: `<div class="r8-input-number" data-r8-step-strictly="true" data-r8-precision="2" data-r8-controls-position="right">
  <button class="r8-input-number__button" type="button">-</button>
  <input class="r8-input-number__input" type="number" aria-label="Quantity" min="0" max="12" step="0.25" value="3.5" />
  <button class="r8-input-number__button" type="button">+</button>
</div>`,
    anatomy: ll(
      [
        "`r8-input-number` agrupa o campo nativo e os dois botões de incremento sem esconder a semântica numerica original.",
        "`r8-input-number__button` continua responsável pelos passos declarativos e pelos limites min/max.",
        "`r8-input-number__input` aceita digitacao manual e agora sincroniza melhor com precision e step strictly.",
        "`data-r8-controls-position=\"right\"` reorganiza os botões em uma coluna compacta, mais próxima do padrão de painéis densos.",
      ],
      [
        "`r8-input-number` groups the native field and both step buttons without hiding the original numeric semantics.",
        "`r8-input-number__button` still owns the declarative stepping and min/max limits.",
        "`r8-input-number__input` accepts manual typing and now syncs more cleanly with precision and step-strict alignment.",
        "`data-r8-controls-position=\"right\"` rearranges the buttons into a compact column that fits denser panels.",
      ],
    ),
    accessibility: ll(
      [
        "Preserve `min`, `max` e `step` no input nativo para que teclado e validação do browser continuem coerentes.",
        "Quando usar precision, combine isso com texto de ajuda se os incrementos não forem intuitivos no dominio do produto.",
        "Se o número tiver impacto crítico, prefira limites estreitos e mensagens auxiliares em vez de depender só do bloqueio do botão.",
      ],
      [
        "Preserve `min`, `max`, and `step` on the native input so keyboard behavior and browser validation stay coherent.",
        "When using precision, pair it with nearby help text if the increment is not obvious in the product domain.",
        "If the number is operationally sensitive, prefer tighter limits and helper copy instead of relying only on button blocking.",
      ],
    ),
    api: [
      {
        name: "min / max / step",
        description: l(
          "Continuam definindo o intervalo nativo do campo e o tamanho de cada incremento lateral.",
          "Still define the native field range and the size of each side-button increment.",
        ),
      },
      {
        name: "data-r8-precision",
        description: l(
          "Arredonda e formata o valor final com a quantidade declarativa de casas decimais.",
          "Rounds and formats the final value with a declarative number of decimal places.",
        ),
      },
      {
        name: "data-r8-step-strictly",
        description: l(
          "Alinha a digitacao manual e os cliques ao grid do step, aproximando o comportamento do recorte mais útil do Element Plus.",
          "Aligns manual typing and button clicks to the step grid, matching the most useful slice of the Element Plus behavior.",
        ),
      },
      {
        name: "data-r8-controls-position",
        description: l(
          "Move os botões para a lateral direita em uma coluna quando o layout pedir mais densidade.",
          "Moves the buttons into a right-side column when the layout needs a denser control.",
        ),
      },
    ],
  },
  {
    id: "input-tag",
    name: "Input Tag",
    group: "form",
    summary: l(
      "Entrada de etiquetas com limite opcional, separadores configuráveis e remoção por clique ou teclado.",
      "Tag input with optional limits, configurable separators, and removal by click or keyboard.",
    ),
    classes: [
      "r8-input-tag",
      "r8-input-tag__tag",
      "r8-input-tag__label",
      "r8-input-tag__remove",
      "r8-input-tag__clear",
      "r8-input-tag__input",
    ],
    preview: `<div class="r8-input-tag" data-r8-max-tags="5" data-r8-delimiters=",;" data-r8-clearable="true">
  <span class="r8-input-tag__tag"><span class="r8-input-tag__label">HUD</span><button class="r8-input-tag__remove" type="button" aria-label="Remove HUD">x</button></span>
  <span class="r8-input-tag__tag"><span class="r8-input-tag__label">PIXEL</span><button class="r8-input-tag__remove" type="button" aria-label="Remove PIXEL">x</button></span>
  <input class="r8-input-tag__input" type="text" placeholder="Add tag and press Enter" />
</div>`,
    code: `<div class="r8-input-tag" data-r8-max-tags="5" data-r8-delimiters=",;" data-r8-clearable="true">
  <span class="r8-input-tag__tag"><span class="r8-input-tag__label">HUD</span><button class="r8-input-tag__remove" type="button" aria-label="Remove HUD">x</button></span>
  <span class="r8-input-tag__tag"><span class="r8-input-tag__label">PIXEL</span><button class="r8-input-tag__remove" type="button" aria-label="Remove PIXEL">x</button></span>
  <input class="r8-input-tag__input" type="text" placeholder="Add tag and press Enter" />
</div>`,
    anatomy: ll(
      [
        "`r8-input-tag` continua sendo o container flexivel das chips e do input nativo para novas entradas.",
        "`r8-input-tag__label` separa o texto da tag do affordance de remoção, deixando o DOM mais claro do que a marcação anterior em string.",
        "`r8-input-tag__remove` remoção a chip focada e `r8-input-tag__clear` limpa o conjunto inteiro quando habilitado.",
        "`data-r8-delimiters` permite transformar listas coladas ou digitadas em varias tags sem sair do próprio campo.",
      ],
      [
        "`r8-input-tag` remains the flexible container for both chips and the native input used for new values.",
        "`r8-input-tag__label` separates chip text from the removal affordance, making the DOM clearer than the older string-based markup.",
        "`r8-input-tag__remove` removes the focused chip and `r8-input-tag__clear` clears the whole set when enabled.",
        "`data-r8-delimiters` lets pasted or typed lists become multiple tags without leaving the field.",
      ],
    ),
    accessibility: ll(
      [
        "Use placeholder curto e contextual, porque a ação principal continua sendo adicionar itens ao conjunto e não um campo de busca genérico.",
        "Cada botão de remoção deve manter `aria-label` com o valor da tag para não soar como varios `x` identicos.",
        "Quando limitar o total de tags, deixe esse contrato claro em texto de ajuda perto do campo.",
      ],
      [
        "Use a short, contextual placeholder because the main action is adding items to a set, not entering a generic search.",
        "Each removal button should keep an `aria-label` with the tag value so it does not sound like a row of identical `x` controls.",
        "When limiting the total number of tags, make that contract visible in nearby helper copy.",
      ],
    ),
    api: [
      {
        name: "data-r8-max-tags",
        description: l(
          "Limita o total de chips aceitas sem confundir esse teto com `maxlength` do input interno.",
          "Limits the total accepted chips without confusing that cap with the inner input `maxlength`.",
        ),
      },
      {
        name: "data-r8-delimiters",
        description: l(
          "Define caracteres como `,` e `;` para quebrar uma entrada em varias tags no Enter, na digitacao ou no paste.",
          "Defines characters such as `,` and `;` so a single entry can split into multiple tags on Enter, typing, or paste.",
        ),
      },
      {
        name: "data-r8-clearable / r8-input-tag__clear",
        description: l(
          "Mostram um botão de limpeza all no próprio campo quando houver tags para remover.",
          "Show a clear-all button inside the field when there are tags to remove.",
        ),
      },
      {
        name: "r8:input-tag-change",
        description: l(
          "Emite o conjunto atualizado de valores depois de adicionar, remover ou limpar tags.",
          "Emits the updated value set after adding, removing, or clearing tags.",
        ),
      },
    ],
  },
  {
    id: "radio",
    name: "Radio",
    group: "form",
    summary: l(
      "Controle de escolha única com indicador pixelado e estado selecionado visível.",
      "Single-choice control with a pixelated indicator and a visible selected state.",
    ),
    classes: ["r8-radio", "r8-radio__box"],
    preview: `<div class="r8-stack">
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
      "Controle de avaliação por estrelas com seleção por clique ou teclado.",
      "Star rating control with selection by click or keyboard.",
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
      "Lista de escolha com acionador compacto, painel de opções e navegação por teclado.",
      "Choice list with a compact trigger, options panel, and keyboard navigation.",
    ),
    classes: ["r8-select", "r8-select__trigger", "r8-select__menu", "r8-select__option"],
    anatomy: ll(
      ["O menu acompanha a largura do acionador; rótulos longos não alargam o campo e as opções rolam dentro do painel.", "O foco interno permanece visível pelo teclado, sem deslocar ou aumentar o controle."],
      ["The menu matches the trigger width; long labels do not widen the field and options scroll inside the panel.", "Inset keyboard focus stays visible without moving or enlarging the control."],
    ),
    preview: `<div class="docs-demo__stack docs-demo__stack--select">
  <div class="r8-select">
    <button class="r8-select__trigger" type="button">
      <span data-r8-choice-display>Explorer</span>
      <span class="r8-choice__caret" aria-hidden="true">&gt;</span>
    </button>
    <div class="r8-select__menu" hidden>
      <button class="r8-select__option" type="button" data-r8-value="engineer">Engineer</button>
      <button class="r8-select__option" type="button" data-r8-value="medic">Medic</button>
      <button class="r8-select__option is-selected" type="button" data-r8-value="explorer">Explorer</button>
    </div>
  </div>
</div>`,
    code: `<div class="r8-select">
  <button class="r8-select__trigger" type="button">
    <span data-r8-choice-display>Explorer</span>
    <span class="r8-choice__caret" aria-hidden="true">&gt;</span>
  </button>

  <div class="r8-select__menu" hidden>
    <button class="r8-select__option" type="button" data-r8-value="engineer">Engineer</button>
    <button class="r8-select__option" type="button" data-r8-value="medic">Medic</button>
    <button class="r8-select__option is-selected" type="button" data-r8-value="explorer">Explorer</button>
  </div>
</div>`,
  },
  {
    id: "slider",
    name: "Slider",
    group: "form",
    summary: l(
      "Controle deslizante de 0 a 100, com trilha pixelada e suporte a ponteiro e teclado.",
      "Slider from 0 to 100 with a pixelated track and pointer and keyboard support.",
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
      "Interruptor de dois estados com trilha colorida e indicador de posição.",
      "Two-state switch with a colored track and position indicator.",
    ),
    classes: ["r8-switch", "r8-switch__track", "r8-switch__thumb"],
    preview: `<div class="r8-stack">
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
    id: "theme-switch",
    name: "Theme Switch",
    group: "form",
    summary: l(
      "Interruptor com sol e lua que emite um evento para a aplicação aplicar o tema claro ou escuro.",
      "Sun-and-moon switch that emits a state event for the application to apply a light or dark theme.",
    ),
    classes: [
      "r8-theme-switch",
      "r8-theme-switch__glyph",
    ],
    preview: `<button class="r8-theme-switch is-checked" type="button" role="switch" aria-checked="true" aria-label="Toggle theme">
  <span class="r8-theme-switch__glyph" aria-hidden="true"></span>
</button>`,
    code: `<button id="theme-toggle" class="r8-theme-switch" type="button" role="switch" aria-checked="false" aria-label="Toggle theme">
  <span class="r8-theme-switch__glyph" aria-hidden="true"></span>
</button>

<script>
  document.querySelector("#theme-toggle").addEventListener("r8:binary-change", (event) => {
    document.documentElement.dataset.theme = event.detail.checked ? "dark" : "light";
  });
</script>`,
    anatomy: ll(
      ["O runtime alterna o estado do controle e emite `r8:binary-change`. A aplicação aplica o tema ao documento e salva a preferência, se necessário."],
      ["The runtime toggles the control and emits `r8:binary-change`. The application applies the document theme and saves the preference if needed."],
    ),
  },
  {
    id: "transfer",
    name: "Transfer",
    group: "form",
    summary: l(
      "Duas listas para selecionar e mover itens entre grupos por clique ou teclado.",
      "Two lists for selecting and moving items between groups by click or keyboard.",
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
    id: "upload",
    name: "Upload",
    group: "form",
    summary: l(
      "Seleção e prévia local de arquivos; validação e envio são responsabilidades da aplicação.",
      "Local file selection and previews; validation and network uploads are handled by the host application.",
    ),
    classes: [
      "r8-upload",
      "r8-upload--picture",
      "r8-upload--avatar",
      "r8-upload__toolbar",
      "r8-upload__copy",
      "r8-upload__title",
      "r8-upload__input",
      "r8-upload__dropzone",
      "r8-upload__tip",
      "r8-upload__list",
      "r8-upload__file",
      "r8-upload__thumb",
      "r8-upload__meta",
      "r8-upload__name",
      "r8-upload__details",
      "r8-upload__progress",
      "r8-upload__actions",
      "r8-upload__action",
    ],
    preview: `<div class="docs-demo__stack docs-demo__stack--upload">
  <div
    class="r8-upload"
    accept=".png,.jpg,.jpeg,.zip"
    multiple
    data-r8-upload-preview-label="Preview"
    data-r8-upload-remove-label="Remove"
    data-r8-upload-selected-label="Selected"
  >
    <div class="r8-upload__toolbar">
      <div class="r8-upload__copy">
        <strong class="r8-upload__title">Mission assets</strong>
        <span class="r8-upload__tip">PNG, JPG or ZIP up to 8 MB. The host app validates and sends files.</span>
      </div>
      <input class="r8-upload__input" type="file" accept=".png,.jpg,.jpeg,.zip" multiple />
      <button class="r8-btn r8-btn--sm r8-btn--primary" data-r8-upload-trigger="button" type="button">Choose files</button>
    </div>
    <div class="r8-upload__dropzone" role="button" tabindex="0">
      <strong>Drop files here</strong>
      <span class="r8-text r8-text--sm r8-text--muted">Drop files here or use the file chooser.</span>
    </div>
    <div class="r8-upload__list">
      <div class="r8-upload__file" data-r8-upload-state="uploading" aria-busy="true" style="--r8-upload-progress: 72%;">
        <div class="r8-upload__thumb">PNG</div>
        <div class="r8-upload__meta">
          <strong class="r8-upload__name">hero-banner.png</strong>
          <div class="r8-upload__details">
            <span>2.4 MB</span>
            <span>Uploading</span>
          </div>
          <div class="r8-upload__progress"><span></span></div>
        </div>
        <div class="r8-upload__actions">
          <button class="r8-upload__action" type="button">Pause</button>
          <button class="r8-upload__action" data-r8-upload-action="remove" type="button">Remove</button>
        </div>
      </div>
      <div class="r8-upload__file" data-r8-upload-state="success" style="--r8-upload-progress: 100%;">
        <div class="r8-upload__thumb">ZIP</div>
        <div class="r8-upload__meta">
          <strong class="r8-upload__name">release-bundle.zip</strong>
          <div class="r8-upload__details">
            <span>18 MB</span>
            <span>Ready</span>
          </div>
        </div>
        <div class="r8-upload__actions">
          <button class="r8-upload__action" type="button">Preview</button>
          <button class="r8-upload__action" data-r8-upload-action="remove" type="button">Remove</button>
        </div>
      </div>
    </div>
  </div>

  <div class="r8-upload r8-upload--picture">
    <div class="r8-upload__list">
      <div class="r8-upload__file" data-r8-upload-state="success">
        <div class="r8-upload__thumb">ART</div>
        <div class="r8-upload__meta">
          <strong class="r8-upload__name">cover-art.png</strong>
          <div class="r8-upload__details">
            <span>512 KB</span>
            <span>Thumbnail list</span>
          </div>
        </div>
        <div class="r8-upload__actions">
          <button class="r8-upload__action" type="button">View</button>
        </div>
      </div>
      <div class="r8-upload__file" data-r8-upload-state="error" aria-invalid="true" style="--r8-upload-progress: 24%;">
        <div class="r8-upload__thumb">JPG</div>
        <div class="r8-upload__meta">
          <strong class="r8-upload__name">pilot-portrait.jpg</strong>
          <div class="r8-upload__details">
            <span>1.1 MB</span>
            <span>Retry needed</span>
          </div>
          <div class="r8-upload__progress"><span></span></div>
        </div>
        <div class="r8-upload__actions">
          <button class="r8-upload__action" type="button">Retry</button>
        </div>
      </div>
    </div>
  </div>
</div>`,
    code: `<div
  class="r8-upload"
  accept=".png,.jpg,.jpeg,.zip"
  multiple
  data-r8-upload-preview-label="Preview"
  data-r8-upload-remove-label="Remove"
  data-r8-upload-selected-label="Selected"
>
  <div class="r8-upload__toolbar">
    <div class="r8-upload__copy">
      <strong class="r8-upload__title">Mission assets</strong>
      <span class="r8-upload__tip">PNG, JPG or ZIP up to 8 MB. The host app validates and sends files.</span>
    </div>
    <input class="r8-upload__input" type="file" accept=".png,.jpg,.jpeg,.zip" multiple />
    <button class="r8-btn r8-btn--sm r8-btn--primary" data-r8-upload-trigger="button" type="button">Choose files</button>
  </div>
  <div class="r8-upload__dropzone" role="button" tabindex="0">
    <strong>Drop files here</strong>
    <span class="r8-text r8-text--sm r8-text--muted">Drop files here or use the file chooser.</span>
  </div>
  <div class="r8-upload__list">
    <div class="r8-upload__file" data-r8-upload-state="uploading" aria-busy="true" style="--r8-upload-progress: 72%;">
      <div class="r8-upload__thumb">PNG</div>
      <div class="r8-upload__meta">
        <strong class="r8-upload__name">hero-banner.png</strong>
        <div class="r8-upload__details">
          <span>2.4 MB</span>
          <span>Uploading</span>
        </div>
        <div class="r8-upload__progress"><span></span></div>
      </div>
      <div class="r8-upload__actions">
        <button class="r8-upload__action" type="button">Pause</button>
        <button class="r8-upload__action" data-r8-upload-action="remove" type="button">Remove</button>
      </div>
    </div>
  </div>
</div>`,
    anatomy: ll(
      [
        "`r8-upload` organiza acionador, dropzone, dicas e lista, mas continua deixando validação, input nativo e transporte na aplicação elemento.",
        "`r8-upload__toolbar`, `r8-upload__copy`, `r8-upload__title`, `r8-upload__tip` e `r8-upload__input` agrupam contexto, limite, input nativo escondido e o CTA para escolher itens.",
        "`r8-upload__dropzone` é a superfície clicável ou focável para drop, browse ou replace queue, com suporte visual a arraste ativo.",
        "`r8-upload__list` abriga os arquivos e pode virar grade com `r8-upload--picture` ou estrutura único com `r8-upload--avatar`.",
        "Cada `r8-upload__file` pode combinar `r8-upload__thumb`, `r8-upload__meta`, `r8-upload__details`, `r8-upload__progress` e `r8-upload__actions` para representar fila, sucesso, erro ou nova tentativa.",
      ],
      [
        "`r8-upload` organizes the trigger, dropzone, hints, and file list while keeping validation, native input, and transport in the host app.",
        "`r8-upload__toolbar`, `r8-upload__copy`, `r8-upload__title`, `r8-upload__tip`, and `r8-upload__input` group context, file limits, the hidden native input, and the primary choose-files CTA.",
        "`r8-upload__dropzone` is the clickable or focusable surface for drop, browse, or queue replacement, with visual support for active drag state.",
        "`r8-upload__list` holds the queued files and can switch to a thumbnail grid with `r8-upload--picture` or a single-image shell with `r8-upload--avatar`.",
        "Each `r8-upload__file` can combine `r8-upload__thumb`, `r8-upload__meta`, `r8-upload__details`, `r8-upload__progress`, and `r8-upload__actions` to represent queued, success, error, or retry states.",
      ],
    ),
    accessibility: ll(
      [
        "Conecte a dropzone a um `input[type=file]` real e use `aria-describedby` para anunciar formatos aceitos, limite e retorno visual de validação.",
        "Reflita indisponibilidade tanto no input nativo quanto na estrutura visual com `disabled` ou `aria-disabled=\"true\"`, evitando sugerir drop em um estado travado.",
        "Marque arquivos em envio com `aria-busy=\"true\"` e itens com falha usando `aria-invalid=\"true\"` ou `data-r8-upload-state=\"error\"`.",
        "Botões de prévia, nova tentativa e remoção precisam de rótulos claros e ordem de foco consistente para teclado e leitor de tela.",
      ],
      [
        "Connect the dropzone to a real `input[type=file]` and use `aria-describedby` so accepted formats, limits, and validation feedback are announced.",
        "Reflect unavailable state on both the native input and the visual shell with `disabled` or `aria-disabled=\"true\"`, so drag is not implied when locked.",
        "Mark uploading files with `aria-busy=\"true\"` and failed items with `aria-invalid=\"true\"` or `data-r8-upload-state=\"error\"`.",
        "Preview, retry, and remove buttons need explicit labels and a predictable focus order for keyboard and screen reader users.",
      ],
    ),
    api: [
      {
        name: "r8-upload / r8-upload--picture / r8-upload--avatar",
        description: l(
          "Estrutura base com variantes para lista linear, grade de miniaturas ou uploader de avatar em um único slot.",
          "Base shell with variants for linear lists, thumbnail grids, or a single-slot avatar uploader.",
        ),
      },
      {
        name: "r8-upload__toolbar / __copy / __title / __tip / __input",
        description: l(
          "Agrupam acionador, limite, input nativo escondido e mensagens auxiliares sem acoplar a lógica de envio ao estilo.",
          "Group the trigger, limits, hidden native input, and helper copy without coupling transfer logic to the styling layer.",
        ),
      },
      {
        name: "data-r8-drag-active / .is-active",
        description: l(
          "Expande a leitura do estado de dragover na estrutura para destacar a dropzone enquanto a aplicação hospedeira acompanha eventos de arraste.",
          "Surfaces dragover state on the shell so the dropzone can highlight while the host app tracks drag events.",
        ),
      },
      {
        name: "r8-upload__file + data-r8-upload-state",
        description: l(
          "Cada arquivo pode declarar `queued`, `uploading`, `success` ou `error`, combinando também `aria-busy` e `aria-invalid`.",
          "Each file can declare `queued`, `uploading`, `success`, or `error`, and can also pair that with `aria-busy` or `aria-invalid`.",
        ),
      },
      {
        name: "r8-upload__thumb / __meta / __progress / __actions",
        description: l(
          "Partes opcionais para miniaturas, metadados, progresso visual e ações como prévia, nova tentativa, pausa ou remoção.",
          "Optional parts for thumbnails, metadata, visual progress, and actions such as preview, retry, pause, or remove.",
        ),
      },
      {
        name: "data-r8-upload-preview-label / remove-label / selected-label",
        description: l(
          "Customiza os rótulos usados pelo runtime local para prévia, remoção e status selecionado quando a fila e renderizada automaticamente.",
          "Customizes the labels used by the local runtime for preview, remove, and selected status when the queue is rendered automatically.",
        ),
      },
      {
        name: "--r8-upload-*",
        description: l(
          "Propriedades CSS ajustam altura mínima, alça size, destaque local e progresso preenchido por arquivo.",
          "Custom properties tune minimum height, thumbnail size, local accent, and per-file filled progress.",
        ),
      },
    ],
  },
] satisfies CatalogEntry[];

const dataComponents = [
  {
    id: "avatar",
    name: "Avatar",
    group: "data",
    summary: l(
      "Avatar com texto, imagem e conteúdo alternativo quando a imagem não pode ser carregada.",
      "Avatar with text, an image, and fallback content when the image cannot be loaded.",
    ),
    classes: ["r8-avatar", "r8-avatar--sm", "r8-avatar--lg", "r8-avatar--round", "r8-avatar__fallback"],
    preview: `<div class="docs-demo__stack">
  <div class="r8-cluster">
    <span class="r8-avatar">PX</span>
    <span class="r8-avatar r8-avatar--lg">R8</span>
    <span class="r8-avatar r8-avatar--round" data-r8-avatar-fallback="P1">
      <img src="/imgs/p1.png" alt="Pilot one" />
    </span>
    <span class="r8-avatar r8-avatar--lg" data-r8-avatar-fallback="P2" data-r8-fit="contain">
      <img src="/imgs/p2.png" alt="Pilot two" />
    </span>
    <span class="r8-avatar r8-avatar--round" data-r8-avatar-fallback="ER">
      <img src="/missing-avatar.png" alt="Broken avatar example" />
    </span>
  </div>
</div>`,
    code: `<div class="r8-cluster">
  <span class="r8-avatar">PX</span>

  <span class="r8-avatar r8-avatar--round" data-r8-avatar-fallback="P1">
    <img src="/imgs/p1.png" alt="Pilot one" />
  </span>

  <span class="r8-avatar r8-avatar--lg" data-r8-avatar-fallback="P2" data-r8-fit="contain">
    <img src="/imgs/p2.png" alt="Pilot two" />
  </span>

  <span class="r8-avatar r8-avatar--round" data-r8-avatar-fallback="ER">
    <img src="/missing-avatar.png" alt="Broken avatar example" />
  </span>
</div>`,
    anatomy: ll(
      [
        "`r8-avatar` é o contêiner base para textos curtos, imagens internas e blocos de identidade com a mesma moldura pixelada.",
        "`r8-avatar--sm`, `r8-avatar--lg` e `r8-avatar--round` ajustam escala e shape sem mudar a marcação principal.",
        "Quando houver `<img>` interno, o runtime tenta exibir a mídia; se ela falhar ou vier vazia, usa `data-r8-avatar-fallback` com até 2 caracteres.",
        "`data-r8-fit` aplica `cover`, `contain`, `fill`, `none` ou `scale-down` para controlar como a imagem ocupa a moldura.",
      ],
      [
        "`r8-avatar` is the base wrapper for short text, inner images, and identity blocks with the same pixel frame.",
        "`r8-avatar--sm`, `r8-avatar--lg`, and `r8-avatar--round` adjust scale and shape without changing the core markup.",
        "When an inner `<img>` is present, the runtime tries to display it; if it fails or comes empty, it falls back to `data-r8-avatar-fallback` with up to 2 characters.",
        "`data-r8-fit` applies `cover`, `contain`, `fill`, `none`, or `scale-down` to control how the image fills the frame.",
      ],
    ),
    accessibility: ll(
      [
        "Forneca `alt` útil nas imagens de avatar quando elas carregarem informação relevante; se a foto for decorativa, deixe `alt=\"\"` e rotule o contexto ao redor.",
        "Use `data-r8-avatar-fallback` como fallback curto, mas não dependa apenas das iniciais para identificar a pessoa em contextos importantes.",
        "Se o avatar for clicável, envolva-o em um link ou botão semanticamente correto em vez de adicionar interação no span puro.",
      ],
      [
        "Provide meaningful `alt` text on avatar images when they carry relevant identity information; if the photo is decorative, use `alt=\"\"` and label surrounding context instead.",
        "Use `data-r8-avatar-fallback` as a short fallback, but do not rely on initials alone to identify a person in critical flows.",
        "If the avatar should be clickable, wrap it in a semantic link or button instead of making the plain span interactive.",
      ],
    ),
    api: [
      {
        name: "r8-avatar / --sm / --lg / --round",
        description: l(
          "Wrapper base com variações de tamanho e shape para texto curto ou imagem interna.",
          "Base wrapper with size and shape variants for short text or inner images.",
        ),
      },
      {
        name: "data-r8-avatar-fallback",
        description: l(
          "Define até 2 caracteres para o fallback quando a imagem falhar, estiver vazia ou não existir.",
          "Defines up to 2 characters for the fallback when the image fails, is empty, or does not exist.",
        ),
      },
      {
        name: "data-r8-fit",
        description: l(
          "Controla o `object-fit` da imagem com valores como `cover`, `contain`, `fill`, `none` e `scale-down`.",
          "Controls the image `object-fit` with values such as `cover`, `contain`, `fill`, `none`, and `scale-down`.",
        ),
      },
      {
        name: "img + alt",
        description: l(
          "Suporta imagem interna com `alt`; o runtime alterna para o fallback automaticamente se a mídia falhar.",
          "Supports an inner image with `alt`; the runtime automatically switches to the fallback if the media fails.",
        ),
      },
    ],
  },
  {
    id: "badge",
    name: "Badge",
    group: "data",
    summary: l(
      "Rótulo compacto para estados, categorias, versões e metadados curtos.",
      "Compact label for statuses, categories, versions, and short metadata.",
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
    id: "card",
    name: "Card",
    group: "data",
    summary: l(
      "Cartão de conteúdo com áreas de cabeçalho, corpo e rodapé.",
      "Content card with header, body, and footer areas.",
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
      "Carrossel de imagens ou conteúdo com setas, indicadores e reprodução automática opcional.",
      "Image or content carousel with arrows, indicators, and optional autoplay.",
    ),
    classes: [
      "r8-carousel",
      "r8-carousel__viewport",
      "r8-carousel__track",
      "r8-carousel__slide",
      "r8-carousel__arrow",
      "r8-carousel__media",
      "r8-carousel__caption",
      "r8-carousel__dots",
      "r8-carousel__dot",
    ],
    preview: `<div class="r8-carousel docs-preview__carousel" data-r8-arrows="always">
  <div class="r8-carousel__viewport">
    <button class="r8-carousel__arrow r8-carousel__arrow--prev" data-r8-direction="prev" type="button" aria-label="Previous slide">&lt;</button>
    <button class="r8-carousel__arrow r8-carousel__arrow--next" data-r8-direction="next" type="button" aria-label="Next slide">&gt;</button>
    <div class="r8-carousel__track">
      <article class="r8-carousel__slide">
        <figure class="r8-carousel__media">
          <img src="/imgs/carousel1.png" alt="Retro8 UI command center banner" />
        </figure>
        <div class="r8-carousel__caption">
          <strong>Mission control</strong>
          <span class="r8-text r8-text--sm r8-text--muted">Wide hero banners, covers and featured releases.</span>
        </div>
      </article>
      <article class="r8-carousel__slide" hidden>
        <figure class="r8-carousel__media">
          <img src="/imgs/carousel2.png" alt="Retro8 UI pixel interface showcase" />
        </figure>
        <div class="r8-carousel__caption">
          <strong>Pixel showcase</strong>
          <span class="r8-text r8-text--sm r8-text--muted">Image-first slides still support captions and mixed content.</span>
        </div>
      </article>
      <article class="r8-carousel__slide" hidden>
        <figure class="r8-carousel__media">
          <img src="/imgs/carousel3.png" alt="Retro8 UI product highlight banner" />
        </figure>
        <div class="r8-carousel__caption">
          <strong>Product highlight</strong>
          <span class="r8-text r8-text--sm r8-text--muted">Keep navigation compact with dots and left or right arrows.</span>
        </div>
      </article>
    </div>
  </div>
  <div class="r8-carousel__dots">
    <button class="r8-carousel__dot is-active" type="button" aria-label="Go to slide 1"></button>
    <button class="r8-carousel__dot" type="button" aria-label="Go to slide 2"></button>
    <button class="r8-carousel__dot" type="button" aria-label="Go to slide 3"></button>
  </div>
</div>`,
    code: `<div class="r8-carousel" data-r8-arrows="always" data-r8-autoplay="true" data-r8-interval="3200">
  <div class="r8-carousel__viewport">
    <button class="r8-carousel__arrow r8-carousel__arrow--prev" data-r8-direction="prev" type="button" aria-label="Previous slide">&lt;</button>
    <button class="r8-carousel__arrow r8-carousel__arrow--next" data-r8-direction="next" type="button" aria-label="Next slide">&gt;</button>

    <div class="r8-carousel__track">
      <article class="r8-carousel__slide">
        <figure class="r8-carousel__media">
          <img src="/imgs/carousel1.png" alt="Launch trailer" />
        </figure>
        <div class="r8-carousel__caption">
          <strong>Launch trailer</strong>
          <span class="r8-text r8-text--sm r8-text--muted">Hero banner with image and caption.</span>
        </div>
      </article>

      <article class="r8-carousel__slide" hidden>
        <figure class="r8-carousel__media">
          <img src="/imgs/carousel2.png" alt="Dashboard preview" />
        </figure>
        <div class="r8-carousel__caption">
          <strong>Dashboard preview</strong>
          <span class="r8-text r8-text--sm r8-text--muted">Slides can mix images, text and actions.</span>
        </div>
      </article>

      <article class="r8-carousel__slide" hidden>
        <figure class="r8-carousel__media">
          <img src="/imgs/carousel3.png" alt="Release spotlight" />
        </figure>
        <div class="r8-carousel__caption">
          <strong>Release spotlight</strong>
          <span class="r8-text r8-text--sm r8-text--muted">Autoplay is optional and pauses on hover or focus.</span>
        </div>
      </article>
    </div>
  </div>

  <div class="r8-carousel__dots">
    <button class="r8-carousel__dot is-active" type="button" aria-label="Go to slide 1"></button>
    <button class="r8-carousel__dot" type="button" aria-label="Go to slide 2"></button>
    <button class="r8-carousel__dot" type="button" aria-label="Go to slide 3"></button>
  </div>
</div>`,
    anatomy: ll(
      [
        "`r8-carousel` organiza viewport, trilho, slides, setas e pontos em uma estrutura único para banners ou galerias curtas.",
        "`r8-carousel__viewport` delimita a área visível, enquanto `r8-carousel__track` guarda os slides que o runtime alterna usando `hidden`.",
        "`r8-carousel__arrow` com `data-r8-direction=\"prev|next\"` habilita navegação lateral; `r8-carousel__dot` permite salto direto para um slide.",
        "`r8-carousel__media` e `r8-carousel__caption` ajudam a montar slides com imagem e legenda sem depender de marcação extra fora do componente.",
      ],
      [
        "`r8-carousel` groups the viewport, track, slides, arrows, and dots into one shell for banners or short galleries.",
        "`r8-carousel__viewport` defines the visible area, while `r8-carousel__track` holds the slides that the runtime swaps using `hidden`.",
        "`r8-carousel__arrow` with `data-r8-direction=\"prev|next\"` enables side navigation, and `r8-carousel__dot` jumps directly to a slide.",
        "`r8-carousel__media` and `r8-carousel__caption` help build image-first slides with captions without extra wrapper markup outside the component.",
      ],
    ),
    accessibility: ll(
      [
        "Forneca `alt` útil nas imagens quando o slide depender delas para contexto; se forem decorativas, use `alt=\"\"` e mantenha a legenda textual no slide.",
        "As setas devem continuar sendo botões reais com `aria-label`, e os pontos precisam permanecer focaveis para navegação por teclado.",
        "Evite autoplay agressivo em carrosseis com informação crítica; se usar `data-r8-autoplay`, mantenha tempo suficiente para leitura.",
      ],
      [
        "Provide meaningful `alt` text on slide images when the image carries context; if it is decorative, use `alt=\"\"` and keep textual captioning in the slide.",
        "Arrows should remain real buttons with `aria-label`, and dots should stay focusable for keyboard navigation.",
        "Avoid aggressive autoplay for critical information; if you use `data-r8-autoplay`, keep enough time for reading.",
      ],
    ),
    api: [
      {
        name: "data-r8-autoplay / data-r8-interval",
        description: l(
          "Liga a rotação automática e controla o intervalo em milissegundos.",
          "Enables automatic rotation and controls the interval in milliseconds.",
        ),
      },
      {
        name: "data-r8-arrows",
        description: l(
          "Controla a visibilidade das setas com `always`, `hover` ou `none`.",
          "Controls arrow visibility with `always`, `hover`, or `none`.",
        ),
      },
      {
        name: "r8-carousel__arrow + data-r8-direction",
        description: l(
          "Botões opcionais para navegar para tras ou para frente dentro do mesmo viewport.",
          "Optional buttons for moving backward or forward inside the same viewport.",
        ),
      },
      {
        name: "--r8-carousel-height / --r8-carousel-media-fit",
        description: l(
          "Ajusta a altura do bloco e como as imagens ocupam a área do slide.",
          "Adjusts the block height and how images fill the slide area.",
        ),
      },
    ],
  },
  {
    id: "collapse",
    name: "Collapse",
    group: "data",
    summary: l(
      "Seções expansíveis com modo sanfona, cabeçalhos configuráveis e itens desabilitados.",
      "Expandable sections with accordion mode, configurable headers, and disabled items.",
    ),
    classes: [
      "r8-collapse",
      "r8-collapse__item",
      "r8-collapse__header",
      "r8-collapse__copy",
      "r8-collapse__title",
      "r8-collapse__meta",
      "r8-collapse__icon",
      "r8-collapse__body",
    ],
    preview: `<div class="r8-collapse" data-r8-accordion="true" data-r8-icon-position="left">
  <section class="r8-collapse__item is-open">
    <button class="r8-collapse__header" type="button" aria-expanded="true">
      <span class="r8-collapse__copy">
        <span class="r8-collapse__title">Display settings</span>
        <span class="r8-collapse__meta">Scanlines, palette and contrast tuning.</span>
      </span>
      <span class="r8-collapse__icon" aria-hidden="true">&gt;</span>
    </button>
    <div class="r8-collapse__body">
      Contrast presets, motion reduction, and palette overrides stay grouped in one readable block.
    </div>
  </section>
  <section class="r8-collapse__item">
    <button class="r8-collapse__header" type="button" aria-expanded="false">
      <span class="r8-collapse__copy">
        <span class="r8-collapse__title">Accessibility settings</span>
        <span class="r8-collapse__meta">Focus rings, readable copy and motion fallback.</span>
      </span>
      <span class="r8-collapse__icon" aria-hidden="true">&gt;</span>
    </button>
    <div class="r8-collapse__body" hidden>Focus rings, motion fallback and contrast presets.</div>
  </section>
  <section class="r8-collapse__item is-disabled" data-r8-disabled="true" aria-disabled="true">
    <button class="r8-collapse__header" type="button" aria-expanded="false" aria-disabled="true">
      <span class="r8-collapse__copy">
        <span class="r8-collapse__title">Audit log</span>
        <span class="r8-collapse__meta">Locked until the current sync finishes.</span>
      </span>
      <span class="r8-collapse__icon" aria-hidden="true">&gt;</span>
    </button>
    <div class="r8-collapse__body" hidden>Disabled sections stay visible in the structure without allowing interaction.</div>
  </section>
</div>`,
    code: `<div class="r8-collapse" data-r8-accordion="true" data-r8-icon-position="left">
  <section class="r8-collapse__item is-open">
    <button class="r8-collapse__header" type="button" aria-expanded="true">
      <span class="r8-collapse__copy">
        <span class="r8-collapse__title">Display settings</span>
        <span class="r8-collapse__meta">Scanlines, palette and contrast tuning.</span>
      </span>
      <span class="r8-collapse__icon" aria-hidden="true">&gt;</span>
    </button>
    <div class="r8-collapse__body">
      Contrast presets, motion reduction, and palette overrides stay grouped in one readable block.
    </div>
  </section>

  <section class="r8-collapse__item">
    <button class="r8-collapse__header" type="button" aria-expanded="false">
      <span class="r8-collapse__copy">
        <span class="r8-collapse__title">Accessibility settings</span>
        <span class="r8-collapse__meta">Focus rings, readable copy and motion fallback.</span>
      </span>
      <span class="r8-collapse__icon" aria-hidden="true">&gt;</span>
    </button>
    <div class="r8-collapse__body" hidden>
      Focus rings, motion fallback and contrast presets.
    </div>
  </section>

  <section class="r8-collapse__item is-disabled" data-r8-disabled="true" aria-disabled="true">
    <button class="r8-collapse__header" type="button" aria-expanded="false" aria-disabled="true">
      <span class="r8-collapse__copy">
        <span class="r8-collapse__title">Audit log</span>
        <span class="r8-collapse__meta">Locked until the current sync finishes.</span>
      </span>
      <span class="r8-collapse__icon" aria-hidden="true">&gt;</span>
    </button>
    <div class="r8-collapse__body" hidden>
      Disabled sections stay visible in the structure without allowing interaction.
    </div>
  </section>
</div>`,
    anatomy: ll(
      [
        "`r8-collapse` organiza grupos expansivos e aceita `data-r8-accordion=\"true\"` quando apenas um item pode ficar aberto por vez.",
        "Cada `r8-collapse__item` combina `r8-collapse__header` para o gatilho e `r8-collapse__body` para o conteúdo expansivel.",
        "`r8-collapse__copy`, `r8-collapse__title`, `r8-collapse__meta` e `r8-collapse__icon` deixam o cabeçalho mais rico, no estilo de título customizado do Element Plus.",
        "`data-r8-icon-position=\"left|right\"` muda o lado do ícone, e `data-r8-disabled=\"true\"` bloqueia a interação sem remover o item da hierarquia.",
      ],
      [
        "`r8-collapse` groups expandable sections and accepts `data-r8-accordion=\"true\"` when only one item should stay open at a time.",
        "Each `r8-collapse__item` combines `r8-collapse__header` for the trigger and `r8-collapse__body` for the expandable content.",
        "`r8-collapse__copy`, `r8-collapse__title`, `r8-collapse__meta`, and `r8-collapse__icon` make richer headers possible, similar to Element Plus custom titles.",
        "`data-r8-icon-position=\"left|right\"` changes the icon side, and `data-r8-disabled=\"true\"` blocks interaction without removing the item from the structure.",
      ],
    ),
    accessibility: ll(
      [
        "Prefira `button` real para `r8-collapse__header`; o runtime completa `aria-expanded`, `aria-controls` é o vínculo com o painel.",
        "Use `r8-collapse__title` como rótulo principal e deixe `r8-collapse__meta` para contexto secundário, sem depender apenas do ícone para comunicar estado.",
        "Itens com `data-r8-disabled=\"true\"` devem continuar legiveis, mas sem esconder informação crítica atrás de um painel inativo.",
      ],
      [
        "Prefer a real `button` for `r8-collapse__header`; the runtime fills in `aria-expanded`, `aria-controls`, and the panel relationship.",
        "Use `r8-collapse__title` as the primary label and keep `r8-collapse__meta` for secondary context instead of relying on the icon alone.",
        "Items with `data-r8-disabled=\"true\"` should remain readable, but avoid hiding critical information behind an inactive panel.",
      ],
    ),
    api: [
      {
        name: "data-r8-accordion",
        description: l(
          "Fecha os itens irmaos quando um novo painel abre.",
          "Closes sibling items when a new panel opens.",
        ),
      },
      {
        name: "data-r8-icon-position",
        description: l(
          "Posiciona o ícone de expansão em `left` ou `right` no cabeçalho do conjunto.",
          "Places the expand icon on the `left` or `right` side of the group header.",
        ),
      },
      {
        name: "data-r8-disabled / is-disabled",
        description: l(
          "Desativa um item específico sem removê-lo do layout ou do contexto visual.",
          "Disables an individual item without removing it from the layout or visual context.",
        ),
      },
      {
        name: "r8-collapse__copy / __title / __meta / __icon",
        description: l(
          "Classes opcionais para montar títulos ricos com descrição curta e ícone separado.",
          "Optional classes for building richer titles with a short description and a separate icon.",
        ),
      },
    ],
  },
  {
    id: "empty",
    name: "Empty",
    group: "data",
    summary: l(
      "Estado vazio com imagem ou símbolo, descrição e ações para orientar o próximo passo.",
      "Empty state with an image or glyph, description, and actions to guide the next step.",
    ),
    classes: ["r8-empty", "r8-empty__media", "r8-empty__icon", "r8-empty__copy", "r8-empty__title", "r8-empty__description", "r8-empty__actions"],
    preview: `<div class="r8-empty" style="--r8-empty-media-size: 9rem;">
  <div class="r8-empty__media">
    <img src="/imgs/carousel2.png" alt="" />
  </div>
  <div class="r8-empty__copy">
    <div class="r8-empty__title">No missions yet</div>
    <p class="r8-empty__description">Create a queue, import a preset, or start from a blank canvas.</p>
  </div>
  <div class="r8-empty__actions">
    <button class="r8-btn r8-btn--sm r8-btn--primary" type="button">Create mission</button>
    <button class="r8-btn r8-btn--sm" type="button">Import preset</button>
  </div>
</div>`,
    code: `<div class="r8-empty" data-r8-align="left" style="--r8-empty-media-size: 9rem;">
  <div class="r8-empty__media">
    <img src="/imgs/carousel2.png" alt="" />
  </div>

  <div class="r8-empty__copy">
    <div class="r8-empty__title">No missions yet</div>
    <p class="r8-empty__description">Create a queue, import a preset, or start from a blank canvas.</p>
  </div>

  <div class="r8-empty__actions">
    <button class="r8-btn r8-btn--sm r8-btn--primary" type="button">Create mission</button>
    <button class="r8-btn r8-btn--sm" type="button">Import preset</button>
  </div>
</div>`,
    anatomy: ll(
      [
        "`r8-empty` é a estrutura base do estado vazio e aceita `data-r8-align=\"left\"` para sair do layout centralizado quando o contexto pedir leitura mais editorial.",
        "`r8-empty__media` funciona como área para imagem customizada, enquanto `r8-empty__icon` continua cobrindo casos mais simples com texto curto ou rótulo técnica.",
        "`r8-empty__copy` agrupa `r8-empty__title` e `r8-empty__description` para manter hierarquia clara entre título e explicação.",
        "`r8-empty__actions` cria uma área de CTA inferior, inspirada no slot de conteúdo do Element Plus, sem exigir runtime novo.",
      ],
      [
        "`r8-empty` is the base empty-state shell and accepts `data-r8-align=\"left\"` when the context calls for a more editorial left-aligned layout.",
        "`r8-empty__media` acts as the custom image area, while `r8-empty__icon` still covers simpler cases with short text or technical labels.",
        "`r8-empty__copy` groups `r8-empty__title` and `r8-empty__description` to keep a clear hierarchy between the headline and the explanation.",
        "`r8-empty__actions` creates a bottom CTA area, inspired by the Element Plus bottom-content slot, without adding new runtime behavior.",
      ],
    ),
    accessibility: ll(
      [
        "Se a imagem for apenas decorativa, use `alt=\"\"` em `r8-empty__media > img` e deixe o contexto principal no título e na descrição.",
        "Evite depender só do visual da ilustração para explicar o problema; `r8-empty__title` e `r8-empty__description` devem comunicar o próximo passo.",
        "Quando houver ações, mantenha uma CTA principal bem clara para a pessoa sair do estado vazio sem ambiguidade.",
      ],
      [
        "If the image is purely decorative, use `alt=\"\"` on `r8-empty__media > img` and keep the main context in the title and description.",
        "Avoid relying on the illustration alone to explain the problem; `r8-empty__title` and `r8-empty__description` should communicate the next step.",
        "When actions are present, keep one clear primary CTA so people can leave the empty state without ambiguity.",
      ],
    ),
    api: [
      {
        name: "data-r8-align",
        description: l(
          "Alinha o estado vazio em `center` ou `left` sem trocar a marcação base.",
          "Aligns the empty state to `center` or `left` without changing the base markup.",
        ),
      },
      {
        name: "--r8-empty-media-size",
        description: l(
          "Controla a largura e a altura úteis da área visual usada por imagem ou ilustração.",
          "Controls the usable width and height of the visual area used by an image or illustration.",
        ),
      },
      {
        name: "r8-empty__media / __icon",
        description: l(
          "Escolha `__media` para imagem customizada e `__icon` para casos textuais ou técnicos mais simples.",
          "Use `__media` for a custom image and `__icon` for simpler textual or technical cases.",
        ),
      },
      {
        name: "r8-empty__actions",
        description: l(
          "Área opcional para CTA primária e ações secundárias abaixo da cópia.",
          "Optional area for a primary CTA and secondary actions below the copy.",
        ),
      },
    ],
  },
  {
    id: "image",
    name: "Image",
    group: "data",
    summary: l(
      "Moldura de imagem com proporção, ajuste, carregamento e estado de erro.",
      "Image frame with aspect ratios, fit options, loading, and error states.",
    ),
    classes: ["r8-image", "r8-image__frame", "r8-image__placeholder", "r8-image__error", "r8-image__caption"],
    preview: `<figure class="r8-image" data-r8-fit="cover" data-r8-ratio="wide">
  <div class="r8-image__frame">
    <img src="/imgs/carousel1.png" alt="Retro forest route preview" loading="eager" />
    <div class="r8-image__placeholder">LOADING...</div>
    <div class="r8-image__error">FILE LOST</div>
  </div>
  <figcaption class="r8-image__caption">Forest route preview</figcaption>
</figure>`,
    code: `<figure class="r8-image" data-r8-fit="contain" data-r8-ratio="landscape" style="--r8-image-height: 14rem;">
  <div class="r8-image__frame">
    <img src="/imgs/carousel1.png" alt="Retro forest route preview" loading="lazy" />
    <div class="r8-image__placeholder">LOADING...</div>
    <div class="r8-image__error">FILE LOST</div>
  </div>
  <figcaption class="r8-image__caption">Forest route preview</figcaption>
</figure>`,
    anatomy: ll(
      [
        "`r8-image` é o contêiner base e aceita `data-r8-fit` e `data-r8-ratio` para controlar como a mídia ocupa a moldura.",
        "`r8-image__frame` é a área visual principal, pronta para receber `<img>`, placeholder e estado de erro dentro do mesmo bloco.",
        "`r8-image__placeholder` e `r8-image__error` são overlays opcionais que o runtime alterna conforme o carregamento ou falha da mídia.",
        "`r8-image__caption` mantém uma legenda curta abaixo da imagem, sem misturar a cópia com a área visual.",
      ],
      [
        "`r8-image` is the base wrapper and accepts `data-r8-fit` and `data-r8-ratio` to control how media fills the frame.",
        "`r8-image__frame` is the main visual area, ready to host an `<img>`, placeholder, and error state inside the same block.",
        "`r8-image__placeholder` and `r8-image__error` are optional overlays that the runtime switches based on loading or media failure.",
        "`r8-image__caption` keeps a short caption below the image instead of mixing copy into the visual area itself.",
      ],
    ),
    accessibility: ll(
      [
        "Forneça `alt` útil quando a imagem trouxer contexto real; se ela for decorativa, use `alt=\"\"` e deixe a informação importante na legenda.",
        "O placeholder e o estado de erro ajudam a dar retorno visual, mas a legenda ainda deve explicar o que a pessoa deveria ver ou fazer em seguida.",
        "Evite esconder informação essencial só na imagem sem um texto complementar, especialmente em fluxos críticos ou listas densas.",
      ],
      [
        "Provide meaningful `alt` text when the image carries real context; if it is decorative, use `alt=\"\"` and keep important information in the caption.",
        "The placeholder and error states provide visual feedback, but the caption should still explain what people should see or do next.",
        "Avoid hiding essential information inside the image alone without complementary text, especially in critical flows or dense lists.",
      ],
    ),
    api: [
      {
        name: "data-r8-fit",
        description: l(
          "Controla o `object-fit` da mídia com valores como `cover`, `contain`, `fill`, `none` e `scale-down`.",
          "Controls the media `object-fit` with values such as `cover`, `contain`, `fill`, `none`, and `scale-down`.",
        ),
      },
      {
        name: "data-r8-ratio",
        description: l(
          "Define proporções rápidas como `square`, `landscape`, `wide` e `portrait`.",
          "Defines quick ratios such as `square`, `landscape`, `wide`, and `portrait`.",
        ),
      },
      {
        name: "r8-image__placeholder / __error",
        description: l(
          "Overlays opcionais para carregamento e falha de carregamento, alternados pelo runtime.",
          "Optional loading and error overlays that the runtime toggles automatically.",
        ),
      },
      {
        name: "--r8-image-height / --r8-image-fit",
        description: l(
          "Ajusta a altura útil da moldura e o modo de encaixe da imagem sem trocar classes extras.",
          "Adjusts the usable frame height and image fitting mode without extra classes.",
        ),
      },
    ],
  },
  {
    id: "pagination",
    name: "Pagination",
    group: "data",
    summary: l(
      "Navegação entre páginas com controles anterior e próximo, resumo e salto para uma página específica.",
      "Page navigation with previous and next controls, a summary, and an optional page jump.",
    ),
    classes: ["r8-pagination", "r8-pagination__summary", "r8-pagination__nav", "r8-pagination__pages", "r8-pagination__item", "r8-pagination__more", "r8-pagination__jumper", "r8-pagination__jump-input"],
    preview: `<div class="r8-pagination" data-r8-total-pages="9" data-r8-current-page="4" data-r8-pager-count="7">
  <span class="r8-pagination__summary">Total 9</span>
  <button class="r8-pagination__nav" type="button" data-r8-page-action="prev" aria-label="Previous page">&lt;</button>
  <div class="r8-pagination__pages">
    <button class="r8-pagination__item" type="button" data-r8-page="1">1</button>
    <button class="r8-pagination__item" type="button" data-r8-page="2">2</button>
    <button class="r8-pagination__item" type="button" data-r8-page="3">3</button>
    <button class="r8-pagination__item is-active" type="button" data-r8-page="4" aria-current="true">4</button>
    <button class="r8-pagination__item" type="button" data-r8-page="5">5</button>
    <span class="r8-pagination__more" aria-hidden="true">...</span>
    <button class="r8-pagination__item" type="button" data-r8-page="9">9</button>
  </div>
  <button class="r8-pagination__nav" type="button" data-r8-page-action="next" aria-label="Next page">&gt;</button>
  <label class="r8-pagination__jumper">
    <span>Go to</span>
    <input class="r8-pagination__jump-input r8-input" type="number" min="1" max="9" value="4" data-r8-page-jump-input />
    <button class="r8-btn r8-btn--sm" type="button" data-r8-page-action="jump">OK</button>
  </label>
</div>`,
    code: `<div class="r8-pagination r8-pagination--background" data-r8-total-pages="18" data-r8-current-page="6" data-r8-pager-count="7" data-r8-hide-on-single-page="true">
  <span class="r8-pagination__summary">Total 18</span>
  <button class="r8-pagination__nav" type="button" data-r8-page-action="prev" aria-label="Previous page">&lt;</button>
  <div class="r8-pagination__pages">
    <button class="r8-pagination__item" type="button" data-r8-page="1">1</button>
    <button class="r8-pagination__item" type="button" data-r8-page="2">2</button>
    <button class="r8-pagination__item" type="button" data-r8-page="3">3</button>
    <button class="r8-pagination__item is-active" type="button" data-r8-page="6" aria-current="true">6</button>
    <span class="r8-pagination__more" aria-hidden="true">...</span>
    <button class="r8-pagination__item" type="button" data-r8-page="18">18</button>
  </div>
  <button class="r8-pagination__nav" type="button" data-r8-page-action="next" aria-label="Next page">&gt;</button>
  <label class="r8-pagination__jumper">
    <span>Go to</span>
    <input class="r8-pagination__jump-input r8-input" type="number" min="1" max="18" value="6" data-r8-page-jump-input />
    <button class="r8-btn r8-btn--sm" type="button" data-r8-page-action="jump">OK</button>
  </label>
</div>`,
    anatomy: ll(
      [
        "`r8-pagination` é a estrutura base e aceita `data-r8-total-pages`, `data-r8-current-page` e `data-r8-pager-count` para o runtime desenhar o pager.",
        "`r8-pagination__nav` cobre anterior e próxima página, enquanto `r8-pagination__pages` segura os botões numerados e elipses.",
        "`r8-pagination__summary` mostra o total do conjunto e `r8-pagination__jumper` cria a área de salto rápido com input numérico.",
        "`data-r8-hide-on-single-page=\"true\"` esconde o bloco quando existir apenas uma página, no mesmo espírito do Element Plus.",
      ],
      [
        "`r8-pagination` is the base shell and accepts `data-r8-total-pages`, `data-r8-current-page`, and `data-r8-pager-count` so the runtime can draw the pager.",
        "`r8-pagination__nav` covers previous and next page controls, while `r8-pagination__pages` holds numbered buttons and ellipses.",
        "`r8-pagination__summary` shows the set total and `r8-pagination__jumper` creates a quick-jump area with a numeric input.",
        "`data-r8-hide-on-single-page=\"true\"` hides the whole block when there is only one page, in the same spirit as Element Plus.",
      ],
    ),
    accessibility: ll(
      [
        "Use `aria-label` claro nos botões de navegação lateral e mantenha `aria-current=\"true\"` na página ativa.",
        "Quando houver jumper, limite o input ao intervalo válido de páginas para evitar ambiguidade na navegação.",
        "Evite esconder paginação em contextos onde a pessoa ainda precisa entender quantas páginas existem; o resumo total ajuda nisso.",
      ],
      [
        "Use a clear `aria-label` on side navigation buttons and keep `aria-current=\"true\"` on the active page.",
        "When a jumper is present, constrain the input to the valid page range to avoid ambiguity in navigation.",
        "Avoid hiding pagination when people still need to understand how many pages exist; the total summary helps with that.",
      ],
    ),
    api: [
      {
        name: "data-r8-total-pages / data-r8-current-page",
        description: l(
          "Definem o total e a página ativa controlados pelo runtime.",
          "Define the total and current page handled by the runtime.",
        ),
      },
      {
        name: "data-r8-pager-count",
        description: l(
          "Controla quantos pagers numéricos aparecem antes do colapso com elipses.",
          "Controls how many numeric pagers appear before collapsing with ellipses.",
        ),
      },
      {
        name: "data-r8-hide-on-single-page",
        description: l(
          "Esconde o componente quando o total de páginas for igual a 1.",
          "Hides the component when the total page count is 1.",
        ),
      },
      {
        name: "r8-pagination__summary / __jumper",
        description: l(
          "Blocos opcionais para mostrar total e salto rápido sem sair do mesmo componente.",
          "Optional blocks for showing the total and a quick jumper without leaving the same component.",
        ),
      },
    ],
  },
  {
    id: "progress",
    name: "Progress",
    group: "data",
    summary: l(
      "Indicador de progresso linear ou circular, com valor opcional e modo indeterminado.",
      "Linear or circular progress indicator with an optional value and an indeterminate mode.",
    ),
    classes: [
      "r8-progress",
      "r8-progress__label",
      "r8-progress__track",
      "r8-progress__bar",
      "r8-progress__value",
      "r8-progress__inside-value",
      "r8-progress__dial",
      "r8-progress__content",
      "r8-progress__meta",
      "r8-progress--circle",
      "r8-progress--inside",
      "r8-progress--indeterminate",
      "r8-progress--success",
      "r8-progress--warning",
      "r8-progress--danger",
      "--r8-progress-value",
      "--r8-progress-height",
      "--r8-progress-dial-size",
      "--r8-progress-bar-color",
    ],
    preview: `<div class="docs-demo__stack">
  <div class="r8-progress" data-r8-value="32">
    <div class="r8-progress__label">
      <span>Upload</span>
      <span class="r8-progress__value" data-r8-progress-value-output>32%</span>
    </div>
    <div class="r8-progress__track">
      <div class="r8-progress__bar"></div>
    </div>
  </div>
  <div class="r8-progress" data-r8-value="72" data-r8-variant="warning" data-r8-label-position="inside">
    <div class="r8-progress__label">
      <span>Queue sync</span>
      <span class="r8-progress__value" data-r8-progress-value-output>72%</span>
    </div>
    <div class="r8-progress__track">
      <div class="r8-progress__bar"></div>
      <span class="r8-progress__inside-value" data-r8-progress-value-output>72%</span>
    </div>
  </div>
  <div class="r8-progress" data-r8-value="84" data-r8-variant="success" data-r8-shape="circle">
    <div class="r8-progress__dial">
      <div class="r8-progress__content">
        <strong class="r8-progress__value" data-r8-progress-value-output>84%</strong>
        <span class="r8-progress__meta">stable</span>
      </div>
    </div>
    <div class="r8-progress__label">
      <span>Shield sync</span>
    </div>
  </div>
</div>`,
    code: `<div class="docs-demo__stack">
  <div class="r8-progress" data-r8-value="48" style="--r8-progress-height: 1rem;">
    <div class="r8-progress__label">
      <span>Indexing assets</span>
      <span class="r8-progress__value" data-r8-progress-value-output>48%</span>
    </div>
    <div class="r8-progress__track">
      <div class="r8-progress__bar"></div>
    </div>
  </div>

  <div class="r8-progress" data-r8-value="76" data-r8-label-position="inside" data-r8-variant="warning">
    <div class="r8-progress__label">
      <span>Queue sync</span>
      <span class="r8-progress__value" data-r8-progress-value-output>76%</span>
    </div>
    <div class="r8-progress__track">
      <div class="r8-progress__bar"></div>
      <span class="r8-progress__inside-value" data-r8-progress-value-output>76%</span>
    </div>
  </div>

  <div class="r8-progress" data-r8-value="84" data-r8-shape="circle" data-r8-variant="success" style="--r8-progress-dial-size: 7rem;">
    <div class="r8-progress__dial">
      <div class="r8-progress__content">
        <strong class="r8-progress__value" data-r8-progress-value-output>84%</strong>
        <span class="r8-progress__meta">stable</span>
      </div>
    </div>
    <div class="r8-progress__label">
      <span>Shield sync</span>
    </div>
  </div>
</div>`,
    anatomy: ll(
      [
        "`r8-progress` é o contêiner base e aceita valor, shape, tom, rótulo interna e modo indeterminado pela mesma API pública.",
        "`r8-progress__label` agrupa o título e a leitura percentual externa, enquanto `r8-progress__inside-value` cobre a versão compacta dentro da trilha.",
        "`r8-progress__track` e `r8-progress__bar` formam a barra linear; `r8-progress__dial` e `r8-progress__content` cobrem o modo circular.",
        "As Propriedades CSS ajustam altura, tamanho do dial, cor do preenchimento, trilha e velocidade da animação sem multiplicar classes.",
      ],
      [
        "`r8-progress` is the base wrapper and accepts value, shape, tone, inside label, and indeterminate mode through the same public API.",
        "`r8-progress__label` groups the title and the external percentage readout, while `r8-progress__inside-value` covers the compact version inside the track.",
        "`r8-progress__track` and `r8-progress__bar` build the linear bar; `r8-progress__dial` and `r8-progress__content` cover the circular mode.",
        "Custom properties adjust height, dial size, fill color, track color, and animation speed without multiplying classes.",
      ],
    ),
    accessibility: ll(
      [
        "Mantenha um nome claro perto do componente ou use `aria-label` quando o título visível não existir; o runtime já expõe `role=\"progressbar\"` e os limites de valor.",
        "Não dependa só da cor para comunicar estado. A leitura textual do percentual e o rótulo do processo continuam importantes para contraste e legibilidade.",
        "Use o modo indeterminado apenas quando ainda não houver um número confiável; quando o percentual existir, sincronize `data-r8-value` para manter a interface e a tecnologia assistiva alinhadas.",
      ],
      [
        "Keep a clear name near the component or use `aria-label` when there is no visible title; the runtime already exposes `role=\"progressbar\"` and value bounds.",
        "Do not rely on color alone to communicate state. The textual percentage readout and process label still matter for contrast and readability.",
        "Use the indeterminate mode only when there is no reliable number yet; once a percentage exists, sync `data-r8-value` to keep the interface and assistive tech aligned.",
      ],
    ),
    api: [
      {
        name: "data-r8-value / data-r8-variant",
        description: l(
          "Controlam o percentual e o tom sem precisar manipular a propriedade CSS diretamente.",
          "Control the percentage and tone without having to manipulate the custom property directly.",
        ),
      },
      {
        name: "data-r8-shape / data-r8-label-position / data-r8-indeterminate",
        description: l(
          "Alternam entre barra linear, dial circular, rótulo interna e animação contínua.",
          "Switch between a linear bar, a circular dial, an inside label, and continuous animation.",
        ),
      },
      {
        name: "data-r8-progress-value-output",
        description: l(
          "Marca os nós que devem receber a leitura textual atualizada pelo runtime.",
          "Marks the nodes that should receive the textual readout updated by the runtime.",
        ),
      },
      {
        name: "--r8-progress-height / --r8-progress-dial-size / --r8-progress-bar-color",
        description: l(
          "Ajustam espessura, escala circular e cor local do preenchimento sem trocar a estrutura.",
          "Adjust thickness, circular scale, and the local fill color without replacing the structure.",
        ),
      },
    ],
  },
  {
    id: "skeleton",
    name: "Skeleton",
    group: "data",
    summary: l(
      "Estruturas temporárias de carregamento com linhas, avatar, imagem e formas de tamanho configurável.",
      "Temporary loading structures with lines, avatars, media, and configurable shapes.",
    ),
    classes: [
      "r8-skeleton",
      "r8-skeleton--card",
      "r8-skeleton__block",
      "r8-skeleton__header",
      "r8-skeleton__text",
      "r8-skeleton__footer",
      "r8-skeleton__media",
      "r8-skeleton__avatar",
      "r8-skeleton__title",
      "r8-skeleton__line",
      "r8-skeleton__line--medium",
      "r8-skeleton__line--short",
      "r8-skeleton__button",
      "r8-skeleton__shape",
      "r8-skeleton__shape--circle",
      "r8-skeleton__shape--rectangle",
    ],
    preview: `<div class="r8-skeleton r8-skeleton--card">
  <div class="r8-skeleton__media"></div>
  <div class="r8-skeleton__title"></div>
  <div class="r8-skeleton__line"></div>
  <div class="r8-skeleton__line r8-skeleton__line--medium"></div>
  <div class="r8-skeleton__footer">
    <div class="r8-skeleton__line r8-skeleton__line--short"></div>
    <div class="r8-skeleton__button"></div>
  </div>
</div>`,
    code: `<div class="docs-demo__stack">
  <div class="r8-skeleton r8-skeleton--card">
    <div class="r8-skeleton__media"></div>
    <div class="r8-skeleton__title"></div>
    <div class="r8-skeleton__line"></div>
    <div class="r8-skeleton__line r8-skeleton__line--medium"></div>
    <div class="r8-skeleton__footer">
      <div class="r8-skeleton__line r8-skeleton__line--short"></div>
      <div class="r8-skeleton__button"></div>
    </div>
  </div>

  <div class="r8-skeleton" style="--r8-skeleton-avatar-size: 2.75rem;">
    <div class="r8-skeleton__header">
      <div class="r8-skeleton__avatar"></div>
      <div class="r8-skeleton__text">
        <div class="r8-skeleton__title"></div>
        <div class="r8-skeleton__line"></div>
        <div class="r8-skeleton__line r8-skeleton__line--short"></div>
      </div>
    </div>
  </div>

  <div class="r8-skeleton" data-r8-animated="false">
    <div class="r8-skeleton__title"></div>
    <div class="r8-skeleton__line"></div>
    <div class="r8-skeleton__line r8-skeleton__line--medium"></div>
    <div class="r8-skeleton__line r8-skeleton__line--short"></div>
  </div>

  <div class="r8-skeleton">
    <div class="r8-skeleton__shape r8-skeleton__shape--circle" style="--r8-skeleton-shape-width: 3rem; --r8-skeleton-shape-height: 3rem;"></div>
    <div class="r8-skeleton__shape r8-skeleton__shape--rectangle" style="--r8-skeleton-shape-width: 11rem; --r8-skeleton-shape-height: 1.1rem;"></div>
  </div>
</div>`,
    anatomy: ll(
      [
        "`r8-skeleton` é o contêiner base. Ele organiza as peças falsas e aceita variáveis para espaçamento, alturas e velocidade do shimmer.",
        "`r8-skeleton__media`, `__avatar`, `__title`, `__line`, `__button` e `__shape` permitem aproximar o placeholder do layout real sem inventar marcação aleatorio.",
        "`r8-skeleton--card` adiciona moldura e espaçamento interno quando o carregamento precisa reservar o mesmo volume de um card real.",
        "As variantes de largura como `r8-skeleton__line--medium` e `--short` ajudam a quebrar a repeticao e deixam a leitura mais natural.",
        "Use `r8-skeleton__shape--circle` ou `--rectangle` e ajuste `--r8-skeleton-shape-width`/`--r8-skeleton-shape-height` para montar placeholders livres.",
      ],
      [
        "`r8-skeleton` is the base wrapper. It arranges the fake pieces and accepts variables for spacing, heights, and shimmer speed.",
        "`r8-skeleton__media`, `__avatar`, `__title`, `__line`, `__button`, and `__shape` let you match the placeholder to the real layout without inventing random markup.",
        "`r8-skeleton--card` adds frame and padding when loading needs to reserve the same footprint as a real card.",
        "Width variants such as `r8-skeleton__line--medium` and `--short` help break repetition and make the placeholder feel more natural.",
        "Use `r8-skeleton__shape--circle` or `--rectangle` and tune `--r8-skeleton-shape-width`/`--r8-skeleton-shape-height` for free-form placeholders.",
      ],
    ),
    accessibility: ll(
      [
        "Use skeleton apenas como retorno visual temporario. Quando os dados chegarem, troque pelo conteúdo real em vez de deixar a UI em estado ambiguo por muito tempo.",
        "Desative ou reduza a animacao em contextos sensiveis a movimento; `data-r8-animated=\"false\"` cobre esse caso sem trocar classes.",
        "O ideal e que o placeholder reserve dimensoes proximas das do DOM final para evitar saltos visuais grandes quando o conteúdo carregar.",
      ],
      [
        "Use skeletons only as temporary feedback. Once data arrives, swap them for real content instead of leaving the UI in an ambiguous state for too long.",
        "Disable or reduce animation in motion-sensitive contexts; `data-r8-animated=\"false\"` covers that without changing classes.",
        "Ideally the placeholder should reserve dimensions close to the final DOM to avoid large visual jumps when content loads.",
      ],
    ),
    api: [
      {
        name: "data-r8-animated",
        description: l(
          "Liga ou pausa o shimmer do skeleton sem precisar remover a estrutura inteira.",
          "Turns the skeleton shimmer on or off without removing the whole structure.",
        ),
      },
      {
        name: "data-r8-shape",
        description: l(
          "Quando aplicado em `r8-skeleton__shape`, alterna entre rectangle e circle sem trocar classes.",
          "When applied on `r8-skeleton__shape`, switches between rectangle and circle without replacing classes.",
        ),
      },
      {
        name: "r8-skeleton__media / __avatar / __title / __button",
        description: l(
          "Peças estruturais para aproximar o carregamento de cards, perfis, listas e CTAs reais.",
          "Structural pieces for matching cards, profiles, lists, and real CTAs during loading.",
        ),
      },
      {
        name: "r8-skeleton__shape / __shape--circle / __shape--rectangle",
        description: l(
          "Bloco livre para criar circle ou rectangle com largura/altura customizadas por instancia.",
          "Free shape block for creating circle or rectangle placeholders with per-instance custom width/height.",
        ),
      },
      {
        name: "r8-skeleton__line--medium / --short",
        description: l(
          "Varia a largura das linhas para fugir de um bloco de texto artificialmente uniforme.",
          "Varies line widths so the text block does not feel artificially uniform.",
        ),
      },
      {
        name: "--r8-skeleton-media-height / --r8-skeleton-avatar-size / --r8-skeleton-shape-width / --r8-skeleton-shape-height / --r8-skeleton-shape-radius / --r8-skeleton-speed",
        description: l(
          "Ajusta altura de mídia, escala do avatar, geometria livre (largura/altura/radius) e ritmo da animacao sem sair da API pública.",
          "Adjusts media height, avatar scale, free geometry (width/height/radius), and animation pace without leaving the public API.",
        ),
      },
    ],
  },
  {
    id: "table",
    name: "Table",
    group: "data",
    summary: l(
      "Tabela com linhas alternadas, destaque de estados, modo compacto e cabeçalho fixo opcional.",
      "Table with striped rows, status styling, compact mode, and an optional fixed header.",
    ),
    classes: [
      "r8-table-wrap",
      "r8-table-wrap--fixed",
      "r8-table",
      "r8-table--striped",
      "r8-table--hover",
      "r8-table--sm",
      "r8-table__row--success",
      "r8-table__row--warning",
      "r8-table__row--danger",
      "r8-table__row--info",
      "r8-table__cell--truncate",
      "r8-table__cell--numeric",
      "--r8-table-max-height",
    ],
    preview: `<div class="r8-table-wrap r8-table-wrap--fixed" style="--r8-table-max-height: 13rem;">
  <table class="r8-table r8-table--striped r8-table--hover">
    <thead>
      <tr>
        <th>Name</th>
        <th>Status</th>
        <th>Role</th>
        <th>Address</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      <tr class="r8-table__row--success">
        <td>PIX-07</td>
        <td>Stable</td>
        <td>Engineer</td>
        <td class="r8-table__cell--truncate">Orbital dock / maintenance corridor / west sector</td>
        <td class="r8-table__cell--numeric">98</td>
      </tr>
      <tr class="r8-table__row--warning">
        <td>PIX-11</td>
        <td>Queued</td>
        <td>Medic</td>
        <td class="r8-table__cell--truncate">Forward wing / command relay / upper rail</td>
        <td class="r8-table__cell--numeric">64</td>
      </tr>
      <tr>
        <td>PIX-21</td>
        <td>Review</td>
        <td>Analyst</td>
        <td class="r8-table__cell--truncate">Gamma gate / archive lane / checkpoint 04</td>
        <td class="r8-table__cell--numeric">72</td>
      </tr>
    </tbody>
  </table>
</div>`,
    code: `<div class="r8-table-wrap r8-table-wrap--fixed" style="--r8-table-max-height: 14rem;">
  <table class="r8-table r8-table--striped r8-table--hover r8-table--sm">
    <thead>
      <tr>
        <th>Name</th>
        <th>Status</th>
        <th>Role</th>
        <th>Address</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      <tr class="r8-table__row--success">
        <td>PIX-07</td>
        <td>Stable</td>
        <td>Engineer</td>
        <td class="r8-table__cell--truncate">Orbital dock / maintenance corridor / west sector</td>
        <td class="r8-table__cell--numeric">98</td>
      </tr>
      <tr class="r8-table__row--warning">
        <td>PIX-11</td>
        <td>Queued</td>
        <td>Medic</td>
        <td class="r8-table__cell--truncate">Forward wing / command relay / upper rail</td>
        <td class="r8-table__cell--numeric">64</td>
      </tr>
      <tr class="r8-table__row--danger">
        <td>PIX-42</td>
        <td>Offline</td>
        <td>Scout</td>
        <td class="r8-table__cell--truncate">Dust line / sensor break / lower canyon</td>
        <td class="r8-table__cell--numeric">12</td>
      </tr>
    </tbody>
  </table>
</div>`,
    anatomy: ll(
      [
        "`r8-table-wrap` segura overflow horizontal e, com `r8-table-wrap--fixed`, habilita cabeçalho sticky via `--r8-table-max-height`.",
        "`r8-table` continua sendo a raiz semântica da grade e aceita modificadores como `--striped`, `--hover` e `--sm` para mudar leitura e densidade.",
        "As classes `r8-table__row--success|warning|danger|info` destacam linhas sem depender de runtime.",
        "`r8-table__cell--truncate` e `__cell--numeric` ajudam em colunas longas e valores alinhados a direita.",
      ],
      [
        "`r8-table-wrap` handles horizontal overflow and, with `r8-table-wrap--fixed`, enables a sticky header through `--r8-table-max-height`.",
        "`r8-table` remains the semantic grid root and accepts modifiers such as `--striped`, `--hover`, and `--sm` to change readability and density.",
        "`r8-table__row--success|warning|danger|info` highlight rows without relying on runtime.",
        "`r8-table__cell--truncate` and `__cell--numeric` help with long columns and right-aligned values.",
      ],
    ),
    accessibility: ll(
      [
        "Use `th scope=\"col\"` no cabeçalho e mantenha a ordem das colunas previsível, principalmente quando houver scroll horizontal.",
        "Não use cor sozinha para estados de linha. O texto da coluna de status ainda deve explicar o que mudou.",
        "Se truncar conteúdo longo, preserve o dado completo em `title` ou em um detalhe acessível no fluxo real da aplicação.",
      ],
      [
        "Use `th scope=\"col\"` in the header and keep column order predictable, especially when horizontal scrolling is present.",
        "Do not rely on color alone for row states. The status column text should still explain what changed.",
        "If you truncate long content, preserve the full value in `title` or another accessible detail in the real application flow.",
      ],
    ),
    api: [
      {
        name: "r8-table-wrap / r8-table-wrap--fixed",
        description: l(
          "Wrapper opcional para overflow horizontal e cabeçalho fixo com scroll vertical.",
          "Optional wrapper for horizontal overflow and a fixed header with vertical scrolling.",
        ),
      },
      {
        name: "r8-table--striped / --hover / --sm",
        description: l(
          "Controlam zebra, destaque no hover e densidade compacta sem tocar na estrutura do HTML.",
          "Control striping, hover highlight, and compact density without touching the HTML structure.",
        ),
      },
      {
        name: "r8-table__row--success|warning|danger|info",
        description: l(
          "Aplica estados visuais por linha para tabelas operacionais, auditoria e filas.",
          "Applies visual row states for operational tables, audits, and queues.",
        ),
      },
      {
        name: "--r8-table-max-height / r8-table__cell--truncate / r8-table__cell--numeric",
        description: l(
          "Ajustam altura do contêiner, truncamento de texto e alinhamento numérico de colunas.",
          "Adjust wrapper height, text truncation, and numeric column alignment.",
        ),
      },
    ],
  },
  {
    id: "tag",
    name: "Tag",
    group: "data",
    summary: l(
      "Etiqueta compacta para identificar estados, categorias e informações relacionadas.",
      "Compact tag for identifying statuses, categories, and related information.",
    ),
    classes: ["r8-tag", "r8-tag--success", "r8-tag--danger"],
    preview: `<div class="r8-cluster">
  <span class="r8-tag">default</span>
  <span class="r8-tag r8-tag--success">synced</span>
  <span class="r8-tag r8-tag--danger">error</span>
</div>`,
  },
] satisfies CatalogEntry[];

const navigationComponents = [
  {
    id: "breadcrumb",
    name: "Breadcrumb",
    group: "navigation",
    summary: l(
      "Trilha de navegação com links, separador configurável e indicação da página atual.",
      "Navigation trail with links, configurable separators, and a current-page indicator.",
    ),
    classes: [
      "r8-breadcrumb",
      "r8-breadcrumb--compact",
      "r8-breadcrumb--nowrap",
      "r8-breadcrumb__item",
      "r8-breadcrumb__link",
      "data-r8-separator",
      "--r8-breadcrumb-gap",
      "--r8-breadcrumb-separator-color",
      "--r8-breadcrumb-current-color",
      "--r8-breadcrumb-link-color",
      "--r8-breadcrumb-link-hover-color",
    ],
    preview: `<nav aria-label="Breadcrumb">
  <ol class="r8-breadcrumb" data-r8-separator="chevron">
    <li class="r8-breadcrumb__item"><a class="r8-breadcrumb__link" href="#">Home</a></li>
    <li class="r8-breadcrumb__item"><a class="r8-breadcrumb__link" href="#">Components</a></li>
    <li class="r8-breadcrumb__item"><a class="r8-breadcrumb__link" href="#">Navigation</a></li>
    <li class="r8-breadcrumb__item" aria-current="page">Breadcrumb</li>
  </ol>
</nav>`,
    code: `<nav aria-label="Breadcrumb">
  <ol class="r8-breadcrumb r8-breadcrumb--compact" data-r8-separator="dot">
    <li class="r8-breadcrumb__item"><a class="r8-breadcrumb__link" href="/">Home</a></li>
    <li class="r8-breadcrumb__item"><a class="r8-breadcrumb__link" href="/docs">Docs</a></li>
    <li class="r8-breadcrumb__item"><a class="r8-breadcrumb__link" href="/docs/navigation">Navigation</a></li>
    <li class="r8-breadcrumb__item" aria-current="page">Breadcrumb</li>
  </ol>
</nav>`,
    anatomy: ll(
      [
        "`r8-breadcrumb` organiza a trilha horizontal e aceita `data-r8-separator` para trocar o divisor sem mexer no HTML dos itens.",
        "`r8-breadcrumb__item` funciona bem com `li`, `span` ou contêineres leves para manter semântica de lista.",
        "`r8-breadcrumb__link` aplica estados interativos apenas aos niveis clicaveis, preservando o item atual como texto ou `aria-current`.",
        "`r8-breadcrumb--compact` e `r8-breadcrumb--nowrap` ajudam quando a trilha precisa caber em headers densos ou barras superiores.",
      ],
      [
        "`r8-breadcrumb` lays out the trail horizontally and accepts `data-r8-separator` so you can change the divider without touching item HTML.",
        "`r8-breadcrumb__item` works well with `li`, `span`, or light wrappers to keep list semantics intact.",
        "`r8-breadcrumb__link` applies interactive states only to clickable levels, preserving the current item as text or `aria-current`.",
        "`r8-breadcrumb--compact` and `r8-breadcrumb--nowrap` help when the trail needs to fit dense headers or top bars.",
      ],
    ),
    accessibility: ll(
      [
        "Envolva a trilha em `nav` com `aria-label=\"Breadcrumb\"` para expor o contexto de navegação para leitores de tela.",
        "Marque apenas o último item com `aria-current=\"page\"` e evite transforma-lo em link se ele não realmente navegar.",
        "Se usar `r8-breadcrumb--nowrap`, garanta que a ordem continue previsível e que o usuário consiga rolar horizontalmente quando necessário.",
      ],
      [
        "Wrap the trail in `nav` with `aria-label=\"Breadcrumb\"` so assistive tech gets clear navigation context.",
        "Mark only the last item with `aria-current=\"page\"` and avoid turning it into a link if it does not actually navigate.",
        "If you use `r8-breadcrumb--nowrap`, make sure order remains predictable and users can scroll horizontally when needed.",
      ],
    ),
    api: [
      {
        name: "data-r8-separator",
        description: l(
          "Aceita `slash`, `chevron`, `double` ou `dot` para mudar o caractere separador da trilha.",
          "Accepts `slash`, `chevron`, `double`, or `dot` to change the trail separator character.",
        ),
      },
      {
        name: "r8-breadcrumb__link",
        description: l(
          "Aplica leitura e foco adequados aos niveis clicaveis sem misturar o estado atual com links falsos.",
          "Applies appropriate reading and focus states to clickable levels without mixing the current state with fake links.",
        ),
      },
      {
        name: "r8-breadcrumb--compact / r8-breadcrumb--nowrap",
        description: l(
          "Ajustam densidade e quebra de linha para headers, toolbars ou áreas com pouco espaco horizontal.",
          "Adjust density and line wrapping for headers, toolbars, or areas with limited horizontal space.",
        ),
      },
      {
        name: "--r8-breadcrumb-gap / --r8-breadcrumb-separator-color / --r8-breadcrumb-link-color",
        description: l(
          "Permitem alinhar espaçamento, cor do separador e tom dos links ao contexto visual local.",
          "Let you tune spacing, separator color, and link tone to the local visual context.",
        ),
      },
    ],
  },
  {
    id: "dropdown",
    name: "Dropdown",
    group: "navigation",
    summary: l(
      "Menu de ações com itens selecionados, desabilitados ou de exclusão, divisórias e acionador simples ou dividido.",
      "Actions menu with selected, disabled, and destructive items, dividers, and a simple or split trigger.",
    ),
    classes: [
      "r8-dropdown",
      "r8-dropdown--end",
      "r8-dropdown__split",
      "r8-dropdown__trigger",
      "r8-dropdown__action",
      "r8-dropdown__menu",
      "r8-dropdown__item",
      "r8-dropdown__item--divided",
      "r8-dropdown__item--danger",
      "data-r8-command",
      "data-r8-close-on-select",
      "--r8-dropdown-menu-width",
      "--r8-dropdown-item-padding-x",
      "--r8-dropdown-item-padding-y",
    ],
    preview: `<div class="r8-dropdown">
  <button class="r8-btn r8-btn--sm r8-dropdown__trigger" type="button">Actions</button>
  <div class="r8-dropdown__menu" hidden>
    <button class="r8-dropdown__item" type="button" data-r8-command="duplicate">Duplicate</button>
    <button class="r8-dropdown__item is-selected" type="button" data-r8-command="archive">Archive</button>
    <button class="r8-dropdown__item" type="button" data-r8-command="share" aria-disabled="true">Share</button>
    <button class="r8-dropdown__item r8-dropdown__item--divided r8-dropdown__item--danger" type="button" data-r8-command="delete">Delete</button>
  </div>
</div>`,
    code: `<div class="r8-dropdown r8-dropdown--end">
  <div class="r8-dropdown__split">
    <button class="r8-btn r8-btn--sm r8-dropdown__action" type="button">Run now</button>
    <button class="r8-btn r8-btn--sm r8-dropdown__trigger" type="button">More</button>
  </div>
  <div class="r8-dropdown__menu" style="--r8-dropdown-menu-width: 13rem;" hidden>
    <button class="r8-dropdown__item" type="button" data-r8-command="duplicate">Duplicate</button>
    <button class="r8-dropdown__item" type="button" data-r8-command="rename">Rename</button>
    <button class="r8-dropdown__item r8-dropdown__item--divided" type="button" data-r8-command="archive">Archive</button>
    <button class="r8-dropdown__item r8-dropdown__item--danger" type="button" data-r8-command="delete">Delete</button>
  </div>
</div>`,
    anatomy: ll(
      [
        "`r8-dropdown` agrupa acionador e menu, e aceita `r8-dropdown--end` quando o painel precisa alinhar pela borda direita.",
        "`r8-dropdown__trigger` identifica o botão que abre ou recolhe o menu; `r8-dropdown__action` cobre o botão lateral de um dividido acionador.",
        "`r8-dropdown__item` continua semântico o bastante para usar `button`, `a` ou outros action-like elements preparados pelo runtime.",
        "`r8-dropdown__item--divided`, `__item--danger` e `aria-disabled=\"true\"` resolvem os estados mais comuns sem inventar uma API grande demais.",
      ],
      [
        "`r8-dropdown` groups the trigger and menu, and accepts `r8-dropdown--end` when the panel should align to the right edge.",
        "`r8-dropdown__trigger` identifies the button that opens or closes the menu; `r8-dropdown__action` covers the side button in a split trigger.",
        "`r8-dropdown__item` stays semantic enough to be used with `button`, `a`, or other action-like elements prepared by the runtime.",
        "`r8-dropdown__item--divided`, `__item--danger`, and `aria-disabled=\"true\"` cover the most common states without inventing an oversized API.",
      ],
    ),
    accessibility: ll(
      [
        "Use `button` ou `a` nos itens quando possível, e marque apenas itens indisponiveis com `aria-disabled=\"true\"`.",
        "Quando houver dividido acionador, mantenha o botão lateral principal com ação clara e o acionador do menu com rótulo próprio.",
        "Se usar `data-r8-close-on-select=\"false\"`, garanta outra forma simples de fechar o menu por teclado ou clique fora.",
      ],
      [
        "Use `button` or `a` for items when possible, and mark unavailable items only with `aria-disabled=\"true\"`.",
        "When using a split trigger, keep the primary side button tied to a clear action and give the menu trigger its own label.",
        "If you use `data-r8-close-on-select=\"false\"`, make sure there is another simple way to close the menu through keyboard or outside click.",
      ],
    ),
    api: [
      {
        name: "data-r8-command",
        description: l(
          "Valor declarativo emitido no evento `r8:dropdown-command` quando o item e acionado.",
          "Declarative value emitted in the `r8:dropdown-command` event when the item is activated.",
        ),
      },
      {
        name: "data-r8-close-on-select",
        description: l(
          "Aceita `false` para manter o painel aberto apos uma seleção, útil em menus de inspeção ou batch ações.",
          "Accepts `false` to keep the panel open after selection, useful for inspection menus or batch actions.",
        ),
      },
      {
        name: "r8-dropdown--end / r8-dropdown__split",
        description: l(
          "Cobrem alinhamento a direita e o layout de dividido acionador sem depender de JS adicional.",
          "Cover right-edge alignment and split-trigger layout without extra JS.",
        ),
      },
      {
        name: "--r8-dropdown-menu-width / --r8-dropdown-item-padding-x / --r8-dropdown-item-padding-y",
        description: l(
          "Permitem ajustar largura do painel e densidade dos itens para toolbars, cards e menus compactos.",
          "Let you tune panel width and item density for toolbars, cards, and compact menus.",
        ),
      },
    ],
  },
  {
    id: "steps",
    name: "Steps",
    group: "navigation",
    summary: l(
      "Indicador visual de etapas para cadastros, compras e processos guiados.",
      "Visual step indicator for registration, checkout, and guided workflows.",
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
      "Abas com painéis associados e navegação por clique, setas, Home e End.",
      "Tabs with associated panels and navigation by click, arrow keys, Home, and End.",
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
      "Mensagem contextual de informação, sucesso, aviso ou erro, com fechamento opcional.",
      "Contextual information, success, warning, or error message with optional dismissal.",
    ),
    classes: [
      "r8-alert",
      "r8-alert--primary",
      "r8-alert--secondary",
      "r8-alert--tertiary",
      "r8-alert--success",
      "r8-alert--warning",
      "r8-alert--info",
      "r8-alert--danger",
      "r8-alert--dark",
      "r8-alert--light",
      "r8-alert--surface",
      "r8-alert--center",
      "r8-alert--dismissible",
      "r8-alert__layout",
      "r8-alert__icon",
      "r8-alert__content",
      "r8-alert__title",
      "r8-alert__heading",
      "r8-alert__body",
      "r8-alert__description",
      "r8-alert__link",
      "r8-alert__close",
      "r8-alert__actions",
    ],
    preview: `<div class="docs-demo__stack">
  <section class="r8-alert r8-alert--primary r8-alert--surface" role="alert">
    <div class="r8-alert__layout">
      <span class="r8-alert__icon" aria-hidden="true">i</span>
      <div class="r8-alert__content">
        <strong class="r8-alert__title">Primary alert</strong>
        <p class="r8-alert__description">System boots with the default mission profile and synced controls.</p>
      </div>
    </div>
  </section>

  <section class="r8-alert r8-alert--success r8-alert--surface" role="status" aria-live="polite">
    <div class="r8-alert__layout">
      <span class="r8-alert__icon" aria-hidden="true">OK</span>
      <div class="r8-alert__content">
        <strong class="r8-alert__title">Success alert</strong>
        <p class="r8-alert__description">
          Deployment finished cleanly.
          <a class="r8-alert__link" href="#">Read release notes</a>
        </p>
      </div>
    </div>
  </section>

  <section class="r8-alert r8-alert--info r8-alert--surface r8-alert--center r8-alert--dismissible" role="alert">
    <div class="r8-alert__layout">
      <span class="r8-alert__icon" aria-hidden="true">!</span>
      <div class="r8-alert__content">
        <strong class="r8-alert__title">Centered alert</strong>
        <p class="r8-alert__description">Use centered content when the message is short and needs stronger emphasis.</p>
      </div>
    </div>
    <button class="r8-alert__close" type="button" aria-label="Dismiss alert">Got it</button>
  </section>

  <button class="r8-btn r8-btn--secondary" type="button" data-r8-toggle="alert" data-r8-target="#docs-alert-live">
    Show dismissible alert
  </button>

  <section class="r8-alert r8-alert--warning r8-alert--dismissible" id="docs-alert-live" role="alert" hidden>
    <div class="r8-alert__layout">
      <span class="r8-alert__icon" aria-hidden="true">!</span>
      <div class="r8-alert__content">
        <strong class="r8-alert__title">Live alert</strong>
        <p class="r8-alert__description">Nice, you triggered this alert message from the preview action.</p>
      </div>
    </div>
    <button class="r8-alert__close" type="button" data-r8-dismiss="true" aria-label="Dismiss alert">x</button>
  </section>

  <section class="r8-alert r8-alert--danger" role="alert">
    <div class="r8-alert__layout">
      <span class="r8-alert__icon" aria-hidden="true">!!</span>
      <div class="r8-alert__content">
        <h3 class="r8-alert__heading">System offline</h3>
        <div class="r8-alert__body">
          <p class="r8-text">Backup power is running on a reduced grid while the main core cools down.</p>
          <hr />
          <p class="r8-text">Use the maintenance tunnel and keep all squad traffic on channel 03.</p>
        </div>
        <div class="r8-alert__actions">
          <button class="r8-btn r8-btn--sm r8-btn--light" type="button">Review</button>
          <button class="r8-btn r8-btn--sm" type="button">Later</button>
        </div>
      </div>
    </div>
  </section>

  <section class="r8-alert r8-alert--dark" role="alert">
    <div class="r8-alert__layout">
      <span class="r8-alert__icon" aria-hidden="true">*</span>
      <div class="r8-alert__content">
        <strong class="r8-alert__title">Dark alert</strong>
        <p class="r8-alert__description">Use the solid look when the message must stand out without another container around it.</p>
      </div>
    </div>
  </section>
</div>`,
    code: `<section class="r8-alert r8-alert--success r8-alert--surface r8-alert--dismissible" role="status" aria-live="polite">
  <div class="r8-alert__layout">
    <span class="r8-alert__icon" aria-hidden="true">OK</span>
    <div class="r8-alert__content">
      <strong class="r8-alert__title">Success alert</strong>
      <p class="r8-alert__description">
        Deployment finished cleanly.
        <a class="r8-alert__link" href="#">Read release notes</a>
      </p>
      <div class="r8-alert__actions">
        <button class="r8-btn r8-btn--sm r8-btn--primary" type="button">Review</button>
      </div>
    </div>
  </div>
  <button class="r8-alert__close" type="button" data-r8-dismiss="true" aria-label="Dismiss alert">Got it</button>
</section>

<button class="r8-btn r8-btn--secondary" type="button" data-r8-toggle="alert" data-r8-target="#inline-alert">
  Show dismissible alert
</button>

<section id="inline-alert" class="r8-alert r8-alert--warning r8-alert--surface r8-alert--dismissible" role="alert" hidden>
  <div class="r8-alert__layout">
    <span class="r8-alert__icon" aria-hidden="true">!</span>
    <div class="r8-alert__content">
      <strong class="r8-alert__title">Live alert</strong>
      <p class="r8-alert__description">Nice, you triggered this alert message.</p>
    </div>
  </div>
  <button class="r8-alert__close" type="button" data-r8-dismiss="true" aria-label="Dismiss alert">x</button>
</section>`,
    anatomy: ll(
      [
        "`r8-alert` define o moldura base, enquanto os tons continuam em modificadores como `--success`, `--warning` ou `--danger`.",
        "`r8-alert--surface` troca o bloco sólido por uma leitura mais leve, e `r8-alert--center` recentraliza ícone, texto e ações.",
        "`r8-alert__layout` organiza o ícone ao lado do conteúdo; `r8-alert__icon` pode ser texto curto, glifo ou SVG inline.",
        "`r8-alert__title`, `r8-alert__description`, `r8-alert__body` e `r8-alert__actions` deixam mensagens simples e callouts longos no mesmo sistema.",
        "`r8-alert__close` continua opcional e agora aceita tanto um `x` quanto rótulos curtos como `Got it` ou `Close`.",
      ],
      [
        "`r8-alert` defines the base frame, while tones stay in modifiers such as `--success`, `--warning`, or `--danger`.",
        "`r8-alert--surface` switches the solid block into a lighter read, and `r8-alert--center` recenters the icon, copy, and actions.",
        "`r8-alert__layout` places the icon beside the content; `r8-alert__icon` can hold short text, a glyph, or inline SVG.",
        "`r8-alert__title`, `r8-alert__description`, `r8-alert__body`, and `r8-alert__actions` keep simple messages and longer callouts in the same system.",
        "`r8-alert__close` stays optional and now supports either an `x` or short labels such as `Got it` or `Close`.",
      ],
    ),
    accessibility: ll(
      [
        "Use `role=\"alert\"` para mensagens urgentes e `role=\"status\"` com `aria-live=\"polite\"` quando o update não deve interromper a leitura atual.",
        "Quando o close for icon-only, mantenha um `aria-label` explicito como `Dismiss alert`.",
        "Não dependa só da cor para semântica; combine tom, título e descrição para deixar sucesso, aviso e erro claros.",
        "Se o Alert abrir por acionador declarativo, preserve o foco no fluxo principal e use texto curta para anúncios live.",
      ],
      [
        "Use `role=\"alert\"` for urgent messages and `role=\"status\"` with `aria-live=\"polite\"` when the update should not interrupt current reading.",
        "When the close affordance is icon-only, keep an explicit `aria-label` such as `Dismiss alert`.",
        "Do not rely on color alone for semantics; combine tone, title, and description so success, warning, and error stay clear.",
        "If the Alert opens through a declarative trigger, keep focus in the main flow and use short copy for live announcements.",
      ],
    ),
    api: [
      {
        name: "r8-alert--surface / r8-alert--center",
        description: l(
          "Modificadores visuais para alternar entre o look sólido e uma superfície mais leve, ou recentralizar o conteúdo quando a mensagem e curta.",
          "Visual modifiers for switching between the solid look and a lighter surface, or recentering content when the message is short.",
        ),
      },
      {
        name: "r8-alert__layout / r8-alert__icon",
        description: l(
          "Estruturam um alert com ícone sem exigir runtime extra; o ícone pode ser texto curto, símbolo ou SVG inline.",
          "Structure an icon-driven alert without extra runtime; the icon can be short text, a glyph, or inline SVG.",
        ),
      },
      {
        name: "r8-alert__description / r8-alert__body / r8-alert__actions",
        description: l(
          "Cobrem desde alerts de uma linha até callouts maiores com descrição detalhada e CTA inline.",
          "Cover everything from one-line alerts to larger callouts with detailed description and inline CTAs.",
        ),
      },
      {
        name: "r8-alert__close + data-r8-dismiss",
        description: l(
          "Permitem fechar o elemento imediatamente e aceitar texto customizado no botão, não apenas um símbolo fixo.",
          "Allow closing the host immediately while accepting custom button text, not only a fixed symbol.",
        ),
      },
      {
        name: "data-r8-toggle / data-r8-target",
        description: l(
          "Abrem ou recolhem um Alert hidden para prévias live e mensagens inline controladas declarativamente.",
          "Open or collapse a hidden Alert for live previews and inline messages controlled declaratively.",
        ),
      },
    ],
  },
  {
    id: "dialog",
    name: "Dialog",
    group: "feedback",
    summary: l(
      "Diálogo modal para confirmações e interrupções, usando o elemento HTML nativo ou lógica da aplicação.",
      "Modal dialog for confirmations and interruptions, using native HTML or application logic.",
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
      "Painel deslizante com modo modal opcional, gerenciamento de foco e controles de fechamento e rolagem.",
      "Sliding panel with optional modal behavior, focus management, and dismissal and scroll controls.",
    ),
    classes: [
      "r8-drawer",
      "r8-drawer--right",
      "r8-drawer--left",
      "r8-drawer--top",
      "r8-drawer--bottom",
      "r8-drawer__header",
      "r8-drawer__copy",
      "r8-drawer__title",
      "r8-drawer__meta",
      "r8-drawer__close",
      "r8-drawer__body",
      "r8-drawer__footer",
      "r8-drawer-backdrop",
      "data-r8-modal",
      "data-r8-close-on-backdrop",
      "data-r8-close-on-escape",
      "data-r8-lock-scroll",
      "--r8-drawer-size",
      "--r8-drawer-min-size",
      "--r8-drawer-header-surface",
      "--r8-drawer-footer-surface",
      "--r8-drawer-body-padding",
    ],
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
    <aside
      id="docs-drawer-preview"
      class="r8-drawer r8-drawer--right"
      style="--r8-drawer-size: 27rem;"
      aria-labelledby="docs-drawer-preview-title"
      hidden
    >
      <div class="r8-drawer__header">
        <div class="r8-drawer__copy">
          <strong id="docs-drawer-preview-title" class="r8-drawer__title">Quick settings</strong>
          <p class="r8-drawer__meta">Backdrops, escape close and local overlay scopes are all handled by the runtime.</p>
        </div>
        <button class="r8-drawer__close" type="button" data-r8-close="#docs-drawer-preview" aria-label="Close drawer">x</button>
      </div>
      <div class="r8-drawer__body">
        <p class="r8-text">Tune the active color palette, HUD density and quick mission toggles without leaving the current surface.</p>
        <label class="r8-checkbox is-checked">
          <span class="r8-checkbox__box" aria-hidden="true"></span>
          <span>Show minimap</span>
        </label>
        <label class="r8-checkbox">
          <span class="r8-checkbox__box" aria-hidden="true"></span>
          <span>Enable scanlines</span>
        </label>
        <label class="r8-checkbox is-checked">
          <span class="r8-checkbox__box" aria-hidden="true"></span>
          <span>Compact density</span>
        </label>
      </div>
      <div class="r8-drawer__footer">
        <button class="r8-btn r8-btn--sm" type="button" data-r8-close="#docs-drawer-preview">Cancel</button>
        <button class="r8-btn r8-btn--sm r8-btn--primary" type="button" data-r8-close="#docs-drawer-preview">Apply</button>
      </div>
    </aside>
  </div>
</div>`,
    code: `<div class="r8-stack">
  <button
    class="r8-btn r8-btn--primary"
    type="button"
    data-r8-toggle="drawer"
    data-r8-target="#settings-drawer"
  >
    Open drawer
  </button>

  <div data-r8-overlay-scope style="min-height: 20rem;">
    <aside
      id="settings-drawer"
      class="r8-drawer r8-drawer--right"
      style="--r8-drawer-size: 28rem;"
      data-r8-close-on-backdrop="false"
      aria-labelledby="settings-drawer-title"
      hidden
    >
      <div class="r8-drawer__header">
        <div class="r8-drawer__copy">
          <strong id="settings-drawer-title" class="r8-drawer__title">Quick settings</strong>
          <p class="r8-drawer__meta">Keep the panel open during multi-step edits and close it only through explicit actions.</p>
        </div>
        <button class="r8-drawer__close" type="button" data-r8-close="#settings-drawer" aria-label="Close drawer">x</button>
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
        <label class="r8-checkbox is-checked">
          <span class="r8-checkbox__box" aria-hidden="true"></span>
          <span>Keep help panel visible</span>
        </label>
      </div>

      <div class="r8-drawer__footer">
        <button class="r8-btn r8-btn--sm" type="button" data-r8-close="#settings-drawer">Cancel</button>
        <button class="r8-btn r8-btn--sm r8-btn--primary" type="button" data-r8-close="#settings-drawer">Apply</button>
      </div>
    </aside>
  </div>
</div>`,
    anatomy: ll(
      [
        "`r8-drawer` define a estrutura do painel e combina com `r8-drawer--right`, `--left`, `--top` ou `--bottom` para a direção de entrada.",
        "`r8-drawer__header` pode receber um bloco `r8-drawer__copy` com `r8-drawer__title` e `r8-drawer__meta`, além de um `r8-drawer__close` opcional.",
        "`r8-drawer__body` concentra o conteúdo rolavel; `r8-drawer__footer` fecha o fluxo com ações persistentes quando houver formulário ou confirmação.",
        "`data-r8-modal`, `data-r8-close-on-backdrop`, `data-r8-close-on-escape` e `data-r8-lock-scroll` ajustam o comportamento sem exigir JS customizado.",
      ],
      [
        "`r8-drawer` defines the panel shell and pairs with `r8-drawer--right`, `--left`, `--top`, or `--bottom` for entry direction.",
        "`r8-drawer__header` can host a `r8-drawer__copy` block with `r8-drawer__title` and `r8-drawer__meta`, plus an optional `r8-drawer__close` button.",
        "`r8-drawer__body` holds the scrollable content; `r8-drawer__footer` closes the flow with persistent actions when a form or confirmation is involved.",
        "`data-r8-modal`, `data-r8-close-on-backdrop`, `data-r8-close-on-escape`, and `data-r8-lock-scroll` tune behavior without requiring custom JS.",
      ],
    ),
    accessibility: ll(
      [
        "Prefira dar nome acessível ao painel com `aria-labelledby` apontando para `r8-drawer__title`; se remover o cabeçalho, use `aria-label` direto no elemento.",
        "Mantenha sempre uma forma explicita de fechar o Drawer quando desabilitar clique no backdrop ou fechamento por `Esc`.",
        "Quando o corpo trouxer formulários longos, preserve a ordem lógica do foco e deixe as ações principais no rodapé ou no topo do painel.",
      ],
      [
        "Prefer giving the panel an accessible name with `aria-labelledby` pointing to `r8-drawer__title`; if you remove the header, use `aria-label` on the host.",
        "Always keep an explicit way to close the Drawer when backdrop click or `Esc` closing is disabled.",
        "When the body contains long forms, preserve logical focus order and keep primary actions in the footer or near the top of the panel.",
      ],
    ),
    api: [
      {
        name: "data-r8-modal / data-r8-close-on-backdrop / data-r8-close-on-escape / data-r8-lock-scroll",
        description: l(
          "Controlam backdrop, clique fora, tecla Escape e bloqueio do scroll global sem sair da API declarativa.",
          "Control backdrop, outside click, Escape handling, and global scroll lock without leaving the declarative API.",
        ),
      },
      {
        name: "r8-drawer--right / --left / --top / --bottom",
        description: l(
          "Definem a direção do painel para filtros laterais, trays superiores ou folhas curtas vindas da base.",
          "Set the panel direction for side filters, top trays, or shorter sheets entering from the bottom.",
        ),
      },
      {
        name: "r8-drawer__copy / __meta / __close",
        description: l(
          "Estruturam headers mais ricos sem depender de campos: texto, contexto secundário e close ação dedicada.",
          "Structure richer headers without slots: copy, secondary context, and a dedicated close action.",
        ),
      },
      {
        name: "--r8-drawer-size / --r8-drawer-min-size / --r8-drawer-body-padding",
        description: l(
          "Permitem ajustar tamanho e densidade do painel para flows compactos, forms longos ou drawers de conteúdo mais denso.",
          "Let you tune panel size and density for compact flows, longer forms, or denser drawers.",
        ),
      },
    ],
  },
  {
    id: "loading",
    name: "Loading",
    group: "feedback",
    summary: l(
      "Indicadores animados de carregamento com pixels, pontos, barras e outras formas retrô.",
      "Animated loading indicators with pixels, dots, bars, and other retro shapes.",
    ),
    classes: [
      "r8-loading",
      "r8-loading--sm",
      "r8-loading--lg",
      "r8-loading__label",
      "r8-loading__pixels",
      "r8-loading__pixel",
      "r8-loading__dots",
      "r8-loading__dot",
      "r8-loading__track",
      "r8-loading__fill",
      "r8-loading__bars",
      "r8-loading__bar",
      "r8-loading__spinner",
      "r8-loading__spinner-cell",
      "r8-loading__ticker",
      "r8-loading__ticker-cell",
      "r8-loading__radar",
      "r8-loading__radar-dot",
      "r8-loading__beacon",
      "r8-loading__beacon-ring",
      "r8-loading__beacon-core",
    ],
    preview: `<div class="r8-grid" style="grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));">
  <div class="r8-stack">
    <span class="r8-badge">Pixels</span>
    <div class="r8-loading" role="status" aria-live="polite">
      <span class="r8-loading__pixels" aria-hidden="true">
        <span class="r8-loading__pixel"></span>
        <span class="r8-loading__pixel"></span>
        <span class="r8-loading__pixel"></span>
      </span>
      <span class="r8-loading__label">Loading assets...</span>
    </div>
  </div>

  <div class="r8-stack">
    <span class="r8-badge">Dots</span>
    <div class="r8-loading" role="status" aria-live="polite">
      <span class="r8-loading__dots" aria-hidden="true">
        <span class="r8-loading__dot"></span>
        <span class="r8-loading__dot"></span>
        <span class="r8-loading__dot"></span>
        <span class="r8-loading__dot"></span>
      </span>
      <span class="r8-loading__label">Syncing save state...</span>
    </div>
  </div>

  <div class="r8-stack">
    <span class="r8-badge">Bar</span>
    <div class="r8-loading" role="status" aria-live="polite">
      <span class="r8-loading__track" aria-hidden="true">
        <span class="r8-loading__fill"></span>
      </span>
      <span class="r8-loading__label">Compiling sprites...</span>
    </div>
  </div>

  <div class="r8-stack">
    <span class="r8-badge">Equalizer</span>
    <div class="r8-loading" role="status" aria-live="polite">
      <span class="r8-loading__bars" aria-hidden="true">
        <span class="r8-loading__bar"></span>
        <span class="r8-loading__bar"></span>
        <span class="r8-loading__bar"></span>
        <span class="r8-loading__bar"></span>
      </span>
      <span class="r8-loading__label">Streaming audio...</span>
    </div>
  </div>

  <div class="r8-stack">
    <span class="r8-badge">Spinner</span>
    <div class="r8-loading r8-loading--lg" role="status" aria-live="polite">
      <span class="r8-loading__spinner" aria-hidden="true">
        <span class="r8-loading__spinner-cell"></span>
        <span class="r8-loading__spinner-cell"></span>
        <span class="r8-loading__spinner-cell"></span>
        <span class="r8-loading__spinner-cell"></span>
        <span class="r8-loading__spinner-cell"></span>
        <span class="r8-loading__spinner-cell"></span>
        <span class="r8-loading__spinner-cell"></span>
        <span class="r8-loading__spinner-cell"></span>
      </span>
      <span class="r8-loading__label">Matching nodes...</span>
    </div>
  </div>

  <div class="r8-stack">
    <span class="r8-badge">Ticker</span>
    <div class="r8-loading" role="status" aria-live="polite">
      <span class="r8-loading__ticker" aria-hidden="true">
        <span class="r8-loading__ticker-cell"></span>
        <span class="r8-loading__ticker-cell"></span>
        <span class="r8-loading__ticker-cell"></span>
        <span class="r8-loading__ticker-cell"></span>
        <span class="r8-loading__ticker-cell"></span>
        <span class="r8-loading__ticker-cell"></span>
      </span>
      <span class="r8-loading__label">Buffering route data...</span>
    </div>
  </div>

  <div class="r8-stack">
    <span class="r8-badge">Radar</span>
    <div class="r8-loading" role="status" aria-live="polite">
      <span class="r8-loading__radar" aria-hidden="true">
        <span class="r8-loading__radar-dot"></span>
      </span>
      <span class="r8-loading__label">Scanning signal range...</span>
    </div>
  </div>

  <div class="r8-stack">
    <span class="r8-badge">Beacon</span>
    <div class="r8-loading" role="status" aria-live="polite">
      <span class="r8-loading__beacon" aria-hidden="true">
        <span class="r8-loading__beacon-ring"></span>
        <span class="r8-loading__beacon-ring"></span>
        <span class="r8-loading__beacon-core"></span>
      </span>
      <span class="r8-loading__label">Waiting for uplink...</span>
    </div>
  </div>
</div>`,
    code: `<div class="r8-grid" style="grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));">
  <div class="r8-stack">
    <span class="r8-badge">Pixels</span>
    <div class="r8-loading" role="status" aria-live="polite">
      <span class="r8-loading__pixels" aria-hidden="true">
        <span class="r8-loading__pixel"></span>
        <span class="r8-loading__pixel"></span>
        <span class="r8-loading__pixel"></span>
      </span>
      <span class="r8-loading__label">Loading assets...</span>
    </div>
  </div>

  <div class="r8-stack">
    <span class="r8-badge">Dots</span>
    <div class="r8-loading" role="status" aria-live="polite">
      <span class="r8-loading__dots" aria-hidden="true">
        <span class="r8-loading__dot"></span>
        <span class="r8-loading__dot"></span>
        <span class="r8-loading__dot"></span>
        <span class="r8-loading__dot"></span>
      </span>
      <span class="r8-loading__label">Syncing save state...</span>
    </div>
  </div>

  <div class="r8-stack">
    <span class="r8-badge">Bar</span>
    <div class="r8-loading" role="status" aria-live="polite">
      <span class="r8-loading__track" aria-hidden="true">
        <span class="r8-loading__fill"></span>
      </span>
      <span class="r8-loading__label">Compiling sprites...</span>
    </div>
  </div>

  <div class="r8-stack">
    <span class="r8-badge">Equalizer</span>
    <div class="r8-loading" role="status" aria-live="polite">
      <span class="r8-loading__bars" aria-hidden="true">
        <span class="r8-loading__bar"></span>
        <span class="r8-loading__bar"></span>
        <span class="r8-loading__bar"></span>
        <span class="r8-loading__bar"></span>
      </span>
      <span class="r8-loading__label">Streaming audio...</span>
    </div>
  </div>

  <div class="r8-stack">
    <span class="r8-badge">Spinner</span>
    <div class="r8-loading r8-loading--lg" role="status" aria-live="polite">
      <span class="r8-loading__spinner" aria-hidden="true">
        <span class="r8-loading__spinner-cell"></span>
        <span class="r8-loading__spinner-cell"></span>
        <span class="r8-loading__spinner-cell"></span>
        <span class="r8-loading__spinner-cell"></span>
        <span class="r8-loading__spinner-cell"></span>
        <span class="r8-loading__spinner-cell"></span>
        <span class="r8-loading__spinner-cell"></span>
        <span class="r8-loading__spinner-cell"></span>
      </span>
      <span class="r8-loading__label">Matching nodes...</span>
    </div>
  </div>

  <div class="r8-stack">
    <span class="r8-badge">Ticker</span>
    <div class="r8-loading" role="status" aria-live="polite">
      <span class="r8-loading__ticker" aria-hidden="true">
        <span class="r8-loading__ticker-cell"></span>
        <span class="r8-loading__ticker-cell"></span>
        <span class="r8-loading__ticker-cell"></span>
        <span class="r8-loading__ticker-cell"></span>
        <span class="r8-loading__ticker-cell"></span>
        <span class="r8-loading__ticker-cell"></span>
      </span>
      <span class="r8-loading__label">Buffering route data...</span>
    </div>
  </div>

  <div class="r8-stack">
    <span class="r8-badge">Radar</span>
    <div class="r8-loading" role="status" aria-live="polite">
      <span class="r8-loading__radar" aria-hidden="true">
        <span class="r8-loading__radar-dot"></span>
      </span>
      <span class="r8-loading__label">Scanning signal range...</span>
    </div>
  </div>

  <div class="r8-stack">
    <span class="r8-badge">Beacon</span>
    <div class="r8-loading" role="status" aria-live="polite">
      <span class="r8-loading__beacon" aria-hidden="true">
        <span class="r8-loading__beacon-ring"></span>
        <span class="r8-loading__beacon-ring"></span>
        <span class="r8-loading__beacon-core"></span>
      </span>
      <span class="r8-loading__label">Waiting for uplink...</span>
    </div>
  </div>
</div>`,
    anatomy: ll(
      [
        "Use `r8-loading` como estrutura base e escolha uma subestrutura visual por instância.",
        "Adicione `r8-loading__label` quando o carregamento precisar de texto visível no layout.",
        "Marque pixels, pontos, barras, trilha/preenchimento e células do indicador giratório como `aria-hidden=\"true\"`.",
      ],
      [
        "Use `r8-loading` as the base shell and choose one visual substructure per instance.",
        "Add `r8-loading__label` when the loading state needs visible copy in the layout.",
        "Mark pixels, dots, bars, track/fill and spinner cells with `aria-hidden=\"true\"`.",
      ],
    ),
    accessibility: ll(
      [
        "Use `role=\"status\"` e `aria-live=\"polite\"` quando o carregamento anunciar atualizações reais.",
        "Prefira rótulo visível; se não houver, forneça `aria-label` no elemento.",
        "As animações respeitam `prefers-reduced-motion` e recuam para uma apresentação estática.",
      ],
      [
        "Use `role=\"status\"` and `aria-live=\"polite\"` when the loading state announces real updates.",
        "Prefer a visible label; if there is none, provide `aria-label` on the host.",
        "Animations respect `prefers-reduced-motion` and fall back to a static presentation.",
      ],
    ),
    api: [
      {
        name: "r8-loading__dots / r8-loading__dot",
        description: l(
          "Variante com pontos menores para sincronização curta e estados leves.",
          "Variant with smaller dots for short sync states and lightweight waits.",
        ),
      },
      {
        name: "r8-loading__track / r8-loading__fill",
        description: l(
          "Variante com trilha e preenchimento em varredura loop, boa para compilacao e fetch continuo.",
          "Variant with a track and looping scan fill, great for compile and continuous fetch states.",
        ),
      },
      {
        name: "r8-loading__bars / r8-loading__bar",
        description: l(
          "Variante em barras verticais, ideal para audio, stream e monitoramento.",
          "Vertical bar variant, ideal for audio, stream and monitoring states.",
        ),
      },
      {
        name: "r8-loading__spinner / r8-loading__spinner-cell",
        description: l(
          "Variante com oito células em rotação step-based para estados mais longos.",
          "Eight-cell step-based rotation variant for longer waits.",
        ),
      },
      {
        name: "r8-loading__ticker / r8-loading__ticker-cell",
        description: l(
          "Variante com segmentos horizontais em sequencia, boa para buffering, sync pipelines e filas curtas.",
          "Sequential horizontal segment variant, good for buffering, sync pipelines, and short queues.",
        ),
      },
      {
        name: "r8-loading__radar / r8-loading__radar-dot",
        description: l(
          "Variante com sweep retrô e alvo marker para varredura, discovery e procura de sinais.",
          "Retro sweep variant with a target marker for scan, discovery, and signal search states.",
        ),
      },
      {
        name: "r8-loading__beacon / r8-loading__beacon-ring / r8-loading__beacon-core",
        description: l(
          "Variante com pulsos concentricos para waiting rooms, uplinks e estados de espera persistentes.",
          "Concentric pulse variant for waiting rooms, uplinks, and persistent wait states.",
        ),
      },
      {
        name: "r8-loading--sm / r8-loading--lg",
        description: l(
          "Size presets para encaixar o carregamento em toolbars, cards ou superfícies maiores.",
          "Size presets for fitting loaders into toolbars, cards or larger surfaces.",
        ),
      },
    ],
  },
  {
    id: "poptip",
    name: "Poptip",
    group: "feedback",
    summary: l(
      "Painel flutuante ou dica curta com abertura por clique, foco, passagem do mouse ou menu de contexto.",
      "Floating panel or short hint opened by click, focus, hover, or context menu.",
    ),
    classes: ["r8-poptip", "r8-poptip__title", "r8-poptip__body", "r8-poptip__actions"],
    preview: `<div class="docs-demo__stack docs-demo__stack--poptip" data-r8-overlay-scope>
  <button
    class="r8-btn r8-btn--secondary"
    type="button"
    data-r8-toggle="poptip"
    data-r8-target="#docs-poptip-panel-preview"
    data-r8-placement="bottom-start"
  >
    Open control panel
  </button>
  <section id="docs-poptip-panel-preview" class="r8-poptip" data-r8-placement="bottom-start" hidden>
    <strong class="r8-poptip__title">Shortcut panel</strong>
    <div class="r8-poptip__body">
      <p class="r8-text">Press G to open the grid overlay and jump to layout guides.</p>
      <div class="r8-poptip__actions">
        <button class="r8-btn r8-btn--sm r8-btn--secondary" type="button" data-r8-close>Close</button>
        <button class="r8-btn r8-btn--sm" type="button">Open docs</button>
      </div>
    </div>
  </section>
</div>`,
    anatomy: ll(
      [
        "`r8-poptip` é a estrutura flutuante reutilizavel para modos painel e dica sem duplicar a API.",
        "`r8-poptip__title` apresenta um heading curto quando o conteúdo precisa de contexto adicional.",
        "`r8-poptip__body` organiza texto, badges, metadata e blocos mais ricos com espaco previsível.",
        "`r8-poptip__actions` fecha o painel com ações compactas, incluindo botão com `data-r8-close` quando fizer sentido.",
      ],
      [
        "`r8-poptip` is the reusable floating shell for both panel and hint modes without duplicating the API.",
        "`r8-poptip__title` adds a short heading when the content needs extra context.",
        "`r8-poptip__body` organizes text, badges, metadata, and richer content blocks with predictable spacing.",
        "`r8-poptip__actions` closes the panel with compact actions, including a `data-r8-close` button when needed.",
      ],
    ),
    accessibility: ll(
      [
        "Use acionador focável para que modos `hover` e `focus` continuem acessíveis no teclado.",
        "Para hints curtos, prefira `data-r8-variant=\"hint\"` e mantenha o texto direto o bastante para leitura rapida.",
        "Em painéis clicaveis, inclua ação clara de fechar quando o conteúdo trouxer varias escolhas ou instruções.",
        "Evite depender apenas da posição do overlay; o rótulo do acionador deve continuar explicando a ação principal.",
      ],
      [
        "Use a focusable trigger so `hover` and `focus` modes remain keyboard-accessible.",
        "For short hints, prefer `data-r8-variant=\"hint\"` and keep the copy direct enough for quick reading.",
        "For clickable panels, add a clear close action when the content contains multiple choices or instructions.",
        "Do not rely only on overlay position; the trigger label should still explain the main action.",
      ],
    ),
    api: [
      {
        name: "data-r8-trigger",
        description: l(
          "Escolhe entre interação por clique, hover ou foco sem trocar a estrutura base do componente.",
          "Chooses between click, hover, or focus interaction without changing the component's base structure.",
        ),
      },
      {
        name: "data-r8-variant / r8-poptip__title",
        description: l(
          "Alternam entre um painel mais rico (`panel`) e uma dica compacta (`hint`) com título opcional.",
          "Switch between a richer panel (`panel`) and a compact hint (`hint`) with an optional title.",
        ),
      },
      {
        name: "data-r8-placement / --r8-poptip-width",
        description: l(
          "Controlam a ancoragem e a largura máxima do overlay em relação ao acionador.",
          "Control anchoring and the overlay's maximum width relative to the trigger.",
        ),
      },
      {
        name: "data-r8-close / r8-poptip__actions",
        description: l(
          "Permitem fechar o painel por auxiliar declarativo e acomodar ações curtas dentro do próprio overlay.",
          "Let you close the panel through the declarative helper and place short actions inside the overlay itself.",
        ),
      },
    ],
  },
] satisfies CatalogEntry[];

const otherComponents = [
  {
    id: "divider",
    name: "Divider",
    group: "others",
    summary: l(
      "Separador horizontal ou vertical para organizar grupos de conteúdo.",
      "Horizontal or vertical separator for organizing content groups.",
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
      "Marca-d'água decorativa para identificar conteúdo; não impede cópia nem captura de tela.",
      "Decorative watermark for identifying content; it does not prevent copying or screenshots.",
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
      "Painel de conteúdo da Retro8 UI com cabeçalho, corpo e rodapé.",
      "Retro8 UI content panel with a header, body, and footer.",
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
      "Janela em estilo desktop de 8 bits com barra de título e barra de estado.",
      "8-bit desktop-style window with a title bar and status bar.",
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
      "Barra de navegação responsiva com marca, links, ações e menu recolhível.",
      "Responsive navigation bar with branding, links, actions, and a collapsible menu.",
    ),
    classes: [
      "r8-navbar",
      "r8-navbar__container",
      "r8-navbar__brand",
      "r8-navbar__toggle",
      "r8-navbar__toggle-icon",
      "r8-navbar__collapse",
      "r8-navbar__menu",
      "r8-navbar__menu--scroll",
      "r8-navbar__item",
      "r8-navbar__text",
      "r8-navbar__form",
      "r8-navbar__actions",
      "r8-navbar--dark",
    ],
    preview: `<div class="docs-demo__stack docs-demo__stack--navbar">
  <nav class="r8-navbar" data-r8-expand="never" data-r8-open="true" aria-label="Primary navigation">
    <div class="r8-navbar__container">
      <a class="r8-navbar__brand" href="#0">
        <img src="/brand/logo-ui.png" alt="Retro8 UI" />
        <span>retro8-ui</span>
      </a>
      <button class="r8-navbar__toggle" type="button" aria-label="Toggle navigation">
        <span class="r8-navbar__toggle-icon" aria-hidden="true"></span>
      </button>
      <div class="r8-navbar__collapse">
        <ul class="r8-navbar__menu">
          <li><a class="r8-navbar__item" aria-current="page" href="#0">Docs</a></li>
          <li><a class="r8-navbar__item" href="#0">Components</a></li>
          <li><a class="r8-navbar__item" href="#0">Tokens</a></li>
        </ul>
        <p class="r8-navbar__text">Build 0.3 synced</p>
        <form class="r8-navbar__form" role="search">
          <input class="r8-input" data-r8-size="sm" type="search" placeholder="Search docs" aria-label="Search docs" />
          <button class="r8-btn r8-btn--sm r8-btn--primary" type="button">Search</button>
        </form>
        <div class="r8-navbar__actions">
          <span class="r8-badge r8-badge--info">v1</span>
          <button class="r8-btn r8-btn--sm" type="button">Install</button>
        </div>
      </div>
    </div>
  </nav>
</div>`,
    code: `<nav class="r8-navbar r8-navbar--dark" data-r8-expand="lg" aria-label="Primary navigation">
  <div class="r8-navbar__container">
    <a class="r8-navbar__brand" href="/">
      <img src="/brand/logo-ui.png" alt="Retro8 UI" />
      <span>retro8-ui</span>
    </a>

    <button class="r8-navbar__toggle" type="button" aria-label="Toggle navigation">
      <span class="r8-navbar__toggle-icon" aria-hidden="true"></span>
    </button>

    <div class="r8-navbar__collapse">
      <ul class="r8-navbar__menu">
        <li><a class="r8-navbar__item" aria-current="page" href="/docs">Docs</a></li>
        <li><a class="r8-navbar__item" href="/components">Components</a></li>
        <li><a class="r8-navbar__item" href="/tokens">Tokens</a></li>
        <li><a class="r8-navbar__item" href="/guides">Guides</a></li>
      </ul>

      <span class="r8-navbar__text">Stable channel</span>

      <form class="r8-navbar__form" role="search">
        <input class="r8-input" data-r8-size="sm" type="search" placeholder="Search docs" aria-label="Search docs" />
        <button class="r8-btn r8-btn--sm r8-btn--primary" type="submit">Search</button>
      </form>

      <div class="r8-navbar__actions">
        <button class="r8-btn r8-btn--sm" type="button">Install</button>
      </div>
    </div>
  </div>
</nav>`,
    anatomy: ll(
      [
        "`r8-navbar` é a estrutura principal e aceita marca, nav, texto, form e ações sem exigir contêineres extras.",
        "`r8-navbar__container` agrupa o miolo quando você quiser um interno contêiner previsível, mas o componente continua funcionando sem ele.",
        "`r8-navbar__toggle` + `r8-navbar__collapse` cuidam do colapso responsivo em conjunto com `data-r8-expand`.",
        "`r8-navbar__menu` organiza os links principais; use `r8-navbar__menu--scroll` quando a coluna colapsada puder crescer demais.",
        "`r8-navbar__text`, `r8-navbar__form` e `r8-navbar__actions` ocupam campos opcionais, como no padrão do Bootstrap.",
      ],
      [
        "`r8-navbar` is the main shell and accepts brand, nav, text, form, and actions without requiring extra wrappers.",
        "`r8-navbar__container` groups the inner layout when you want a predictable inner wrapper, but the component still works without it.",
        "`r8-navbar__toggle` + `r8-navbar__collapse` handle responsive collapsing together with `data-r8-expand`.",
        "`r8-navbar__menu` organizes the primary links; use `r8-navbar__menu--scroll` when the collapsed column could grow too tall.",
        "`r8-navbar__text`, `r8-navbar__form`, and `r8-navbar__actions` fill optional slots, much like the Bootstrap pattern.",
      ],
    ),
    accessibility: ll(
      [
        "Prefira `<nav>` para expor o componente como landmark; se usar outro elemento, adicione `role=\"navigation\"`.",
        "O alternância precisa de nome acessível claro, como `Toggle navigation`, e deve controlar uma área identificavel por `aria-controls`.",
        "Marque o link atual com `aria-current=\"page\"` para manter o contexto da navegação.",
        "Se houver busca no cabeçalho, use `role=\"search\"` no form e preserve rótulos explicitos no campo.",
        "Não esconda informação importante apenas dentro do menu colapsado; marca e ação principal devem continuar claras mesmo fechado.",
      ],
      [
        "Prefer `<nav>` so the component is exposed as a landmark; if you use another host, add `role=\"navigation\"`.",
        "The toggle needs a clear accessible name such as `Toggle navigation`, and it should control an identifiable region through `aria-controls`.",
        "Mark the current link with `aria-current=\"page\"` to preserve navigation context.",
        "If the header includes search, use `role=\"search\"` on the form and keep explicit labels on the field.",
        "Do not hide critical information only inside the collapsed menu; brand and the main action should remain clear even when closed.",
      ],
    ),
    api: [
      {
        name: "r8-navbar / data-r8-expand",
        description: l(
          "Base do cabeçalho e ponto de entrada para o comportamento responsivo, com breakpoints no estilo navbar-expand do Bootstrap.",
          "Header base and entry point for the responsive behavior, with Bootstrap-like navbar-expand breakpoints.",
        ),
      },
      {
        name: "r8-navbar__toggle / r8-navbar__collapse",
        description: l(
          "Par declarativo para abrir e fechar a navegação colapsada sem JS de aplicação.",
          "Declarative pair used to open and close the collapsed navigation without app-level JS.",
        ),
      },
      {
        name: "r8-navbar__brand / r8-navbar__menu / r8-navbar__item",
        description: l(
          "Blocos para marca textual ou com imagem e para a lista principal de links.",
          "Building blocks for text or image brands and for the main list of links.",
        ),
      },
      {
        name: "r8-navbar__text / r8-navbar__form / r8-navbar__actions",
        description: l(
          "Slots opcionais para texto curta, busca e CTAs auxiliares dentro da mesma barra.",
          "Optional slots for short copy, search, and secondary CTAs inside the same bar.",
        ),
      },
      {
        name: "r8-navbar--dark / data-r8-variant=\"dark\"",
        description: l(
          "Ativa o tema escuro do navbar sem duplicar a estrutura da marcação.",
          "Enables the dark navbar theme without duplicating the markup structure.",
        ),
      },
    ],
  },
  {
    id: "inventory-page",
    name: "Inventory Page",
    group: "retro-extras",
    core: false,
    summary: l(
      "Exemplo de composição com inventário em tabela e painel de perfil; as ações exigem implementação da aplicação.",
      "Page composition example with a tabular inventory and profile panel; actions require application logic.",
    ),
    classes: [
      "r8-window",
      "r8-window__titlebar",
      "r8-window__body",
      "r8-window__statusbar",
      "r8-navbar",
      "r8-navbar__menu",
      "r8-navbar__item",
      "r8-container",
      "r8-container--aside-end",
      "r8-container__main",
      "r8-container__aside",
      "r8-panel",
      "r8-panel--muted",
      "r8-panel__header",
      "r8-panel__body",
      "r8-panel__footer",
      "r8-avatar",
      "r8-avatar--lg",
      "r8-avatar--round",
      "r8-table-wrap",
      "r8-table",
      "r8-table--sm",
      "r8-table--hover",
      "r8-table__cell--numeric",
      "r8-badge",
      "r8-btn",
      "r8-btn--sm",
      "r8-btn--primary",
      "r8-btn--secondary",
    ],
    preview: `<div class="docs-demo__stack docs-demo__stack--inventory-page">
  <section class="r8-window">
    <div class="r8-window__titlebar">
      <span class="r8-window__title">Inventory station</span>
      <div class="r8-window__controls" aria-hidden="true">
        <span class="r8-window__control"></span>
        <span class="r8-window__control"></span>
        <span class="r8-window__control"></span>
      </div>
    </div>
    <div class="r8-window__body r8-stack">
      <nav class="r8-navbar" data-r8-expand="never" data-r8-open="true" aria-label="Inventory page navigation">
        <div class="r8-navbar__container">
          <a class="r8-navbar__brand" href="#0">
            <img src="/brand/logo-ui.png" alt="Retro8 UI" />
            <span>retro8-ui</span>
          </a>
          <button class="r8-navbar__toggle" type="button" aria-label="Toggle navigation">
            <span class="r8-navbar__toggle-icon" aria-hidden="true"></span>
          </button>
          <div class="r8-navbar__collapse">
            <ul class="r8-navbar__menu">
              <li><a class="r8-navbar__item" aria-current="page" href="#0">Inventory</a></li>
              <li><a class="r8-navbar__item" href="#0">Orders</a></li>
              <li><a class="r8-navbar__item" href="#0">Audit log</a></li>
            </ul>
            <p class="r8-navbar__text">Shift A synced</p>
            <div class="r8-navbar__actions">
              <button class="r8-btn r8-btn--sm" type="button">New item</button>
            </div>
          </div>
        </div>
      </nav>

      <div class="r8-container r8-container--aside-end" style="--r8-container-aside-width: 20rem; --r8-container-min-height: 20rem;">
        <main class="r8-container__main">
          <section class="r8-panel">
            <div class="r8-panel__header">
              <h3 class="r8-panel__title">Inventory list</h3>
              <p class="r8-panel__meta">12 items tracked</p>
            </div>
            <div class="r8-panel__body">
              <div class="r8-table-wrap">
                <table class="r8-table r8-table--sm r8-table--hover">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Status</th>
                      <th class="r8-table__cell--numeric">Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Copper keycard</td>
                      <td><span class="r8-badge r8-badge--warning">rare</span></td>
                      <td class="r8-table__cell--numeric">2</td>
                    </tr>
                    <tr>
                      <td>Signal decoder</td>
                      <td><span class="r8-badge r8-badge--info">active</span></td>
                      <td class="r8-table__cell--numeric">7</td>
                    </tr>
                    <tr>
                      <td>Repair kit</td>
                      <td><span class="r8-badge r8-badge--success">stocked</span></td>
                      <td class="r8-table__cell--numeric">14</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="r8-panel__footer">
              <button class="r8-btn r8-btn--primary r8-btn--sm" type="button">Sync inventory</button>
              <button class="r8-btn r8-btn--sm" type="button">Export CSV</button>
            </div>
          </section>
        </main>

        <aside class="r8-container__aside">
          <section class="r8-panel r8-panel--muted">
            <div class="r8-panel__header">
              <h3 class="r8-panel__title">Profile</h3>
              <p class="r8-panel__meta">Quartermaster</p>
            </div>
            <div class="r8-panel__body r8-stack">
              <div class="r8-row">
                <span class="r8-avatar r8-avatar--lg r8-avatar--round" data-r8-avatar-fallback="NP">
                  <img src="/imgs/p1.png" alt="Nova Pike" />
                </span>
                <div class="r8-stack">
                  <strong>Nova Pike</strong>
                  <small>Ops lead</small>
                </div>
              </div>
              <div class="r8-cluster">
                <span class="r8-badge r8-badge--success">online</span>
                <span class="r8-badge r8-badge--info">admin</span>
              </div>
              <button class="r8-btn r8-btn--primary r8-btn--sm" type="button">Edit profile</button>
              <button class="r8-btn r8-btn--secondary r8-btn--sm" type="button">Edit avatar</button>
              <button class="r8-btn r8-btn--sm" type="button">Update password</button>
            </div>
          </section>
        </aside>
      </div>
    </div>
    <div class="r8-window__statusbar">Inventory page scaffold with profile editing actions</div>
  </section>
</div>`,
    code: `<section class="r8-window">
  <div class="r8-window__titlebar">
    <span class="r8-window__title">Inventory station</span>
  </div>

  <div class="r8-window__body r8-stack">
    <nav class="r8-navbar" data-r8-expand="lg" aria-label="Inventory page navigation">
      <div class="r8-navbar__container">
        <a class="r8-navbar__brand" href="/">
          <img src="/brand/logo-ui.png" alt="Retro8 UI" />
          <span>retro8-ui</span>
        </a>
        <button class="r8-navbar__toggle" type="button" aria-label="Toggle navigation">
          <span class="r8-navbar__toggle-icon" aria-hidden="true"></span>
        </button>
        <div class="r8-navbar__collapse">
          <ul class="r8-navbar__menu">
            <li><a class="r8-navbar__item" aria-current="page" href="/inventory">Inventory</a></li>
            <li><a class="r8-navbar__item" href="/orders">Orders</a></li>
            <li><a class="r8-navbar__item" href="/audit-log">Audit log</a></li>
          </ul>
          <div class="r8-navbar__actions">
            <button class="r8-btn r8-btn--sm" type="button">New item</button>
          </div>
        </div>
      </div>
    </nav>

    <div class="r8-container r8-container--aside-end" style="--r8-container-aside-width: 20rem;">
      <main class="r8-container__main">
        <section class="r8-panel">
          <div class="r8-panel__header">
            <h3 class="r8-panel__title">Inventory list</h3>
            <p class="r8-panel__meta">12 items tracked</p>
          </div>
          <div class="r8-panel__body">
            <div class="r8-table-wrap">
              <table class="r8-table r8-table--sm r8-table--hover">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Status</th>
                    <th class="r8-table__cell--numeric">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Copper keycard</td>
                    <td><span class="r8-badge r8-badge--warning">rare</span></td>
                    <td class="r8-table__cell--numeric">2</td>
                  </tr>
                  <tr>
                    <td>Signal decoder</td>
                    <td><span class="r8-badge r8-badge--info">active</span></td>
                    <td class="r8-table__cell--numeric">7</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <aside class="r8-container__aside">
        <section class="r8-panel r8-panel--muted">
          <div class="r8-panel__header">
            <h3 class="r8-panel__title">Profile</h3>
            <p class="r8-panel__meta">Quartermaster</p>
          </div>
          <div class="r8-panel__body r8-stack">
            <div class="r8-row">
              <span class="r8-avatar r8-avatar--lg r8-avatar--round" data-r8-avatar-fallback="NP">
                <img src="/imgs/p1.png" alt="Nova Pike" />
              </span>
              <div class="r8-stack">
                <strong>Nova Pike</strong>
                <small>Ops lead</small>
              </div>
            </div>
            <button class="r8-btn r8-btn--primary r8-btn--sm" type="button">Edit profile</button>
            <button class="r8-btn r8-btn--secondary r8-btn--sm" type="button">Edit avatar</button>
            <button class="r8-btn r8-btn--sm" type="button">Update password</button>
          </div>
        </section>
      </aside>
    </div>
  </div>

  <div class="r8-window__statusbar">Inventory page scaffold</div>
</section>`,
    anatomy: ll(
      [
        "Use `r8-window` como moldura principal da página e reserve `r8-window__statusbar` para telemetria curta ou contexto operacional.",
        "`r8-navbar` funciona como topo da página e organiza navegação, ação primária e status da sessao no mesmo bloco.",
        "`r8-container r8-container--aside-end` separa área principal e rail lateral sem precisar de grid customizado no app.",
        "No miolo, `r8-panel` + `r8-table-wrap` + `r8-table` sustentam a listagem de inventario com scroll horizontal seguro.",
        "No rail, `r8-avatar`, badges e botões `Edit profile` montam um bloco claro para manutencao de perfil.",
      ],
      [
        "Use `r8-window` as the main page frame and reserve `r8-window__statusbar` for short telemetry or operational context.",
        "`r8-navbar` acts as the page top bar, grouping navigation, a primary action, and session status in one block.",
        "`r8-container r8-container--aside-end` separates the main area and side rail without custom app grid code.",
        "In the content area, `r8-panel` + `r8-table-wrap` + `r8-table` support inventory listing with safe horizontal scrolling.",
        "On the rail, `r8-avatar`, badges, and `Edit profile` buttons build a clear profile maintenance block.",
      ],
    ),
    accessibility: ll(
      [
        "Mantenha landmarks reais (`nav`, `main`, `aside`) para leitores de tela entenderem a estrutura da página.",
        "No avatar de perfil, preserve `alt` útil e fallback curto (`data-r8-avatar-fallback`) para falha de imagem.",
        "Na tabela, use headers claros e `r8-table__cell--numeric` para reforcar leitura de quantidade.",
        "Ações de perfil devem ser botões com rótulos diretos (`Edit profile`, `Edit avatar`) e sem depender apenas de ícone.",
        "Se o navbar colapsar, valide foco na alternância e em links para manter navegação por teclado previsível.",
      ],
      [
        "Keep real landmarks (`nav`, `main`, `aside`) so screen readers can understand the page structure.",
        "For profile avatars, keep a useful `alt` and a short fallback (`data-r8-avatar-fallback`) for image failures.",
        "In the table, use clear headers and `r8-table__cell--numeric` to improve quantity readability.",
        "Profile actions should be buttons with direct labels (`Edit profile`, `Edit avatar`) rather than icon-only controls.",
        "If the navbar collapses, validate focus flow through toggle and links to keep keyboard navigation predictable.",
      ],
    ),
    api: [
      {
        name: "r8-window + r8-window__body + r8-window__statusbar",
        description: l(
          "Estrutura externo para enquadrar a página e exibir estado operacional persistente na base.",
          "Outer shell used to frame the page and show persistent operational state at the bottom.",
        ),
      },
      {
        name: "r8-navbar / r8-navbar__menu / r8-navbar__actions",
        description: l(
          "Topo navegavel da página com links primarios e ação rapida de inventario.",
          "Navigable top bar with primary links and a quick inventory action.",
        ),
      },
      {
        name: "r8-container--aside-end / r8-container__main / r8-container__aside",
        description: l(
          "Distribui listagem principal e painel de perfil em duas colunas com largura lateral configuravel.",
          "Distributes main listing and profile panel into two columns with configurable side width.",
        ),
      },
      {
        name: "r8-panel / r8-table-wrap / r8-table",
        description: l(
          "Bloco de inventario com hierarquia editorial e tabela responsiva para dados operacionais.",
          "Inventory block with editorial hierarchy and a responsive table for operational data.",
        ),
      },
      {
        name: "r8-avatar / data-r8-avatar-fallback / r8-btn--sm",
        description: l(
          "Compoe a área de perfil com identidade visual e ações de manutencao como editar perfil, avatar e senha.",
          "Composes the profile area with visual identity and maintenance actions such as editing profile, avatar, and password.",
        ),
      },
    ],
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
      "Esses componentes servem como fundação visual para outras superfícies, layouts e documentos da biblioteca.",
    ],
    [
      "Use the base class as the main block and only combine modifiers that make sense for the context.",
      "These components act as visual foundations for other library surfaces, layouts and documents.",
    ],
  ),
  configuration: ll(
    [
      "Aplique o provider em um escopo local quando quiser alterar tema ou contraste sem afetar a página inteira.",
      "Use esse padrão para demonstracao, theming localizado e containers de prévia.",
    ],
    [
      "Apply the provider to a local scope when you want to change skin or contrast without affecting the whole page.",
      "Use this pattern for demos, localized theming and preview containers.",
    ],
  ),
  form: ll(
    [
      "Prefira HTML nativo para o comportamento e use as classes r8-* como estrutura visual previsível.",
      "Agrupe rótulos, ajuda e retorno visual próximo do campo para manter leitura e acessibilidade.",
    ],
    [
      "Prefer native HTML for behavior and use r8-* classes as the predictable visual shell.",
      "Keep labels, help text and feedback close to the field for better readability and accessibility.",
    ],
  ),
  data: ll(
    [
      "Esses componentes priorizam leitura, agrupamento e ritmo visual em dashboards, docs e painéis.",
      "Combine badges, texto e superfícies para adicionar contexto sem poluir o HTML consumidor.",
    ],
    [
      "These components prioritize readability, grouping and visual rhythm in dashboards, docs and panels.",
      "Combine badges, text and surfaces to add context without cluttering consumer HTML.",
    ],
  ),
  navigation: ll(
    [
      "Use estados ativos, ordem lógica e landmarks semânticos para deixar o fluxo de navegação claro.",
      "As classes lidam com a casca visual; a aplicação pode conectar rotas, scroll ou expansão conforme necessário.",
    ],
    [
      "Use active states, logical order and semantic landmarks to keep navigation flow clear.",
      "The classes handle the visual shell; your application can connect routes, scroll or expansion as needed.",
    ],
  ),
  feedback: ll(
    [
      "A retro8-ui entrega a superfície visual, enquanto exibição, fechamento e stack podem ficar na aplicação hospedeira.",
      "Prefira acoplamento leve com dialog nativo, portais ou runtime próprio apenas quando o caso exigir.",
    ],
    [
      "retro8-ui provides the visual surface, while showing, closing and stacking can stay in the host app.",
      "Prefer light integration with native dialog, portals or your own runtime only when the use case requires it.",
    ],
  ),
  others: ll(
    [
      "Sao peças de apoio que ajudam a costurar a interface sem exigir JavaScript adicional.",
      "Funcionam melhor quando reforcam hierarquia e legibilidade, não apenas decoração.",
    ],
    [
      "These are support pieces that help stitch the interface together without extra JavaScript.",
      "They work best when they reinforce hierarchy and readability rather than decoration alone.",
    ],
  ),
  "retro-extras": ll(
    [
      "Esses componentes nasceram da linguagem própria da retro8-ui e complementam o catálogo principais.",
      "Use-os quando quiser uma camada mais forte de fantasia desktop, HUD ou estrutura proprietario.",
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
      "Prefira o elemento HTML semanticamente correto: button para ações, a para links e títulos reais para títulos.",
      "Mantenha foco visível e contraste suficiente, especialmente nas variações de cor mais fortes.",
    ],
    [
      "Prefer the semantically correct HTML element: button for actions, a for links and real headings for titles.",
      "Keep focus visible and contrast sufficient, especially on stronger color variations.",
    ],
  ),
  configuration: ll(
    [
      "Mudanças de tema não devem reduzir o contraste nem esconder os estados de foco.",
      "Quando mudar o contexto visual, valide componentes de formulário e texto dentro do novo escopo.",
    ],
    [
      "Theme or skin changes should not reduce contrast or hide focus states.",
      "When changing visual context, validate form controls and text inside the new scope.",
    ],
  ),
  form: ll(
    [
      "Associe rótulos e mensagens de erro aos campos com os atributos nativos apropriados sempre que houver interação real.",
      "Não dependa apenas de cor para estados de validação; exponha texto, estado ou valor junto do controle.",
    ],
    [
      "Associate labels and error messages with fields using the proper native attributes whenever there is real interaction.",
      "Do not rely on color alone for validation states; expose text, status or value alongside the control.",
    ],
  ),
  data: ll(
    [
      "Ofereca equivalentes textuais para estados visuais, ícones ou indicadores quando eles carregarem informação importante.",
      "Em tabelas, listas e métricas, mantenha ordem de leitura coerente e títulos claros.",
    ],
    [
      "Provide textual equivalents for visual states, icons or indicators when they carry important meaning.",
      "In tables, lists and metrics, keep reading order coherent and headings clear.",
    ],
  ),
  navigation: ll(
    [
      "Use aria-current, nav e rótulos descritivos quando houver mais de uma área de navegação na tela.",
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
      "Divisores devem ser usados com moderação e watermarks não devem comprometer legibilidade do conteúdo.",
      "Quando houver significado semântico, mantenha roles ou textos auxiliares adequados.",
    ],
    [
      "Dividers should be used sparingly and watermarks should not compromise content readability.",
      "When there is semantic meaning, keep appropriate roles or supporting text.",
    ],
  ),
  "retro-extras": ll(
    [
      "Mesmo em estruturas mais decorativos, preserve landmarks, títulos reais e ordem de leitura consistente.",
      "Evite usar fantasia visual para esconder controles essenciais ou informação crítica.",
    ],
    [
      "Even in more decorative shells, preserve landmarks, real headings and a consistent reading order.",
      "Avoid using visual fantasy to hide essential controls or critical information.",
    ],
  ),
};
