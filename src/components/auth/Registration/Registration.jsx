import PropTypes from 'prop-types';
import React from 'react';
import { Formik } from 'formik';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

import styles from '../Auth.module.scss';
import { FormAlert } from '../../common';
import { setKeys } from '../../../client';
import { SignupUser } from '../../../client/auth';

const propTypes = {
  history: PropTypes.object,
  signupUserMutation: PropTypes.func.isRequired
};

const defaultProps = {
  history: {}
};

export function Registration({ history, signupUserMutation }) {
  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      onSubmit={async ({ email, password }, { setSubmitting, setErrors }) => {
        try {
          const {
            data: { signupUser }
          } = await signupUserMutation({
            variables: { email, password }
          });
          setKeys(signupUser.id, signupUser.token);
          setSubmitting(false);
          history.push('/');
        } catch ({ message }) {
          setErrors({ message });
          setSubmitting(false);
        }
      }}
      render={({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <h1>Register</h1>
          {errors.message && <FormAlert>{errors.message}</FormAlert>}
          <input
            autoFocus
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
          />
          {touched.email &&
            errors.email && <div className="form-error">{errors.email}</div>}
          <input
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
          />
          {touched.password &&
            errors.password && (
              <div className="form-error">{errors.password}</div>
            )}
          <button disabled={isSubmitting} type="submit">
            Submit
          </button>

          <p className={styles.link}>
            Back to <Link to="/auth/login">Login</Link>
          </p>
        </form>
      )}
      validate={({ email, password }) => {
        let errors = {};
        if (!email) {
          errors.email = 'Email is required';
        }
        if (!password) {
          errors.password = 'Password is required';
        }
        return errors;
      }}
    />
  );
}

Registration.propTypes = propTypes;
Registration.defaultProps = defaultProps;

export default graphql(SignupUser, {
  name: 'signupUserMutation'
})(Registration);
