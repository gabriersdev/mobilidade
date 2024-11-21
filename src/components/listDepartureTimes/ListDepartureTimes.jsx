import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Alert } from "react-bootstrap";
import Accordion from "../accordion/Accordion";
import AccordionItem from "../accordion/AccordionItem";
import Table from "../table/Table.jsx";
import Legend from "../legend/Legend.jsx";

const ListDepartureTimes = ({ line_id }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const searchDepartureTimes = async () => {
      try {
        const response = await axios.post(`http://localhost:3001/api/departure_times/`, { line_id: line_id }); // URL completa da sua API
        setData(response.data);
        console.log('Dados carregados com sucesso:', response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError(error);
      } finally {
        setIsLoaded(false);
      }
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
      <Alert key={'alert-line-hour-info'} variant={'info'} className="d-flex gap-2 mt-3">
        <i className="bi bi-exclamation-circle"></i>
        <span>Não localizamos horários para esta linha.</span>
      </Alert>
    )
  } else {
    return (
      <Accordion defaultEventKey={['0']}>
        <AccordionItem title="Item 1" eventKey="0">
          <Table content={{data: Array.from({length: 25,}, (_, i) => "00:" + ("00" + i).slice(-2))}}/>

          <Legend items={[{abrev: 'SC', label: 'Santa Casa'}, {abrev: 'SP', label: 'São Paulo'}]}/>
        </AccordionItem>
      </Accordion>
    )
  }
}

ListDepartureTimes.propTypes = {
  line_id: PropTypes.number.isRequired
}

export default ListDepartureTimes;
