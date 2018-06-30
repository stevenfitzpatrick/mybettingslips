import React from 'react';
const reactRouter = require.requireActual('react-router-dom');

/*eslint-disable */
const withRouter = Comp => props => <Comp {...props} />;
const NavLink = ({ children, ...props }) => <a {...props}>{children}</a>;

// //?NOTE: Another way to mock a Route
// //const NavLink = 'div';
/*eslint-enable */

module.exports = {
  ...reactRouter,
  withRouter,
  NavLink
};
