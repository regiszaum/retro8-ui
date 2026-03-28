type DocsTheme = "light" | "dark";

const THEME_KEY = "retro8-ui-docs-theme";

function getPreferredTheme(): DocsTheme {
  if (!import.meta.client) {
    return "dark";
  }

  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: DocsTheme) {
  if (!import.meta.client) {
    return;
  }

  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
}

export function useDocsTheme() {
  const theme = useState<DocsTheme>("docs-theme", () => "dark");
  const initialized = useState("docs-theme-initialized", () => false);

  const setTheme = (value: DocsTheme) => {
    theme.value = value;
    applyTheme(value);
  };

  if (import.meta.client && !initialized.value) {
    initialized.value = true;
    theme.value = getPreferredTheme();
    applyTheme(theme.value);
  }

  onMounted(() => {
    applyTheme(theme.value);
  });

  return {
    theme,
    setTheme,
  };
}
