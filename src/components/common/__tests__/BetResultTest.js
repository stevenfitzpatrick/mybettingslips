import React from 'react';
import { renderWithTheme } from '@sfitzpatrick/enzyme-context-helpers';
import 'jest-styled-components';

import BetResult from '../BetResult';

describe('BetResult', () => {
  test('should load with open result props', () => {
    const tree = renderWithTheme(
      <BetResult result="Open">€100</BetResult>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should load with win result props', () => {
    const tree = renderWithTheme(
      <BetResult result="Win">+ €100</BetResult>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should load with loss result props', () => {
    const tree = renderWithTheme(
      <BetResult result="Loss">- €100</BetResult>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
