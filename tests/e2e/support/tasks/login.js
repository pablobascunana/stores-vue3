const login = require('../constants/login');

Cypress.Commands.add("fillLoginFormAndDoLogin", (user) => {
  cy.writeInput(login.INPUT_USER_USERNAME, user.userName);
  cy.writeInput(login.INPUT_USER_PASSWORD, user.password);
  cy.clickButton(login.BUTTON_LOGIN);
});


Cypress.Commands.add("logout", () => {
  cy.clickButton(login.IMG_USER_LOGO);
  cy.clickButton(login.BUTTON_LOGOUT);
});