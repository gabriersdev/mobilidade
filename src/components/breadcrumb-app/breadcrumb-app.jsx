import './breadcrumb-app.css';

import {useEffect, useRef, useState} from "react";
import {Breadcrumb, BreadcrumbItem} from "react-bootstrap";
import PropTypes from "prop-types";
import {useLocation, useNavigate} from 'react-router-dom';
import AnimatedComponents from "../ui/animated-component/animated-components.jsx";

const BreadcrumbItemFactory = ({path, url}) => {
  const location = useLocation();
  const navigate = useNavigate();
  let label;
  let isLinePage = "";
  
  switch (path.toLowerCase()) {
    case "../":
      label = "Mobilidade"
      break;
    case "lines":
      label = "Linhas"
      break;
    case "search":
      label = "Pesquisa"
      break;
    case "terms-of-service":
      label = "Termos de Serviço"
      break;
    case "privacy":
      label = "Privacidade"
      break;
    case "company":
      label = "Compania"
      break;
    case "development":
      label = "Desenvolvimento"
      break;
    case "news":
      label = "Notícias"
      break;
    case "history":
      label = "Histórico"
      break;
    case "guide":
      label = "Guia"
      break;
    case "live":
      label = "Ao vivo"
      break;
    case "sabara":
      label = "Sabará"
      break;
    default:
      label = (<p className={"text-capitalize d-inline"}>{path.match(/\b\d+\b/) ? <span>Carregando...</span> : <span>{path}</span>}</p>);
  }
  
  if (!path || !path.trim() || ["null", "undefined"].includes(path)) return null;
  
  const matchId = location.pathname.match(/\/lines\/(?<id>.)/i);
  if (matchId && path.match(/\b\d+\b/)) isLinePage = matchId.groups.id;
  
  return (
    <BreadcrumbItem className={`bg-body ${isLinePage ? "breadcrumb-i data-line-id" : ""}`} onClick={(e) => {
      e.preventDefault();
      if (url) navigate(url);
    }} style={{cursor: "pointer"}}>
      {label}
    </BreadcrumbItem>
  );
}

BreadcrumbItemFactory.propTypes = {
  path: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

const BreadcrumbApp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [path, setPath] = useState({current: location.pathname, date: new Date().getTime()});
  const ref = useRef(null);
  
  useEffect(() => {
    ref.current = new Date().getTime();
    setPath(prev => ({...prev, current: location.pathname, date: ref.current}));
  }, [location.pathname]);
  
  if (path.current === "/") return null;
  
  const segments = path.current.split('/').filter(item => item && item.trim() && !["null", "undefined"].includes(item));
  
  return (
    <div className={"d-none d-md-block"}>
      <AnimatedComponents>
        <Breadcrumb className="bg-body mb-5">
          <BreadcrumbItemFactory path="../" url="/" />
          {
            segments.map((item, index) => {
              const url = "/" + segments.slice(0, index + 1).join("/");
              return (<BreadcrumbItemFactory key={index} path={item} url={url}/>)
            })
          }
        </Breadcrumb>
      </AnimatedComponents>
    </div>
  )
}

export default BreadcrumbApp;
