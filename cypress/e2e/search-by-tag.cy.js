// noinspection CypressCommandSubjectValidation,JSCheckFunctionSignatures

import moment from "moment/moment";

moment.locale("pt-BR");
const now = moment();

describe('Search Page Flow', () => { // Nome do bloco de testes
  beforeEach(() => {
    // Visita a página antes de cada teste no bloco
    cy.visit('http://localhost:5173/search/?term=metropolitano');
  });
  
  it(`Should find "Para onde vamos?", search for a line, and verify the line's title`, () => { // Um único teste para o fluxo
    cy.contains("Para onde vamos?").should('be.visible');
    
    cy.wait(500);
    cy.screenshot(`/lines/line-page-bandeirante-${now.format('YYYYMMDDHHmmss')}`, {
      capture: 'viewport'
    });
  });
});
