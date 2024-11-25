import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Alert } from "react-bootstrap";
import Accordion from "../accordion/Accordion";
import AccordionItem from "../accordion/AccordionItem";

const ListDeparturePoints = ({ line_id }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const searchDeparturePoints = async () => {
      try {
        const response = await axios.post(`http://localhost:3001/api/departure_points/`, { line_id: line_id }); // URL completa da sua API
        setData(response.data);
        console.log('Dados carregados com sucesso:', response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError(error);
      } finally {
        setIsLoaded(false);
      }
    };

    searchDeparturePoints()
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
        <span>Não localizamos pontos de parada para esta linha.</span>
      </Alert>
    )
  } else {
    console.log(data)
    return (
      // TODO - Implementar a listagem dos pontos de parada
      <Alert key={'alert-line-departuere-points-info'} variant={'info'} className={'d-flex gap-2 mt-3'}>
        <i className={'bi bi-exclamation-circle'}></i>
        <span>Esta linha possui pontos de paradas, porém a visualização<b>ainda não está disponível</b></span>
      </Alert>

      // <Accordion defaultEventKey={['0']}>
      //   <AccordionItem title="Sentido ida (Santos -> São Paulo)" eventKey="0">
      //     <ul className="list-line-content">
      //       <li>Rua XYC, N. 151 - Hospital São José</li>
      //       <li>Rua XYC, N. 151 - Hospital São José</li>
      //       <li>Rua XYC, N. 151 - Hospital São José</li>
      //     </ul>
      //   </AccordionItem>
      //   <AccordionItem title="Sentido volta (São Paulo -> Santos)" eventKey="1">
      //     <ul className="list-line-content">
      //       <li>Rua XYC, N. 151 - Hospital São José</li>
      //       <li>Rua XYC, N. 151 - Hospital São José</li>
      //       <li>Rua XYC, N. 151 - Hospital São José</li>
      //     </ul>
      //   </AccordionItem>
      // </Accordion>
    )
  }
}

ListDeparturePoints.propTypes = {
  line_id: PropTypes.number.isRequired
}

export default ListDeparturePoints;
