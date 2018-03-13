describe('Login', () => {
  beforeEach(() => cy.visit('/auth/login'));

  it('should show Login title', () => {
    cy.get('h1').should('have.text', 'Login');
  });

  it('should have focus on email input by default', () => {
    cy.focused().should('have.attr', 'name', 'username');
  });

  it('should show error message when email field blurred', () => {
    cy.focused().blur();
    cy.get('.form-error').should('contain', 'Email is required');
  });

  it('should show error message when password field blurred', () => {
    cy
      .get('input[name="password"')
      .focus()
      .blur();
    cy.get('.form-error').should('contain', 'Password is required');
  });

  it('should show Alert if incorrect details entered', () => {
    cy.get('.form-error').should('have.length', 0);
    cy.get('input[name=username]').type('wrong@mail.com');
    cy.get('input[name=password]').type('123{enter}');
    cy.get('[role=alert]').should('have.length', 1);
  });

  it('should login correctly with correct login details', () => {
    cy.get('input[name=username]').type(Cypress.env('username'));
    cy.get('input[name=password]').type(`${Cypress.env('password')}{enter}`);
    cy.location('pathname').should('eq', '/');
  });
});
