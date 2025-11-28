import PropTypes from "prop-types";
import {useEffect} from "react";

const UpdatePageData = ({title, breadcrumbSelector, breadcrumbText}) => {
  const setData = () => {
    document.title = title;
    
    if (breadcrumbSelector && breadcrumbText) {
      const dataCompanyId = document.querySelector(breadcrumbSelector)
      if (dataCompanyId) dataCompanyId.querySelector('a').textContent = breadcrumbText;
    }
    
    console.log(new Date().getTime());
  }
  
  useEffect(() => {
    setTimeout(setData, 0);
  }, []);
  
  return null
}

UpdatePageData.propTypes = {
  title: PropTypes.string.isRequired,
  breadcrumbSelector: PropTypes.string,
  breadcrumbText: PropTypes.string,
}

export default UpdatePageData;
