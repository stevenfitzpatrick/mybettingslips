import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from '../../pages/Dashboard';
import FAQ from '../../pages/FAQ';
import Header from '../Header/Header';
import NotFound from '../../pages/NotFound';
import { Loadable } from '../../common/';
import styles from './PrimaryLayout.module.scss';

const LazyCreateBet = Loadable({
  loader: () =>
    import(/* webpackChunkName: "create-bet" */ '../../pages/Dashboard/CreateBet')
});

class PrimaryLayout extends Component {
  static propTypes = {
    location: PropTypes.object
  };

  previousLocation = this.props.location;

  componentDidUpdate(nextProps) {
    const { location } = this.props;
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

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
          <Switch location={isBetModal ? this.previousLocation : location}>
            <Route exact path="/" component={Dashboard} />
            <Route path="/faq" component={FAQ} />
            <Route component={NotFound} />
          </Switch>
          {isBetModal ? (
            <Route path="/create" component={LazyCreateBet} />
          ) : null}
        </main>
        <footer>Footer</footer>
      </div>
    );
  }
}

export default PrimaryLayout;
