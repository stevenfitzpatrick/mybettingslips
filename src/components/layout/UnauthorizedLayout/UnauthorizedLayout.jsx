import PropTypes from 'prop-types';
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import Login from '../../auth/Login';
import Logout from '../../auth/Logout';
import Registration from '../../auth/Registration';

import styles from './Unauthorized.module.scss';

export function UnauthorizedLayout({ location }) {
  return (
    <main className={styles.authContainer}>
      <section className={styles['auth__img']} />
      <TransitionGroup className={styles['auth__form']} component="section">
        <CSSTransition classNames="fade" key={location.key} timeout={200}>
          <div className={styles['auth__inner']}>
            <Switch location={location}>
              <Route component={Registration} exact path="/auth/register" />
              <Route component={Logout} exact path="/auth/logout" />
              <Route component={Login} exact path="/auth/login" />
              <Redirect to="/auth/login" />
            </Switch>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </main>
  );
}

UnauthorizedLayout.propTypes = {
  location: PropTypes.shape({
    key: PropTypes.string
  }).isRequired
};

export default withRouter(UnauthorizedLayout);
