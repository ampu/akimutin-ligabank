import PropTypes from 'prop-types';

import {creditGoalType} from './credit-goal-types';
import {constraintType} from './constraint-types';
import {formDataType} from './form-data-types';

const defaultCreditSettingType = PropTypes.shape({
  value: creditGoalType,
  title: PropTypes.string.isRequired,
});

const selectedCreditSettingType = PropTypes.shape({
  value: creditGoalType,
  title: PropTypes.string.isRequired,
  denialTitle: PropTypes.string.isRequired,
  denialAmount: PropTypes.number.isRequired,
  defaultFormData: formDataType.isRequired,
  FieldConstraint: PropTypes.objectOf(constraintType.isRequired).isRequired,
  parametersComponent: PropTypes.func.isRequired,
});

export const creditSettingType = PropTypes.oneOfType([
  defaultCreditSettingType.isRequired,
  selectedCreditSettingType.isRequired
]);
