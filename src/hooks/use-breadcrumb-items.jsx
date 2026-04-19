import {useLocation} from 'react-router-dom';

import bcAll from '@/components/breadcrumb-app/breadcrumb-context.jsx';
import {labelMap} from "@/assets/resources.js";

const useBreadcrumb = bcAll.useBreadcrumb;

const LABEL_MAP = Object.assign({}, {...labelMap});

const getLabel = (path, customLabels) => {
  if (customLabels[path]) return customLabels[path];
  if (LABEL_MAP[path.toLowerCase()]) return LABEL_MAP[path.toLowerCase()];
  // TODO - aplicar placeholder
  if (path.match(/^\\d+$/)) return <span>Carregando...</span>;
  return <p className="text-capitalize d-inline">{path}</p>;
};

export const useBreadcrumbItems = () => {
  const location = useLocation();
  const {labels} = useBreadcrumb();
  
  const segments = location.pathname.split('/').filter(Boolean);
  
  return [
    {
      path: '../',
      url: '/',
      label: 'Mobilidade'
    },
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
