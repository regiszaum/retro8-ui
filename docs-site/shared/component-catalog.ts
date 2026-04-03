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
      "Componentes nativos da Retro8 UI que complementam o catalogo principal com pecas proprias do sistema.",
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
        "`r8-btn` e o shell base e funciona melhor em `<button>` para acoes e em `<a>` apenas quando a navegacao pedir visual de CTA.",
        "Modifiers como `--primary`, `--ghost`, `--sm`, `--lg` e `--block` ajustam tom, escala e largura sem trocar a estrutura base.",
        "`r8-btn__icon` adiciona um glyph curto antes ou depois do label mantendo alinhamento previsivel.",
        "`r8-btn__spinner` representa loading visual e pode ser usado manualmente ou pelo helper declarativo.",
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
        "Prefira `<button>` para acoes reais e use `<a>` apenas quando houver navegacao de verdade.",
        "Dentro de forms, defina `type=\"button\"` nas acoes que nao devem submeter o formulario.",
        "Use `aria-pressed` somente quando o Button representar um state persistente de liga/desliga ou selecionado.",
        "Quando um link for exibido como Button e estiver indisponivel, exponha `aria-disabled=\"true\"` e proteja ou remova o `href`.",
        "States de loading devem manter texto visivel; nao dependa apenas do spinner para comunicar o que esta acontecendo.",
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
          "Classe base para a superficie clicavel com textura retro, foco visivel e estados de hover/press.",
          "Base class for the clickable surface with retro texture, visible focus and hover/press states.",
        ),
      },
      {
        name: "r8-btn--primary / --secondary / --tertiary / --success / --info / --danger / --dark / --light / --ghost",
        description: l(
          "Modifiers semanticos para trocar o peso visual da acao sem mudar a estrutura do markup.",
          "Semantic modifiers for changing the visual weight of the action without changing the markup structure.",
        ),
      },
      {
        name: "r8-btn--sm / --lg / --block",
        description: l(
          "Ajustam escala e largura do Button para toolbars compactas, CTAs maiores ou acoes em largura total.",
          "Adjust the Button scale and width for compact toolbars, larger CTAs or full-width actions.",
        ),
      },
      {
        name: "r8-btn__icon / r8-btn__spinner",
        description: l(
          "Slots visuais para glyphs curtos e indicacao de loading dentro do proprio Button.",
          "Visual slots for short glyphs and a loading indicator inside the Button itself.",
        ),
      },
      {
        name: "data-r8-variant / data-r8-size / data-r8-loading / data-r8-active",
        description: l(
          "Helpers declarativos para sincronizar variant, tamanho, loading e state pressed sem concatenacao manual.",
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
      "Surface utilitaria para aplicar borda retro com controle de espessura, tom, lado isolado e modo ghost.",
      "Utility surface for applying a retro border with control over width, tone, isolated edge and ghost mode.",
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
        "`r8-border-sample` e um wrapper visual generico para destacar blocos, avisos curtos, cards auxiliares e trilhos laterais.",
        "Modifiers como `--thin` e `--ghost` ajustam peso e preenchimento sem trocar o elemento hospedeiro.",
        "Tons semanticos como `--primary`, `--success` e `--danger` ajudam a puxar a borda para o contexto certo sem depender so do background.",
        "Modifiers de lado unico como `--top`, `--end`, `--bottom` e `--start` funcionam bem para separadores, cabecalhos e faixas laterais.",
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
        "Border e apenas tratamento visual; escolha o elemento semantico certo, como `<section>`, `<article>` ou `<aside>`, de acordo com o conteudo.",
        "Nao dependa so da cor da borda para comunicar state critico ou sucesso; mantenha texto, icone ou label explicito.",
        "Quando usar borda em um unico lado, preserve espacamento suficiente para que a faixa continue perceptivel sem colidir com o conteudo.",
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
          "Classe base para uma surface emoldurada com borda dura, fundo opcional e sombra seca no estilo Retro8 UI.",
          "Base class for a framed surface with a hard border, optional fill and dry shadow in the Retro8 UI style.",
        ),
      },
      {
        name: "r8-border-sample--thin / --ghost",
        description: l(
          "Ajustam espessura e preenchimento para surfaces mais discretas ou outlines transparentes.",
          "Adjust thickness and fill for quieter surfaces or transparent outlines.",
        ),
      },
      {
        name: "r8-border-sample--primary / --secondary / --success / --info / --danger",
        description: l(
          "Trocam o tom da borda usando cores semanticas ja presentes nos tokens da biblioteca.",
          "Change the border tone using semantic colors already present in the library tokens.",
        ),
      },
      {
        name: "r8-border-sample--top / --end / --bottom / --start",
        description: l(
          "Mantem apenas uma face da borda visivel para casos de separacao, encaixe lateral ou destaque de faixa.",
          "Keep only one border edge visible for separator, docked or side-rail scenarios.",
        ),
      },
      {
        name: "--r8-border-sample-*",
        description: l(
          "Custom properties para ajustar cor, largura, sombra e background sem precisar criar novos modifiers fixos.",
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
      "Organiza a paleta semantica da UI e os helpers de cor para texto, com foco em contraste e leitura rapida.",
      "Organizes the UI semantic palette and text color helpers, with a focus on contrast and fast readability.",
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
        "`r8-color-grid` organiza swatches em uma grade responsiva para inspecionar a paleta rapidamente.",
        "`r8-color-card`, `__swatch` e `__meta` formam o bloco visual de cada token de cor exibido na documentacao.",
        "`r8-text` e os modifiers `--*` aplicam cor semantica ao texto corrido sem precisar criar estilos locais para cada contexto.",
      ],
      [
        "`r8-color-grid` organizes swatches in a responsive grid so the palette can be scanned quickly.",
        "`r8-color-card`, `__swatch` and `__meta` form the visual block used to present each color token in the documentation.",
        "`r8-text` and its `--*` modifiers apply semantic color to body copy without needing local one-off styles for each context.",
      ],
    ),
    accessibility: ll(
      [
        "Nao use cor sozinha para comunicar meaning; combine o tom com texto claro, icone ou label visivel.",
        "Tons claros como `r8-text--light` funcionam melhor sobre surfaces escuras ou coloridas com contraste suficiente.",
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
          "Classe base para texto corrido, labels e pequenos blocos de copy onde a cor pode variar semanticamente.",
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
          "Aplicam os tons semanticos principais da Retro8 UI diretamente no texto.",
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
      "Shell estrutural para montar layouts com header, aside, main e footer, agora com direcao e largura lateral ajustaveis.",
      "Structural shell for layouts with header, aside, main and footer, now with adjustable direction and sidebar width.",
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
        "`r8-container` e o wrapper estrutural que distribui os blocos principais do shell e aceita nesting quando a hierarquia pedir.",
        "`r8-container__header` e `r8-container__footer` ocupam a largura total e funcionam bem para barras de contexto, status e acoes.",
        "`r8-container__aside` cria a coluna lateral e pode ficar no inicio ou no fim usando `r8-container--aside-end`.",
        "`r8-container__main` recebe a area principal e continua responsiva mesmo quando o aside desaparece.",
        "`r8-container--stack` simplifica o shell para um fluxo vertical sem sidebar, util para paginas simples ou areas compactas.",
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
        "Use elementos semanticos nativos como `<header>`, `<aside>`, `<main>` e `<footer>` sempre que eles fizerem sentido para a estrutura real.",
        "Mantenha apenas um `<main>` por pagina ou por landmark principal do app para evitar landmarks duplicados.",
        "Se o aside for navegacao, exponha links e headings claros; se for painel auxiliar, rotule o bloco para orientar assistive tech.",
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
          "Classe base do shell, com gap, altura minima e largura lateral controladas por CSS variables.",
          "Base shell class, with gap, minimum height and sidebar width controlled by CSS variables.",
        ),
      },
      {
        name: "r8-container--aside-end / r8-container--stack",
        description: l(
          "Modifiers para mover o aside para a direita logica ou simplificar o layout para um fluxo vertical.",
          "Modifiers for moving the aside to the logical end or simplifying the layout into a vertical flow.",
        ),
      },
      {
        name: "r8-container__header / __aside / __main / __footer",
        description: l(
          "Regioes semanticas do shell que podem ser combinadas conforme a necessidade do layout.",
          "Semantic shell regions that can be combined based on the layout needs.",
        ),
      },
      {
        name: "--r8-container-*",
        description: l(
          "Custom properties para ajustar gap, largura do aside, altura minima e alturas do header/footer sem criar novos modifiers fixos.",
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
      "Moldura visual para encaixar icones externos, cursores pixelados ou glyphs curtos sem acoplar um pacote de icones na library.",
      "Visual frame for external icon packs, pixel cursor assets or short glyphs without coupling the library to a bundled icon set.",
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
        "`r8-icon-grid` organiza galerias de icones, cursores ou estados visuais em uma grade leve e responsiva.",
        "`r8-icon-tile` emoldura cada item com a mesma surface retro usada em outros blocos da UI, mantendo consistencia com cards e samples.",
        "`r8-icon-tile__glyph` aceita texto curto, `<img>` ou `<svg>` inline, entao voce pode encaixar assets externos sem trocar a estrutura.",
        "`r8-icon-tile__label` nomeia o item e ajuda a explicar o significado do icone quando ele aparece fora de um contexto maior.",
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
        "Se o icone for apenas decorativo, marque o glyph como `aria-hidden=\"true\"` e use `alt=\"\"` em imagens para evitar redundancia.",
        "Quando o icone carregar significado proprio, mantenha label visivel ou um nome acessivel claro no elemento interativo hospedeiro.",
        "O tile nao e interativo por si so; se o icone abrir uma acao ou navegacao, hospede a estrutura dentro de `<button>` ou `<a>` sem perder o label.",
        "Nao dependa so do icone para comunicar estado importante; combine com texto, cor e contexto visivel.",
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
          "Grid responsiva para listar opcoes de pacote, estados de cursor, acoes iconicas ou galerias curtas dentro da documentacao e do produto.",
          "Responsive grid for listing package options, cursor states, icon actions or short galleries in docs and product surfaces.",
        ),
      },
      {
        name: "r8-icon-tile",
        description: l(
          "Tile base com moldura retro para agrupar um glyph e seu label sem precisar montar um card bespoke.",
          "Base tile with a retro frame for grouping a glyph and its label without building a bespoke card.",
        ),
      },
      {
        name: "r8-icon-tile__glyph",
        description: l(
          "Janela visual do icone. Funciona com texto curto, `<img>` ou `<svg>` inline e aceita customizacao por CSS variables.",
          "Visual icon frame. Works with short text, `<img>` or inline `<svg>` and accepts CSS variable overrides.",
        ),
      },
      {
        name: "r8-icon-tile__label",
        description: l(
          "Label em caixa alta para nomear o asset, estado ou significado do icone de forma previsivel.",
          "Uppercase label for naming the asset, state or icon meaning predictably.",
        ),
      },
      {
        name: "--r8-icon-glyph-*",
        description: l(
          "Custom properties para ajustar tamanho, cor de frente, background e borda do glyph quando o contexto pedir outra enfase.",
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
      "Link textual com tom semantico, controle de underline e opacidade suave para navegação inline e ações secundarias.",
      "Text link with semantic tone, underline control and gentle opacity handling for inline navigation and secondary actions.",
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
        "`r8-link` e a base para anchors, `NuxtLink` e outras navegacoes textuais curtas que precisam manter a linguagem visual da Retro8 UI.",
        "Modifiers de tom como `--secondary`, `--warning`, `--danger` e `--muted` mudam a cor sem perder foco visivel nem comportamento de hover.",
        "`r8-link--quiet` reduz a presenca visual do link, enquanto `r8-link--underline` deixa o sublinhado sempre presente antes mesmo do hover.",
        "CSS variables `--r8-link-*` refinam opacidade, cor e offset do underline sem multiplicar modifiers utilitarios.",
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
        "Mantenha texto de destino explicito; evite labels vagas como 'clique aqui' quando o link aparecer fora de contexto.",
        "Se usar `target=\"_blank\"`, combine com `rel=\"noreferrer noopener\"` e deixe claro quando a navegacao abrir outra aba.",
        "Opacidade mais baixa pode prejudicar contraste; use `r8-link--quiet` e overrides de opacity com moderacao, principalmente em texto corrido pequeno.",
        "Para links indisponiveis, exponha `aria-disabled=\"true\"` e proteja ou remova o `href` para evitar navegacao acidental.",
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
          "Classe base para links textuais com foco visivel, hover com pixel shift e underline controlado por CSS variables.",
          "Base class for text links with visible focus, pixel-shift hover, and underline driven by CSS variables.",
        ),
      },
      {
        name: "r8-link--secondary / --tertiary / --success / --warning / --info / --danger / --dark / --muted",
        description: l(
          "Modifiers semanticos para mudar o tom do link sem trocar a estrutura do anchor ou do router link.",
          "Semantic modifiers for changing the link tone without changing the anchor or router-link structure.",
        ),
      },
      {
        name: "r8-link--quiet / --underline",
        description: l(
          "Presets seguros para reduzir a opacidade base do link ou manter o underline visivel desde o estado idle.",
          "Safe presets for lowering the base link opacity or keeping the underline visible from the idle state.",
        ),
      },
      {
        name: "--r8-link-*",
        description: l(
          "Custom properties para ajustar cor, opacity, underline opacity e underline offset seguindo o contexto da tela.",
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
      "Layout redimensionavel com handle pixelado, suporte horizontal ou vertical, disable drag e eventos de resize para apps mais densos.",
      "Resizable layout with a pixelated handle, horizontal or vertical support, disable-drag mode, and resize events for denser app shells.",
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
        "`r8-splitter` e o shell base que distribui dois panes e um handle central governado pelo runtime.",
        "`r8-splitter__pane` representa cada area redimensionavel e pode receber qualquer conteudo, de listas a paines de preview.",
        "`r8-splitter__handle` e o separador focavel usado para pointer drag e ajuste por teclado.",
        "`r8-splitter--vertical` troca o eixo do layout quando a divisao precisa acontecer em linhas, nao colunas.",
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
        "Mantenha um `aria-label` claro no handle para explicar o que esta sendo redimensionado.",
        "O handle ja expoe `role=\"separator\"`, orientation e valores ARIA; preserve isso se voce personalizar o host.",
        "Use `data-r8-splitter-disabled=\"true\"` quando o layout estiver travado para nao sugerir drag em um estado indisponivel.",
        "Em areas criticas, deixe cada pane com headings ou landmarks claros para que a divisao espacial faca sentido tambem em leitores de tela.",
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
          "Shell base para o layout redimensionavel, com variant vertical quando a divisao precisa acontecer em linhas.",
          "Base shell for the resizable layout, with a vertical variant when the split needs to happen in rows.",
        ),
      },
      {
        name: "r8-splitter__pane / r8-splitter__handle",
        description: l(
          "Os panes recebem o conteudo real e o handle fica responsavel pela interacao de resize via pointer e teclado.",
          "The panes host the real content while the handle is responsible for resize interaction through pointer and keyboard.",
        ),
      },
      {
        name: "data-r8-splitter-position / -min / -max / -step / -disabled",
        description: l(
          "Controlam posicao inicial, limites, passo de teclado e bloqueio de interacao sem exigir JS customizado no host app.",
          "Control initial position, limits, keyboard step, and interaction lock without requiring custom JS in the host app.",
        ),
      },
      {
        name: "--r8-splitter-*",
        description: l(
          "Custom properties para ajustar posicao, tamanho do handle, acento visual do grip e fundo dos panes.",
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
      "Sistema tipografico para hierarquia retro, largura de leitura confortavel, escala de texto e tons semanticos de apoio.",
      "Typographic system for retro hierarchy, comfortable reading measure, text scale, and supporting semantic tones.",
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
        "`r8-typography` e o wrapper para headings, paragrafos, listas, code, blockquotes e pequenos apoios como `small`.",
        "`r8-typography--measure` limita a largura da leitura para blocos mais longos sem criar um wrapper extra.",
        "`r8-typography--compact` e `r8-typography--loose` ajustam gap e line-height do bloco inteiro para contextos mais densos ou mais relaxados.",
        "`r8-text` funciona dentro ou fora do bloco tipografico quando voce precisa aplicar tom, escala ou line-height em um trecho especifico.",
        "Os modifiers de escala `r8-text--xs / --sm / --base / --lg` usam os tokens da UI em vez de tamanhos arbitrarios soltos.",
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
        "Mantenha a ordem semantica de headings (`h1`, `h2`, `h3`) mesmo quando o visual parecer resolvido com apenas classes.",
        "Use os tons semanticos como apoio, nao como unico canal para erro, sucesso ou alerta; sempre combine com contexto textual.",
        "Prefira `r8-typography--measure` e line-heights mais relaxados quando houver paragrafos longos ou instrucoes importantes.",
        "Use os modos compactos com parcimonia em areas densas; leitura longa com line-height apertado cansa mais rapido.",
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
          "Wrapper base para hierarquia tipografica, com headings retro, corpo em mono legivel e suporte a listas, blockquotes, code e small.",
          "Base wrapper for typographic hierarchy, with retro headings, readable mono body copy, and support for lists, blockquotes, code, and small text.",
        ),
      },
      {
        name: "r8-typography--compact / --loose / --measure",
        description: l(
          "Modifiers para densidade vertical e largura de leitura sem precisar criar wrappers ou CSS local para cada bloco.",
          "Modifiers for vertical density and reading width without creating extra wrappers or local CSS for every prose block.",
        ),
      },
      {
        name: "r8-text",
        description: l(
          "Classe base para copys curtas, labels e paragrafos que precisam de ajustes fora ou dentro de um bloco tipografico.",
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
          "Ajustam line-height de um trecho especifico quando a densidade precisa fugir do valor padrao do bloco.",
          "Adjust line-height for a specific line or paragraph when density needs to differ from the block default.",
        ),
      },
      {
        name: "r8-text--muted / --subtle / --primary / --secondary / --tertiary / --success / --warning / --info / --danger / --dark / --light",
        description: l(
          "Tons semanticos para apoio visual, enfase contextual e contraste explicito em superficies mais claras ou escuras.",
          "Semantic tones for visual support, contextual emphasis, and explicit contrast on lighter or darker surfaces.",
        ),
      },
      {
        name: "--r8-text-* / --r8-typography-*",
        description: l(
          "Custom properties para trocar familia, escala, line-height, gap e largura de leitura sem abrir novos modifiers fixos.",
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
      "Escopo local de tokens para trocar skin, densidade e acentos sem afetar o restante da interface.",
      "Local token scope for swapping skin, density, and accents without affecting the rest of the interface.",
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
        "`r8-config-provider` cria um escopo local de tokens; tudo dentro dele herda cores, sombras, spacing e tipografia desse contexto.",
        "As variantes `--night`, `--terminal` e `--danger` trocam a skin local sem exigir um theme switch global no documento inteiro.",
        "`--compact` e `--comfortable` ajustam densidade local ao reescrever tokens de spacing e escala tipografica dentro do scope.",
        "Voce pode combinar classes com `data-theme` e `data-density` quando o host app controla estado por atributo.",
        "Nested providers funcionam para sobrescrever apenas uma ilha da interface, mantendo o resto do shell intacto.",
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
        "Use o `Config Provider` para contraste e densidade, mas mantenha labels, headings e estado textual visiveis mesmo quando o tema mudar.",
        "Temas locais escuros ou danger precisam continuar respeitando contraste suficiente entre surface, texto e foco.",
        "Se usar nested providers, preserve a ordem semantica da interface; o escopo visual nao deve confundir landmarks ou hierarquia real.",
        "Atributos como `data-theme` ajudam quando a mudanca vem do host app, mas a experiencia acessivel continua dependendo do markup interno correto.",
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
          "Wrapper base do scope local, usado para reaplicar tokens de cor, sombra, spacing e tipografia apenas nos descendants.",
          "Base local-scope wrapper used to reapply color, shadow, spacing, and typography tokens only to descendants.",
        ),
      },
      {
        name: "r8-config-provider--night / --terminal / --danger",
        description: l(
          "Presets de skin para trocar o visual local sem alterar o restante da aplicacao.",
          "Skin presets for changing the local visual language without altering the rest of the application.",
        ),
      },
      {
        name: "r8-config-provider--compact / --comfortable",
        description: l(
          "Presets de densidade local, inspirados na ideia de configuracao global de tamanho, mas resolvidos via tokens em cascata.",
          "Local density presets inspired by global size configuration, but solved through cascading tokens.",
        ),
      },
      {
        name: "data-theme / data-density",
        description: l(
          "Aliases por atributo para integrar o scope com switches externos, CMS ou shells que controlam estado sem tocar classes.",
          "Attribute aliases for integrating the scope with external switches, CMS data, or shells that drive state without touching classes.",
        ),
      },
      {
        name: "--r8-color-* / --r8-shadow-* / --r8-font-size-* / --r8-space-*",
        description: l(
          "Tokens globais da Retro8 UI continuam sobrescreviveis localmente para criar acentos e densidades especificas dentro do scope.",
          "Retro8 UI global tokens remain locally overridable so you can create scope-specific accents and density inside the provider.",
        ),
      },
      {
        name: "--r8-config-provider-*",
        description: l(
          "Custom properties do wrapper para ajustar padding, gap, surface, borda, sombra e cor base do proprio provider.",
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
      "Campo de busca com sugestoes locais, teclado, clear opcional e suporte a estados de loading, empty e templates mais ricos nas options.",
      "Search field with local suggestions, keyboard support, optional clear, and support for loading, empty, and richer option templates.",
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
    preview: `<div class="docs-demo__stack">
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
        "`r8-autocomplete` e o wrapper raiz que conecta trigger, input, panel e options no mesmo scope do runtime.",
        "`r8-autocomplete__trigger` agrupa o input, o clear opcional e um badge de contagem ou feedback curto.",
        "`r8-autocomplete__option` aceita markup rico; use `data-r8-value` para controlar o texto que volta ao input e `data-r8-search` para indexacao extra.",
        "`r8-autocomplete__empty` e `r8-autocomplete__loading` funcionam como feedback visual para busca vazia ou remota.",
        "`r8-autocomplete__clear` e opcional e aparece apenas quando o scope estiver marcado como clearable e houver texto digitado.",
      ],
      [
        "`r8-autocomplete` is the root wrapper that keeps trigger, input, panel, and options in the same runtime scope.",
        "`r8-autocomplete__trigger` groups the input, optional clear action, and a count badge or short feedback token.",
        "`r8-autocomplete__option` accepts richer markup; use `data-r8-value` to control the text written back to the input and `data-r8-search` for extra indexing.",
        "`r8-autocomplete__empty` and `r8-autocomplete__loading` work as visual feedback for empty or remote states.",
        "`r8-autocomplete__clear` is optional and only appears when the scope is marked as clearable and the field has typed text.",
      ],
    ),
    accessibility: ll(
      [
        "Mantenha `aria-label` ou um label visivel associado ao input, porque o campo atua como combobox e precisa de nome acessivel claro.",
        "Quando usar markup rico nas options, preserve um `data-r8-value` curto e objetivo para o valor que volta ao input.",
        "Use `data-r8-trigger-on-focus=\"false\"` quando a lista so fizer sentido depois da primeira digitacao, evitando ruído na abertura do campo.",
        "Em loading remoto, prefira feedback textual visivel e atualize as options no DOM antes de chamar `Retro8UI.refresh()` no subtree.",
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
          "Wrapper base do combobox, com filtro local, teclado e selecao sincronizados pelo runtime.",
          "Base combobox wrapper with local filtering, keyboard navigation, and selection synchronized by the runtime.",
        ),
      },
      {
        name: "r8-autocomplete__trigger / __input / __menu / __option",
        description: l(
          "Partes semanticas do componente para trigger, campo digitavel, lista e items selecionaveis.",
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
          "Helpers declarativos para controlar abertura no foco, clear, feedback vazio e loading remoto pelo proprio markup.",
          "Declarative helpers for controlling open-on-focus, clear behavior, empty feedback, and remote loading through markup itself.",
        ),
      },
      {
        name: "data-r8-value / data-r8-search",
        description: l(
          "Permitem separar o texto exibido no option do valor final e enriquecer a indexacao do filtro local.",
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
      "Selecao hierarquica para arvore de categorias, areas ou taxonomias em varias etapas.",
      "Hierarchical selection for category trees, areas or taxonomies across multiple steps.",
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
    preview: `<div class="docs-demo__stack">
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

  <div class="r8-cascader" data-r8-expand-trigger="hover" data-r8-check-strictly="true" data-r8-placeholder="Hover or select any level">
    <button class="r8-cascader__trigger" type="button" aria-label="Hover or select any level">
      <span data-r8-choice-display>Hover or select any level</span>
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
            <div class="r8-cascader__node" data-r8-label="Research" data-r8-value="research"></div>
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
    code: `<div class="r8-cascader" data-r8-filterable="true" data-r8-clearable="true" data-r8-placeholder="Select outpost">
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
        "`r8-cascader` e o root shell e recebe os flags de comportamento via `data-r8-*`.",
        "`r8-cascader__trigger` abre o floating panel e expoe o caminho selecionado.",
        "`r8-cascader__panel` abriga toolbar, generated menus e a source tree oculta.",
        "`r8-cascader__node` e `r8-cascader__children` definem a hierarquia declarativa.",
      ],
      [
        "`r8-cascader` is the root shell and receives `data-r8-*` behavior flags.",
        "`r8-cascader__trigger` opens the floating panel and exposes the selected path.",
        "`r8-cascader__panel` contains toolbar, generated menus and the hidden source tree.",
        "`r8-cascader__node` and `r8-cascader__children` define the declarative hierarchy.",
      ],
    ),
    accessibility: ll(
      [
        "Use `aria-label` no trigger quando o label visivel nao for descritivo o bastante.",
        "Marque disabled branches com `data-r8-disabled=\"true\"` para preservar keyboard semantics.",
        "Mantenha instances pesquisaveis com `r8-cascader__input` devidamente rotulado.",
      ],
      [
        "Use `aria-label` on the trigger when the visible label is not descriptive enough.",
        "Mark disabled branches with `data-r8-disabled=\"true\"` to preserve keyboard semantics.",
        "Keep searchable instances with a labeled `r8-cascader__input` for screen-reader clarity.",
      ],
    ),
    api: [
      {
        name: "data-r8-expand-trigger",
        description: l("Switches expansion between click and hover.", "Switches expansion between click and hover."),
      },
      {
        name: "data-r8-check-strictly",
        description: l("Allows selecting parent nodes instead of leaves only.", "Allows selecting parent nodes instead of leaves only."),
      },
      {
        name: "r8:cascader-change",
        description: l("Emits the final value, labels and full path after selection.", "Emits the final value, labels and full path after selection."),
      },
    ],
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
    preview: `<div class="r8-stack">
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
    id: "radio",
    name: "Radio",
    group: "form",
    summary: l(
      "Escolha unica com circulo pixelado e leitura clara de estado ativo.",
      "Single-choice control with a pixelated circle and a clear active state.",
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
      "Toggle de theme com icones pixelados de sol e lua para alternar light e dark mode.",
      "Theme toggle with pixelated sun and moon icons for switching between light and dark mode.",
    ),
    classes: [
      "r8-theme-switch",
      "r8-theme-switch__glyph",
    ],
    preview: `<button class="r8-theme-switch is-checked" type="button" role="switch" aria-checked="true" aria-label="Toggle theme">
  <span class="r8-theme-switch__glyph" aria-hidden="true"></span>
</button>`,
    code: `<button class="r8-theme-switch" type="button" role="switch" aria-checked="false" aria-label="Toggle theme">
  <span class="r8-theme-switch__glyph" aria-hidden="true"></span>
</button>`,
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
] satisfies CatalogEntry[];

const navigationComponents = [
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
      "Feedback contextual inline para status, warnings e dismissible callouts com a mesma intencao de um alert classico.",
      "Inline contextual feedback surface for status messages, warnings and dismissible callouts with the same intent as a classic alert.",
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
      "r8-alert--dismissible",
      "r8-alert__content",
      "r8-alert__title",
      "r8-alert__heading",
      "r8-alert__body",
      "r8-alert__link",
      "r8-alert__close",
      "r8-alert__actions",
    ],
    preview: `<div class="docs-demo__stack">
  <section class="r8-alert r8-alert--primary" role="alert">
    <div class="r8-alert__content">
      <strong class="r8-alert__title">Primary alert</strong>
      <p class="r8-text">System boots with the default mission profile and synced controls.</p>
    </div>
  </section>

  <section class="r8-alert r8-alert--success" role="status" aria-live="polite">
    <div class="r8-alert__content">
      <strong class="r8-alert__title">Success alert</strong>
      <p class="r8-text">
        Deployment finished cleanly.
        <a class="r8-alert__link" href="#">Read release notes</a>
      </p>
    </div>
  </section>

  <section class="r8-alert r8-alert--warning r8-alert--dismissible" id="docs-alert-live" role="alert" hidden>
    <div class="r8-alert__content">
      <strong class="r8-alert__title">Live alert</strong>
      <p class="r8-text">Nice, you triggered this alert message from the preview action.</p>
    </div>
    <button class="r8-alert__close" type="button" data-r8-dismiss="true" aria-label="Dismiss alert">x</button>
  </section>

  <button class="r8-btn r8-btn--secondary" type="button" data-r8-toggle="alert" data-r8-target="#docs-alert-live">
    Show dismissible alert
  </button>

  <section class="r8-alert r8-alert--danger" role="alert">
    <div class="r8-alert__content">
      <h3 class="r8-alert__heading">System offline</h3>
      <div class="r8-alert__body">
        <p class="r8-text">Backup power is running on a reduced grid while the main core cools down.</p>
        <hr />
        <p class="r8-text">Use the maintenance tunnel and keep all squad traffic on channel 03.</p>
      </div>
    </div>
  </section>

  <section class="r8-alert r8-alert--dark" role="alert">
    <div class="r8-alert__content">
      <strong class="r8-alert__title">Dark alert</strong>
      <div class="r8-alert__actions">
        <button class="r8-btn r8-btn--sm r8-btn--light" type="button">Review</button>
        <button class="r8-btn r8-btn--sm" type="button">Later</button>
      </div>
    </div>
  </section>
</div>`,
    code: `<div class="r8-stack">
  <section class="r8-alert r8-alert--success" role="status" aria-live="polite">
    <div class="r8-alert__content">
      <strong class="r8-alert__title">Success alert</strong>
      <p class="r8-text">
        Deployment finished cleanly.
        <a class="r8-alert__link" href="#">Read release notes</a>
      </p>
    </div>
  </section>

  <section class="r8-alert r8-alert--danger" role="alert">
    <div class="r8-alert__content">
      <h3 class="r8-alert__heading">System offline</h3>
      <div class="r8-alert__body">
        <p class="r8-text">Backup power is running on a reduced grid.</p>
        <hr />
        <p class="r8-text">Use the maintenance tunnel and keep traffic on channel 03.</p>
      </div>
    </div>
  </section>

  <button class="r8-btn r8-btn--secondary" type="button" data-r8-toggle="alert" data-r8-target="#inline-alert">
    Show dismissible alert
  </button>

  <section id="inline-alert" class="r8-alert r8-alert--warning r8-alert--dismissible" role="alert" hidden>
    <div class="r8-alert__content">
      <strong class="r8-alert__title">Live alert</strong>
      <p class="r8-text">Nice, you triggered this alert message.</p>
    </div>
    <button class="r8-alert__close" type="button" data-r8-dismiss="true" aria-label="Dismiss alert">x</button>
  </section>
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
      "Colecao de loaders retro para estados curtos, sincronizacao, scan e feedback visual persistente.",
      "Retro loader collection for short waits, sync states, scan patterns and persistent visual feedback.",
    ),
    classes: [
      "r8-loading",
      "r8-loading--dots",
      "r8-loading--bar",
      "r8-loading--equalizer",
      "r8-loading--spinner",
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
    <div class="r8-loading r8-loading--dots" role="status" aria-live="polite">
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
    <div class="r8-loading r8-loading--bar" role="status" aria-live="polite">
      <span class="r8-loading__track" aria-hidden="true">
        <span class="r8-loading__fill"></span>
      </span>
      <span class="r8-loading__label">Compiling sprites...</span>
    </div>
  </div>

  <div class="r8-stack">
    <span class="r8-badge">Equalizer</span>
    <div class="r8-loading r8-loading--equalizer" role="status" aria-live="polite">
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
    <div class="r8-loading r8-loading--spinner r8-loading--lg" role="status" aria-live="polite">
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
    <div class="r8-loading r8-loading--dots" role="status" aria-live="polite">
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
    <div class="r8-loading r8-loading--bar" role="status" aria-live="polite">
      <span class="r8-loading__track" aria-hidden="true">
        <span class="r8-loading__fill"></span>
      </span>
      <span class="r8-loading__label">Compiling sprites...</span>
    </div>
  </div>

  <div class="r8-stack">
    <span class="r8-badge">Equalizer</span>
    <div class="r8-loading r8-loading--equalizer" role="status" aria-live="polite">
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
    <div class="r8-loading r8-loading--spinner r8-loading--lg" role="status" aria-live="polite">
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
</div>`,
    anatomy: ll(
      [
        "Use `r8-loading` como shell base e escolha uma substructure visual por instancia.",
        "Adicione `r8-loading__label` quando o loading precisar de copy visivel no layout.",
        "Marque pixels, dots, bars, track/fill e spinner cells como `aria-hidden=\"true\"`.",
      ],
      [
        "Use `r8-loading` as the base shell and choose one visual substructure per instance.",
        "Add `r8-loading__label` when the loading state needs visible copy in the layout.",
        "Mark pixels, dots, bars, track/fill and spinner cells with `aria-hidden=\"true\"`.",
      ],
    ),
    accessibility: ll(
      [
        "Use `role=\"status\"` e `aria-live=\"polite\"` quando o loading anunciar atualizacoes reais.",
        "Prefira label visivel; se nao houver, forneca `aria-label` no host.",
        "As animacoes respeitam `prefers-reduced-motion` e recuam para uma apresentacao estatica.",
      ],
      [
        "Use `role=\"status\"` and `aria-live=\"polite\"` when the loading state announces real updates.",
        "Prefer a visible label; if there is none, provide `aria-label` on the host.",
        "Animations respect `prefers-reduced-motion` and fall back to a static presentation.",
      ],
    ),
    api: [
      {
        name: "r8-loading--dots",
        description: l(
          "Variant com dots menores para sincronizacao curta e estados leves.",
          "Variant with smaller dots for short sync states and lightweight waits.",
        ),
      },
      {
        name: "r8-loading--bar",
        description: l(
          "Variant com track e fill em scan loop, boa para compilacao e fetch continuo.",
          "Variant with a track and looping scan fill, great for compile and continuous fetch states.",
        ),
      },
      {
        name: "r8-loading--equalizer",
        description: l(
          "Variant em bars verticais, ideal para audio, stream e monitoramento.",
          "Vertical bar variant, ideal for audio, stream and monitoring states.",
        ),
      },
      {
        name: "r8-loading--spinner",
        description: l(
          "Variant com oito cells em rotacao step-based para estados mais longos.",
          "Eight-cell step-based rotation variant for longer waits.",
        ),
      },
      {
        name: "r8-loading--sm / r8-loading--lg",
        description: l(
          "Size presets para encaixar o loading em toolbars, cards ou superficies maiores.",
          "Size presets for fitting loaders into toolbars, cards or larger surfaces.",
        ),
      },
    ],
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
    data-r8-placement="bottom-start"
  >
    Toggle popover
  </button>
  <section id="docs-popover-preview" class="r8-popover" data-r8-placement="bottom-start" hidden>
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
    data-r8-placement="top"
  >
    Hover or focus
  </button>
  <div id="docs-tooltip-preview" class="r8-tooltip" data-r8-placement="top" role="tooltip" hidden>
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
      "Superficie nativa da Retro8 UI para cards e blocos editoriais, paralela ao Card do catalogo core.",
      "Native Retro8 UI surface for cards and editorial blocks, complementing the core Card component.",
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
