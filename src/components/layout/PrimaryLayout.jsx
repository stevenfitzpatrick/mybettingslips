import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import FAQ from '../pages/FAQ';
import NotFound from '../pages/NotFound';

const { Consumer, Provider } = React.createContext();

function PrimaryLayout() {
  return (
    <Provider value="Hello, world!">
      <React.Fragment>
        <header>
          <nav>
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
            <NavLink to="/faq" activeClassName="active">
              FAQ
            </NavLink>
            <NavLink to="/auth/logout" activeClassName="active">
              Logout
            </NavLink>
          </nav>
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/faq" component={FAQ} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <footer>Footer</footer>
      </React.Fragment>
    </Provider>
  );
}

export { Consumer };

export default PrimaryLayout;
