import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import AnimatedComponents from '../../components/ui/animated-component/animated-component.jsx';
import NewsList from './news-list.jsx';
import NewsDetail from './news-detail.jsx';

const News = () => {
  const {id} = useParams();
  
  useEffect(() => {
    document.title = 'Mobilidade - Notícias';
  }, []);
  
  const isValidId = (id) => {
    return id && id.match(/^\d+$/);
  };
  
  return (
    <div>
      <AnimatedComponents>
        {isValidId(id) ? <NewsDetail/> : <NewsList/>}
      </AnimatedComponents>
    </div>
  );
};

export default News;
