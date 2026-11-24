const CACHE = "english-buddy-v1";
const FILES = ["./", "index.html", "style.css", "fonts.css", "app.js", "data.js", "web.js", "logo.png",
  "manifest.webmanifest", "fonts/Vazirmatn-Regular.woff2", "fonts/Vazirmatn-Bold.woff2",
  "icons/icon-192.png", "icons/icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
