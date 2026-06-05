import moment from "moment";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import AnimatedComponents from "@/components/ui/animated-component/animated-components.jsx";
import useLiveComponent from "@/components/live/use-live-component.js";
import LiveHeader from "@/components/live/live-header.jsx";
import LiveResultsDisplay from "@/components/live/live-results-display.jsx";
import {LiveConfigs} from "@/components/live/live-configs.jsx";

import bcAll from "@/components/breadcrumb-app/breadcrumb-context.jsx";
import {dateConfigs} from "@/assets/resources.js";

const useBreadcrumb = bcAll.useBreadcrumb;

moment.locale(dateConfigs.lang);

const Live = () => {
  const {
    setLineSelected,
    departurePointSelected,
    setDeparturePointSelected,
    data,
    dataNextDepartureTimes,
    error,
    loading,
    lines,
    departurePoints,
    datetimeOriginalFetch,
    now,
    resultSection,
    configs,
    setConfigs,
    labelsConfigs,
  } = useLiveComponent();
  
  const {setLabel} = useBreadcrumb();
  const navigate = useNavigate();
  
  useEffect(() => {
    setLabel("live", "Ao vivo");
  }, [setLabel]);
  
  useEffect(() => {
    const base = "/live";
    if (departurePointSelected?.id) {
      navigate(base + "?sei=" + (departurePointSelected?.["id"] ?? ""));
    } else {
      navigate(base);
    }
  }, [departurePointSelected, navigate]);
  
  return (
    <AnimatedComponents>
      <LiveHeader
        lines={lines}
        setLineSelected={setLineSelected}
        departurePoints={departurePoints}
        setDeparturePointSelected={setDeparturePointSelected}
      />
      
      <LiveResultsDisplay
        departurePointSelected={departurePointSelected}
        loading={loading}
        data={data}
        dataNextDepartureTimes={dataNextDepartureTimes}
        error={error}
        datetimeOriginalFetch={datetimeOriginalFetch}
        now={now}
        configs={configs}
        resultSection={resultSection}
      />
      
      <div className={"d-flex flex-column gap-3 mt-3"}>
        <LiveConfigs
          configs={configs}
          setConfigs={setConfigs}
          labelsConfigs={labelsConfigs}
          resultSection={resultSection}
        />
      </div>
    </AnimatedComponents>
  );
};

export default Live;
