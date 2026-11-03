export function extractThemeTokens(source: string) {
  const declarations = (block: string) =>
    [...block.matchAll(/^\s*(--r8-[a-z0-9-]+)\s*:\s*([^;]+);/gm)].map(
      (match) => ({
        token: match[1],
        value: match[2].trim(),
      }),
    );

  const lightBlock = source.match(/:root\s*\{([\s\S]*?)\n\s*\}/)?.[1] ?? "";
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
