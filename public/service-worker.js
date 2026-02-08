const cacheNumber = 43;
const cacheVersion = "V" + cacheNumber;
const CACHE_NAME = `mobilidade-app-${cacheVersion}`;
const STATIC_CACHE_NAME = `mobilidade-app-${cacheVersion}`;
const DYNAMIC_CACHE_NAME = `dynamic-mobilidade-app-${cacheVersion}`;

// TODO - testar nova implementação de caching
// Arquivos essenciais que DEVEM estar no cache imediatamente (App Shell)
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/css/app.css',
  '/css/bootstrap-cerulean.css',
  '/css/index.css',
  '/css/scroll-container.css',
];

// Instalação: Cacheia os arquivos estáticos iniciais
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Cacheando arquivos estáticos');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Ativação: Limpa caches antigos se a versão mudar
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== DYNAMIC_CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fetch: cache centralizado
self.addEventListener('fetch', (event) => {
  const request = event.request;
  
  // Ignora requisições que não sejam GET ou que sejam de outras origens (opcional)
  if (request.method !== 'GET') return;
  
  // Estratégia para Páginas HTML (Network First, Fallback to Cache)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          // Se a rede responder, atualiza o cache dinâmico com a nova versão da página
          return caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // Se estiver offline, tenta pegar do cache
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;
            // Opcional: Retornar uma página de "Você está offline" genérica aqui
            return caches.match('/offline.html');
          });
        })
    );
  } else {
    // Para Ativos Estáticos (Cache First, Fallback to Network)
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        return cachedResponse || fetch(request).then((networkResponse) => {
          return caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  }
});

self.addEventListener('push', event => {
  const options = {
    body: event.data.text(), // Corpo da notificação
    icon: 'https://example.com/icon.png', // Ícone opcional
    badge: 'https://example.com/badge.png' // Badge opcional
  };
  
  event.waitUntil(
    self.registration.showNotification('Notificação via Service Worker', options)
  );
});

// Evento de clique na notificação
self.addEventListener('notificationclick', event => {
  console.log("Notificação clicada");
  event.notification.close(); // Fecha a notificação quando clicada
  event.waitUntil(
    clients.openWindow("/")
  );
});
