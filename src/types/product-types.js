import PropTypes from 'prop-types';

const productType = {
  id: PropTypes.string.isRequired,
};

const productShape = PropTypes.shape(productType);

export {
  productType,
  productShape,
};
