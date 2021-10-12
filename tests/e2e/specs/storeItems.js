const login = require('../support/constants/login');
const items = require('../support/constants/storeItems');
const register = require('../support/constants/register');
const stores = require('../support/constants/stores');

describe('Stores List Test', () => {
  it('Do Login and get Stores', () => {
    cy.routeTo(login.ROUTE_LOGIN);
    cy.intercept(login.URL_LOGIN, (req) => {
      req.reply((response) => {
        expect(response.statusCode).to.equal(200);
      });
    }).as('login');
    cy.fixture(login.FIXTURE_LOGIN_USER_DATA).then((user) => {
      cy.fillLoginFormAndDoLogin(user);
    });
    cy.wait('@login');
  });

  it('Check dialog and add new store', () => {
    cy.intercept('POST', stores.URL_STORE, (req) => {
      req.reply((response) => {
        expect(response.statusCode).to.equal(201);
        expect(response.body.cif).to.equal('B12345678');
        expect(response.body.email).to.equal('store1@email.com');
        expect(response.body.name).to.equal('Store 1');
        expect(response.body.phone).to.equal('678654231');
        expect(response.body.uuid).to.match(register.UUID_REGEX);
      });
    }).as('addStore');
    cy.clickButton(stores.BUTTON_ADD_STORE);
    cy.fixture(stores.FIXTURE_REGISTER_STORES_DATA).then((store) => {
      cy.fillAddStoreForm(store);
    });
    cy.clickButton(stores.BUTTON_MODAL_ADD_STORE);
    cy.wait('@addStore');
  });

  it('Go to items and get it', () => {
    cy.intercept('GET', items.URL_ITEMS, (req) => {
      req.reply((response) => {
        expect(response.statusCode).to.equal(200);
        expect(response.body.length).to.equal(0);
      });
    }).as('getItems');
    cy.clickButton(stores.BUTTON_STORE_DETAILS);
    cy.wait('@getItems');
  });

  it('Add item', () => {
    cy.clickButton(items.BUTTON_ADD_ITEM);
    cy.clickButton(items.BUTTON_ADD_ITEM_CLOSE_MODAL);
    cy.clickButton(items.BUTTON_ADD_ITEM);
    cy.intercept('POST', items.URL_ITEMS, (req) => {
      req.reply((response) => {
        expect(response.statusCode).to.equal(201);
        expect(response.body.uuid).to.match(register.UUID_REGEX);
      });
    }).as('addItem');
    cy.fixture(items.FIXTURE_ITEM_DATA).then((item) => {
      cy.fillItemForm(item.add);
    });
    cy.clickButton(items.BUTTON_ADD_ITEM_MODAL);
    cy.wait('@addItem');
  });

  it('Edit item', () => {
    cy.intercept('PUT', items.URL_ITEMS, (req) => {
      req.reply((response) => {
        expect(response.statusCode).to.equal(204);
      });
    }).as('editItem');
    cy.clickButton(items.BUTTON_EDIT_ITEM);
    cy.clickButton(items.BUTTON_EDIT_ITEM_CLOSE_MODAL);
    cy.clickButton(items.BUTTON_EDIT_ITEM);
    cy.fixture(items.FIXTURE_ITEM_DATA).then((item) => {
      cy.fillItemForm(item.edit);
    });
    cy.clickButton(items.BUTTON_EDIT_ITEM_MODAL);
    cy.wait('@editItem');
  });

  it('Delete item', () => {
    cy.clickButton(items.BUTTON_DELETE_ITEM);
    cy.clickButton(items.BUTTON_DELETE_ITEM_CLOSE_MODAL);
    cy.clickButton(items.BUTTON_DELETE_ITEM);
    cy.intercept('DELETE', items.URL_ITEMS, (req) => {
      req.reply((response) => {
        expect(response.statusCode).to.equal(204);
      });
    }).as('deleteItem');
    cy.clickButton(items.BUTTON_DELETE_ITEM_MODAL);
    cy.wait('@deleteItem');
  });

  it('Delete store', () => {
    cy.clickButton(items.BUTTON_GO_TO_STORE)
    cy.intercept('DELETE', stores.URL_STORE, (req) => {
      req.reply((response) => {
        expect(response.statusCode).to.equal(204);
      });
    }).as('deleteStore');
    cy.clickButton(stores.BUTTON_DELETE_STORE);
    cy.clickButton(stores.BUTTON_CLOSE_MODAL_DELETE_STORE);
    cy.clickButton(stores.BUTTON_DELETE_STORE);
    cy.clickButton(stores.BUTTON_MODAL_DELETE_STORE);
    cy.wait('@deleteStore');
  });

  it('Logout', () => {
    cy.logout();
  });
});

