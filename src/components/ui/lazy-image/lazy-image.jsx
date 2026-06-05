import {useState} from 'react';
import {Image} from 'react-bootstrap';
import PropTypes from 'prop-types';

const LazyImage = ({src, alt, ...props}) => {
  const [loading, setLoading] = useState(true);
  
  const handleLoad = () => {
    setLoading(false);
  };
  
  const placeholder = (
    <div className="placeholder-glow w-100 h-100 rounded">
      <span className="placeholder w-100 h-100 rounded"></span>
    </div>
  );
  
  return (
    <div style={{position: 'relative', width: '100%', height: '100%', minHeight: '250px'}}>
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            maxWidth: 600,
            height: '100%',
          }}
        >
          {placeholder}
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        onLoad={handleLoad}
        style={{visibility: loading ? 'hidden' : 'visible'}}
        {...props}
      />
    </div>
  );
};

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default LazyImage;
