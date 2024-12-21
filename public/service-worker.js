// Nome do cache
const CURRENT_CACHE_NAME = 'mobilidade-app';

const urlsToCache = [
  '/',
  '/manifest.json',
  '/favicon.svg',
  '/images/icon-blue-192x192.png',
  '/images/icon-blue-512x512.png'
];

// Evento de instalação (opcional: apenas se quiser pré-carregar arquivos)
self.addEventListener('install', (event) => {
  console.log('Service Worker instalado.');
  event.waitUntil(
    caches.open(CURRENT_CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // Ativa imediatamente
});

// Evento de ativação: Remove caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CURRENT_CACHE_NAME) {
            console.log('Limpando cache antigo:', cache);
            return caches.delete(cache); // Remove caches que não são o atual
          }
        })
      );
    })
  );
  // Faz com que o novo service worker controle as páginas imediatamente
  // eslint-disable-next-line
  event.waitUntil(clients.claim());
});

// Intercepta requisições (opcional: apenas se você estiver lidando com caching)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Serve do cache ou faz uma requisição de rede
      return response || fetch(event.request);
    })
  );
});
