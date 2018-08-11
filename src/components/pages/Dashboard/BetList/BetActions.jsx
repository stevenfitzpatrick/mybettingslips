import React from 'react';
import { Button } from '@sfitzpatrick/fitzy';
import { Mutation } from 'react-apollo';
import { string } from 'prop-types';

import { results } from '../../../../store/bet.constants';
import { UpdateBet } from '../../../../client/';

const BetActions = ({ id }) => (
  <Mutation mutation={UpdateBet}>
    {updateBet => (
      <Button
        onClick={() => updateBet({ variables: { id, result: results.WIN } })}
      >
        Win
      </Button>
    )}
  </Mutation>
);

BetActions.propTypes = {
  id: string.isRequired
};

export default BetActions;
