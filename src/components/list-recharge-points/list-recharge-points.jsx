import './list-recharge-points.css';

import axios from "axios";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {FormGroup, FormLabel, FormSelect} from "react-bootstrap";

import Grid from "../ui/grid/grid.jsx";
import Card from "../ui/card/card.jsx";
import config from "../../assets/config.js";
import ListPoints from "./list-points.jsx";
import AnimatedComponents from "../ui/animated-component/animated-components.jsx";
import {RechargePointsContext} from "./recharge-points-context.jsx";
import OffCanvasRechargePoints from "./off-canvas-recharge-points.jsx";

const ListRechargePoints = ({id_company, company_name}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  
  useEffect(() => {
    const searchRechargePoints = async () => {
      try {
        const response = await axios.post(`${config.host}/api/recharge_points/`, {id_company: id_company}); // URL completa da sua API
        setData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError(error);
      } finally {
        setIsLoaded(false);
      }
    }
    
    searchRechargePoints().then(()=> {});
  }, [id_company]);
  
  if (isLoaded) {
    return (
      <AnimatedComponents>
        <Grid>
          <Card title="Carregando" subtitle="Aguarde...">Estamos conectando ao banco de dados. Esse processo geralmente é
            rápido. Por favor, aguarde alguns instantes.</Card>
        </Grid>
      </AnimatedComponents>
    )
  } else if (error) {
    console.log(error)
    return (
      <AnimatedComponents>
        <Grid>
          <Card title="Erro" subtitle="Não foi possível carregar os pontos de recarga">Houve um erro ao carregar os pontos
            de recarga. Por favor, tente novamente mais tarde.</Card>
        </Grid>
      </AnimatedComponents>
    )
  } else if (data.length === 0) {
    return (
      <AnimatedComponents>
        <Grid>
          <Card title="Opa!"
                subtitle={`Nenhum ponto de recarga encontrado`}>{`Não há pontos de recarga cadastrados para a concessionária ${company_name}.`}</Card>
        </Grid>
      </AnimatedComponents>
    )
  } else {
    return (<>
      <RechargePointsContext>
        <AnimatedComponents>
          <OffCanvasRechargePoints/>
          <FormGroup className={"mb-4 gap-1 flex-wrap d-none"}>
            <FormLabel column={"sm"} htmlFor={"#city-recharge"} className={"fs-6 text-body-tertiary pe-1"}>Na cidade de</FormLabel>
            <FormSelect style={{width: "min(100%, 300px)", background: "inherit !important"}} id={"city-recharge"} disabled={true} className={"p-0 m-0 border-0 bg-body"}>
              <option value={"1"} defaultValue={"1"}>Sabará</option>
            </FormSelect>
          </FormGroup>
          <ListPoints data={data}/>
        </AnimatedComponents>
      </RechargePointsContext>
    </>)
  }
}

ListRechargePoints.propTypes = {
  id_company: PropTypes.number.isRequired, company_name: PropTypes.string.isRequired,
}

export default ListRechargePoints;
