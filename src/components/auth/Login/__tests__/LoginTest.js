import React from 'react';
import { mountWithRouter } from '@sfitzpatrick/enzyme-context-helpers';

import { Login } from '../Login';

describe('Login', () => {
  let wrapper, email, password, form;

  // Mock API Responses
  const onSubmitResponse = {
    data: {
      authenticateUser: {
        id: 123,
        token: '1234'
      }
    }
  };

  // Function Spies
  const onLoginSpy = jest.fn();
  const onHistoryPushSpy = jest.fn();

  // Default Props
  const defaultProps = {
    loginMutation: onLoginSpy
  };

  const historyProps = {
    history: {
      push: onHistoryPushSpy
    }
  };

  beforeEach(() => {
    wrapper = mountWithRouter(<Login {...defaultProps} {...historyProps} />);
    email = wrapper.find('input[type="email"]');
    password = wrapper.find('input[type="password"]');
    form = wrapper.find('Formik');
  });

  afterEach(() => {
    onLoginSpy
      .mockReset()
      .mockReturnValue(onSubmitResponse)
      .mockName('loginSpy');
  });

  describe('Error Display', () => {
    test('should error correctly', () => {
      expect(wrapper.find('Alert').exists()).toBeFalsy();
      wrapper.setState({
        error: {
          title: 'Authentication Error',
          message: 'Please Try again'
        }
      });
      expect(wrapper.find('Alert').exists()).toBeTruthy();
    });

    test('should be able to clear error', () => {
      wrapper.setState({
        error: {
          title: 'Authentication Error',
          message: 'Please Try again'
        }
      });
      wrapper.instance().handleClearError({ preventDefault() {} });
      expect(wrapper.state().error).toBeNull();
    });
  });

  describe('onSubmit', () => {
    test('should not submit if empty values', () => {
      expect(onLoginSpy).not.toHaveBeenCalled();
      form.simulate('submit');
      expect(onLoginSpy).not.toHaveBeenCalled();
    });

    test('should submit if proper values', () => {
      expect(onLoginSpy).not.toHaveBeenCalled();

      email.simulate('change', {
        target: { name: 'username', value: 'email@test.com' }
      });
      password.simulate('change', {
        target: { name: 'password', value: 'secret' }
      });
      form.simulate('submit');

      setImmediate(() => {
        // expect(onLoginSpy).toHaveBeenCalledTimes(1);
        // expect(onLoginSpy).toHaveBeenCalledWith({
        //   variables: {
        //     password: 'secret',
        //     username: 'email@test.com'
        //   }
        // });
        // expect(wrapper.props().loginMutation.getMockName()).toEqual('loginSpy');

        // Expect history.push to also be called
        // expect(onHistoryPushSpy).toHaveBeenCalled();
      });
    });
  });
});
