/// <reference types='cypress' />

import { faker } from '@faker-js/faker';

const username = faker.internet.userName() + '@mail.com';
const password = 'Q!w2e3r4';

function UserSignUp() {
  cy.get('input[id="sign-username"]')
    .type(username);
  cy.get('input[id="sign-password"]')
    .type(password);
  cy.get('button[onclick="register()"]')
    .click();
}

describe('Demoblaze app sign in', () => {
  beforeEach(() => {
    cy.visit('https://www.demoblaze.com/index.html');
  });

  it('should provide an ability to sign in with' +
    ' valid parameters', () => {
    cy.get('a[id="signin2"]')
      .contains('Sign up')
      .click();
    cy.wait(1500);
    UserSignUp();

    cy.get('a[id="login2"]')
      .contains('Log in')
      .click();

    cy.wait(1500);
    cy.get('input[id="loginusername"]')
      .clear()
      .type(username);
    cy.get('input[id="loginpassword"]')
      .clear()
      .type(password);
    cy.get('button[onclick="logIn()"]')
      .click();

    cy.wait(2500);
    cy.get('a[id="nameofuser"]')
      .should('contain', 'Welcome ' + username);
  });

  it('should not provide an ability to sign in with wrong password', () => {
    cy.get('a[id="login2"]')
      .contains('Log in')
      .click();

    cy.get('input[id="loginusername"]')
      .clear()
      .type(username);
    cy.get('input[id="loginpassword"]')
      .clear()
      .type(password + 'a');
    cy.get('button[onclick="logIn()"]')
      .click();

    cy.on('window:alert', (text) => {
      expect(text).to.contains('Wrong password.');
    });
  });
});
