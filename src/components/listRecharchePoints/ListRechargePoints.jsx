import './listRechargePoints.css';

import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import config from "../../config";
import Grid from "../grid/Grid";
import Card from "../card/Card";
import OffcanvasRechargePoints from "./OffcanvasRechargePoints";
import {RecharchePointsContext} from "./RecharchePointsContext";
import ListPoints from "./ListPoints";
import {FormGroup, FormLabel, FormSelect} from "react-bootstrap";

const ListRechargePoints = ({id_company, company_name}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const searchRecharchePoints = async () => {
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

    searchRecharchePoints()
  }, [id_company]);

  if (isLoaded) {
    return (<Grid>
      <Card title="Carregando" subtitle="Aguarde...">Estamos conectando ao banco de dados. Esse processo geralmente é
        rápido. Por favor, aguarde alguns instantes.</Card>
    </Grid>)
  } else if (error) {
    console.log(error)
    return (<Grid>
      <Card title="Erro" subtitle="Não foi possível carregar os pontos de recarga">Houve um erro ao carregar os pontos
        de recarga. Por favor, tente novamente mais tarde.</Card>
    </Grid>)
  } else if (data.length === 0) {
    return (<Grid>
      <Card title="Opa!"
            subtitle={`Nenhum ponto de recarga encontrado`}>{`Não há pontos de recarga cadastrados para a concessionária ${company_name}.`}</Card>
    </Grid>)
  } else {
    return (<>
      <RecharchePointsContext>
        <OffcanvasRechargePoints/>
        <FormGroup className={"mb-4 gap-1 flex-wrap"}>
          <FormLabel column={"sm"} htmlFor={"#city-recharge"} className={"fs-6 text-body-tertiary pe-1"}>Na cidade de</FormLabel>
          <FormSelect style={{width: "min(100%, 300px)", background: "inherit !important"}} id={"city-recharge"} disabled={true} className={"p-0 m-0 border-0 bg-body"}>
            <option value={"1"} defaultValue={"1"}>Sabará</option>
          </FormSelect>
        </FormGroup>
        <ListPoints data={data}/>
      </RecharchePointsContext>
    </>)
  }
}

ListRechargePoints.propTypes = {
  id_company: PropTypes.number.isRequired, company_name: PropTypes.string.isRequired,
}

export default ListRechargePoints;
