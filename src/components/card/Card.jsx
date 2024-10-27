import React from "react";
import Title from "../title/Title";
import { Card as BootstrapCard } from 'react-bootstrap';
import PropTypes from "prop-types";

import "./card.css";

const Card = ({ title, subtitle, text }) => {
  return (
    <BootstrapCard>
      <BootstrapCard.Header>
        <Title type="h2" title={title} />
      </BootstrapCard.Header>
      <BootstrapCard.Body>
        <Title type="h3" title={subtitle} color="#4C4C4C" />
        <BootstrapCard.Text>{text}</BootstrapCard.Text>
      </BootstrapCard.Body>
    </BootstrapCard>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default Card;
