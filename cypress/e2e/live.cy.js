// noinspection CypressCommandSubjectValidation,JSCheckFunctionSignatures

import moment from "moment/moment";
import {dateConfigs} from "@/assets/resources.js";

moment.locale(dateConfigs.lang);
const now = moment();

describe('Live Page - Departure Points Combobox Interaction', () => { // Nome do bloco de testes mais descritivo
  beforeEach(() => {
    // Visita a página antes de cada teste no bloco
    cy.visit('http://localhost:5173/live?ei=3431');
  });
  
  it(`Should display the "Ao vivo" title`, () => {
    cy.contains("Ao vivo").should('be.visible');
  });
  
  it('Should display info contains truthy info"', () => {
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.scrollTo(0, 1000);
    
    cy.contains('Av. Prefeito Vitor Fantini, 21', { timeout: 10000 }).should('be.visible');
    
    cy.wait(1500);
    cy.screenshot(`/live/monitor-${now.format('YYYYMMDDHHmmss')}`, {
      capture: 'viewport'
    });
  });
});
