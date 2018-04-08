import PropTypes from 'prop-types';
import React from 'react';

class TopNavLink extends React.Component {
  state = {};

  render() {
    const { to, href, LinkType, children, ...rest } = this.props;
    return (
      <span>
        {href ? (
          <a href={href}>{children}</a>
        ) : (
          <LinkType activeClassName="active" to={to} {...rest}>
            {children}
          </LinkType>
        )}
      </span>
    );
  }
}

TopNavLink.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  LinkType: PropTypes.func,
  children: PropTypes.any
};

export default TopNavLink;
