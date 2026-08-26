/// <reference types="bun" />

import { watch } from "fs";
import { join } from "path";

const PORT = 3000;
const SRC_DIR = "./src";

const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    let filePath = join(SRC_DIR, url.pathname);

    if (url.pathname === "/") {
      filePath = join(SRC_DIR, "index.html");
    }

    const file = Bun.file(filePath);

    if (await file.exists()) {
      return new Response(file);
    }

    return new Response("404 No encontrado", { status: 404 });
  },
});

console.log(`Servidor corriendo en http://localhost:${server.port}`);

watch(SRC_DIR, { recursive: true }, (eventType, filename) => {
  if (filename) {
    console.log(`[${eventType.toUpperCase()}] ${filename}`);
  }
});