import Title from "../title/Title.jsx";
import {Link} from "react-router-dom";
import Arial from "../arial/Arial.jsx";
import Util from "../../assets/Util.jsx";
import PropTypes from "prop-types";
import {Image} from "react-bootstrap";
import moment from "moment";

const News = ({title, resume, content, img, id, publishDate}) => {
  return (
    <section className={"d-flex flex-column gap-3"} key={id}>
      <hgroup className="d-flex flex-column gap-1">
        <Title type={"h2"} classX={" text-balance"}>{Util.renderText(title)}</Title>
        <p className={"text-body-tertiary m-0 p-0"}>Sabárá, {Util.renderText(moment(publishDate).format("DD/MM/YY"))} | {Util.renderText(resume)}</p>
      </hgroup>
      <>
        {
          img && (
            <Image src={img} className={""}/>
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

const ABC = () => {
  return (
    <section className={"d-flex flex-column gap-3"}>
      <hgroup className="d-flex flex-column gap-1">
        <Title type={"h2"} classX={" text-balance"}>Linha 4992 Sabará {"<->"} Terminal São Gabriel deixa de operar nesta segunda (02<Arial>/</Arial>05)</Title>
        <p className={"text-body-tertiary m-0 p-0"}>
          Os horários foram transferidos para a linha 4991. Veja o que muda para os passageiros.
        </p>
      </hgroup>
      {
        [
          (<>Os passageiros que usavam a linha 4992, Sabará {"<->"} Terminal São Gabriel Via Av. José Cândido da Silveira acordaram na manhã dessa segunda (02<Arial>/</Arial>05) com a notícia que a linha havia sido suspensa.</>),
          (<>A linha operava somente durante a semana, desde 2021 e existia desde 2016. As viagens partiam do bairro Siderúrgica, no centro da cidade, passando pela Av. José Cândido da Silveira, depois pela Av. Cristiano Machado e o Terminal São Gabriel e voltava, terminando a viagem no Terminal Rodoviário de Sabará.</>),
          (<>O motivo da desativação da linha não foi oficializado, mas provavelmente ocorreu pela baixa adesão do público, já que boa parte do percurso também é feito pelas outras linhas da Viação Cuiabá.</>),
          (<>Os horários de partida foram transferidos para a linha 4991 - Sabará {"<->"} Terminal São Gabriel Via Barraguinha. Durante os dias úteis, os horários que antes eram da linha 4992 foram transferidos para a 4991, que agora opera entre as 04h55 e 00h em dias úteis. <Link to={"/lines/18#partidas"}>Confira o quadro de horários atualizado da linha 4991.</Link></>),
        ].map((item, index) => (
          <p className={"text-body-secondary m-0 p-0"} key={index}>
            {item}
          </p>
        ))
      }
    </section>
  )
}

export default News;
