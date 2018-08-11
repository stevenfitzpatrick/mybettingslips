import React, { Component } from 'react';
import { Query } from 'react-apollo';

import { calculateUserBetTotal } from '../../../../utils/';
import { GetUserTotal } from '../../../../client/';

class BetTotal extends Component {
  state = {};
  render() {
    return (
      <Query query={GetUserTotal}>
        {({ loading, error, data: { user = {} } }) => {
          if (loading) return 'Loading...';
          if (error) return <div className="error">Error</div>;
          return (
            <div>
              {user.total.count} {calculateUserBetTotal(user.bets)}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default BetTotal;
