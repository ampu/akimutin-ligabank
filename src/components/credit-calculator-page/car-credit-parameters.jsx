import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

import {calculateInitialPayment, calculateInitialPaymentPercentage} from '../../helpers/credit-calculator-helpers';
import {formatYearsSuffix} from '../../helpers/number-helpers';

import {IncrementalNumberInput} from '../number-input/incremental-number-input';
import {NumberInputWithSlider} from '../number-input/number-input-with-slider';
import {Checkbox} from '../checkbox/checkbox';

import {formDataShape} from '../../types/form-data-types';
import {creditGoalShape} from '../../types/credit-goal-types';

const CarCreditParameters = ({creditGoal, formData, onSetFormData}) => {
  const onPropertyAmountInputValueChange = useCallback((propertyAmount) => {
    onSetFormData((previousFormData) => ({
      ...previousFormData,
      propertyAmount,
    }));
  }, [onSetFormData]);

  const onInitialPaymentInputValueChange = useCallback((initialPaymentPercentage) => {
    onSetFormData((previousFormData) => ({
      ...previousFormData,
      initialPaymentPercentage,
    }));
  }, [onSetFormData]);

  const onCreditPeriodInputValueChange = useCallback((creditPeriod) => {
    onSetFormData((previousFormData) => ({
      ...previousFormData,
      creditPeriod,
    }));
  }, [onSetFormData]);

  const onCascoCheckboxChange = useCallback((isCasco) => {
    onSetFormData((previousFormData) => ({
      ...previousFormData,
      isCasco,
    }));
  }, [onSetFormData]);

  const onLifeInsuranceCheckboxChange = useCallback((isLifeInsurance) => {
    onSetFormData((previousFormData) => ({
      ...previousFormData,
      isLifeInsurance,
    }));
  }, [onSetFormData]);

  return (
    <section className="car-credit-parameters">
      <h3>Шаг 2. Введите параметры кредита</h3>

      <IncrementalNumberInput
        autoFocus
        inputId="car-credit-parameters-property-amount"
        inputName="property-amount"
        labelText={creditGoal.propertyAmountTitle}
        suffix=" рублей"
        value={formData.propertyAmount}
        valueConstraint={creditGoal.constraints.propertyAmount}
        onValueChange={onPropertyAmountInputValueChange}
      />

      <NumberInputWithSlider
        className="car-credit-parameters__initial-payment"
        inputId="car-credit-parameters-initial-payment"
        inputName="initial-payment"
        labelText="Первоначальный взнос"
        valueSuffix=" рублей"
        legendSuffix="%"
        skipMaxLegend
        value={formData.initialPaymentPercentage}
        valueConstraint={creditGoal.constraints.initialPaymentPercentage}
        onValueFormat={(initialPaymentPercentage) => calculateInitialPayment({...formData, initialPaymentPercentage})}
        onValueParse={(initialPayment) => calculateInitialPaymentPercentage(creditGoal.constraints.initialPaymentPercentage, {
          ...formData,
          initialPayment
        })}
        onValueChange={onInitialPaymentInputValueChange}
      />

      <NumberInputWithSlider
        className="car-credit-parameters__credit-period"
        inputId="car-credit-parameters-credit-period"
        inputName="credit-period"
        labelText="Срок кредитования"
        onGetValueSuffix={formatYearsSuffix}
        onGetLegendSuffix={formatYearsSuffix}
        value={formData.creditPeriod}
        valueConstraint={creditGoal.constraints.creditPeriod}
        onValueChange={onCreditPeriodInputValueChange}
      />

      <Checkbox
        inputName="is-casco"
        labelText="Оформить КАСКО в нашем банке"
        isChecked={formData.isCasco}
        onCheckedChange={onCascoCheckboxChange}
      />

      <Checkbox
        inputName="is-life-insurance"
        labelText="Оформить Страхование жизни в нашем банке"
        isChecked={formData.isLifeInsurance}
        onCheckedChange={onLifeInsuranceCheckboxChange}
      />
    </section>
  );
};

CarCreditParameters.propTypes = {
  creditGoal: creditGoalShape.isRequired,
  formData: formDataShape.isRequired,
  onSetFormData: PropTypes.func.isRequired,
};

export {CarCreditParameters};
