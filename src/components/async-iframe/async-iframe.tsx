import React, {useEffect, useRef, useState} from 'react';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {IframeContent} from "@/components/async-iframe/iframe-content";
import moment from "moment";
import {dateConfigs} from "@/assets/resources";

moment.locale(dateConfigs.lang);

interface AsyncIframeProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  placeholder?: React.ReactNode;
}

const AsyncIframe: React.FC<AsyncIframeProps> = ({
                                                   title,
                                                   placeholder,
                                                   ...props
                                                 }) => {
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleLoad = () => setLoading(false);
  
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  const defaultPlaceholder = (
    <div className="placeholder-glow w-100 h-100 rounded">
      <span className="placeholder w-100 h-100 rounded"/>
    </div>
  );
  
  const containerClasses = `rounded ${!loading ? 'border' : ''}`;
  
  return (
    <div
      ref={containerRef}
      className={containerClasses}
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
      
      <OverlayTrigger
        overlay={
          <Tooltip>
            <span>{title}</span>
          </Tooltip>
        }
      >
        <IframeContent
          {...props}
          onLoad={handleLoad}
          loading={loading ? "lazy" : "eager"}
          isFullscreen={isFullscreen}
          containerRef={containerRef}
        />
      </OverlayTrigger>
    </div>
  );
};

export default AsyncIframe;
