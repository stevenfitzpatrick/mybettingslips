import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import FAQ from '../../pages/FAQ';
import Header from '../Header/Header';
import NotFound from '../../pages/NotFound';
import { ErrorBoundary, Loadable } from '../../common/';

import styles from './PrimaryLayout.module.scss';

const LazyDashboard = Loadable({
  loader: () =>
    import(/* webpackChunkName: "dashboard" */ '../../pages/Dashboard')
});

const LazyCreateBet = Loadable({
  loader: () =>
    import(/* webpackChunkName: "create-bet" */ '../../pages/CreateBet/CreateBet')
});

const LazyAdmin = Loadable({
  loader: () =>
    import(/* webpackChunkName: "admin" */ '../../pages/Admin/Admin')
});

class PrimaryLayout extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  };

  componentDidUpdate(nextProps) {
    const { location } = this.props;
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = location;
    }
  }

  previousLocation = this.props.location;

  render() {
    const { location } = this.props;
    const isBetModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    );

    return (
      <div className={styles.grid}>
        <Header className={styles.header} />
        <main className={styles.main}>
          <ErrorBoundary>
            <Switch location={isBetModal ? this.previousLocation : location}>
              <Route component={LazyDashboard} exact path="/" />
              <Route component={FAQ} path="/faq" />
              <Route component={LazyAdmin} path="/admin" />
              <Route component={NotFound} />
            </Switch>
            {isBetModal ? (
              <Route component={LazyCreateBet} path="/create" />
            ) : null}
          </ErrorBoundary>
        </main>
        <footer>Footer</footer>
      </div>
    );
  }
}

export default PrimaryLayout;
