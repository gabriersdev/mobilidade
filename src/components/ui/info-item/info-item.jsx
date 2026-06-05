import PropTypes from "prop-types";

const InfoItem = ({ icon, iconClass, label, value, children }) => {
  return (
    <div className="d-flex align-items-center gap-1 line-clamp-1">
      {icon && <i className={`bi ${icon} ${iconClass || ''}`}></i>}
      {!icon && children && <span className="boostrap-icons">{children}</span>}
      {label && <span className="text-body-secondary">{label}:</span>}
      {value && <span className="text-body fw-medium line-clamp-1">{value}</span>}
    </div>
  );
};

InfoItem.propTypes = {
  icon: PropTypes.string,
  iconClass: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node
};

export default InfoItem;
