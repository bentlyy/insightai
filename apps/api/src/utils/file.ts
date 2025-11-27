// src/utils/file.ts
import fs from "fs";
import path from "path";

export const UPLOAD_DIR = path.resolve("uploads");

export function ensureUploadDir() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

export function buildStoragePath(filename: string): string {
  return path.join(UPLOAD_DIR, filename);
}
