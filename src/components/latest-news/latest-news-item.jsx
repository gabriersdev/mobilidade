import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Badge, Image, OverlayTrigger, Tooltip} from "react-bootstrap";
import Card from "../ui/card/card.jsx";
import Util from "../../lib/Util.jsx";

const LatestNewsItem = ({ns}) => {
  return (
    <div>
      <Link to={`/news/${ns.id}`} className={"position-relative"}>
        <div className={"position-relative"}>
          {
            ns.fixed && (
              <OverlayTrigger overlay={
                <Tooltip placement="bottom">
                  <p className="m-0 p-0 text-sml">
                    Notícia fixada
                  </p>
                </Tooltip>
              }>
                <Badge
                  className={"position-absolute rounded-circle p-0 m-0 d-flex align-items-center justify-content-center"}
                  style={{height: 32, width: 32, top: "0.25rem", left: "0.25rem"}}
                >
                  <div>
                    <i className="bi bi-pin-angle-fill"></i>
                  </div>
                </Badge>
              </OverlayTrigger>
            )
          }
          <Image
            src={ns.img ?? "/news/marcopolo-44117.png"}
            alt={ns.title}
            className={"w-100 h-100 rounded-1 object-fit-cover mb-2"}
            style={{maxHeight: 150}}
          />
        </div>
        <div
          className={"position-absolute w-100 h-100 rounded-1"}
          style={{top: "0", left: "0", transform: "translate(0, -45%)", background: "#00000025", minHeight: 150}}
        >
        </div>
      </Link>
      <Card title={ns.title.replace(/</g, "")} subtitle={ns.resume} link={`/news/${ns.id}`}>
        {typeof ns.resume === "string" ? (Util.renderText(ns.content.toString().replace(/<\/?>/, ""))) : ns.content.map((item, i) => (<p key={i}>{Util.renderText(item)}</p>))}
      </Card>
    </div>
  )
}

LatestNewsItem.propTypes = {
  ns: PropTypes.object.isRequired
}

export default LatestNewsItem;
