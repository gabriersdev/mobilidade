import PropTypes from "prop-types";
import Grid from "../grid/Grid.jsx";
import Card from "../card/Card.jsx";
import {Badge} from "react-bootstrap";
import Util from "../../assets/Util.jsx";
import Convert from "../lineIdentification/convert.js";
import {useEffect, useState} from "react";

const ScrollX = ({children}) => {
  return <div className={"overflow-x-scroll d-flex scroll-x gap-3 pt-2 pb-3"}>{children}</div>
}

ScrollX.propTypes = {
  children: PropTypes.node,
}

const ListLines = ({data, variant}) => {
  const [content, setContent] = useState(null);
  
  useEffect(() => {
    setContent(<>
      {data.map((line) => {
        // console.log(line)
        return (
          <Card key={line.line_id} title={`Linha`} badge={(
            <div className="d-flex flex-wrap gap-1">
              <Badge
                className={"bg-primary rounded-5 text-white fw-normal"}
                style={{letterSpacing: '0.5px'}}>
                N.º {line.line_number}
              </Badge>
              
              {parseFloat(line.fare) > 0 ? (<Badge
                className={"bg-primary-subtle rounded-5 text-primary-emphasis fw-normal"}
                style={{letterSpacing: '0.5px'}}>
                {Util.formatMoney(line.fare)}
              </Badge>) : ""}
              
              {line.type ? (<Badge
                className={`${Convert.colorIdentification((Convert.lineType(line.type) || "").split(' ')[0])} rounded-5 fw-normal`}
                style={{letterSpacing: '0.5px'}}>
                {(Convert.lineType(line.type) || "").split(' ')[0]}
              </Badge>) : ""}
            </div>
          )}
                subtitle={`${line.departure_location} -> ${line.destination_location}`.trim()}
                link={`/lines/${line.line_id}`}>{Util.resumeInfoLine(line)}
          </Card>
        )
      })}
    </>);
  }, [])
  
  return (
    <div style={{marginTop: '1rem'}}>
      {variant === "similar-lines" ? (<ScrollX>{content}</ScrollX>) : <Grid variant={"similar-lines"}>{content}</Grid>}
    </div>
  );
}

ListLines.propTypes = {
  data: PropTypes.array.isRequired, variant: PropTypes.string,
}

export default ListLines;
