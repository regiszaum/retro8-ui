import { defineConfig } from "vite";
import { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("./", import.meta.url));
const repoDir = fileURLToPath(new URL("../", import.meta.url));
const htmlInputs = Object.fromEntries(
  collectHtmlFiles(rootDir).map((filePath) => [
    path.relative(rootDir, filePath).replace(/\.html$/, ""),
    filePath,
  ]),
);

export default defineConfig({
  root: rootDir,
  publicDir: fileURLToPath(new URL("./public", import.meta.url)),
  build: {
    outDir: fileURLToPath(new URL("../.playground-dist", import.meta.url)),
    emptyOutDir: true,
    rollupOptions: {
      input: htmlInputs,
    },
  },
  server: {
    fs: {
      allow: [repoDir],
    },
  },
});

function collectHtmlFiles(directory) {
  const entries = readdirSync(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === "public" || entry.name === ".playground-dist") {
      continue;
    }

    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectHtmlFiles(fullPath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(fullPath);
    }
  }

  return files;
}
