import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import LineIdentification from "../lineIdentification/LineIdentification";
import ListRechargePoints from "../listRecharchePoints/ListRecharchePoints";
import ListDepartureTimes from "../listDepartureTimes/ListDepartureTimes";
import Title from "../title/Title.jsx";
import Alert from "../alert/Alert";
import ListDeparturePoints from "../listDeparturePoints/ListDeparturePoints.jsx";

const Line = ({ id }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    // Altera o título da página
    document.title = "Mobilidade - Consulta Linha";

    const searchLine = async (id) => {
      try {
        const response = await axios.post(`http://localhost:3001/api/lines/`, { id: id }); // URL completa da sua API
        setData(response.data);
        // console.log('Dados carregados com sucesso:', response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError(error);
      } finally {
        setIsLoaded(false);
      }
    };

    searchLine(id)
  }, []);

  if (isLoaded) {
    return <div>Carregando...</div>;
  } else if (error) {
    console.log(error)
    return <div>Erro: {error.message}</div>;
  } else if (data.length === 0) {
    return (
      <Alert variant={'danger'} margin={"mt-0"}>
        <span>Linha não encontrada.</span>
      </Alert>
    );
  } else {
    // Altera o título da página
    document.title = `Linha ${data[0].line_number} | ${data[0].departure_location} - ${data[0].destination_location}`;

    return (
      <div className="d-flex flex-column" style={{ gap: '4rem' }}>
        <section>
          <LineIdentification line={data[0]} />
          {data[0].observations ? (
            <Alert variant={'secondary'}>
              <span>{data[0].observations}</span>
            </Alert>)
            : ""
          }
        </section>

        <section>
          <Title type="h3" color="#212529">Horários de partidas</Title>
          <ListDepartureTimes line_id={data[0].line_id} departure_location={data[0].departure_location} destination_location={data[0].destination_location} />
        </section>

        <section>
          <Title type="h3" color="#212529">Pontos de paradas</Title>
          <ListDeparturePoints line_id={data[0].line_id} departure_location={data[0].departure_location} destination_location={data[0].destination_location} />
        </section>

        <section>
          <Title type="h3" color="#212529">Pontos de recarga</Title>
          <ListRechargePoints id_company={data[0].company_id} company_name={data[0].company_name} />
        </section>
      </div>
    )
  }
}

Line.propTypes = {
  id: PropTypes.string.isRequired
}

export default Line;
