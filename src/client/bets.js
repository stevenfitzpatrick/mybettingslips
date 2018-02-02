import gql from 'graphql-tag';

/**
 * User Bet Mutation
 */
export const CREATE_BET_MUTATION = gql`
  mutation CreateBet(
    $stake: Float!
    $odds: Float!
    $result: RESULT
    $typeId: ID!
    $userId: ID!
  ) {
    createBet(
      stake: $stake
      odds: $odds
      result: $result
      typeId: $typeId
      userId: $userId
    ) {
      id
    }
  }
`;