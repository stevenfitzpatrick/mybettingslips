import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = { error: false };

  componentDidCatch(error, info) {
    this.setState({ error: true });
  }

  render() {
    const { error } = this.state;
    if (error) return <h1>Oops Error has occured</h1>;

    return this.props.children;
  }
}

export default ErrorBoundary;
