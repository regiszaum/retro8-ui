import { componentOrder } from "./shared/component-catalog";

const docsLocales = ["en", "pt-br"];
const guidePages = ["getting-started", "tokens", "icons", "components"];

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: process.env.NODE_ENV === "development" },
  debug: {
    hooks: false,
  },
  experimental: {
    browserDevtoolsTiming: false,
  },
  modules: ["@nuxt/content"],
  css: ["@fontsource/press-start-2p/index.css", "../dist/retro8.css", "~/assets/css/docs.css"],
  content: {
    experimental: {
      sqliteConnector: "native",
    },
  },
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || "/",
    head: {
      titleTemplate: "%s · Retro8 UI",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#0f172a" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon/favicon-16x16.png" },
      ],
    },
  },
  routeRules: {
    "/": { redirect: "/en" },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        "/",
        ...docsLocales.flatMap((locale) => [
          `/${locale}`,
          ...guidePages.map((page) => `/${locale}/${page}`),
          ...componentOrder.map((component) => `/${locale}/components/${component}`),
        ]),
      ],
    },
  },
  vite: {
    server: {
      fs: {
        allow: [".."],
      },
    },
  },
});
