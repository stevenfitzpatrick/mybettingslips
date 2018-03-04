import gql from 'graphql-tag';

/**
 * User Login Mutation
 */
export const LOGIN_USER_MUTATION = gql`
  mutation authenticateUser($username: String!, $password: String!) {
    authenticateUser(email: $username, password: $password) {
      id
      token
    }
  }
`;

/**
 * User Signup Mutation
 */
export const SIGNUP_USER_MUTATION = gql`
  mutation SignupUser($email: String!, $password: String!) {
    signupUser(email: $email, password: $password) {
      id
      token
    }
  }
`;

/**
 * Retrieve current user Query
 */
export const LOGGED_IN_USER_QUERY = gql`
  query CurrentUser {
    loggedInUser {
      id
      email
    }
  }
`;
