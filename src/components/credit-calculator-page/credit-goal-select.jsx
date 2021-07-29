import React from 'react';
import PropTypes from 'prop-types';

import {CREDIT_GOALS} from '../../constants/credit-setting';

import {SelectWithSelectState as Select} from '../select/select';

import {creditGoalType} from '../../types/credit-goal-types';

const CreditGoalSelect = ({value, onValueChange}) => {
  return (
    <section className="credit-goal-select">
      <h3>Шаг 1. Цель кредита</h3>
      <Select
        name="credit-goal"
        options={CREDIT_GOALS}
        value={value}
        onValueChange={onValueChange}
      />
    </section>
  );
};

CreditGoalSelect.propTypes = {
  value: creditGoalType.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export {CreditGoalSelect};
