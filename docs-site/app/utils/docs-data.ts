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
import baseTokensSource from "../../../src/styles/base/tokens.css?raw";

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

const foundationTokenGroupOrder = [
  "surfacesAndInk",
  "semanticColors",
  "statesAndOverlay",
  "spacing",
  "bordersAndRadius",
  "shadows",
  "typography",
  "focusAndMotion",
] as const;

type FoundationTokenGroupKey = (typeof foundationTokenGroupOrder)[number];

type DocsTokenItem = {
  label: string;
  token: string;
  value: string;
  description?: string;
};

type DocsTokenGroup = {
  id: string;
  title: string;
  type: "color" | "token";
  meta?: string;
  items: DocsTokenItem[];
};

const foundationColorGroups = new Set<FoundationTokenGroupKey>([
  "surfacesAndInk",
  "semanticColors",
  "statesAndOverlay",
]);

const tokenLabelDictionary = {
  en: {
    accent: "Accent",
    backdrop: "Backdrop",
    bg: "Background",
    body: "Body",
    border: "Border",
    contrast: "Contrast",
    danger: "Danger",
    dark: "Dark",
    dialog: "Dialog",
    disabled: "Disabled",
    display: "Display",
    focus: "Focus",
    font: "Font",
    info: "Info",
    ink: "Ink",
    inset: "Inset",
    light: "Light",
    lift: "Lift",
    motion: "Motion",
    muted: "Muted",
    offset: "Offset",
    press: "Press",
    primary: "Primary",
    radius: "Radius",
    raised: "Raised",
    secondary: "Secondary",
    shadow: "Shadow",
    size: "Size",
    space: "Space",
    step: "Step",
    strong: "Strong",
    success: "Success",
    surface: "Surface",
    tertiary: "Tertiary",
    thin: "Thin",
    thick: "Thick",
    warning: "Warning",
    width: "Width",
  },
  "pt-br": {
    accent: "Destaque",
    backdrop: "Backdrop",
    bg: "Fundo",
    body: "Corpo",
    border: "Borda",
    contrast: "Contraste",
    danger: "Perigo",
    dark: "Escuro",
    dialog: "Dialogo",
    disabled: "Desabilitado",
    display: "Destaque",
    focus: "Foco",
    font: "Fonte",
    info: "Info",
    ink: "Texto",
    inset: "Interna",
    light: "Claro",
    lift: "Elevacao",
    motion: "Movimento",
    muted: "Suave",
    offset: "Offset",
    press: "Pressao",
    primary: "Primaria",
    radius: "Raio",
    raised: "Elevada",
    secondary: "Secundaria",
    shadow: "Sombra",
    size: "Tamanho",
    space: "Espaco",
    step: "Passo",
    strong: "Forte",
    success: "Sucesso",
    surface: "Superficie",
    tertiary: "Terciaria",
    thin: "Fina",
    thick: "Grossa",
    warning: "Aviso",
    width: "Largura",
  },
} as const;

function extractRootTokens(source: string) {
  const rootBlock = source.match(/:root\s*\{([\s\S]*?)\n\s*\}/);

  if (!rootBlock) {
    return [];
  }

  return [...rootBlock[1].matchAll(/^\s*(--r8-[a-z0-9-]+)\s*:\s*([^;]+);/gm)].map((match) => ({
    token: match[1],
    value: match[2].trim(),
  }));
}

const foundationTokenEntries = extractRootTokens(baseTokensSource);

function getFoundationTokenGroupKey(token: string): FoundationTokenGroupKey {
  if (
    token === "--r8-color-bg" ||
    token === "--r8-color-border" ||
    token.startsWith("--r8-color-surface") ||
    token.startsWith("--r8-color-ink")
  ) {
    return "surfacesAndInk";
  }

  if (token.startsWith("--r8-color-")) {
    return token === "--r8-color-focus" || token.startsWith("--r8-color-disabled")
      ? "statesAndOverlay"
      : "semanticColors";
  }

  if (token === "--r8-dialog-backdrop") {
    return "statesAndOverlay";
  }

  if (token.startsWith("--r8-space-")) {
    return "spacing";
  }

  if (token.startsWith("--r8-border-") || token.startsWith("--r8-radius-")) {
    return "bordersAndRadius";
  }

  if (token.startsWith("--r8-shadow-")) {
    return "shadows";
  }

  if (token.startsWith("--r8-font-")) {
    return "typography";
  }

  return "focusAndMotion";
}

function formatTokenLabel(token: string, locale: DocsLocale) {
  const safeLocale = locale in tokenLabelDictionary ? locale : "en";
  const dictionary = tokenLabelDictionary[safeLocale];
  const segments = token.replace(/^--r8-/, "").split("-");
  const normalizedSegments = segments[0] === "color" ? segments.slice(1) : segments;

  return normalizedSegments
    .map((segment) => {
      if (/^\d+$/.test(segment)) {
        return segment;
      }

      return dictionary[segment as keyof typeof dictionary] ?? segment.toUpperCase();
    })
    .join(" ");
}

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
      componentTokensTitle: "Variaveis especificas de componentes",
      componentTokensCopy:
        "Alguns componentes expõem variaveis proprias para controlar comportamento visual, tamanho, estado ou ajustes locais sem mexer na base inteira.",
      foundationTokenGroupTitles: {
        surfacesAndInk: "Superficies e texto",
        semanticColors: "Cores semanticas",
        statesAndOverlay: "Estados e overlay",
        spacing: "Espacamento",
        bordersAndRadius: "Bordas e raio",
        shadows: "Sombras",
        typography: "Tipografia",
        focusAndMotion: "Foco e movimento",
      },
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
      buttonPlayground: {
        title: "Playground do Button",
        copy: "Teste tom, tamanho e estados comuns sem sair da documentação antes de copiar o markup final.",
        labelField: "Texto do botão",
        variantField: "Variação",
        sizeField: "Tamanho",
        statesLabel: "Estados rápidos",
        previewLabel: "Prévia configurável",
        previewCopy: "O preview abaixo usa a API pública do Button para validar leitura, peso visual e largura.",
        markupLabel: "Markup atual",
        resetLabel: "Redefinir",
        activeLabel: "Ativo",
        loadingLabel: "Carregando",
        disabledLabel: "Desabilitado",
        blockLabel: "Largura total",
        defaultText: "Iniciar missão",
        options: {
          default: "Padrão",
          primary: "Primário",
          secondary: "Secundário",
          tertiary: "Terciário",
          success: "Sucesso",
          info: "Info",
          danger: "Perigo",
          dark: "Escuro",
          light: "Claro",
          ghost: "Ghost",
          sm: "Pequeno",
          md: "Médio",
          lg: "Grande",
        },
      },
      borderPlayground: {
        title: "Playground do Border",
        copy: "Teste espessura, tom, lado visivel e modo ghost para validar rapidamente o framing ideal antes de copiar o markup.",
        labelField: "Titulo do bloco",
        toneField: "Tom",
        widthField: "Espessura",
        edgeField: "Lado visivel",
        statesLabel: "Ajustes rapidos",
        previewLabel: "Previa configuravel",
        previewCopy: "A amostra abaixo usa apenas a API publica do Border, sem runtime, para validar contraste e estrutura.",
        markupLabel: "Markup atual",
        resetLabel: "Redefinir",
        ghostLabel: "Ghost",
        defaultTitle: "Painel monitorado",
        helperCopy: "Borda retro para destacar contexto, separar secoes e criar ritmo visual.",
        options: {
          default: "Padrao",
          primary: "Primario",
          secondary: "Secundario",
          success: "Sucesso",
          info: "Info",
          danger: "Perigo",
          thin: "Fina",
          thick: "Grossa",
          all: "Todas",
          top: "Topo",
          end: "Fim",
          bottom: "Base",
          start: "Inicio",
        },
      },
      colorPlayground: {
        title: "Playground do Color",
        copy: "Teste tons de texto em diferentes superficies para validar contraste e escolher a enfase certa antes de copiar o markup.",
        labelField: "Texto de exemplo",
        toneField: "Tom do texto",
        surfaceField: "Superficie",
        previewLabel: "Previa configuravel",
        previewCopy: "Use a superficie como contexto de contraste e ajuste o tom semantico do texto ate encontrar a leitura ideal.",
        markupLabel: "Markup atual",
        resetLabel: "Redefinir",
        defaultText: "Sistema sincronizado e pronto para iniciar.",
        options: {
          default: "Padrao",
          muted: "Suave",
          subtle: "Sutil",
          primary: "Primario",
          secondary: "Secundario",
          tertiary: "Terciario",
          success: "Sucesso",
          warning: "Aviso",
          info: "Info",
          danger: "Perigo",
          dark: "Escuro",
          light: "Claro",
          surface: "Superficie",
          surface2: "Superficie 2",
          surface3: "Superficie 3",
          darkSurface: "Escura",
          primarySurface: "Primaria",
          warningSurface: "Aviso",
        },
      },
      colorPickerPlayground: {
        title: "Playground do Color Picker",
        copy: "Teste os dois modos do componente: uma paleta fixa por swatches e um picker dinamico com arraste para qualquer cor.",
        labelField: "Rotulo do trigger",
        placeholderField: "Placeholder",
        modeField: "Tipo",
        sizeField: "Tamanho",
        statesLabel: "Estados rapidos",
        previewLabel: "Previa configuravel",
        previewCopy: "Este playground cobre os dois recortes mais uteis da comparacao com o Element Plus: swatches fixas para escolhas controladas e um painel dinamico para selecionar qualquer cor, arrastar hue e confirmar no OK.",
        eventsLabel: "Eventos ao vivo",
        markupLabel: "Markup atual",
        resetLabel: "Redefinir",
        presetLabel: "Paleta fixa",
        clearableLabel: "Com clear",
        alphaLabel: "Mostrar alpha",
        clearButtonText: "Clear",
        helperCopy: "Use o modo fixo para tokens curados, accents locais e escolhas de tema mais controladas.",
        dynamicHelperCopy: "Use o modo dinamico quando a pessoa precisa explorar qualquer hue, ajustar transparencias e confirmar a cor final no proprio painel.",
        eventIdle: "Aguardando interacao com o Color Picker.",
        clearEventText: "cor limpa",
        defaultLabel: "Accent color",
        defaultPlaceholder: "Pick accent color",
        options: {
          fixed: "Fixo",
          dynamic: "Dinamico",
          sm: "Pequeno",
          md: "Medio",
          lg: "Grande",
        },
      },
      datePickerPlayground: {
        title: "Playground do Date Picker",
        copy: "Teste locale, semana iniciando em dias diferentes, atalhos e week numbers para validar o calendario antes de copiar o markup final.",
        placeholderField: "Placeholder",
        localeField: "Locale",
        weekStartField: "Inicio da semana",
        statesLabel: "Estados rapidos",
        previewLabel: "Previa configuravel",
        previewCopy: "Este playground cobre o recorte mais seguro da comparacao com o Element Plus: atalhos declarativos, numeracao de semanas e contexto de locale sem puxar tipos maiores como range, month ou year picker.",
        eventsLabel: "Eventos ao vivo",
        markupLabel: "Markup atual",
        resetLabel: "Redefinir",
        shortcutsLabel: "Com atalhos",
        weekNumbersLabel: "Com week numbers",
        constrainedLabel: "Com min/max",
        helperCopy: "Use atalhos para datas recorrentes e week numbers quando a leitura do calendario depender mais de planejamento semanal.",
        eventIdle: "Aguardando interacao com o Date Picker.",
        clearedLabel: "data limpa",
        defaultPlaceholder: "Select launch date",
        options: {
          ptBR: "Portugues (BR)",
          enUS: "English (US)",
          sunday: "Domingo",
          monday: "Segunda",
        },
      },
      inputPlayground: {
        title: "Playground do Input",
        copy: "Teste o shell opcional do campo com clear, contador, toggle de senha e autosize antes de copiar o markup final.",
        typeField: "Tipo de campo",
        placeholderField: "Placeholder",
        maxLengthField: "Max length",
        sizeField: "Tamanho",
        statesLabel: "Estados rapidos",
        previewLabel: "Previa configuravel",
        previewCopy: "Este playground cobre o recorte mais seguro da comparacao com o Element Plus: clear, contador de caracteres, toggle de senha e textarea com autosize, sem puxar APIs mais pesadas como formatter/parser ou estruturas prepend/append.",
        eventsLabel: "Eventos ao vivo",
        markupLabel: "Markup atual",
        resetLabel: "Redefinir",
        clearableLabel: "Com clear",
        wordLimitLabel: "Com contador",
        passwordToggleLabel: "Toggle de senha",
        autosizeLabel: "Autosize",
        invalidLabel: "Invalido",
        helperCopy: "Use o shell opcional quando o campo precisar de acoes auxiliares e feedback curto sem perder o visual retro base.",
        eventIdle: "Aguardando interacao com o Input.",
        clearEventText: "campo limpo",
        revealEventText: "senha revelada",
        hideEventText: "senha oculta",
        defaultPlaceholder: "Enter callsign",
        defaultValue: "PIX-07 Vanguard",
        options: {
          text: "Texto",
          password: "Senha",
          textarea: "Textarea",
          sm: "Pequeno",
          md: "Medio",
          lg: "Grande",
        },
      },
      inputNumberPlayground: {
        title: "Playground do Input Number",
        copy: "Teste limites, precision, step strictly e controles na lateral direita antes de copiar o markup final.",
        valueField: "Valor inicial",
        minField: "Min",
        maxField: "Max",
        stepField: "Step",
        precisionField: "Precision",
        sizeField: "Tamanho",
        statesLabel: "Estados rapidos",
        previewLabel: "Previa configuravel",
        previewCopy: "Este playground cobre o recorte mais seguro da comparacao com o Element Plus: precision declarativa, step strictly, controles a direita e sincronizacao melhor entre clique e digitacao manual.",
        eventsLabel: "Eventos ao vivo",
        markupLabel: "Markup atual",
        resetLabel: "Redefinir",
        strictLabel: "Step strictly",
        rightControlsLabel: "Controles a direita",
        disabledLabel: "Desabilitado",
        helperCopy: "Use precision e step strictly quando o valor fizer parte de limites operacionais, estoque ou qualquer fluxo numerico mais sensivel.",
        eventIdle: "Aguardando interacao com o Input Number.",
        options: {
          sm: "Pequeno",
          md: "Medio",
          lg: "Grande",
        },
      },
      inputTagPlayground: {
        title: "Playground do Input Tag",
        copy: "Teste limite de tags, delimitadores, clear all e tamanhos antes de copiar o markup final.",
        placeholderField: "Placeholder",
        maxTagsField: "Max tags",
        delimitersField: "Delimitadores",
        sizeField: "Tamanho",
        statesLabel: "Estados rapidos",
        previewLabel: "Previa configuravel",
        previewCopy: "Este playground cobre o recorte mais seguro da comparacao com o Element Plus: limite de tags, delimitadores configuraveis, backspace para remover a ultima tag e clear all no proprio campo.",
        eventsLabel: "Eventos ao vivo",
        markupLabel: "Markup atual",
        resetLabel: "Redefinir",
        clearableLabel: "Com clear all",
        disabledLabel: "Desabilitado",
        helperCopy: "Use delimitadores quando o fluxo aceitar colar uma lista pronta e max tags quando o conjunto precisar se manter curto e previsivel.",
        eventIdle: "Aguardando interacao com o Input Tag.",
        defaultPlaceholder: "Add tag and press Enter",
        initialTags: {
          first: "HUD",
          second: "PIXEL",
        },
        options: {
          sm: "Pequeno",
          md: "Medio",
          lg: "Grande",
        },
      },
      iconPlayground: {
        title: "Playground do Icon",
        copy: "Teste as fontes de glyph que a docs ja usa, ajuste tamanho e tom da moldura e copie o markup final sem sair da pagina.",
        labelField: "Label",
        glyphField: "Glyph curto",
        sourceField: "Fonte do icone",
        toneField: "Tom da moldura",
        sizeField: "Tamanho",
        accessibilityLabel: "Acessibilidade",
        previewLabel: "Previa configuravel",
        previewCopy: "Use o toggle para alternar entre um icone decorativo e um asset que precisa de significado visivel.",
        markupLabel: "Markup atual",
        resetLabel: "Redefinir",
        decorativeLabel: "Decorativo",
        defaultLabel: "Cursor pointer",
        defaultGlyph: "HP",
        options: {
          pointer: "Cursor pointer",
          grab: "Cursor grab",
          wait: "Cursor wait",
          disabled: "Cursor disabled",
          inlineSvg: "SVG inline",
          textGlyph: "Glyph de texto",
          default: "Padrao",
          primary: "Primario",
          dark: "Escuro",
          success: "Sucesso",
          warning: "Aviso",
          sm: "Pequeno",
          md: "Medio",
          lg: "Grande",
        },
        sourceDescriptions: {
          pointer: "Exemplo com o cursor pointer pixelado usado pela propria docs.",
          grab: "Exemplo com um asset de grab, bom para estados de arraste e panes redimensionaveis.",
          wait: "Exemplo com o cursor de espera para estados de loading ou bloqueio temporario.",
          disabled: "Exemplo com o asset de indisponivel para comunicar bloqueio visual sem depender so da cor.",
          inlineSvg: "Exemplo com SVG inline, util quando o pacote externo entrega markup vetorial ou sprite local.",
          textGlyph: "Exemplo com glyph textual curto, bom para fallback rapido, siglas ou estados temporarios.",
        },
      },
      autocompletePlayground: {
        title: "Playground do Autocomplete",
        copy: "Teste abertura no foco, clear, loading e templates mais ricos para validar o campo antes de copiar o markup final.",
        behaviorField: "Abertura da lista",
        statesLabel: "Estados rapidos",
        previewLabel: "Previa configuravel",
        previewCopy: "Este playground traduz o recorte mais seguro da comparacao com o Element Plus: clear opcional, controle de abertura, feedback vazio/loading e options mais ricas sem depender de framework.",
        eventsLabel: "Eventos ao vivo",
        markupLabel: "Markup atual",
        resetLabel: "Redefinir",
        clearableLabel: "Clear visivel",
        clearButtonLabel: "Limpar busca",
        loadingLabel: "Loading remoto",
        richLabel: "Options ricas",
        eventIdle: "Aguardando interacao com o Autocomplete.",
        clearEventText: "campo limpo",
        placeholder: "Search pilot...",
        emptyLabel: "No pilots matched this query.",
        loadingText: "Syncing remote routes...",
        options: {
          focus: "Abre no foco",
          typing: "Abre ao digitar",
        },
        suggestions: {
          first: "PIX-07 Vanguard",
          firstMeta: "Piloto de reconhecimento / divisao scout",
          second: "PIX-11 Sentinel",
          secondMeta: "Ala de suporte / relay de comando",
          third: "PIX-12 Striker",
          thirdMeta: "Ataque frontal / lead de breach",
          fourth: "PIX-21 Oracle",
          fourthMeta: "Analista de intel / previsao de rotas",
        },
      },
      cascaderPlayground: {
        title: "Playground do Cascader",
        copy: "Teste trigger por click ou hover, filtro, clear e o modo de exibir o caminho para validar a navegacao hierarquica antes de copiar o markup final.",
        triggerField: "Expansao",
        separatorField: "Separador",
        filterPlaceholderField: "Placeholder do filtro",
        statesLabel: "Estados rapidos",
        previewLabel: "Previa configuravel",
        previewCopy: "Este playground cobre o recorte mais seguro da comparacao com o Element Plus: escolha hierarquica clara, filtro local e controle entre caminho completo ou ultimo nivel no trigger.",
        eventsLabel: "Eventos ao vivo",
        markupLabel: "Markup atual",
        resetLabel: "Redefinir",
        filterableLabel: "Com filtro",
        clearableLabel: "Com clear",
        strictLabel: "Seleciona qualquer nivel",
        compactLabel: "Mostra so o ultimo nivel",
        eventIdle: "Aguardando interacao com o Cascader.",
        clearEventText: "selecao limpa",
        placeholder: "Select outpost",
        filterPlaceholder: "Filter routes...",
        emptyLabel: "No matching routes",
        clearButtonText: "Clear",
        options: {
          click: "Click",
          hover: "Hover",
        },
      },
      checkboxPlayground: {
        title: "Playground do Checkbox",
        copy: "Teste estado marcado, misto, desabilitado, tamanho e shell com borda para validar o controle antes de copiar o markup final.",
        labelField: "Texto do label",
        sizeField: "Tamanho",
        statesLabel: "Estados rapidos",
        previewLabel: "Previa configuravel",
        previewCopy: "Este playground traduz o recorte mais seguro da comparacao com o Element Plus: estado misto, tamanho e shell com borda, sem puxar uma API maior de grupos ou button checkboxes.",
        eventsLabel: "Eventos ao vivo",
        markupLabel: "Markup atual",
        resetLabel: "Redefinir",
        checkedLabel: "Marcado",
        indeterminateLabel: "Misto",
        disabledLabel: "Desabilitado",
        borderedLabel: "Com borda",
        helperCopy: "Use o estado misto para padroes de 'selecionar tudo' ou grupos parcialmente ativos.",
        eventIdle: "Aguardando interacao com o Checkbox.",
        checkedState: "marcado",
        uncheckedState: "desmarcado",
        mixedState: "misto",
        defaultLabel: "Enable scanlines",
        options: {
          sm: "Pequeno",
          md: "Medio",
          lg: "Grande",
        },
      },
      linkPlayground: {
        title: "Playground do Link",
        copy: "Teste tom, opacidade e comportamento do underline para validar links inline antes de copiar o markup final.",
        labelField: "Texto do link",
        toneField: "Tom",
        opacityField: "Opacidade",
        underlineField: "Underline",
        offsetField: "Offset do underline",
        statesLabel: "Estados rapidos",
        previewLabel: "Previa configuravel",
        previewCopy: "Este playground traduz o que aproveitamos da comparacao com as link utilities do Bootstrap: opacidade e underline controlados, mas em uma API menor e mais semantica.",
        markupLabel: "Markup atual",
        resetLabel: "Redefinir",
        disabledLabel: "Desabilitado",
        externalLabel: "Nova aba",
        contextPrefix: "Consulte ",
        contextSuffix: " para continuar o fluxo da documentação.",
        defaultText: "guia de instalacao",
        options: {
          default: "Padrao",
          secondary: "Secundario",
          tertiary: "Terciario",
          success: "Sucesso",
          warning: "Aviso",
          info: "Info",
          danger: "Perigo",
          dark: "Escuro",
          muted: "Suave",
          opacity100: "100%",
          opacity75: "75%",
          opacity50: "50%",
          hover: "So no hover",
          always: "Sempre visivel",
          soft: "Sempre suave",
          offsetDefault: "Padrao",
          offsetRelaxed: "Relaxado",
          offsetWide: "Amplo",
        },
      },
      typographyPlayground: {
        title: "Playground do Typography",
        copy: "Teste hierarquia, escala, line-height e largura de leitura para validar textos mais longos sem sair da pagina.",
        headingField: "Heading",
        headingLevelField: "Nivel do heading",
        bodyField: "Texto principal",
        toneField: "Tom do texto",
        sizeField: "Escala do texto",
        flowField: "Ritmo vertical",
        measureField: "Largura de leitura",
        extrasLabel: "Blocos opcionais",
        previewLabel: "Previa configuravel",
        previewCopy: "Este playground traduz a parte mais segura da comparacao com o Element Plus: hierarquia clara, escala consistente e leitura confortavel.",
        markupLabel: "Markup atual",
        resetLabel: "Redefinir",
        quoteLabel: "Blockquote",
        metaLabel: "Linha auxiliar",
        defaultHeading: "Readable retro hierarchy",
        defaultBody: "Build long-form UI copy with display headings, relaxed body text, and a readable measure that still fits dense interfaces.",
        helperNote: "Standalone helper text stays consistent outside the main prose block.",
        metaLine: "Mission log / typography scale",
        quoteText: "Keep the display font for hierarchy, not for full paragraphs.",
        options: {
          h1: "H1",
          h2: "H2",
          h3: "H3",
          default: "Padrao",
          muted: "Suave",
          subtle: "Sutil",
          primary: "Primario",
          secondary: "Secundario",
          success: "Sucesso",
          warning: "Aviso",
          danger: "Perigo",
          xs: "XS",
          sm: "SM",
          base: "Base",
          lg: "LG",
          regular: "Regular",
          compact: "Compacto",
          loose: "Solto",
          auto: "Livre",
          reading: "Leitura",
        },
        list: {
          first: "Display headings create hierarchy without forcing all text into all caps.",
          second: "Body scale stays tied to tokens instead of one-off values.",
          third: "Readable measure helps longer copy feel calmer and easier to scan.",
        },
      },
      splitterPlayground: {
        title: "Playground do Splitter",
        copy: "Teste eixo, limites, passo de teclado e estado travado para validar o shell redimensionavel antes de copiar o markup.",
        orientationField: "Orientacao",
        positionField: "Posicao",
        minField: "Minimo",
        maxField: "Maximo",
        stepField: "Passo do teclado",
        handleSizeField: "Tamanho do handle",
        statesLabel: "Estados rapidos",
        previewLabel: "Previa configuravel",
        previewCopy: "Use o handle com mouse ou teclado para validar o range permitido e observar os eventos do Splitter ao vivo.",
        eventsLabel: "Eventos ao vivo",
        markupLabel: "Markup atual",
        resetLabel: "Redefinir",
        disabledLabel: "Travado",
        eventIdle: "Aguardando interacao com o Splitter.",
        handleLabel: "Redimensionar panes",
        options: {
          horizontal: "Horizontal",
          vertical: "Vertical",
          sm: "Pequeno",
          md: "Medio",
          lg: "Grande",
        },
        regions: {
          primary: "Navigator pane",
          primaryCopy: "Lista, arvore ou menu lateral que precisa manter largura flexivel.",
          secondary: "Viewport pane",
          secondaryCopy: "Area principal para preview, tabela, editor ou inspector.",
        },
      },
      layoutContainerPlayground: {
        title: "Playground do Layout Container",
        copy: "Teste composicoes com header, aside, main e footer para validar rapidamente o shell certo antes de copiar o markup.",
        layoutField: "Layout",
        asideWidthField: "Largura do aside",
        chromeHeightField: "Altura do chrome",
        sectionsLabel: "Regioes visiveis",
        previewLabel: "Previa configuravel",
        previewCopy: "O preview abaixo usa apenas a API publica do container, entao voce pode testar estrutura e proporcao sem runtime.",
        markupLabel: "Markup atual",
        resetLabel: "Redefinir",
        headerLabel: "Header",
        asideLabel: "Aside",
        footerLabel: "Footer",
        options: {
          sidebarStart: "Aside no inicio",
          sidebarEnd: "Aside no fim",
          stack: "Stack vertical",
          narrow: "Estreito",
          medium: "Medio",
          wide: "Largo",
          auto: "Auto",
          compact: "Compacto",
          tall: "Alto",
        },
        regions: {
          header: "Mission control",
          aside: "Navigator",
          main: "Primary viewport",
          footer: "Status bar",
        },
      },
      configProviderPlayground: {
        title: "Playground do Config Provider",
        copy: "Teste skin local, densidade e accent sem tocar no restante da pagina, e copie o scope final quando o visual estiver certo.",
        themeField: "Skin local",
        densityField: "Densidade",
        accentField: "Accent principal",
        shellField: "Cromado local",
        nestedLabel: "Scope aninhado",
        previewLabel: "Previa configuravel",
        previewCopy: "Este playground traduz o que faz sentido trazer da comparacao com o Element Plus: configuracao local e previsivel, mas resolvida por tokens em cascata.",
        markupLabel: "Markup atual",
        resetLabel: "Redefinir",
        options: {
          default: "Padrao",
          night: "Night",
          terminal: "Terminal",
          danger: "Danger",
          regular: "Regular",
          compact: "Compacto",
          comfortable: "Comfortavel",
          primary: "Primario",
          secondary: "Secundario",
          success: "Sucesso",
          warning: "Aviso",
          defaultShell: "Shell padrao",
          soft: "Soft",
          strong: "Forte",
        },
        regions: {
          badge: "Escopo local",
          input: "Mission briefing",
          primaryAction: "Launch",
          secondaryAction: "Review",
          helper: "Buttons, inputs e badges herdam os tokens deste scope sem afetar a interface ao redor.",
          nestedBadge: "Scope aninhado",
          nestedAction: "Confirm",
        },
      },
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
      componentTokensTitle: "Component-specific variables",
      componentTokensCopy:
        "Some components expose their own variables to control visual behavior, sizing, state, or local adjustments without changing the whole foundation.",
      foundationTokenGroupTitles: {
        surfacesAndInk: "Surfaces and ink",
        semanticColors: "Semantic colors",
        statesAndOverlay: "States and overlay",
        spacing: "Spacing",
        bordersAndRadius: "Borders and radius",
        shadows: "Shadows",
        typography: "Typography",
        focusAndMotion: "Focus and motion",
      },
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
      buttonPlayground: {
        title: "Button playground",
        copy: "Try tone, size and common states without leaving the documentation before copying the final markup.",
        labelField: "Button text",
        variantField: "Variant",
        sizeField: "Size",
        statesLabel: "Quick states",
        previewLabel: "Configurable preview",
        previewCopy: "The live sample below uses the public Button API so you can validate readability, weight and width.",
        markupLabel: "Current markup",
        resetLabel: "Reset",
        activeLabel: "Pressed",
        loadingLabel: "Loading",
        disabledLabel: "Disabled",
        blockLabel: "Block",
        defaultText: "Launch mission",
        options: {
          default: "Default",
          primary: "Primary",
          secondary: "Secondary",
          tertiary: "Tertiary",
          success: "Success",
          info: "Info",
          danger: "Danger",
          dark: "Dark",
          light: "Light",
          ghost: "Ghost",
          sm: "Small",
          md: "Medium",
          lg: "Large",
        },
      },
      borderPlayground: {
        title: "Border playground",
        copy: "Try width, tone, visible edge and ghost mode so you can validate the right framing before copying the markup.",
        labelField: "Block title",
        toneField: "Tone",
        widthField: "Width",
        edgeField: "Visible edge",
        statesLabel: "Quick adjustments",
        previewLabel: "Configurable preview",
        previewCopy: "The sample below uses only the public Border API, with no runtime, so you can validate contrast and structure.",
        markupLabel: "Current markup",
        resetLabel: "Reset",
        ghostLabel: "Ghost",
        defaultTitle: "Monitored panel",
        helperCopy: "Retro border treatment for highlighting context, separating sections and creating visual rhythm.",
        options: {
          default: "Default",
          primary: "Primary",
          secondary: "Secondary",
          success: "Success",
          info: "Info",
          danger: "Danger",
          thin: "Thin",
          thick: "Thick",
          all: "All",
          top: "Top",
          end: "End",
          bottom: "Bottom",
          start: "Start",
        },
      },
      colorPlayground: {
        title: "Color playground",
        copy: "Try text tones on different surfaces so you can validate contrast and choose the right emphasis before copying the markup.",
        labelField: "Sample text",
        toneField: "Text tone",
        surfaceField: "Surface",
        previewLabel: "Configurable preview",
        previewCopy: "Use the surface as your contrast context and dial the semantic text tone until the reading feels right.",
        markupLabel: "Current markup",
        resetLabel: "Reset",
        defaultText: "System synced and ready to launch.",
        options: {
          default: "Default",
          muted: "Muted",
          subtle: "Subtle",
          primary: "Primary",
          secondary: "Secondary",
          tertiary: "Tertiary",
          success: "Success",
          warning: "Warning",
          info: "Info",
          danger: "Danger",
          dark: "Dark",
          light: "Light",
          surface: "Surface",
          surface2: "Surface 2",
          surface3: "Surface 3",
          darkSurface: "Dark",
          primarySurface: "Primary",
          warningSurface: "Warning",
        },
      },
      colorPickerPlayground: {
        title: "Color Picker playground",
        copy: "Try both component modes: a fixed swatch palette and a dynamic drag-based picker for any color.",
        labelField: "Trigger label",
        placeholderField: "Placeholder",
        modeField: "Mode",
        sizeField: "Size",
        statesLabel: "Quick states",
        previewLabel: "Configurable preview",
        previewCopy: "This playground covers the two most useful slices of the Element Plus comparison: fixed swatches for controlled choices and a dynamic panel for picking any color, dragging hue, and confirming through OK.",
        eventsLabel: "Live events",
        markupLabel: "Current markup",
        resetLabel: "Reset",
        presetLabel: "Fixed palette",
        clearableLabel: "Clearable",
        alphaLabel: "Show alpha",
        clearButtonText: "Clear",
        helperCopy: "Use the fixed mode for curated tokens, local accents, and more controlled theme choices.",
        dynamicHelperCopy: "Use the dynamic mode when people need to explore any hue, tweak transparency, and confirm the final color inside the panel.",
        eventIdle: "Waiting for Color Picker interaction.",
        clearEventText: "color cleared",
        defaultLabel: "Accent color",
        defaultPlaceholder: "Pick accent color",
        options: {
          fixed: "Fixed",
          dynamic: "Dynamic",
          sm: "Small",
          md: "Medium",
          lg: "Large",
        },
      },
      datePickerPlayground: {
        title: "Date Picker playground",
        copy: "Try locale, week-start changes, shortcuts, and week numbers so you can validate the calendar before copying the final markup.",
        placeholderField: "Placeholder",
        localeField: "Locale",
        weekStartField: "Week start",
        statesLabel: "Quick states",
        previewLabel: "Configurable preview",
        previewCopy: "This playground covers the safest slice of the Element Plus comparison: declarative shortcuts, week numbers, and locale context without pulling in larger types like range, month, or year pickers.",
        eventsLabel: "Live events",
        markupLabel: "Current markup",
        resetLabel: "Reset",
        shortcutsLabel: "Shortcuts",
        weekNumbersLabel: "Week numbers",
        constrainedLabel: "Min/max",
        helperCopy: "Use shortcuts for recurring dates and week numbers when the calendar is read more as weekly planning.",
        eventIdle: "Waiting for Date Picker interaction.",
        clearedLabel: "date cleared",
        defaultPlaceholder: "Select launch date",
        options: {
          ptBR: "Portuguese (BR)",
          enUS: "English (US)",
          sunday: "Sunday",
          monday: "Monday",
        },
      },
      inputPlayground: {
        title: "Input playground",
        copy: "Try the optional field shell with clear, character counting, password toggle, and autosize before copying the final markup.",
        typeField: "Field type",
        placeholderField: "Placeholder",
        maxLengthField: "Max length",
        sizeField: "Size",
        statesLabel: "Quick states",
        previewLabel: "Configurable preview",
        previewCopy: "This playground covers the safest slice of the Element Plus comparison: clear, character counting, password reveal, and autosize textareas without pulling in heavier formatter/parser APIs or structured prepend/append shells.",
        eventsLabel: "Live events",
        markupLabel: "Current markup",
        resetLabel: "Reset",
        clearableLabel: "Clearable",
        wordLimitLabel: "Word limit",
        passwordToggleLabel: "Password toggle",
        autosizeLabel: "Autosize",
        invalidLabel: "Invalid",
        helperCopy: "Use the optional shell when the field needs small helper actions and lightweight feedback without losing the base retro input surface.",
        eventIdle: "Waiting for Input interaction.",
        clearEventText: "field cleared",
        revealEventText: "password revealed",
        hideEventText: "password hidden",
        defaultPlaceholder: "Enter callsign",
        defaultValue: "PIX-07 Vanguard",
        options: {
          text: "Text",
          password: "Password",
          textarea: "Textarea",
          sm: "Small",
          md: "Medium",
          lg: "Large",
        },
      },
      inputNumberPlayground: {
        title: "Input Number playground",
        copy: "Try limits, precision, step-strict behavior, and right-side controls before copying the final markup.",
        valueField: "Initial value",
        minField: "Min",
        maxField: "Max",
        stepField: "Step",
        precisionField: "Precision",
        sizeField: "Size",
        statesLabel: "Quick states",
        previewLabel: "Configurable preview",
        previewCopy: "This playground captures the safest slice of the Element Plus comparison: declarative precision, step-strict alignment, right-side controls, and better synchronization between button clicks and manual typing.",
        eventsLabel: "Live events",
        markupLabel: "Current markup",
        resetLabel: "Reset",
        strictLabel: "Step strictly",
        rightControlsLabel: "Right controls",
        disabledLabel: "Disabled",
        helperCopy: "Use precision and step-strict alignment when the number participates in inventory, quotas, or other more sensitive numeric flows.",
        eventIdle: "Waiting for Input Number interaction.",
        options: {
          sm: "Small",
          md: "Medium",
          lg: "Large",
        },
      },
      inputTagPlayground: {
        title: "Input Tag playground",
        copy: "Try tag limits, delimiters, clear-all behavior, and sizing before copying the final markup.",
        placeholderField: "Placeholder",
        maxTagsField: "Max tags",
        delimitersField: "Delimiters",
        sizeField: "Size",
        statesLabel: "Quick states",
        previewLabel: "Configurable preview",
        previewCopy: "This playground covers the safest slice of the Element Plus comparison: tag limits, configurable delimiters, backspace removal for the last chip, and clear-all behavior inside the field itself.",
        eventsLabel: "Live events",
        markupLabel: "Current markup",
        resetLabel: "Reset",
        clearableLabel: "Clear all",
        disabledLabel: "Disabled",
        helperCopy: "Use delimiters when the flow accepts pasted lists, and max tags when the final set needs to stay short and predictable.",
        eventIdle: "Waiting for Input Tag interaction.",
        defaultPlaceholder: "Add tag and press Enter",
        initialTags: {
          first: "HUD",
          second: "PIXEL",
        },
        options: {
          sm: "Small",
          md: "Medium",
          lg: "Large",
        },
      },
      iconPlayground: {
        title: "Icon playground",
        copy: "Try the glyph sources already used across the docs, adjust frame size and tone, and copy the final markup without leaving the page.",
        labelField: "Label",
        glyphField: "Short glyph",
        sourceField: "Icon source",
        toneField: "Frame tone",
        sizeField: "Size",
        accessibilityLabel: "Accessibility",
        previewLabel: "Configurable preview",
        previewCopy: "Use the toggle to switch between a decorative icon and an asset that needs visible meaning.",
        markupLabel: "Current markup",
        resetLabel: "Reset",
        decorativeLabel: "Decorative",
        defaultLabel: "Pointer cursor",
        defaultGlyph: "HP",
        options: {
          pointer: "Pointer cursor",
          grab: "Grab cursor",
          wait: "Wait cursor",
          disabled: "Disabled cursor",
          inlineSvg: "Inline SVG",
          textGlyph: "Text glyph",
          default: "Default",
          primary: "Primary",
          dark: "Dark",
          success: "Success",
          warning: "Warning",
          sm: "Small",
          md: "Medium",
          lg: "Large",
        },
        sourceDescriptions: {
          pointer: "Example using the pixel pointer cursor already used by the docs.",
          grab: "Example using a grab asset, useful for drag states and resizable panes.",
          wait: "Example using the wait cursor for loading or temporarily blocked states.",
          disabled: "Example using the unavailable asset so blocked states do not depend on color alone.",
          inlineSvg: "Example using inline SVG, useful when the external package ships vector markup or a local sprite.",
          textGlyph: "Example using a short text glyph, handy for quick fallbacks, abbreviations or temporary states.",
        },
      },
      autocompletePlayground: {
        title: "Autocomplete playground",
        copy: "Try open-on-focus, clear, loading, and richer option templates so you can validate the field before copying the final markup.",
        behaviorField: "Menu opening",
        statesLabel: "Quick states",
        previewLabel: "Configurable preview",
        previewCopy: "This playground captures the safest slice of the Element Plus comparison: optional clear, controllable opening, empty/loading feedback, and richer options without a framework dependency.",
        eventsLabel: "Live events",
        markupLabel: "Current markup",
        resetLabel: "Reset",
        clearableLabel: "Show clear",
        clearButtonLabel: "Clear search",
        loadingLabel: "Remote loading",
        richLabel: "Rich options",
        eventIdle: "Waiting for Autocomplete interaction.",
        clearEventText: "field reset",
        placeholder: "Search pilot...",
        emptyLabel: "No pilots matched this query.",
        loadingText: "Syncing remote routes...",
        options: {
          focus: "Open on focus",
          typing: "Open while typing",
        },
        suggestions: {
          first: "PIX-07 Vanguard",
          firstMeta: "Recon pilot / scout division",
          second: "PIX-11 Sentinel",
          secondMeta: "Support wing / command relay",
          third: "PIX-12 Striker",
          thirdMeta: "Frontline assault / breach lead",
          fourth: "PIX-21 Oracle",
          fourthMeta: "Intel analyst / route prediction",
        },
      },
      cascaderPlayground: {
        title: "Cascader playground",
        copy: "Try click or hover expansion, filtering, clear, and path display so you can validate the hierarchical flow before copying the final markup.",
        triggerField: "Expansion",
        separatorField: "Separator",
        filterPlaceholderField: "Filter placeholder",
        statesLabel: "Quick states",
        previewLabel: "Configurable preview",
        previewCopy: "This playground covers the safest slice of the Element Plus comparison: clear hierarchical choice, local filtering, and control over full-path versus last-level trigger display.",
        eventsLabel: "Live events",
        markupLabel: "Current markup",
        resetLabel: "Reset",
        filterableLabel: "Filterable",
        clearableLabel: "Clearable",
        strictLabel: "Select any level",
        compactLabel: "Show last level only",
        eventIdle: "Waiting for Cascader interaction.",
        clearEventText: "selection cleared",
        placeholder: "Select outpost",
        filterPlaceholder: "Filter routes...",
        emptyLabel: "No matching routes",
        clearButtonText: "Clear",
        options: {
          click: "Click",
          hover: "Hover",
        },
      },
      checkboxPlayground: {
        title: "Checkbox playground",
        copy: "Try checked, mixed, disabled, sizing, and bordered-shell states so you can validate the control before copying the final markup.",
        labelField: "Label text",
        sizeField: "Size",
        statesLabel: "Quick states",
        previewLabel: "Configurable preview",
        previewCopy: "This playground captures the safest slice of the Element Plus comparison: mixed state, sizing, and a bordered shell, without pulling in a larger group or checkbox-button API.",
        eventsLabel: "Live events",
        markupLabel: "Current markup",
        resetLabel: "Reset",
        checkedLabel: "Checked",
        indeterminateLabel: "Mixed",
        disabledLabel: "Disabled",
        borderedLabel: "Bordered",
        helperCopy: "Use the mixed state for 'select all' patterns or partially active groups.",
        eventIdle: "Waiting for Checkbox interaction.",
        checkedState: "checked",
        uncheckedState: "unchecked",
        mixedState: "mixed",
        defaultLabel: "Enable scanlines",
        options: {
          sm: "Small",
          md: "Medium",
          lg: "Large",
        },
      },
      linkPlayground: {
        title: "Link playground",
        copy: "Try tone, opacity, and underline behavior so you can validate inline links before copying the final markup.",
        labelField: "Link text",
        toneField: "Tone",
        opacityField: "Opacity",
        underlineField: "Underline",
        offsetField: "Underline offset",
        statesLabel: "Quick states",
        previewLabel: "Configurable preview",
        previewCopy: "This playground captures the safe part of the Bootstrap link-utility comparison: controllable opacity and underlines, but through a smaller and more semantic API.",
        markupLabel: "Current markup",
        resetLabel: "Reset",
        disabledLabel: "Disabled",
        externalLabel: "New tab",
        contextPrefix: "Check ",
        contextSuffix: " to keep moving through the documentation flow.",
        defaultText: "the installation guide",
        options: {
          default: "Default",
          secondary: "Secondary",
          tertiary: "Tertiary",
          success: "Success",
          warning: "Warning",
          info: "Info",
          danger: "Danger",
          dark: "Dark",
          muted: "Muted",
          opacity100: "100%",
          opacity75: "75%",
          opacity50: "50%",
          hover: "Hover only",
          always: "Always visible",
          soft: "Always subtle",
          offsetDefault: "Default",
          offsetRelaxed: "Relaxed",
          offsetWide: "Wide",
        },
      },
      typographyPlayground: {
        title: "Typography playground",
        copy: "Try hierarchy, scale, line-height, and reading width so you can validate longer copy without leaving the page.",
        headingField: "Heading",
        headingLevelField: "Heading level",
        bodyField: "Primary copy",
        toneField: "Text tone",
        sizeField: "Text scale",
        flowField: "Vertical rhythm",
        measureField: "Reading width",
        extrasLabel: "Optional blocks",
        previewLabel: "Configurable preview",
        previewCopy: "This playground captures the safest part of the Element Plus comparison: clear hierarchy, consistent scale, and comfortable reading.",
        markupLabel: "Current markup",
        resetLabel: "Reset",
        quoteLabel: "Blockquote",
        metaLabel: "Support line",
        defaultHeading: "Readable retro hierarchy",
        defaultBody: "Build long-form UI copy with display headings, relaxed body text, and a readable measure that still fits dense interfaces.",
        helperNote: "Standalone helper text stays consistent outside the main prose block.",
        metaLine: "Mission log / typography scale",
        quoteText: "Keep the display font for hierarchy, not for full paragraphs.",
        options: {
          h1: "H1",
          h2: "H2",
          h3: "H3",
          default: "Default",
          muted: "Muted",
          subtle: "Subtle",
          primary: "Primary",
          secondary: "Secondary",
          success: "Success",
          warning: "Warning",
          danger: "Danger",
          xs: "XS",
          sm: "SM",
          base: "Base",
          lg: "LG",
          regular: "Regular",
          compact: "Compact",
          loose: "Loose",
          auto: "Auto",
          reading: "Reading",
        },
        list: {
          first: "Display headings create hierarchy without forcing all text into all caps.",
          second: "Body scale stays tied to tokens instead of one-off values.",
          third: "Readable measure helps longer copy feel calmer and easier to scan.",
        },
      },
      splitterPlayground: {
        title: "Splitter playground",
        copy: "Try axis, limits, keyboard step, and locked state so you can validate the resizable shell before copying the markup.",
        orientationField: "Orientation",
        positionField: "Position",
        minField: "Minimum",
        maxField: "Maximum",
        stepField: "Keyboard step",
        handleSizeField: "Handle size",
        statesLabel: "Quick states",
        previewLabel: "Configurable preview",
        previewCopy: "Use the handle with mouse or keyboard to validate the allowed range and watch live Splitter events.",
        eventsLabel: "Live events",
        markupLabel: "Current markup",
        resetLabel: "Reset",
        disabledLabel: "Locked",
        eventIdle: "Waiting for Splitter interaction.",
        handleLabel: "Resize panes",
        options: {
          horizontal: "Horizontal",
          vertical: "Vertical",
          sm: "Small",
          md: "Medium",
          lg: "Large",
        },
        regions: {
          primary: "Navigator pane",
          primaryCopy: "A list, tree, or side menu that should keep a flexible width.",
          secondary: "Viewport pane",
          secondaryCopy: "The main area for preview, table, editor, or inspector content.",
        },
      },
      layoutContainerPlayground: {
        title: "Layout Container playground",
        copy: "Try compositions with header, aside, main and footer so you can validate the right shell before copying the markup.",
        layoutField: "Layout",
        asideWidthField: "Aside width",
        chromeHeightField: "Chrome height",
        sectionsLabel: "Visible regions",
        previewLabel: "Configurable preview",
        previewCopy: "The sample below uses only the public container API, so you can test structure and proportion with no runtime involved.",
        markupLabel: "Current markup",
        resetLabel: "Reset",
        headerLabel: "Header",
        asideLabel: "Aside",
        footerLabel: "Footer",
        options: {
          sidebarStart: "Aside at start",
          sidebarEnd: "Aside at end",
          stack: "Vertical stack",
          narrow: "Narrow",
          medium: "Medium",
          wide: "Wide",
          auto: "Auto",
          compact: "Compact",
          tall: "Tall",
        },
        regions: {
          header: "Mission control",
          aside: "Navigator",
          main: "Primary viewport",
          footer: "Status bar",
        },
      },
      configProviderPlayground: {
        title: "Config Provider playground",
        copy: "Try local skin, density, and accent without touching the rest of the page, then copy the final scope when it feels right.",
        themeField: "Local skin",
        densityField: "Density",
        accentField: "Primary accent",
        shellField: "Local chrome",
        nestedLabel: "Nested scope",
        previewLabel: "Configurable preview",
        previewCopy: "This playground captures the part of the Element Plus comparison that makes sense here: predictable local configuration, but solved through cascading tokens.",
        markupLabel: "Current markup",
        resetLabel: "Reset",
        options: {
          default: "Default",
          night: "Night",
          terminal: "Terminal",
          danger: "Danger",
          regular: "Regular",
          compact: "Compact",
          comfortable: "Comfortable",
          primary: "Primary",
          secondary: "Secondary",
          success: "Success",
          warning: "Warning",
          defaultShell: "Default shell",
          soft: "Soft",
          strong: "Strong",
        },
        regions: {
          badge: "Local scope",
          input: "Mission briefing",
          primaryAction: "Launch",
          secondaryAction: "Review",
          helper: "Buttons, inputs, and badges inherit tokens from this scope without affecting surrounding UI.",
          nestedBadge: "Nested scope",
          nestedAction: "Confirm",
        },
      },
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

function buildFoundationTokenGroups(locale: DocsLocale, dictionary: (typeof localized)[DocsLocale]) {
  const groupedTokens = new Map<FoundationTokenGroupKey, DocsTokenItem[]>(
    foundationTokenGroupOrder.map((groupKey) => [groupKey, []]),
  );

  foundationTokenEntries.forEach((entry) => {
    const groupKey = getFoundationTokenGroupKey(entry.token);
    const bucket = groupedTokens.get(groupKey);

    if (!bucket) {
      return;
    }

    bucket.push({
      label: formatTokenLabel(entry.token, locale),
      token: entry.token,
      value: entry.value,
    });
  });

  return foundationTokenGroupOrder
    .map((groupKey) => ({
      id: groupKey,
      title: dictionary.home.foundationTokenGroupTitles[groupKey],
      type: foundationColorGroups.has(groupKey) ? "color" : "token",
      items: groupedTokens.get(groupKey) ?? [],
    }))
    .filter((group) => group.items.length);
}

function buildComponentTokenGroups(locale: DocsLocale) {
  return componentCatalog
    .map((component) => {
      const cssVariables = getComponentContract(component).cssVariables;

      if (!cssVariables.length) {
        return null;
      }

      return {
        id: component.id,
        title: component.name,
        type: "token" as const,
        meta: component.summary[locale],
        items: cssVariables.map((entry) => ({
          label: formatTokenLabel(entry.name, locale),
          token: entry.name,
          value: entry.defaultValue,
          description: entry.description[locale],
        })),
      } satisfies DocsTokenGroup;
    })
    .filter(Boolean);
}

export function getSiteContent(locale = "en") {
  const safeLocale = isDocsLocale(locale) ? locale : "en";
  const dictionary = localized[safeLocale];
  const componentSections = buildComponentSections(safeLocale);
  const components = componentSections.flatMap((section) => section.components);
  const tokens = buildFoundationTokenGroups(safeLocale, dictionary);
  const componentTokens = buildComponentTokenGroups(safeLocale);

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
      componentTokens,
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
