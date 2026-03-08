import PropTypes from "prop-types";
import {useEffect} from "react";

const UpdatePageData = ({title}) => {
  const setData = () => document.title = title;
  
  useEffect(() => {
    setTimeout(setData, 0);
  }, []);
  
  return null
}

UpdatePageData.propTypes = {
  title: PropTypes.string.isRequired,
}

export default UpdatePageData;
