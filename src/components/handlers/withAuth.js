import React from 'react';

import { Consumer } from '../auth/PrivateRoute';

function withAuth(WrappedComponent) {
    function withAuth(props) {
        return (
            <Consumer>{user => <WrappedComponent {...user} {...props} />}</Consumer>
        );
    }

    withAuth.displayName = `withAuth(${WrappedComponent.displayName ||
    WrappedComponent.name})`;
    return withAuth;
}

export default withAuth;
