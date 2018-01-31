import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { PrivateRoute } from './common';
import { PrimaryLayout, UnauthorizedLayout } from './Layouts';

function App() {
    return (
        <BrowserRouter>
            <React.Fragment>
                <Switch>
                    <Route path="/auth" component={UnauthorizedLayout} />
                    <PrivateRoute path="/" component={PrimaryLayout} />
                </Switch>
            </React.Fragment>
        </BrowserRouter>
    );
}

export default App;
