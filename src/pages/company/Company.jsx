import {Link, Navigate, useParams} from "react-router-dom";
import Alert from "../../components/alert/Alert.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import config from "../../config.js";
import FeedbackError from "../../components/feedbackError/FeedbackError.jsx";
import Title from "../../components/title/Title.jsx";
import {Badge} from "react-bootstrap";
import AnimatedComponents from "../../components/animatedComponent/AnimatedComponents.jsx";

const RenderCompany = () => {
  const {id} = useParams();
  const [error, setError] = useState(null);
  const [loaded, setIsLoaded] = useState(true);
  const [data, setData] = useState([{company_name: "", count_lines_actives: 0, contact: null, report_contact: null}]);
  const [linesData, setLinesData] = useState([]);
  
  const checkIsValid = (id) => {
    if (!id) return false
    if (!id.length) return false
    return id.match(/\d/g)
  }
  
  const getData = async (id) => {
    try {
      const response = await axios.post(`${config.host}/api/company/`, {company_id: id});
      const lines = await axios.post(`${config.host}/api/company/lines`, {company_id: id});
      
      setData(response.data);
      setLinesData(lines.data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setError(error);
    } finally {
      setIsLoaded(false);
    }
  }
  
  useEffect(() => {
    if (!checkIsValid(id)) return <Alert variant={'danger'} margin={"mt-0"}>O id da companhia não foi informado.</Alert>
    
    getData(id).then(() => {
    });
  }, [id])
  
  useEffect(() => {
    document.title = "Mobilidade - Companhia";
  }, [])
  
  if (loaded) {
    return <>Carregando...</>
  } else if (error) {
    console.error(error);
    return <FeedbackError code={error.response ? error.response.status || 500 : 500} text={error.message} type={'card'}/>;
  } else if (data.length === 0) {
    return <Alert variant={'danger'} margin={"mt-0"}>Companhia não localizada.</Alert>;
  } else {
    document.title = `Mobilidade - Companha ${data[0].company_name}`;
    const countLines = data[0].count_lines_actives;
    
    const dataCompanyId = document.querySelector('.breadcrumb-item:nth-child(3)')
    if (dataCompanyId) dataCompanyId.querySelector('a').textContent = `${data[0].company_name}`;
    
    return (
      <AnimatedComponents>
        <span className={"text-body-secondary"}>Companhia</span>
        <Title type="h2" classX=" fs-2 d-inline text-body-emphasis mt-1 p-0 d-block">
        <span className="text-balance" style={{fontSize: "inherit"}}>
          {data[0].company_name}
        </span>
        </Title>
        
        <section className={"d-flex gap-5 mt-5 flex-column"}>
          <AnimatedComponents>
            <div className="d-flex flex-column gap-1">
              <span className={"text-body-tertiary"}>Contato</span>
              <span className={""}>{data[0].contact || 'Informação não cadastrada.'}</span>
            </div>
            <div className="d-flex flex-column gap-1">
              <span className="text-body-tertiary">Canal de reclamações</span>
              <Link to={data[0].report_contact} rel={"noreferrer noopener"}>{new URL(data[0].report_contact).origin?.replace(/(https:\/\/)|\//g, "") || "Informação não cadastrada."}</Link>
            </div>
            <div className="d-flex flex-column gap-1">
              <span className={"text-body-tertiary"}>Observações</span>
              <span className={""}>
              {countLines ? `${countLines} ${countLines > 0 ? "linhas" : "linha"} operadas pela companhia.` : 'Opera linhas de transporte público no estado de Minas Gerais.'}
            </span>
            </div>
            <div className="d-flex flex-column gap-1">
              <span className={"text-body-tertiary"}></span>
              <div className={"d-flex flex-wrap column-gap-2 row-gap-3"}>
                {linesData ? linesData.map((line, index) => (
                  <Badge key={index} variant="primary" className={"rounded-5 fw-light text-decoration-none"} style={{letterSpacing: '0.5px'}} as={Link} to={`/lines/${line.line_id}`}>
                    N.º {line.line_number}
                  </Badge>
                )) : ""}
              </div>
            </div>
          </AnimatedComponents>
        </section>
      </AnimatedComponents>
    );
  }
}

const Company = () => {
  if (!useParams()["id"]) {
    return <Navigate to="/" replace/>;
    // return <Alert variant={'danger'} margin={"mt-0"}><span>O id da companhia precisa ser informado.</span></Alert>;
  }
  
  return <RenderCompany/>
}

export default Company;
