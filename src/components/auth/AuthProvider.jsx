import PropTypes from 'prop-types';
import React, { Component, createContext } from 'react';

const AuthContext = createContext();

class AuthProvider extends Component {
  static Consumer = AuthContext.Consumer;

  state = {
    username: '',
    id: ''
  };

  static propTypes = {
    children: PropTypes.node,
    user: PropTypes.object
  };

  static getDerivedStateFromProps({ user }, prevState) {
    if (user.email === prevState.username) {
      return null;
    }

    return {
      username: user.email,
      id: user.id
    };
  }

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export const AuthConsumer = AuthContext.Consumer;

export default AuthProvider;
