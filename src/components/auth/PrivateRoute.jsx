import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';

import { isLoggedIn } from '../../client';
import { LOGGED_IN_USER_QUERY } from '../../client/auth';

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
        return <div>Loading</div>;
    }
    if (loggedInUser && loggedInUser.id) {
        return <Route {...rest} render={props => <Component {...props} />} />;
    } else {
        return <Redirect to="/auth/login" />;
    }
};

export default graphql(LOGGED_IN_USER_QUERY, {
    props: ({ data: { loading, loggedInUser } }) => ({
        loading,
        loggedInUser
    }),
    skip: () => !isLoggedIn()
})(PrivateRoute);
