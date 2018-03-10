import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import { PrimaryLayout, UnauthorizedLayout } from './layout';
import { PrivateRoute } from './auth';

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

export default hot(module)(App);
