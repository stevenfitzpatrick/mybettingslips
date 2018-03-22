import PropTypes from 'prop-types';
import React, { Component, createContext } from 'react';

const AuthContext = createContext();

class AuthProvider extends Component {
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
    const { id, username } = this.state;
    return (
      <AuthContext.Provider value={{ id, username }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export const AuthConsumer = AuthContext.Consumer;

export default AuthProvider;
