import React from 'react';
import { shallow } from 'enzyme';

import NotFound from '../NotFound';

describe('NotFound', () => {
  let wrapper;

  const defaultProps = {
    location: {
      pathname: 'fakenews'
    }
  };

  beforeEach(() => {
    wrapper = shallow(<NotFound {...defaultProps} />);
  });

  test('should render NotFound page', () => {
    expect(wrapper.is('div')).toBeTruthy();
  });

  test('should render H1 title', () => {
    expect(wrapper.find('h1')).toHaveLength(1);
  });

  test('should render not found page', () => {
    expect(wrapper.html()).toContain('fakenews');
  });
});
