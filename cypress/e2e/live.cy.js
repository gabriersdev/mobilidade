import moment from "moment/moment";

moment.locale("pt-BR");
const now = moment();

describe('Live Page - Departure Points Combobox Interaction', () => { // Nome do bloco de testes mais descritivo
  beforeEach(() => {
    // Visita a página antes de cada teste no bloco
    cy.visit('http://localhost:5173/live');
  });
  
  it(`Should display the "Ao vivo" title`, () => {
    cy.contains("Ao vivo").should('be.visible');
  });
  
  // TODO - corrigir erro na execucao do teste aqui:
  // Timed out retrying after 4000ms + expected - actual
  it('Should successfully open the "Departure Points" combobox menu and search', () => {
    cy.wait(5000);
    
    cy.get('.input-group')
      .eq(1) // Seleciona o segundo input-group (índice 1)
      .as('departureInputGroup'); // Cria um alias para o grupo de input para reuso e clareza
    
    // 2. Garante que o input-group e seus componentes essenciais estão visíveis
    cy.get('@departureInputGroup').should('be.visible');
    
    cy.get('@departureInputGroup')
      .find('.form-control') // Encontra o input dentro do grupo
      .should('be.visible')
      .should('be.enabled'); // Boa prática: verificar se está habilitado
    
    // 3. Clica no botão de toggle do combobox dentro do grupo
    cy.get('@departureInputGroup')
      .find('[data-testid="combobox-toggle-button"]') // Encontra o botão dentro do grupo
      .should('be.visible')
      .click();
    
    cy.get('[data-testid="combobox-menu"]')
      .should('be.visible')
      .and('have.css', 'position', 'absolute') // Asserção adicional para garantir que é um menu overlay
      .get('.cursor-pointer') // Selecionando item do combobox
      .first()
      .click()
    
    const selectorElementResult = '.rounded-3.bg-body-secondary.p-3.mt-5 .d-flex.flex-column.gap-0.mb-3'
    cy.get(`${selectorElementResult} span:first-child`)
      .should('be.visible')
      .should('have.text', 'Local')
    
    cy.get(`${selectorElementResult} span:last-child`)
      .should('be.visible')
      .should('have.length.greaterThan', 1)
    
    cy.wait(1500);
    cy.screenshot(`/live/search-departure-point-guide-${now.format('YYYYMMDDHHmmss')}`, {
      capture: 'viewport'
    });
  });
});
