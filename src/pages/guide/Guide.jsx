import { useEffect } from 'react'
import Util from "../../assets/Util.jsx";
import Title from "../../components/title/Title.jsx";

const Guide = () => {
  useEffect(() => {
    // Altera o título da página
    const psTitle = `Guia do Transporte Público`;
    document.title = `Mobilidade - ${psTitle} de Sabará-MG`;
    Util.updateActiveLink()
    
    const dataCompanyId = document.querySelector('.breadcrumb-item:nth-child(2)')
    if (dataCompanyId) dataCompanyId.querySelector('a').textContent = `${psTitle}`;
  }, [])

  return (
    <div>
      <div className={"d-flex flex-column gap-5"}>
        <Title title="Guia do Transporte Público de Sabará-MG" id="topo" classX=" text-body-secondary"/>
        <section>
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <span className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  Rua Central
                </button>
              </span>
              <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <ul className="ps-3 m-0" style={{lineHeight: 1.75}}>
                    <li>- 12345678901</li>
                    <li>- 12345678901</li>
                    <li>- 12345678901</li>
                    <li>- 12345678901</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Guide;
