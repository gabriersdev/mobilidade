import moment from "moment/moment";

moment.locale("pt-BR");
const now = moment();

describe('Search Page Flow', () => { // Nome do bloco de testes
  beforeEach(() => {
    // Visita a página antes de cada teste no bloco
    cy.visit('http://localhost:5173/search');
  });
  
  it(`Should find "Para onde vamos?", search for a line, and verify the line's title`, () => { // Um único teste para o fluxo
    cy.contains("Para onde vamos?").should('be.visible');
    
    // Parte da busca (antigo "Search line using input")
    const inputGroupSelector = '.input-group';
    cy.get(`${inputGroupSelector} #input-search`)
      .should('be.visible')
      .type('bandeirante', {delay: 100});
    
    cy.get(`${inputGroupSelector} [type="submit"]`)
      .should('be.visible')
      .click();
    
    cy.wait(2500); // Aguarda a navegação/carregamento da página de resultados
    cy.screenshot(`/lines/search-line-${now.format('YYYYMMDDHHmmss')}`, {
      capture: 'fullPage'
    });
    
    // Parte da verificação do título da linha (antigo "Should display the title")
    const titleH1Content = 'Linha 4986 - Sabará para Rodoviária de Belo Horizonte';
    cy.contains(titleH1Content)
      .should($el => {
        expect($el.prop('tagName').toLowerCase()).to.equal('h1');
        // Você está verificando 'd-none' aqui, o que significa que o elemento é hidden.
        // Se a intenção é vê-lo, você deveria remover '.d-none' ou usar .should('be.visible').
        // Ou se ele realmente deve estar oculto, então o teste é válido.
        expect($el.prop('class')).to.include('d-none'); // Usar 'include' para ser mais flexível, ou 'equal' se for a única classe
      })
      .should('not.be.visible');
    
    cy.wait(500);
    cy.screenshot(`/lines/line-page-bandeirante-${now.format('YYYYMMDDHHmmss')}`, {
      capture: 'viewport'
    });
  });
});
