import {useLocation} from 'react-router-dom';
import bcAll from '@/components/breadcrumb-app/breadcrumb-context.jsx';

const useBreadcrumb = bcAll.useBreadcrumb;

const LABEL_MAP = {
  "lines": "Linhas",
  "search": "Pesquisa",
  "terms-of-service": "Termos de Serviço",
  "privacy": "Privacidade",
  "company": "Companhia",
  "development": "Desenvolvimento",
  "news": "Notícias",
  "history": "Histórico",
  "guide": "Guia",
  "live": "Ao vivo",
  "sabara": "Sabará",
  "manifest": "Manifesto",
};

// TODO - corrigir erro neste componente:
/*
* [plugin:vite:oxc] Transform failed with 1 error:

[PARSE_ERROR] Error: Unexpected JSX expression
    ╭─[ src/hooks/use-breadcrumb-items.js:29:12 ]
    │
 29 │     return <span>Carregando...</span>;
    │            ─────────────┬────────────
    │                         ╰──────────────
    │
    │ Help: JSX syntax is disabled and should be enabled via the parser options
────╯

C:/projects/mobilidade/src/hooks/use-breadcrumb-items.js

    at transformWithOxc (file:///C:/projects/mobilidade/node_modules/vite/dist/node/chunks/node.js:3739:19)
    at TransformPluginContext.transform (file:///C:/projects/mobilidade/node_modules/vite/dist/node/chunks/node.js:3807:26)
    at EnvironmentPluginContainer.transform (file:///C:/projects/mobilidade/node_modules/vite/dist/node/chunks/node.js:30128:51)
    at async loadAndTransform (file:///C:/projects/mobilidade/node_modules/vite/dist/node/chunks/node.js:24459:26)
    at async viteTransformMiddleware (file:///C:/projects/mobilidade/node_modules/vite/dist/node/chunks/node.js:24253:20)
* */

const getLabel = (path, customLabels) => {
  if (customLabels[path]) {
    return customLabels[path];
  }
  if (LABEL_MAP[path.toLowerCase()]) {
    return LABEL_MAP[path.toLowerCase()];
  }
  if (path.match(/^\\d+$/)) {
    return <span>Carregando...</span>;
  }
  return <p className="text-capitalize d-inline">{path}</p>;
};

export const useBreadcrumbItems = () => {
  const location = useLocation();
  const {labels} = useBreadcrumb();
  
  const segments = location.pathname.split('/').filter(Boolean);
  
  return [
    {path: '../', url: '/', label: 'Mobilidade'},
    ...segments.map((segment, index) => {
      const url = `/${segments.slice(0, index + 1).join('/')}`;
      return {
        path: segment,
        url,
        label: getLabel(segment, labels),
      };
    }),
  ];
};
