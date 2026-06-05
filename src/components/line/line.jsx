import {useRef} from "react";
import PropTypes from "prop-types";

import {useLineData} from "@/components/line/use-line-data.js";
import {usePageEffects} from "@/components/line/use-page-effects.js";
import AnimatedComponents from "@/components/ui/animated-component/animated-components.jsx";
import FeedbackError from "@/components/ui/feedback-error/feedback-error.jsx";
import Alert from "@/components/ui/alert/alert.jsx";
import LinePlaceholder from "@/components/line/line-placeholder.jsx";
import LineDetails from "@/components/line/line-details.jsx";

const Line = ({id}) => {
  const {data, error, isLoaded} = useLineData(id);
  const paradasSection = useRef(null);
  usePageEffects(data, paradasSection);
  
  if (isLoaded) {
    return <LinePlaceholder/>;
  }
  
  if (error) {
    return (
      <AnimatedComponents>
        <FeedbackError code={error.response?.status || 500} text={error.message} type={'card'}/>
      </AnimatedComponents>
    );
  }
  
  if (data.length === 0) {
    return (
      <AnimatedComponents>
        <Alert variant={'danger'} margin={"mt-0"}>
          <div className={"d-flex flex-column gap-1"}>
            <span>Informações sobre a linha não foram encontradas.</span>
            <span className={"text-sml"}>Isso pode acontecer se a linha foi desativada, suspensa ou não existe.</span>
          </div>
        </Alert>
      </AnimatedComponents>
    );
  }
  
  return <LineDetails line={data[0]} paradasSection={paradasSection} data={data}/>;
};

Line.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Line;
