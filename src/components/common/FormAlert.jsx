import PropTypes from 'prop-types';
import React from 'react';

import { Alert } from '@sfitzpatrick/fitzy';

const propTypes = {
  onClear: PropTypes.func.isRequired,
  error: PropTypes.shape({
    title: PropTypes.string,
    message: PropTypes.string
  })
};

const defaultProps = {
  error: null
};

const FormAlert = ({ error, onClear }) =>
  error ? (
    <Alert title={error.title} onCancel={onClear}>
      {error.message}
    </Alert>
  ) : null;

FormAlert.propTypes = propTypes;
FormAlert.defaultProps = defaultProps;

export default FormAlert;
