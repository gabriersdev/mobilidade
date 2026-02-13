import { createContext, useContext } from 'react';

export const BreadcrumbContext = createContext();

export const useBreadcrumb = () => useContext(BreadcrumbContext);
