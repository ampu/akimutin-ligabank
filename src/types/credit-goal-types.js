import PropTypes from 'prop-types';

import {creditGoalValueType} from './credit-goal-value-types';
import {constraintShape} from './constraint-types';
import {formDataShape} from './form-data-types';

const defaultCreditGoalShape = PropTypes.shape({
  value: creditGoalValueType,
  title: PropTypes.string.isRequired,
});

const selectedCreditGoalShape = PropTypes.shape({
  value: creditGoalValueType,
  title: PropTypes.string.isRequired,
  denialTitle: PropTypes.string.isRequired,
  denialAmount: PropTypes.number.isRequired,
  defaultFormData: formDataShape.isRequired,
  constraints: PropTypes.objectOf(constraintShape.isRequired).isRequired,
  parametersComponent: PropTypes.func.isRequired,
});

export const creditGoalShape = PropTypes.oneOfType([
  defaultCreditGoalShape.isRequired,
  selectedCreditGoalShape.isRequired
]);
