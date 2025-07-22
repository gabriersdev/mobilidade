import { useEffect } from 'react'
import Title from "../../components/title/Title";
// import Util from "../../assets/Util.jsx";

const Privacy = () => {
  useEffect(() => {
    // Altera o título da página
    document.title = "Mobilidade - Privacidade";
    // Util.updateActiveLink()
  }, [])

  return (
    <div>
      <div>
        <Title title="Privacidade" id="topo" classX=" text-body-secondary" />
        <p>Última atualização: 13<span className="arial">/</span>11<span className="arial">/</span>2024</p>
      </div>

      <section className="content-text">
        <section id="introducao">
          <Title type='h2' classX=" text-body-tertiary">1. Introdução</Title>
          <p>Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações pessoais ao utilizar nosso site de mobilidade urbana. Ao acessar o site, você concorda com as práticas descritas nesta política.</p>
        </section>

        <section id="informacoes-coletadas">
          <Title type='h2' classX=" text-body-tertiary">2. Informações Coletadas</Title>
          <p>Coletamos informações que você fornece diretamente, como nome e e-mail ao preencher formulários, e informações automáticas, como dados de navegação e endereço IP.</p>
          <ul>
            <li><strong>Informações de Cadastro:</strong> Nome, e-mail e outros dados fornecidos voluntariamente.</li>
            <li><strong>Dados de Navegação:</strong> Informações sobre como você usa o site, incluindo páginas acessadas e tempo de navegação.</li>
          </ul>
        </section>

        <section id="uso-informacoes">
          <Title type='h2' classX=" text-body-tertiary">3. Uso das Informações</Title>
          <p>Utilizamos as informações coletadas para:</p>
          <ul>
            <li>Melhorar e personalizar sua experiência no site;</li>
            <li>Responder a dúvidas e fornecer suporte ao usuário;</li>
            <li>Enviar comunicações relevantes, caso você tenha autorizado;</li>
            <li>Realizar análises e estudos sobre o uso do site.</li>
          </ul>
        </section>

        <section id="compartilhamento-informacoes">
          <Title type='h2' classX=" text-body-tertiary">4. Compartilhamento de Informações</Title>
          <p>Não compartilhamos suas informações pessoais com terceiros, exceto quando necessário para cumprir obrigações legais, proteger nossos direitos, ou com seu consentimento prévio.</p>
        </section>

        <section id="seguranca">
          <Title type='h2' classX=" text-body-tertiary">5. Segurança</Title>
          <p>Implementamos medidas de segurança para proteger suas informações pessoais. No entanto, nenhum sistema é completamente seguro, e não podemos garantir a total segurança dos dados transmitidos ou armazenados.</p>
        </section>

        <section id="cookies">
          <Title type='h2' classX=" text-body-tertiary">6. Cookies</Title>
          <p>Utilizamos cookies para melhorar a experiência do usuário e coletar dados de uso do site. Você pode configurar seu navegador para recusar cookies, mas isso pode afetar algumas funcionalidades do site.</p>
        </section>

        <section id="alteracoes-politica">
          <Title type='h2' classX=" text-body-tertiary">7. Alterações nesta Política de Privacidade</Title>
          <p>Reservamo-nos o direito de atualizar esta Política de Privacidade periodicamente. Alterações entrarão em vigor assim que publicadas no site. Recomendamos revisar esta página regularmente para se manter informado sobre nossa política de privacidade.</p>
        </section>

        <section id="contato">
          <Title type='h2' classX=" text-body-tertiary">8. Contato</Title>
          <p>Se tiver dúvidas ou preocupações sobre esta Política de Privacidade, entre em contato conosco pelo
            e-mail: <a href="mailto:devgabrielribeiro@gmail.com">devgabrielribeiro@gmail.com</a>.</p>
        </section>
      </section>
    </div>
  );
}

export default Privacy;
