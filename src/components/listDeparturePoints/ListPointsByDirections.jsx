import {useContext, useEffect} from "react";
import AccordionItem from "../accordion/AccordionItem.jsx";
import {RechargeContext as DeparturePointsTheme} from "./DeparturePointsContext.jsx";
import {Theme} from "../themeContext/ThemeContext.jsx";
import {Context as LineContext} from "../line/LineContext.jsx";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const ListPointsByDirections = () => {
  const {uniqueDirections, departure_location, destination_location, departurePointsByDirection} = useContext(Theme);
  const {handlePointClick} = useContext(DeparturePointsTheme);
  const {setFirstPointByDirection} = useContext(LineContext);
  
  useEffect(() => {
    let direction;
    
    // Adiciona o primeiro ponto de parada do sentido para que seja usado como referência para o usuário saber de onde o ônibus sai
    for (direction in uniqueDirections) {
      const firstPoint = departurePointsByDirection[direction][0]
      if (firstPoint) {
        setFirstPointByDirection((prev) => ({
          ...prev,
          [uniqueDirections[direction]]: firstPoint,
        }))
      }
    }
  }, [])
  
  return (
    uniqueDirections.map((direction, i) => {
      return (
        <AccordionItem
          key={i}
          title={
            direction === 1 ? (`Sentido ida - ${departure_location} -> ${destination_location}`) :
              direction === 0 ? (`Sentido único - ${departure_location} <-> ${destination_location} (ida e volta)`) :
                direction === 2 ? (`Sentido volta - ${destination_location} -> ${departure_location}`) : ""
          }
          eventKey={i.toString()}>
          <ul className="list-line-content list-group d-flex gap-2 ms-3">
            {
              departurePointsByDirection[i].map((point, j) => {
                return (
                  <li key={j}>
                    <button
                      onClick={e => handlePointClick(e, {
                        address: point.address,
                        point_name: point.point_name,
                        points_lenght: departurePointsByDirection[i].length,
                        point_ordenation: j
                      })}
                      className={"p-0 border-0 bg-transparent list-group-item text-body"}
                      role={"link"}
                      tabIndex={-1}
                      style={{textDecoration: 'none', textAlign: 'left'}}
                    >
                      {point.address + (point.point_name ? " - " + point.point_name : "")}
                    </button>
                  </li>
                )
              })
            }
          </ul>
          <div className={"d-flex gap-2 flex-wrap align-items-center mt-4"}>
            <OverlayTrigger overlay={<Tooltip>Não houve alteração nos pontos de paradas</Tooltip>}>
              <span><i className="bi bi-dash-circle-fill text-primary"></i></span>
            </OverlayTrigger>
            <span className={"d-inline-block text-muted"}>{departurePointsByDirection[i].length.toLocaleString()} pontos de paradas neste sentido.</span>
          </div>
        </AccordionItem>
      )
    })
  )
}

export default ListPointsByDirections;
