const cacheVersion = "v20"
const STATIC_CACHE_NAME = `mobilidade-app-${cacheVersion}`;
const DYNAMIC_CACHE_NAME = `dynamic-mobilidade-app-${cacheVersion}`;


const staticUrlsToCache = [ // Arquivos estáticos que raramente mudam
  '/',
  '/manifest.json',
  '/favicon.svg',
  '/images/icon-white-192x192.png',
  '/images/icon-white-512x512.png',
];

self.addEventListener('install', (event) => {
  console.log('Service Worker instalado.');
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => cache.addAll(staticUrlsToCache))
  );
  self.skipWaiting();
});


self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      // Stale-while-revalidate para recursos estáticos, network-first para dinâmicos
      if (staticUrlsToCache.includes(event.request.url)) { // Cache estático
        return staleWhileRevalidate(event);
      } else { // Cache Dinâmico (API, etc.) - ajusta conforme necessário
        return networkFirst(event);
      }

    })
  );
});


// Função auxiliar para stale-while-revalidate
function staleWhileRevalidate(event) {
  return caches.open(STATIC_CACHE_NAME).then(cache => {
    return cache.match(event.request).then(response => {
      const fetchPromise = fetch(event.request).then(networkResponse => {
        cache.put(event.request, networkResponse.clone());
        return networkResponse;
      });

      return response || fetchPromise;
    });
  });
}

//Função auxiliar para network-first
function networkFirst(event) {
  return fetch(event.request).then(fetchRes => {
    return caches.open(DYNAMIC_CACHE_NAME).then(cache => {
      cache.put(event.request, fetchRes.clone());
      return fetchRes;
    })
  }).catch(() => {
    return caches.match(event.request)
  })
}


self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
            console.log('Limpando cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  event.waitUntil(clients.claim());
});
