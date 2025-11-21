import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import config from "../../config";
import Alert from "../alert/Alert";
import Accordion from "../accordion/Accordion";
import OffcanvasDeparturePoints from "./OffcanvasDeparturePoints.jsx";
import {ThemeContext} from "../themeContext/ThemeContext.jsx";
import ListPointsByDirections from "./ListPointsByDirections.jsx";
import {DeparturePointsContext} from "./DeparturePointsContext.jsx";
import RouteMap from "../routeMap/RouteMap.jsx";
import AnimatedComponents from "../animatedComponent/AnimatedComponents.jsx";

const ListDeparturePoints = ({line_id, departure_location, destination_location}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  
  useEffect(() => {
    const searchDeparturePoints = async () => {
      try {
        const response = await axios.post(`${config.host}/api/departure_points/`, {line_id: line_id}); // URL completa da sua API
        setData(response.data);
        // console.log('Dados carregados com sucesso:', response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError(error);
      } finally {
        setIsLoaded(false);
      }
    };
    
    searchDeparturePoints().then(() => {});
  }, [line_id]);
  
  if (isLoaded) return <AnimatedComponents><div>Carregando...</div></AnimatedComponents>;
  else if (error) {
    console.log(error)
    return <AnimatedComponents><div>Erro: {error.message}</div></AnimatedComponents>;
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
        <ThemeContext value={Object.assign({}, {
          departure_location,
          destination_location,
          uniqueDirections,
          departurePointsByDirection
        })}>
          <RouteMap/>
          <Accordion id={"departure-points-data"} defaultEventKey={["0"]}>
            <OffcanvasDeparturePoints/>
            <ListPointsByDirections/>
          </Accordion>
        </ThemeContext>
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
