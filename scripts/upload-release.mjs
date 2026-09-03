import { put } from "@vercel/blob";
import { readFile } from "node:fs/promises";

const DEFAULT_PATHNAME = "stable/Arremate.rar";

const filePath = process.argv[2];
const blobPathname = process.argv[3] ?? DEFAULT_PATHNAME;

if (!filePath) {
  console.error(
    "Usage: node scripts/upload-release.mjs <path-to-file> [blob-pathname]",
  );
  console.error(
    `  blob-pathname defaults to "${DEFAULT_PATHNAME}"`,
  );
  process.exit(1);
}

const file = await readFile(filePath);

const blob = await put(blobPathname, file, {
  access: "public",
  addRandomSuffix: false,
  allowOverwrite: true,
});

console.log("Uploaded:");
console.log(blob.url);
