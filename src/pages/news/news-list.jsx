import {useNews} from '@/hooks/use-news.js';
import {useState} from "react";
import Title from '@/components/ui/title/title.jsx';
import Alert from '@/components/ui/alert/alert.jsx';
import PaginationWithItems from '@/components/pagination-with-items/pagination-with-items.jsx';
import NewsC from '@/components/news/news.jsx';
import NewsNavigation from './news-navigation.jsx';

const NewsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {getNewsList} = useNews();
  const newsItems = getNewsList();
  
  return (
    <>
      <div>
        <Title classX={'text-body-secondary'}>Notícias</Title>
        <Alert variant={'info'}>As notícias estão ordenadas das mais recentes para as mais antigas</Alert>
      </div>
      <div className={'d-flex flex-column gap-4 gap-sm-5 align-items-start'}>
        <PaginationWithItems
          itemsPerPage={1}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          items={newsItems.map((item, index) => {
            const prevArticle = newsItems[index - 1];
            const nextArticle = newsItems[index + 1];
            
            return (
              <div className={'pb-5'} key={item.id}>
                <NewsC {...item} />
                <NewsNavigation prevArticle={prevArticle} nextArticle={nextArticle}/>
              </div>
            );
          })}
        />
      </div>
    </>
  );
};

export default NewsList;
