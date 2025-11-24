import {useEffect} from 'react'
import Title from "../../components/title/Title.jsx";
import Util from "../../assets/Util.jsx";
import GetAndListLines from "../../components/getAndListLines/GetAndListLines.jsx";

const Manifest = () => {
  useEffect(() => {
    // Altera o título da página
    document.title = "Mobilidade - Manifesto de Mobilidade para o Transporte Público de Sabará";
    Util.updateActiveLink();
  }, [])
  
  return (
    <div>
      <hgroup>
        <Title title="Manifesto de Mobilidade para o Transporte Público de Sabará" type={"h1"} id="topo" classX=" d-none"/>
        <Title title="Manifesto de Mobilidade" type={"h2"} id="topo" classX=" fs-2 text m-0 p-0 lh-sm text-primary"/>
        <Title title="para o Transporte Público de Sabará" type={"h2"} id="topo" classX=" fs-2 text-body-secondary lh-sm"/>
        <p>Última atualização: 23<span className="arial">/</span>11<span className="arial">/</span>2025</p>
      </hgroup>
      
      <section className="content-text">
        <section id="id">
          <Title type='h2' classX=" text-body-tertiary">Title</Title>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </section>
      </section>
      
      <section id={"principais-linhas"} className={"pt-3"}>
        <Title type="h3" classX={" text-body-secondary"}>Principais Linhas</Title>
        <GetAndListLines variant="main"/>
      </section>
    </div>
  );
}

export default Manifest;
