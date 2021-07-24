import React from 'react';

import {formatInteger, findCreditGoalByValue} from '../../helpers/credit-calculator-helpers';
import {creditGoalType} from '../../types/form-data-types';

const CreditDenial = ({creditGoal}) => {
  const creditGoalObject = findCreditGoalByValue(creditGoal);

  return (
    <div className="credit-denial">
      <strong>
        Наш банк не выдаёт {creditGoalObject.denialTitle}
        меньше {formatInteger(creditGoalObject.denialAmount)} рублей.
      </strong>
      <p>Попробуйте использовать другие параметры&nbsp;для&nbsp;расчёта.</p>
    </div>
  );
};

CreditDenial.propTypes = {
  creditGoal: creditGoalType.isRequired,
};

export {CreditDenial};
