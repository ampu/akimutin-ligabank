import React, {useState, useEffect, useCallback} from 'react';

import {CreditGoal} from '../../constants/credit-goal';
import {calculateCreditAmount, findCreditGoalByValue, isValidFormData} from '../../helpers/credit-calculator-helpers';
import {creditRequestStore} from '../../helpers/credit-request-store';

import {CreditGoalSelect} from './credit-goal-select';
import {CreditDenial} from './credit-denial';
import {CreditOffer} from './credit-offer';
import {CreditRequest} from './credit-request';
import {ThankYouWithPopup as ThankYou} from './thank-you';

const CreditCalculator = () => {
  const [creditGoal, setCreditGoal] = useState(CreditGoal.DEFAULT);
  const [creditRequestData, setCreditRequestData] = useState({});
  const [formData, setFormData] = useState();
  const [isCreditRequestActive, setCreditRequestActive] = useState(false);
  const [isThankYouActive, setThankYouActive] = useState(false);

  const onSetFormData = useCallback((newFormData) => {
    setCreditRequestActive(false);
    setFormData(newFormData);
  }, []);

  const onCreditGoalSelectValueChange = useCallback((creditGoalValue) => {
    setCreditGoal(findCreditGoalByValue(creditGoalValue));
  }, []);

  const onCreditRequestClick = useCallback((evt) => {
    evt.preventDefault();
    setCreditRequestActive(true);
  }, []);

  const onCreditRequestSubmit = useCallback(() => {
    setThankYouActive(true);

    const newCreditRequestData = {
      ...creditRequestData,
      id: formData.id + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    };

    setCreditRequestData(newCreditRequestData);
    creditRequestStore.patchMap(newCreditRequestData);
  }, [formData, creditRequestData]);

  const onThankYouClose = useCallback(() => {
    setThankYouActive(false);
    setCreditRequestActive(false);
    setCreditGoal(CreditGoal.DEFAULT);
  }, []);

  useEffect(() => {
    setCreditRequestData(creditRequestStore.getMap());
  }, []);

  useEffect(() => {
    onSetFormData(creditGoal.defaultFormData
      ? {...creditGoal.defaultFormData, ...creditRequestData}
      : undefined);
  }, [creditGoal, creditRequestData, onSetFormData]);

  const creditAmount = formData && calculateCreditAmount(formData);

  return (
    <section className="credit-calculator" id="credit-calculator">
      <div className="credit-calculator__container">
        <h2>Кредитный калькулятор</h2>
        <form className="credit-calculator__parameters-form">
          <CreditGoalSelect
            value={creditGoal.value}
            onValueChange={onCreditGoalSelectValueChange}
          />

          {(creditGoal.parametersComponent && formData) && (
            <creditGoal.parametersComponent
              key={creditGoal.value}
              creditGoal={creditGoal}
              formData={formData}
              onSetFormData={onSetFormData}
            />
          )}
        </form>

        {creditGoal.value && creditAmount >= 0 && isValidFormData(creditGoal, formData) && creditGoal.denialAmount && (
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
            onSetFormData={setFormData}
            onSubmit={onCreditRequestSubmit}
          />
        )}
      </div>

      {(isThankYouActive && (
        <ThankYou onClose={onThankYouClose}/>
      ))}
    </section>
  );
};

export {CreditCalculator};
