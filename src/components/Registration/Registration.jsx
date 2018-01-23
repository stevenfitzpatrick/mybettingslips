import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Input } from 'fitzy';

import { setItem } from '../../utils';

const SIGNUP_USER_MUTATION = gql`
  mutation SignupUser($email: String!, $password: String!) {
    signupUser(email: $email, password: $password) {
      id
      token
    }
  }
`;

export class Registration extends Component {
  state = {
      email: '',
      password: ''
  };

  handleChange = ({ target }, value) => {
      const { name } = target;
      this.setState({
          [name]: value
      });
  };

  handleSubmit = async e => {
      e.preventDefault();
      const { email, password } = this.state;
      const { history, signupUserMutation } = this.props;

      const result = await signupUserMutation({
          variables: { email, password }
      });

      // Save items to LocalStorage
      setItem('USER_ID', result);
      setItem('USER_TOKEN', result);

      history.push('/');
  };

  render() {
      const { email, password } = this.state;
      return (
          <form onSubmit={this.handleSubmit}>
              <Input
                  name="email"
                  type="email"
                  onChange={this.handleChange}
                  value={email}
              />
              <Input
                  name="password"
                  type="password"
                  onChange={this.handleChange}
                  value={password}
              />
              <button type="submit" onClick={this.handleSubmit}>
          Submit
              </button>
          </form>
      );
  }
}

export default compose(
    graphql(SIGNUP_USER_MUTATION, {
        name: 'signupUserMutation'
    })
)(Registration);
