import React, {useEffect, useRef, useState} from 'react';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import FullscreenControl from "@/components/fullscreen-control/fullscreen-control";

interface AsyncIframeProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  placeholder?: React.ReactNode;
}

const AsyncIframe: React.FC<AsyncIframeProps> = ({src, title, placeholder, ...props}) => {
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleLoad = () => {
    setLoading(false);
  };
  
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
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
