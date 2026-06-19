import {useState, useEffect, useMemo} from "react";
import moment from "moment";
import news from "../../assets/news.js";

export const useLatestNews = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(false);
    }, 2500);
  }, []);

  const sortedNews = useMemo(() => {
    return [
      ...news
        .filter(n => moment().diff(moment(n.publishDate), "seconds") > 0)
        .toSorted((a, b) => moment(b.publishDate).diff(moment(a.publishDate), "seconds"))
        .toSorted((a, b) => {
          if (a.fixed && !b.fixed) return -1;
          if (!a.fixed && b.fixed) return 1;
          return 0;
        })
    ].toSpliced(10);
  }, []);

  return { isLoaded, sortedNews };
};
