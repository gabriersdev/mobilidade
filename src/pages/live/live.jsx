import moment from "moment";

import Util from "../../assets/Util.jsx";
import LiveListResults from "../../components/live/live-list-results.jsx";
import AnimatedComponents from "../../components/ui/animated-component/animated-components.jsx";
import LiveFullscreenControl from "../../components/live/live-fullscreen-control.jsx";
import Title from "../../components/ui/title/title.jsx";
import useLiveComponent from "../../components/live/use-live-component.js";

import {LiveConfigs} from "../../components/live/live-configs.jsx";
import {LoadingDeparturePoints, AnyBusProximityError, LiveGeneralError, SelectOneDeparturePoint, AlertInfoFeature, AlertInfoConfigSomeDepartureStart} from "../../components/live/live-infos.jsx";
import {LiveFormLines, LiveFormDeparturePoints} from "../../components/live/live-form.jsx";
import Weather from "../../components/weather/weather.jsx";
import {useEffect, useRef} from "react";

moment.locale("pt-BR");

const Live = () => {
  const {
    setLineSelected,
    departurePointSelected,
    setDeparturePointSelected,
    data,
    dataNextDepartureTimes,
    error,
    lines,
    departurePoints,
    datetimeOriginalFetch,
    now,
    resultSection,
    configs,
    setConfigs,
    labelsConfigs,
    
    fetchData
  } = useLiveComponent();
  
  const alertShowSomeDepartureStartHasShowed = useRef(false);
  
  useEffect(() => {
    alertShowSomeDepartureStartHasShowed.current = !departurePointSelected;
  }, [departurePointSelected]);
  
  return (
    <AnimatedComponents>
      <div className={"mb-3"}>
        <Title title="Ao vivo" id="topo" classX=" text-body-secondary"/>
      </div>
      
      <div>
        <form onSubmit={async (e) => {
          e.preventDefault();
          await fetchData();
        }}>
          {lines && <LiveFormLines lines={lines} setLineSelected={setLineSelected}/>}
          {departurePoints ? <LiveFormDeparturePoints departurePoints={departurePoints} setDeparturePointSelected={setDeparturePointSelected}/> : <LoadingDeparturePoints/>}
        </form>
      </div>
      
      <div className={"rounded-3 bg-body-secondary p-3 mt-5"} ref={resultSection}>
        <div className={"d-flex flex-column gap-0"}>
          <Weather/>
          <AlertInfoFeature/>
        </div>
        
        {error && <LiveGeneralError/>}
        
        {
          departurePointSelected && (
            <>
              <div className={"d-flex flex-column gap-0 mb-3"}>
                <span className={"text-muted text-sml"}>Local</span>
                <span>{Util.renderText(departurePointSelected?.["title"])}</span>
              </div>
              
              {
                (data && Array.isArray(data) && data.length) ? (
                  <>
                    <div className={"d-flex gap-3 flex-wrap mb-3"}>
                      <div className={"d-flex flex-column gap-0 mb-3"}>
                        <span className={"text-muted text-sml"}>Atualizado</span>
                        <span>{moment.isMoment(datetimeOriginalFetch) ? Util.diffToHuman(datetimeOriginalFetch) : "-"}</span>
                      </div>
                      
                      <div className={"d-flex flex-column gap-0 mb-3"}>
                        <span className={"text-muted text-sml"}>Agora são</span>
                        <span>{Util.renderText(moment.isMoment(now) ? now.format("HH:mm:ss") : "-")}</span>
                      </div>
                    </div>
                    
                    {configs?.["showSomeDepartureStart"] && <AlertInfoConfigSomeDepartureStart/>}
                    <LiveListResults data={data} dataNextDepartureTimes={dataNextDepartureTimes} configs={configs}/>
                  </>
                ) : <AnyBusProximityError/>
              }
            </>
          )
        }
        
        {alertShowSomeDepartureStartHasShowed.current && !departurePointSelected && <SelectOneDeparturePoint/>}
        <LiveFullscreenControl resultSection={resultSection}/>
      </div>
      
      <div className={"d-flex flex-column gap-3 mt-3"}>
        <LiveConfigs configs={configs} setConfigs={setConfigs} labelsConfigs={labelsConfigs}/>
      </div>
    </AnimatedComponents>
  );
}

export default Live;
