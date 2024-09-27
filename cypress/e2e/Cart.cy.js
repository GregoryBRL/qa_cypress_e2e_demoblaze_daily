/// <reference types='cypress' />

describe('Demoblaze app', () => {
  beforeEach(() => {
    cy.visit('https://www.demoblaze.com/');
  });

  it('should provide an ability to add product to the cart', () => {
    cy.get('a[href="prod.html?idp_=1"]')
      .contains('Samsung galaxy s6')
      .click();
    cy.get('a[onclick="addToCart(1)"]')
      .contains('Add to cart')
      .click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Product added');
    });

    cy.visit('https://www.demoblaze.com/cart.html');
    cy.get('td')
      .should('contain', 'Samsung galaxy s6');
  });
});
