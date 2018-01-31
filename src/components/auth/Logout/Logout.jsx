import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { logout } from '../../../client';

class Logout extends Component {
    componentWillMount() {
    debugger; //eslint-disable-line
        logout();
    }

    render() {
        return <Redirect to="/login" />;
    }
}

export default Logout;
