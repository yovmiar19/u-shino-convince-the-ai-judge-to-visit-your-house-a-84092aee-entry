// Convince the AI Judge to Visit Your House — make.fun entry (Opus #1 concept rebuild).
// Copies the invitation-letter image (letter.png) to /output/entry.png.
import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const source = join(dir, "letter.png");
const target = "/output/entry.png";

if (!existsSync(source)) {
  throw new Error("letter.png is missing next to main.ts");
}
const header = readFileSync(source, { encoding: null }).subarray(0, 2);
if (header[0] !== 0xff || header[1] !== 0xd8) {
  throw new Error("letter.png is not a JPEG image (bad magic bytes)");
}
mkdirSync("/output", { recursive: true });
copyFileSync(source, target);

const sha256 = (path: string): string =>
  createHash("sha256").update(readFileSync(path)).digest("hex");
if (sha256(source) !== sha256(target)) {
  throw new Error("entry.png does not match letter.png after copy");
}

const bytes = statSync(target).size;
if (bytes > 1024 * 1024) {
  throw new Error(`entry.png is ${bytes} bytes, over the 1 MiB limit`);
}
console.log(`Wrote ${target} (${bytes} bytes, sha256 verified)`);
