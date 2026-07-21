import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Aventuria landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="es-MX">/i);
  assert.match(html, /<title>Aventuria App \| Planea, ahorra y viaja<\/title>/i);
  assert.match(html, /El viaje que imaginas puede empezar hoy/i);
  assert.match(html, /id="como-funciona"/i);
  assert.match(html, /id="ahorro"/i);
  assert.match(html, /id="lista"/i);
  assert.match(html, /logo-aventuria-white\.png/i);
});

test("keeps private waitlist configuration on the server", async () => {
  const [page, route, envExample, gitignore] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/api/waitlist/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../.env.example", import.meta.url), "utf8"),
    readFile(new URL("../.gitignore", import.meta.url), "utf8"),
  ]);

  assert.match(page, /fetch\("\/api\/waitlist"/);
  assert.doesNotMatch(page, /GOOGLE_APPS_SCRIPT_URL|WAITLIST_SECRET/);
  assert.match(route, /process\.env\.GOOGLE_APPS_SCRIPT_URL/);
  assert.match(route, /process\.env\.WAITLIST_SECRET/);
  assert.match(envExample, /^GOOGLE_APPS_SCRIPT_URL=$/m);
  assert.match(envExample, /^WAITLIST_SECRET=$/m);
  assert.match(gitignore, /^\.env\*$/m);
});
