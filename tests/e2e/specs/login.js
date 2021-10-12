const login = require('../support/constants/login');

describe('Login Test', () => {
  it('Do incorrect username login', () => {
    cy.routeTo(login.ROUTE_LOGIN);
    cy.intercept(login.URL_LOGIN, (req) => {
      req.reply((response) => {
        expect(response.statusCode).to.equal(404);
        expect(response.body).contains("No row was found when one was required");
      });
    }).as('wrongUserNameLogin');
    cy.fixture(login.FIXTURE_LOGIN_USER_DATA).then((user) => {
      user.userName = "TestUser2";
      cy.fillLoginFormAndDoLogin(user);
    }); 
    cy.wait('@wrongUserNameLogin');
  });

  it('Do incorrect password login', () => {
    cy.intercept(login.URL_LOGIN, (req) => {
      req.reply((response) => {
        expect(response.statusCode).to.equal(401);
        expect(response.body.message).contains("Bad credentials");
      });
    }).as('wrongPasswordLogin');
    cy.fixture(login.FIXTURE_LOGIN_USER_DATA).then((user) => {
      user.password = "superSecret2";
      cy.fillLoginFormAndDoLogin(user);
    }); 
    cy.wait('@wrongPasswordLogin');
  });

  it('Do login', () => {
    cy.intercept(login.URL_LOGIN, (req) => {
      req.reply((response) => {
        expect(response.statusCode).to.equal(200);
        expect(response.body.access_token).contains("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9");
        expect(response.body.refresh_token).contains("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9");
      });
    }).as('login');
    cy.fixture(login.FIXTURE_LOGIN_USER_DATA).then((user) => {
      cy.fillLoginFormAndDoLogin(user);
    }); 
    cy.wait('@login');
  });

  it('Check AppBar', () => {
    cy.fixture(login.FIXTURE_LOGIN_USER_DATA).then((user) => {
      cy.closeToast(login.BUTTON_CLOSE_TOAST);
      expect(cy.checkElementHasText(login.APP_BAR_TITLE, user.userName));
      expect(cy.checkImageVisible(login.IMG_LOGO));
      expect(cy.checkImageVisible(login.IMG_USER_LOGO));
    }); 
  });

  it('Logout', () => {
    cy.logout();
  });
});
