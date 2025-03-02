import {useParams} from "react-router-dom";
import Alert from "../../components/alert/Alert.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import config from "../../config.js";
import FeedbackError from "../../components/feedbackError/FeedbackError.jsx";
import Title from "../../components/title/Title.jsx";

const Company = () => {
  const {id} = useParams();
  const [error, setError] = useState(null);
  const [loaded, setIsLoaded] = useState(true);
  const [data, setData] = useState(null);

  const checkIsValid = (id) => {
    if (!id) return false
    if (!id.length) return false
    return id.match(/\d/g)
  }

  const getData = async (id) => {
    try {
      const response = await axios.post(`${config.host}/api/company/`, {company_id: id});
      setData(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setError(error);
    } finally {
      setIsLoaded(false);
    }
  }

  useEffect(() => {
    if (!checkIsValid(id)) {
      return (
        <Alert variant={'danger'} margin={"mt-0"}>
          <span>ID da companhia não informado.</span>
        </Alert>
      );
    }

    getData(id).then(() => {});
  }, [id])

  if (loaded) {
    return <>Carregando...</>
  } else if (error) {
    console.error(error);
    return <FeedbackError code={error.response ? error.response.status || 500 : 500} text={error.message} type={'card'}/>;
  } else if (data.length === 0) {
    return (
      <Alert variant={'danger'} margin={"mt-0"}>
        <span>Companhia não encontrada.</span>
      </Alert>
    );
  } else {
    const countLines = data[0].count_lines_actives;
    return <>
      <span className={"text-body-secondary"}>Companhia</span>
      <Title type="h2" classX=" fs-2 d-inline text-body-emphasis mt-1 p-0 d-block">
        <span className="text-balance" style={{fontSize: "inherit"}}>
          {data[0].company_name}
        </span>
      </Title>
      <section className={"d-flex gap-5 mt-5 flex-column"}>
        <div className="d-flex flex-column gap-1">
          <span className={"text-body-tertiary"}>Contato</span>
          <span className={""}>{data[0].contact || 'Informação não cadastrada.'}</span>
        </div>
        <div className="d-flex flex-column gap-1">
          <span className={"text-body-tertiary"}>Observações</span>
          <span className={""}>{countLines ? `${countLines} ${countLines > 0 ? "linhas" : "linha"} operadas pela companhia.` : 'Opera linhas de transporte público no estado de Minas Gerais.'}</span>
        </div>
      </section>
    </>;
  }
}

export default Company;
