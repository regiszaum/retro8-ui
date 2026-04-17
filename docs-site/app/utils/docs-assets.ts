function normalizeBaseURL(baseURL: string) {
  const value = String(baseURL || "/").trim();

  if (!value || value === "/") {
    return "/";
  }

  return `/${value.replace(/^\/+|\/+$/g, "")}/`;
}

function withBase(path: string, baseURL: string) {
  if (!path.startsWith("/") || path.startsWith("//") || baseURL === "/") {
    return path;
  }

  const baseNoTrailingSlash = baseURL.slice(0, -1);

  if (path === baseNoTrailingSlash || path.startsWith(`${baseNoTrailingSlash}/`)) {
    return path;
  }

  return `${baseNoTrailingSlash}${path}`;
}

export function withDocsBasePath(path: string, baseURL: string) {
  return withBase(path, normalizeBaseURL(baseURL));
}

export function rewriteDocsAssetPaths(markup: string, baseURL: string) {
  if (!markup) {
    return markup;
  }

  const normalizedBase = normalizeBaseURL(baseURL);

  const withRebasedAttributes = markup.replace(
    /(\b(?:src|href|poster)=["'])(\/(?!\/)[^"']*)(["'])/gi,
    (_full, prefix: string, path: string, suffix: string) => `${prefix}${withBase(path, normalizedBase)}${suffix}`,
  );

  return withRebasedAttributes.replace(
    /(url\(\s*['"]?)(\/(?!\/)[^'")\s]+)(['"]?\s*\))/gi,
    (_full, prefix: string, path: string, suffix: string) => `${prefix}${withBase(path, normalizedBase)}${suffix}`,
  );
}
