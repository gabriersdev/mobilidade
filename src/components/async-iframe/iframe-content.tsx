import React, {useState} from 'react';
import Clock from "@/components/clock/clock";
import FullscreenControl from "@/components/fullscreen-control/fullscreen-control";
import {Button} from "react-bootstrap";

interface IframeContentProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  isFullscreen: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  loading: "eager" | "lazy";
  onReload?: () => void;
}

export const IframeContent: React.FC<IframeContentProps> = (
  {
    isFullscreen,
    containerRef,
    loading,
    onReload,
    ...props
  }
) => {
  const [refreshKey, setRefreshKey] = useState(0);
  
  return (
    <div style={{position: 'relative'}}>
      <div
        className="position-absolute w-100 d-flex justify-content-center"
        style={{
          bottom: '1rem',
          left: 0,
          zIndex: 15,
          pointerEvents: 'none',
        }}
      >
        <Clock/>
      </div>
      
      <Button
        variant={"primary"}
        size={"sm"}
        className={"d-flex align-items-center gap-2 flex-wrap"}
        onClick={() => {
          if (onReload) onReload();
          setRefreshKey(prev => prev + 1);
        }}
        style={{position: 'absolute', top: '0.5rem', left: '0.5rem', zIndex: 10}}
      >
        <i className="bi bi-arrow-clockwise"></i>
        <span className={"d-none d-md-inline-block text-sml"}>
          Recarregar mapa
        </span>
      </Button>
      
      <FullscreenControl elementRef={containerRef}/>
      <iframe
        key={refreshKey}
        className="rounded"
        style={{
          width: '100%',
          height: isFullscreen ? '100vh' : '500px',
          border: 'none',
          visibility: loading === "lazy" ? 'hidden' : 'visible',
        }}
        {...props}
      />
    </div>
  );
};
