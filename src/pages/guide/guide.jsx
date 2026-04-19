import React, {useEffect} from 'react';
import {useGuide} from '@/hooks/useGuide.js';
import Title from '@/components/ui/title/title.jsx';
import Alert from '@/components/ui/alert/alert.jsx';
import AnimatedComponents from '@/components/ui/animated-component/animated-components.jsx';
import bcAll from '@/components/breadcrumb-app/breadcrumb-context.jsx';
import GuidePlaceholder from '@/pages/guide/guide-placeholder.jsx';
import GuideSearch from '@/pages/guide/guide-search.jsx';
import GuideIndex from '@/pages/guide/guide-index.jsx';
import GuideList from '@/pages/guide/guide-list.jsx';

const useBreadcrumb = bcAll.useBreadcrumb;

const Guide = () => {
  const {data, loading, error, searchTerm, setSearchTerm} = useGuide();
  const {setLabel} = useBreadcrumb();
  
  useEffect(() => {
    const pageTitle = 'Guia do Transporte Público de Sabará-MG';
    document.title = `Mobilidade - ${pageTitle}`;
    setLabel('guide', pageTitle);
  }, [setLabel]);
  
  const uniqueLetters = Object.keys(data).map(key => key[0]).filter((v, i, self) => self.indexOf(v) === i).sort();
  
  return (
    <div>
      <div className="d-flex flex-column gap-4 gap-sm-5 align-items-start">
        <Title title="Guia do Transporte Público de Sabará-MG" id="topo" classX="text-body-secondary"/>
        <section className="w-100">
          <AnimatedComponents>
            <GuideSearch term={searchTerm} setTerm={setSearchTerm}/>
            <div className="row">
              <div className="col-lg-8">
                {loading ? (
                  <GuidePlaceholder/>
                ) : error ? (
                  <Alert variant="danger">{error}</Alert>
                ) : (
                  <GuideList data={data}/>
                )}
              </div>
              <div className="col-lg-4 mt-3 mt-lg-0">
                {!loading && !error && <GuideIndex letters={uniqueLetters}/>}
              </div>
            </div>
          </AnimatedComponents>
        </section>
      </div>
    </div>
  );
};

export default Guide;
