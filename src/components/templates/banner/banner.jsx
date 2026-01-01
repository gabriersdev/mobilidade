import {Link} from "react-router-dom";
import {Badge} from "react-bootstrap";
import PropTypes from "prop-types";

import Title from "../../ui/title/title.jsx";
import AnimatedComponents from "../../ui/animated-component/animated-components.jsx";

export default function Banner({data}) {
  return (
    <AnimatedComponents className={"h-100"}>
      <Link to={data.link} className={`pt-4 px-4 pb-4 ${data.bg} rounded-3 border ${data.border} d-flex flex-column gap-3 text-decoration-none h-100`}>
        <div className={"d-flex flex-column gap-4 align-items-start"}>
          <Badge className={`badge ${data.bgBadge} ${data.colorTextBadge ? data.colorTextBadge : "text-body"} fw-normal fs-6 rounded-pill`}>{data.textBadge}</Badge>
          <Title type={"h2"} classX={` fs-3 m-0 p-0 ${data.colorEmphasis}`}>{data.title}</Title>
        </div>
        <div>
          <p className={`lh-base text-balance m-0 ${data.colorEmphasis}`} style={{maxWidth: "580px"}}>{data.text}</p>
        </div>
      </Link>
    </AnimatedComponents>
  )
}

Banner.propTypes = {
  data: PropTypes.shape({
    link: PropTypes.string.isRequired,
    bg: PropTypes.string.isRequired,
    border: PropTypes.string.isRequired,
    bgBadge: PropTypes.string.isRequired,
    colorTextBadge: PropTypes.string,
    textBadge: PropTypes.string.isRequired,
    colorEmphasis: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired
}
