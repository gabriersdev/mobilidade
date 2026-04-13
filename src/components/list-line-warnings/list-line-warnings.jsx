import PropTypes from "prop-types";
import {AnimatePresence} from "framer-motion";

import './list-line-warnings.css'
import AnimatedComponent from "../ui/animated-component/animated-component.jsx";
import {useLineWarnings} from "./use-line-warnings.js";
import WarningItem from "./warning-item.jsx";

const ListLineWarnings = ({line_id}) => {
  const {warnings, loading, error, handleDismissWarning} = useLineWarnings(line_id);
  
  if (loading || error || !warnings || warnings.length === 0) {
    if (error) {
      console.error('Falha ao carregar avisos:', error);
    }
    return null;
  }
  
  return (
    <AnimatePresence mode={"wait"}>
      <AnimatedComponent>
        <div className={"mt-0 d-flex gap-3 flex-column"}>
          {
            warnings.toSorted((a, b) => a.title.localeCompare(b.title)).map((warning) => (
              <WarningItem
                key={warning.id}
                warning={warning}
                onDismiss={handleDismissWarning}
              />
            ))
          }
        </div>
      </AnimatedComponent>
    </AnimatePresence>
  );
}

ListLineWarnings.propTypes = {
  line_id: PropTypes.number.isRequired
}

export default ListLineWarnings;
