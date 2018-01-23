import React, { Component } from 'react';

const withError = Wrapped =>
    class extends Component {
        componentDidCatch(user, info) {
      debugger; //eslint-disable-line
        }
        render() {
            return <Wrapped {...this.props} />;
        }
    };

export default withError;
