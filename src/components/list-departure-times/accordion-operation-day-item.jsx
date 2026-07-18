import PropTypes from "prop-types";
import {Badge, OverlayTrigger, Tooltip} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import Util from "@/lib/Util.jsx";
import AccordionItem from "@/components/ui/accordion/accordion-item.jsx";
import Table from "@/components/list-departure-times/table-departure-times.jsx";
import Legend from "@/components/ui/legend/legend.jsx";
import NoDepartureTimes from "@/components/list-departure-times/no-departure-times.jsx";
import {useEffect, useState} from "react";

const AccordionOperationDayItem = (
  {
    j, dayConverted, isToday, totalItems, departureTimesDay,
    directionName, observations, type
  }
) => {
  
  const [infosIntervalDeparturesTimes, setInfosIntervalDeparturesTimes] = useState(0);
  const navigation = useLocation();
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (departureTimesDay.length) setInfosIntervalDeparturesTimes(Util.compareIntervals(departureTimesDay));
  }, [departureTimesDay])
  
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
            <div className={"d-flex align-items-center gap-2 justify-content-between w-100 flex-wrap"}>
              <div className={"d-flex align-items-center gap-2 justify-content-center"}>
                {dayConverted}{" "}
                {isToday && !navigation.pathname.startsWith("/history/") && (
                  <OverlayTrigger overlay={<Tooltip><span className={"text-sml lh-base d-block text-balance"}>Este é o itinerário de hoje</span></Tooltip>}>
                    <Badge bg={"primary"} className={"rounded-pill border-0"}>HOJE</Badge>
                  </OverlayTrigger>
                )}
              </div>
              <div className={"d-flex align-items-center gap-2 justify-content-center me-2"}>
                <OverlayTrigger overlay={<Tooltip><span className={"text-sml lh-base d-block text-balance"}>A média do intervalo entre partidas</span></Tooltip>}>
                  <span className={"text-primary-emphasis opacity-75"}>~ {Util.formatFriendlyDuration(infosIntervalDeparturesTimes?.avgIntervals ?? 0)}</span>
                </OverlayTrigger>
              </div>
            </div>
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
          <div className={"d-flex flex-column gap-2 text-body-secondary mt-4 text-sml"}>
            <span className={"d-block text-balance fs-inherit"}>
              {departureTimesDay.length.toLocaleString()} horários de partidas no horário de {dayConverted.substring(0, 1).toLowerCase() + dayConverted.substring(1)}.
            </span>
            <div className={"d-flex gap-1 fs-inherit flex-md-row flex-column flex-wrap"}>
              {
                [
                  <>Intervalos entre partidas: </>,
                  <>
                    <i className="bi bi-slash-circle-fill text-primary-emphasis opacity-50 fs-inherit"></i>{" "}
                    Média: {Util.formatFriendlyDuration(infosIntervalDeparturesTimes?.avgIntervals ?? 0)}
                  </>,
                  <>
                    <i className="bi bi-arrow-up-circle-fill text-primary-emphasis opacity-50 fs-inherit"></i>{" "}
                    Maior intervalo: {Util.formatFriendlyDuration(infosIntervalDeparturesTimes?.details?.maxInterval ?? 0)}
                  </>,
                  <>
                    <i className="bi bi-arrow-down-circle-fill text-primary-emphasis opacity-50 fs-inherit"></i>{" "}
                    Menor intervalo: {Util.formatFriendlyDuration(infosIntervalDeparturesTimes?.details?.minInterval ?? 0)}{" - "}
                    incidência: {infosIntervalDeparturesTimes?.frequencyOccurrenceInterval?.[1] ?? 0} vezes
                  </>
                ].map((item, i) => (
                  <span key={i} className={"text-ellipsis fs-inherit"}>
                    {item}
                  </span>
                ))
              }
            </div>
          </div>
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
