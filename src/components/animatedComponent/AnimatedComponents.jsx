import PropTypes from "prop-types";
import AnimatedComponent from "./AnimatedComponent.jsx";
import {AnimatePresence} from "framer-motion";

const AnimatedComponents = ({children}) => {
  return Array.isArray(children) ? children.map((child, key) => {
    return (
      <AnimatePresence mode={"wait"} key={key}>
        <AnimatedComponent>
          {child}
        </AnimatedComponent>
      </AnimatePresence>
    )
  }) : (
    <AnimatePresence mode={"wait"}>
      <AnimatedComponent>
        {children}
      </AnimatedComponent>
    </AnimatePresence>
  )
};

AnimatedComponents.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AnimatedComponents;
