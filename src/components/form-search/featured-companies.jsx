import {Link} from "react-router-dom";
import {Image, Tooltip, OverlayTrigger} from "react-bootstrap";

const FEATURED_COMPANIES = [
  {name: "Vinscol", path: "/company/3", logo: "vinscol.svg"},
  {name: "Transporte Coletivo Metropolitano - MG", path: "/company/4", logo: "der-mg.png"},
];

const FeaturedCompanies = () => (
  <div className="d-flex align-items-center flex-wrap gap-1 justify-content-center">
    {FEATURED_COMPANIES.map((company) => (
      <OverlayTrigger
        key={company.path}
        overlay={<Tooltip><p className="m-0 p-0 line-clamp-2">Veja as linhas ativas da companhia {company.name}</p></Tooltip>}
      >
        <Link to={company.path}>
          <Image src={`/images/companies/${company.logo}`} alt={`Logo da companhia ${company.name}`} width={75} height={25} className="object-fit-contain rounded-1"/>
        </Link>
      </OverlayTrigger>
    ))}
  </div>
);

export default FeaturedCompanies;
