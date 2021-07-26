import PropTypes from 'prop-types';

import {CREDIT_GOAL_VALUES} from '../constants/credit-goal-value';

export const creditGoalValueType = PropTypes.oneOf(CREDIT_GOAL_VALUES);
