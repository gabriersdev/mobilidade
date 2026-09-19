import FloatInfo from "@/components/floating-info/float-info.jsx";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";

export default function LineFloatingInfo({line}) {
  const [isTabletOrLarger, setIsTabletOrLarger] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : true
  );
  
  useEffect(() => {
    const handleResize = () => {
      setIsTabletOrLarger(window.innerWidth >= 768);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  if (!line || !isTabletOrLarger) return null;
  
  return <FloatInfo string={line["line_name"]?.replace(/\//, " ")}/>
}

LineFloatingInfo.propTypes = {
  line: PropTypes.shape({
    line_name: PropTypes.string.isRequired
  })
}
