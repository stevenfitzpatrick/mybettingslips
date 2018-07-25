import React from 'react';
import { func, number, shape, string } from 'prop-types';
import { Mutation } from 'react-apollo';

import { DeleteBet } from '../../../client/bets.mutations';
import { GetUserBets } from '../../../client/bets';
import styles from './Dashboard.module.scss';

const BetCard = ({
  bet: { createdAt, odds, result, stake, type = {} },
  id
}) => {
  return (
    <Mutation
      mutation={DeleteBet}
      optimisticResponse={{
        deleteBet: {
          id,
          __typename: 'Bet'
        }
      }}
      update={(cache, { data: { deleteBet } }) => {
        const data = cache.readQuery({
          query: GetUserBets,
          variables: {
            first: 10,
            skip: 0
          }
        });
        data.user.bets = data.user.bets.filter(bet => bet.id !== deleteBet.id);
        cache.writeQuery({
          query: GetUserBets,
          variables: {
            first: 10,
            skip: 0
          },
          data
        });
      }}
    >
      {deleteBet => (
        <div className={styles.betCard}>
          <div>{createdAt}</div>
          <div>{odds}</div>
          <div>{result}</div>
          <div>{stake}</div>
          <div>{type.name}</div>
          <button
            onClick={() => deleteBet({ variables: { id } })}
            type="button"
          >
            Delete
          </button>
        </div>
      )}
    </Mutation>
  );
};

BetCard.propTypes = {
  bet: shape({
    createdAt: string,
    odds: number,
    result: string,
    stake: number,
    type: shape({
      icon: string,
      name: string
    })
  }).isRequired,
  id: string.isRequired,
  onDelete: func.isRequired
};

export default BetCard;
