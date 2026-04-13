import {Button, Image} from "react-bootstrap";

const ScrollToTopButton = () => (
  <Button
    onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
    className="position-fixed rounded-2 z-2 bg-body"
    style={{right: "1rem", bottom: "1rem"}}
  >
    <div className="d-flex flex-wrap align-items-center justify-content-center gap-2">
      <span>Subir</span>
      <Image src="/static/mobilidade-blue.png" width={20} height={20} className="object-fit-cover rounded-1"/>
      <i className="bi bi-arrow-up-square"></i>
    </div>
  </Button>
);

export default ScrollToTopButton;
