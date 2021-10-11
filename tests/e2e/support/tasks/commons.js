
Cypress.Commands.add("routeTo", (route) => {
  cy.visit(route);
});

Cypress.Commands.add("clickButton", (id) => {
  cy.get(cy.get(id).click({force: true}));
});

Cypress.Commands.add("checkElementHasClass", (id, classToCheck) => {
  cy.get(id).should('have.class', classToCheck);
});

Cypress.Commands.add("writeInput", (id, text) => {
  cy.get(id).clear().type(text);
});
Cypress.Commands.add("clearInput", (id) => {
  cy.get(id).clear();
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

Cypress.Commands.add("checkTableHeaderText", (id, th, text) => {
  cy.get(id).contains(th, text);
});

Cypress.Commands.add("checkTableBodyLength", (id, td, length) => {
  cy.get(id).find(td).should('have.length', length);
})

Cypress.Commands.add("checkUuid", (uuid) => {
  uuid.to.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
})