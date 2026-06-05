import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useNews} from '@/hooks/use-news.js';
import NewsC from '@/components/news/news.jsx';
import Alert from '@/components/ui/alert/alert.jsx';
import UpdatePageData from '@/components/update-page-data/update-page-data.jsx';
import NewsNavigation from '@/pages/news/news-navigation.jsx';
import bcAll from '@/components/breadcrumb-app/breadcrumb-context.jsx';

const useBreadcrumb = bcAll.useBreadcrumb;

const NewsDetail = () => {
  const {id} = useParams();
  const {setLabel} = useBreadcrumb();
  const {findNewsById} = useNews();
  const {article, prevArticle, nextArticle} = findNewsById(id);
  
  useEffect(() => {
    if (article) {
      setLabel(id, article.title);
    }
  }, [id, article, setLabel]);
  
  if (!article) {
    return (
      <Alert variant={'danger'} margin={'mt-0'}>
        <span>Notícia não encontrada.</span>
      </Alert>
    );
  }
  
  return (
    <>
      <UpdatePageData title={article.title}/>
      <NewsC {...article} />
      <NewsNavigation prevArticle={prevArticle} nextArticle={nextArticle}/>
    </>
  );
};

export default NewsDetail;
