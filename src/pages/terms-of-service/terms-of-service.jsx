import {useEffect} from 'react'

import Util from "../../assets/Util.jsx";
import Title from "../../components/ui/title/title.jsx";
import GetAndListLines from "../../components/get-and-list-lines/get-and-list-lines.jsx";

const TermsOfService = () => {
  useEffect(() => {
    // Altera o título da página
    document.title = "Mobilidade - Termos de Serviço";
    Util.updateActiveLink();
  }, [])
  
  return (
    <div>
      <div>
        <Title title="Termos de Serviço" id="topo" classX=" text-body-secondary"/>
        <p>Última atualização: 13<span className="arial">/</span>11<span className="arial">/</span>2024</p>
      </div>
      
      <section className="content-text">
        <section id="aceitacao">
          <Title type='h2' classX=" text-body-tertiary">1. Aceitação dos Termos</Title>
          <p>Ao acessar e usar este site, você concorda em cumprir e respeitar estes Termos de Serviço, bem como nossa
            Política de Privacidade. Caso não concorde com os termos, por favor, não utilize o serviço.</p>
        </section>
        
        <section id="descricao-servico">
          <Title type='h2' classX=" text-body-tertiary">2. Descrição do Serviço</Title>
          <p>Nosso site de mobilidade urbana oferece informações atualizadas sobre linhas de transporte público,
            incluindo horários, pontos de parada e rotas. O objetivo é auxiliar os usuários no planejamento de seus
            deslocamentos de maneira prática e eficiente.</p>
        </section>
        
        <section id="uso-aceitavel">
          <Title type='h2' classX=" text-body-tertiary">3. Uso Aceitável</Title>
          <p>Você concorda em utilizar este site apenas para fins pessoais e informativos. Não é permitido:</p>
          <ul>
            <li>Utilizar o site para fins ilegais ou não autorizados;</li>
            <li>Manipular ou modificar informações de rotas, horários ou outros dados disponíveis no site;</li>
            <li>Distribuir, reproduzir ou copiar conteúdo do site sem autorização prévia.</li>
          </ul>
        </section>
        
        <section id="precisao-dados">
          <Title type='h2' classX=" text-body-tertiary">4. Precisão e Atualização dos Dados</Title>
          <p>Nos esforçamos para manter as informações do site atualizadas e precisas, mas não garantimos a exatidão dos
            dados, como horários e status das linhas de transporte. Aconselhamos que os usuários confirmem as
            informações com as fontes oficiais, especialmente em caso de alterações de última hora.</p>
        </section>
        
        <section id="isencao-responsabilidade">
          <Title type='h2' classX=" text-body-tertiary">5. Isenção de Responsabilidade</Title>
          <p>Este site e seus conteúdos são fornecidos &quot;como estão&quot; e &quot;conforme disponíveis&quot;. Não
            nos responsabilizamos por qualquer dano direto ou indireto, perda de dados ou outros prejuízos resultantes
            do uso das informações fornecidas no site.</p>
        </section>
        
        <section id="direitos-autorais">
          <Title type='h2' classX=" text-body-tertiary">6. Direitos Autorais</Title>
          <p>O conteúdo disponível no site, incluindo textos, imagens, gráficos e design, é de propriedade
            exclusiva do projeto de mobilidade urbana ou de seus licenciadores, e é protegido por leis de direitos
            autorais e propriedade intelectual.</p>
        </section>
        
        <section id="alteracoes-termos">
          <Title type='h2' classX=" text-body-tertiary">7. Alterações nos Termos de Serviço</Title>
          <p>Reservamo-nos o direito de modificar estes Termos de Serviço a qualquer momento. Quaisquer alterações
            entrarão em vigor imediatamente após a publicação no site. Recomendamos que você revise esta página
            periodicamente para se manter informado sobre os termos atuais.</p>
        </section>
        
        <section id="contato">
          <Title type='h2' classX=" text-body-tertiary">8. Contato</Title>
          <p>Se você tiver dúvidas ou comentários sobre estes Termos de Serviço, entre em contato conosco pelo
            e-mail: <a href="mailto:devgabrielribeiro@gmail.com">devgabrielribeiro@gmail.com</a>.</p>
        </section>
      </section>
      
      <section id={"principais-linhas"} className={"pt-3"}>
        <Title type="h3" classX={" text-body-secondary"}>Principais Linhas</Title>
        <GetAndListLines variant="main"/>
      </section>
    </div>
  );
}

export default TermsOfService;
