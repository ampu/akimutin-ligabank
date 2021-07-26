import React from 'react';
import PropTypes from 'prop-types';

import {CREDIT_GOALS} from '../../constants/credit-goal';

import {Select} from '../select/select';

import {creditGoalValueType} from '../../types/credit-goal-value-types';

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
  value: creditGoalValueType.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export {CreditGoalSelect};
