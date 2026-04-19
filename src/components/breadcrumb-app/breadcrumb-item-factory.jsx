import {BreadcrumbItem} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';

const BreadcrumbItemFactory = ({label, url}) => {
  const navigate = useNavigate();
  
  return (
    <BreadcrumbItem
      className="bg-body"
      onClick={(e) => {
        e.preventDefault();
        if (url) navigate(url);
      }}
      style={{cursor: 'pointer'}}
    >
      {label}
    </BreadcrumbItem>
  );
};

BreadcrumbItemFactory.propTypes = {
  label: PropTypes.node.isRequired,
  url: PropTypes.string.isRequired,
};

export default BreadcrumbItemFactory;
