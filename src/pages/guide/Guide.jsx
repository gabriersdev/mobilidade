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
      <div>
        <Title title="Guia do Transporte Público de Sabará-MG" id="topo" classX=" text-body-secondary"/>
        <p>Guia em construção.</p>
      </div>
    </div>
  );
}

export default Guide;
