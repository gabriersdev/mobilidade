import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import CompanyList from '@/pages/company/company-list.jsx';
import CompanyDetail from '@/pages/company/company-detail.jsx';
import bcAll from '@/components/breadcrumb-app/breadcrumb-context.jsx';

const useBreadcrumb = bcAll.useBreadcrumb;

const Company = () => {
  const {id} = useParams();
  const {setLabel} = useBreadcrumb();
  
  useEffect(() => {
    if (!id) {
      document.title = 'Mobilidade - Companhias';
      setLabel('company', 'Companhias');
    }
  }, [id, setLabel]);
  
  return id ? <CompanyDetail/> : <CompanyList/>;
};

export default Company;
