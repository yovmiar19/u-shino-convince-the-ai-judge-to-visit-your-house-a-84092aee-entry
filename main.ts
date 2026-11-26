// Convince the AI Judge to Visit Your House — make.fun entry.
// Copies the invitation-letter image (letter.png) to /output/entry.png.
import { copyFileSync, mkdirSync, existsSync, statSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "letter.png");
const outDir = "/output";
const target = join(outDir, "entry.png");

if (!existsSync(source)) {
  throw new Error("letter.png not found next to main.ts");
}
mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// Verify the copy is byte-identical to the source image.
const digest = (p: string) =>
  createHash("sha256").update(readFileSync(p)).digest("hex");
if (digest(source) !== digest(target)) {
  throw new Error("entry.png differs from letter.png after copy");
}
console.log(`Wrote ${target} (${statSync(target).size} bytes, sha256 verified)`);
