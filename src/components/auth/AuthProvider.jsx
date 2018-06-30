import React, { Component, createContext } from 'react';
import { node, shape, string } from 'prop-types';

const AuthContext = createContext();

class AuthProvider extends Component {
  static Consumer = AuthContext.Consumer;

  static propTypes = {
    children: node.isRequired,
    user: shape({
      email: string,
      id: string
    })
  };

  static defaultProps = {
    user: {
      email: '',
      id: ''
    }
  };

  state = {
    username: '',
    id: ''
  };

  static getDerivedStateFromProps({ user }, prevState) {
    if (user.email === prevState.username && user.id === prevState.id) {
      return null;
    }

    return {
      username: user.email,
      id: user.id
    };
  }

  render() {
    const { children } = this.props;
    return (
      <AuthContext.Provider value={this.state}>{children}</AuthContext.Provider>
    );
  }
}

export const AuthConsumer = AuthContext.Consumer;

export default AuthProvider;
