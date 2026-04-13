import {Link} from "react-router-dom";
import {Badge} from "react-bootstrap";
import {footerLinks, navLinks} from "@/assets/resources.js";

const PageLinks = () => {
  const otherPages = navLinks.filter(navLink =>
    !footerLinks.some(footerLink => footerLink.name.toLowerCase() === navLink.name.toLowerCase())
  );
  
  return (
    <section>
      <p className="mb-0 text-body-secondary text-sml mb-2">Navegue por</p>
      <div className={"d-flex flex-row gap-1 align-items-center justify-content-start flex-wrap"}>
        {
          [...otherPages]
            .toSorted((a, b) => a.name.localeCompare(b.name))
            .map((page, i) => (
              <Link to={page.path} key={i}>
                <Badge bg={"info"} pill={true} className={"d-inline-block"}>
                  <span className={"text-sml d-block"} style={{paddingBottom: "2px", paddingTop: "1px"}}>{page.name}</span>
                </Badge>
              </Link>
            ))
        }
      </div>
    </section>
  );
};

export default PageLinks;
