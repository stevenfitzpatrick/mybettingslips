import React from 'react';
import { mount, shallow } from 'enzyme';

import { Registration } from '../Registration';

describe('Registration', () => {
  let wrapper, mountedWrapper, email, password, form;

  // Mock API Responses
  const onSubmitResponse = {
    data: {
      signupUser: {
        id: 123,
        token: '1234'
      }
    }
  };

  // Function Spies
  const onSubmitSpy = jest.fn().mockName('onSubmitSpy');
  const onHistoryPushSpy = jest.fn().mockName('onPushSpy');

  // Default Props
  const defaultProps = {
    signupUserMutation: onSubmitSpy
  };

  const historyProps = {
    history: {
      push: onHistoryPushSpy
    }
  };

  beforeEach(() => {
    wrapper = shallow(<Registration />);
    mountedWrapper = mount(
      <Registration {...defaultProps} {...historyProps} />
    );
    email = mountedWrapper.find('input[type="email"]');
    password = mountedWrapper.find('input[type="password"]');
    form = mountedWrapper.find('Formik');
    onSubmitSpy.mockReturnValue(Promise.resolve(onSubmitResponse));
    onHistoryPushSpy.mockReturnValue('lol');
  });

  afterEach(() => {
    onSubmitSpy.mockReset();
  });

  test('should render page with form', () => {
    expect(wrapper.is('Formik')).toBeTruthy();
  });

  test('should have correct initial values', () => {
    expect(Object.keys(wrapper.props().initialValues)).toEqual([
      'email',
      'password'
    ]);
  });

  describe('onChange', () => {
    test('should show warning for missing required fields', () => {
      email.simulate('blur', { target: { name: 'email', value: '' } });
      expect(mountedWrapper.find('.form-error')).toHaveLength(1);
    });

    test('should show warning for missing multiple required fields', () => {
      email.simulate('blur', { target: { name: 'email', value: '' } });
      password.simulate('blur', { target: { name: 'password', value: '' } });
      expect(mountedWrapper.find('.form-error')).toHaveLength(5);
    });
  });

  describe('onSubmit', () => {
    test('should not submit if empty values', () => {
      expect(onSubmitSpy).toHaveBeenCalledTimes(0);
      form.simulate('submit');
      expect(onSubmitSpy).toHaveBeenCalledTimes(0);
    });

    test('should submit if proper values', () => {
      expect(onSubmitSpy).not.toHaveBeenCalled();
      email.simulate('change', {
        target: { name: 'email', value: 'email@test.com' }
      });
      password.simulate('change', {
        target: { name: 'password', value: 'secret' }
      });
      form.simulate('submit');
      expect(onSubmitSpy).toHaveBeenCalled();
    });
  });
});
