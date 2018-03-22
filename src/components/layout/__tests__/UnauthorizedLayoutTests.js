import React from 'react';
import { MemoryRouter, Redirect, Route } from 'react-router-dom';
import { mount, shallow } from 'enzyme';

import UnauthorizedWithRouter, {
  UnauthorizedLayout
} from '../UnauthorizedLayout';

describe('UnauthorizedLayout', () => {
  let wrapper;

  const defaultProps = {
    location: {
      key: '1234'
    }
  };

  beforeEach(() => {
    wrapper = shallow(<UnauthorizedLayout {...defaultProps} />);
  });

  test('should load routes correctly', () => {
    expect(wrapper.find(Route)).toHaveLength(3);
    expect(wrapper.find(Redirect)).toHaveLength(1);
  });

  test('should show redirect to login if not logged in', () => {
    const mountedWrapper = mount(
      <MemoryRouter>
        <UnauthorizedLayout {...defaultProps} />
      </MemoryRouter>
    );
    const route = mountedWrapper.find(Redirect);
    expect(route.props().to).toEqual('/auth/login');
  });

  test('should correct component for matching route', () => {
    const mountedWrapper = mount(
      <MemoryRouter initialEntries={['/auth/register']} initialIndex={0}>
        <UnauthorizedWithRouter />
      </MemoryRouter>
    );
    const route = mountedWrapper.find(Route).last();
    expect(route.props().path).toEqual('/auth/register');
  });
});
