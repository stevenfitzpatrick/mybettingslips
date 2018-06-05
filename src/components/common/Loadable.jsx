import L from 'react-loadable';
import PropTypes from 'prop-types';

import Loading from './Loading';

const Loadable = props =>
  L({
    loading: Loading,
    ...props
  });

Loadable.propTypes = {
  delay: PropTypes.number
};

Loadable.defaultProps = {
  delay: 250
};

export default Loadable;
