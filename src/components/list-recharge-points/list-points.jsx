import {useContext} from "react";
import PropTypes from "prop-types";

import Card from "../ui/card/card.jsx";
import Grid from "../ui/grid/grid.jsx";
import {RechargeContext} from "./recharge-points-context.jsx";
import SeeMore from "../ui/see-more/see-more.jsx";

const ListPoints = ({data}) => {
  const {handlePointClick} = useContext(RechargeContext);
  
  return (
    <SeeMore mobileOnly={true} height={200}>
      <Grid>
        {data.map((rechargePoint, index) => {
          return (
            <a key={index} style={{cursor: "pointer"}}>
              <Card
                title={rechargePoint.point_name}
                subtitle={rechargePoint.address}
                onclick={(e) => handlePointClick(e, rechargePoint)}
                headerColumn={true}
                badge={(
                  <>
                    <div className={"text-primary d-flex align-items-center gap-1"}>
                      <i className="bi bi-credit-card-2-front-fill"></i>
                      <span className={"text-sml"}>Ponto oficial de Recarga</span>
                    </div>
                  </>
                )}
              >
                <span className={"m-0 p-0 d-inline"}>
                  {rechargePoint.observations || "Não há observações sobre este ponto de recarga. Para maiores informações entre em contato com o estabelecimento do ponto de recarga."}
                </span>
              </Card>
            </a>
          )
        })}
      </Grid>
    </SeeMore>
  )
}

ListPoints.propTypes = {
  data: PropTypes.array.isRequired
}

export default ListPoints;
