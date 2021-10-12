const login = require('../support/constants/login');
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
    cy.intercept('GET', stores.URL_STORE, (req) => {
      req.reply((response) => {
        expect(response.statusCode).to.equal(200);
        expect(response.body.length).to.equal(0);
      });
    }).as('getStore');
    cy.wait('@login');
    cy.wait('@getStore');
  });

  it('Check table body is empty', () => {
    expect(cy.checkTableBodyLength(stores.TABLE_STORES, stores.TABLE_TD, 0));
  });

  it('Check table header', () => {
    expect(cy.checkTableHeaderText(stores.TABLE_STORES, stores.TABLE_TH, 'Nombre'));
    expect(cy.checkTableHeaderText(stores.TABLE_STORES, stores.TABLE_TH, 'Teléfono'));
    expect(cy.checkTableHeaderText(stores.TABLE_STORES, stores.TABLE_TH, 'Email'));
    expect(cy.checkTableHeaderText(stores.TABLE_STORES, stores.TABLE_TH, 'CIF'));
    expect(cy.checkTableHeaderText(stores.TABLE_STORES, stores.TABLE_TH, 'Acciones')); 
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
    cy.clickButton(stores.BUTTON_MODAL_CLOSE);
    cy.clickButton(stores.BUTTON_ADD_STORE);
    cy.fixture(stores.FIXTURE_REGISTER_STORES_DATA).then((store) => {
      cy.fillAddStoreForm(store);
    });
    cy.clickButton(stores.BUTTON_MODAL_ADD_STORE);
    cy.wait('@addStore');
  });

  it('Filter store list', () => {
    cy.writeInput(stores.INPUT_SEARCH_BAR, 'asdfg');
    expect(cy.checkTableBodyLength(stores.TABLE_STORES, stores.TABLE_TD, 0));
    cy.writeInput(stores.INPUT_SEARCH_BAR, '1');
    expect(cy.checkTableBodyLength(stores.TABLE_STORES, stores.TABLE_TD, 5));
    cy.clearInput(stores.INPUT_SEARCH_BAR);
    expect(cy.checkTableBodyLength(stores.TABLE_STORES, stores.TABLE_TD, 5));
  });

  it('Delete store', () => {
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

