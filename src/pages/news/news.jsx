import {useEffect} from "react";
import Title from "../../components/ui/title/title.jsx";
import NewsC from '../../components/news/news.jsx';
import newsA from "../../assets/news.js";
import moment from "moment";
import {useParams} from "react-router-dom";

import AnimatedComponents from "../../components/ui/animated-component/animated-component.jsx";
import Alert from "../../components/ui/alert/alert.jsx";
import UpdatePageData from "../../components/update-page-data/update-page-data.jsx";

const News = () => {
  const {id} = useParams()
  
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
            <div className="d-flex flex-column align-items-start gap-5">
              <AnimatedComponents>
                <div className={"d-flex flex-column align-items-start gap-5"}>
                {[...newsA].toSpliced(50).toReversed().toSorted((a, b) => moment(a.publishDate).unix() < moment(b.publishDate).unix()).map((item, index) => (
                  <div className={"pb-5"} key={index} style={{borderBottom: "1px dashed #AAA"}}>
                    <NewsC {...item}/>
                  </div>
                ))}
                </div>
              </AnimatedComponents>
            </div>
          </>
        ) : (
          <>
            <AnimatedComponents>
              {
                newsA.find(n => n.id === parseInt(id)) ? (
                  <>
                    <UpdatePageData title={newsA.find(n => n.id === parseInt(id)).title} breadcrumbSelector={".breadcrumb-item:nth-child(3)"} breadcrumbText={newsA.find(n => n.id === parseInt(id)).title}/>
                    <NewsC {...newsA.find(n => n.id === parseInt(id))}/>
                  </>
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
    </div>
  )
}

export default News;
