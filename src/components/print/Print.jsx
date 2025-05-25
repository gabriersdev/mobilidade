import {Button} from "react-bootstrap";
import PropTypes from "prop-types";
import config from "../../config.js";

const Print = ({variant}) => {
  // console.log(variant);
  return (
    <Button variant={"primary"} className={"btn-sm d-flex align-items-center justify-content-center d-none"} onClick={() => {
      fetch(`${config.host}/api/render-pdf`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({html: '<h1>OI</h1>', css: 'body {font-family: "Inter", sans-serif !important; font-size: 16px;}'}),
      })
        .then(res => res.json())
        .then(data => {
          const link = document.createElement('a');
          link.href = `data:application/pdf;base64,${data}`;
          link.download = 'document.pdf';
          document.body.appendChild(link);
          setTimeout(() => {
            link.click();
          }, 500)
          link.remove();
        });
    }}>
      <span className={"me-2"}>Imprimir</span>
      <i className="bi bi-printer-fill"></i>
    </Button>
  )
}

Print.propTypes = {
  variant: PropTypes.string.isRequired
}

export default Print;