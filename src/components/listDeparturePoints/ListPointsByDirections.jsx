import AccordionItem from "../accordion/AccordionItem.jsx";
import {useContext} from "react";
import {RechargeContext as DeparturePointsTheme} from "./DeparturePointsContext.jsx";
import {Theme} from "../themeContext/ThemeContext.jsx";

const ListPointsByDirections = () => {
  const {uniqueDirections, departure_location, destination_location, departurePointsByDirection} = useContext(Theme);
  const {handlePointClick} = useContext(DeparturePointsTheme);

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
          <ul className="list-line-content list-group d-flex gap-2">
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
        </AccordionItem>
      )
    })
  )
}

export default ListPointsByDirections;
