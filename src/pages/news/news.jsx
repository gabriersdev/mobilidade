import {useEffect, useState} from "react";
import Title from "../../components/ui/title/title.jsx";
import NewsC from '../../components/news/news.jsx';
import newsA from "../../assets/news.js";
import moment from "moment";
import {useParams} from "react-router-dom";

import AnimatedComponents from "../../components/ui/animated-component/animated-component.jsx";
import Alert from "../../components/ui/alert/alert.jsx";
import UpdatePageData from "../../components/update-page-data/update-page-data.jsx";
import PaginationWithItems from "../../components/pagination-with-items/pagination-with-items.jsx";

import bcAll from "../../components/breadcrumb-app/breadcrumb-context.jsx";

const useBreadcrumb = bcAll.useBreadcrumb;

// TODO - refatorar componente
const News = () => {
  const {id} = useParams()
  const {setLabel} = useBreadcrumb();
  const [currentPage, setCurrentPage] = useState(1);
  
  const checkIsValid = (id) => {
    if (!id) return false
    if (!id.length) return false
    return id.match(/\d/g)
  }
  
  useEffect(() => {
    document.title = "Mobilidade - Notícias";
  }, [])
  
  return (
    <div>
      {
        !checkIsValid(id) ? (
          <>
            <div>
              <Title classX={" text-body-secondary"}>Notícias</Title>
              <Alert variant={"info"}>As notícias estão ordenadas das mais recentes para as mais antigas</Alert>
            </div>
            
            <div className={"d-flex flex-column gap-4 gap-sm-5 align-items-start"}>
              <AnimatedComponents>
                <div className={"d-flex flex-column gap-4 gap-sm-5 align-items-start"}>
                  <PaginationWithItems
                    itemsPerPage={1}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    items={
                      [...newsA]
                        .filter(n => moment().diff(moment(n.publishDate), "seconds") > 0)
                        .toSpliced(50)
                        .toReversed()
                        .toSorted((a, b) => moment(a.publishDate).unix() < moment(b.publishDate).unix())
                        .map((item, index) => (
                          <div className={"pb-5"} key={index}>
                            <NewsC {...item}/>
                          </div>
                        ))
                    }
                  />
                </div>
              </AnimatedComponents>
            </div>
          </>
        ) : (
          <>
            <AnimatedComponents>
              {
                newsA.find(n => n.id === parseInt(id)) ? (
                  (() => {
                    const newsItem = newsA.find(n => n.id === parseInt(id));
                    setLabel(id, newsItem.title);
                    return (
                      <>
                        <UpdatePageData title={newsItem.title}/>
                        <NewsC {...newsItem}/>
                      </>
                    );
                  })()
                ) : (
                  <Alert variant={'danger'} margin={"mt-0"}>
                    <span>Notícia não encontrada.</span>
                  </Alert>
                )
              }
            </AnimatedComponents>
          </>
        )
      }
      
      {/*  TODO - listar aqui a notícia ANTERIOR e a PRÓXIMA notícia, quando houver, tal qual é em documentação */}
    </div>
  )
}

export default News;
