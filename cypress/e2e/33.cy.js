describe('Page /lines/33', () => {
  // Antes de cada teste neste bloco, visite a página
  beforeEach(() => {
    cy.visit('http://localhost:5173/lines/33');
  });
  
  it(`Should display the line information items`, () => {
    cy.get('#id')
      .find('.d-flex.flex-column')
      .invoke('text')
      .then((text) => {
        const regexLineNumber = /Linha\s\d{2,4}\w*/
        expect(text).to.match(regexLineNumber);
        // Cypress.log(`Match "${regexLineNumber}" located`)
        const regexUpdateIn = /Infos.\satualizadas/
        expect(text).to.match(regexUpdateIn)
        // Cypress.log(`Match "${regexUpdateIn}" located`)
      })
    // cy.contains(/Linha\s\d{2,5}\w?/).should('be.hidden');
    // cy.contains('Companhia').should('be.visible');
    // cy.contains(/Atualizado\sem:\s\d{2}\sde\s\w*\sde\s\d{4}/).should('be.visible');
  });
  
  ["Horários de partidas", "Pontos de paradas", "Pontos de recarga", "Linhas similares"].forEach((item, i) => {
    it(`Should display the "${item}" title - iterate ${i}`, () => {
      cy.contains(item).should('be.visible');
    });
  });
  
  it('Should opened modal "Informar um erro"', () => {
    cy.get('.btn.m-0.px-2.pv-15.d-inline-block.text-white.text-decoration-none.border-0.outline-none')
      .find('span.me-1')
      .contains('Informar um erro')
      .click();
    
    const modal = '.fade.modal.show[role="dialog"]';
    
    cy.get(`${modal} textarea#error-message`)
      .type('Isso é um erro...', {delay: 100});
    
    cy.get(`${modal} button[type="submit"]`)
      .contains('Próximo')
      .click();
    
    cy.get(`${modal} .fw-semibold.modal-title.h4`)
      .contains('Informar um erro')
      .should('be.visible');
    
    cy.get(`${modal} button[type="button"]`)
      .contains('Cancelar')
      .click();
    
    cy.get('h1')
      .contains('Linha 4650 - Carvalho de Brito para Belo Horizonte')
      .should('be.hidden');
  });
  
  // it('should display a list of recharge points', () => {
  //   // Supondo que seus pontos de recarga são renderizados em algum elemento específico
  //   cy.get('.recharge-point-list').should('have.length.greaterThan', 0);
  //   // Ou verifique um item específico que você espera ver na página
  //   cy.contains('Nome do Ponto de Recarga Esperado').should('be.visible');
  // });
});
