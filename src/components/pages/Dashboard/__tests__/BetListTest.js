import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';

import { mount } from 'enzyme';
import BetList from '../BetList';
// import { GetUserBets } from '../../../../client/bets.graphql';

describe('Bet Query List Test', () => {
  // const mocks = [
  //   {
  //     request: {
  //       query: GetUserBets,
  //       variables: {
  //         first: 10,
  //         skip: 0
  //       }
  //     },
  //     result: {
  //       data: {
  //         dog: { id: '1', name: 'Buck', breed: 'bulldog' }
  //       }
  //     }
  //   }
  // ];

  test('should render loading screen', () => {
    let wrapper = mount(
      <MockedProvider mocks={[]} addTypename={false}>
        <BetList name="Buck" />
      </MockedProvider>
    );

    expect(wrapper.contains('Loading...')).toBeTruthy();
  });
});
