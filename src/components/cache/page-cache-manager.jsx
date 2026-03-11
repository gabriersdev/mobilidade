import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

const CACHE_NAME = 'mobi-popular-pages-v1';
const VIEW_THRESHOLD = 3; // Quantidade de views para considerar a página "frequente"

const PageCacheManager = () => {
  const location = useLocation();
  
  useEffect(() => {
    const manageCache = async () => {
      if (!('caches' in window)) return;
      
      const path = location.pathname;
      
      try {
        const cache = await caches.open(CACHE_NAME);
        
        // Cachear Estáticos Principais (Sempre)
        // Garante que CSS e JS carregados (incluindo chunks de lazy loading) sejam salvos
        // Isso ajuda a manter a aplicação funcional mesmo com falhas de rede intermitentes
        const staticAssets = new Set();
        
        // CSS Principal e Chunks
        document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
          if (link.href && !link.href.startsWith('chrome-extension')) {
            staticAssets.add(link.href);
          }
        });
        
        // Scripts Principais e Chunks
        document.querySelectorAll('script[src]').forEach((script) => {
          if (script.src && !script.src.startsWith('chrome-extension')) {
            staticAssets.add(script.src);
          }
        });
        
        // Executa o cache dos estáticos silenciosamente
        const staticUrls = Array.from(staticAssets);
        await Promise.allSettled(
          staticUrls.map(url => cache.add(url).catch(() => {
            // Silencia erros de cache (ex: cross-origin opaco)
          }))
        );
        
        // Lógica de Páginas Frequentes
        // Foca em cachear o HTML da rota e imagens específicas se o usuário acessa muito
        
        // Lógica de Contagem de Views
        const storageKey = 'page-view-counts';
        let views = {};
        try {
          views = JSON.parse(localStorage.getItem(storageKey) || '{}');
        } catch (e) {
          views = {};
        }
        
        views[path] = (views[path] || 0) + 1;
        localStorage.setItem(storageKey, JSON.stringify(views));
        
        // Verifica se atingiu o limite
        if (views[path] >= VIEW_THRESHOLD) {
          const pageAssets = new Set();
          
          // Adiciona a URL da página atual (HTML)
          pageAssets.add(window.location.href);
          
          // Adiciona Imagens visíveis na página
          document.querySelectorAll('img').forEach((img) => {
            if (img.src && !img.src.startsWith('data:') && !img.src.startsWith('blob:')) {
              pageAssets.add(img.src);
            }
          });
          
          const pageUrls = Array.from(pageAssets);
          await Promise.allSettled(
            pageUrls.map(url => cache.add(url).catch(err => console.warn(`[Cache] Falha ao cachear ${url}`, err)))
          );
          
          console.log(`[PageCacheManager] Página frequente atualizada no cache: ${path}`);
        }
      } catch (error) {
        console.error('[PageCacheManager] Erro ao gerenciar cache:', error);
      }
    };
    
    // Aguarda um tempo para garantir que a página e recursos carregaram
    // Aumentado para 4s para garantir que lazy loads tenham terminado
    const timer = setTimeout(manageCache, 4000);
    
    return () => clearTimeout(timer);
  }, [location]);
  
  return null; // Componente lógico, não renderiza nada visual
};

export default PageCacheManager;
