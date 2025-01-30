import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Grid from "../grid/Grid.jsx";
import Card from "../card/Card.jsx";
import config from "../../config";
import Offcanvas from "react-bootstrap/Offcanvas";
import Util from "../../assets/util.js";

const ListRechargePoints = ({id_company, company_name}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);

  const [show, setShow] = useState(false);
  const [rechargePointOffCanvas, setRechargePointOffCanvas] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePointClick = (e, point_data) => {
    e.stopPropagation();
    e.preventScroll = true;
    setRechargePointOffCanvas({
      ...point_data,
      link: point_data.link_google_maps
    })
    handleShow();
  }

  useEffect(() => {
    const searchRecharchePoints = async () => {
      try {
        const response = await axios.post(`${config.host}/api/recharge_points/`, {id_company: id_company}); // URL completa da sua API
        setData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError(error);
      } finally {
        setIsLoaded(false);
      }
    }

    searchRecharchePoints()
  }, [id_company]);

  if (isLoaded) {
    return (<Grid>
      <Card title="Carregando" subtitle="Aguarde...">Estamos conectando ao banco de dados. Esse processo geralmente é
        rápido. Por favor, aguarde alguns instantes.</Card>
    </Grid>)
  } else if (error) {
    console.log(error)
    return (<Grid>
      <Card title="Erro" subtitle="Não foi possível carregar os pontos de recarga">Houve um erro ao carregar os pontos
        de recarga. Por favor, tente novamente mais tarde.</Card>
    </Grid>)
  } else if (data.length === 0) {
    return (<Grid>
      <Card title="Opa!"
            subtitle={`Nenhum ponto de recarga encontrado`}>{`Não há pontos de recarga cadastrados para a concessionária ${company_name}.`}</Card>
    </Grid>)
  } else {
    return (<>
      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className={"fs-6 fw-light text-muted m-0 p-0"}>Ponto de recarga</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={"d-flex flex-column gap-3"}>
          <h3 className={"fs-3 m-0 p-0"}>
            {rechargePointOffCanvas.point_name}
          </h3>

          <section>
            <div className={"d-flex flex-column gap-2 mb-3"}>
              <p className={"m-0 p-0"}>{rechargePointOffCanvas.address}</p>
              <p
                className={"m-0 p-0"}>{rechargePointOffCanvas.observations || "Não há observações sobre este ponto de recarga."}</p>
            </div>
            <iframe
              width="100%"
              height="450"
              style={{border: 0}}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDLVLgUmpHx7VfSA0qTMhYdKW1SVXKFTak&q=${Util.convertToSafeText(rechargePointOffCanvas.address ? rechargePointOffCanvas.address.toLowerCase() : '')}-sabara-minas-gerais`}>
            </iframe>
            <a className={"link-opacity-100 d-flex gap-1 align-items-center mt-2"} style={{textDecoration: 'none'}}
               href={rechargePointOffCanvas.link}
               rel={"noreferrer noopener"} target={"_blank"}
            >
              <span>Abrir no Maps</span>
              <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px"
                   fill={"#7BBEFE"}>
                <path
                  d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
              </svg>
            </a>
          </section>
        </Offcanvas.Body>
      </Offcanvas>

      <Grid>
        {data.map((recharchePoint, index) => {
          return (
            <a key={index} style={{cursor: "pointer"}}>
              <Card title={recharchePoint.point_name} subtitle={recharchePoint.address}
                    onclick={(e) => handlePointClick(e, recharchePoint)}
              >
                {recharchePoint.observations || "Não há observações sobre este ponto de recarga."}
              </Card>
            </a>
          )
        })}
      </Grid>
    </>)
  }
}

ListRechargePoints.propTypes = {
  id_company: PropTypes.number.isRequired, company_name: PropTypes.string.isRequired,
}

export default ListRechargePoints;
