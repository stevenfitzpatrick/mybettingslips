import React, { Component } from 'react';
import { func, node, oneOfType } from 'prop-types';

class ErrorBoundary extends Component {
  state = { error: false };

  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
    const { error } = this.state;
    if (error) return <h1>Oops Error has occured</h1>;

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: oneOfType([func, node]).isRequired
};

export default ErrorBoundary;
