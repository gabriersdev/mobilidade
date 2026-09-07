import {useEffect, useState, useMemo} from "react";
import PropTypes from "prop-types";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import apiClient from "@/assets/axios-config.js";

export default function LiveLinesAtPoint({data, departurePointSelected}) {
  const [allLines, setAllLines] = useState([]);
  
  useEffect(() => {
    if (departurePointSelected?.id) {
      apiClient.post('/predictions/departure-points/lines', {pointId: departurePointSelected.id})
        .then(res => {
          if (Array.isArray(res.data)) {
            setAllLines(res.data);
          }
        })
        .catch(err => console.error("Error fetching lines at point:", err));
    }
  }, [departurePointSelected]);
  
  const sortedLines = useMemo(() => {
    const predictions = (data || []).map(d => d?.line_number).filter(Boolean);
    const frequencies = predictions.reduce((acc, line) => {
      acc[line] = (acc[line] || 0) + 1;
      return acc;
    }, {});
    
    const linesWithFrequencies = [];
    const processedLines = new Set();
    
    Object.keys(frequencies).forEach(line => {
      linesWithFrequencies.push({line, count: frequencies[line], hasPredictions: true});
      processedLines.add(line);
    });
    
    linesWithFrequencies.sort((a, b) => b.count - a.count);
    
    const remainingLines = allLines
      .filter(l => !processedLines.has(String(l.line_number)))
      .map(l => ({line: String(l.line_number), count: 0, hasPredictions: false}))
      .sort((a, b) => a.line.localeCompare(b.line));
    
    return [...linesWithFrequencies, ...remainingLines];
  }, [data, allLines]);
  
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
                    <span key={index} className={`fs-inherit ${!item.hasPredictions ? 'opacity-50' : ''}`}>
                      {index !== 0 ? <i className="bi bi-dot opacity-50"></i> : ""}{item.line}
                    </span>
                  ))}
                </div>
              </Tooltip>
            }
          >
            <div className="text-ellipsis-1 d-block">
              {visibleLines.map((item, index) => (
                <span key={index} className={!item.hasPredictions ? 'opacity-50' : ''}>
                  {index !== 0 ? <i className="bi bi-dot opacity-50"></i> : ""}{item.line}
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
  departurePointSelected: PropTypes.object,
};
