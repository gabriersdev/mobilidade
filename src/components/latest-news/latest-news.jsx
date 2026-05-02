import PropTypes from "prop-types";
import moment from "moment";
import {Link} from "react-router-dom";
import {Button, Image} from "react-bootstrap";
import {useEffect, useState} from "react";

import news from "../../assets/news.js";
import Card from "../ui/card/card.jsx";
import Util from "../../lib/Util.jsx";
import Title from "../ui/title/title.jsx";

const ScrollX = ({children}) => {
  return (
    <div className={"overflow-x-scroll d-flex scroll-x pt-2 pb-3 gap-3 scroll-container"}>
      {children}
    </div>
  )
}

ScrollX.propTypes = {
  children: PropTypes.node,
}

const LatestNews = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(false);
    }, 2500);
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
              // false ? (
              [
                ...news
                  .filter(n => moment().diff(moment(n.publishDate), "seconds") > 0)
                  .toSorted((a, b) => moment(b.publishDate).diff(moment(a.publishDate), "seconds"))
              ]
                .toSpliced(5)
                .map((ns, index) => {
                  return (
                    <div key={index}>
                      <Link to={`/news/${ns.id}`} className={"position-relative"}>
                        <Image
                          src={ns.img ?? "/news/marcopolo-44117.png"}
                          alt={ns.title}
                          className={"w-100 h-100 rounded-1 object-fit-cover mb-2"}
                          style={{maxHeight: 150}}
                        />
                        <div
                          className={"position-absolute w-100 h-100 rounded-1"}
                          style={{top: "0", left: "0", transform: "translate(0, -45%)", background: "#00000025", minHeight: 150}}
                        >
                        </div>
                      </Link>
                      <Card key={index} title={ns.title.replace(/</g, "")} subtitle={ns.resume} link={`/news/${ns.id}`}>
                        {typeof ns.resume === "string" ? (Util.renderText(ns.content.toString().replace(/<\/?>/, ""))) : ns.content.map((item, i) => (<p key={i}>{Util.renderText(item)}</p>))}
                      </Card>
                    </div>
                  )
                })
            ) : (
              Array.from({length: 9}, (_, i) => i).map((_, key) => {
                return (
                  <div key={key}>
                    <div className={"d-flex flex-column placeholder-glow gap-1 mb-2"}>
                      <div className={'placeholder fs-2 rounded'} style={{minHeight: '150px'}}></div>
                    </div>
                    <Card key={key} variant={"placeholder-news"}/>
                  </div>
                )
              })
            )
          }
        </ScrollX>
      </div>
    </>
  )
}

export default LatestNews;
