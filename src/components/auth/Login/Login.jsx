import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Input } from '@sfitzpatrick/fitzy';
import { Formik } from 'formik';
import { graphql } from 'react-apollo';
import { object, string } from 'yup';

import styles from '../Auth.module.scss';
import { authenticateUser } from '../../../client/auth';
import { FormAlert } from '../../common';
import { handleGraphQLError } from '../../../utils';
import { logout, setKeys } from '../../../client';

const schema = object().shape({
  username: string()
    .required('Email is required')
    .email('Invalid email address'),
  password: string().required('Password is required')
});

const propTypes = {
  /**
   * React Router prop used for route navigation
   */
  history: PropTypes.object,
  /**
   * Function to handle login attempts
   */
  loginMutation: PropTypes.func.isRequired
};

const defaultProps = {
  history: {}
};

export class Login extends Component {
  state = {
    error: null
  };

  componentDidMount() {
    logout();
  }

  /**
   * Set Inputs refs for validation
   */
  usernameRef = React.createRef();
  passwordRef = React.createRef();

  /**
   * Clear back end error message
   */
  handleClearError = e => {
    e.preventDefault();
    this.setState({ error: null });
  };

  /**
   * Handle Form Submit
   */
  handleSubmit = async ({ username, password }, { setSubmitting }) => {
    const { loginMutation, history } = this.props;
    try {
      const {
        data: { authenticateUser }
      } = await loginMutation({
        variables: { username, password }
      });
      setKeys(authenticateUser.id, authenticateUser.token);
      setSubmitting(false);
      history.push('/');
    } catch (ex) {
      const error = handleGraphQLError(ex);
      this.setState({ error });
      this.usernameRef.current.focus();
      setSubmitting(false);
    }
  };

  render() {
    return (
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        onSubmit={this.handleSubmit}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <form
            className={styles.formContainer}
            name="loginForm"
            noValidate
            onSubmit={handleSubmit}
          >
            <h1 className="header-4xl">Login</h1>
            <FormAlert
              error={this.state.error}
              onClear={this.handleClearError}
            />
            <Input
              autoComplete="username"
              autoFocus
              innerRef={this.usernameRef}
              label="Username"
              name="username"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              spellCheck={false}
              type="email"
              value={values.username}
              warning={errors['username']}
            />
            <Input
              autoComplete="current-password"
              innerRef={this.passwordRef}
              label="Password"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              type="password"
              value={values.password}
              warning={touched['password'] && errors['password']}
            />
            <Button
              disabled={isSubmitting}
              fullWidth
              loading={isSubmitting}
              type="submit"
            >
              Login
            </Button>
            <p className={styles.link}>
              No Account ? Registration coming soon2...
            </p>
          </form>
        )}
        validationSchema={schema}
      />
    );
  }
}

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default graphql(authenticateUser, {
  name: 'loginMutation'
})(Login);
