import {useEffect} from 'react'
import Title from "../../components/title/Title";
// import Util from "../../assets/Util.jsx";

const Development = () => {
  useEffect(() => {
    document.title = "Mobilidade - Desenvolvimento";
    // Util.updateActiveLink()
  }, [])
  
  return (
    <div>
      <Title title="Desenvolvimento" id="topo" classX=" text-body-secondary"/>
      
      <section className="content-text column">
        <section id="introducao">
          <Title type='h2' classX=" text-body-tertiary">Introdução ao Projeto</Title>
          <p>Nosso projeto de mobilidade urbana busca fornecer dados precisos e atualizados sobre as linhas de transporte público da cidade. Acreditamos que, ao facilitar o acesso a essas informações, estamos promovendo uma mobilidade mais eficiente e acessível para todos.</p>
        </section>
        
        <section id="objetivo">
          <Title type='h2' classX=" text-body-tertiary">Objetivo do Projeto</Title>
          <p>Nosso principal objetivo é melhorar a experiência de uso do transporte público. Com dados confiáveis e detalhados, queremos facilitar o planejamento dos usuários, promovendo uma mobilidade urbana mais inteligente e sustentável.</p>
        </section>
        
        <section id="funcionalidades">
          <Title type='h2' classX=" text-body-tertiary">Funcionalidades Principais</Title>
          <ul>
            <li><strong>Pesquisa de Linhas e Roteiros:</strong> Encontre as linhas de ônibus e outros meios de transporte disponíveis para sua rota de forma prática e rápida.</li>
            <li><strong>Informações em Tempo Real:</strong> Receba atualizações ao vivo sobre os horários de chegada e saída, além de informações sobre a lotação e atrasos.</li>
            <li><strong>Mapas Interativos:</strong> Acompanhe visualmente as rotas e os pontos de parada no mapa da cidade, facilitando o entendimento dos trajetos.</li>
            <li><strong>Alertas e Notificações:</strong> Saiba em tempo real sobre alterações nas linhas, obras, eventos e outras situações que possam impactar o seu trajeto.</li>
          </ul>
        </section>
        
        <section id="como-utilizar">
          <Title type='h2' classX=" text-body-tertiary">Como Utilizar o Sistema</Title>
          <p>Para utilizar o sistema, basta acessar a página inicial e pesquisar pelo número da linha ou pelo nome do local de destino. Em instantes, você verá as opções disponíveis com informações detalhadas sobre horários, roteiros e paradas.</p>
          <p>Navegar pelo nosso sistema é fácil e intuitivo: digite o número da linha ou a localização desejada, e o sistema retornará as melhores opções de trajeto para o seu percurso.</p>
        </section>
        
        <section id="beneficios">
          <Title type='h2' classX=" text-body-tertiary">Benefícios para a Comunidade</Title>
          <p>Com informações atualizadas e acessíveis, ajudamos os cidadãos a planejar seus deslocamentos de maneira mais inteligente, reduzindo o tempo de espera e promovendo uma cidade mais conectada.</p>
          <p>Nosso sistema contribui para uma cidade mais sustentável, incentivando o uso do transporte público e, assim, diminuindo o tráfego e a poluição.</p>
        </section>
        
        <section id="tecnologia">
          <Title type='h2' classX=" text-body-tertiary">Tecnologia e Parcerias</Title>
          <p>Este projeto conta com o apoio de diversas empresas e órgãos públicos comprometidos em melhorar a mobilidade urbana da cidade. Utilizamos tecnologias de última geração para garantir uma experiência rápida e confiável para os usuários.</p>
          <p>Desenvolvido com tecnologias modernas, nosso sistema se adapta a diferentes dispositivos e integra APIs para fornecer dados em tempo real, garantindo uma experiência fluida e confiável.</p>
        </section>
        
        <section id="feedback">
          <Title type='h2' classX=" text-body-tertiary">Feedback e Suporte</Title>
          <p>Estamos sempre buscando melhorias! Sua opinião é importante para nós. Envie sugestões e informe sobre problemas encontrados para que possamos aprimorar o sistema.</p>
          <p>Se precisar de ajuda ou tiver dúvidas sobre o uso do sistema, entre em contato conosco através do nosso suporte. Nossa equipe está à disposição para ajudar.</p>
        </section>
      </section>
    </div>
  );
}

export default Development;
