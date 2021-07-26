import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {LocalPath} from '../../constants/local-path';
import {formatInteger, formatFloat} from '../../helpers/number-helpers';

import {
  calculateCreditAmount,
  calculateInterestRate,
  calculateMonthlyPayment,
  calculateMonthlyIncome
} from '../../helpers/credit-calculator-helpers';

import {creditGoalShape} from '../../types/credit-goal-types';
import {formDataShape} from '../../types/form-data-types';

const CreditOffer = ({creditGoal, formData, onCreditRequestClick}) => {
  return (
    <section className="credit-offer">
      <h3>Наше предложение</h3>

      <dl>
        <div>
          <dt>{creditGoal.creditAmountTitle}</dt>
          <dd>{formatInteger(calculateCreditAmount(formData))} рублей</dd>
        </div>

        <div>
          <dt>Процентная ставка</dt>
          <dd>{formatFloat(calculateInterestRate(formData))}%</dd>
        </div>

        <div>
          <dt>Ежемесячный платеж</dt>
          <dd>{formatInteger(calculateMonthlyPayment(formData))} рублей</dd>
        </div>

        <div>
          <dt>Необходимый доход</dt>
          <dd>{formatInteger(calculateMonthlyIncome(formData))} рублей</dd>
        </div>
      </dl>

      <Link to={LocalPath.CREDIT_REQUEST} onClick={onCreditRequestClick}>Оформить заявку</Link>
    </section>
  );
};

CreditOffer.propTypes = {
  creditGoal: creditGoalShape.isRequired,
  formData: formDataShape.isRequired,
  onCreditRequestClick: PropTypes.func.isRequired,
};

export {CreditOffer};
