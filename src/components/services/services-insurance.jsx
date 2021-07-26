import React from 'react';
import {Link} from 'react-router-dom';

import {LocalPath} from '../../constants/local-path';
import {MediaQuery} from '../../constants/media-query';

import insurancePosterMobile from '../../images/services-insurance-poster--mobile.jpg';
import insurancePosterTablet from '../../images/services-insurance-poster--tablet.jpg';
import insurancePosterDesktop from '../../images/services-insurance-poster--desktop.jpg';

import retinaInsurancePosterMobile from '../../images/services-insurance-poster--mobile@2x.jpg';
import retinaInsurancePosterTablet from '../../images/services-insurance-poster--tablet@2x.jpg';
import retinaInsurancePosterDesktop from '../../images/services-insurance-poster--desktop@2x.jpg';

const ServicesInsurance = () => {
  return (
    <section>
      <h3 className="visually-hidden">Страхование</h3>
      <strong>Лига Страхование — застрахуем все&nbsp;что&nbsp;захотите</strong>
      <picture>
        <source
          media={MediaQuery.MOBILE}
          srcSet={`${retinaInsurancePosterMobile} 2x, ${insurancePosterMobile} 1x`}
        />
        <source
          media={MediaQuery.TABLET}
          srcSet={`${retinaInsurancePosterTablet} 2x, ${insurancePosterTablet} 1x`}
        />
        <img
          src={insurancePosterDesktop}
          srcSet={`${retinaInsurancePosterDesktop} 2x, ${insurancePosterDesktop} 1x`}
          alt="Лига Страхование."
        />
      </picture>
      <ul>
        <li>Автомобильное страхование</li>
        <li>Страхование жизни и здоровья</li>
        <li>Страхование недвижимости</li>
      </ul>
      <Link to={LocalPath.INSURANCE}>Узнать подробнее</Link>
    </section>
  );
};

export {ServicesInsurance};
