import React from 'react';

const CreditRequest = () => {
  return (
    <section className="credit-request">
      <h3>Шаг 3. Оформление заявки</h3>

      <dl>
        <div>
          <dt>Номер заявки</dt>
          <dd>№ 0010</dd>
        </div>

        <div>
          <dt>Цель кредита</dt>
          <dd>Ипотека</dd>
        </div>

        <div>
          <dt>Стоимость недвижимости</dt>
          <dd>2 000 000 рублей</dd>
        </div>

        <div>
          <dt>Первоначальный взнос</dt>
          <dd>200 000 рублей</dd>
        </div>

        <div>
          <dt>Срок кредитования</dt>
          <dd>5 лет</dd>
        </div>
      </dl>

      <form>
        <input type="hidden" name="id" value="0010"/>

        <label className="credit-request__name">
          <input type="text" name="name" placeholder="ФИО" autoComplete="username"/>
        </label>

        <label className="credit-request__phone">
          <input type="text" name="phone" placeholder="Телефон" autoComplete="tel"/>
        </label>

        <label className="credit-request__email">
          <input type="text" name="email" placeholder="E-mail" autoComplete="email"/>
        </label>

        <button type="submit">Отправить</button>
      </form>
    </section>
  );
};

export {CreditRequest};
