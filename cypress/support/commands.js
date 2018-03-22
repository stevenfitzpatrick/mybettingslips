/**
 * Login command helper, save user token to local storage
 */
Cypress.Commands.add('login', () => {
  cy
    .request({
      method: 'POST',
      url: Cypress.env('endpoint'),
      body: {
        operationName: 'authenticateUser',
        variables: {
          username: Cypress.env('username'),
          password: Cypress.env('password')
        },
        query:
          'mutation authenticateUser($username: String!, $password: String!) {\n  authenticateUser(email: $username, password: $password) {\n    id\n    token\n    __typename\n  }\n}\n'
      }
    })
    .then(resp => {
      const { data: { authenticateUser } } = resp.body;
      window.localStorage.setItem('user_id', authenticateUser.id);
      window.localStorage.setItem('user_token', authenticateUser.token);
    });
});
