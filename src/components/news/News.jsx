import Title from "../title/Title.jsx";
import {Link} from "react-router-dom";
import Arial from "../arial/Arial.jsx";
import Util from "../../assets/Util.jsx";
import PropTypes from "prop-types";
import {Image} from "react-bootstrap";

const processContents = (text) => {
  const regex = /<Link\s+to={(?:"|')([^"']+)(?:"|')}>(.*?)<\/Link>/g;
  const elements = [];
  let lastIndex = 0;
  let match;
  let key = 0;
  
  while ((match = regex.exec(text)) !== null) {
    const [fullMatch, to, content] = match;
    const index = match.index;
    
    // Texto anterior ao Link
    const beforeText = text.slice(lastIndex, index);
    if (beforeText) {
      elements.push(...wrapTextInArialIfNeeded(beforeText, key));
      key++;
    }
    
    const linkContent =
      content.includes("/") ? <Arial>{content}</Arial> : content;
    
    // TODO - usar o componente Link ao invés do link puro
    elements.push(
      <a key={`link-${key++}`} href={to}>
        {linkContent}
      </a>
    );
    
    lastIndex = index + fullMatch.length;
  }
  
  // Texto depois do último Link
  const afterText = text.slice(lastIndex);
  if (afterText) {
    elements.push(...wrapTextInArialIfNeeded(afterText, key));
  }
  
  return elements;
};

// Função auxiliar: envolve com Arial se tiver "/"
const wrapTextInArialIfNeeded = (text, keyPrefix) => {
  const parts = [];
  const split = text.split(/(\s+)/); // preserva espaços
  let key = 0;
  
  split.forEach((part) => {
    if (part.includes("/")) {
      const [before, after] = part.split("/")
      
      parts.push(<span key={`${keyPrefix}-a-${key++}`}><i className={"fst-normal fw-normal"}>{before}</i><Arial>/</Arial><i className={"fst-normal fw-normal"}>{after}</i></span>);
    } else {
      parts.push(<span key={`${keyPrefix}-s-${key++}`}>{part}</span>);
    }
  });
  
  return parts;
};

const News = ({title, resume, content, img, id}) => {
  return (
    <section className={"d-flex flex-column gap-3"} key={id}>
      <hgroup className="d-flex flex-column gap-1">
        <Title type={"h2"} classX={" text-balance"}>{Util.renderText(title)}</Title>
        <p className={"text-body-tertiary m-0 p-0"}>{Util.renderText(resume)}</p>
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
            {processContents(item)}
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
