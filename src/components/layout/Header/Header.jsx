import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Navigation, NavigationLink } from '@sfitzpatrick/fitzy';
import { NavLink, withRouter } from 'react-router-dom';

import styles from './Header.module.scss';

export class Header extends Component {
  static propTypes = {
    history: PropTypes.object,
    className: PropTypes.string
  };

  static defaultProps = {
    className: ''
  };

  /**
   * Handle Create bet click and open modal
   */
  handleCreateBet = () => {
    this.props.history.push({ pathname: '/create', state: { modal: true } });
  };

  render() {
    return (
      <Navigation className={this.props.className}>
        {Layout => (
          <React.Fragment>
            <Layout.Left>
              <nav>
                <ul>
                  <li>
                    <NavigationLink to="/" LinkType={NavLink} icon="home" exact>
                      Home
                    </NavigationLink>
                  </li>
                  <li>
                    <NavigationLink to="/faq" LinkType={NavLink} icon="help">
                      FAQ
                    </NavigationLink>
                  </li>
                  <li>
                    <Button
                      icon="edit"
                      onClick={this.handleCreateBet}
                      className={styles.button}
                    >
                      Add Bet
                    </Button>
                  </li>
                </ul>
              </nav>
            </Layout.Left>
            <Layout.Right>
              <ul>
                <li>
                  <NavigationLink
                    to="/auth/logout"
                    icon="user"
                    LinkType={NavLink}
                  >
                    Logout
                  </NavigationLink>
                </li>
              </ul>
            </Layout.Right>
          </React.Fragment>
        )}
      </Navigation>
    );
  }
}

export default withRouter(Header);
