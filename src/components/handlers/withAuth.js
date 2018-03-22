import React from 'react';

import { AuthConsumer } from '../auth/AuthProvider';

function withAuth(WrappedComponent) {
  function withAuth(props) {
    return (
      <AuthConsumer>
        {user => <WrappedComponent {...user} {...props} />}
      </AuthConsumer>
    );
  }

  withAuth.displayName = `withAuth(${WrappedComponent.displayName ||
    WrappedComponent.name})`;
  return withAuth;
}

export default withAuth;
