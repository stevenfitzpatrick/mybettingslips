import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

// Queries
import { CREATE_BET_MUTATION, BET_DROPDOWNS_QUERY } from '../../../client/bets';

const results = {
    OPEN: 'Open',
    WIN: 'Win',
    LOSS: 'Loss',
    VOID: 'Void'
};

class CreateBet extends Component {
  handleSubmit = async () => {
      const result = await this.props.createBet({
          variables: {
              stake: 20,
              odds: 1.5,
              result: results.OPEN,
              typeId: 'cjd61oxwh1tvm01763kusqrkr'
          }
      });
    debugger; //eslint-disable-line
  };
  render() {
      const test = this.props;
    debugger; //eslint-disable-line
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
