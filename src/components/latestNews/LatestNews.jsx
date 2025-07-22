import PropTypes from "prop-types";
import news from "../../assets/news.js";
import Card from "../card/Card.jsx";
import moment from "moment";
import Util from "../../assets/Util.jsx";

const ScrollX = ({children}) => {
  return <div className={"overflow-x-scroll d-flex scroll-x gap-3 pt-2 pb-3"}>{children}</div>
}

ScrollX.propTypes = {
  children: PropTypes.node,
}

const LatestNews = () => {
  return (
    <div className={"pt-1"}>
      <ScrollX>
        {
          [...news.toSorted((a, b) => moment(b.publishDate).diff(moment(a.publishDate), "seconds"))].toSpliced(5).map((ns, index) => {
            return (
              <Card key={index} title={ns.title.replace("<", "")} subtitle={ns.resume} link={`/news/${ns.id}`}>
                {typeof ns.resume === "string" ? (Util.renderText(ns.content)) : ns.content.map((item, i) => (<p key={i}>{Util.renderText(item)}</p>))}
              </Card>
            )
          })
        }
      </ScrollX>
    </div>
  )
}

export default LatestNews;
