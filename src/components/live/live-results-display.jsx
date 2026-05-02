import React from 'react';
import moment from "moment";
import Util from "../../lib/Util.jsx";
import Weather from "../weather/weather.jsx";
import {
  AlertInfoFeature,
  LiveGeneralError,
  LoadingDeparturePoints,
  AnyBusProximityError,
  AlertInfoConfigSomeDepartureStart,
  SelectOneDeparturePoint
} from "./live-infos.jsx";
import LiveListSingleLine from "./live-list-single-line.jsx";
import LiveListResults from "./live-list-results.jsx";
import LiveFullscreenControl from "./live-fullscreen-control.jsx";

const LiveResultsDisplay = ({
  departurePointSelected,
  loading,
  data,
  dataNextDepartureTimes,
  error,
  datetimeOriginalFetch,
  now,
  configs,
  resultSection
}) => {
  return (
    <div className={"rounded-3 bg-body-secondary p-3 mt-5 position-relative"} ref={resultSection}>
      <div className={"d-flex flex-column gap-0"}>
        <Weather />
        <AlertInfoFeature />
      </div>

      {error && <LiveGeneralError />}

      {departurePointSelected ? (
        <>
          <div className={"d-flex flex-column gap-0 mb-3"}>
            <span className={"text-muted text-sml"}>Local</span>
            <span>{Util.renderText(departurePointSelected?.["title"])}</span>
          </div>

          {loading ? (
            <LoadingDeparturePoints />
          ) : data && Array.isArray(data) && data.length ? (
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

              {configs?.["showSomeDepartureStart"] && <AlertInfoConfigSomeDepartureStart />}
              {configs?.["showSingleLine"] ? (
                <LiveListSingleLine data={data} configs={configs} />
              ) : (
                <LiveListResults data={data} dataNextDepartureTimes={dataNextDepartureTimes} configs={configs} />
              )}
            </>
          ) : (
            <AnyBusProximityError />
          )}
        </>
      ) : (
        <SelectOneDeparturePoint />
      )}

      <LiveFullscreenControl resultSection={resultSection} />
    </div>
  );
};

export default LiveResultsDisplay;
