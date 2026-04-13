import {useState, useEffect, useRef} from 'react';
import {useLocation} from 'react-router-dom';
import moment from 'moment';

export const useNavState = () => {
  const [width, setWidth] = useState(document.body.offsetWidth);
  const [isInLinePage, setIsInLinePage] = useState(false);
  const [sabaraTime, setSabaraTime] = useState(moment().format("dddd DD/MM HH[h]mm[min]"));
  const [expanded, setExpanded] = useState(false);
  const navbarRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setWidth(document.body.offsetWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsInLinePage(location.pathname.match(/lines\/\d*/));
  }, [location]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSabaraTime(moment().format("dddd DD/MM HH[h]mm[min]"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setExpanded(false);
        }
      },
      {threshold: 0}
    );

    const currentRef = navbarRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return {width, isInLinePage, sabaraTime, expanded, setExpanded, navbarRef};
};
