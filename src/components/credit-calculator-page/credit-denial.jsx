import React from 'react';

import {withPopup} from '../../hocs/with-popup';

const CreditDenial = () => {
  return (
    <div className="credit-denial">
      <div className="credit-denial__popup">
        <strong>Наш банк не выдаёт ипотечные кредиты меньше 500 000 рублей.</strong>
        <p>Попробуйте использовать другие параметры&nbsp;для&nbsp;расчёта.</p>
      </div>
    </div>
  );
};

const CreditDenialWithPopup = withPopup(CreditDenial);

export {CreditDenial, CreditDenialWithPopup};
