import PropTypes from "prop-types";
import Card from "../ui/card/card.jsx";
import {Badge, Image} from "react-bootstrap";
import Util from "../../assets/Util.jsx";
import Convert from "../../assets/Convert.js";
import {useEffect, useState} from "react";
import PaginationWithItems from "../pagination-with-items/pagination-with-items.jsx";

const ScrollX = ({children}) => {
  return <div className={"overflow-x-scroll d-flex scroll-x gap-3 pt-2 pb-3"}>{children}</div>
}

ScrollX.propTypes = {
  children: PropTypes.node,
}

const GetCompanyIdentification = ({line}) => {
  const [companyIdentification, setCompanyIdentification] = useState(<></>);
  
  useEffect(() => {
    if (!line.company_name) return;
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
  const [content, setContent] = useState([]);
  
  useEffect(() => {
    if (Array.isArray(data)) {
      const lines = data.map((line) => (
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
            line.direction === 0 ? (`${line.departure_location} ⇄ ${line.destination_location} (ida e volta)`) : `${line.departure_location} ⇄ ${line.destination_location}`.trim()
          }
        >
          {Util.resumeInfoLine(line)}
        </Card>
      ));
      setContent(lines);
    } else {
      setContent([]);
    }
  }, [data]);
  
  return (
    <div style={{marginTop: '1rem'}}>
      {variant === "similar-lines" ? (
        <ScrollX>{content}</ScrollX>
      ) : (
        <PaginationWithItems
          items={content}
          itemsPerPage={10}
          classNameOfContainer={"grid similar-lines mt-3"}
          beforeSelector={true}
        />
      )}
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
