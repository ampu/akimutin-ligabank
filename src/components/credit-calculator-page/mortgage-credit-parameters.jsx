import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

import {calculateInitialPayment, calculateInitialPaymentPercentage} from '../../helpers/credit-calculator-helpers';
import {formatRublesSuffix, formatYearsSuffix} from '../../helpers/number-helpers';

import {IncrementalNumberInput} from '../number-input/incremental-number-input';
import {NumberInputWithSlider} from '../number-input/number-input-with-slider';
import {Checkbox} from '../checkbox/checkbox';

import {creditSettingType} from '../../types/credit-setting-types';
import {formDataType} from '../../types/form-data-types';

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
    <section className="mortgage-credit-parameters">
      <h3>Шаг 2. Введите параметры кредита</h3>

      <IncrementalNumberInput
        autoFocus
        inputId="mortgage-credit-parameters-property-amount"
        inputName="property-amount"
        labelText={creditGoal.propertyAmountTitle}
        onGetSuffix={formatRublesSuffix}
        value={formData.propertyAmount}
        valueConstraint={creditGoal.FieldConstraint.PROPERTY_AMOUNT}
        onValueChange={onPropertyAmountInputValueChange}
      />

      <NumberInputWithSlider
        className="mortgage-credit-parameters__initial-payment"
        inputId="mortgage-credit-parameters-initial-payment"
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
        className="mortgage-credit-parameters__credit-period"
        inputId="mortgage-credit-parameters-credit-period"
        inputName="credit-period"
        labelText="Срок кредитования"
        onGetValueSuffix={formatYearsSuffix}
        onGetLegendSuffix={formatYearsSuffix}
        value={formData.creditPeriod}
        valueConstraint={creditGoal.FieldConstraint.CREDIT_PERIOD}
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
  creditGoal: creditSettingType.isRequired,
  formData: formDataType.isRequired,
  onSetFormData: PropTypes.func.isRequired,
};

export {MortgageCreditParameters};
