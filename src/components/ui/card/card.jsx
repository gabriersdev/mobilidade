import "@/components/ui/card/card.css";

import PropTypes from "prop-types";
import {Card as BootstrapCard} from 'react-bootstrap';
import {Link} from "react-router-dom";

import Title from "@/components/ui/title/title.jsx";
import Util from "@/lib/Util.jsx";

const Card = ({
                title = "Card Title",
                subtitle = "Subtitle",
                badge,
                link,
                children,
                onclick,
                variant,
                headerColumn = false
              }) => {
  const minHeight = "265px";
  
  const CardContent = () => {
    if (variant === "placeholder") {
      return (
        <div style={{minHeight}} className="justify-content-between align-items-start">
          <BootstrapCard.Header className="d-flex flex-column placeholder-glow gap-1">
            <div className="placeholder fs-2"></div>
          </BootstrapCard.Header><br/>
          <div className="d-flex flex-column placeholder-glow gap-1">
            <div className="placeholder fs-1"></div>
            <div className="placeholder fs-1"></div>
          </div>
          <br/>
          <BootstrapCard.Body className="d-flex flex-column placeholder-glow gap-1" style={{flex: '0 0 auto'}}>
            <div className="placeholder fs-6"></div>
            <div className="placeholder fs-6"></div>
          </BootstrapCard.Body>
        </div>
      );
    }
    
    if (variant === "placeholder-news") {
      return (
        <div style={{minHeight}} className="justify-content-between align-items-start">
          <BootstrapCard.Header className="d-flex flex-column placeholder-glow gap-1">
            <div className="placeholder fs-2"></div>
            <div className="placeholder fs-2"></div>
          </BootstrapCard.Header><br/>
          <div className="d-flex flex-column placeholder-glow gap-1">
            <div className="placeholder fs-2"></div>
            <div className="placeholder fs-2"></div>
          </div>
          <br/>
          <BootstrapCard.Body className="d-flex flex-column placeholder-glow gap-1" style={{flex: '0 0 auto'}}>
            <div className="placeholder fs-6"></div>
            <div className="placeholder fs-6"></div>
          </BootstrapCard.Body>
        </div>
      );
    }
    
    return (
      <>
        <BootstrapCard.Header className="d-flex flex-column">
          <div className={`d-flex gap-2 ${headerColumn ? "flex-column align-items-start" : "flex-wrap align-items-center"}`}>
            <Title type="h2" title={title.trim()} classX=" text-ellipsis-2 text-body"/>
            {badge}
          </div>
          <Title type="h2" title={subtitle ? subtitle.trim() : ""} classX=" text-ellipsis-2 text-body-secondary text-balance" color="#4C4C4C"/>
        </BootstrapCard.Header>
        {children && (
          <BootstrapCard.Body style={{flex: '0 0 auto'}}>
            <div
              className="mt-3 line-clamp-2"
              title={
                String(children)
                  .replace(/[\r\n\b]/g, '')
                  ?.substring(0, 200)
                  ?.match(/<(\w+)>\s*\S*<\/\1>/g) || String(children).includes('[object Object]') ?
                  "" : (children?.toString()?.substring(0, 200) + "...")
              }
            >
              {children}
            </div>
          </BootstrapCard.Body>
        )}
      </>
    );
  };
  
  if (link) {
    return (
      <BootstrapCard
        className="bg-body-tertiary text-decoration-none"
        as={Link}
        to={link ? link.trim() : ""}
        rel="noreferrer noopener"
        target={Util.isSameDomain(link ? link.trim() : "") ? "_self" : "_blank"}
        style={{minHeight}}
      >
        {/* eslint-disable-next-line react-hooks/static-components */}
        <CardContent/>
      </BootstrapCard>
    );
  }
  
  if (typeof onclick === "function") {
    return (
      <BootstrapCard className="bg-body-tertiary cursor-pointer" onClick={onclick} style={{minHeight}}>
        {/* eslint-disable-next-line react-hooks/static-components */}
        <CardContent/>
      </BootstrapCard>
    );
  }
  
  return (
    <BootstrapCard className="bg-body-tertiary" style={{minHeight}}>
      {/* eslint-disable-next-line react-hooks/static-components */}
      <CardContent/>
    </BootstrapCard>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  link: PropTypes.string,
  badge: PropTypes.node,
  onclick: PropTypes.func,
  children: PropTypes.node,
  variant: PropTypes.string,
  headerColumn: PropTypes.bool
}

export default Card;
