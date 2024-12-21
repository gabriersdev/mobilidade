import React from "react";
import Title from "../title/Title";
import {Link} from "react-router-dom";
import { Card as BootstrapCard } from 'react-bootstrap';
import PropTypes from "prop-types";

import "./card.css";
import Util from "../../assets/util.js";

const Card = ({ title = "Card Title", subtitle = "Subtitle", link, children }) => {
  const content = (
    <>
      <BootstrapCard.Header className={"d-flex flex-column gap-2"}>
        <Title type="h2" title={title.trim()} classX={" text-ellipsis-2 text-body"} />
        <Title type="h2" title={subtitle ? subtitle.trim() : ""} classX={" text-ellipsis-2 text-body-secondary"} color="#4C4C4C" />
      </BootstrapCard.Header>
      <BootstrapCard.Body className="text-ellipsis-2" style={{ flex: '0 0 auto' }}>
        <BootstrapCard.Text className="mt-3 text-ellipsis-2">{children}</BootstrapCard.Text>
      </BootstrapCard.Body>
    </>
  )

  if (link) {
    return (
      <BootstrapCard className={"bg-body-tertiary"} as={Link} to={link ? link.trim() : ""} rel={"noreferrer noopener"} target={Util.isSameDomain(link ? link.trim() : "") ? "_self" : "_blank"}>
        {content}
      </BootstrapCard>
    )
  }

  return (
    <BootstrapCard className={"bg-body-tertiary"}>
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
