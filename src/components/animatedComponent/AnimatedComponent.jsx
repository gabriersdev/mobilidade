import { motion } from "framer-motion";
import PropTypes from "prop-types";

const AnimatedComponent = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1, y: -10 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

AnimatedComponent.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AnimatedComponent;
