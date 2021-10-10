
Cypress.Commands.add("routeTo", (route) => {
  cy.visit(route);
});

Cypress.Commands.add("clickButton", (id) => {
  cy.get(cy.get(id).click());
});

Cypress.Commands.add("checkElementHasClass", (id, classToCheck) => {
  cy.get(id).should('have.class', classToCheck);
});

Cypress.Commands.add("writeInput", (id, text) => {
  cy.get(id).clear().type(text);
});

Cypress.Commands.add("checkElementHasText", (id, textToCheck) => {
  cy.get(id).should('have.text', textToCheck);
});

Cypress.Commands.add("checkImageVisible", (id) => {
  cy.get(id).should('be.visible');
});

Cypress.Commands.add("closeToast", (id) => {
  cy.clickButton(id);
});