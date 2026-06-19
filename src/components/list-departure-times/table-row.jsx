import {useContext} from "react";
import PropTypes from "prop-types";
import {Badge} from "react-bootstrap";
import data from "../../assets/data.js";
import {TimeContext} from "./departure-time-context.jsx";
import DepartureTimeIndicator from "./departure-time-indicator.jsx";

const TableRow = ({ row, directionName, direction, dayName, tableIndex, type }) => {
  const { defaultEventKey, handlePointClick } = useContext(TimeContext);
  const bootstrapBGColors = data.bootstrap.bg.colors;
  
  return (
    <tr>
      {row.map((item, timeOrder) => (
        <td
          key={`${item.departureTime}-${timeOrder}`}
          onClick={(e) =>
            handlePointClick(e, {
              time: item.departureTime,
              timeOrder,
              timeLength: row.length,
              directionName,
              direction,
              dayName,
              observations: item.observations?.map((observation) => ({
                abrev: observation.abrev,
                label: observation.label,
              })),
            })
          }
          style={{ cursor: "pointer" }}
        >
          <div className="d-flex align-items-center">
            {item.departureTime}
            
            <DepartureTimeIndicator
              departureTime={item.departureTime}
              tableIndex={tableIndex}
              defaultEventKey={defaultEventKey}
              type={type}
            />
            
            {item.observations?.map((observation, i) => (
              <Badge key={i} className="ms-1 rounded-pill" bg={bootstrapBGColors[observation.index]}>
                {observation.abrev}
              </Badge>
            ))}
          </div>
        </td>
      ))}
    </tr>
  );
};

TableRow.propTypes = {
  row: PropTypes.array.isRequired,
  directionName: PropTypes.string.isRequired,
  direction: PropTypes.number.isRequired,
  dayName: PropTypes.string.isRequired,
  tableIndex: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["history", "current"]),
};

export default TableRow;
