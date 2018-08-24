import React from 'react';
import { GetUserBets } from 'index.js';
import { MockedProvider } from 'react-apollo/test-utils';
import { mount } from 'enzyme';

import BetList from '../BetList';

describe('Bet Query List Test', () => {
  const mocks = [
    {
      request: {
        query: GetUserBets,
        variables: {
          first: 10,
          skip: 0
        }
      },
      result: {
        data: {
          user: {
            bets: [
              {
                id: 1
              }
            ],
            _betsMeta: {
              count: 10
            }
          }
        }
      }
    }
  ];

  test('should render loading screen', () => {
    let wrapper = mount(
      <MockedProvider mocks={[]}>
        <BetList name="Buck" />
      </MockedProvider>
    );

    expect(wrapper.contains('Loading...')).toBeTruthy();
  });

  test('should render data list', async () => {
    let wrapper = mount(
      <MockedProvider addTypename={false} mocks={mocks}>
        <BetList name="Buck" />
      </MockedProvider>
    );

    wrapper.update();
    expect(wrapper.find('pre')).toBeTruthy();
  });

  test('should render error', async () => {
    const errorMock = {
      request: {
        query: GetUserBets,
        variables: {
          first: 10,
          skip: 0
        }
      },
      error: new Error('aw shucks')
    };

    const wrapper1 = mount(
      <MockedProvider addTypename={false} mocks={[errorMock]}>
        <BetList name="Buck" />
      </MockedProvider>
    );

    wrapper1.update();
    expect(wrapper1.find('.error')).toBeTruthy();
  });
});
