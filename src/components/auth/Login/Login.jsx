import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Input } from '@sfitzpatrick/fitzy';
import { Formik } from 'formik';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
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
  loginMutation: PropTypes.func
};

const defaultProps = {
  history: {}
};

export class Login extends Component {
  state = {
    error: null
  };

  /**
   * Set Inputs refs for validation
   */
  usernameRef = React.createRef();
  passwordRef = React.createRef();

  componentDidMount() {
    logout();
  }

  /**
   * Clear back end error message
   */
  clearError = e => {
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
        validationSchema={schema}
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
            onSubmit={handleSubmit}
            noValidate
            name="loginForm"
            className={styles.formContainer}
          >
            <h1 className="header-4xl">Login</h1>
            <FormAlert error={this.state.error} onClear={this.clearError} />
            <Input
              name="username"
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              autoComplete="username"
              spellCheck={false}
              label="Username"
              placeholder="Enter your email"
              innerRef={this.usernameRef}
              warning={errors['username']}
              autoFocus
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              autoComplete="current-password"
              label="Password"
              innerRef={this.passwordRef}
              required
              warning={touched['password'] && errors['password']}
            />
            <Button
              fullWidth
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              Login
            </Button>
            <p className={styles.link}>
              No Account ? <Link to="/auth/register">Register now</Link>
            </p>
          </form>
        )}
      />
    );
  }
}

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default graphql(authenticateUser, {
  name: 'loginMutation'
})(Login);
