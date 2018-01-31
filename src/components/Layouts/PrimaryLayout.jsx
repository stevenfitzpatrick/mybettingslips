import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';

import Home from '../Home';
import FAQ from '../FAQ';
import Logout from '../auth/Logout';
import { NotFound } from '../common';

function UnauthorizedLayout() {
    return (
        <React.Fragment>
            <header>
                <nav>
                    <NavLink to="/" exact activeClassName="active">
            Home
                    </NavLink>
                    <NavLink to="/faq" activeClassName="active">
            FAQ
                    </NavLink>
                    <NavLink to="/logout" activeClassName="active">
            Logout
                    </NavLink>
                </nav>
            </header>
            <main>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/faq" component={FAQ} />
                    <Route path="/logout" component={Logout} />
                    <Route component={NotFound} />
                </Switch>
            </main>
            <footer>Footer</footer>
        </React.Fragment>
    );
}

export default UnauthorizedLayout;
