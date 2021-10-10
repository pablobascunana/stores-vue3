const login = require('../support/constants/login');
const register = require('../support/constants/register');

describe('Register Test', () => {
  it('Check buttons navigation', () => {
    cy.routeTo(login.ROUTE_LOGIN);
    cy.clickButton(login.BUTTON_GO_TO_REGISTER);
    cy.clickButton(register.BUTTON_BACK_TO_LOGIN);
    cy.routeTo(login.ROUTE_LOGIN);
    cy.clickButton(login.BUTTON_GO_TO_REGISTER);
  });

  it('Check register button and get error class in inputs', () => {
    cy.clickButton(register.BUTTON_REGISTER);
    expect(cy.checkElementHasClass(register.INPUT_USER_USERNAME, register.INPUT_ERROR_CLASS));
    expect(cy.checkElementHasClass(register.INPUT_USER_NAME, register.INPUT_ERROR_CLASS));
    expect(cy.checkElementHasClass(register.INPUT_USER_LAST_NAME, register.INPUT_ERROR_CLASS));
    expect(cy.checkElementHasClass(register.INPUT_USER_EMAIL, register.INPUT_ERROR_CLASS));
    expect(cy.checkElementHasClass(register.INPUT_USER_PASSWORD, register.INPUT_ERROR_CLASS));
    expect(cy.checkElementHasClass(register.INPUT_USER_REPEAT_PASSWORD, register.INPUT_ERROR_CLASS));
  });

  it('Do register', () => {
    cy.intercept(register.URL_REGISTER, (req) => {
      req.reply((response) => {
        expect(response.statusCode).to.equal(201);
        expect(response.body.userName).to.equal("TestUser");
        expect(response.body.uuid).to.match(register.UUID_REGEX);
      });
    }).as('registerUser');
    cy.fixture(register.FIXTURE_REGISTER_USER_DATA).then((registerUser) => {
      cy.fillRegisterForm(registerUser.user);
      expect(cy.checkElementHasClass(register.INPUT_USER_USERNAME, register.INPUT_SUCCESS_CLASS));
      expect(cy.checkElementHasClass(register.INPUT_USER_NAME, register.INPUT_SUCCESS_CLASS));
      expect(cy.checkElementHasClass(register.INPUT_USER_LAST_NAME, register.INPUT_SUCCESS_CLASS));
      expect(cy.checkElementHasClass(register.INPUT_USER_EMAIL, register.INPUT_SUCCESS_CLASS));
      expect(cy.checkElementHasClass(register.INPUT_USER_PASSWORD, register.INPUT_SUCCESS_CLASS));
      expect(cy.checkElementHasClass(register.INPUT_USER_REPEAT_PASSWORD, register.INPUT_SUCCESS_CLASS));
      cy.clickButton(register.BUTTON_REGISTER);
    }); 
    cy.wait('@registerUser');
  });

  it('Do register with existing username', () => {
    cy.clickButton(login.BUTTON_GO_TO_REGISTER);
    cy.intercept(register.URL_REGISTER, (req) => {
      req.reply((response) => {
        expect(response.statusCode).to.equal(400);
        expect(response.body).contains("userName");
      });
    }).as('registerWrongUserName');
    cy.fixture(register.FIXTURE_REGISTER_USER_DATA).then((registerUser) => {
      cy.fillRegisterForm(registerUser.user);
      cy.clickButton(register.BUTTON_REGISTER);
    });
    cy.wait('@registerWrongUserName');
  });

  it('Do register with existing email', () => {
    cy.intercept(register.URL_REGISTER, (req) => {
      req.reply((response) => {
        expect(response.statusCode).to.equal(400);
        expect(response.body).contains("email");
      });
    }).as('registerWrongEmail');
    cy.fixture(register.FIXTURE_REGISTER_USER_DATA).then((registerUser) => {
      registerUser.user.userName = 'TestUser2'
      cy.writeInput(register.INPUT_USER_USERNAME, registerUser.user.userName);
      cy.clickButton(register.BUTTON_REGISTER);
    });
    cy.wait('@registerWrongEmail');
  });

  it('Go to login', () => {
    cy.routeTo(login.ROUTE_LOGIN);
  });
});
