import {useEffect} from 'react'

import Util from "../../assets/Util.jsx";
import Title from "../../components/ui/title/title.jsx";
import GetAndListLines from "../../components/get-and-list-lines/get-and-list-lines.jsx";

const Manifest = () => {
  useEffect(() => {
    // Altera o título da página
    document.title = "Mobilidade - Manifesto de Mobilidade para o Transporte Público de Sabará";
    Util.updateActiveLink();
    
    const breadcrumbsItems = Array.from(document.querySelectorAll('.breadcrumb-item'));
    breadcrumbsItems[1].textContent = 'Manifesto';
  }, []);
  
  return (
    <div>
      <hgroup>
        <Title title="Manifesto de Mobilidade para o Transporte Público de Sabará" type={"h1"} id="topo" classX=" d-none"/>
        <Title title="Manifesto de Mobilidade" type={"h2"} id="topo" classX=" fs-2 text m-0 p-0 lh-sm text-primary"/>
        <Title title="para o Transporte Público de Sabará" type={"h2"} id="topo" classX=" fs-2 text-body-secondary lh-sm"/>
        <p>Última atualização: 23<span className="arial">/</span>11<span className="arial">/</span>2025</p>
      </hgroup>
      
      
      <section id="id" className="content-text">
        <Title type='h2' classX=" text-body-tertiary">Premissas</Title>
        <p>
          Este manifesto tem o objetivo de propor mudanças e melhorias na infraestrutura de Transporte Público da cidade de Sabará e também à estrutura Metropolitana que atende aos sabarenses. Aqui, proporemos ampliação, reativação e criação de linhas, alteração de itinerários, integração entre os diferentes sistemas de Transporte Público e terminais de integração entre as linhas de ônibus da cidade, as linhas de ônibus de Belo Horizonte, o Move e trem.
        </p>
      </section>
      
      <section id="id" className="content-text">
        <Title type='h2' classX=" text-body-tertiary">Ampliação, reativação, alteração de itinerário e criação de linhas</Title>
        <Title type='h3' classX=" text-body-tertiary">Linhas metropolitanas e intermunicipais</Title>
        <ul>
          <li>Criação da linha 4985 - Sabará para Raposos via Nova Lima, passando pela estrada do bairro Paciência.</li>
          <li>Ampliação da linha 4986 - Sabará para Belo Horizonte (Bandeirante) nos horários de partida de dias úteis (06, 08, 10, 16 e 18 horas) e criação de horários de partida nos horários de sábado e domingo (06 e 16 horas).</li>
          <li>Retorno do funcionamento da linha 4987 - Sabará para Belo Horizonte (Executivo) nos horários de sábado e domingo, com partidas pelo menos a cada 2 horas, em hora ímpar, por exemplo (11, 13, 15 e 17 horas).</li>
          <li>Alteração do itinerário da linha 4987 - Sabará para Belo Horizonte (Executivo), atendendo maior parte do Barro Preto, passando pela Praça Raul Soares e retornando à Av. Contorno.</li>
          <li>Aumento dos horários de partidas da linha 4988 nos horários de sábado e domingo à noite.</li>
          <li>Criação da linha 4988A - Sabará para Belo Horizonte via Av. Central (Av. Nova).</li>
          <li>Alteração do número da linha 4988 - Sabará para Belo Horizonte para 4988B, pois a linha passa por &#34;baixo&#34; (via Av. Perimetral e Av. Prefeito Victor Fantini).</li>
          <li>Criação da linha 4988C - Sabará para Belo Horizonte via Centro Histórico.</li>
          <li>Criação da linha 4988S - Sabará para Belo Horizonte (Semidireta), parando apenas em pontos de paradas de auto movimento.</li>
          <li>Reativação da linha 4989 - Sabará retorno Av. José Cândido da Silveira atendimento Cidade Nova e Sagrada Família com funcionamento em dias úteis, e partidas nos horários de pico (06, 07, 17 e 18 horas) com integração do sistema metropolitano e trem.</li>
          <li>Reativação da linha 4990 - Sabará atendimento Paciência e Adelmolândia para Belo Horizonte e ampliação dos horários, nos horários de dias úteis (05, 06, 07, 16, 17 e 18 horas) e criação de horários de partida nos horários de sábado e domingo.</li>
          <li>Alteração do itinerário da linha 4991 - Sabará para Terminal São Gabriel via Barraginha, passando a entrar na Estação São Gabriel e integrar o sistema metropolitano, com Move e trem.</li>
          <li>Criação da linha 4994 - Sabará para Belo Horizonte atendimento Hospitais via General Carneiro e Av. Andradas.</li>
          <li>Criação da linha 4995 - Sabará para Belo Horizonte - Move Metropolitano via Barraginha e Av. Cristiano Machado (Semidireta) com integração do sistema metropolitano, Move e trem.</li>
          <li>Integração das linhas 4970, 4985, 4986, 4987, 4988, 4989, 4991, 4994 e 4995 com todas as linhas do sistema municipal.</li>
        </ul>
        
        <Title type='h3' classX=" text-body-tertiary">Linhas municipais</Title>
        <ul>
          <li>Criação da linha 12, bairro Pompeu para Roças Grande, com atendimento a região conhecida como &#34;praia&#34; no bairro Pompeu.</li>
          <li>Criação da linha 13, bairro Paciência para Campo Santo Antônio.</li>
          <li>Alteração dos horários das linhas 04 - Paciência para Pompeu e 06 - Roças Grande para Campo Santo Antônio, com alternação de horários entre essas linhas e as novas linhas (12 e 13).</li>
          <li>Ampliação dos horários das linhas 04 - Paciência para Pompeu e 06 - Roças Grande para Campo Santo Antônio com novos horários à noite de todos os horários (dias úteis, sábado e domingos).</li>
          <li>Alteração do itinerário da linha 04, em todos os horários, passando pelas ruas Raimundo Francisco Ferreira e Raimundo Aguido Ferreira no bairro Pompeu.</li>
          <li>Ampliação dos horários das linhas 02, 03, 08, 09 e 10 com novos horários em todos os horários (dias úteis, sábado e domingos).</li>
          <li>Integração de todas as linhas do sistema municipal com o sistema metropolitano.</li>
          <li>Implementação do meio passe para estudantes das redes Municipal e Estadual, estudantes de Ensino Superior de todas as redes e baixa renda.</li>
          <li>Diminuição da vida útil máxima dos veículos do Transporte Público da cidade de 15 para 12 anos.</li>
          <li>Aumento da fiscalização da qualidade do serviço prestado, incluindo limpeza, manutenção e conforto dos veículos.</li>
          <li>Implementação de vans para transporte para as linhas ou horários que não houverem grande demanda.</li>
        </ul>
      </section>
      
      <section id="id" className="content-text">
        <Title type='h2' classX=" text-body-tertiary">Infraestrutura de Integração</Title>
        <ul>
          <li>Criar cápsulas e estações de integração para os sistemas metropolitano e municipal, com fácil acesso aos usuários do Transporte Público e estrutura para não permitir formas de burlar o sistema de integração.</li>
          <li>
            <span>Estabelecer um sistema e valor único para cada uma das integrações dos sistemas:</span>
            <ul>
              <li>Municipal ⇄ Municipal</li>
              <li>Municipal ⇄ Metropolitano</li>
              <li>Municipal ⇄ Intermunicipal</li>
              <li>Metropolitano ⇄ Intermunicipal</li>
            </ul>
          </li>
          <li>O sistema deve limitar a integração a X quantidades de integração por dia e tempo máximo entre o desembarque de um sistema e embarque no outro.</li>
          <li>Remoção de locais em que é permitido estacionar, como a Rua Beira Rio, Praça Marquês de Sapucaí, pontos da Av. Perimetral e Av. Prefeito Victor Fantini e nos bairros.</li>
        </ul>
      </section>
      
      <section id={"principais-linhas"} className={"pt-3"}>
        <Title type="h3" classX={" text-body-secondary"}>Principais Linhas</Title>
        <GetAndListLines variant="main"/>
      </section>
    </div>
  );
}

export default Manifest;
