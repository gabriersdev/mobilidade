import {useContext, useEffect, useState} from 'react';
import {MapContainer, TileLayer, Polyline, Marker, useMap, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import PropTypes from "prop-types";
import config from "../../config.js";
import AnimatedComponents from "../animatedComponent/AnimatedComponents.jsx";
import {Theme} from "../themeContext/ThemeContext.jsx";
import {isArray} from "leaflet/src/core/Util.js";
import {i} from "framer-motion/m";

function RenderView({points}) {
  const map = useMap();
  useEffect(() => {
    if (points.length > 0) {
      const bounds = L.latLngBounds(points.map(p => [p.lat, p.lng]));
      map.fitBounds(bounds);
    }
  }, [points, map]);
  return null;
}

RenderView.propTypes = {
  points: PropTypes.array.isRequired,
}

const RouteMap = () => {
  // Recupera os endereços separados por direçao
  const {departurePointsByDirection} = useContext(Theme)
  
  // Endereços recebidos do componente de Departure Points, organizados pelo número da ordem que foram registrados no banco de dados e pelo sentido
  // Primeiro o sentido de ida e depois o de volta, ou apenas ida quando o de volta não existir
  // Se for sentido único, apenas exibir o sentido único
  const [addresses, setAddresses] = useState([
    // "Av. Paulista, 250, São Paulo, SP",
    // "Praça da Sé, 100, São Paulo, SP",
    // "Rua Vergueiro, 100, São Paulo, SP",
    // "Avenida Brigadeiro Faria Lima, 150, São Paulo, SP",
  ]);
  
  const [points] = useState([]);
  
  useEffect(() => {
    let directions = [];
    setAddresses([])
    
    departurePointsByDirection.forEach((ps) => {
      const uniqueIndexes = ps.map((p) => p.direction).filter((p, i, s) => s.indexOf(p) === i)
      directions.push(uniqueIndexes[0]);
    })
    
    if (departurePointsByDirection && Object.values(departurePointsByDirection).length > 0) {
      let direction;
      for (direction in directions) {
        if (parseInt(direction) === 1 || parseInt(direction) === 2) setAddresses((prev) => [...prev, ...departurePointsByDirection[`${direction}`]]);
        else if (parseInt(direction) === 0) setAddresses([...departurePointsByDirection[`${direction}`]])
        else {
          // alert("Algo não ocorreu bem! Contate o administrador!")
          // console.warn("Se nesta os pontos de parada linha possuem direção única não faz sentido possuir, também, direção ida ou volta")
        }
      }
    }
  }, [departurePointsByDirection]);
  
  useEffect(() => {
    if (points.length > 0) {
      document.querySelector('.leaflet-pane.leaflet-map-pane').style.zIndex = 50;
      document.querySelector('.leaflet-control-zoom.leaflet-bar.leaflet-control').style.zIndex = 60;
      document.querySelector('.leaflet-top.leaflet-left').style.zIndex = 70;
    }
  }, [points]);
  
  useEffect(() => {
    if (addresses && addresses.length > 0) {
      let sanitizeAddresses = []
      // Formata os endereços do jeito que deve ser passado para o back-end
      sanitizeAddresses = [...addresses.map(a => a.address.trim() + (a.point_name.trim() ? " " + a.point_name.trim() : ""))];
      console.log(sanitizeAddresses);
    }
    
    // fetch(`${config.host}/api/geocode/`, {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify({addresses: addresses.slice(0, 200)}),
    // })
    //   .then(res => res.json())
    //   .then(setPoints)
    //   .catch(console.error);
  }, [addresses]);
  
  if (!points.length) return null;
  
  return (
    <div className={"mb-4"}>
      <AnimatedComponents>
        <figure className={"m-0 p-0"}>
          <MapContainer center={[-19.88, -43.80]} zoom={11} style={{height: '300px'}} className={"border-1"}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            {points.map((p, i) => (
              <Marker key={i} position={[p.lat, p.lng]}>
                <Popup className="">
                  <div>
                    <h4 className="fs-6 fw-bold mb-2 text-center text-white">Nome do ponto de parada</h4>
                    <p className="m-0 p-0 text-center text-body-secondary">Rua ABCDEFG, N.º 4954</p>
                  </div>
                </Popup>
              </Marker>
            ))}
            {points.length > 1 && (
              <Polyline positions={points.map(p => [p.lat, p.lng])} color="blue" weight={4}/>
            )}
            <RenderView points={points}/>
          </MapContainer>
          <figcaption className={"text-muted d-inline-block mt-2"}>Itinerário da linha</figcaption>
        </figure>
      </AnimatedComponents>
    </div>
  );
}

export default RouteMap;