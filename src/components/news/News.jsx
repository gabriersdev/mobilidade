import Title from "../title/Title.jsx";
import Util from "../../assets/Util.jsx";
import PropTypes from "prop-types";
import {Image} from "react-bootstrap";
import moment from "moment";

const News = ({title, resume, content, img, id, publishDate}) => {
  return (
    <section className={"d-flex flex-column gap-3 align-items-start"} key={id}>
      <hgroup className="d-flex flex-column gap-1">
        <Title type={"h2"} classX={" text-balance text-body"}>{Util.renderText(title)}</Title>
        <p className={"text-body-tertiary m-0 p-0"}>Sabárá, {Util.renderText(moment(publishDate).format("DD/MM/YY"))} | {Util.renderText(resume)}</p>
      </hgroup>
      <>
        {
          img && (
            <Image src={img} className={"h-50 object-fit-contain rounded-3"} alt={`Imagem da notícia ${title}`}/>
          )
        }
      </>
      {
        [...content].map((item, index) => (
          <p className={"text-body-secondary m-0 p-0"} key={index}>
            {Util.processContents(item)}
          </p>
        ))
      }
    </section>
  )
}

News.propTypes = {
  title: PropTypes.string,
  resume: PropTypes.string,
  content: PropTypes.arrayOf(PropTypes.string),
  img: PropTypes.string,
  id: PropTypes.number,
  publishDate: PropTypes.string.isRequired,
}

export default News;
