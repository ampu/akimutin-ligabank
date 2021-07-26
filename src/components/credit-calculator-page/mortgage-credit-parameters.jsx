import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

import {calculateInitialPayment, calculateInitialPaymentPercentage} from '../../helpers/credit-calculator-helpers';
import {formatYearsSuffix} from '../../helpers/number-helpers';

import {IncrementalNumberInput} from '../number-input/incremental-number-input';
import {NumberInputWithSlider} from '../number-input/number-input-with-slider';
import {Checkbox} from '../checkbox/checkbox';

import {creditGoalShape} from '../../types/credit-goal-types';
import {formDataShape} from '../../types/form-data-types';

const MortgageCreditParameters = ({creditGoal, formData, onSetFormData}) => {
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

  const onMaternityCapitalCheckboxChange = useCallback((isMaternityCapital) => {
    onSetFormData((previousFormData) => ({
      ...previousFormData,
      isMaternityCapital,
    }));
  }, [onSetFormData]);

  return (
    <section className="mortgage-credit-parameters">
      <h3>Шаг 2. Введите параметры кредита</h3>

      <IncrementalNumberInput
        autoFocus
        inputId="mortgage-credit-parameters-property-amount"
        inputName="property-amount"
        labelText={creditGoal.propertyAmountTitle}
        suffix=" рублей"
        value={formData.propertyAmount}
        valueConstraint={creditGoal.constraints.propertyAmount}
        onValueChange={onPropertyAmountInputValueChange}
      />

      <NumberInputWithSlider
        className="mortgage-credit-parameters__initial-payment"
        inputId="mortgage-credit-parameters-initial-payment"
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
        className="mortgage-credit-parameters__credit-period"
        inputId="mortgage-credit-parameters-credit-period"
        inputName="credit-period"
        labelText="Срок кредитования"
        onGetValueSuffix={formatYearsSuffix}
        onGetLegendSuffix={formatYearsSuffix}
        value={formData.creditPeriod}
        valueConstraint={creditGoal.constraints.creditPeriod}
        onValueChange={onCreditPeriodInputValueChange}
      />

      <Checkbox
        inputName="is-maternity-capital"
        labelText="Использовать материнский капитал"
        isChecked={formData.isMaternityCapital}
        onCheckedChange={onMaternityCapitalCheckboxChange}
      />
    </section>
  );
};

MortgageCreditParameters.propTypes = {
  creditGoal: creditGoalShape.isRequired,
  formData: formDataShape.isRequired,
  onSetFormData: PropTypes.func.isRequired,
};

export {MortgageCreditParameters};
