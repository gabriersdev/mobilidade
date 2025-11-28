import ListRechargePoints from '../../src/components/list-recharge-points/list-recharge-points.jsx';

describe('ListRechargePoints Component', () => {
  it('should display "Pontos de recargas" when mounted', () => {
    // Monta o componente de forma isolada
    cy.mount(<ListRechargePoints  company_name={"Vinscol"} id_company={3}/>);
    
    // Verifica se o texto está presente no componente montado
    cy.contains('Pontos de recargas').should('be.visible');
  });
});
