import React from 'react';
import { graphql } from 'react-apollo';
import { Redirect, Route } from 'react-router-dom';

import AuthProvider from '../auth/AuthProvider';
import { CurrentUser } from '../../client/auth';
import { isLoggedIn } from '../../client';

import styles from './Auth.module.scss';

const PrivateRoute = ({
  component: Component,
  loading,
  loggedInUser,
  ...rest
}) => {
  if (!isLoggedIn() || loggedInUser === null) {
    return <Redirect to="/auth/login" />;
  }
  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }
  if (loggedInUser && loggedInUser.id) {
    return (
      <AuthProvider user={loggedInUser}>
        <Route {...rest} render={props => <Component {...props} />} />
      </AuthProvider>
    );
  } else {
    return <Redirect to="/auth/login" />;
  }
};

export default graphql(CurrentUser, {
  props: ({ data: { loading, loggedInUser } }) => ({
    loading,
    loggedInUser
  }),
  skip: () => !isLoggedIn()
})(PrivateRoute);
