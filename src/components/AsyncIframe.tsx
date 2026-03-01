import React, {useState} from 'react';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

interface AsyncIframeProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  placeholder?: React.ReactNode;
}

const AsyncIframe: React.FC<AsyncIframeProps> = ({src, title, placeholder, ...props}) => {
  const [loading, setLoading] = useState(true);
  
  const handleLoad = () => {
    setLoading(false);
  };
  
  // Placeholder padrão usando as classes do Bootstrap
  const defaultPlaceholder = (
    <div className="placeholder-glow w-100 h-100 rounded">
      <span className="placeholder w-100 h-100 rounded"></span>
    </div>
  );
  
  return (
    <div
      className={(!loading && "border") + " rounded"}
      style={{position: 'relative', width: '100%', height: '100%'}}
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
        <iframe
          src={src}
          onLoad={handleLoad}
          className={"rounded"}
          style={{
            width: '100%',
            height: '300px',
            border: 'none',
            visibility: loading ? 'hidden' : 'visible',
          }}
          {...props}
        />
      </OverlayTrigger>
    </div>
  );
};

export default AsyncIframe;
