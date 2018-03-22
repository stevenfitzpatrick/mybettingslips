describe('Header', () => {
  before(() => {
    cy.login();
    cy.visit('/');
  });

  it('should show Logout button', () => {
    cy.contains('Logout').should('have.attr', 'href', '/auth/logout');
  });

  it('should redirect user to login screen when logout clicked', () => {
    cy
      .contains('Logout')
      .click()
      .location('pathname')
      .should('eq', '/auth/login');
  });
});
