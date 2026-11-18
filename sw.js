/* Claude en clair : fonctionne hors ligne une fois ouvert. Ne touche qu'à ses propres caches. */
const PREFIXE = 'claudeenclair-';
const CACHE = PREFIXE + 'v1';
const FICHIERS = [
  './',
  'index.html',
  'css/style.css',
  'js/content.js',
  'js/app.js',
  'fonts/dmsans-latin.woff',
  'manifest.webmanifest',
  'icons/icon.svg',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FICHIERS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((cles) => Promise.all(cles.filter((k) => k.startsWith(PREFIXE) && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Pages : le réseau d'abord (pour les mises à jour), le cache si hors ligne.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copie = res.clone();
          caches.open(CACHE).then((c) => c.put('index.html', copie));
          return res;
        })
        .catch(() => caches.match('index.html'))
    );
    return;
  }

  // Fichiers : le cache tout de suite, mise à jour discrète en arrière-plan.
  e.respondWith(
    caches.open(CACHE).then((c) =>
      c.match(req).then((enCache) => {
        const reseau = fetch(req)
          .then((res) => {
            if (res.ok) c.put(req, res.clone());
            return res;
          })
          .catch(() => enCache);
        return enCache || reseau;
      })
    )
  );
});
