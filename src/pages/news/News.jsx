import {useEffect} from "react";
import Title from "../../components/title/Title.jsx";
import NewsC from '../../components/news/News.jsx';
import newsA from "../../assets/news.js";
import moment from "moment";
import {useParams} from "react-router-dom";
import Util from "../../assets/Util.jsx";
import AnimatedComponents from "../../components/animatedComponent/AnimatedComponents.jsx";
import Alert from "../../components/alert/Alert.jsx";
import UpdatePageData from "../../components/updatePageData/UpdatePageData.jsx";

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
            <Title classX={" text-body-secondary"}>Notícias</Title>
            <div className="d-flex flex-column gap-5">
              <AnimatedComponents>
                {[...newsA].toSorted((a, b) => moment(a.publishDate) < moment(b.publishDate)).map((item, index) => (
                  <div className={"border-bottom border-secondary-subtle pb-5"} key={index}>
                    <NewsC {...item}/>
                  </div>
                ))}
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
