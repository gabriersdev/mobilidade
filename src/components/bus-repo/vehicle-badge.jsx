import {Link} from "react-router-dom";
import Util from "@/lib/Util.jsx";
import PropTypes from "prop-types";

const VehicleBadge = ({vehicle, fontSize = '12.5px', className = ''}) => {
  const bgColor = vehicle.identityColor || '#6c757d';
  const textColor = Util.getContrastColor(bgColor);
  
  return (
    <Link
      to={`/bus-repo/${vehicle.id}`}
      className={`badge rounded-pill rounded-5 text-decoration-none ${className}`}
      style={{letterSpacing: '0.5px', backgroundColor: bgColor, color: textColor, fontSize}}
    >
      N.º {vehicle.fleetNumber}
    </Link>
  );
};

VehicleBadge.propTypes = {
  vehicle: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    fleetNumber: PropTypes.string.isRequired,
    identityColor: PropTypes.string
  }).isRequired,
  fontSize: PropTypes.string,
  className: PropTypes.string
};

export default VehicleBadge;
