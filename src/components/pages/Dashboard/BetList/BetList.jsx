import React, { Component } from 'react';
import { Query } from 'react-apollo';

import { GetUserBets } from '../../../../client/';
import BetCard from './BetCard';

class BetList extends Component {
  listCards = ({ id, ...bet }) => <BetCard bet={bet} id={id} key={id} />;

  render() {
    const pagination = {
      first: 10,
      skip: 0
    };
    return (
      <Query query={GetUserBets} variables={pagination}>
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
