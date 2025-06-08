import {useParams} from "react-router-dom";
import Alert from "../../components/alert/Alert.jsx";
import {useEffect, useState} from "react";
import FeedbackError from "../../components/feedbackError/FeedbackError.jsx";
import Title from "../../components/title/Title.jsx";
import AnimatedComponents from "../../components/animatedComponent/AnimatedComponents.jsx";
import NewsC from '../../components/news/News.jsx';

const RenderNews = () => {
  const {id} = useParams();
  const [error, setError] = useState(null);
  const [loaded, setIsLoaded] = useState(true);
  const [data, setData] = useState([]);
  const [linesData, setLinesData] = useState([]);
  
  const checkIsValid = (id) => {
    if (!id) return false
    if (!id.length) return false
    return id.match(/\d/g)
  }
  
  useEffect(() => {
    setIsLoaded(false);
  }, [id])
  
  useEffect(() => {
    document.title = "Mobilidade - Notícias";
  }, [])
  
  if (loaded) {
    return <>Carregando...</>
  } else if (error) {
    console.error(error);
    return <FeedbackError code={error.response ? error.response.status || 500 : 500} text={error.message} type={'card'}/>;
  } else if (data.length === 0) {
    return <Alert variant={'danger'} margin={"mt-0"}><span>Notícia não encontrada.</span></Alert>;
  } else {
    return <></>
  }
}

const News = () => {
  useEffect(() => {
    const dataNewsItem = document.querySelector('.breadcrumb-item:nth-child(2)')
    if (dataNewsItem) dataNewsItem.querySelector('a').textContent = `Notícias`;
  }, [])
  
  return (
    <AnimatedComponents>
      <Title classX={" text-body-secondary"}>Notícias</Title>
      <div className="mt-lg-5 d-flex flex-column gap-5">
        {
          [
            {
              title: "Linha 4992 Sabará <-> Terminal São Gabriel deixa de operar nesta segunda (02/06)",
              resume: "Os horários foram transferidos para a linha 4991. Veja o que muda para os passageiros.",
              content: [
                "Os passageiros que usavam a linha 4992, Sabará <-> Terminal São Gabriel Via Av. José Cândido da Silveira acordaram na manhã dessa segunda (02/05) com a notícia que a linha havia sido suspensa",
                "A linha operava somente durante a semana, desde 2021 e existia desde 2016. As viagens partiam do bairro Siderúrgica, no centro da cidade, passando pela Av. José Cândido da Silveira, depois pela Av. Cristiano Machado e o Terminal São Gabriel e voltava, terminando a viagem no Terminal Rodoviário de Sabará.",
                "O motivo da desativação da linha não foi oficializado, mas provavelmente ocorreu pela baixa adesão do público, já que boa parte do percurso também é feito pelas outras linhas da Viação Cuiabá.",
                "Os horários de partida foram transferidos para a linha 4991 - Sabará <-> Terminal São Gabriel Via Barraguinha. Durante os dias úteis, os horários que antes eram da linha 4992 foram transferidos para a 4991, que agora opera entre as 04h55 e 00h em dias úteis. <Link to={\"/lines/18#partidas\"}>Confira o quadro de horários atualizado da linha 4991.</Link>"
              ],
              img: "",
              id: 1,
              publishDate: "2025-06-02T00:00:00.000-03:00",
            }
          ].map((item, index) => (
            <div className={"border-bottom border-secondary-subtle pb-5"} key={index}>
              <NewsC {...item}/>
            </div>
          ))
        }
      </div>
    </AnimatedComponents>
  )
}

export default News;
