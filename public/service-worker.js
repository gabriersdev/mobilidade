// Nome do cache
const CACHE_NAME = 'mobilidade-app';
// Arquivos para cache
const urlsToCache = [
  '/mobilidade',
  '/manifest.json',
  '/favicon.svg',
  '/images/icon-blue-192x192.png',
  '/images/icon-blue-512x512.png'
];

// Instala o Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Atualiza o Service Worker e limpa caches antigos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Removendo cache antigo:", cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// Intercepta requisições para servir do cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

