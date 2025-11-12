// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


// Exemplo: Um comando personalizado para login
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login'); // Assume que você tem uma página de login
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/dashboard'); // Verifica se o login foi bem-sucedido
});

// Exemplo: Um comando para encontrar elementos por data-testid
Cypress.Commands.add('getByTestId', (testId) => {
  return cy.get(`[data-testid="${testId}"]`);
});

// Exemplo: Um comando para fazer uma requisição de API
Cypress.Commands.add('apiLogin', (username, password) => {
  cy.request('POST', '/api/login', { username, password })
    .its('body')
    .then((body) => {
      // Aqui você pode armazenar tokens, cookies ou o que a API retornar
      window.localStorage.setItem('authToken', body.token);
    });
});
