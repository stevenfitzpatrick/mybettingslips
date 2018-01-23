import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

const GET_NETWORK = gql`
  query {
    networkStatus @client {
      isConnected
    }
  }
`;

const UPDATE_NETWORK_STATUS = gql`
  mutation updateNetworkStatus($isConnected: Boolean) {
    updateNetworkStatus(isConnected: $isConnected) @client
  }
`;

class Home extends Component {
  state = {
      something: true
  };
  render() {
    debugger; //eslint-disable-line
      const test = this.props;
      return (
          <div>
        Home
              <button
                  onClick={() =>
                      this.props.setNetworkMutation({ variables: { isConnected: true } })
                  }
              >
          Update network status
              </button>
          </div>
      );
  }
}

export default compose(
    graphql(GET_NETWORK, { name: 'getNetworkQuery' }),
    graphql(UPDATE_NETWORK_STATUS, { name: 'setNetworkMutation' })
)(Home);
