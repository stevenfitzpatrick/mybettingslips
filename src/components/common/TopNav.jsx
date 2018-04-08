import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './TopNav.module.scss';
import TopNavLink from './NavLink';

class TopNav extends React.Component {
  state = {};

  render() {
    return (
      <nav className={styles.nav}>
        <TopNavLink to="/" exact LinkType={NavLink}>
          Home2
        </TopNavLink>
        <TopNavLink to="/faq" LinkType={NavLink}>
          FAQ
        </TopNavLink>
        <TopNavLink to="/auth/logout" LinkType={NavLink}>
          Logout
        </TopNavLink>
      </nav>
    );
  }
}

export default TopNav;
