import React from 'react';
import PropTypes from 'prop-types';

function NotFound({ location }) {
    return (
        <div>
            <h1>404</h1>
            <div>{location.pathname}</div>
        </div>
    );
}

NotFound.propTypes = {
    /**
   * Location prop from React Router
   */
    location: PropTypes.shape({
        pathname: PropTypes.string
    })
};

NotFound.defaultProps = {
    location: {}
};

export default NotFound;
