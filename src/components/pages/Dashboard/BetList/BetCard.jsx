import React from 'react';
import { Mutation } from 'react-apollo';
import { number, shape, string } from 'prop-types';

import styles from '../Dashboard.module.scss';
import { BetResult } from '../../../common/';
import {
  calculateResult,
  calculateWinnings,
  formatRelativeDate
} from '../../../../utils/';
import { DeleteBet, GetUserBets } from '../../../../client/';
import BetActions from './BetActions';

const BetCard = ({
  bet: { createdAt, odds, result, stake, type = {} },
  id
}) => {
  const potentialWinnings = calculateWinnings(odds, stake);
  const netResult = calculateResult(result, potentialWinnings, stake);

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
          <div>
            Created at:
            {formatRelativeDate(createdAt)}
          </div>
          <div>Odds: {odds}</div>
          <div>Results: {result}</div>
          <div>Stake: {stake}</div>
          <div>Potential Winnings: €{potentialWinnings}</div>
          <div>
            Net Result: <BetResult result={result}>{netResult}</BetResult>
          </div>
          <div>Type: {type.name}</div>
          <BetActions id={id} />
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
  id: string.isRequired
};

export default BetCard;
