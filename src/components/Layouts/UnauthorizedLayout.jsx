import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from '../auth/Login';
import Registration from '../auth/Registration';

function UnauthorizedLayout() {
    return (
        <React.Fragment>
            <main>
                <Switch>
                    <Route path="/auth/login" component={Login} />
                    <Route path="/auth/register" component={Registration} />
                    <Redirect to="/auth/login" />
                </Switch>
            </main>
            <footer>Footer</footer>
        </React.Fragment>
    );
}

export default UnauthorizedLayout;
