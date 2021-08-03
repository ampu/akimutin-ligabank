import React from 'react';
import {Link} from 'react-router-dom';

import {LocalPath} from '../../constants/local-path';
import {MediaQuery} from '../../constants/media-query';

import {Picture} from '../picture/picture';
import creditsPosterMobile from '../../images/services-credits-poster--mobile.jpg';
import creditsPosterTablet from '../../images/services-credits-poster--tablet.jpg';
import creditsPosterDesktop from '../../images/services-credits-poster--desktop.jpg';
import retinaCreditsPosterMobile from '../../images/services-credits-poster--mobile@2x.jpg';
import retinaCreditsPosterTablet from '../../images/services-credits-poster--tablet@2x.jpg';
import retinaCreditsPosterDesktop from '../../images/services-credits-poster--desktop@2x.jpg';

const ServicesCredits = () => {
  return (
    <section>
      <div className="services__image-container">
        <Picture src={creditsPosterDesktop} alt="Кредиты Лига Банка.">
          <source
            media={MediaQuery.MOBILE}
            srcSet={`${retinaCreditsPosterMobile} 2x, ${creditsPosterMobile} 1x`}
          />
          <source
            media={MediaQuery.TABLET}
            srcSet={`${retinaCreditsPosterTablet} 2x, ${creditsPosterTablet} 1x`}
          />
          <source
            srcSet={`${retinaCreditsPosterDesktop} 2x, ${creditsPosterDesktop} 1x`}
          />
        </Picture>
      </div>

      <div className="services__content-container">
        <h3 className="visually-hidden">Кредиты</h3>
        <strong>Лига Банк выдает кредиты под&nbsp;любые&nbsp;цели</strong>
        <ul>
          <li>Ипотечный кредит</li>
          <li>Автокредит</li>
          <li>Потребительский кредит</li>
        </ul>
        <p>
          Рассчитайте ежемесячный платеж
          и&nbsp;ставку по кредиту воспользовавшись
          нашим&nbsp;<Link to={LocalPath.CREDIT_CALCULATOR}>кредитным&nbsp;калькулятором</Link>
        </p>
      </div>
    </section>
  );
};

export {ServicesCredits};
