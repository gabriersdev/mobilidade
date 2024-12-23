import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Alert from "../alert/Alert";
import Accordion from "../accordion/Accordion";
import AccordionItem from "../accordion/AccordionItem";
import Table from "../table/Table.jsx";
import Legend from "../legend/Legend.jsx";
import Util from "../../assets/util.js";
import config from "../../config";
import Offcanvas from "react-bootstrap/Offcanvas";

const ListDepartureTimes = ({line_id, departure_location, destination_location}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [observations, setObservations] = useState([]);

  const [show, setShow] = useState(false);
  const [departureTimeOffCanvas, setDepartureTimeOffCanvas] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePointClick = (e, {time, observations, time_ordernation, times_lenght}) => {
    e.preventScroll = true;
    setDepartureTimeOffCanvas({
      time: time,
      observations: observations,
      time_ordernation: time_ordernation,
      times_lenght: times_lenght
    });
    handleShow();
  }

  useEffect(() => {
    const searchDepartureTimes = async () => {
      try {
        const response = await axios.post(`${config.host}/api/departure_times/`, {line_id: line_id});

        // Obtendo as observações dos horários de partida
        searchDepartureTimesObservations(response.data).then((obsData) => {
          // Definindo as observações dos horários de partida
          setObservations(
            obsData.data.filter(o => o.observation !== null).reduce((accumulator, observation) => {
              const existingObservation = accumulator.find(item => item.label === observation.observation_name);

              if (!existingObservation) {
                accumulator.push({
                  label: observation.observation_name,
                  abrev: observation.observation_abrev
                });
              }

              return accumulator;
            }, [])
          )

          setData(
            response.data.map((item) => {
              const observation = obsData.data.find((observation) => observation.departure_time_id === item.schedule_id)

              return {
                ...item,
                observation:
                // Se observação estiver definida, cria um array, com a abreviação, o nome ou label da abreviação e o índice para que depois o compotente defina uma cor para a observação
                  observation ? [
                      observation.observation_abrev,
                      observation.observation_name,
                      observations.findIndex((o) => o.abrev === observation.observation_abrev)
                    ]
                    : null,
              }
            })
          )
        })
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError(error);
      } finally {
        setIsLoaded(false);
      }
    };

    const searchDepartureTimesObservations = async () => {
      return await axios.post(`${config.host}/api/departure_times_observations/`, {line_id: line_id});
    };

    searchDepartureTimes()
  }, []);

  if (isLoaded) {
    return <div>Carregando...</div>;
  } else if (error) {
    console.log(error)
    return <div>Erro: {error.message}</div>;
  } else if (data.length === 0) {
    return (
      <Alert variant={'info'}>
        <span>Não localizamos horários para esta linha.</span>
      </Alert>
    )
  } else {
    const convertNumberToDay = (day) => {
      switch (day) {
        case 1:
          return 'Dias úteis';
        case 2:
          return 'Sábado';
        case 3:
          return 'Domingo';
        case 4:
          return 'Domingos e feriados';
        case 5:
          return 'Dias úteis - atípico';
        case 6:
          return 'Sábados - atípico';
        case 7:
          return 'Domingos - atípico';
        case 8:
          return 'Dias úteis - férias';
        case 9:
          return 'Sábados - férias';
        case 10:
          return 'Domingos - férias';
      }
    }

    // Ordena os horários de partida por dia e horário
    const departureTimes = data.toSorted((a, b) => a.day - b.day)

    const uniqueDirections = departureTimes.map((item) => item.direction).filter((value, index, self) => self.indexOf(value) === index)

    const uniqueDaysForDirection = uniqueDirections.map((direction) => departureTimes.filter((item) => item.direction === direction).map((item) => item.day).filter((value, index, self) => self.indexOf(value) === index))

    return (
      <Accordion defaultEventKey={['0']}>
        <Offcanvas show={show} onHide={handleClose} placement="start">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className={"fs-6 fw-light text-muted m-0 p-0"}>Horário de partida</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className={"d-flex flex-column gap-3"}>
            <h3 className={"fs-3 m-0 p-0"}>
              {departureTimeOffCanvas.time}
            </h3>

            <section>
              {departureTimeOffCanvas.observations ?
                <>
                  <h4 className={"fs-6 fw-bold my-2 p-0"}>Observações:</h4>
                  <Legend items={departureTimeOffCanvas.observations} marginTop={"mt-0"}/>
                </>
                : ""
              }
            </section>

            <p className={"text-muted fw-light"}>
              Este é o ponto de parada
              n.º {departureTimeOffCanvas.time_ordernation + 1} de {departureTimeOffCanvas.times_lenght} do sentido
            </p>
          </Offcanvas.Body>
        </Offcanvas>

        {uniqueDirections.map((direction, i) => {
          return (
            <AccordionItem
              title={direction === 1 ? `Sentido ida - ${departure_location} -> ${destination_location}` : `Sentido volta - ${destination_location} -> ${departure_location}`}
              eventKey={i.toString()} key={i}>
              <Accordion defaultEventKey={['0']}>
                {uniqueDaysForDirection[i].map((day, j) => {
                  return (
                    <AccordionItem title={convertNumberToDay(day)} eventKey={j.toString()} key={j}>
                      <Table
                        content={{
                          data: departureTimes.filter((item) => item.day === day && item.direction === direction).map((item) => {
                            return {
                              departure_time: Util.formatTime(`2020-01-01 ${item.departure_time}`, 'HH:mm'),
                              observation: item.observation ? item.observation : null
                            }
                          })
                        }}
                        handlePointClick={handlePointClick}
                        observations={observations}
                      />

                      {observations.length ? <Legend items={observations}/> : ""}
                    </AccordionItem>
                  )
                })}
              </Accordion>
            </AccordionItem>
          )
        })}
      </Accordion>)
  }
}

ListDepartureTimes.propTypes = {
  line_id: PropTypes.number.isRequired,
  departure_location: PropTypes.string.isRequired,
  destination_location: PropTypes.string.isRequired
}

export default ListDepartureTimes;
