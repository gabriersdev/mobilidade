import {useState, useEffect} from 'react';

const SEARCH_LS_KEY = "search-history";

export const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem(SEARCH_LS_KEY)) || [];
    setSearchHistory(history.map(term => ({name: term})));
  }, []);

  const addSearchTerm = (term) => {
    if (!term) return;
    const history = JSON.parse(localStorage.getItem(SEARCH_LS_KEY)) || [];
    if (!history.includes(term)) {
      const newHistory = [term, ...history].slice(0, 5); // Mantém apenas os 5 mais recentes
      localStorage.setItem(SEARCH_LS_KEY, JSON.stringify(newHistory));
      setSearchHistory(newHistory.map(t => ({name: t})));
    }
  };

  return {searchHistory, addSearchTerm};
};
