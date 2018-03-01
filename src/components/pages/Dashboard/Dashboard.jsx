import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import { compose, graphql } from 'react-apollo';

import withAuth from '../../handlers/withAuth';
import CreateBet from './CreateBet';

export class Dashboard extends Component {
  state = {
      showAddBet: false
  };

  static propTypes = {
      id: PropTypes.string
  };

  toggleAddBet = () =>
      this.setState(({ showAddBet }) => ({ showAddBet: !showAddBet }));

  render() {
      const { showAddBet } = this.state;
      const { id } = this.props;

      return (
          <div>
        Dashboard
              <button onClick={this.toggleAddBet}>Add Bet</button>
              {showAddBet ? <CreateBet id={id} /> : null}
          </div>
      );
  }
}

export default withAuth(Dashboard);
