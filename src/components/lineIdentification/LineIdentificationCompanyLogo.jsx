import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Image} from "react-bootstrap";

export default function LineIdentificationCompanyLogo({companyId}) {
  const [imgSrc, setImgSrc] = useState("/favicon.png");
  
  useEffect(() => {
    switch (+companyId) {
      case 3:
        setImgSrc("/images/companies/vinscol.svg");
        break;
      
      case 4:
        setImgSrc("/images/companies/der-mg.png");
        break;
      
      default:
        setImgSrc("/favicon.png");
    }
  }, [companyId]);
  
  return <Image src={imgSrc} alt={"Logo da companhia que opera esta linha"} width={100} height={50} className={"object-fit-contain rounded-1"}/>;
}

LineIdentificationCompanyLogo.propTypes = {
  companyId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
}
