import PropTypes from 'prop-types';

export const constraintShape = PropTypes.shape({
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
});
