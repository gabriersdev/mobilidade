import {useEffect} from 'react'

import Util from "../../assets/Util.jsx";
import Title from "../../components/ui/title/title.jsx";
import bcAll from "../../components/breadcrumb-app/breadcrumb-context.jsx";

import Premissas from "@/components/manifest/premissas.jsx";
import LineChanges from "@/components/manifest/line-changes.jsx";
import IntegrationInfrastructure from "@/components/manifest/integration-infrastructure.jsx";
import MainLines from "@/components/manifest/main-lines.jsx";

const useBreadcrumb = bcAll.useBreadcrumb;

const Manifest = () => {
  const {setLabel} = useBreadcrumb();
  
  useEffect(() => {
    // Altera o título da página
    document.title = "Mobilidade - Manifesto de Mobilidade para o Transporte Público de Sabará";
    Util.updateActiveLink();
    
    setLabel("manifest", "Manifesto");
  }, []);
  
  return (
    <div>
      <hgroup>
        <Title title="Manifesto de Mobilidade para o Transporte Público de Sabará" type={"h1"} id="topo" classX=" d-none"/>
        <div className={"d-inline-block gap-3 text-balance"}>
          <Title title="Manifesto de Mobilidade" type={"h2"} id="topo" classX=" fs-2 text m-0 p-0 lh-sm text-primary d-inline-block"/>
          <Title title="para o Transporte Público de Sabará" type={"h2"} id="topo" classX=" fs-2 text-body-secondary lh-sm d-inline-block"/>
        </div>
        <p>Última atualização: 27<span className="arial">/</span>02<span className="arial">/</span>2026</p>
      </hgroup>
      
      <Premissas/>
      <LineChanges/>
      <IntegrationInfrastructure/>
      <MainLines/>
    </div>
  );
}

export default Manifest;
