import React from 'react';
import PropTypes from 'prop-types';
import NavLink from './news-nav-link.jsx';

const NewsNavigation = ({prevArticle, nextArticle}) => (
  <div className="d-flex justify-content-between mt-4 gap-3">
    <NavLink article={prevArticle} direction="prev"/>
    <NavLink article={nextArticle} direction="next"/>
  </div>
);

NewsNavigation.propTypes = {
  prevArticle: PropTypes.object,
  nextArticle: PropTypes.object,
};

export default NewsNavigation;
