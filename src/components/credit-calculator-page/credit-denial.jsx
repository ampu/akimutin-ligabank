import React from 'react';

import {formatInteger} from '../../helpers/number-helpers';
import {creditGoalValueType} from '../../types/credit-goal-value-types';

const CreditDenial = ({creditGoal}) => {
  return (
    <div className="credit-denial">
      <strong>
        Наш банк не выдаёт {creditGoal.denialTitle} меньше {formatInteger(creditGoal.denialAmount)} рублей.
      </strong>
      <p>Попробуйте использовать другие параметры&nbsp;для&nbsp;расчёта.</p>
    </div>
  );
};

CreditDenial.propTypes = {
  creditGoal: creditGoalValueType.isRequired,
};

export {CreditDenial};
