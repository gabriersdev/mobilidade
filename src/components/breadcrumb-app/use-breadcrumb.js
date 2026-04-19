import { useContext } from 'react';
import { BreadcrumbContext } from './breadcrumb-provider.jsx';

export const useBreadcrumb = () => useContext(BreadcrumbContext);
