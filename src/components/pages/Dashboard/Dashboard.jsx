import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

// Queries
import { LOGGED_IN_USER_QUERY } from '../../../client/auth';

// Components
import CreateBet from './CreateBet';
// const GET_NETWORK = gql`
//   query {
//     networkStatus @client {
//       isConnected
//     }
//   }
// `;

// const UPDATE_NETWORK_STATUS = gql`
//   mutation updateNetworkStatus($isConnected: Boolean) {
//     updateNetworkStatus(isConnected: $isConnected) @client {
//       isConnected
//     }
//   }
// `;

class Dashboard extends Component {
  state = {
      showAddBet: false
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
