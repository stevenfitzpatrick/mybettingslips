import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import { CREATE_BET_MUTATION } from '../../../client/bets';
import { LOGGED_IN_USER_QUERY } from '../../../client/auth';
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

const results = {
    OPEN: 'Open',
    WIN: 'Win',
    LOSS: 'Loss',
    VOID: 'Void'
};

class Dashboard extends Component {
  state = {
      something: true
  };

  async componentDidMount() {
      const result = await this.props.createBet({
          variables: {
              stake: 20,
              odds: 1.5,
              result: results.OPEN,
              typeId: 'cjd61oxwh1tvm01763kusqrkr'
          }
      });
      const test = this.props;
    debugger; //eslint-disable-line
  }

  render() {
      return <div>Dashboard</div>;
  }
}

export default compose(
    graphql(LOGGED_IN_USER_QUERY, {
        props: ({ data: { loggedInUser } }) => ({
            loggedInUser
        })
    }),
    graphql(CREATE_BET_MUTATION, {
        options: ({ loggedInUser }) => ({
            variables: { userId: loggedInUser.id }
        }),
        name: 'createBet'
    })
)(Dashboard);
