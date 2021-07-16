import PropTypes from 'prop-types';

/**
 * @typedef {Object} LocalReview
 * @property {number} rating
 * @property {string} author
 * @property {string} advantages
 * @property {string} disadvantages
 * @property {string} comment
 */

const localReviewShape = PropTypes.shape({
  text: PropTypes.string.isRequired,
});

const reviewShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
});

const reviewsType = PropTypes.arrayOf(reviewShape.isRequired).isRequired;

export {
  localReviewShape,
  reviewShape,
  reviewsType,
};
