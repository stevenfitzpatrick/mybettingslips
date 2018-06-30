import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import { PrimaryLayout, UnauthorizedLayout } from './layout';
import { PrivateRoute } from './auth';

function App() {
  return (
    <BrowserRouter>
      <>
        <Switch>
          <Route component={UnauthorizedLayout} path="/auth" />
          <PrivateRoute component={PrimaryLayout} path="/" />
        </Switch>
      </>
    </BrowserRouter>
  );
}

export default hot(module)(App);
