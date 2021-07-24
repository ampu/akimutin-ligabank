import React from 'react';
import {Link} from 'react-router-dom';

import {LocalPath} from '../../constants/local-path';

const CreditOffer = () => {
  return (
    <section className="credit-offer">
      <h3>Наше предложение</h3>

      <dl>
        <div>
          <dt>Сумма ипотеки</dt>
          <dd>1 330 000 рублей</dd>
        </div>

        <div>
          <dt>Процентная ставка</dt>
          <dd>9,40%</dd>
        </div>

        <div>
          <dt>Ежемесячный платеж</dt>
          <dd>27 868 рублей</dd>
        </div>

        <div>
          <dt>Необходимый доход</dt>
          <dd>61 929 рублей</dd>
        </div>
      </dl>

      <Link to={LocalPath.CREDIT_REQUEST}>Оформить заявку</Link>
    </section>
  );
};

export {CreditOffer};
