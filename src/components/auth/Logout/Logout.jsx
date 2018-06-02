import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withApollo } from 'react-apollo';

import { logout } from '../../../client';

export class Logout extends Component {
  static propTypes = {
    client: PropTypes.shape({
      resetStore: PropTypes.func.isRequired
    })
  };

  componentDidMount() {
    this.props.client.resetStore();
    logout();
  }

  render() {
    return <Redirect to="/auth/login" />;
  }
}

export default withApollo(Logout);
