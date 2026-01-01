import {useEffect, useRef, useState} from "react";
import {Button} from "react-bootstrap";
import PropTypes from "prop-types";

const SeeMore = ({children, mobileOnly = false, height = 200}) => {
  const [expanded, setExpanded] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const contentRef = useRef(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (contentRef.current) setShouldShow(contentRef.current.scrollHeight > height);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [height]);
  
  useEffect(() => {
    if (contentRef.current) setShouldShow(contentRef.current.scrollHeight > height);
  }, [children, height, isMobile]);
  
  const isActive = !mobileOnly || (mobileOnly && isMobile);
  
  if (!isActive) {
    return <>{children}</>;
  }
  
  return (
    <div className="position-relative">
      <div
        ref={contentRef}
        className="position-relative"
        style={{
          maxHeight: (shouldShow && !expanded) ? `${height}px` : "none",
          overflow: "hidden",
          transition: "max-height 0.3s ease-in-out"
        }}
      >
        {children}
        
        {shouldShow && !expanded && (
          <div
            className="position-absolute bottom-0 start-0 w-100"
            style={{
              height: "100px",
              background: "linear-gradient(to bottom, transparent, var(--bs-body-bg, #fff))",
              pointerEvents: "none"
            }}
          >
          </div>
        )}
      </div>
      
      {shouldShow && (
        <div className="d-flex justify-content-center mt-2">
          <Button
            variant="link"
            onClick={() => setExpanded(!expanded)}
            className="text-decoration-none p-0"
            style={{zIndex: 10}}
          >
            {expanded ? (
              <div className={"d-flex gap-2"}>
                <span>Ver menos</span>
                <i className="bi bi-arrow-bar-down ms-1"></i>
              </div>
            ) : (
              <div className={"d-flex gap-2"}>
                <span>Ver mais</span>
                <i className="bi bi-arrow-bar-down ms-1"></i>
              </div>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

SeeMore.propTypes = {
  children: PropTypes.node.isRequired,
  mobileOnly: PropTypes.bool,
  height: PropTypes.number
}

export default SeeMore;
