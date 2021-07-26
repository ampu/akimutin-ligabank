import PropTypes from 'prop-types';

import {creditGoalValueType} from './credit-goal-value-types';
import {constraintShape} from './constraint-types';
import {formDataShape} from './form-data-types';

export const creditGoalShape = PropTypes.shape({
  value: creditGoalValueType,
  title: PropTypes.string.isRequired,
  denialTitle: PropTypes.string.isRequired,
  denialAmount: PropTypes.number.isRequired,
  defaultFormData: formDataShape.isRequired,
  constraints: PropTypes.objectOf(constraintShape.isRequired).isRequired,
  parametersComponent: PropTypes.func.isRequired,
});
