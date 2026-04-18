import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const NavLink = ({article, direction}) => {
  if (!article) return <div/>;
  
  const isPrev = direction === 'prev';
  const arrow = <></>;
  // const arrow = isPrev ? <>&larr;</> : <>&rarr;</>;
  const align = isPrev ? 'text-start' : 'text-end';
  const label = isPrev ? 'Anterior' : 'Próxima';
  
  return (
    <Link to={`/news/${article.id}`} className={`text-decoration-none d-flex flex-column gap-1 ${align}`}>
      <small className={"text-sml  text-primary-emphasis"}>
        {direction === "prev" && <><i className="bi bi-arrow-left-short"></i>{" "}</>}
        {label}
        {direction === "next" && <>{" "}<i className="bi bi-arrow-right-short"></i></>}
      </small>
      <span className="line-clamp-1" style={{maxWidth: 200}}>{isPrev && arrow} {article.title} {!isPrev && arrow}</span>
    </Link>
  );
};

NavLink.propTypes = {
  article: PropTypes.object,
  direction: PropTypes.oneOf(['prev', 'next']).isRequired,
};

export default NavLink;
