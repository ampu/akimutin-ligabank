import React from 'react';
import PropTypes from 'prop-types';
import getClassName from 'classnames';
import InputMask from 'react-input-mask';

import {formatInteger} from '../../helpers/number-helpers';
import {formatRequestId, calculateInitialPayment} from '../../helpers/credit-calculator-helpers';

import {withCreditRequestState} from '../../hocs/with-credit-request-state';

import {refShape} from '../../types/ref-types';
import {creditGoalShape} from '../../types/credit-goal-types';
import {formDataShape} from '../../types/form-data-types';

const CreditRequest = ({
  creditGoal,
  formData,
  onSubmitButtonClick,
  isError,
  formRef,
  onNameInputChange,
  onPhoneInputChange,
  onEmailInputChange,
}) => {
  return (
    <section className={getClassName(`credit-request`, isError && `shake`)}>
      <h3>Шаг 3. Оформление заявки</h3>

      <dl>
        <div>
          <dt>Номер заявки</dt>
          <dd>№ {formatRequestId(formData.id)}</dd>
        </div>

        <div>
          <dt>Цель кредита</dt>
          <dd>{creditGoal.requestTitle}</dd>
        </div>

        <div>
          <dt>{creditGoal.propertyAmountTitle}</dt>
          <dd>{formatInteger(formData.propertyAmount)} рублей</dd>
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

      <form ref={formRef}>
        <input type="hidden" name="id" value={formData.id}/>

        <label className="credit-request__name">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onNameInputChange}
            placeholder="ФИО"
            autoComplete="username"
            required
            autoFocus
          />
        </label>

        <label className="credit-request__phone">
          <InputMask
            mask="+7 (999) 999-99-99"
            pattern="[+]7 [(]\d{3}[)] \d{3}-\d{2}-\d{2}"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onPhoneInputChange}
            placeholder="Телефон"
            autoComplete="tel"
            required
          />
        </label>

        <label className="credit-request__email">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onEmailInputChange}
            placeholder="E-mail"
            autoComplete="email"
            required
          />
        </label>

        <button type="submit" onClick={onSubmitButtonClick}>Отправить</button>
      </form>
    </section>
  );
};

CreditRequest.propTypes = {
  creditGoal: creditGoalShape.isRequired,
  formData: formDataShape.isRequired,
  onSubmitButtonClick: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  formRef: refShape.isRequired,
  onNameInputChange: PropTypes.func.isRequired,
  onPhoneInputChange: PropTypes.func.isRequired,
  onEmailInputChange: PropTypes.func.isRequired,
};

const CreditRequestWithCreditRequestState = withCreditRequestState(CreditRequest);

export {CreditRequest, CreditRequestWithCreditRequestState};
