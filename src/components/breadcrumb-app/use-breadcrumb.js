import {useContext} from 'react';
import {BreadcrumbContext} from './breadcrumb-context-obj.js';

export const useBreadcrumb = () => useContext(BreadcrumbContext);
