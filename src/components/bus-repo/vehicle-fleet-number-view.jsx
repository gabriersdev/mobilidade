import PropTypes from "prop-types";
import FloatInfo from "@/components/floating-info/float-info.jsx";

export default function VehicleFleetNumberView({vehicle}) {
  if (!vehicle) return null;
  return <FloatInfo string={vehicle.fleetNumber.toString()}/>
}

VehicleFleetNumberView.propTypes = {
  vehicle: PropTypes.shape({
    fleetNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }).isRequired
}
