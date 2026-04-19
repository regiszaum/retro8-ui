import { localeMeta } from "~/utils/docs-data";

export const guideOrder = ["getting-started", "tokens", "icons", "components", "llms.txt"] as const;

export function isDocsLocale(value: string) {
  return value in localeMeta;
}

export function normalizeSlug(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  return value ? [value] : [];
}

export function buildDocsPath(locale: string, segments: string[] = []) {
  const safeLocale = isDocsLocale(locale) ? locale : "en";
  return `/${safeLocale}${segments.length ? `/${segments.join("/")}` : ""}`;
}

export function swapLocaleInPath(path: string, targetLocale: string) {
  const safeLocale = isDocsLocale(targetLocale) ? targetLocale : "en";
  const parts = path.split("/").filter(Boolean);

  if (!parts.length) {
    return buildDocsPath(safeLocale);
  }

  if (isDocsLocale(parts[0] ?? "")) {
    parts[0] = safeLocale;
    return `/${parts.join("/")}`;
  }

  return buildDocsPath(safeLocale, parts);
}
