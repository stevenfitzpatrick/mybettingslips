import React from 'react';

const Alert = ({ children, ...rest }) => (
    <div className="alert alert--error" {...rest}>
        {children}
    </div>
);

export default Alert;
