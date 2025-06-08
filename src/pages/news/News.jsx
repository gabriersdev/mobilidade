import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Alert from "../../components/alert/Alert.jsx";
import FeedbackError from "../../components/feedbackError/FeedbackError.jsx";
import Title from "../../components/title/Title.jsx";
import AnimatedComponents from "../../components/animatedComponent/AnimatedComponents.jsx";
import NewsC from '../../components/news/News.jsx';
import newsA from "../../assets/news.js";

const RenderNews = () => {
  const {id} = useParams();
  const [error, setError] = useState(null);
  const [loaded, setIsLoaded] = useState(true);
  const [data, setData] = useState([]);
  const [linesData, setLinesData] = useState([]);
  
  const checkIsValid = (id) => {
    if (!id) return false
    if (!id.length) return false
    return id.match(/\d/g)
  }
  
  useEffect(() => {
    setIsLoaded(false);
  }, [id])
  
  useEffect(() => {
    document.title = "Mobilidade - Notícias";
  }, [])
  
  if (loaded) {
    return <>Carregando...</>
  } else if (error) {
    console.error(error);
    return <FeedbackError code={error.response ? error.response.status || 500 : 500} text={error.message} type={'card'}/>;
  } else if (data.length === 0) {
    return <Alert variant={'danger'} margin={"mt-0"}><span>Notícia não encontrada.</span></Alert>;
  } else {
    return <></>
  }
}

const News = () => {
  useEffect(() => {
    const dataNewsItem = document.querySelector('.breadcrumb-item:nth-child(2)')
    if (dataNewsItem) dataNewsItem.querySelector('a').textContent = `Notícias`;
  }, [])
  
  return (<AnimatedComponents>
    <Title classX={" text-body-secondary"}>Notícias</Title>
    <div className="mt-5 d-flex flex-column gap-5">
      {[...newsA].map((item, index) => (
        <div className={"border-bottom border-secondary-subtle pb-5"} key={index}>
          <NewsC {...item}/>
        </div>
      ))}
    </div>
  </AnimatedComponents>)
}

export default News;
