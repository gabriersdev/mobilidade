// noinspection CypressCommandSubjectValidation,JSCheckFunctionSignatures

import moment from "moment/moment";

moment.locale("pt-BR");
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
    const divMonitor = `.rounded-3.bg-body-secondary.p-3.mt-5`;
    const divMontitorInfo = `${divMonitor} > .d-flex.flex-column.gap-0.mb-3 span:nth-child(2)`;
    const divMonitorUpdateInfo = `${divMonitor} > .d-flex.gap-3.flex-wrap.mb-3 div.d-flex.flex-column.gap-0.mb-3:nth-child(1) span:nth-child(2)`;
    
    cy.get(divMontitorInfo)
      .should('be.visible')
      .contains('Av. Prefeito Vitor Fantini, 21');
    
    try {
      cy.get(divMonitorUpdateInfo)
        .should('be.visible')
        .contains('há alguns segundos');
    } catch {
      //
    }
    
    cy.wait(1500);
    cy.screenshot(`/live/monitor-${now.format('YYYYMMDDHHmmss')}`, {
      capture: 'viewport'
    });
  });
});
