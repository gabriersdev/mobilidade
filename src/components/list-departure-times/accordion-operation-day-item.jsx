import PropTypes from "prop-types";
import {Badge, OverlayTrigger, Tooltip} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import Util from "@/lib/Util.jsx";
import AccordionItem from "@/components/ui/accordion/accordion-item.jsx";
import Table from "@/components/list-departure-times/table-departure-times.jsx";
import Legend from "@/components/ui/legend/legend.jsx";
import NoDepartureTimes from "@/components/list-departure-times/no-departure-times.jsx";

const AccordionOperationDayItem = ({
  j, dayConverted, isToday, totalItems, departureTimesDay,
  directionName, observations, type
}) => {
  const navigation = useLocation();
  
  const classes = ['border-top'];
  if (totalItems === 1) classes.push('border-bottom', 'rounded');
  else if (j === 0) classes.push('border-bottom-0', 'rounded-top');
  else if (j === totalItems - 1) classes.push('border-bottom', 'rounded-bottom');
  else classes.push('border-bottom-0');
  
  const className = classes.join(' ');
  
  return (
    <div>
      <NoDepartureTimes isFirst={j === 0}/>
      <div>
        <AccordionItem
          eventKey={j.toString()}
          className={className}
          title={
            <span>
              {dayConverted}{" "}
              {isToday && !navigation.pathname.startsWith("/history/") && (
                <OverlayTrigger overlay={<Tooltip><span className={"text-sml"}>Este é o itinerário de hoje</span></Tooltip>}>
                  <Badge bg={"primary"} className={"rounded-pill border-0"}>HOJE</Badge>
                </OverlayTrigger>
              )}
            </span>
          }
        >
          <Table
            content={{
              data: departureTimesDay.map((item) => ({
                departureTime: Util.formatTime(`2020-01-01 ${item["departure_time"]}`, 'HH:mm'),
                observations: item.observations ? item.observations : null
              })),
              directionName: directionName,
              dayName: dayConverted
            }}
            observations={observations}
            tableIndex={j}
          />
          <Legend items={observations} type={type || "current"}/>
          <span className={"text-body-secondary mt-4 text-sml d-block text-balance"}>
            {departureTimesDay.length.toLocaleString()} horários de partidas no horário de {dayConverted.substring(0, 1).toLowerCase() + dayConverted.substring(1)}.
          </span>
        </AccordionItem>
      </div>
    </div>
  );
};

AccordionOperationDayItem.propTypes = {
  j: PropTypes.number.isRequired,
  dayConverted: PropTypes.string.isRequired,
  isToday: PropTypes.bool.isRequired,
  totalItems: PropTypes.number.isRequired,
  departureTimesDay: PropTypes.array.isRequired,
  directionName: PropTypes.string.isRequired,
  observations: PropTypes.array,
  type: PropTypes.string
};

export default AccordionOperationDayItem;
