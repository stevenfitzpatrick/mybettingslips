import React from 'react';
import { renderWithTheme } from '@sfitzpatrick/enzyme-context-helpers';

import Header from '../Header';

describe('Header', () => {
  test('should render Header', () => {
    const tree = renderWithTheme(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
