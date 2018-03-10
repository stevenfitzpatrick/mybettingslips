import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Login from '../auth/Login';
import Logout from '../auth/Logout';
import Registration from '../auth/Registration';
import styles from './Unauthorized.module.scss';

function UnauthorizedLayout() {
  return (
    <React.Fragment>
      <main className={styles.authContainer}>
        <section className={styles['auth__img']} />
        <section className={styles['auth__form']}>
          <Switch>
            <Route path="/auth/register" component={Registration} />
            <Route path="/auth/logout" component={Logout} />
            <Route path="/auth/login" component={Login} />
            <Redirect to="/auth/login" />
          </Switch>
        </section>
      </main>
    </React.Fragment>
  );
}

export default UnauthorizedLayout;
