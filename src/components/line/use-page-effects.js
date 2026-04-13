import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import bcAll from '../breadcrumb-app/breadcrumb-context.jsx';

const useBreadcrumb = bcAll.useBreadcrumb;

export const usePageEffects = (data, paradasSection) => {
  const params = useLocation();
  const {setLabel} = useBreadcrumb();

  useEffect(() => {
    if (data && data.length > 0) {
      const line = data[0];
      document.title = `Linha ${line.line_number} | ${line.departure_location} - ${line.destination_location} | Transporte Público em Sabará - MG`;
      setLabel(line.line_id, `${line.line_number} - ${line.departure_location} ⇄ ${line.destination_location}`);
    } else {
      document.title = "Mobilidade - Consulta Linha - Transporte Público em Sabará - MG";
    }
  }, [data, setLabel]);

  useEffect(() => {
    const {hash} = params;
    if (!hash || !hash.startsWith("#")) return;

    const hashSanitized = hash.split("?")[0];
    const element =
      hashSanitized !== "#paradas"
        ? document.querySelector(hashSanitized)
        : paradasSection.current;

    if (!element) return;
    let observer;

    const scrollToElement = () => {
      const top = element.offsetTop;
      if (top > 0 && element.tagName.toLowerCase() === "section") {
        window.scroll({
          behavior: "smooth",
          top: top - 5 * 16, // 5rem margin
        });
        if (observer && observer.disconnect) observer.disconnect();
      }
    };

    if (element.offsetHeight > 0) {
      requestAnimationFrame(scrollToElement);
    } else {
      const btn = Array.from(document.querySelectorAll("a.text-body-secondary.nav-link")).find(a => a?.textContent?.toLowerCase()?.trim() === "paradas");
      if (btn) btn.click();
    }

    observer = new ResizeObserver(() => {
      if (element.offsetHeight > 0) {
        requestAnimationFrame(scrollToElement);
      }
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [params, paradasSection]);
};
