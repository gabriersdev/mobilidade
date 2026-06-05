import {useEffect, useState} from "react";
import PropTypes from "prop-types";

import apiClient from "@/assets/axios-config.js";

import Alert from "@/components/ui/alert/alert.jsx";
import RouteMap from "@/components/route-map/route-map.jsx";
import Accordion from "@/components//ui/accordion/accordion.jsx";
import AnimatedComponents from "@/components/ui/animated-component/animated-components.jsx";
import ListPointsByDirections from "@/components/list-departure-points/list-points-by-directions.jsx";
import {DeparturePointsContext, DeparturePointsDataContext} from "@/components/list-departure-points/departure-points-context.jsx";
import OffCanvasDeparturePoints from "@/components/list-departure-points/off-canvas-departure-points.jsx";

const ListDeparturePoints = ({line_id, departure_location, destination_location}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [paginationCurrentPages, setPaginationCurrentPages] = useState({});
  
  const handlePageChange = (key, page) => {
    setPaginationCurrentPages(prev => ({...prev, [key]: page}));
  };
  
  useEffect(() => {
    const searchDeparturePoints = async () => {
      try {
        const response = await apiClient.post(`/departure_points/`, {line_id: line_id}); // URL completa da sua API
        setData(response.data);
        // console.log('Dados carregados com sucesso:', response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError(error);
      } finally {
        setIsLoaded(false);
      }
    };
    
    searchDeparturePoints().then(() => {
    });
  }, [line_id]);
  
  // TODO - aplicar placeholder
  if (isLoaded) return <AnimatedComponents>
    <div>Carregando...</div>
  </AnimatedComponents>;
  else if (error) {
    console.log(error)
    return <AnimatedComponents>
      <div>Erro: {error.message}</div>
    </AnimatedComponents>;
  } else if (data.length === 0) return <AnimatedComponents><Alert variant={"info"}><span>Não localizamos pontos de parada para esta linha.</span></Alert></AnimatedComponents>
  else {
    // Ordena os pontos de parada por direção e ordem
    const departurePoints = data.toSorted((a, b) => a.order_departure_point - b.order_departure_point);
    
    const uniqueDirections = data.map((item) => item.direction).filter((value, index, self) => self.indexOf(value) === index);
    
    const departurePointsByDirection = uniqueDirections.map((direction) => {
      return departurePoints.filter((item) => item.direction === direction);
    });
    
    return (
      <DeparturePointsContext>
        {/* Lista os sentidos da linha e os pontos de parada que correspondentes */}
        <DeparturePointsDataContext.Provider value={Object.assign({}, {
          departure_location,
          destination_location,
          uniqueDirections,
          departurePointsByDirection,
          paginationCurrentPages,
          handlePageChange
        })}>
          <RouteMap/>
          <Accordion id={"departure-points-data"}>
            <OffCanvasDeparturePoints/>
            <ListPointsByDirections/>
            <div className={"mt-2"}>
              <p className={"d-block text-body-tertiary text-sml m-0 p-0 text-balance"}>Os pontos de partida são atualizados ocasionalmente via integração com o Moovit.</p>
            </div>
          </Accordion>
        </DeparturePointsDataContext.Provider>
      </DeparturePointsContext>
    )
  }
}

ListDeparturePoints.propTypes = {
  line_id: PropTypes.number.isRequired,
  departure_location: PropTypes.string.isRequired,
  destination_location: PropTypes.string.isRequired
}

export {ListDeparturePoints};
