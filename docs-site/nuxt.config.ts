import { componentOrder } from "./shared/component-catalog";

const docsLocales = ["pt-br", "en"];
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
    head: {
      titleTemplate: "%s · retro8-ui docs",
      meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
    },
  },
  routeRules: {
    "/": { redirect: "/pt-br" },
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
