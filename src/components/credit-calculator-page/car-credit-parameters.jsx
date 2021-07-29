import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

import {calculateInitialPayment, calculateInitialPaymentPercentage} from '../../helpers/credit-calculator-helpers';
import {formatRublesSuffix, formatYearsSuffix} from '../../helpers/number-helpers';

import {IncrementalNumberInput} from '../number-input/incremental-number-input';
import {NumberInputWithSlider} from '../number-input/number-input-with-slider';
import {Checkbox} from '../checkbox/checkbox';

import {formDataType} from '../../types/form-data-types';
import {creditSettingType} from '../../types/credit-setting-types';

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

  const onInitialPaymentFormat = useCallback((initialPaymentPercentage) => {
    return calculateInitialPayment({
      ...formData,
      initialPaymentPercentage
    });
  }, [formData]);

  const onInitialPaymentParse = useCallback((initialPayment) => {
    return calculateInitialPaymentPercentage(creditGoal.FieldConstraint.INITIAL_PAYMENT_PERCENTAGE, {
      ...formData,
      initialPayment
    });
  }, [creditGoal, formData]);

  return (
    <section className="car-credit-parameters">
      <h3>Шаг 2. Введите параметры кредита</h3>

      <IncrementalNumberInput
        autoFocus
        inputId="car-credit-parameters-property-amount"
        inputName="property-amount"
        labelText={creditGoal.propertyAmountTitle}
        onGetSuffix={formatRublesSuffix}
        value={formData.propertyAmount}
        valueConstraint={creditGoal.FieldConstraint.PROPERTY_AMOUNT}
        onValueChange={onPropertyAmountInputValueChange}
      />

      <NumberInputWithSlider
        className="car-credit-parameters__initial-payment"
        inputId="car-credit-parameters-initial-payment"
        inputName="initial-payment"
        labelText="Первоначальный взнос"
        onGetValueSuffix={formatRublesSuffix}
        legendSuffix="%"
        skipMaxLegend
        value={formData.initialPaymentPercentage}
        valueConstraint={creditGoal.FieldConstraint.INITIAL_PAYMENT_PERCENTAGE}
        onValueFormat={onInitialPaymentFormat}
        onValueParse={onInitialPaymentParse}
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
        valueConstraint={creditGoal.FieldConstraint.CREDIT_PERIOD}
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
  creditGoal: creditSettingType.isRequired,
  formData: formDataType.isRequired,
  onSetFormData: PropTypes.func.isRequired,
};

export {CarCreditParameters};
