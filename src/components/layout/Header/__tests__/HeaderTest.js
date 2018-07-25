import React from 'react';
import { renderWithTheme } from '@sfitzpatrick/enzyme-context-helpers';

import Header from '../Header';

describe('Header', () => {
  test('should render Header', () => {
    const defaultProps = {
      history: {
        push: jest.fn()
      }
    };
    const tree = renderWithTheme(<Header {...defaultProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
