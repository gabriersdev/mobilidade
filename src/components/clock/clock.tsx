import React from 'react';
import {useClock} from '@/hooks/useClock';

export const Clock: React.FC = () => {
  const time = useClock();

  return (
    <div
      className="btn btn-warning p-0 rounded-1 border border-warning"
      style={{pointerEvents: 'none', width: 90}}
    >
      <div className="py-1 px-2 d-flex align-items-center justify-content-between gap-1">
        <span>
          <i className="bi bi-watch"/>
        </span>
        <span className="d-block line-clamp-1 fw-bold">
          {time.format("HH[h]mm")}
        </span>
      </div>
    </div>
  );
};

export default Clock;
