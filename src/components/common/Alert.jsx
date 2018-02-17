import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    children: PropTypes.string
};

const Alert = ({ children, ...rest }) => (
    <div className="alert alert--error" {...rest}>
        {children}
    </div>
);

Alert.propTypes = propTypes;

export default Alert;
