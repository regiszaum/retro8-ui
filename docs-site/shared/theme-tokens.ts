export function extractThemeTokens(source: string) {
  const declarations = (block: string) =>
    [...block.matchAll(/^\s*(--r8-[a-z0-9-]+)\s*:\s*([^;]+);/gm)].map(
      (match) => ({
        token: match[1],
        value: match[2].trim(),
      }),
    );

  // Palette and layout defaults have separate root blocks so local themes
  // change colors without resetting inherited spacing or typography.
  const defaults = source.split(/\n\s*@media\b/)[0];
  const lightBlock = [...defaults.matchAll(/:root\s*\{([\s\S]*?)\n\s*\}/g)]
    .map((match) => match[1]).join("\n");
  const darkBlock =
    source.match(
      /:where\(\[data-theme="dark"\][^\n]*\)\s*\{([\s\S]*?)\n\s*\}/,
    )?.[1] ?? "";
  const darkValues = new Map(
    declarations(darkBlock).map(({ token, value }) => [token, value]),
  );

  // Read only theme declarations, not the later reduced-motion :root overrides.
  return declarations(lightBlock).map((entry) => ({
    ...entry,
    darkValue: darkValues.get(entry.token) ?? entry.value,
  }));
}
