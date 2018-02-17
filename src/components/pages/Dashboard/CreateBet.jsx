import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';

// Queries
import { BET_DROPDOWNS_QUERY, CREATE_BET_MUTATION } from '../../../client/bets';

const results = {
    OPEN: 'Open',
    WIN: 'Win',
    LOSS: 'Loss',
    VOID: 'Void'
};

class CreateBet extends Component {
  static propTypes = {
      createBet: PropTypes.func
  };

  handleSubmit = async () => {
      await this.props.createBet({
          variables: {
              stake: 20,
              odds: 1.5,
              result: results.OPEN,
              typeId: 'cjd61oxwh1tvm01763kusqrkr'
          }
      });
  };

  render() {
      return (
          <div>
        some bets
              <button onClick={this.handleSubmit}>Submit</button>
          </div>
      );
  }
}

export default compose(
    graphql(CREATE_BET_MUTATION, {
        options({ id }) {
            return { variables: { userId: id } };
        },
        name: 'createBet'
    }),
    graphql(BET_DROPDOWNS_QUERY, {
        props: ({ getBetTypes: { allBetTypes } }) => {
            return { betTypeList: allBetTypes };
        },
        name: 'getBetTypes'
    })
)(CreateBet);
