import {useEffect} from "react";
import Title from "../../components/title/Title.jsx";
import AnimatedComponents from "../../components/animatedComponent/AnimatedComponents.jsx";
import NewsC from '../../components/news/News.jsx';
import newsA from "../../assets/news.js";
import moment from "moment";

const News = () => {
  useEffect(() => {
    document.title = "Mobilidade - Notícias";
  }, [])
  
  return (<AnimatedComponents>
    <Title classX={" text-body-secondary"}>Notícias</Title>
    <div className="mt-5 d-flex flex-column gap-5">
      {[...newsA].toSorted((a, b) => moment(a.publishDate) < moment(b.publishDate)).map((item, index) => (
        <div className={"border-bottom border-secondary-subtle pb-5"} key={index}>
          <NewsC {...item}/>
        </div>
      ))}
    </div>
  </AnimatedComponents>)
}

export default News;
