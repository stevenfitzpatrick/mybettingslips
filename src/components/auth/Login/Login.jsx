import PropTypes from 'prop-types';
import React from 'react';
import Yup from 'yup';
import { Formik } from 'formik';
import { graphql } from 'react-apollo';
import { Input } from 'fitzy';

import { Alert } from '../../common';
import { LOGIN_USER_MUTATION } from '../../../client/auth';
import { logout, setKeys } from '../../../client';

const propTypes = {
    history: PropTypes.object,
    loginMutation: PropTypes.func
};

const defaultProps = {
    history: {}
};

const schema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Invalid email address'),
    password: Yup.string().required('Password is required')
});

export function Login({ history, loginMutation }) {
    logout();
    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={schema}
            onSubmit={async ({ email, password }, { setSubmitting, setErrors }) => {
                try {
                    const { data: { authenticateUser } } = await loginMutation({
                        variables: { email, password }
                    });
                    setKeys(authenticateUser.id, authenticateUser.token);
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
                <form onSubmit={handleSubmit} noValidate name="loginForm">
                    <h1>Login</h1>
                    {errors.message && <Alert>{errors.message}</Alert>}
                    <Input
                        name="email"
                        type="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        autoComplete="username"
                        spellCheck={false}
                        autoFocus
                        required
                    />
                    {touched.email &&
            errors.email && <div className="form-error">{errors.email}</div>}
                    <Input
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
