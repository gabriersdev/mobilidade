import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CACHE_NAME = 'mobi-popular-pages-v1';
const VIEW_THRESHOLD = 3; // Quantidade de views para considerar a página "frequente"

const PageCacheManager = () => {
  const location = useLocation();

  useEffect(() => {
    // Função para salvar no cache
    const cacheCurrentPage = async () => {
      const path = location.pathname;
      
      // 1. Lógica de Contagem de Views
      const storageKey = 'page-view-counts';
      let views = {};
      try {
        views = JSON.parse(localStorage.getItem(storageKey) || '{}');
      } catch (e) {
        views = {};
      }

      views[path] = (views[path] || 0) + 1;
      localStorage.setItem(storageKey, JSON.stringify(views));

      // 2. Verifica se atingiu o limite para cachear
      if (views[path] >= VIEW_THRESHOLD) {
        if ('caches' in window) {
          try {
            const cache = await caches.open(CACHE_NAME);
            const assetsToCache = new Set();

            // Adiciona a URL da página atual (HTML)
            assetsToCache.add(window.location.href);

            // Adiciona CSS principal
            document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
              if (link.href && !link.href.startsWith('chrome-extension')) {
                assetsToCache.add(link.href);
              }
            });

            // Adiciona JS principal (scripts com src)
            document.querySelectorAll('script[src]').forEach((script) => {
              if (script.src && !script.src.startsWith('chrome-extension')) {
                assetsToCache.add(script.src);
              }
            });

            // Adiciona Imagens visíveis na página
            document.querySelectorAll('img').forEach((img) => {
              if (img.src && !img.src.startsWith('data:') && !img.src.startsWith('blob:')) {
                assetsToCache.add(img.src);
              }
            });

            // Executa o cache
            // Usamos Promise.allSettled para garantir que se um falhar (ex: CORS), os outros sejam salvos
            const urls = Array.from(assetsToCache);
            await Promise.allSettled(
              urls.map(url => cache.add(url).catch(err => console.warn(`[Cache] Falha ao cachear ${url}`, err)))
            );
            
            console.log(`[PageCacheManager] Página frequente atualizada no cache: ${path}`);
          } catch (error) {
            console.error('[PageCacheManager] Erro ao acessar Cache API:', error);
          }
        }
      }
    };

    // Aguarda um tempo para garantir que a página e imagens carregaram antes de salvar
    const timer = setTimeout(cacheCurrentPage, 3000);

    return () => clearTimeout(timer);
  }, [location]);

  return null; // Componente lógico, não renderiza nada visual
};

export default PageCacheManager;
