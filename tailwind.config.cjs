/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{css,html,js,cjs,mjs}",
    "./examples/**/*.html",
    "./docs-site/app/**/*.{vue,ts,js,html}",
    "./docs-site/content/**/*.md",
    "./docs-site/README.md",
    "./docs/**/*.md",
    "./README.md",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        "r8-bg": "var(--r8-color-bg)",
        "r8-surface": "var(--r8-color-surface)",
        "r8-surface-2": "var(--r8-color-surface-muted)",
        "r8-surface-3": "var(--r8-color-surface-raised)",
        "r8-ink": "var(--r8-color-ink)",
        "r8-ink-muted": "var(--r8-color-ink-muted)",
        "r8-border": "var(--r8-color-border)",
        "r8-accent": "var(--r8-color-accent)",
        "r8-accent-strong": "var(--r8-color-accent-strong)",
        "r8-success": "var(--r8-color-success)",
        "r8-warning": "var(--r8-color-warning)",
        "r8-danger": "var(--r8-color-danger)",
        "r8-info": "var(--r8-color-info)",
        "r8-focus": "var(--r8-color-focus)",
        "r8-disabled": "var(--r8-color-disabled)",
        "r8-disabled-bg": "var(--r8-color-disabled-bg)",
      },
      spacing: {
        "r8-1": "var(--r8-space-1)",
        "r8-2": "var(--r8-space-2)",
        "r8-3": "var(--r8-space-3)",
        "r8-4": "var(--r8-space-4)",
        "r8-5": "var(--r8-space-5)",
        "r8-6": "var(--r8-space-6)",
        "r8-8": "var(--r8-space-8)",
        "r8-10": "var(--r8-space-10)",
        "r8-12": "var(--r8-space-12)",
      },
      borderWidth: {
        "r8": "var(--r8-border-thick)",
        "r8-sm": "var(--r8-border-thin)",
      },
      borderRadius: {
        r8: "var(--r8-radius-sm)",
      },
      boxShadow: {
        "r8-sm": "var(--r8-shadow-sm)",
        r8: "var(--r8-shadow-md)",
        "r8-lg": "var(--r8-shadow-lg)",
        "r8-pressed": "var(--r8-shadow-pressed)",
        "r8-inset": "var(--r8-shadow-inset)",
      },
      fontFamily: {
        display: ["var(--r8-font-display)"],
        body: ["var(--r8-font-body)"],
      },
      fontSize: {
        "r8-xs": [
          "var(--r8-font-size-xs)",
          {
            lineHeight: "1.3",
          },
        ],
        "r8-sm": [
          "var(--r8-font-size-sm)",
          {
            lineHeight: "1.35",
          },
        ],
        "r8-base": [
          "var(--r8-font-size-base)",
          {
            lineHeight: "1.45",
          },
        ],
        "r8-lg": [
          "var(--r8-font-size-lg)",
          {
            lineHeight: "1.2",
          },
        ],
      },
      letterSpacing: {
        r8: "0.08em",
        "r8-tight": "0.03em",
      },
      transitionTimingFunction: {
        r8: "steps(2, end)",
      },
    },
  },
};
