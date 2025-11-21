import ListRechargePoints from '../../src/components/listRecharchePoints/ListRechargePoints.jsx';

describe('ListRechargePoints Component', () => {
  it('should display "Pontos de recargas" when mounted', () => {
    // Monta o componente de forma isolada
    cy.mount(<ListRechargePoints />);
    
    // Verifica se o texto está presente no componente montado
    cy.contains('Pontos de recargas').should('be.visible');
  });
});
