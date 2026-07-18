import {useMemo} from "react";
import PropTypes from "prop-types";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

export default function LiveLinesAtPoint({data}) {
  const sortedLines = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    
    const lines = data.map(d => d?.line_number).filter(Boolean);
    const frequencies = lines.reduce((acc, line) => {
      acc[line] = (acc[line] || 0) + 1;
      return acc;
    }, {});
    
    return Object.keys(frequencies).sort((a, b) => frequencies[b] - frequencies[a]);
  }, [data]);
  
  if (sortedLines.length === 0) {
    return null;
  }
  
  const MAX_VISIBLE = 5;
  const visibleLines = sortedLines.slice(0, MAX_VISIBLE);
  const hasMore = sortedLines.length > MAX_VISIBLE;
  
  return (
    <div>
      <div className="d-flex flex-column gap-0 mb-3" style={{maxWidth: 600}}>
        <span className="text-muted text-sml">Linhas que param ou partem daqui ({sortedLines.length})</span>
        <div className="">
          <OverlayTrigger
            overlay={
              <Tooltip>
                <div className="text-sml d-inline-block text-balance">
                  {sortedLines.map((item, index) => (
                    <span key={index} className="fs-inherit">
                      {index !== 0 ? <i className="bi bi-dot opacity-50"></i> : ""}{item}
                    </span>
                  ))}
                </div>
              </Tooltip>
            }
          >
            <div className="text-ellipsis-1 d-block">
              {visibleLines.map((item, index) => (
                <span key={index}>
                  {index !== 0 ? <i className="bi bi-dot opacity-50"></i> : ""}{item}
                </span>
              ))}
              {hasMore ? "..." : null}
            </div>
          </OverlayTrigger>
        </div>
      </div>
    </div>
  );
}

LiveLinesAtPoint.propTypes = {
  data: PropTypes.array,
};
