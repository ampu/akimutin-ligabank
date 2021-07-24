import React from 'react';

import {CreditParameters} from './credit-parameters';
import {CreditOffer} from './credit-offer';
import {CreditRequest} from './credit-request';

const CreditCalculator = () => {
  return (
    <section className="credit-calculator" id="credit-calculator">
      <div className="credit-calculator__container">
        <h2>Кредитный калькулятор</h2>
        <CreditParameters/>
        <CreditOffer/>
        <CreditRequest/>
      </div>
    </section>
  );
};

export {CreditCalculator};
