import React from 'react';
import {useLocation} from 'react-router-dom';
import {Breadcrumb} from 'react-bootstrap';
import {useBreadcrumbItems} from '@/hooks/use-breadcrumb-items.jsx';
import AnimatedComponents from '../ui/animated-component/animated-components.jsx';
import BreadcrumbItemFactory from './breadcrumb-item-factory.jsx';
import './breadcrumb-app.css';

const BreadcrumbApp = () => {
  const location = useLocation();
  const breadcrumbItems = useBreadcrumbItems();
  
  if (location.pathname === '/') {
    return null;
  }
  
  return (
    <div className="d-none d-md-block">
      <AnimatedComponents>
        <Breadcrumb className="bg-body mb-5">
          {breadcrumbItems.map((item, index) => (
            <BreadcrumbItemFactory key={index} label={item.label} url={item.url}/>
          ))}
        </Breadcrumb>
      </AnimatedComponents>
    </div>
  );
};

export default BreadcrumbApp;
