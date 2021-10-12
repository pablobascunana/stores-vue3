const register = require('../constants/register');

Cypress.Commands.add("fillRegisterForm", (user) => {
  cy.writeInput(register.INPUT_USER_USERNAME, user.userName);
  cy.writeInput(register.INPUT_USER_NAME, user.name);
  cy.writeInput(register.INPUT_USER_LAST_NAME, user.lastName);
  cy.writeInput(register.INPUT_USER_EMAIL, user.email);
  cy.writeInput(register.INPUT_USER_PASSWORD, user.password);
  cy.writeInput(register.INPUT_USER_REPEAT_PASSWORD, user.repeteadPassword);
});