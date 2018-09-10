import React from 'react';

import { ToastConsumer } from '../providers/ToastProvider';

function withToast(WrappedComponent) {
  const Wrapper = props => (
    <ToastConsumer>
      {toast => <WrappedComponent {...toast} {...props} />}
    </ToastConsumer>
  );

  Wrapper.displayName = `withToast(${WrappedComponent.displayName ||
    WrappedComponent.name})`;

  return Wrapper;
}

export default withToast;
