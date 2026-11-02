export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:mounted", async () => {
    const runtimeWindow = window as Window & {
      Retro8UIAutoInit?: boolean;
      Retro8UI?: { init: (root?: Document | HTMLElement) => void };
    };

    // Importing the runtime must also wait: component mounted hooks can call it.
    runtimeWindow.Retro8UIAutoInit = false;
    await import("../../../src/scripts/retro8.js");
    runtimeWindow.Retro8UI?.init(document);
  });
});
