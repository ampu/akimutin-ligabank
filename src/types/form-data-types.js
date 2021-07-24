import PropTypes from "prop-types";

import {CREDIT_GOAL_VALUES} from "../constants/credit-goal";

const creditGoalType = PropTypes.oneOf(CREDIT_GOAL_VALUES);

const formDataShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  creditGoal: creditGoalType.isRequired,
  propertyValue: PropTypes.number.isRequired,
  initialPaymentPercentage: PropTypes.number.isRequired,
  creditPeriod: PropTypes.number.isRequired,
  isMaternityCapital: PropTypes.bool.isRequired,
});

export {
  creditGoalType,
  formDataShape,
};
