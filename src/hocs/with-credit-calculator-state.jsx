import React, {useState, useEffect, useCallback, useRef} from 'react';

import {CreditGoal} from '../constants/credit-goal';
import {calculateCreditAmount, findCreditGoalByValue} from '../helpers/credit-calculator-helpers';
import {creditRequestStore} from '../helpers/credit-request-store';

export const withCreditCalculatorState = (Component) => {
  const WithCreditCalculatorState = (props) => {
    const containerRef = useRef(null);
    const newCreditRequestDataRef = useRef();

    const [creditGoal, setCreditGoal] = useState(CreditGoal.DEFAULT);
    const [creditRequestData, setCreditRequestData] = useState({});
    const [formData, setFormData] = useState();
    const [isCreditRequestActive, setCreditRequestActive] = useState(false);
    const [isThankYouActive, setThankYouActive] = useState(false);

    const onSetFormDataAndDeactivateCreditRequest = useCallback((newFormData) => {
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
      newCreditRequestDataRef.current = {
        ...creditRequestData,
        id: formData.id + 1,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      };
      creditRequestStore.patchMap(newCreditRequestDataRef.current);

      setThankYouActive(true);
    }, [formData, creditRequestData]);

    const onThankYouClose = useCallback(() => {
      setCreditRequestData(newCreditRequestDataRef.current);

      setThankYouActive(false);
      setCreditRequestActive(false);
      setCreditGoal(CreditGoal.DEFAULT);

      containerRef.current.scrollIntoView();
    }, []);

    const onFormSubmit = useCallback((evt) => {
      evt.preventDefault();
    }, []);

    useEffect(() => {
      setCreditRequestData(creditRequestStore.getMap());
    }, []);

    useEffect(() => {
      onSetFormDataAndDeactivateCreditRequest(creditGoal.defaultFormData
        ? {...creditGoal.defaultFormData, ...creditRequestData}
        : undefined);
    }, [creditGoal, creditRequestData, onSetFormDataAndDeactivateCreditRequest]);

    const creditAmount = formData && calculateCreditAmount(formData);

    return (
      <Component
        containerRef={containerRef}

        creditGoal={creditGoal}
        onCreditGoalSelectValueChange={onCreditGoalSelectValueChange}

        formData={formData}
        onSetFormData={setFormData}
        onSetFormDataAndDeactivateCreditRequest={onSetFormDataAndDeactivateCreditRequest}
        onFormSubmit={onFormSubmit}

        creditAmount={creditAmount}
        isCreditRequestActive={isCreditRequestActive}
        onCreditRequestClick={onCreditRequestClick}
        onCreditRequestSubmit={onCreditRequestSubmit}

        isThankYouActive={isThankYouActive}
        onThankYouClose={onThankYouClose}
        {...props}
      />
    );
  };

  WithCreditCalculatorState.displayName = `${Component.name}${WithCreditCalculatorState.name}`;

  return WithCreditCalculatorState;
};
