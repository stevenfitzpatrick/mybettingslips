import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  field: PropTypes.string.isRequired,
  touched: PropTypes.object,
  errors: PropTypes.object
};

const defaultProps = {
  touched: {},
  errors: {}
};

const FieldWarning = ({ touched, errors, field }) => {
  return touched[field] && errors[field] ? (
    <div className="form-error">{errors[field]}</div>
  ) : null;
};

FieldWarning.propTypes = propTypes;
FieldWarning.defaultProps = defaultProps;

export default FieldWarning;
