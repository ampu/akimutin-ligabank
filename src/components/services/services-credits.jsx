import React from 'react';
import {Link} from 'react-router-dom';

import {LocalPath} from '../../constants/local-path';
import {MediaQuery} from '../../constants/media-query';

import creditsPosterMobile from '../../images/services-credits-poster--mobile.jpg';
import creditsPosterTablet from '../../images/services-credits-poster--tablet.jpg';
import creditsPosterDesktop from '../../images/services-credits-poster--desktop.jpg';

import retinaCreditsPosterTablet from "../../images/services-credits-poster--tablet@2x.jpg";
import retinaCreditsPosterDesktop from "../../images/services-credits-poster--desktop@2x.jpg";

const ServicesCredits = () => {
  return (
    <section>
      <h3 className="visually-hidden">Кредиты</h3>
      <strong>Лига Банк выдает кредиты под&nbsp;любые&nbsp;цели</strong>
      <picture>
        <source
          media={MediaQuery.MOBILE}
          srcSet={creditsPosterMobile}
        />
        <source
          media={MediaQuery.TABLET}
          srcSet={`${retinaCreditsPosterTablet} 2x, ${creditsPosterTablet} 1x`}
        />
        <img
          src={creditsPosterDesktop}
          srcSet={`${retinaCreditsPosterDesktop} 2x, ${creditsPosterDesktop} 1x`}
          alt="Кредиты Лига Банка."
        />
      </picture>
      <ul>
        <li>Ипотечный кредит</li>
        <li>Автокредит</li>
        <li>Потребительский кредит</li>
      </ul>
      <p>
        Рассчитайте ежемесячный платеж
        и&nbsp;ставку по кредиту воспользовавшись
        нашим <Link to={LocalPath.CREDIT_CALCULATOR}>кредитным калькулятором</Link>
      </p>
    </section>
  );
};

export {ServicesCredits};
