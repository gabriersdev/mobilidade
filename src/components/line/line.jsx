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
import {Placeholder} from "react-bootstrap";

// TODO - refatorar componente
const Line = ({id}) => {
  const {data, error, isLoaded} = useLineData(id);
  const paradasSection = useRef(<></>);
  usePageEffects(data, paradasSection);
  
  if (isLoaded) {
    // if (true) {
    return (
      // Placeholder de carregamento de dados das linhas
      <AnimatedComponents>
        {/*Toda a seção da página*/}
        <section className={"d-flex flex-column gap-4 gap-sm-5"}>
          {/*Título de identificação da linha e logo da operadora*/}
          <div className={"d-flex align-items-start justify-content-between gap-3"}>
            <Placeholder animation="glow" className={"w-50"}>
              <Placeholder className={"rounded w-100 py-4"}/>
            </Placeholder>
            
            <Placeholder animation="glow" className={"w-25"}>
              <Placeholder className={"rounded w-100 py-5"}/>
            </Placeholder>
          </div>
          
          {/*Parte de informações básicas da linha*/}
          <div className={"d-flex flex-column gap-2 mt-3 mt-md-5"}>
            <div>
              <Placeholder animation="glow">
                <Placeholder className={"rounded-1 w-15 py-3"}/>
              </Placeholder>
              
              <span>{" "}</span>
              
              <Placeholder animation="glow">
                <Placeholder className={"rounded-1 w-10 py-3"}/>
              </Placeholder>
              
              <span>{" "}</span>
              
              <Placeholder animation="glow">
                <Placeholder className={"rounded-1 w-25 py-3"}/>
              </Placeholder>
            </div>
            
            <div>
              <Placeholder animation="glow">
                <Placeholder className={"rounded-1 w-10 py-3"}/>
              </Placeholder>
              
              <span>{" "}</span>
              
              <Placeholder animation="glow">
                <Placeholder className={"rounded-1 w-25 py-3"}/>
              </Placeholder>
            </div>
            
            <div>
              <Placeholder animation="glow">
                <Placeholder className={"rounded-1 w-15 py-3"}/>
              </Placeholder>
            </div>
            
            <div>
              <Placeholder animation="glow">
                <Placeholder className={"rounded-1 w-25 py-3"}/>
              </Placeholder>
            </div>
            
            <div className={"mt-3"}>
              <Placeholder animation="glow">
                <Placeholder className={"rounded-1 w-10 py-3"}/>
              </Placeholder>
              
              <span>{" "}</span>
              
              <Placeholder animation="glow">
                <Placeholder className={"rounded-1 w-15 py-3"}/>
              </Placeholder>
              
              <span>{" "}</span>
              
              <Placeholder animation="glow">
                <Placeholder className={"rounded-1 w-10 py-3"}/>
              </Placeholder>
            </div>
          </div>
          
          {/*Correponde as seções de Horários de Partida, Pontos de Paradas e Recargas e banner's*/}
          {
            Array.from({length: 5}, i => i + 1).map((_, index) => (
              <div className={"d-flex flex-column mt-3 mt-md-5"} key={index}>
                <div className={"d-flex align-items-center justify-content-between gap-3"}>
                  <Placeholder animation="glow" className={"w-25"}>
                    <Placeholder className={"rounded-1 w-100 py-4"}/>
                  </Placeholder>
                  
                  <Placeholder animation="glow" className={"w-10"}>
                    <Placeholder className={"rounded-1 w-100 py-3"}/>
                  </Placeholder>
                </div>
                
                <Placeholder animation="glow" className={"w-100 mt-4"} key={index}>
                  <Placeholder className={"rounded-1 w-100 py-5"}>
                    <div className={"py-5"}></div>
                    <div className={"py-5"}></div>
                    <div className={"py-5"}></div>
                  </Placeholder>
                </Placeholder>
              </div>
            ))
          }
        </section>
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
          <AnimatedComponents>
            <div className="d-flex flex-column" style={{gap: '3rem'}}>
              <LineHeader line={line}/>
              <DepartureTimesSection line={line}/>
              <DeparturePointsSection line={line} ref={paradasSection}/>
              <RenderLiveMap data={data}/>
              <RechargePointsSection line={line}/>
              <SimilarLinesSection/>
              <AboutSection line={line}/>
            </div>
          </AnimatedComponents>
        </LineContext>
      </div>
    </AnimatedComponents>
  );
};

Line.propTypes = {
  id: PropTypes.string.isRequired
};

export default Line;
