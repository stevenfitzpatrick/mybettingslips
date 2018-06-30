import PropTypes from 'prop-types';
import React from 'react';

import { Alert } from '@sfitzpatrick/fitzy';

const propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
    title: PropTypes.string
  }),
  onClear: PropTypes.func.isRequired
};

const defaultProps = {
  error: null
};

const FormAlert = ({ error, onClear }) =>
  error ? (
    <Alert onCancel={onClear} title={error.title}>
      {error.message}
    </Alert>
  ) : null;

FormAlert.propTypes = propTypes;
FormAlert.defaultProps = defaultProps;

export default FormAlert;
