import {useContext, useEffect, useState} from 'react';
import {MapContainer, TileLayer, Polyline, Marker, useMap, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import PropTypes from "prop-types";
import config from "../../config.js";
import AnimatedComponents from "../animatedComponent/AnimatedComponents.jsx";
import {Theme} from "../themeContext/ThemeContext.jsx";

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
  const [addresses, setAddresses] = useState([]);
  
  const [points, setPoints] = useState([]);
  
  useEffect(() => {
    let directions = [];
    setAddresses([]);
    
    if (departurePointsByDirection) {
      departurePointsByDirection.forEach((ps) => {
        const uniqueIndexes = ps.map((p) => p.direction).filter((p, i, s) => s.indexOf(p) === i)
        directions.push(uniqueIndexes[0]);
      })
      
      if (departurePointsByDirection && Object.values(departurePointsByDirection).length > 0) {
        let direction;
        if (directions.length) {
          for (direction in directions) {
            if (parseInt(direction) === 1 || parseInt(direction) === 2) setAddresses((prev) => [...prev, ...departurePointsByDirection[`${direction}`]]);
            else if (parseInt(direction) === 0) setAddresses([...departurePointsByDirection[`${direction}`]])
            else {
              // alert("Algo não ocorreu bem! Contate o administrador!")
              console.warn("Se nesta os pontos de parada linha possuem direção única não faz sentido possuir, também, direção ida ou volta")
            }
          }
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
    let sanitizeAddresses = []
    if (addresses && addresses.length > 0) {
      // Formata os endereços do jeito que deve ser passado para o back-end
      sanitizeAddresses = [...addresses.map(a => {
        return {
          address: a.address.trim() + (a.point_name.trim() ? " - " + a.point_name.trim().replace(/\//, " - ") : ""),
          name: a.point_name.trim(),
          obj: a
        }
      })];
      
      // Remove os endereços que não tem número algum
      sanitizeAddresses = sanitizeAddresses.filter(a => a.address.match(/\d/));
      
      // Remove endereços duplicados ou vazios
      sanitizeAddresses = sanitizeAddresses.filter((d, i, self) => d && self.indexOf(d) === i)
      
      // Adiciona "Sabará - MG" nos endereços que não tem este dado
      sanitizeAddresses = sanitizeAddresses.map(d => !d.address.toLowerCase().includes("sabará") ? {...d, address: "Brasil, Minas Gerais, Sabará - " + d.address } : {...d, address: d.address + ", Brasil"})
    }
    
    const firsts200 = sanitizeAddresses.slice(0, 200);
    // console.log(firsts200[0], firsts200[firsts200.length - 1]);
    
    // Requerendo apenas os locais de partida e fim
    fetch(`${config.host}/api/geocode/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({addresses: [firsts200[0], firsts200[firsts200.length - 1]]}),
    })
      .then(res => res.json())
      .then(setPoints)
      .catch(console.error);
  }, [addresses]);
  
  if (!points.length) return null;
  
  return (
    <div className={"mb-4"}>
      <AnimatedComponents>
        <figure className={"m-0 p-0"}>
          <MapContainer center={[-19.88, -43.80]} zoom={13} style={{height: '300px'}} className={"border-1"}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            {points.map((p, i) => {
              if (!p) return null
              return (
                <Marker key={i} position={[p.lat, p.lng]}>
                  {
                    (p.name || p.address) ? (
                      <Popup className="">
                        <div>
                          <h4 className="fs-6 fw-bold mb-2 text-center text-secondary">{p.name ? p.name.replaceAll("/", " - ") : ""}</h4>
                          <p className="m-0 p-0 text-center text-secondary">{p.address ? p.address.replaceAll("/", " - ") : ""}</p>
                        </div>
                      </Popup>
                    ) : ""
                  }
                </Marker>
              )
            })}
            {points.length > 1 && (
              <Polyline positions={points.map(p => [p.lat, p.lng])} color="blue" weight={4}/>
            )}
            <RenderView points={points}/>
          </MapContainer>
          <figcaption className={"text-muted d-inline-block mt-2 d-none"}>Itinerário da linha</figcaption>
        </figure>
      </AnimatedComponents>
    </div>
  );
}

export default RouteMap;