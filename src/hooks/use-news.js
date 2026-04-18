import newsA from '../assets/news.js';
import moment from 'moment';

const sortedNews = [...newsA]
  .filter(n => moment().isAfter(n.publishDate))
  .sort((a, b) => moment(b.publishDate).unix() - moment(a.publishDate).unix());

export const useNews = () => {
  const getNewsList = () => {
    return sortedNews;
  };

  const findNewsById = (id) => {
    if (!id) return { article: null, prevArticle: null, nextArticle: null };

    const numericId = parseInt(id, 10);
    const articleIndex = sortedNews.findIndex(n => n.id === numericId);

    if (articleIndex === -1) {
      return { article: null, prevArticle: null, nextArticle: null };
    }

    const article = sortedNews[articleIndex];
    const prevArticle = articleIndex > 0 ? sortedNews[articleIndex - 1] : null;
    const nextArticle = articleIndex < sortedNews.length - 1 ? sortedNews[articleIndex + 1] : null;

    return { article, prevArticle, nextArticle };
  };

  return { getNewsList, findNewsById };
};
