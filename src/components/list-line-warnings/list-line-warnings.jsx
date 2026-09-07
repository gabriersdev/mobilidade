import PropTypes from "prop-types";
import {AnimatePresence} from "framer-motion";

import '@/components/list-line-warnings/list-line-warnings.css';
import AnimatedComponent from "@/components/ui/animated-component/animated-component.jsx";
import {useLineWarnings} from "@/components/list-line-warnings/use-line-warnings.js";
import WarningItem from "@/components/list-line-warnings/warning-item.jsx";
import moment from "moment";

const ListLineWarnings = ({line_id}) => {
  const {warnings, loading, error, handleDismissWarning} = useLineWarnings(line_id);
  
  if (loading || error || !warnings || warnings.length === 0) {
    if (error) console.error('Falha ao carregar avisos:', error);
    return null;
  }
  
  return (
    <AnimatePresence mode={"wait"}>
      <AnimatedComponent>
        <div className={"mt-0 d-flex gap-3 flex-column"}>
          {
            warnings
              .toSorted((a, b) => a.title.localeCompare(b.title))
              .filter((warning) => {
                try {
                  if (warning?.text && warning?.title?.toLowerCase().includes("informe sobre o quadro de horários em operação")) {
                    const existsDateInText = warning.text.match(/\d{2}\/\d{2}\/\d{4}/g);
                    if (existsDateInText) {
                      const existsDateInFuture = existsDateInText
                        .map(e => moment(e.split("/").toReversed().join("-") + "T00:00:00"))
                        .find(d => moment().diff(d, "days") <= 0);
                      return !!existsDateInFuture;
                    } else return true;
                  } else return true;
                  
                  //
                } catch {
                  return true;
                }
              })
              .map((warning) => (
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
