import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Yup from 'yup';
import { Button, Input } from '@sfitzpatrick/fitzy';
import { Formik } from 'formik';
import { graphql } from 'react-apollo';

import styles from '../Auth.module.scss';
import { FieldWarning, FormAlert } from '../../common';
import { handleGraphQLError } from '../../../utils';
import { LOGIN_USER_MUTATION } from '../../../client/auth';
import { logout, setKeys } from '../../../client';

const schema = Yup.object().shape({
  username: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  password: Yup.string().required('Password is required')
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
  handleSubmit = async (
    { username, password },
    { setSubmitting, setErrors }
  ) => {
    const { loginMutation, history } = this.props;
    try {
      const { data: { authenticateUser } } = await loginMutation({
        variables: { username, password }
      });
      setKeys(authenticateUser.id, authenticateUser.token);
      setSubmitting(false);
      history.push('/');
    } catch (ex) {
      const error = handleGraphQLError(ex);
      const { message, field } = error;
      if (field) {
        const ref = `${field}Ref`;
        this[ref].value.focus();
        setErrors({ [field]: message });
      } else {
        this.setState({ error });
      }
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
              innerRef={this.usernameRef}
              hasError={touched['username'] && errors['username']}
              warning=<FieldWarning
                field="username"
                touched={touched}
                errors={errors}
              />
              autoFocus
              required
            />
            <Input
              name="password"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              autoComplete="current-password"
              label="Password"
              innerRef={this.passwordRef}
              required
              hasError={touched['password'] && errors['password']}
              warning=<FieldWarning
                field="password"
                touched={touched}
                errors={errors}
              />
            />
            <Button fullWidth type="submit" disabled={isSubmitting}>
              Login
            </Button>
          </form>
        )}
      />
    );
  }
}

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default graphql(LOGIN_USER_MUTATION, {
  name: 'loginMutation'
})(Login);
