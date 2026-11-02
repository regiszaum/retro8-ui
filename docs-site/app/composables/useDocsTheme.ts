type DocsTheme = "light" | "dark";

const THEME_KEY = "retro8-ui-docs-theme";

function getPreferredTheme(): DocsTheme {
  if (!import.meta.client) {
    return "dark";
  }

  let stored: string | null = null;
  try { stored = localStorage.getItem(THEME_KEY); } catch { /* Storage can be unavailable. */ }
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
  try { localStorage.setItem(THEME_KEY, theme); } catch { /* The theme still works without persistence. */ }
}

export function useDocsTheme() {
  const theme = useState<DocsTheme>("docs-theme", () => "dark");
  const initialized = useState("docs-theme-initialized", () => false);

  const setTheme = (value: DocsTheme) => {
    theme.value = value;
    applyTheme(value);
  };

  onMounted(() => {
    if (!initialized.value) {
      initialized.value = true;
      theme.value = getPreferredTheme();
    }
    applyTheme(theme.value);
  });

  return {
    theme,
    setTheme,
  };
}
