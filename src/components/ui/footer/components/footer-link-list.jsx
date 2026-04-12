import {Link} from "react-router-dom";
import {footerLinks} from "@/assets/resources.js";

const FooterLinkList = () => {
  return (
    <ul className="d-flex flex-column g-3 m-0 p-0 footer-link-list">
      {footerLinks.map(page => (
        <Link to={page.path} key={page.name} className="footer-link-list-item">{page.name}</Link>
      ))}
      <Link to="https://github.com/gabriersdev/mobilidade/" className="footer-link-list-item">Repositório no Github</Link>
      <Link to="https://github.com/gabriersdev/mobilidade/issues/new" className="footer-link-list-item">Reportar erro</Link>
    </ul>
  );
};

export default FooterLinkList;
