import PropTypes from 'prop-types';
import {useLocation} from 'react-router-dom';
import {Nav as BootstrapNav} from "react-bootstrap";
import AnimatedComponents from "@/components/ui/animated-component/animated-components.jsx";
import {useNavScrollspy} from "@/components/ui/nav/use-nav-scrollspy.js";
import {elementIdsPageLine, navLinksPageLine} from "@/assets/resources.js";
import liveMap from "@/assets/live-map.js";

const NavScrollspy = ({
  closeNav, 
  navLinks = navLinksPageLine, 
  elementIds = elementIdsPageLine
}) => {
  const areaFocus = useNavScrollspy(elementIds);
  const location = useLocation();
  
  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.querySelector(`${id}`);
    if (!el) return;
    
    const navbar = document.querySelector(`nav.navbar`);
    let offset = navbar ? navbar.clientHeight : 0;
    
    if (closeNav) {
      closeNav();
      const toggler = navbar?.querySelector('.navbar-toggler');
      if (toggler && window.getComputedStyle(toggler).display !== 'none') {
        const brand = navbar?.querySelector('.navbar-brand');
        if (brand) offset = brand.offsetHeight + 20;
      }
    }
    
    window.scrollTo({
      top: el.offsetTop - offset,
      behavior: "smooth"
    });
    
    window.location.hash = id;
  };

  const lineIdMatch = location.pathname.match(/\/lines\/(\d+)/);
  const lineId = lineIdMatch ? lineIdMatch[1] : null;

  const visibleLinks = navLinks.filter(link => {
    if (link.id === 'mapa') {
      return lineId && Object.keys(liveMap).includes(lineId);
    }
    return true;
  });
  
  return (
    <AnimatedComponents>
      <div className={"d-inline-flex gap-3 flex-wrap align-items-center justify-content-center py-2"}>
        <BootstrapNav.Item className={"h-100 align-items-center me-2 py-2 d-none gap-3 flex-wrap"}>Navegue por</BootstrapNav.Item>
        
        {visibleLinks.map(link => (
          <BootstrapNav.Link
            key={link.id}
            className={`text-primary p-0 ${link.className || ''}`}
            onClick={(e) => scrollTo(e, `#${link.id}`)}
          >
            <span style={{fontWeight: areaFocus === link.id ? "600" : "normal"}}>
              {link.label}
            </span>
          </BootstrapNav.Link>
        ))}
      </div>
    </AnimatedComponents>
  );
};

NavScrollspy.propTypes = {
  closeNav: PropTypes.func,
  navLinks: PropTypes.array,
  elementIds: PropTypes.array
};

export default NavScrollspy;
