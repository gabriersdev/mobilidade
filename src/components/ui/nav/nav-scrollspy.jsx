import PropTypes from 'prop-types';
import {Nav as BootstrapNav} from "react-bootstrap";
import AnimatedComponents from "../animated-component/animated-components.jsx";
import {useNavScrollspy} from "./use-nav-scrollspy.js";

const elementIds = ["id", "partidas", "paradas", "pontos-de-recarga", "resume"];

const NavScrollspy = ({closeNav}) => {
  const areaFocus = useNavScrollspy(elementIds);

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

  const navLinks = [
    {id: "id", label: "Informações", className: "d-none d-sm-inline-block"},
    {id: "partidas", label: "Horários"},
    {id: "paradas", label: "Paradas"},
    {id: "pontos-de-recarga", label: "Recarga"},
    {id: "resume", label: "Sobre", className: "d-none"},
  ];

  return (
    <AnimatedComponents>
      <div className={"d-inline-flex gap-3 flex-wrap align-items-center justify-content-center py-2"}>
        <BootstrapNav.Item className={"h-100 align-items-center me-2 py-2 d-none gap-3 flex-wrap"}>Navegue por</BootstrapNav.Item>
        {navLinks.map(link => (
          <BootstrapNav.Link key={link.id} className={`text-primary p-0 ${link.className || ''}`} onClick={(e) => scrollTo(e, `#${link.id}`)}>
            <span style={{fontWeight: areaFocus === link.id ? "600" : "normal"}}>{link.label}</span>
          </BootstrapNav.Link>
        ))}
      </div>
    </AnimatedComponents>
  );
};

NavScrollspy.propTypes = {
  closeNav: PropTypes.func
};

export default NavScrollspy;
