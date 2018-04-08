import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import FAQ from '../pages/FAQ';
import NotFound from '../pages/NotFound';
import TopNav from '../common/TopNav';

function PrimaryLayout() {
  return (
    <React.Fragment>
      <header>
        <TopNav />
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
  );
}

export default PrimaryLayout;
