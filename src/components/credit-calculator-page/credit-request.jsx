import React, {useCallback, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import getClassName from 'classnames';

import {formatInteger} from '../../helpers/number-helpers';
import {formatRequestId, calculateInitialPayment} from '../../helpers/credit-calculator-helpers';

import {useMountedRef} from '../../hooks/use-mounted-ref';

import {creditGoalShape} from '../../types/credit-goal-types';
import {formDataShape} from '../../types/form-data-types';

const CreditRequest = ({
  creditGoal,
  formData,
  onSetFormData,
  onSubmit,
}) => {
  const isMountedRef = useMountedRef();

  const formRef = useRef(null);

  const [isError, setError] = useState(false);

  const onNameInputChange = useCallback((evt) => {
    onSetFormData({
      ...formData,
      name: evt.currentTarget.value
    });
  }, [formData, onSetFormData]);

  const onPhoneInputChange = useCallback((evt) => {
    onSetFormData({
      ...formData,
      phone: evt.currentTarget.value
    });
  }, [formData, onSetFormData]);

  const onEmailInputChange = useCallback((evt) => {
    onSetFormData({
      ...formData,
      email: evt.currentTarget.value
    });
  }, [formData, onSetFormData]);

  const onSubmitButtonClick = useCallback((evt) => {
    evt.preventDefault();

    setError(false);

    setTimeout(() => {
      if (isMountedRef.current) {
        if (!formRef.current.reportValidity()) {
          setError(true);
          return;
        }
        onSubmit();
      }
    });
  }, [isMountedRef, onSubmit]);

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

      <form ref={formRef} onSubmit={onSubmit}>
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
          <input
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
  onSetFormData: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export {CreditRequest};
