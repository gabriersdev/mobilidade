import React, {useCallback, useEffect, useRef, useState} from 'react';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import FullscreenControl from "@/components/fullscreen-control/fullscreen-control";
import moment from "moment";
import {dateConfigs} from "@/assets/resources";

moment.locale(dateConfigs.lang);

interface AsyncIframeProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  placeholder?: React.ReactNode;
}

// TODO - refatorar componente
const AsyncIframe: React.FC<AsyncIframeProps> = (
  {
    src,
    title,
    placeholder,
    ...props
  }
) => {
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(moment());
  
  const handleLoad = () => setLoading(false);
  
  const updateTime = useCallback(() => {
    setInterval(() => {
      setTime(moment());
    }, 1000);
  }, [time]);
  
  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    updateTime();
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  // Placeholder padrão usando as classes do Bootstrap
  const defaultPlaceholder = (
    <div className="placeholder-glow w-100 h-100 rounded">
      <span className="placeholder w-100 h-100 rounded"></span>
    </div>
  );
  
  return (
    <div
      ref={containerRef}
      className={(!loading && "border") + " rounded"}
      style={{position: 'relative', width: '100%', height: '100%', backgroundColor: 'white'}}
    >
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          {placeholder || defaultPlaceholder}
        </div>
      )}
      
      <OverlayTrigger overlay={
        <Tooltip>
          <span>{title}</span>
        </Tooltip>}
      >
        <div style={{position: 'relative'}}>
          <div
            className="position-absolute w-100 d-flex justify-content-center"
            style={{
              bottom: '1rem',
              left: 0,
              zIndex: 15,
              pointerEvents: 'none'
            }}
          >
            {
              moment.isMoment(time) && (
                <div
                  className="btn btn-warning p-0 rounded-1 border border-warning cursor-not-allowed"
                  style={{pointerEvents: 'none', width: 90}}
                >
                  <div className="py-1 px-2 d-flex align-items-center justify-content-between gap-1">
                    <span>
                      <i className="bi bi-watch"></i>{" "}
                    </span>
                    <span className={"d-block line-clamp-1 fw-bold"}>
                      {time.format("HH[h]mm")}
                    </span>
                  </div>
                </div>
              )
            }
          </div>
          
          <FullscreenControl elementRef={containerRef}/>
          <iframe
            src={src}
            onLoad={handleLoad}
            className={"rounded"}
            style={{
              width: '100%',
              height: isFullscreen ? '100vh' : '500px',
              border: 'none',
              visibility: loading ? 'hidden' : 'visible',
            }}
            {...props}
          />
        </div>
      </OverlayTrigger>
    </div>
  );
};

export default AsyncIframe;
