import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

import Card from "../ui/card/card.jsx";
import Title from "../ui/title/title.jsx";
import LatestNewsItem from "./latest-news-item.jsx";
import {useLatestNews} from "./use-latest-news.js";

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
  const { isLoaded, sortedNews } = useLatestNews();
  
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
              sortedNews.map((ns, index) => (
                <LatestNewsItem key={index} ns={ns} />
              ))
            ) : (
              Array.from({length: 10}, (_, i) => i).map((_, key) => {
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
