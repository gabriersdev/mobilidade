import {Spinner, Button} from "react-bootstrap";
import PropTypes from "prop-types";
import config from "../../config.js";
import moment from "moment";
import {useCallback, useEffect, useRef, useState} from "react";
import AnimatedComponents from "../animatedComponent/AnimatedComponents.jsx";
import ToastComponent from "../toast/Toast.jsx";

const Print = ({variant, prevContentTarget}) => {
  const [htmlContent, setHtmlContent] = useState("");
  const [printable, setPrintable] = useState(false);
  const [fileTitle, setFileTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [printableAreaExists, setPrintableAreaExists] = useState(false);
  const [show, setshow] = useState(false);
  
  // Conteúdo dos arquivos index.css e App.css, usados para estilizar elementos que o framework nao estiliza
  const cssContent = useRef(`
    body {
      font-family: "Inter", sans-serif !important;
    }
  
    body, * {
      font-size: 12px;
    }
  
    .fs-2, .fs-3 {
      font-family: 'Inter Tight', 'Inter', sans-serif;
      letter-spacing: normal !important;
    }
  
    :root {
      --red: #DF0A0A;
      --naval-blue: #3959D9;
      --green-sheets: #538504;
      --purple: #6434F4;
    }
  
    .red {
      color: var(--red);
    }
  
    .naval-blue {
      color: var(--naval-blue);
    }
  
    .green-sheets {
      color: var(--green-sheets);
    }
  
    .purple {
      color: var(--purple);
    }
  
    .gap-2rem {
      gap: 2rem;
    }
  
    .arial {
      font-family: Arial, sans-serif;
    }
  
    .text-ellipsis-2 {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  
    .content-text {
      &.column {
        column-count: 2;
        column-gap: 2rem;
  
        @media screen and (max-width: 768px) {
          column-count: 1;
        }
      }
  
      ul li {
        list-style-type: square;
      }
    }
  
    .content-text * {
      line-height: 1.75;
    }
  
    .text-balance {
      text-wrap: balance;
    }
  
    .text-sml {
      font-size: 13px !important;
    }
  
    .fs-inherit {
      font-size: inherit !important;
    }
  
    p * {
      font-size: inherit !important;
      color: inherit !important;
    }
  
    .alert-warning-summary, .bar-info-summary, summary {
      &::marker {
        list-style-type: none;
        font-family: 'bootstrap-icons', sans-serif;
        content: "";
      }
  
      &[open]::marker {
        list-style-type: none;
        font-family: 'bootstrap-icons', sans-serif;
        content: "";
      }
    }
  
    .sm-text-center {
      @media screen and (max-width: 500px) {
        text-align: center;
      }
    }
  
    .hide-max-width-419 {
      @media (max-width: 419px) {
        display: none;
      }
    }
	`);
  
  const handleClick = useCallback((e) => {
    e.preventDefault();
    setPrintable(true);
    setLoading(true);
    
    let html;
    let title;
    let element
    
    const prevContent = prevContentTarget ? document.getElementById(prevContentTarget) : "";
    
    const footerInfos = `
			<div class='mt-5'>
				<p class="mb-0 text-muted">Informações obtidas em ${moment().format("DD/MM/YYYY")} às ${moment().format("HH[h]mm[m]")}.</p>
				<p class="mb-0">&copy;${moment().format("YYYY") || "2025"} todos os direitos reservados à <a class="text-primary-emphasis text-decoration-none" href="https://mobilidade.lts.app.br">Mobilidade - mobilidade.lts.app.br</a></p>
			</div>`
    
    if (variant === "departure-times" || variant === "departure-points") {
      const isDepartureTimes = variant === "departure-times";
      
      if (isDepartureTimes) {
        title = "<h1 class='mt-3 mb-2 fs-2'>Horários de partidas da</h1>";
        element = document.getElementById(`departure-times-data`);
        setFileTitle("horarios-de-partida");
      } else {
        title = "<h1 class='mt-3 mb-2 fs-2'>Pontos de parada da</h1>";
        element = document.getElementById(`departure-points-data`)
        setFileTitle("pontos-de-parada");
      }
      
      if (element) {
        element = element.outerHTML;
        element = element.replaceAll("class=\"accordion-collapse collapse\"", "class=\"accordion-collapse collapse show\"");
        element = element.replaceAll("type=\"button\" aria-expanded=\"false\" class=\"accordion-button collapsed\"", "type=\"button\" aria-expanded=\"true\" class=\"accordion-button\"");
        
        html = title + prevContent.outerHTML + "<div class='d-block mt-5'></div>" + element + footerInfos;
      } else {
        alert("Algo não saiu como deveria. Por favor entre em contato com os desenvolvedores. Não será possível imprimir o PDF no momento.")
        return;
      }
    }
    
    setHtmlContent(html);
  }, [prevContentTarget, variant]);
  
  useEffect(() => {
    let int;
    
    if (variant === "departure-times" || variant === "departure-points") {
      int = setInterval(() => {
        const cond = document.getElementById(variant === "departure-times" ? "departure-times-data" : "departure-points-data")
        // console.log(cond, !!cond)
        setPrintableAreaExists(!!cond);
      }, 2000);
    }
    
    return () => {
      setInterval(int);
    }
  }, [variant]);
  
  useEffect(() => {
    if (htmlContent && printable && fileTitle) {
      try {
        fetch(`${config.host}/api/render-pdf`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            html: htmlContent, css: cssContent.current,
          }),
        })
          .then(res => {
            return res.json();
          })
          .then(data => {
            
            if (data?.["error"] === "Você fez muitas solicitações para gerar PDFs. Por favor, aguarde.") {
              alert(`Espere um pouquinho! ${data?.["error"]}`);
              return;
            }
            
            const link = document.createElement('a');
            link.href = `data:application/pdf;base64,${data}`;
            link.target = '_target';
            link.download = `${fileTitle}.pdf`;
            document.body.appendChild(link);
            setTimeout(() => {
              link.click();
            }, 500)
            link.remove();
            setshow(true)
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
            setLoading(false);
            setPrintable(false);
          });
      } catch (error) {
        console.log(error);
        console.error(error);
      }
    }
  }, [htmlContent, printable, fileTitle]);
  
  if (printableAreaExists) {
    return (
      <div>
        <ToastComponent show={show} setShow={setshow} title={"Mobilidade"} time={"agora"} content={(<span className={"text-success"}>Arquivo para impressão gerado e baixado com sucesso!</span>)}/>
        <AnimatedComponents>
          <Button variant={"primary"} className={"btn-sm d-flex align-items-center justify-content-center " + (loading ? "cursor-not-allowed opacity-75" : "")} onClick={handleClick}>
            {
              loading ? (
                <div>
                  <span className={"me-2"}>Imprimindo</span>
                  <Spinner animation="grow" role="status" size={"sm"}>
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : (
                <div>
                  <span className={"me-2"}>Imprimir</span>
                  <i className="bi bi-printer-fill"></i>
                </div>
              )
            }
          </Button>
        </AnimatedComponents>
      </div>
    )
  } else {
    return null;
  }
}

Print.propTypes = {
  variant: PropTypes.string.isRequired,
  prevContentTarget: PropTypes.string,
}

export default Print;
