/* Guarda o app no aparelho para abrir sem internet. Os dados ficam no cache do Firestore. */
const V = 'fe-v1';
const SHELL = ['./', './index.html', './fb.js', './firebase-config.js', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
const LIBS = /^https:\/\/(www\.gstatic\.com\/firebasejs|cdn\.jsdelivr\.net\/npm|fonts\.(googleapis|gstatic)\.com)\//;
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin === location.origin) {
    // app: tenta a versão nova; sem internet, usa a guardada
    e.respondWith(fetch(r).then(res => { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)); return res; }).catch(() => caches.match(r).then(m => m || caches.match('./index.html'))));
  } else if (LIBS.test(r.url)) {
    // bibliotecas: usa a guardada e atualiza em segundo plano
    e.respondWith(caches.match(r).then(m => { const f = fetch(r).then(res => { if (res.ok || res.type === 'opaque') { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)); } return res; }).catch(() => m); return m || f; }));
  }
});
