import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { PrivateRoute } from './common';
import Login from './Login';
import Home from './Home';
import Registration from './Registration';

function App() {
    return (
        <BrowserRouter>
            <React.Fragment>
                <Switch>
                    <PrivateRoute exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Registration} />
                </Switch>
            </React.Fragment>
        </BrowserRouter>
    );
}

export default App;
