import React, { useState } from 'react';

interface AsyncIframeProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  placeholder?: React.ReactNode;
}

const AsyncIframe: React.FC<AsyncIframeProps> = ({ src, title, placeholder, ...props }) => {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  // Placeholder padrão usando as classes do Bootstrap
  const defaultPlaceholder = (
    <div className="placeholder-glow w-100 h-100">
      <span className="placeholder w-100 h-100"></span>
    </div>
  );

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
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
      <iframe
        src={src}
        title={title}
        onLoad={handleLoad}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          visibility: loading ? 'hidden' : 'visible',
        }}
        {...props}
      />
    </div>
  );
};

export default AsyncIframe;
