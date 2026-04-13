import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import infos from "@/assets/infos.jsx";

const BarInfo = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleResize = () => setShow(document.body.offsetWidth > 766);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const validInfos = infos.filter(i => {
    const now = new Date().getTime();
    return now >= new Date(i.init).getTime() && now <= new Date(i.finish).getTime();
  });

  const renderInfo = (title, message) => (
    <details className={"container"} open={show}>
      <summary className={"fs-6 mb-0 fw-bold text-danger text-balance bar-info-summary sm-text-center"}>
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        {title}
      </summary>
      <p className={"text-sml mt-2 mb-0 text-balance sm-text-center text-danger-emphasis"}>{message}</p>
    </details>
  );

  return validInfos.map(({title, message, link}, index) => (
    <div className={`py-4 bg-danger-subtle border-bottom border-danger-subtle`} key={index}>
      {link ? (
        <Link to={link} className={'text-decoration-none'}>
          {renderInfo(title, message)}
        </Link>
      ) : (
        <>{renderInfo(title, message)}</>
      )}
    </div>
  ));
};

export default BarInfo;
