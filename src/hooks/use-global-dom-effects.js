import {useEffect} from 'react';
import AOS from 'aos';
import {useLocation} from 'react-router-dom';

export const useGlobalDomEffects = () => {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      disable: false,
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,
    });
    document.querySelectorAll('a').forEach(link => link.setAttribute('rel', 'noopener noreferrer'));
  }, []);

  useEffect(() => {
    let attempts = 0;
    const addVersionToScript = () => {
      if (attempts >= 5) return;
      const script = Array.from(document.querySelectorAll("script")).find(s => s.type === "module" && s.src.match(/\/assets\/index\.\w*\.js/));
      if (script) {
        script.src = script.src + "?v=" + new Date().getTime();
      } else {
        attempts++;
        setTimeout(addVersionToScript, 1000 * attempts);
      }
    };
    addVersionToScript();
  }, []);

  useEffect(() => {
    const loader = document.querySelector('.overlay-mobi');
    if (loader) {
      setTimeout(() => {
        loader.style.display = 'none';
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (location.hash && !location.pathname.match(/lines\/\d+\/#\w+/)) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({top: element.offsetTop, behavior: 'smooth'});
      }
    } else if (!location.pathname.match(/lines\/\d+\/#\w+/)) {
      setTimeout(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
      }, 100);
    }
  }, [location]);
};
