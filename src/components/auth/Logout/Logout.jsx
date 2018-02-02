import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withApollo } from 'react-apollo';

import { logout } from '../../../client';

class Logout extends Component {
  static propTypes = {
      client: PropTypes.shape({
          resetStore: PropTypes.func.isRequired
      })
  };

  componentWillMount() {
      this.props.client.resetStore();
      logout();
  }

  render() {
      return <Redirect to="/auth/login" />;
  }
}

export default withApollo(Logout);
