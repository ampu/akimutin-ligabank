import PropTypes from 'prop-types';

import {creditGoalType} from './credit-goal-types';

export const formDataType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  creditGoalValue: creditGoalType.isRequired,
  propertyAmount: PropTypes.number.isRequired,
  initialPaymentPercentage: PropTypes.number.isRequired,
  creditPeriod: PropTypes.number.isRequired,
  isMaternityCapital: PropTypes.bool,
  isCasco: PropTypes.bool,
  isLifeInsurance: PropTypes.bool,
});
