describe('Page /lines/33', () => {
  // Antes de cada teste neste bloco, visite a página
  beforeEach(() => {
    cy.visit('http://localhost:5173/lines/33');
  });
  
  it('should display the "Pontos de recarga" title', () => {
    cy.contains('Pontos de recarga').should('be.visible');
  });
  
  // it('should display a list of recharge points', () => {
  //   // Supondo que seus pontos de recarga são renderizados em algum elemento específico
  //   cy.get('.recharge-point-list').should('have.length.greaterThan', 0);
  //   // Ou verifique um item específico que você espera ver na página
  //   cy.contains('Nome do Ponto de Recarga Esperado').should('be.visible');
  // });
});
