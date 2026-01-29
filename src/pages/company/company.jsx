import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Badge} from "react-bootstrap";
import axios from "axios";

import config from "../../assets/config.js";
import Alert from "../../components/ui/alert/alert.jsx";
import Title from "../../components/ui/title/title.jsx";
import Card from "../../components/ui/card/card.jsx";
import Grid from "../../components/ui/grid/grid.jsx";
import FeedbackError from "../../components/ui/feedbackError/feedback-error.jsx";
import AnimatedComponents from "../../components/ui/animated-component/animated-components.jsx";
import LineIdentificationCompanyLogo from "../../components/line-identification/line-identification-company-logo.jsx";
import { useBreadcrumb } from "../../components/breadcrumb-app/breadcrumb-context.jsx";

const RenderCompany = () => {
  const {id} = useParams();
  const [error, setError] = useState(null);
  const [loaded, setIsLoaded] = useState(true);
  const [data, setData] = useState([{company_name: "", count_lines_actives: 0, contact: null, report_contact: null}]);
  const [linesData, setLinesData] = useState([]);
  const { setLabel } = useBreadcrumb();
  
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
    document.title = `Mobilidade - Companhia ${data[0].company_name}`;
    const countLines = data[0].count_lines_actives;
    
    setLabel(id, data[0].company_name);
    
    return (
      <AnimatedComponents>
        <div className={"mb-3"}>
          <LineIdentificationCompanyLogo companyId={id}/>
        </div>
        <span className={"text-body-secondary"}>Companhia</span>
        <div>
          <Title classX=" fs-3 d-inline text-body-emphasis mt-1 p-0 d-block">
          <span className="text-balance" style={{fontSize: "inherit"}}>
            {data[0].company_name}
          </span>
          </Title>
        </div>
        
        <section className={"d-flex gap-5 mt-5 flex-column"}>
          <AnimatedComponents>
            <div className="d-flex flex-column gap-1">
              <span className={"text-body-tertiary"}>Contato</span>
              <span className={""}>{data[0].contact || 'Informação não cadastrada.'}</span>
            </div>
            <div className="d-flex flex-column gap-1">
              <span className="text-body-tertiary">Canal de reclamações</span>
              <Link to={data[0].report_contact} rel={"noreferrer noopener"}>{new URL(data[0].report_contact).origin?.replace(/(https:\/\/)|\/|www\./g, "") || "Informação não cadastrada."}</Link>
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
                  <Badge key={index} variant="primary" className={"rounded-5text-decoration-none"} style={{letterSpacing: '0.5px'}} as={Link} to={`/lines/${line.line_id}`}>
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
  document.title = `Mobilidade - Companhias`;
  
  const { setLabel } = useBreadcrumb();
  setLabel("company", "Companhias");
  
  if (!useParams()["id"]) {
    // return <Navigate to="/" replace/>;
    // return <Alert variant={'warning'} margin={"mt-0"}><span>O id da companhia precisa ser informado.</span></Alert>;
    return (
      <div className={"d-flex flex-column gap-5"}>
        <Title title="Companhias" id="topo" classX=" text-body-secondary"/>
        <Grid>
          {
            [
              ["3", "Vinscol", "Viação Nossa Senhora da Conceição", "A companhia Vinscol opera no transporte público dentro da cidade de Sabará-MG."],
              ["4", "Transporte Coletivo Metropolitano", "Transporte Coletivo Metropolitano", "A companhia Transporte Coletivo Metropolitano - MG opera no transporte público da RMBH."],
            ].map((cmp, index) => (
              <Card title={cmp[1]} subtitle={cmp[2]} link={`/company/${cmp[0]}`} key={index}>
                {cmp[3]}
              </Card>
            ))
          }
        </Grid>
      </div>
    )
  }
  
  return <RenderCompany/>
}

export default Company;
