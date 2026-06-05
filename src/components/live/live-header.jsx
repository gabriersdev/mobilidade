import Title from "../ui/title/title.jsx";
import {LiveFormDeparturePoints, LiveFormLines} from "./live-form.jsx";
import {LoadingDeparturePoints} from "./live-infos.jsx";

const LiveHeader = ({lines, setLineSelected, departurePoints, setDeparturePointSelected}) => {
  return (
    <>
      <div className={"mb-3"}>
        <Title title="Ao vivo" id="topo" classX=" text-body-secondary"/>
      </div>
      <div>
        {lines && <LiveFormLines lines={lines} setLineSelected={setLineSelected}/>}
        {departurePoints ? (
          <LiveFormDeparturePoints departurePoints={departurePoints} setDeparturePointSelected={setDeparturePointSelected}/>
        ) : (
          <LoadingDeparturePoints/>
        )}
      </div>
    </>
  );
};

export default LiveHeader;
