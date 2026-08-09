const BusTimePlaceholder = () => (
  <div className="d-flex flex-row gap-2 align-items-center flex-grow-1 flex-wrap flex-shrink-1 placeholder-glow">
    {Array.from({length: 1}).map((_, i) => (
      <span className="placeholder col-12 rounded-1" style={{ minWidth: '40px', minHeight: '1.25rem' }} key={i}></span>
    ))}
  </div>
);

export default BusTimePlaceholder;
