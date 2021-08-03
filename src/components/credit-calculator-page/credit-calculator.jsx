import React from 'react';
import PropTypes from 'prop-types';

import {LocalPath} from '../../constants/local-path';
import {isValidFormData} from '../../helpers/credit-calculator-helpers';

import {withCreditCalculatorState} from '../../hocs/with-credit-calculator-state';
import {CreditGoalSelect} from './credit-goal-select';
import {CreditDenial} from './credit-denial';
import {CreditOffer} from './credit-offer';
import {CreditRequestWithCreditRequestState as CreditRequest} from './credit-request';
import {ThankYouWithPopup as ThankYou} from './thank-you';

import {refType} from '../../types/ref-types';
import {creditSettingType} from '../../types/credit-setting-types';
import {formDataType} from '../../types/form-data-types';

const CreditCalculator = ({
  containerRef,
  creditGoal,
  onCreditGoalSelectValueChange,

  formData,
  onSetFormData,
  onSetFormDataAndDeactivateCreditRequest,
  onFormSubmit,

  creditAmount,
  isCreditRequestActive,
  onCreditRequestClick,
  onCreditRequestSubmit,

  isThankYouActive,
  onThankYouClose,
}) => {
  return (
    <section ref={containerRef} className="credit-calculator" data-navigation-id={LocalPath.CREDIT_CALCULATOR}>
      <div className="credit-calculator__container">
        <h2>Кредитный калькулятор</h2>
        <form className="credit-calculator__parameters-form" onSubmit={onFormSubmit}>
          <CreditGoalSelect
            value={creditGoal.value}
            onValueChange={onCreditGoalSelectValueChange}
          />

          {(creditGoal.parametersComponent && formData) && (
            <creditGoal.parametersComponent
              key={creditGoal.value}
              creditGoal={creditGoal}
              formData={formData}
              onSetFormData={onSetFormDataAndDeactivateCreditRequest}
            />
          )}
        </form>

        {creditGoal.value && Number.isFinite(creditAmount) && isValidFormData(creditGoal, formData) && creditGoal.denialAmount && (
          creditAmount < creditGoal.denialAmount
            ? (
              <CreditDenial creditGoal={creditGoal}/>
            )
            : (
              <CreditOffer
                creditGoal={creditGoal}
                formData={formData}
                onCreditRequestClick={onCreditRequestClick}
              />
            )
        )}

        {creditGoal.value && isCreditRequestActive && (
          <CreditRequest
            creditGoal={creditGoal}
            formData={formData}
            onSetFormData={onSetFormData}
            onSubmit={onCreditRequestSubmit}
          />
        )}

        {(isThankYouActive && (
          <ThankYou onClose={onThankYouClose}/>
        ))}
      </div>
    </section>
  );
};

CreditCalculator.propTypes = {
  containerRef: refType.isRequired,

  creditGoal: creditSettingType.isRequired,
  onCreditGoalSelectValueChange: PropTypes.func.isRequired,

  formData: formDataType,
  onSetFormData: PropTypes.func.isRequired,
  onSetFormDataAndDeactivateCreditRequest: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,

  creditAmount: PropTypes.number,
  isCreditRequestActive: PropTypes.bool.isRequired,
  onCreditRequestClick: PropTypes.func.isRequired,
  onCreditRequestSubmit: PropTypes.func.isRequired,

  isThankYouActive: PropTypes.bool.isRequired,
  onThankYouClose: PropTypes.func.isRequired,
};

const CreditCalculatorWithCreditCalculatorState = withCreditCalculatorState(CreditCalculator);

export {CreditCalculator, CreditCalculatorWithCreditCalculatorState};
