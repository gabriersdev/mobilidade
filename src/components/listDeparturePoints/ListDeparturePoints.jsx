import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Alert from "../alert/Alert";
import Accordion from "../accordion/Accordion";
import AccordionItem from "../accordion/AccordionItem";

const ListDeparturePoints = ({line_id, departure_location, destination_location}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const searchDeparturePoints = async () => {
      try {
        const response = await axios.post(`http://localhost:3001/api/departure_points/`, {line_id: line_id}); // URL completa da sua API
        setData(response.data);
        // console.log('Dados carregados com sucesso:', response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError(error);
      } finally {
        setIsLoaded(false);
      }
    };

    searchDeparturePoints()
  }, []);

  if (isLoaded) {
    return <div>Carregando...</div>;
  } else if (error) {
    console.log(error)
    return <div>Erro: {error.message}</div>;
  } else if (data.length === 0) {
    return (
      <Alert variant={"info"}>
        <span>Não localizamos pontos de parada para esta linha.</span>
      </Alert>
    )
  } else {
    // Ordena os pontos de parada por direção e ordem
    const departurePoints = data.toSorted((a, b) => a.direction - b.direction).toSorted((a, b) => a.order_departure_point - b.order_departure_point);

    const uniqueDirections = data.map((item) => item.direction).filter((value, index, self) => self.indexOf(value) === index);

    const departurePointsByDirection = uniqueDirections.map((direction) => {
      return departurePoints.filter((item) => item.direction === direction);
    });

    return (
      // TODO - Implementar a listagem dos pontos de parada
      <Accordion defaultEventKey={['0']}>
        {
          uniqueDirections.map((direction, i) => {
            return (
              <AccordionItem
                key={i}
                title={direction === 1 ? `Sentido ida - ${departure_location} -> ${destination_location}` : `Sentido volta - ${destination_location} -> ${departure_location}`}
                eventKey={i.toString()}>
                <ul className="list-line-content">
                  {
                    departurePointsByDirection.map((pointsByDirection) => {
                      return pointsByDirection.map((point, j) => {
                        return (
                          <li key={j}>
                            <span>{point.address + (point.point_name ? " - " + point.point_name : "")} </span>
                          </li>
                        )
                      })
                    })
                  }
                </ul>
              </AccordionItem>
            )
          })
        }
      </Accordion>
    )
  }
}

ListDeparturePoints.propTypes = {
  line_id: PropTypes.number.isRequired,
  departure_location: PropTypes.string.isRequired,
  destination_location: PropTypes.string.isRequired
}

export default ListDeparturePoints;
