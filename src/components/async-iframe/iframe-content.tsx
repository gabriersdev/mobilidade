import React from 'react';
import Clock from "@/components/clock/clock";
import FullscreenControl from "@/components/fullscreen-control/fullscreen-control";

interface IframeContentProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  isFullscreen: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  loading: "eager" | "lazy";
}

export const IframeContent: React.FC<IframeContentProps> = ({
                                                              isFullscreen,
                                                              containerRef,
                                                              loading,
                                                              ...props
                                                            }) => {
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
      
      <FullscreenControl elementRef={containerRef}/>
      <iframe
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
