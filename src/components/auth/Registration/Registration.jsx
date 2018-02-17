import PropTypes from 'prop-types';
import React from 'react';

import { Formik } from 'formik';
import { graphql } from 'react-apollo';

import { Alert } from '../../common';
import { setKeys } from '../../../client';
import { SIGNUP_USER_MUTATION } from '../../../client/auth';

const propTypes = {
    history: PropTypes.object,
    signupUserMutation: PropTypes.func
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
                    const { data: { signupUser } } = await signupUserMutation({
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
                <form onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    {errors.message && <Alert>{errors.message}</Alert>}
                    <input
                        name="email"
                        type="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        autoFocus
                    />
                    {touched.email &&
            errors.email && <div className="form-error">{errors.email}</div>}
                    <input
                        name="password"
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
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

Registration.propTypes = propTypes;
Registration.defaultProps = defaultProps;

export default graphql(SIGNUP_USER_MUTATION, {
    name: 'signupUserMutation'
})(Registration);
