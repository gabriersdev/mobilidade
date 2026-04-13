import 'react';
import PropTypes from 'prop-types';
import FullscreenControl from '@/components/fullscreen-control/fullscreen-control.tsx';

export default function LiveFullscreenControl({resultSection}) {
  return (
    <div className={"d-flex align-items-center flex-wrap gap-2"}>
      <FullscreenControl elementRef={resultSection}/>
    </div>
  );
}

LiveFullscreenControl.propTypes = {
  resultSection: PropTypes.object.isRequired,
};
