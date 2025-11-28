import {useCallback, useContext, useEffect} from "react";
import AccordionItem from "../ui/accordion/accordion-item.jsx";
import {DPContext as DeparturePointsTheme} from "./departure-points-context.jsx";
import {Theme} from "../ui/theme-context/theme-context.jsx";
import {Context as LineContext} from "../line/line-context.jsx";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import PaginationWithItems from "../pagination-with-items/pagination-with-items.jsx";

const ListPointsByDirections = () => {
  const {uniqueDirections, departure_location, destination_location, departurePointsByDirection} = useContext(Theme);
  const {handlePointClick} = useContext(DeparturePointsTheme);
  const {setFirstPointByDirection} = useContext(LineContext);
  
  const mapDeparturePoints = useCallback((point, index, parentIndex) => {
    return (
      <li key={index}>
        <button
          onClick={e => handlePointClick(e, {
            address: point.address,
            point_name: point.point_name,
            // TODO - test it: points_lenght: departurePointsByDirection[j].length,
            points_length: departurePointsByDirection[parentIndex].length,
            point_order: index,
            departure_point_id: point?.["departure_point_id"] ?? -1
          })}
          className={"p-0 border-0 bg-transparent list-group-item text-body"}
          role={"link"}
          tabIndex={-1}
          style={{textDecoration: 'none', textAlign: 'left'}}
        >
          {(point.address + (point.point_name ? " - " + point.point_name : "")).replaceAll("/", " - ")}
        </button>
      </li>
    )
  }, []);
  
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
  }, []);
  
  return (
    uniqueDirections.map((direction, i) => {
      return (
        <AccordionItem
          key={i}
          title={
            direction === 1 ? (`Sentido ida - ${departure_location} -> ${destination_location}`) :
              direction === 0 ? (`Sentido único - ${departure_location} ⇄ ${destination_location} (ida e volta)`) :
                direction === 2 ? (`Sentido volta - ${destination_location} -> ${departure_location}`) : ""
          }
          eventKey={i.toString()}>
          <ul className="list-line-content list-group d-flex gap-2 ms-md-3">
            <div className={"hide-print"}>
              <PaginationWithItems items={departurePointsByDirection[i].map((m, index) => mapDeparturePoints(m, index, i))} itemsPerPage={10}/>
            </div>
            <div className={"show-print"}>
              {departurePointsByDirection[i].map((m, index) => mapDeparturePoints(m, index, i))}
            </div>
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
