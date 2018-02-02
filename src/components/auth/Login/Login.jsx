import React from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'react-apollo';
import { Formik } from 'formik';

import { Alert } from '../../common';
import { setKeys, logout } from '../../../client';
import { LOGIN_USER_MUTATION } from '../../../client/auth';

const propTypes = {
    history: PropTypes.object,
    loginMutation: PropTypes.func
};

const defaultProps = {
    history: {}
};

export function Login({ history, loginMutation }) {
    logout();
    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
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
            onSubmit={async ({ email, password }, { setSubmitting, setErrors }) => {
                try {
                    const { data: { authenticateUser } } = await loginMutation({
                        variables: { email, password }
                    });
                    setKeys(authenticateUser.id, authenticateUser.token);
                    setSubmitting(false);
                    history.push('/');
                } catch ({ message }) {
          debugger; //eslint-disable-line
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
                <form onSubmit={handleSubmit} noValidate name="loginForm">
                    <h1>Login</h1>
                    {errors.message && <Alert>{errors.message}</Alert>}
                    <input
                        name="email"
                        type="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        autoComplete="username"
                        autoFocus
                        required
                    />
                    {touched.email &&
            errors.email && <div className="form-error">{errors.email}</div>}
                    <input
                        name="password"
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        autoComplete="current-password"
                        required
                    />
                    {touched.password &&
            errors.password && (
                            <div className="form-error">{errors.password}</div>
                        )}
                    <button type="submit" disabled={isSubmitting}>
            Submit
                    </button>
                </form>
            )}
        />
    );
}

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default graphql(LOGIN_USER_MUTATION, {
    name: 'loginMutation'
})(Login);
