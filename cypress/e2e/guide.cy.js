import moment from "moment/moment";
moment.locale("pt-BR");
const now = moment();

describe('Guide Page - Departure Points Search Lines', () => { // Nome do bloco de testes mais descritivo
  beforeEach(() => {
    // Visita a página antes de cada teste no bloco
    cy.visit('http://localhost:5173/guide'); // Assumi que a URL é /live, ajuste se for diferente
  });
  
  const titleH1 = 'Guia do Transporte Público de Sabará-MG';
  it(`Should display the "${titleH1}" title`, () => {
    cy.contains(titleH1).should('be.visible');
  });
  
  it('Search location in "Guide Page"', () => {
    cy.get('.input-group input')
      .should('be.visible')
      .type('José Vaz', {delay: 100});
    
    cy.get('.input-group button[type=submit]')
      .should('be.visible')
      .click();
    
    cy.wait(1500);
    cy.screenshot(`/guide/search-departure-point-guide-${now.format('YYYYMMDDHHmmss')}`, {
      capture: 'viewport'
    });
  });
});
