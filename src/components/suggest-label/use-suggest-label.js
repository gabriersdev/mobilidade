import {useStops} from './use-stops.js';
import {useBusPredictions} from './use-bus-predictions.js';

const useSuggestLabel = () => {
  const {stops, selectedStop, setSelectedStop} = useStops();
  const busTimes = useBusPredictions(selectedStop);
  
  return {
    stops,
    selectedStop,
    setSelectedStop,
    busTimes
  };
};

export default useSuggestLabel;
