import React from "react";
import Title from "../title/Title";
import { Card as BootstrapCard } from 'react-bootstrap';
import PropTypes from "prop-types";

import "./card.css";

const Card = ({ title = "Card Title", subtitle = "Subtitle", children }) => {
  return (
    <BootstrapCard>
      <BootstrapCard.Header>
        <Title type="h2" title={title} />
      </BootstrapCard.Header>
      <BootstrapCard.Body className="text-ellipsis-2" style={{ flex: '0 0 auto' }}>
        <Title type="h2" title={subtitle} color="#4C4C4C" />
        <BootstrapCard.Text className="mt-2 text-ellipsis-2">{children}</BootstrapCard.Text>
      </BootstrapCard.Body>
    </BootstrapCard>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Card;
