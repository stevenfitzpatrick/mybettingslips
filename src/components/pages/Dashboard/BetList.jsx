import React, { Component } from 'react';
import { Query } from 'react-apollo';

import { GetUserBets } from '../../../client/bets';
import BetCard from './BetCard';

class BetList extends Component {
  state = {
    something: ''
  };

  listCards = ({ id, ...props }) => <BetCard key={id} id={id} {...props} />;

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
        {({ loading, error, data: { user } = {} }) => {
          if (loading) return 'Loading...';
          if (error) return <div className="error">Error</div>;

          //const count = user._betsMeta.count;
          const items = user.bets;
          return items.map(this.listCards);
        }}
      </Query>
    );
  }
}

export default BetList;
