import PropTypes from "prop-types";
import Grid from "../grid/Grid.jsx";
import Card from "../card/Card.jsx";
import {Badge} from "react-bootstrap";
import Util from "../../assets/Util.js";
import Convert from "../lineIdentification/convert.js";

const ListLines = ({data, variant}) => {
  return (
    <div style={{marginTop: '1rem'}}>
      <Grid>
        {data.map((line) => {
          // console.log(line)
          return (
            <Card key={line.line_id} title={`Linha`}
                  badge={(
                    
                    <div className="d-flex flex-wrap gap-1">
                      <Badge
                        className={"bg-primary rounded-5 text-white fw-normal"}
                        style={{letterSpacing: '0.5px'}}>
                        N.º {line.line_number}
                      </Badge>
                      
                      {
                        parseFloat(line.fare) > 0 ? (
                          <Badge
                            className={"bg-primary-subtle rounded-5 text-primary-emphasis fw-normal"}
                            style={{letterSpacing: '0.5px'}}>
                            {Util.formatMoney(line.fare)}
                          </Badge>
                        ) : ""
                      }
                      
                      {
                        line.type ? (
                          <Badge
                            className={`${Convert.colorIdentification((Convert.lineType(line.type) || "").split(' ')[0])} rounded-5 fw-normal`}
                            style={{letterSpacing: '0.5px'}}>
                            {(Convert.lineType(line.type) || "").split(' ')[0]}
                          </Badge>
                        ) : ""
                      }
                    </div>
                  )}
                  c={"TODO - Nome da linha, caso seja diferente da partida e destino"}
                  subtitle={`${line.departure_location} -> ${line.destination_location}`.trim()}
                  link={`/lines/${line.line_id}`}>{Util.resumeInfoLine(line)}
            </Card>
          )
        })}
        
        {/* TODO - separar em um componente */}
        {variant ? variant === "main" ? (
          <Card title={"Para ver mais linhas"} subtitle={"clique aqui ->"} link={'/lines/'}></Card>
        ) : "" : ""
        }
      </Grid>
    </div>
  );
}

ListLines.propTypes = {
  data: PropTypes.array.isRequired,
  variant: PropTypes.string,
}

export default ListLines;