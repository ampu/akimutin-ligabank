import React from 'react';
import PropTypes from 'prop-types';

import {formDataShape} from '../../types/form-data-types';
import {findCreditGoalByValue, formatInteger, calculateInitialPayment} from "../../helpers/credit-calculator-helpers";

const CreditRequest = ({formData, onSubmit}) => {
  return (
    <section className="credit-request">
      <h3>Шаг 3. Оформление заявки</h3>

      <dl>
        <div>
          <dt>Номер заявки</dt>
          <dd>№ {formData.id}</dd>
        </div>

        <div>
          <dt>Цель кредита</dt>
          <dd>{formData.creditGoal.value
            ? findCreditGoalByValue(formData.creditGoal).title
            : `-`}</dd>
        </div>

        <div>
          <dt>Стоимость недвижимости</dt>
          <dd>{formatInteger(formData.propertyValue)} рублей</dd>
        </div>

        <div>
          <dt>Первоначальный взнос</dt>
          <dd>{formatInteger(calculateInitialPayment(formData))} рублей</dd>
        </div>

        <div>
          <dt>Срок кредитования</dt>
          <dd>{formatInteger(formData.creditPeriod)} лет</dd>
        </div>
      </dl>

      <form onSubmit={onSubmit}>
        <input type="hidden" name="id" value={formData.id}/>

        <label className="credit-request__name">
          <input type="text" name="name" placeholder="ФИО" autoComplete="username" required/>
        </label>

        <label className="credit-request__phone">
          <input type="tel" name="phone" placeholder="Телефон" autoComplete="tel" required/>
        </label>

        <label className="credit-request__email">
          <input type="email" name="email" placeholder="E-mail" autoComplete="email" required/>
        </label>

        <button type="submit">Отправить</button>
      </form>
    </section>
  );
};

CreditRequest.propTypes = {
  formData: formDataShape.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export {CreditRequest};
