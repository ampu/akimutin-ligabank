import React, {useEffect, useState, useCallback, useRef} from 'react';
import PropTypes from 'prop-types';
import getClassName from 'classnames';
import {clamp} from 'lodash';

import {CreditGoal, CREDIT_GOALS} from '../../constants/credit-goal';
import {KeyboardKey} from '../../constants/keyboard-key';
import {MouseButton} from '../../constants/mouse-button';
import {PROPERTY_VALUE_CONSTRAINT} from '../../constants/property-value-constraint';
import {INITIAL_PAYMENT_PERCENTAGE_CONSTRAINT} from '../../constants/initial-payment-percentage-constraint';
import {CREDIT_PERIOD_CONSTRAINT} from '../../constants/credit-period-constraint';

import {
  formatInteger,
  calculateInitialPayment,
  calculateInitialPaymentPercentage,
  calculateCreditPeriod,
  isValidPropertyValue,
} from '../../helpers/credit-calculator-helpers';

import {NumberInput} from '../number-input/number-input';
import {RangeSlider} from '../range-slider/range-slider';
import {ReactComponent as PlusIcon} from '../../images/plus-icon.svg';
import {ReactComponent as MinusIcon} from '../../images/minus-icon.svg';

import {formDataShape} from '../../types/form-data-types';

const CreditParameters = ({formData, onSetFormData}) => {
  const containerRef = useRef(null);

  const [isGoalActive, setGoalActive] = useState(false);

  const onGoalMouseDown = useCallback((evt) => {
    if (evt.button === MouseButton.PRIMARY) {
      evt.preventDefault();
      setGoalActive(true);
    }
  }, []);

  const creditGoalClassName = getClassName({
    [`credit-parameters__goal`]: true,
    [`credit-parameters__step`]: true,
    [`active`]: isGoalActive,
  });

  const propertyValueClassName = getClassName({
    [`credit-parameters__property-value`]: true,
    [`error`]: !isValidPropertyValue(formData.propertyValue),
  });

  const onCreditGoalSelectChange = (evt) => {
    onSetFormData({
      ...formData,
      creditGoal: evt.currentTarget.value,
    });
  };

  const onCreditGoalItemClick = useCallback((evt) => {
    onSetFormData({
      ...formData,
      creditGoal: evt.currentTarget.dataset.value,
    });
    setGoalActive(false);
  }, [formData, onSetFormData]);

  useEffect(() => {
    if (!isGoalActive) {
      return () => {
      };
    }
    const onDocumentKeyDown = (evt) => {
      if (evt.key === KeyboardKey.ESCAPE) {
        evt.preventDefault();
        evt.stopPropagation();
        setGoalActive(false);
      }
    };
    document.addEventListener(`keydown`, onDocumentKeyDown);

    return () => {
      document.removeEventListener(`keydown`, onDocumentKeyDown);
    };
  }, [isGoalActive]);

  useEffect(() => {
    if (!isGoalActive) {
      return () => {
      };
    }
    const onDocumentMouseDown = (evt) => {
      if (evt.button === MouseButton.PRIMARY) {
        if (!containerRef.current.contains(evt.target)) {
          setGoalActive(false);
        }
      }
    };
    document.addEventListener(`mousedown`, onDocumentMouseDown);

    return () => {
      document.removeEventListener(`mousedown`, onDocumentMouseDown);
    };
  }, [isGoalActive]);

  const onPropertyValueInputValueChange = useCallback(({floatValue}) => {
    const propertyValue = floatValue || 0;

    onSetFormData((previousFormData) => ({
      ...previousFormData,
      propertyValue,
    }));
  }, [onSetFormData]);

  const onPropertyValueDecrementClick = () => {
    const propertyValue = formData.propertyValue - PROPERTY_VALUE_CONSTRAINT.step;

    onSetFormData({
      ...formData,
      propertyValue: clamp(propertyValue, PROPERTY_VALUE_CONSTRAINT.min, PROPERTY_VALUE_CONSTRAINT.max),
    });
  };

  const onPropertyValueIncrementClick = () => {
    const propertyValue = formData.propertyValue + PROPERTY_VALUE_CONSTRAINT.step;

    onSetFormData({
      ...formData,
      propertyValue: clamp(propertyValue, PROPERTY_VALUE_CONSTRAINT.min, PROPERTY_VALUE_CONSTRAINT.max),
    });
  };

  const onInitialPaymentInputValueChange = useCallback(({floatValue}) => {
    const initialPayment = floatValue || 0;

    onSetFormData((previousFormData) => ({
      ...previousFormData,
      initialPaymentPercentage: calculateInitialPaymentPercentage({...previousFormData, initialPayment}),
    }));
  }, [onSetFormData]);

  const onInitialPaymentSliderChange = useCallback((initialPaymentPercentage) => {
    onSetFormData((previousFormData) => ({
      ...previousFormData,
      initialPaymentPercentage,
    }));
  }, [onSetFormData]);

  const onCreditPeriodInputValueChange = ({floatValue}) => {
    const creditPeriod = calculateCreditPeriod(floatValue);

    onSetFormData((previousFormData) => ({
      ...previousFormData,
      creditPeriod,
    }));
  };

  const onCreditPeriodSliderChange = useCallback((creditPeriod) => {
    onSetFormData((previousFormData) => ({
      ...previousFormData,
      creditPeriod,
    }));
  }, [onSetFormData]);

  const onMaternityCapitalInputChange = useCallback((evt) => {
    onSetFormData((previousFormData) => ({
      ...previousFormData,
      isMaternityCapital: evt.target.checked,
    }));
  }, [onSetFormData]);

  const initialPayment = calculateInitialPayment(formData);

  const {log} = console;
  log(formData);

  return (
    <form ref={containerRef} className="credit-parameters">
      <div className={creditGoalClassName}>
        <h3>Шаг 1. Цель кредита</h3>
        <div>
          <select
            name="creditGoal"
            value={formData.creditGoal}
            onChange={onCreditGoalSelectChange}
            onMouseDown={onGoalMouseDown}
          >
            {CREDIT_GOALS.map((creditGoal) => (
              <option
                key={creditGoal.value}
                value={creditGoal.value}
              >
                {creditGoal.title}
              </option>
            ))}
          </select>
          <ul>
            {Object.values(CreditGoal).map((creditGoal) => (
              <li
                key={creditGoal.value}
                className={getClassName(formData.creditGoal === creditGoal.value && `active`)}
                defaultValue={creditGoal.value}
                data-value={creditGoal.value}
                onClick={onCreditGoalItemClick}
              >
                {creditGoal.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="credit-parameters__step">
        <h3>Шаг 2. Введите параметры кредита</h3>

        <fieldset className={propertyValueClassName}>
          <label htmlFor="credit-parameters-property-value">Стоимость недвижимости</label>
          <div>
            <button
              type="button"
              className="credit-parameters__property-value-decrement"
              onClick={onPropertyValueDecrementClick}
            >
              <MinusIcon/>
              <span className="visually-hidden">Уменьшить</span>
            </button>
            <NumberInput
              id="credit-parameters-property-value"
              name="property-value"
              suffix=" рублей"
              value={formData.propertyValue}
              max={PROPERTY_VALUE_CONSTRAINT.max}
              onValueChange={onPropertyValueInputValueChange}
            />
            <button
              type="button"
              className="credit-parameters__property-value-increment"
              onClick={onPropertyValueIncrementClick}
            >
              <PlusIcon/>
              <span className="visually-hidden">Увеличить</span>
            </button>
          </div>
          <span className="credit-parameters__legend">
            От {formatInteger(PROPERTY_VALUE_CONSTRAINT.min)}&nbsp;&nbsp;до {formatInteger(PROPERTY_VALUE_CONSTRAINT.max)} рублей
          </span>
        </fieldset>

        <fieldset className="credit-parameters__initial-payment">
          <label htmlFor="credit-parameters-initial-payment">Первоначальный взнос</label>
          <NumberInput
            id="credit-parameters-initial-payment"
            name="initial-payment"
            suffix=" рублей"
            value={initialPayment}
            max={PROPERTY_VALUE_CONSTRAINT.max * initialPayment}
            onValueChange={onInitialPaymentInputValueChange}
          />
          <RangeSlider
            min={INITIAL_PAYMENT_PERCENTAGE_CONSTRAINT.min}
            max={INITIAL_PAYMENT_PERCENTAGE_CONSTRAINT.max}
            step={INITIAL_PAYMENT_PERCENTAGE_CONSTRAINT.step}
            value={formData.initialPaymentPercentage}
            onChange={onInitialPaymentSliderChange}
          />
          <span className="credit-parameters__legend">{formatInteger(INITIAL_PAYMENT_PERCENTAGE_CONSTRAINT.min)}%</span>
        </fieldset>

        <fieldset className="credit-parameters__credit-period">
          <label htmlFor="credit-parameters-credit-period">Срок кредитования</label>
          <NumberInput
            id="credit-parameters-credit-period"
            name="credit-period"
            suffix=" лет"
            value={formData.creditPeriod}
            max={CREDIT_PERIOD_CONSTRAINT.max}
            onValueChange={onCreditPeriodInputValueChange}
          />
          <RangeSlider
            min={CREDIT_PERIOD_CONSTRAINT.min}
            max={CREDIT_PERIOD_CONSTRAINT.max}
            step={CREDIT_PERIOD_CONSTRAINT.step}
            value={formData.creditPeriod}
            onChange={onCreditPeriodSliderChange}
          />
          <span className="credit-parameters__legend">
            <span>{formatInteger(CREDIT_PERIOD_CONSTRAINT.min)} лет</span>
            <span>{formatInteger(CREDIT_PERIOD_CONSTRAINT.max)} лет</span>
          </span>
        </fieldset>

        <label className="credit-parameters__maternity-capital">
          <input type="checkbox" checked={formData.isMaternityCapital} onChange={onMaternityCapitalInputChange}/>
          <span>Использовать материнский капитал</span>
        </label>
      </div>
    </form>
  );
};

CreditParameters.propTypes = {
  formData: formDataShape.isRequired,
  onSetFormData: PropTypes.func.isRequired,
};

export {CreditParameters};
