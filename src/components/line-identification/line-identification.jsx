import moment from "moment";
import {useContext} from "react";

import Util from "@/lib/Util.jsx";
import Convert from "@/lib/Convert.js";
import {Context} from "@/components/line/line-context.jsx";
import SeeMore from "@/components/ui/see-more/see-more.jsx";
import LineIdentificationHeader from "@/components/line-identification/line-identification-header.jsx";
import LineIdentificationComfortPopover from "@/components/line-identification/line-identification-comfort-popover.jsx";
import LineIdentificationAccessibilityPopover from "@/components/line-identification/line-identification-accessibility-popover.jsx";
import LineIdentificationIntegrationPopover from "@/components/line-identification/line-identification-integration-popover.jsx";
import LineIdentificationInfoList from "@/components/line-identification/line-identification-info-list.jsx";
import LineIdentificationActions from "@/components/line-identification/line-identification-actions.jsx";
import LineIdentificationLastUpdate from "@/components/line-identification/line-identification-last-update.jsx";
import {dateConfigs} from "@/assets/resources.js";

moment.locale(dateConfigs.lang);

const LineIdentification = () => {
  const {line} = useContext(Context);
  
  // useEffect(() => {
  //   console.groupCollapsed("[INFO] - Informações da linha");
  //   console.groupEnd();
  // }, []);
  
  const lineType = line ? Convert.lineType(line.type) : '';
  const scope = line ? Convert.theScope(line.scope) : '';
  const accessibility = line?.accessibility ?? "";
  const aircon = line?.aircon ?? false;
  const teraflex = line?.teraflex ?? false;
  const bench = line?.bench ?? false;
  const fleet = line?.fleet ?? false;
  const airsuspension = line?.airsuspension ?? false;
  const wifi = line?.wifi ?? false;
  const conc = line?.conc ?? false;
  
  const hasIntegration = line?.has_integration === 1 ? "Possui integração" : "Não possui integração";
  
  const fare = line && parseFloat(line.fare) === 0 ? "Não informado" : Util.formatMoney(line?.fare)?.replace("R$", "BRL");
  
  const countDepartureTimes = line?.count_departure_times || 0;
  const reportContact = line?.report_contact;
  const datetimeLastModify = line?.datetime_last_modify
    ? new Date((moment(line.datetime_last_modify).add(-3, "h")).format("YYYY-MM-DD HH:mm:zz"))
    : null;
  
  const accessibilityPopover = (
    <LineIdentificationAccessibilityPopover/>
  );
  
  const comfortPopover = (
    <LineIdentificationComfortPopover
      aircon={aircon}
      teraflex={teraflex}
      bench={bench}
      fleet={fleet}
      conc={conc}
      airsuspension={airsuspension}
      wifi={wifi}
    />
  );
  
  // T1DO - implementar retorno ou verificação do banco de dados de integração
  const integrationPopover = (
    <LineIdentificationIntegrationPopover line={line}/>
  );
  
  if (!line) return null;
  
  return (
    <div className="d-flex flex-column">
      <LineIdentificationHeader line={line}/>
      
      <SeeMore mobileOnly={true} height={200}>
        <div className={"d-flex flex-column gap-3 mt-5"}>
          <LineIdentificationInfoList
            lineType={lineType}
            scope={scope}
            integrationPopover={integrationPopover}
            hasIntegration={hasIntegration}
            accessibility={accessibility}
            accessibilityPopover={accessibilityPopover}
            comfortPopover={comfortPopover}
            fare={fare}
            line={line}
            countDepartureTimes={countDepartureTimes}
          />
          
          <LineIdentificationActions reportContact={reportContact} line={line}/>
          
          <LineIdentificationLastUpdate datetimeLastModify={datetimeLastModify}/>
        </div>
      </SeeMore>
    </div>
  )
}

export default LineIdentification;
