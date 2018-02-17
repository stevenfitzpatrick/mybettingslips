import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';

// Queries
import { LOGGED_IN_USER_QUERY } from '../../../client/auth';

// Components
import CreateBet from './CreateBet';

class Dashboard extends Component {
  state = {
      showAddBet: false
  };

  static propTypes = {
      loggedInUser: PropTypes.object
  };

  toggleAddBet = () =>
      this.setState(({ showAddBet }) => ({ showAddBet: !showAddBet }));

  render() {
      const { loggedInUser } = this.props;
      const { showAddBet } = this.state;
      return (
          <div>
        Dashboard
              <button onClick={this.toggleAddBet}>Add Bet</button>
              {showAddBet ? <CreateBet id={loggedInUser.id} /> : null}
          </div>
      );
  }
}

export default compose(
    graphql(LOGGED_IN_USER_QUERY, {
        props: ({ data: { loggedInUser } }) => ({
            loggedInUser
        })
    })
)(Dashboard);
