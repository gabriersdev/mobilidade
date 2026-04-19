const BusTimePlaceholder = () => (
  <div className="d-flex flex-column gap-1 w-100">
    {Array.from({ length: 3 }).map((_, i) => (
      <div className="placeholder-glow" key={i}>
        <span className="placeholder col-12"></span>
      </div>
    ))}
  </div>
);

export default BusTimePlaceholder;
