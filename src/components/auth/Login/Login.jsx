import PropTypes from 'prop-types';
import React from 'react';
import Yup from 'yup';
import { Formik } from 'formik';
import { graphql } from 'react-apollo';
import { Input } from 'fitzy';

import styles from '../Auth.module.scss';
import { Alert, FieldWarning } from '../../common';
import { LOGIN_USER_MUTATION } from '../../../client/auth';
import { logout, setKeys } from '../../../client';

const schema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Invalid email address'),
    password: Yup.string().required('Password is required')
});

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
                <form
                    onSubmit={handleSubmit}
                    noValidate
                    name="loginForm"
                    className={styles.formContainer}
                >
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
                        label="Email"
                        className="field-container"
                        hasError={touched['email'] && errors['email']}
                        warning=<FieldWarning
                            field="email"
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
                        required
                        className="field-container"
                        hasError={touched['password'] && errors['password']}
                        warning=<FieldWarning
                            field="password"
                            touched={touched}
                            errors={errors}
                        />
                    />

                    <button type="submit" disabled={isSubmitting}>
            Login
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
