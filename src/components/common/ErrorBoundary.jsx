import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = {
      hasError: false
  };

  componentDidCatch(error, info) {
      // Display fallback UI
      this.setState({ hasError: true });
    debugger; //eslint-disable-line
  }

  render() {
      if (this.state.hasError) return <h1>Error</h1>;
      return this.props.children;
  }
}

export default ErrorBoundary;
