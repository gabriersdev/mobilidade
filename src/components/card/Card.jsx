import "./card.css";

import PropTypes from "prop-types";

import {Card as BootstrapCard} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {AnimatePresence} from "framer-motion";

import Title from "../title/Title";
import Util from "../../assets/Util.jsx";
import AnimatedComponent from "../animatedComponent/AnimatedComponent.jsx";

const Card = ({title = "Card Title", subtitle = "Subtitle", badge, link, children, onclick, variant}) => {
  let content, returnCard;

  const setContent = (newContent) => {
    content = newContent;
  }

  const setReturnCard = (newReturnCard) => {
    returnCard = newReturnCard;
  };

  if (variant === "placeholder") {
    setContent(
      <>
        <BootstrapCard.Header className={"d-flex flex-column placeholder-glow gap-1"}>
          <div className={'placeholder fs-3'}></div>
          <div className={'placeholder fs-3'}></div>
        </BootstrapCard.Header>
        <BootstrapCard.Body className={"d-flex flex-column placeholder-glow gap-1"} style={{flex: '0 0 auto'}}>
          <div className={'placeholder fs-6'}></div>
          <div className={'placeholder fs-6'}></div>
        </BootstrapCard.Body>
      </>
    )
  } else {
    setContent(
      <>
        <BootstrapCard.Header className={"d-flex flex-column"}>
          <div className={'d-flex gap-2 flex-wrap align-items-center'}>
            <Title type="h2" title={title.trim()} classX={" text-ellipsis-2 text-body"}/>
            {badge}
          </div>
          <Title type="h2" title={subtitle ? subtitle.trim() : ""} classX={" text-ellipsis-2 text-body-secondary"}
                 color="#4C4C4C"/>
        </BootstrapCard.Header>
        <BootstrapCard.Body className="text-ellipsis-2" style={{flex: '0 0 auto'}}>
          <BootstrapCard.Text className="mt-3 text-ellipsis-2"
                              title={String(children).replace(/[\r\n\b]/g, '').match(/<(\w+)>\s*\S*<\/\1>/g) || String(children).includes('[object Object]') ? "" : children}>{children}</BootstrapCard.Text>
        </BootstrapCard.Body>
      </>
    )
  }

  if (link) {
    setReturnCard (
      <BootstrapCard className={"bg-body-tertiary"} as={Link} to={link ? link.trim() : ""} rel={"noreferrer noopener"}
                     target={Util.isSameDomain(link ? link.trim() : "") ? "_self" : "_blank"}
                     style={{minHeight: '185px'}} data-aos={"fade-up"}>
        {content}
      </BootstrapCard>
    )
  } else if (typeof onclick === "function") {
    setReturnCard (
      <BootstrapCard className={"bg-body-tertiary"} onClick={onclick} style={{minHeight: '185px'}}>
        {content}
      </BootstrapCard>
    )
  }

  return (
    <AnimatePresence mode={"wait"}>
      <AnimatedComponent>
        {
          returnCard ? (
           returnCard
          ) : (
            <BootstrapCard className={"bg-body-tertiary"} style={{minHeight: '185px'}}>
          {content}
        </BootstrapCard>
          )
        }
      </AnimatedComponent>
    </AnimatePresence>
  )
}

Card.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  link: PropTypes.string,
  badge: PropTypes.node,
  onclick: PropTypes.func,
  children: PropTypes.node,
  variant: PropTypes.string
}

export default Card;
