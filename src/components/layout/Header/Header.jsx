import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Navigation, NavigationLink } from '@sfitzpatrick/fitzy';
import { NavLink, withRouter } from 'react-router-dom';

import styles from './Header.module.scss';

export class Header extends Component {
  static propTypes = {
    className: PropTypes.string,
    history: PropTypes.object.isRequired
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
          <>
            <Layout.Left>
              <nav>
                <ul>
                  <li>
                    <NavigationLink exact icon="home" linkType={NavLink} to="/">
                      Home
                    </NavigationLink>
                  </li>
                  <li>
                    <NavigationLink icon="help" linkType={NavLink} to="/admin">
                      Admin
                    </NavigationLink>
                  </li>
                  <li>
                    <NavigationLink icon="help" linkType={NavLink} to="/faq">
                      FAQ
                    </NavigationLink>
                  </li>
                  <li>
                    <Button
                      className={styles.button}
                      icon="edit"
                      onClick={this.handleCreateBet}
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
                    icon="user"
                    linkType={NavLink}
                    to="/auth/logout"
                  >
                    Logout
                  </NavigationLink>
                </li>
              </ul>
            </Layout.Right>
          </>
        )}
      </Navigation>
    );
  }
}

export default withRouter(Header);
