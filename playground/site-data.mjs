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
};

export const componentOrder = [
  "button",
  "input",
  "panel",
  "window",
  "badge",
  "dialog",
  "divider",
  "tabs",
  "progress",
  "navbar",
];

const sharedComponents = {
  button: {
    preview: `<div class="docs-demo__stack">
  <div class="r8-cluster">
    <button class="r8-btn" type="button">Default</button>
    <button class="r8-btn r8-btn--primary" type="button">Primary</button>
    <button class="r8-btn r8-btn--success" type="button">Success</button>
    <button class="r8-btn r8-btn--danger" type="button">Danger</button>
  </div>
  <div class="r8-cluster">
    <button class="r8-btn r8-btn--ghost" type="button">Ghost</button>
    <button class="r8-btn r8-btn--sm" type="button">Small</button>
    <button class="r8-btn r8-btn--lg" type="button">Large</button>
    <button class="r8-btn" type="button" disabled>Disabled</button>
  </div>
</div>`,
    code: `<div class="r8-cluster">
  <button class="r8-btn r8-btn--primary" type="button">Save</button>
  <button class="r8-btn r8-btn--danger" type="button">Delete</button>
  <button class="r8-btn r8-btn--ghost" type="button">Cancel</button>
</div>`,
  },
  input: {
    preview: `<div class="docs-demo__stack">
  <label class="r8-field">
    <span class="r8-label">Pilot name</span>
    <input class="r8-input" type="text" placeholder="PIX-07" />
    <span class="r8-help">Use a short readable alias.</span>
  </label>
  <label class="r8-field">
    <span class="r8-label">Class</span>
    <select class="r8-input">
      <option>Explorer</option>
      <option>Engineer</option>
      <option>Medic</option>
    </select>
  </label>
  <label class="r8-field">
    <span class="r8-label">Notes</span>
    <textarea class="r8-input" placeholder="No anomalies detected."></textarea>
  </label>
</div>`,
    code: `<label class="r8-field">
  <span class="r8-label">Email</span>
  <input class="r8-input" type="email" placeholder="pilot@retro8.dev" />
  <span class="r8-help">Used for mission updates.</span>
</label>`,
  },
  panel: {
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
    code: `<section class="r8-panel">
  <div class="r8-panel__header">
    <h2 class="r8-panel__title">System status</h2>
  </div>
  <div class="r8-panel__body">
    Library ready for use in any framework.
  </div>
</section>`,
  },
  window: {
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
    code: `<section class="r8-window">
  <div class="r8-window__titlebar">
    <span class="r8-window__title">Console</span>
  </div>
  <div class="r8-window__body">Connected to orbital relay.</div>
  <div class="r8-window__statusbar">online</div>
</section>`,
  },
  badge: {
    preview: `<div class="r8-cluster">
  <span class="r8-badge">default</span>
  <span class="r8-badge r8-badge--primary">new</span>
  <span class="r8-badge r8-badge--success">online</span>
  <span class="r8-badge r8-badge--warning">queued</span>
  <span class="r8-badge r8-badge--danger">critical</span>
  <span class="r8-badge r8-badge--info">docs</span>
</div>`,
    code: `<span class="r8-badge r8-badge--success">online</span>`,
  },
  dialog: {
    preview: `<div class="docs-demo__stack">
  <button class="r8-btn r8-btn--primary" type="button" data-open-dialog-demo>
    Open native dialog
  </button>
  <div class="r8-dialog" role="presentation" aria-hidden="true">
    <div class="r8-dialog__titlebar">
      <h3 class="r8-dialog__title">Exit mission?</h3>
    </div>
    <div class="r8-dialog__body">
      The visual shell is ready. You can wire behavior with native dialog or your app runtime.
    </div>
    <div class="r8-dialog__footer">
      <button class="r8-btn" type="button">Cancel</button>
      <button class="r8-btn r8-btn--danger" type="button">Exit</button>
    </div>
  </div>
</div>`,
    code: `<dialog class="r8-dialog" open>
  <div class="r8-dialog__titlebar">
    <h2 class="r8-dialog__title">Confirm deploy</h2>
  </div>
  <div class="r8-dialog__body">
    This action will dispatch the entire repair crew.
  </div>
  <div class="r8-dialog__footer">
    <button class="r8-btn" type="button">Cancel</button>
    <button class="r8-btn r8-btn--primary" type="button">Confirm</button>
  </div>
</dialog>`,
  },
  divider: {
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
    code: `<div class="r8-divider" role="separator">
  <span class="r8-divider__label">checkpoint</span>
</div>`,
  },
  tabs: {
    preview: `<div class="r8-tabs">
  <div class="r8-tabs__list" role="tablist" aria-label="Ship data">
    <button class="r8-tabs__tab" type="button" role="tab" aria-selected="true">Stats</button>
    <button class="r8-tabs__tab" type="button" role="tab" aria-selected="false">Crew</button>
    <button class="r8-tabs__tab" type="button" role="tab" aria-selected="false">Loot</button>
  </div>
  <div class="r8-tabs__panel" role="tabpanel">
    Hull integrity stable. Fuel reserve at 61%. Crew morale high.
  </div>
</div>`,
    code: `<div class="r8-tabs">
  <div class="r8-tabs__list" role="tablist" aria-label="Content tabs">
    <button class="r8-tabs__tab" role="tab" aria-selected="true" type="button">Overview</button>
    <button class="r8-tabs__tab" role="tab" aria-selected="false" type="button">API</button>
  </div>
  <div class="r8-tabs__panel" role="tabpanel">
    Overview content here.
  </div>
</div>`,
  },
  progress: {
    preview: `<div class="docs-demo__stack">
  <div class="r8-progress" style="--r8-progress-value: 32%;">
    <div class="r8-progress__label">
      <span>Upload</span>
      <span>32%</span>
    </div>
    <div class="r8-progress__track">
      <div class="r8-progress__bar"></div>
    </div>
  </div>
  <div class="r8-progress r8-progress--success" style="--r8-progress-value: 84%;">
    <div class="r8-progress__label">
      <span>Shield sync</span>
      <span>84%</span>
    </div>
    <div class="r8-progress__track">
      <div class="r8-progress__bar"></div>
    </div>
  </div>
</div>`,
    code: `<div class="r8-progress" style="--r8-progress-value: 72%;">
  <div class="r8-progress__label">
    <span>Download</span>
    <span>72%</span>
  </div>
  <div class="r8-progress__track">
    <div class="r8-progress__bar"></div>
  </div>
</div>`,
  },
  navbar: {
    preview: `<nav class="r8-navbar">
  <a class="r8-navbar__brand" href="#">retro8-ui</a>
  <ul class="r8-navbar__menu">
    <li><a class="r8-navbar__item" aria-current="page" href="#">Docs</a></li>
    <li><a class="r8-navbar__item" href="#">Components</a></li>
    <li><a class="r8-navbar__item" href="#">Examples</a></li>
  </ul>
  <div class="r8-navbar__actions">
    <span class="r8-badge r8-badge--info">v1</span>
    <button class="r8-btn r8-btn--sm r8-btn--primary" type="button">Install</button>
  </div>
</nav>`,
    code: `<nav class="r8-navbar r8-navbar--dark">
  <a class="r8-navbar__brand" href="/">retro8-ui</a>
  <ul class="r8-navbar__menu">
    <li><a class="r8-navbar__item" aria-current="page" href="/docs">Docs</a></li>
    <li><a class="r8-navbar__item" href="/examples">Examples</a></li>
  </ul>
</nav>`,
  },
};

const sharedTokenGroups = [
  {
    key: "colors",
    type: "color",
    items: [
      { labelKey: "canvas", token: "--r8-color-bg", value: "#16213e" },
      { labelKey: "surface", token: "--r8-color-surface", value: "#f7f1d1" },
      { labelKey: "accent", token: "--r8-color-accent", value: "#3dc2ff" },
      { labelKey: "danger", token: "--r8-color-danger", value: "#ff5964" },
      { labelKey: "success", token: "--r8-color-success", value: "#62c370" },
      { labelKey: "focus", token: "--r8-color-focus", value: "#ffe066" },
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
];

const localized = {
  "pt-br": {
    meta: {
      title: "retro8-ui Docs",
      description:
        "Documentacao bilingue da retro8-ui com paginas por componente, tema claro/escuro e UI inspirada em docs retro.",
    },
    nav: {
      topLinks: [
        { label: "Inicio rapido", anchor: "quick-start" },
        { label: "Componentes", anchor: "components" },
        { label: "Tokens", anchor: "tokens" },
        { label: "Icones", anchor: "icons" },
      ],
      sidebarGroups: [
        {
          title: "Guia",
          items: [
            { id: "overview", label: "Visao geral" },
            { id: "quick-start", label: "Inicio rapido" },
            { id: "tokens", label: "Tokens" },
            { id: "icons", label: "Pacote de icones" },
            { id: "components", label: "Catalogo" },
          ],
        },
        {
          title: "Componentes",
          items: componentOrder,
        },
      ],
      backToCatalog: "Voltar ao catalogo",
      nextComponent: "Proximo componente",
      previousComponent: "Componente anterior",
      sidebarTitle: "Documentacao",
    },
    theme: {
      label: "Tema",
      light: "Claro",
      dark: "Escuro",
    },
    localeSwitcher: {
      label: "Idioma",
    },
    root: {
      kicker: "docs bilingue",
      title: "Escolha um idioma",
      copy:
        "A documentacao agora tem internacionalizacao e paginas separadas por componente. Escolha o idioma para entrar.",
      primaryAction: "Abrir em PT-BR",
      secondaryAction: "Open in English",
      status: "Escolha um idioma para abrir a docs.",
    },
    home: {
      heroWindowTitle: "Biblioteca de UI retro rara",
      heroKicker: "HTML + CSS + Tailwind authoring",
      heroTitle:
        "Documentacao bilingue para uma UI retro 8-bit com paginas reais por componente.",
      heroCopy:
        "A retro8-ui continua framework-agnostic e CSS-first. Agora a docs tem navegacao por idioma, rota individual por componente e tema claro/escuro sem acoplar nada na library.",
      heroPrimary: "Explorar componentes",
      heroSecondary: "Ver quick start",
      heroTertiary: "Testar dialog",
      heroStatus:
        "Estrutura inspirada em experiencias como 8bitcn/ui, mas adaptada para uma library CSS sem wrappers de framework.",
      statsTitle: "O que mudou",
      stats: [
        {
          value: "2 idiomas",
          label: "PT-BR e English, com navegacao consistente entre paginas equivalentes",
        },
        {
          value: "10 paginas",
          label: "uma rota dedicada para cada componente da v1",
        },
        {
          value: "Light/Dark",
          label: "tema persistente na docs sem injetar nada na API da library",
        },
      ],
      overviewTitle: "Por que essa arquitetura",
      overviewItems: [
        "Cada componente agora ganha sua propria pagina, o que escala melhor para exemplos, changelog e futuras props/variantes.",
        "A i18n fica centralizada em um catalogo unico e as paginas sao geradas antes do Vite servir ou buildar.",
        "O tema da docs usa CSS custom properties e tambem consegue recolorir os previews da propria retro8-ui.",
      ],
      quickStartTitle: "Instale, importe e use HTML semantico",
      quickStartCopy:
        "O consumo continua simples: importe o CSS final e monte markup curto com classes r8-* previsiveis.",
      quickStartKicker: "Inicio rapido",
      quickStartCards: [
        {
          title: "Instalacao",
          description: "Adicione a library no projeto consumidor ou no workspace local.",
          code: `npm install retro8-ui`,
        },
        {
          title: "Importe o CSS",
          description: "A saida principal e o CSS compilado, nao um runtime JS.",
          code: `import "retro8-ui/retro8.css";`,
        },
        {
          title: "Markup semantico",
          description: "Combine classe base e modificadores claros, em vez de utility classes enormes.",
          code: `<button class="r8-btn r8-btn--primary" type="button">
  Start mission
</button>`,
        },
      ],
      frameworkTitle: "Uso em qualquer framework",
      frameworkItems: [
        "HTML puro: linke retro8.css e use classes r8-* direto no markup.",
        "React / Next / Vite: importe retro8-ui/retro8.css uma vez na app.",
        "Vue / Nuxt: mesmo fluxo, sem wrappers ou adapters obrigatorios.",
        "Laravel / Blade: publique ou copie o CSS compilado para os assets da app.",
      ],
      conventionsTitle: "Convencoes da API",
      conventionsItems: [
        "r8-btn, r8-panel, r8-window: blocos base.",
        "--primary, --danger, --dark: modificadores previsiveis.",
        "__header, __body, __footer: elementos internos.",
        "O HTML do consumidor continua curto, legivel e cross-framework.",
      ],
      tokensTitle: "Tokens que seguram a identidade visual",
      tokensCopy:
        "Cores, espacamento, bordas, sombras, tipografia e estados interativos vivem em custom properties para manter consistencia e facilitar evolucao.",
      tokensKicker: "Fundacao",
      tokensGroupTitles: {
        colors: "Cores principais",
        spacing: "Espacamento",
        borders: "Bordas e sombras",
        typeAndMotion: "Tipografia e interacao",
      },
      tokenItemLabels: {
        canvas: "Canvas",
        surface: "Superficie",
        accent: "Destaque",
        danger: "Perigo",
        success: "Sucesso",
        focus: "Foco",
        xs: "XS",
        sm: "SM",
        md: "MD",
        lg: "LG",
        thinBorder: "Borda fina",
        thickBorder: "Borda grossa",
        shadowMd: "Sombra md",
        pressed: "Pressionado",
        display: "Display",
        body: "Corpo",
        lift: "Elevar",
        press: "Pressionar",
      },
      iconsTitle: "Pacote de icones opcional",
      iconsCopy:
        "Nao injetei icones na retro8-ui. Em vez disso, a docs recomenda um pacote separado para combinar com a library sem misturar responsabilidades.",
      iconsKicker: "Ecossistema",
      iconsCards: [
        {
          title: "Recomendado: Pixelarticons",
          subtitle: "Melhor fit para combinar com a retro8-ui",
          body:
            "O projeto oficial oferece 800 icones gratuitos no npm com licenca MIT, SVGs raw, CDN e webfont. Isso combina muito bem com uma library CSS-first e framework-agnostic.",
          ctaLabel: "Abrir site",
          ctaHref: "https://pixelarticons.com/",
          secondaryLabel: "GitHub",
          secondaryHref: "https://github.com/halfmage/pixelarticons",
        },
        {
          title: "Alternativa: HackerNoon Pixel Icon Library",
          subtitle: "Boa opcao se voce quiser pacote de fontes + SVG pronto",
          body:
            "Tem 1440+ icones pixelados, varias formas de uso e pacote npm. Para a camada free, os icones ficam sob CC 4.0 com atribuicao, entao eu usaria como opcao secundaria.",
          ctaLabel: "Abrir repo",
          ctaHref: "https://github.com/hackernoon/pixel-icon-library",
          secondaryLabel: "NPM",
          secondaryHref: "https://www.npmjs.com/package/@hackernoon/pixel-icon-library",
        },
      ],
      componentIndexTitle: "Cada componente em sua propria pagina",
      componentIndexCopy:
        "A home virou um catalogo. Use estes cards para abrir a pagina individual de cada componente, com preview, API, notas e HTML.",
      componentIndexKicker: "Catalogo",
      footerPrimary:
        "retro8-ui docs agora funciona como um mini site multi-page, gerado estaticamente e servido pelo Vite.",
      footerSecondary:
        "A library continua focada em CSS compilado e classes semanticas. A docs e o pacote de icones recomendado ficam desacoplados.",
    },
    componentPage: {
      previewLabel: "Preview",
      previewStatus: "Preview real usando o CSS compilado da retro8-ui",
      apiTitle: "API semantica",
      anatomyTitle: "Como compor",
      accessibilityTitle: "Acessibilidade",
      htmlTitleSuffix: "HTML",
      copyHint: "Copie o snippet e adapte ao seu projeto.",
      copyButton: "Copiar HTML",
      copySuccess: "Copiado",
      copyUnavailable: "Sem clipboard",
      dialogTitle: "Dialog nativo",
      dialogBody:
        "Esta janela existe apenas na documentacao para demonstrar o componente Dialog. A library continua sem runtime JS obrigatorio.",
      dialogClose: "Fechar",
      dialogConfirm: "Confirmar",
    },
    components: {
      button: {
        name: "Button",
        category: "Acoes",
        summary:
          "Aciona comandos com feedback forte de hover e active, mantendo hierarquia visual por variantes de cor e tamanho.",
        api: [
          { name: "r8-btn", description: "Classe base obrigatoria para botoes e links de acao." },
          { name: "r8-btn--primary", description: "Realca a acao principal com o accent da library." },
          { name: "r8-btn--secondary", description: "Opcao secundaria com menor peso visual." },
          { name: "r8-btn--success / --danger / --ghost", description: "Variantes semanticas para estado ou acao neutra." },
          { name: "r8-btn--sm / --lg / --block", description: "Escala tamanho e largura sem mudar a estrutura HTML." },
        ],
        anatomy: [
          "Combine a classe base com um modificador quando houver hierarquia visual.",
          "Prefira button para acoes e anchor apenas para navegacao.",
          "O estado pressionado tambem pode ser ligado a aria-pressed=true.",
        ],
        accessibility: [
          "Defina type=\"button\" em formularios para evitar submit involuntario.",
          "O foco visivel ja vem embutido com outline de alto contraste.",
        ],
      },
      input: {
        name: "Input",
        category: "Formularios",
        summary:
          "Entrega campos de formulario com labels semanticos, ajuda contextual e suporte visual a erro, select e textarea.",
        api: [
          { name: "r8-field", description: "Agrupa label, campo e ajuda em uma pilha vertical consistente." },
          { name: "r8-field--inline", description: "Alinha label e campo lado a lado para layouts mais compactos." },
          { name: "r8-label", description: "Rotulo em estilo pixel display." },
          { name: "r8-input", description: "Classe base reutilizavel para input, select e textarea." },
          { name: "r8-help / r8-input--invalid", description: "Suporte para texto auxiliar e erro visual." },
        ],
        anatomy: [
          "Use label envolvendo o controle sempre que possivel para ampliar a area clicavel.",
          "Select e textarea compartilham a mesma API base para reduzir variacao mental.",
        ],
        accessibility: [
          "Associe label e campo corretamente, mesmo quando a estrutura nao envolver o input.",
          "Para erro, complemente o visual com aria-invalid=true e mensagem textual.",
        ],
      },
      panel: {
        name: "Panel / Card",
        category: "Superficies",
        summary:
          "Container padrao para agrupar conteudo, cabecalho, corpo e rodape sem depender de layout utilities do consumidor.",
        api: [
          { name: "r8-panel", description: "Superficie principal para cards e blocos de conteudo." },
          { name: "r8-panel--muted", description: "Suaviza o destaque da superficie quando ela for secundaria." },
          { name: "r8-panel__header / __body / __footer", description: "Estrutura previsivel para compor cards completos." },
          { name: "r8-panel__title / __meta", description: "Tipografia e metadados com hierarquia visual pronta." },
        ],
        anatomy: [
          "Use panel como bloco editorial, resumo, status card ou container de formulario.",
          "Header e footer sao opcionais; o body pode viver sozinho quando o card for simples.",
        ],
        accessibility: [
          "Use section, article ou div conforme o peso semantico do bloco.",
          "Titulos internos ajudam leitores de tela e facilitam landmarks.",
        ],
      },
      window: {
        name: "Window",
        category: "Superficies",
        summary:
          "Container com titlebar e statusbar para composicoes no estilo HUD, desktop retro e paineis de sistema.",
        api: [
          { name: "r8-window", description: "Bloco com sombra maior e ar de sistema operacional retro." },
          { name: "r8-window__titlebar / __title", description: "Cabecalho principal para o nome da janela." },
          { name: "r8-window__controls / __control", description: "Detalhe visual opcional para reforcar a referencia desktop." },
          { name: "r8-window__body / __statusbar", description: "Conteudo principal e faixa inferior de contexto." },
          { name: "r8-window--danger / --success", description: "Modifica a titlebar para situacoes especificas." },
        ],
        anatomy: [
          "Ideal para dashboards, paineis de jogo, consoles e overlays persistentes.",
          "A statusbar e opcional, mas ajuda bastante em layouts de monitoramento.",
        ],
        accessibility: [
          "Se a window representar uma regiao independente, use landmark com heading.",
          "Mantenha o titulo curto e objetivo para leitura rapida.",
        ],
      },
      badge: {
        name: "Badge",
        category: "Dados",
        summary:
          "Etiqueta compacta para status, categoria, versao ou metadata curta em layouts retro de alta densidade.",
        api: [
          { name: "r8-badge", description: "Classe base para labels curtas em linha." },
          { name: "r8-badge--primary / --success / --warning / --danger / --info", description: "Variantes cromaticas sem alterar padding ou borda." },
        ],
        anatomy: [
          "Badge funciona melhor com textos curtissimos, de uma a duas palavras.",
          "Use proximidade visual com cards, tabelas, navbars e titulos de secao.",
        ],
        accessibility: [
          "Nao dependa apenas da cor para transmitir significado critico.",
          "Em contextos dinamicos, complemente com texto de apoio ou icone.",
        ],
      },
      dialog: {
        name: "Dialog",
        category: "Overlays",
        summary:
          "Moldura visual para confirmacoes e mensagens de interrupcao. Pode ser usada com dialog nativo ou markup equivalente.",
        api: [
          { name: "r8-dialog", description: "Moldura principal compativel com dialog nativo." },
          { name: "r8-dialog__titlebar / __title", description: "Faixa superior com titulo do conteudo." },
          { name: "r8-dialog__body / __footer", description: "Area principal e zona de acoes." },
          { name: "r8-dialog--danger", description: "Realce visual para confirmacoes destrutivas." },
        ],
        anatomy: [
          "A library estiliza o componente; o comportamento modal fica a cargo do browser ou da app.",
          "Para preview, voce pode usar dialog ou um container com role=dialog.",
        ],
        accessibility: [
          "Prefira dialog nativo para foco e backdrop corretos.",
          "Conecte o titulo via aria-labelledby e descreva o impacto da decisao.",
        ],
      },
      divider: {
        name: "Divider",
        category: "Layout",
        summary:
          "Separador visual para quebrar blocos de conteudo, com suporte horizontal, vertical e label central estilo cartucho.",
        api: [
          { name: "r8-divider", description: "Linha horizontal para separar secoes." },
          { name: "r8-divider__label", description: "Texto opcional sobreposto no centro da linha." },
          { name: "r8-divider--vertical", description: "Versao vertical para toolbars e clusters." },
        ],
        anatomy: [
          "Use o label apenas quando a divisao realmente introduzir um novo agrupamento.",
          "A variante vertical funciona melhor com elementos inline-flex ou menus.",
        ],
        accessibility: [
          "Em separadores sem conteudo, mantenha role=separator.",
          "Nao use divider apenas por decoracao em excesso.",
        ],
      },
      tabs: {
        name: "Tabs visuais",
        category: "Navegacao",
        summary:
          "Estrutura visual para conteudo tabulado com estados ativos claros. O comportamento pode ser ligado depois por HTML progressivo ou JS do consumidor.",
        api: [
          { name: "r8-tabs", description: "Container do padrao tabulado." },
          { name: "r8-tabs__list / __tab", description: "Barra de abas e item interativo." },
          { name: "r8-tabs__tab--active ou aria-selected=true", description: "Marca visualmente a aba ativa." },
          { name: "r8-tabs__panel", description: "Painel associado ao conteudo atual." },
        ],
        anatomy: [
          "A v1 foca em markup e estados visuais, sem runtime embutido.",
          "A API visual foi pensada para tabs server-side ou client-side.",
        ],
        accessibility: [
          "Siga os roles de tablist, tab e tabpanel quando o padrao for interativo.",
          "Mantenha aria-selected sincronizado com o estado ativo real.",
        ],
      },
      progress: {
        name: "Progress bar",
        category: "Feedback",
        summary:
          "Indicador de progresso com leitura imediata, stripes retro e configuracao via custom property em vez de JavaScript obrigatorio.",
        api: [
          { name: "r8-progress", description: "Container principal do indicador." },
          { name: "r8-progress__label", description: "Linha superior para nome e percentual." },
          { name: "r8-progress__track / __bar", description: "Trilha e preenchimento interno." },
          { name: "--r8-progress-value", description: "Custom property que controla a largura visual da barra." },
          { name: "r8-progress--success / --warning / --danger", description: "Muda a cor do preenchimento conforme contexto." },
        ],
        anatomy: [
          "O valor visual vive em CSS, o que simplifica uso server-rendered e prototipos estaticos.",
          "A label pode exibir percentual textual, etapa atual ou metadado curto.",
        ],
        accessibility: [
          "Para progresso real, complemente com role=progressbar e aria-valuenow/min/max.",
          "Nao dependa apenas da cor; mostre tambem o valor em texto.",
        ],
      },
      navbar: {
        name: "Navbar",
        category: "Navegacao",
        summary:
          "Barra de navegacao retro para documentacao, dashboards e landing pages com brand, itens e area de acoes.",
        api: [
          { name: "r8-navbar", description: "Container principal da navegacao horizontal." },
          { name: "r8-navbar__brand", description: "Marca ou nome do produto." },
          { name: "r8-navbar__menu / __item", description: "Lista de links principais." },
          { name: "r8-navbar__actions", description: "Area para CTA, badges ou controles extras." },
          { name: "r8-navbar--dark", description: "Skin invertida para headers sobre fundos escuros." },
        ],
        anatomy: [
          "A navbar acomoda menus pequenos e CTAs sem exigir grid extra.",
          "Use aria-current=page para marcar a rota ativa.",
        ],
        accessibility: [
          "Prefira envolver a barra em nav com aria-label quando houver mais de uma navegacao.",
          "Mantenha a ordem do DOM coerente com a prioridade da informacao.",
        ],
      },
    },
  },
  en: {
    meta: {
      title: "retro8-ui Docs",
      description:
        "Bilingual retro8-ui documentation with per-component pages, light/dark theme and a retro docs UI.",
    },
    nav: {
      topLinks: [
        { label: "Quick start", anchor: "quick-start" },
        { label: "Components", anchor: "components" },
        { label: "Tokens", anchor: "tokens" },
        { label: "Icons", anchor: "icons" },
      ],
      sidebarGroups: [
        {
          title: "Guide",
          items: [
            { id: "overview", label: "Overview" },
            { id: "quick-start", label: "Quick start" },
            { id: "tokens", label: "Tokens" },
            { id: "icons", label: "Icons package" },
            { id: "components", label: "Catalog" },
          ],
        },
        {
          title: "Components",
          items: componentOrder,
        },
      ],
      backToCatalog: "Back to catalog",
      nextComponent: "Next component",
      previousComponent: "Previous component",
      sidebarTitle: "Documentation",
    },
    theme: {
      label: "Theme",
      light: "Light",
      dark: "Dark",
    },
    localeSwitcher: {
      label: "Language",
    },
    root: {
      kicker: "bilingual docs",
      title: "Choose a language",
      copy:
        "The documentation is now bilingual and split into individual component pages. Pick a language to enter.",
      primaryAction: "Abrir em PT-BR",
      secondaryAction: "Open in English",
      status: "Choose a language to open the docs site.",
    },
    home: {
      heroWindowTitle: "Rare Loot UI Library",
      heroKicker: "HTML + CSS + Tailwind authoring",
      heroTitle:
        "Bilingual documentation for a retro 8-bit UI library with real pages for every component.",
      heroCopy:
        "retro8-ui stays framework-agnostic and CSS-first. The docs now ship with locale-aware navigation, dedicated component routes, and a light/dark theme without coupling anything into the library runtime.",
      heroPrimary: "Browse components",
      heroSecondary: "See quick start",
      heroTertiary: "Try dialog",
      heroStatus:
        "Structure inspired by experiences like 8bitcn/ui, adapted to a CSS-only library without framework wrappers.",
      statsTitle: "What changed",
      stats: [
        {
          value: "2 locales",
          label: "PT-BR and English with matching routes between equivalent pages",
        },
        {
          value: "10 routes",
          label: "one dedicated documentation page for each v1 component",
        },
        {
          value: "Light/Dark",
          label: "persisted docs theme without injecting anything into the UI library API",
        },
      ],
      overviewTitle: "Why this architecture",
      overviewItems: [
        "Each component now gets its own page, which scales better for examples, changelogs and future variants.",
        "i18n lives in one centralized catalog and pages are generated before Vite serves or builds them.",
        "The docs theme uses CSS custom properties and can recolor retro8-ui previews directly.",
      ],
      quickStartTitle: "Install, import and use semantic HTML",
      quickStartCopy:
        "Consumption stays simple: import the final CSS and compose short markup with predictable r8-* classes.",
      quickStartKicker: "Quick start",
      quickStartCards: [
        {
          title: "Install",
          description: "Add the library to the consuming project or to the local workspace.",
          code: `npm install retro8-ui`,
        },
        {
          title: "Import the CSS",
          description: "The main deliverable is compiled CSS, not a JavaScript runtime.",
          code: `import "retro8-ui/retro8.css";`,
        },
        {
          title: "Semantic markup",
          description: "Combine the base class with clear modifiers instead of dumping utilities into the HTML.",
          code: `<button class="r8-btn r8-btn--primary" type="button">
  Start mission
</button>`,
        },
      ],
      frameworkTitle: "Use it in any framework",
      frameworkItems: [
        "Plain HTML: link retro8.css and use r8-* classes directly.",
        "React / Next / Vite: import retro8-ui/retro8.css once in your app.",
        "Vue / Nuxt: same flow, with no wrappers or adapters required.",
        "Laravel / Blade: publish or copy the compiled CSS into your app assets.",
      ],
      conventionsTitle: "API conventions",
      conventionsItems: [
        "r8-btn, r8-panel, r8-window: base blocks.",
        "--primary, --danger, --dark: predictable modifiers.",
        "__header, __body, __footer: internal elements.",
        "Consumer HTML stays short, readable and cross-framework.",
      ],
      tokensTitle: "Tokens that hold the visual system together",
      tokensCopy:
        "Colors, spacing, borders, shadows, typography and interaction states live in custom properties so the library stays consistent and easier to evolve.",
      tokensKicker: "Foundation",
      tokensGroupTitles: {
        colors: "Core colors",
        spacing: "Spacing",
        borders: "Borders and shadows",
        typeAndMotion: "Type and motion",
      },
      tokenItemLabels: {
        canvas: "Canvas",
        surface: "Surface",
        accent: "Accent",
        danger: "Danger",
        success: "Success",
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
      iconsTitle: "Optional icons package",
      iconsCopy:
        "I did not bundle icons into retro8-ui. Instead, the docs recommend a separate package so you can combine it with the UI without mixing responsibilities.",
      iconsKicker: "Ecosystem",
      iconsCards: [
        {
          title: "Recommended: Pixelarticons",
          subtitle: "Best fit to pair with retro8-ui",
          body:
            "The official project ships 800 free icons on npm under MIT, plus raw SVG, CDN and webfont options. That matches a CSS-first, framework-agnostic library extremely well.",
          ctaLabel: "Open website",
          ctaHref: "https://pixelarticons.com/",
          secondaryLabel: "GitHub",
          secondaryHref: "https://github.com/halfmage/pixelarticons",
        },
        {
          title: "Alternative: HackerNoon Pixel Icon Library",
          subtitle: "Good option if you want font classes plus SVG assets",
          body:
            "It includes 1440+ pixel icons, multiple usage modes and an npm package. For the free tier, icons are under CC 4.0 attribution, so I would keep it as a secondary option.",
          ctaLabel: "Open repo",
          ctaHref: "https://github.com/hackernoon/pixel-icon-library",
          secondaryLabel: "NPM",
          secondaryHref: "https://www.npmjs.com/package/@hackernoon/pixel-icon-library",
        },
      ],
      componentIndexTitle: "Every component has its own page",
      componentIndexCopy:
        "The home page is now a catalog. Use these cards to open the individual page for each component, with preview, API, notes and HTML.",
      componentIndexKicker: "Catalog",
      footerPrimary:
        "retro8-ui docs now behaves like a small multi-page site, generated statically and served through Vite.",
      footerSecondary:
        "The main product is still compiled CSS plus semantic classes. The docs and the recommended icons package stay decoupled.",
    },
    componentPage: {
      previewLabel: "Preview",
      previewStatus: "Live preview using retro8-ui compiled CSS",
      apiTitle: "Semantic API",
      anatomyTitle: "How to compose it",
      accessibilityTitle: "Accessibility",
      htmlTitleSuffix: "HTML",
      copyHint: "Copy the snippet and adapt it to your project.",
      copyButton: "Copy HTML",
      copySuccess: "Copied",
      copyUnavailable: "No clipboard",
      dialogTitle: "Native dialog",
      dialogBody:
        "This window exists only inside the docs to demonstrate the Dialog component. The library itself still ships with no required JS runtime.",
      dialogClose: "Close",
      dialogConfirm: "Confirm",
    },
    components: {
      button: {
        name: "Button",
        category: "Actions",
        summary:
          "Triggers commands with strong hover and active feedback while keeping hierarchy through clear color and size modifiers.",
        api: [
          { name: "r8-btn", description: "Required base class for buttons and action links." },
          { name: "r8-btn--primary", description: "Highlights the main action with the library accent color." },
          { name: "r8-btn--secondary", description: "Secondary action with lower visual weight." },
          { name: "r8-btn--success / --danger / --ghost", description: "Semantic variants for state and neutral actions." },
          { name: "r8-btn--sm / --lg / --block", description: "Scales size and width without changing the HTML structure." },
        ],
        anatomy: [
          "Combine the base class with a modifier whenever the action needs hierarchy.",
          "Prefer button for actions and anchor only for navigation.",
          "The pressed state can also be tied to aria-pressed=true.",
        ],
        accessibility: [
          "Set type=\"button\" inside forms to avoid accidental submit behavior.",
          "Visible focus is already included with a high-contrast outline.",
        ],
      },
      input: {
        name: "Input",
        category: "Forms",
        summary:
          "Provides semantic form fields with labels, helper text and visual invalid states across input, select and textarea.",
        api: [
          { name: "r8-field", description: "Groups label, field and help text in a consistent vertical stack." },
          { name: "r8-field--inline", description: "Aligns label and control side by side for denser layouts." },
          { name: "r8-label", description: "Pixel-display style label." },
          { name: "r8-input", description: "Reusable base class for input, select and textarea." },
          { name: "r8-help / r8-input--invalid", description: "Support text and visual invalid state." },
        ],
        anatomy: [
          "Wrap controls with label whenever possible to increase the clickable area.",
          "Select and textarea share the same base API to reduce mental overhead.",
        ],
        accessibility: [
          "Make sure label and control stay properly associated even when not wrapped.",
          "For validation, pair the visual treatment with aria-invalid=true and explicit text.",
        ],
      },
      panel: {
        name: "Panel / Card",
        category: "Surfaces",
        summary:
          "Default content container for headers, bodies and footers without relying on utility-class-heavy consumer markup.",
        api: [
          { name: "r8-panel", description: "Primary surface for cards and content blocks." },
          { name: "r8-panel--muted", description: "Softens the surface when the card should feel secondary." },
          { name: "r8-panel__header / __body / __footer", description: "Predictable inner structure for richer cards." },
          { name: "r8-panel__title / __meta", description: "Built-in hierarchy for title and supporting metadata." },
        ],
        anatomy: [
          "Use panel for editorial blocks, summaries, status cards or form wrappers.",
          "Header and footer are optional; body can stand alone in simpler cases.",
        ],
        accessibility: [
          "Choose section, article or div depending on the semantic importance of the block.",
          "Internal headings make screen-reader navigation easier.",
        ],
      },
      window: {
        name: "Window",
        category: "Surfaces",
        summary:
          "Container with titlebar and statusbar for HUD-like compositions, retro desktop layouts and system panels.",
        api: [
          { name: "r8-window", description: "Surface with larger shadow and desktop-like personality." },
          { name: "r8-window__titlebar / __title", description: "Main header area for the window name." },
          { name: "r8-window__controls / __control", description: "Optional visual detail reinforcing the desktop reference." },
          { name: "r8-window__body / __statusbar", description: "Main content and contextual bottom strip." },
          { name: "r8-window--danger / --success", description: "Adjusts the titlebar color for specific contexts." },
        ],
        anatomy: [
          "Great for dashboards, game panels, consoles and persistent overlays.",
          "The statusbar is optional, but very effective in monitoring-style layouts.",
        ],
        accessibility: [
          "If the window represents its own region, use a semantic landmark with a heading.",
          "Keep titles short and easy to scan.",
        ],
      },
      badge: {
        name: "Badge",
        category: "Data display",
        summary:
          "Compact label for statuses, categories, versions or any short metadata in dense retro layouts.",
        api: [
          { name: "r8-badge", description: "Base class for short inline labels." },
          { name: "r8-badge--primary / --success / --warning / --danger / --info", description: "Color variants without changing spacing or border rhythm." },
        ],
        anatomy: [
          "Badges work best with one or two-word labels.",
          "Place them close to cards, tables, navbars and section titles.",
        ],
        accessibility: [
          "Do not rely on color alone for critical meaning.",
          "In dynamic contexts, add supporting text or iconography.",
        ],
      },
      dialog: {
        name: "Dialog",
        category: "Overlays",
        summary:
          "Visual frame for confirmations and interruptions. It works with native dialog or equivalent markup from the consuming app.",
        api: [
          { name: "r8-dialog", description: "Main shell compatible with native dialog." },
          { name: "r8-dialog__titlebar / __title", description: "Top area for dialog heading." },
          { name: "r8-dialog__body / __footer", description: "Main content and actions area." },
          { name: "r8-dialog--danger", description: "Visual emphasis for destructive confirmations." },
        ],
        anatomy: [
          "The library handles the visuals; modal behavior is up to the browser or the host app.",
          "For previews, you can use native dialog or a role=dialog container.",
        ],
        accessibility: [
          "Prefer native dialog for correct focus and backdrop behavior.",
          "Connect the title with aria-labelledby and describe the impact of the action.",
        ],
      },
      divider: {
        name: "Divider",
        category: "Layout",
        summary:
          "Visual separator for content groups, with horizontal, vertical and labeled retro cartridge-like variants.",
        api: [
          { name: "r8-divider", description: "Horizontal rule for separating sections." },
          { name: "r8-divider__label", description: "Optional label layered over the center line." },
          { name: "r8-divider--vertical", description: "Vertical version for toolbars and clusters." },
        ],
        anatomy: [
          "Use the label only when the separator truly introduces a new group.",
          "The vertical variant works best with inline-flex elements or menus.",
        ],
        accessibility: [
          "For decorative-free separators, keep role=separator.",
          "Do not overuse dividers just for decoration.",
        ],
      },
      tabs: {
        name: "Visual tabs",
        category: "Navigation",
        summary:
          "Visual structure for tabbed content with clear active states. Behavior can be layered later with progressive HTML or framework JS.",
        api: [
          { name: "r8-tabs", description: "Container for the tab pattern." },
          { name: "r8-tabs__list / __tab", description: "Tabs list and interactive tab item." },
          { name: "r8-tabs__tab--active or aria-selected=true", description: "Marks the active tab visually." },
          { name: "r8-tabs__panel", description: "Panel associated with the current tab." },
        ],
        anatomy: [
          "v1 focuses on markup and visuals, without shipping a built-in runtime.",
          "The visual API was designed to work well with server-side or client-side tab logic.",
        ],
        accessibility: [
          "Use tablist, tab and tabpanel roles when the pattern is interactive.",
          "Keep aria-selected synchronized with the actual active state.",
        ],
      },
      progress: {
        name: "Progress bar",
        category: "Feedback",
        summary:
          "Progress indicator with immediate readability, retro stripes and a CSS custom property instead of required JavaScript.",
        api: [
          { name: "r8-progress", description: "Main progress container." },
          { name: "r8-progress__label", description: "Top row for label and percentage." },
          { name: "r8-progress__track / __bar", description: "Track and inner fill." },
          { name: "--r8-progress-value", description: "Custom property controlling the visual width of the bar." },
          { name: "r8-progress--success / --warning / --danger", description: "Changes the fill color according to context." },
        ],
        anatomy: [
          "The visual value lives in CSS, which makes server-rendered and static usage much easier.",
          "The label can show percentage, step or any short metadata.",
        ],
        accessibility: [
          "For real progress states, add role=progressbar and aria-valuenow/min/max.",
          "Do not rely on color alone; expose the value in text too.",
        ],
      },
      navbar: {
        name: "Navbar",
        category: "Navigation",
        summary:
          "Retro navigation bar for documentation, dashboards and landing pages with brand, menu items and actions.",
        api: [
          { name: "r8-navbar", description: "Main container for horizontal navigation." },
          { name: "r8-navbar__brand", description: "Product or brand label." },
          { name: "r8-navbar__menu / __item", description: "List of primary links." },
          { name: "r8-navbar__actions", description: "Area for CTAs, badges or extra controls." },
          { name: "r8-navbar--dark", description: "Inverted skin for headers over dark backgrounds." },
        ],
        anatomy: [
          "The navbar handles small menus and CTAs without requiring extra grid scaffolding.",
          "Use aria-current=page to mark the active route.",
        ],
        accessibility: [
          "Wrap it in nav with aria-label when the page contains more than one navigation landmark.",
          "Keep DOM order aligned with content priority.",
        ],
      },
    },
  },
};

export function getPath({ locale, pageKind = "home", componentId = "", anchor = "" }) {
  const safeLocale = localeMeta[locale] ? locale : "pt-br";
  const base = pageKind === "component" ? `/${safeLocale}/components/${componentId}/` : `/${safeLocale}/`;
  return anchor ? `${base}#${anchor}` : base;
}

export function getSiteContent(locale = "pt-br") {
  const safeLocale = localeMeta[locale] ? locale : "pt-br";
  const dictionary = localized[safeLocale];

  const components = componentOrder.map((id) => ({
    id,
    ...sharedComponents[id],
    ...dictionary.components[id],
  }));

  const tokens = sharedTokenGroups.map((group) => ({
    title: dictionary.home.tokensGroupTitles[group.key],
    type: group.type,
    items: group.items.map((item) => ({
      label: dictionary.home.tokenItemLabels[item.labelKey],
      token: item.token,
      value: item.value,
    })),
  }));

  return {
    locale: safeLocale,
    localeInfo: localeMeta[safeLocale],
    meta: dictionary.meta,
    nav: dictionary.nav,
    theme: dictionary.theme,
    localeSwitcher: dictionary.localeSwitcher,
    root: dictionary.root,
    home: {
      ...dictionary.home,
      tokens,
      components,
    },
    componentPage: dictionary.componentPage,
    components,
  };
}

export function getComponentById(locale, componentId) {
  return getSiteContent(locale).components.find((component) => component.id === componentId);
}

export function getComponentNeighbors(componentId) {
  const index = componentOrder.indexOf(componentId);
  return {
    previous: index > 0 ? componentOrder[index - 1] : null,
    next: index >= 0 && index < componentOrder.length - 1 ? componentOrder[index + 1] : null,
  };
}
