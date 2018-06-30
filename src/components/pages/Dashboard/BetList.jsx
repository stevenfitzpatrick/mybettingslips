import React, { Component } from 'react';
import { Query } from 'react-apollo';

import { GetUserBets } from '../../../client/bets';
import BetCard from './BetCard';

class BetList extends Component {
  listCards = ({ id, ...props }) => <BetCard id={id} key={id} {...props} />;

  render() {
    const pagination = {
      first: 10,
      skip: 0
    };
    return (
      <Query
        query={GetUserBets}
        updateQuery={this.formatResponse}
        variables={pagination}
      >
        {({ loading, error, data: { user } = {} }) => {
          if (loading) return 'Loading...';
          if (error) return <div className="error">Error</div>;

          return user.bets.map(this.listCards);
        }}
      </Query>
    );
  }
}

export default BetList;
