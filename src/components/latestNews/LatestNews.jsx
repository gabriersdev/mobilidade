import PropTypes from "prop-types";
import news from "../../assets/news.js";
import Card from "../card/Card.jsx";
import moment from "moment";

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
          [...news.toSorted((a, b) => moment(a.publishDate).diff(moment(b.publishDate), "seconds")), {title: "Em breve mais notícias", resume: "A cada novidade, atualizamos você", content: "Fique ligado!"}].map((ns, index) => {
            return (
              <Card key={index} title={ns.title.replace("<", "")} subtitle={ns.resume} link={`/news`}>
                {ns.content}
              </Card>
            )
          })
        }
      </ScrollX>
    </div>
  )
}

export default LatestNews;
