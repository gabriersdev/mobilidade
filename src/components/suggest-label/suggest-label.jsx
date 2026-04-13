import React from "react";
import useSuggestLabel from "./use-suggest-label.js";
import StopSelector from "./stop-selector.jsx";
import BusTimesDisplay from "./bus-times-display.jsx";
import LiveMenu from "./live-menu.jsx";

export default function SuggestLabel() {
  const {
    stops,
    selectedStop,
    setSelectedStop,
    busTimes
  } = useSuggestLabel();
  
  return (
    <div>
      <div className="bg-body-secondary px-2 py-1 rounded d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div className="text-body-secondary">
          <StopSelector stops={stops} selectedStop={selectedStop} onSelectStop={setSelectedStop}/>
        </div>
        <BusTimesDisplay busTimes={busTimes}/>
        <div>
          <LiveMenu selectedStop={selectedStop}/>
        </div>
      </div>
    </div>
  );
}
