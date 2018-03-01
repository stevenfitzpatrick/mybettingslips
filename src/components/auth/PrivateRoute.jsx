import React, { createContext } from 'react';
import { graphql } from 'react-apollo';
import { Redirect, Route } from 'react-router-dom';

import { isLoggedIn } from '../../client';
import { LOGGED_IN_USER_QUERY } from '../../client/auth';

const { Provider, Consumer } = createContext();

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
        return (
            <Provider value={loggedInUser}>
                <Route {...rest} render={props => <Component {...props} />} />
            </Provider>
        );
    } else {
        return <Redirect to="/auth/login" />;
    }
};

export { Consumer };

export default graphql(LOGGED_IN_USER_QUERY, {
    props: ({ data: { loading, loggedInUser } }) => ({
        loading,
        loggedInUser
    }),
    skip: () => !isLoggedIn()
})(PrivateRoute);
