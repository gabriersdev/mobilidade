import {useEffect} from 'react';
import {useGuide} from '@/hooks/use-guide.js';
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

  const hasData = data && Object.keys(data).length > 0;
  const uniqueLetters = hasData ? Object.keys(data).map(key => key[0]).filter((v, i, self) => self.indexOf(v) === i).sort() : [];

  const renderContent = () => {
    if (loading) {
      return <GuidePlaceholder/>;
    }

    if (error) {
      return (
        <div className="col-12">
          <Alert variant="danger">{error}</Alert>
        </div>
      );
    }

    if (!hasData) {
      return (
        <div className="col-12">
          <Alert variant="info">Nenhum guia encontrado para o termo pesquisado.</Alert>
        </div>
      );
    }

    return (
      <>
        <div className="col-lg-8">
          <AnimatedComponents>
            <GuideList data={data}/>
          </AnimatedComponents>
        </div>
        <div className="col-lg-4 mt-3 mt-lg-0">
          <GuideIndex letters={uniqueLetters}/>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="d-flex flex-column gap-4 gap-sm-5 align-items-start">
        <AnimatedComponents>
          <Title title="Guia do Transporte Público de Sabará-MG" id="topo" classX="text-body-secondary"/>
          <section className="w-100">
            <AnimatedComponents>
              <GuideSearch term={searchTerm} setTerm={setSearchTerm}/>
              <div className="row">
                {renderContent()}
              </div>
            </AnimatedComponents>
          </section>
        </AnimatedComponents>
      </div>
    </div>
  );
};

export default Guide;
