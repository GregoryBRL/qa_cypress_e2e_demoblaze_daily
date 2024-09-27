/// <reference types='cypress' />
import { faker } from '@faker-js/faker';

const username = faker.internet.userName();
const password = 'Q!w2e3r4';

function UserSignUp() {
  cy.get('input[id="sign-username"]')
    .type(username);
  cy.get('input[id="sign-password"]')
    .type(password);
  cy.get('button[onclick="register()"]')
    .click();
}

describe('Demoblaze app sign up', () => {
  beforeEach(() => {
    cy.visit('https://www.demoblaze.com/index.html');
  });

  it('should provide an ability to register with' +
      ' valid parameters', () => {
    cy.get('a[id="signin2"]')
      .contains('Sign up')
      .click();

    cy.wait(1500);
    UserSignUp();

    cy.wait(1500);
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Sign up successful.');
    });
  });

  it('should not provide an ability to register with already existing username', () => {
    cy.get('a[id="signin2"]')
      .contains('Sign up')
      .click();

    cy.wait(1500);
    UserSignUp();
  
    cy.wait(1500);
    cy.on('window:alert', (text) => {
      expect(text).to.contains('This user already exist.');
    });
  });
});
