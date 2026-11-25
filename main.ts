// The GPS Swears It Was a Shortcut — make.fun entry (v2).
// Writes the GPS's own one-line excuse to $MAKEFUN_OUTPUT_DIR/entry.txt
// (defaults to /output/entry.txt). The gate: UTF-8 text of 1-200
// characters, not only white space, exactly one line, no trailing newline.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "According to my map, that lake is a road with commitment issues, so I drove us straight in — the shortcut worked, the car just needs to learn to swim.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

function main(): void {
  const line = LINE;
  if (line.length < MIN_CHARS || line.length > MAX_CHARS) {
    throw new Error(
      `entry line is ${line.length} characters, must be ${MIN_CHARS}-${MAX_CHARS}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry line must be a single line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  // No trailing newline: the file is exactly the line.
  writeFileSync(outPath, line, "utf8");
  const onDisk = readFileSync(outPath, "utf8");
  if (onDisk !== line) {
    throw new Error("read-back mismatch: entry.txt does not match the line");
  }
  console.log(`Wrote ${line.length}-character excuse to ${outPath}`);
}

main();
