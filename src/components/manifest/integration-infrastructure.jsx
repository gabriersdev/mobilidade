import Title from "@/components/ui/title/title";

const IntegrationInfrastructure = () => (
  <section id="id" className="content-text">
    <Title type='h2' classX=" text-primary-emphasis lh-sm">Infraestrutura de Integração</Title>
    <ul className={"list-group"}>
      <li className={"list-group-item text-balance py-3 text-body"}>Criar cápsulas e estações de integração para os sistemas metropolitano e municipal, com fácil acesso aos usuários do Transporte Público e estrutura para não permitir formas de burlar o sistema de integração.</li>
      <li className={"list-group-item text-balance py-3 text-body"}>
        <span>Estabelecer um sistema e valor único para cada uma das integrações entre os sistemas:</span>
        <ul className={"ps-3 mt-2"}>
          <li>Municipal ⇄ Municipal</li>
          <li>Municipal ⇄ Metropolitano</li>
          <li>Municipal ⇄ Intermunicipal</li>
          <li>Metropolitano ⇄ Intermunicipal</li>
        </ul>
      </li>
      <li className={"list-group-item text-balance py-3 text-body"}>O sistema deve limitar a integração a uma quantindade X por dia e estabelecer um tempo máximo entre o desembarque de um sistema ou ônibus e embarque em outro.</li>
      <li className={"list-group-item text-balance py-3 text-body"}>Remoção de locais em que é permitido estacionar, como a Rua Beira Rio, Praça Marquês de Sapucaí, pontos da Av. Prefeito Victor Fantini e nos bairros, que causem transtornos ao trânsito.</li>
      <li className={"list-group-item text-balance py-3 text-body"}>Implementar tarifas dinâmicas: à excessão das linhas que não têm pelo menos dois pontos finais (sendo cada um deles, o ponto de partida para um sentido), deve ser implementado um sistema de tarifas dinâmicas, que variam de acordo com a distância em que a pessoa embarca e o ponto de final do sentido da linha. Para evitar meios de burlar esse sistema deve ser pensado mecanismos que identifiquem a permanência ou não do passageiro durante muito tempo no ônibus, antes de a viagem ser paga e a catraca liberada. Este meio de tarifação só deve ser possível através da bilhetagem eletrônica.</li>
    </ul>
  </section>
);

export default IntegrationInfrastructure;
