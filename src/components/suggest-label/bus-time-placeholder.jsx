const BusTimePlaceholder = () => (
  // TODO - implementar os placeholder's em linha (flex-row) um ao lado do outro
  <div className="d-flex flex-column gap-1 w-100">
    {Array.from({length: 3}).map((_, i) => (
      <div className="placeholder-glow" key={i}>
        <span className="placeholder col-2"></span>
      </div>
    ))}
  </div>
);

export default BusTimePlaceholder;
