const stores = require('../constants/stores');

Cypress.Commands.add("fillAddStoreForm", (store) => {
  cy.writeInput(stores.INPUT_STORE_NAME, store.name);
  cy.writeInput(stores.INPUT_STORE_EMAIL, store.email);
  cy.writeInput(stores.INPUT_STORE_PHONE, store.phone);
  cy.writeInput(stores.INPUT_STORE_CIF, store.cif);
});