import React, {useEffect, useState, useCallback, useRef} from 'react';
import getClassName from 'classnames';
import {clamp} from 'lodash';

import {CreditGoal} from '../../constants/credit-goal';
import {KeyboardKey} from '../../constants/keyboard-key';
import {MouseButton} from '../../constants/mouse-button';

import {NumberInput} from '../number-input/number-input';
import {RangeSlider} from '../range-slider/range-slider';

import {ReactComponent as PlusIcon} from '../../images/plus-icon.svg';
import {ReactComponent as MinusIcon} from '../../images/minus-icon.svg';

const FORM_DATA_MOCK = {
  creditGoal: CreditGoal.MORTGAGE.value,
  propertyValue: 2000000,
  initialPayment: 10,
  creditPeriod: 5,
};

const CreditParameters = () => {
  const containerRef = useRef(null);

  const [formData, setFormData] = useState(FORM_DATA_MOCK);

  const [isGoalActive, setGoalActive] = useState(false);

  const onGoalMouseDown = useCallback((evt) => {
    if (evt.button === MouseButton.PRIMARY) {
      evt.preventDefault();
      setGoalActive(true);
    }
  }, []);

  const creditGoalClassName = getClassName({
    [`credit-parameters__goal credit-parameters__step`]: true,
    [`active`]: isGoalActive,
  });

  const onCreditGoalSelectChange = (evt) => {
    setFormData({
      ...formData,
      creditGoal: evt.currentTarget.value,
    });
  };

  const onCreditGoalItemClick = useCallback((evt) => {
    setFormData({
      ...formData,
      creditGoal: evt.currentTarget.dataset.value,
    });
    setGoalActive(false);
  }, [formData]);

  useEffect(() => {
    const onDocumentKeyDown = (evt) => {
      if (evt.key === KeyboardKey.ESCAPE) {
        if (isGoalActive) {
          evt.preventDefault();
          evt.stopPropagation();
          setGoalActive(false);
        }
      }
    };
    document.addEventListener(`keydown`, onDocumentKeyDown);

    return () => {
      document.removeEventListener(`keydown`, onDocumentKeyDown);
    };
  }, [isGoalActive]);

  useEffect(() => {
    const onDocumentMouseDown = (evt) => {
      if (evt.button === MouseButton.PRIMARY) {
        if (isGoalActive) {
          if (!containerRef.current.contains(evt.target)) {
            setGoalActive(false);
          }
        }
      }
    };
    document.addEventListener(`mousedown`, onDocumentMouseDown);

    return () => {
      document.removeEventListener(`mousedown`, onDocumentMouseDown);
    };
  }, [isGoalActive]);

  const onPropertyValueInputValueChange = useCallback(({floatValue}) => {
    setFormData((previousFormData) => ({
      ...previousFormData,
      propertyValue: floatValue || 0,
    }));
  }, []);

  const onPropertyValueDecrementClick = () => {
    setFormData({
      ...formData,
      propertyValue: clamp(formData.propertyValue - 200000, 1200000, 25000000),
    });
  };

  const onPropertyValueIncrementClick = () => {
    setFormData({
      ...formData,
      propertyValue: clamp(formData.propertyValue + 200000, 1200000, 25000000),
    });
  };

  const onInitialPaymentInputValueChange = useCallback(({floatValue}) => {
    setFormData((previousFormData) => ({
      ...previousFormData,
      initialPayment: (floatValue || 0) / previousFormData.propertyValue * 100,
    }));
  }, []);

  const onInitialPaymentSliderChange = useCallback((initialPayment) => {
    setFormData((previousFormData) => ({
      ...previousFormData,
      initialPayment,
    }));
  }, []);

  const onCreditPeriodInputValueChange = ({floatValue}) => {
    setFormData((previousFormData) => ({
      ...previousFormData,
      creditPeriod: floatValue || 0,
    }));
  };

  const onCreditPeriodSliderChange = useCallback((creditPeriod) => {
    setFormData((previousFormData) => ({
      ...previousFormData,
      creditPeriod,
    }));
  }, []);

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
            {Object.values(CreditGoal).map((creditGoal) => (
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
        <h3>Шаг 2. Введите параметры
          кредита</h3>

        <div className="credit-parameters__property-value">
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
              min={1200000}
              max={25000000}
              step={200000}
              value={formData.propertyValue}
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
          <span className="credit-parameters__legend">От 1 200 000  до 25 000 000 рублей</span>
        </div>

        <fieldset className="credit-parameters__initial-payment">
          <label htmlFor="credit-parameters-initial-payment">Первоначальный взнос</label>
          <NumberInput
            id="credit-parameters-initial-payment"
            name="initial-payment"
            suffix=" рублей"
            min={10}
            max={100}
            step={10}
            value={Math.round(formData.propertyValue * formData.initialPayment / 100)}
            onValueChange={onInitialPaymentInputValueChange}
          />
          <RangeSlider
            min={10}
            max={100}
            step={10}
            value={formData.initialPayment}
            onChange={onInitialPaymentSliderChange}
          />
          <span className="credit-parameters__legend">10%</span>
        </fieldset>

        <fieldset className="credit-parameters__credit-period">
          <label htmlFor="credit-parameters-credit-period">Срок кредитования</label>
          <NumberInput
            id="credit-parameters-credit-period"
            name="credit-period"
            suffix=" лет"
            min={5}
            max={30}
            step={1}
            value={formData.creditPeriod}
            onValueChange={onCreditPeriodInputValueChange}
          />
          <RangeSlider
            min={5}
            max={30}
            step={1}
            value={formData.creditPeriod}
            onChange={onCreditPeriodSliderChange}
          />
          <span className="credit-parameters__legend">
            <span>5 лет</span>
            <span>30 лет</span>
          </span>
        </fieldset>

        <label className="credit-parameters__maternity-capital">
          <input type="checkbox"/>
          <span>Использовать материнский капитал</span>
        </label>
      </div>
    </form>
  );
};

export {CreditParameters};
