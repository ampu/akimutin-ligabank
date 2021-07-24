import React, {useState, useCallback} from 'react';

import {CreditParameters} from './credit-parameters';
import {CreditOffer} from './credit-offer';
import {CreditRequest} from './credit-request';

import {FORM_DATA_MOCK} from "../../mocks/form-data-mock";

const CreditCalculator = () => {
  const [formData, setFormData] = useState(FORM_DATA_MOCK);

  const onCreditRequestSubmit = useCallback(() => {
  }, []);

  return (
    <section className="credit-calculator" id="credit-calculator">
      <div className="credit-calculator__container">
        <h2>Кредитный калькулятор</h2>
        <CreditParameters formData={formData} onSetFormData={setFormData}/>
        <CreditOffer formData={formData}/>
        <CreditRequest formData={formData} onSubmit={onCreditRequestSubmit}/>
      </div>
    </section>
  );
};

export {CreditCalculator};
