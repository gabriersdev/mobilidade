import './breadcrumbApp.css';

import {useEffect, useMemo, useRef, useState} from "react";
import {Breadcrumb, BreadcrumbItem} from "react-bootstrap";
import PropTypes from "prop-types";
import {useLocation, useNavigate} from 'react-router-dom';
import AnimatedComponents from "../animatedComponent/AnimatedComponents.jsx";

const pages = [
  "lines",
  "search",
  "terms-of-service",
  "privacy",
  "company",
  "development",
  "news",
  "guide"
]

// const BreadcrumbItemFactory = ({path, affirmationPath}) => {
const BreadcrumbItemFactory = ({path}) => {
  const location = useLocation();
  // const navigate = useNavigate();
  let label = "";
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
      label = (<span className={"text-capitalize"}>{path}</span>);
  }
  
  if (!path || !path.trim() || ["null", "undefined"].includes(path)) return null;
  
  const matchId = location.pathname.match(/\/lines\/(?<id>.)/i);
  if (matchId && path.match(/\b\d+\b/)) isLinePage = matchId.groups.id;
  
  return (
    <BreadcrumbItem className={`bg-body ${isLinePage ? "breadcrumb-i data-line-id" : ""}`} onClick={(e) => {
      e.preventDefault();
      // // console.log(path === location.pathname.split("/")[1] ? `/${path}` : `${path}`)
      // const replaceUrl =  path === "../" ? "/" : pages.includes(path) ? `/${path}` : affirmationPath;
      // navigate(replaceUrl, {replace: true});
    }} style={{cursor: "default"}}>
      {label}
    </BreadcrumbItem>
  );
}

BreadcrumbItemFactory.propTypes = {
  path: PropTypes.string.isRequired,
  affirmationPath: PropTypes.string.isRequired,
}

const BreadcrumbApp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [path, setPath] = useState({current: location.pathname, date: new Date().getTime()});
  const ref = useRef(null);
  
  // TODO - testar
  useEffect(() => {
    ref.current = new Date().getTime();
    setPath({...path, current: location.pathname, date: ref.current});
  }, [navigate, setPath]);
  
  if (path.current === "/") return null;
  const affirmationPath = path.current;
  
  return (
    <AnimatedComponents>
      <Breadcrumb className="bg-body mb-5">
        {
          ["../", ...path.current.split('/')].map((item, index) => {
            if (!item || !item.trim() || ["null", "undefined"].includes(item)) return null;
            return (<BreadcrumbItemFactory key={index} path={item} affirmationPath={affirmationPath}/>)
          })
        }
      </Breadcrumb>
    </AnimatedComponents>
  )
}

export default BreadcrumbApp;
