import PropTypes from "prop-types";
import Grid from "../ui/grid/grid.jsx";
import Card from "../ui/card/card.jsx";
import {Badge, Image} from "react-bootstrap";
import Util from "../../assets/Util.jsx";
import Convert from "../../assets/Convert.js";
import {useEffect, useState} from "react";

const ScrollX = ({children}) => {
  return <div className={"overflow-x-scroll d-flex scroll-x gap-3 pt-2 pb-3"}>{children}</div>
}

ScrollX.propTypes = {
  children: PropTypes.node,
}

const GetCompanyIdentification = ({line}) => {
  const [companyIdentification, setCompanyIdentification] = useState(<></>);
  
  useEffect(() => {
    switch (line.company_name.toLowerCase().trim()) {
      case "Transporte Coletivo Metropolitano - MG".toLowerCase().trim():
        setCompanyIdentification(<Image src={"/images/companies/der-mg.png"} width={40} height={15} className={"object-fit-contain rounded-0"}/>);
        break
      case "Vinscol".toLowerCase().trim():
        setCompanyIdentification(<Image src={"/images/companies/vinscol.svg"} width={40} height={20} className={"object-fit-contain rounded-0"}/>);
        break
    }
  }, [line]);
  
  return companyIdentification;
}

const ListLines = ({data, variant}) => {
  const [content, setContent] = useState(null);
  useEffect(() => {
    setContent(<>
      {data.map((line) => {
        // console.log(line)
        return (
          <Card
            key={line.line_id}
            title={`Linha`}
            link={`/lines/${line.line_id}`}
            badge={(
              <div className="d-flex flex-wrap gap-1">
                <Badge
                  className={"bg-primary rounded-5 text-white"}
                  style={{letterSpacing: '0.5px'}}>
                  N.º {line.line_number}
                </Badge>
                
                {parseFloat(line.fare) > 0 ? (<Badge
                  className={"bg-primary-subtle rounded-5 text-primary-emphasis"}
                  style={{letterSpacing: '0.5px'}}>
                  {Util.formatMoney(line.fare)}
                </Badge>) : ""}
                
                {line.type ? (<Badge
                  className={`${Convert.colorIdentification((Convert.lineType(line.type) || "").split(' ')[0])} rounded-5`}
                  style={{letterSpacing: '0.5px'}}>
                  {(Convert.lineType(line.type) || "").split(' ')[0]}
                </Badge>) : ""}
                
                <GetCompanyIdentification line={line}/>
              </div>
            )}
            subtitle={
              // TODO - refatorar com componente específico para o funcionamento
              line.direction === 0 ? (`${line.departure_location} ⇄ ${line.destination_location} (ida e volta)`) : `${line.departure_location} ⇄ ${line.destination_location}`.trim()
            }
          >
            {Util.resumeInfoLine(line)}
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

GetCompanyIdentification.propTypes = {
  line: PropTypes.object.isRequired,
}

ListLines.propTypes = {
  data: PropTypes.array.isRequired,
  variant: PropTypes.string,
}

export default ListLines;
