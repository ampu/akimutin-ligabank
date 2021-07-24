import React from 'react';
import {Link} from 'react-router-dom';

import {LocalPath} from '../../constants/local-path';

import {
  formatInteger,
  formatFloat,
  calculateCreditAmount,
  calculateInterestRate
} from '../../helpers/credit-calculator-helpers';

import {formDataShape} from '../../types/form-data-types';

const CreditOffer = ({formData}) => {
  return (
    <section className="credit-offer">
      <h3>Наше предложение</h3>

      <dl>
        <div>
          <dt>Сумма ипотеки</dt>
          <dd>{formatInteger(calculateCreditAmount(formData))} рублей</dd>
        </div>

        <div>
          <dt>Процентная ставка</dt>
          <dd>{formatFloat(calculateInterestRate(formData.initialPaymentPercentage))}%</dd>
        </div>

        <div>
          <dt>Ежемесячный платеж</dt>
          <dd>27 868 рублей</dd>
        </div>

        <div>
          <dt>Необходимый доход</dt>
          <dd>61 929 рублей</dd>
        </div>
      </dl>

      <Link to={LocalPath.CREDIT_REQUEST}>Оформить заявку</Link>
    </section>
  );
};

CreditOffer.propTypes = {
  formData: formDataShape.isRequired,
};

export {CreditOffer};
