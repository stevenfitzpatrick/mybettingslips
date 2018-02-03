import React from 'react';
import { shallow } from 'enzyme';

import { Logout } from '../Logout';
import { logout } from '../../../../client';

jest.mock('../../../../client');

describe('Logout', () => {
    let wrapper;

    // Function Spies
    const resetStoreSpy = jest.fn().mockName('resetStoreSpy');

    // Default Props
    const defaultProps = {
        client: {
            resetStore: resetStoreSpy
        }
    };

    beforeEach(() => {
        wrapper = shallow(<Logout {...defaultProps} />);
    });

    afterEach(() => {
        logout.mockReset();
        resetStoreSpy.mockReset();
    });

    it('should render redirect component', () => {
        expect(wrapper.is('Redirect')).toEqual(true);
    });

    it('should render to login screen', () => {
        expect(wrapper.props().to).toEqual('/auth/login');
    });

    it('should reset store', () => {
        expect(resetStoreSpy).toHaveBeenCalledTimes(1);
    });

    it('should call logout function', () => {
        expect(logout).toHaveBeenCalledTimes(1);
    });
});
