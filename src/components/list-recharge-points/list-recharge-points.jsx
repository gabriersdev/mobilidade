import '@/components/list-recharge-points/list-recharge-points.css';

import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {FormGroup, FormLabel, FormSelect, Placeholder} from "react-bootstrap";

import apiClient from "@/assets/axios-config.js";
import Alert from "@/components/ui/alert/alert.jsx";
import ListPoints from "@/components/list-recharge-points/list-points.jsx";
import AnimatedComponents from "@/components/ui/animated-component/animated-components.jsx";
import {RechargePointsContext} from "@/components/list-recharge-points/recharge-points-context.jsx";
import OffCanvasRechargePoints from "@/components/list-recharge-points/off-canvas-recharge-points.jsx";

function ListRechargePoints({id_company}) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    let isCancelled = false;

    async function searchRechargePoints() {
      if (!id_company) {
        setData([]);
        setError(null);
        setIsLoaded(false);
        return;
      }

      setIsLoaded(true);
      setError(null);
      setData([]);
      try {
        const response = await apiClient.post(
          `/recharge_points/`,
          {id_company: id_company},
          {signal: controller.signal}
        );
        if (!isCancelled) {
          setData(Array.isArray(response.data) ? response.data : []);
        }
      } catch (err) {
        if (!isCancelled && err.code !== 'ERR_CANCELED') {
          console.error('Erro ao buscar dados:', err);
          setError(err);
        }
      } finally {
        if (!isCancelled) {
          setIsLoaded(false);
        }
      }
    }

    searchRechargePoints();

    return () => {
      isCancelled = true;
      controller.abort();
    };
  }, [id_company]);

  if (isLoaded) {
    return (
      <AnimatedComponents>
        <Placeholder as="div" animation="glow" className="mt-3">
          <Placeholder xs={12} className="mb-2"/>
          <Placeholder xs={10} className="mb-2"/>
          <Placeholder xs={8}/>
        </Placeholder>
      </AnimatedComponents>
    );
  }

  if (error) {
    return (
      <AnimatedComponents>
        <Alert variant={"danger"}>
          <span>Não foi possível carregar os pontos de recarga. Tente novamente mais tarde.</span>
        </Alert>
      </AnimatedComponents>
    );
  }

  if (data.length === 0) {
    return (
      <AnimatedComponents>
        <Alert variant={"info"}>
          <span>Não localizamos pontos de recarga para esta linha.</span>
        </Alert>
      </AnimatedComponents>
    );
  }

  return (
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
  );
}

ListRechargePoints.propTypes = {
  id_company: PropTypes.number,
};

export default ListRechargePoints;
