import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Alert from "../alert/Alert";
import Accordion from "../accordion/Accordion";
import AccordionItem from "../accordion/AccordionItem";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Util from "../../assets/Util.js";
import config from "../../config";

const ListDeparturePoints = ({ line_id, departure_location, destination_location }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);

  const [show, setShow] = useState(false);
  const [pointDataOffcanvas, setPointDataOffcanvas] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePointClick = (e, { address, point_name, points_lenght, point_ordenation }) => {
    e.preventScroll = true;
    setPointDataOffcanvas({
      address: address,
      point_name: point_name,
      points_lenght: points_lenght,
      point_ordenation: point_ordenation
    });
    handleShow();
  }

  useEffect(() => {
    const searchDeparturePoints = async () => {
      try {
        const response = await axios.post(`${config.host}/api/departure_points/`, { line_id: line_id }); // URL completa da sua API
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
  }, [line_id]);

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
    const departurePoints = data.toSorted((a, b) => a.order_departure_point - b.order_departure_point);

    const uniqueDirections = data.map((item) => item.direction).filter((value, index, self) => self.indexOf(value) === index);

    const departurePointsByDirection = uniqueDirections.map((direction) => {
      return departurePoints.filter((item) => item.direction === direction);
    });

    return (
      <Accordion>
        {/* Offcanvas */}
        <Offcanvas show={show} onHide={handleClose} placement="start">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className={"fs-6 fw-light text-muted m-0 p-0"}>Ponto de parada</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className={"d-flex flex-column gap-3"}>
            <h3 className={"fs-3 m-0 p-0"}>
              {pointDataOffcanvas.point_name ? `${pointDataOffcanvas.point_name} - ${pointDataOffcanvas.address}` : pointDataOffcanvas.address}
            </h3>

            <section>
              <iframe
                width="100%"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDLVLgUmpHx7VfSA0qTMhYdKW1SVXKFTak&q=${Util.convertToSafeText(pointDataOffcanvas.address)}`}>
              </iframe>
              <Alert variant={"warning"} className={"mt-2"}>
                <span className={"fw-light"}>
                  A localização do Maps pode não corresponder ao endereço do ponto de parada. Use com cautela.
                </span>
              </Alert>
              <a className={"link-opacity-100 d-flex gap-1 align-items-center mt-1"} style={{ textDecoration: 'none' }}
                href={`https://www.google.com/maps/search/?api=1&query=${Util.convertToSafeText(pointDataOffcanvas.address)}`}
                rel={"noreferrer noopener"} target={"_blank"}
              >
                <span>Abrir no Maps</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px"
                  fill={"#7BBEFE"}>
                  <path
                    d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
                </svg>
              </a>
            </section>

            <p className={"text-muted fw-light"}>
              Este é o ponto de parada
              n.º {pointDataOffcanvas.point_ordenation + 1} de {pointDataOffcanvas.points_lenght} do sentido
            </p>
          </Offcanvas.Body>
        </Offcanvas>

        {
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
                            style={{ textDecoration: 'none', textAlign: 'left' }}
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
