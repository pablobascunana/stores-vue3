const items = require('../constants/storeItems');

Cypress.Commands.add("fillItemForm", (item) => {
  cy.writeInput(items.INPUT_ADD_ITEM_NAME, item.name);
  cy.writeInput(items.INPUT_ADD_ITEM_PRICE, item.price);
  cy.writeInput(items.INPUT_ADD_ITEM_IMAGE_URL, item.imageURL);
  cy.writeInput(items.INPUT_ADD_ITEM_DESCRIPTION, item.description);
});
