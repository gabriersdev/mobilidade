import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {Image} from "react-bootstrap";

const GetCompanyIdentification = ({line}) => {
  const [companyIdentification, setCompanyIdentification] = useState(<></>);
  
  useEffect(() => {
    if (!line.company_name) return;
    switch (line.company_name.toLowerCase().trim()) {
      case "Transporte Coletivo Metropolitano - MG".toLowerCase().trim():
        setCompanyIdentification(
          <Image
            src={"/images/companies/der-mg.png"}
            width={40}
            height={15}
            className={"object-fit-contain rounded-0 d-none d-md-block"}
          />
        );
        break
      
      case "Vinscol".toLowerCase().trim():
        setCompanyIdentification(
          <Image
            src={"/images/companies/vinscol.svg"}
            width={40}
            height={20}
            className={"object-fit-contain rounded-0 d-none d-md-block"}
          />
        );
        break
    }
  }, [line]);
  
  return companyIdentification;
}

GetCompanyIdentification.propTypes = {
  line: PropTypes.object.isRequired,
}

export default GetCompanyIdentification;
