import React from "react";
import Title from "../title/Title";
import {Link} from "react-router-dom";
import { Card as BootstrapCard } from 'react-bootstrap';
import PropTypes from "prop-types";

import "./card.css";

const Card = ({ title = "Card Title", subtitle = "Subtitle", link, children }) => {
  const content = (
    <>
      <BootstrapCard.Header>
        <Title type="h2" title={title} />
        <Title type="h2" title={subtitle} color="#4C4C4C" />
      </BootstrapCard.Header>
      <BootstrapCard.Body className="text-ellipsis-2" style={{ flex: '0 0 auto' }}>
        <BootstrapCard.Text className="mt-2 text-ellipsis-2">{children}</BootstrapCard.Text>
      </BootstrapCard.Body>
    </>
  )

  if (link) {
    return (
      <BootstrapCard as={Link} to={link}>
        {content}
      </BootstrapCard>
    )
  }

  return (
    <BootstrapCard>
      {content}
    </BootstrapCard>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  link: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default Card;
