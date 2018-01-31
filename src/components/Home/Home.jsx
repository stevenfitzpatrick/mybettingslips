import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

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

class Home extends Component {
  state = {
      something: true
  };

  shouldComponentUpdate(nextProps, nextState) {
    debugger; //eslint-disable-line
      return true;
  }
  render() {
      return <div>Home</div>;
  }
}

export default Home;
