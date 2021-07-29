import PropTypes from 'prop-types';

import {CREDIT_GOALS} from '../constants/credit-goal';

export const creditGoalType = PropTypes.oneOf(CREDIT_GOALS);
