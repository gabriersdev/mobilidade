// noinspection CypressCommandSubjectValidation,JSCheckFunctionSignatures

import moment from "moment/moment";

moment.locale("pt-BR");
const now = moment();

describe('Live Page', () => { // Nome do bloco de testes mais descritivo
  beforeEach(() => {
    // Visita a página antes de cada teste no bloco
    cy.visit('http://localhost:5173/news'); // Assumi que a URL é /live, ajuste se for diferente
  });
  
  it(`Should display the "Notícias" title`, () => {
    cy.contains("Notícias").should('be.visible');
    
    cy.wait(1500);
    cy.screenshot(`/news/news-page-${now.format('YYYYMMDDHHmmss')}`, {
      capture: 'fullPage'
    });
  });
  
  it(`Take a screenshot`, () => {
    cy.wait(2000);
    cy.screenshot(`/news/news-page-link-${now.format('YYYYMMDDHHmmss')}`, {
      capture: 'viewport'
    });
  });
});
