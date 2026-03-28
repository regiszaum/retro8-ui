import { localeMeta } from "~/utils/docs-data";
import { isDocsLocale } from "~/utils/docs-routing";

export function useDocsLocale() {
  const route = useRoute();

  const locale = computed(() => {
    const localeParam = Array.isArray(route.params.locale) ? route.params.locale[0] : route.params.locale;

    if (typeof localeParam === "string" && isDocsLocale(localeParam)) {
      return localeParam;
    }

    const [firstSegment] = route.path.split("/").filter(Boolean);
    return firstSegment && isDocsLocale(firstSegment) ? firstSegment : "pt-br";
  });

  useHead(() => ({
    htmlAttrs: {
      lang: localeMeta[locale.value]?.htmlLang ?? "pt-BR",
    },
  }));

  return {
    locale,
  };
}
