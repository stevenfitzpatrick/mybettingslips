import React from 'react';
import { MemoryRouter, Redirect, Route } from 'react-router-dom';
import { mount, shallow } from 'enzyme';

import UnauthorizedLayout from '../UnauthorizedLayout';

describe('UnauthorizedLayout', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<UnauthorizedLayout />);
    });

    test('should load routes correctly', () => {
        expect(wrapper.find(Route)).toHaveLength(3);
        expect(wrapper.find(Redirect)).toHaveLength(1);
    });

    test('should show redirect to login if not logged in', () => {
        const mountedWrapper = mount(
            <MemoryRouter>
                <UnauthorizedLayout />
            </MemoryRouter>
        );
        const route = mountedWrapper.find(Route);
        expect(route.props().path).toEqual('/auth/login');
    });

    test('should correct component for matching route', () => {
        const mountedWrapper = mount(
            <MemoryRouter initialEntries={['/auth/register']} initialIndex={0}>
                <UnauthorizedLayout />
            </MemoryRouter>
        );
        const route = mountedWrapper.find(Route);
        expect(route.props().path).toEqual('/auth/register');
    });
});
