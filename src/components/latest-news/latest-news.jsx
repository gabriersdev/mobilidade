import PropTypes from "prop-types";
import moment from "moment";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

import news from "../../assets/news.js";
import Card from "../ui/card/card.jsx";
import Util from "../../assets/Util.jsx";
import Title from "../ui/title/title.jsx";

const ScrollX = ({children}) => {
  return <div className={"overflow-x-scroll d-flex scroll-x pt-2 pb-3 gap-3 scroll-container"}>{children}</div>
}

ScrollX.propTypes = {
  children: PropTypes.node,
}

const LatestNews = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(false);
    }, 1500);
  }, []);
  
  return (
    <>
      <div className={"d-flex align-items-center gap-2 justify-content-between flex-wrap"}>
        <Title type="h3" classX={" text-body-secondary"}>
          <span className={"fs-3 fw-semibold"} style={{fontFamily: "inherit"}}>Últimas notícias</span>
        </Title>
        <Button as={Link} to={"/news"} variant={"secondary"} size={"sm"}>
          <span className={""}>Ver todas</span>
        </Button>
      </div>
      <div>
        <ScrollX>
          {
            !isLoaded ? (
              [...news.toSorted((a, b) => moment(b.publishDate).diff(moment(a.publishDate), "seconds"))].toSpliced(5).map((ns, index) => {
                return (
                  <Card key={index} title={ns.title.replace(/</g, "")} subtitle={ns.resume} link={`/news/${ns.id}`}>
                    {typeof ns.resume === "string" ? (Util.renderText(ns.content.toString().replace(/<\/?>/, ""))) : ns.content.map((item, i) => (<p key={i}>{Util.renderText(item)}</p>))}
                  </Card>
                )
              })
            ) : (
              Array.from({length: 9}, (_, i) => i).map((_, key) => {
                return (<Card key={key} variant={"placeholder"}></Card>)
              })
            )
          }
        </ScrollX>
      </div>
    </>
  )
}

export default LatestNews;
