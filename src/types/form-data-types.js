import PropTypes from 'prop-types';

import {creditGoalValueType} from './credit-goal-value-types';

export const formDataShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  creditGoalValue: creditGoalValueType.isRequired,
  propertyAmount: PropTypes.number.isRequired,
  initialPaymentPercentage: PropTypes.number.isRequired,
  creditPeriod: PropTypes.number.isRequired,
  isMaternityCapital: PropTypes.bool,
  isCasco: PropTypes.bool,
  isLifeInsurance: PropTypes.bool,
});
