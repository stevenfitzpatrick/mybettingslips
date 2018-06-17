import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import { compose, graphql } from 'react-apollo';

import withAuth from '../../handlers/withAuth';
import BetList from './BetList';

export class Dashboard extends Component {
  static propTypes = {
    id: PropTypes.string
  };

  toggleAddBet = () =>
    this.setState(({ showAddBet }) => ({ showAddBet: !showAddBet }));

  render() {
    // const { id } = this.props;

    return <BetList />;
  }
}

export default withAuth(Dashboard);
