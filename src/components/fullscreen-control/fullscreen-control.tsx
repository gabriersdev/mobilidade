import React, {useEffect, useRef, useState} from 'react';
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

interface FullscreenControlProps {
  elementRef: React.RefObject<HTMLElement | HTMLDivElement | null>;
}

const FullscreenControl: React.FC<FullscreenControlProps> = ({elementRef}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);
  
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isCurrentlyFullscreen);
      
      if (isCurrentlyFullscreen) {
        requestWakeLock();
      } else {
        releaseWakeLock();
      }
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      releaseWakeLock();
    };
  }, []);
  
  const requestWakeLock = async () => {
    if ('wakeLock' in navigator) {
      try {
        wakeLockRef.current = await navigator.wakeLock.request('screen');
        console.log('Wake Lock is active.');
      } catch (err) {
        console.error(`${(err as Error).name}, ${(err as Error).message}`);
      }
    }
  };
  
  const releaseWakeLock = () => {
    if (wakeLockRef.current) {
      wakeLockRef.current.release().then(() => {
        wakeLockRef.current = null;
        console.log('Wake Lock is released.');
      });
    }
  };
  
  const toggleFullscreen = () => {
    if (!elementRef.current) return;
    
    if (!isFullscreen) {
      elementRef.current.requestFullscreen().catch(err => {
        console.error("Error attempting to enable full-screen mode:", err);
        alert("Não é possível entrar no modo tela cheia neste navegador. Tente em outro.");
      });
    } else {
      document.exitFullscreen();
    }
  };
  
  return (
    <Button
      variant={!isFullscreen ? "primary" : "info"}
      size={"sm"}
      className={"d-flex align-items-center gap-2 flex-wrap"}
      onClick={toggleFullscreen}
      style={{position: 'absolute', top: '1rem', right: '1rem', zIndex: 10}}
    >
      <i className={`bi ${!isFullscreen ? 'bi-fullscreen' : 'bi-fullscreen-exit'}`}></i>
      <span className={"d-none d-md-inline-block text-sml"}>
        {!isFullscreen ? 'Abrir em tela cheia' : 'Sair da tela cheia'}
      </span>
    </Button>
  );
};

FullscreenControl.propTypes = {
  elementRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  }).isRequired
};

export default FullscreenControl;
