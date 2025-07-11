import {useContext} from "react";
import PropTypes from "prop-types";
import Card from "../card/Card.jsx";
import Grid from "../grid/Grid.jsx";
import {RechargeContext} from "./RecharchePointsContext.jsx";

const ListPoints = ({data}) => {
  const {handlePointClick} = useContext(RechargeContext);

  return (
    <Grid>
      {data.map((recharchePoint, index) => {
        return (
          <a key={index} style={{cursor: "pointer"}}>
            <Card title={recharchePoint.point_name} subtitle={recharchePoint.address} onclick={(e) => handlePointClick(e, recharchePoint)}>
              {recharchePoint.observations || "Não há observações sobre este ponto de recarga."}
            </Card>
          </a>
        )
      })}
    </Grid>
  )
}

ListPoints.propTypes = {
  data: PropTypes.array.isRequired
}

export default ListPoints;
