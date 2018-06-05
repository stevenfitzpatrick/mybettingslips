import React from 'react';

import AuthProvider from '../auth/AuthProvider';

function withAuth(WrappedComponent) {
  const Wrapper = props => (
    <AuthProvider.Consumer>
      {user => <WrappedComponent {...user} {...props} />}
    </AuthProvider.Consumer>
  );

  Wrapper.displayName = `withAuth(${WrappedComponent.displayName ||
    WrappedComponent.name})`;

  return Wrapper;
}

export default withAuth;
