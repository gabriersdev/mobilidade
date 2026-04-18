import {useRef} from "react";
import PropTypes from "prop-types";

import {LineContext} from "./line-context.jsx";
import {useLineData} from "./use-line-data.js";
import {usePageEffects} from "./use-page-effects.js";

import AnimatedComponents from "../ui/animated-component/animated-component.jsx";
import FeedbackError from "@/components/ui/feedback-error/feedback-error.jsx";
import Alert from "../ui/alert/alert.jsx";
import LineHeader from "./line-header.jsx";
import DepartureTimesSection from "./departure-times-section.jsx";
import DeparturePointsSection from "./departure-points-section.jsx";
import RenderLiveMap from "./render-live-map.jsx";
import RechargePointsSection from "./recharge-points-section.jsx";
import SimilarLinesSection from "./similar-lines-section.jsx";
import AboutSection from "./about-section.jsx";

const Line = ({id}) => {
  const {data, error, isLoaded} = useLineData(id);
  const paradasSection = useRef(<></>);
  usePageEffects(data, paradasSection);
  
  if (isLoaded) {
    return (
      // TODO - aplicar placeholder
      <AnimatedComponents>
        <div>Carregando...</div>
      </AnimatedComponents>
    );
  }
  
  if (error) {
    return (
      <AnimatedComponents>
        <FeedbackError code={error.response ? error.response.status || 500 : 500} text={error.message} type={'card'}/>
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
  
  const line = data[0];
  
  return (
    <AnimatedComponents>
      <div className="d-flex flex-column" style={{gap: '3rem'}}>
        <LineContext line={line}>
          <div className="d-flex flex-column" style={{gap: '3rem'}}>
            <LineHeader line={line}/>
            <DepartureTimesSection line={line}/>
            <DeparturePointsSection line={line} ref={paradasSection}/>
            <RenderLiveMap data={data}/>
            <RechargePointsSection line={line}/>
            <SimilarLinesSection/>
            <AboutSection line={line}/>
          </div>
        </LineContext>
      </div>
    </AnimatedComponents>
  );
};

Line.propTypes = {
  id: PropTypes.string.isRequired
};

export default Line;
