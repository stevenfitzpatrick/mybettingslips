import React, { Component } from 'react';
import { Query } from 'react-apollo';

import { GetUserBets } from '../../../client/bets';

class BetList extends Component {
  state = {
    something: 'lol'
  };

  render() {
    const pagination = {
      first: 10,
      skip: 0
    };
    return (
      <Query
        query={GetUserBets}
        variables={pagination}
        updateQuery={this.formatResponse}
      >
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return <pre>{JSON.stringify(data, null, 2)}</pre>;
        }}
      </Query>
    );
  }
}

export default BetList;
