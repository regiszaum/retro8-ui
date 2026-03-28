import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { minify } from "terser";

const rootDir = path.resolve(import.meta.dirname, "..");
const sourcePath = path.join(rootDir, "src", "scripts", "retro8.js");
const distDir = path.join(rootDir, "dist");
const outputPath = path.join(distDir, "retro8.js");
const minifiedPath = path.join(distDir, "retro8.min.js");
const watchMode = process.argv.includes("--watch");

let pendingBuild = null;

async function buildRuntime() {
  const source = await fs.promises.readFile(sourcePath, "utf8");
  await fs.promises.mkdir(distDir, { recursive: true });
  await fs.promises.writeFile(outputPath, source, "utf8");

  const result = await minify(source, {
    compress: true,
    mangle: true,
    format: {
      comments: false,
    },
  });

  await fs.promises.writeFile(minifiedPath, result.code ?? "", "utf8");
  process.stdout.write(`[retro8-ui] JS built: ${path.relative(rootDir, outputPath)} and ${path.relative(rootDir, minifiedPath)}\n`);
}

function queueBuild() {
  if (pendingBuild) {
    return pendingBuild;
  }

  pendingBuild = buildRuntime().finally(() => {
    pendingBuild = null;
  });

  return pendingBuild;
}

if (!watchMode) {
  await queueBuild();
} else {
  await queueBuild();
  process.stdout.write("[retro8-ui] Watching runtime source for changes...\n");

  fs.watch(sourcePath, { persistent: true }, async (eventType) => {
    if (eventType !== "change" && eventType !== "rename") {
      return;
    }

    try {
      await queueBuild();
    } catch (error) {
      process.stderr.write(`[retro8-ui] JS build failed: ${error instanceof Error ? error.message : String(error)}\n`);
    }
  });
}
