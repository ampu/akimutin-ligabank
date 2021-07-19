import React from 'react';
import {Link} from 'react-router-dom';

import {LocalPath} from '../../constants/local-path';
import {MediaQuery} from "../../constants/media-query";

import ensurancePosterMobile from "../../images/services-ensurance-poster--mobile.jpg";
import ensurancePosterTablet from "../../images/services-ensurance-poster--tablet.jpg";
import ensurancePosterDesktop from "../../images/services-ensurance-poster--desktop.jpg";

import retinaEnsurancePosterMobile from "../../images/services-ensurance-poster--mobile@2x.jpg";
import retinaEnsurancePosterTablet from "../../images/services-ensurance-poster--tablet@2x.jpg";
import retinaEnsurancePosterDesktop from "../../images/services-ensurance-poster--desktop@2x.jpg";

const ServicesEnsurance = () => {
  return (
    <section>
      <h3 className="visually-hidden">Страхование</h3>
      <strong>Лига Страхование — застрахуем все&nbsp;что&nbsp;захотите</strong>
      <picture>
        <source
          media={MediaQuery.MOBILE}
          srcSet={`${retinaEnsurancePosterMobile} 2x, ${ensurancePosterMobile} 1x`}
        />
        <source
          media={MediaQuery.TABLET}
          srcSet={`${retinaEnsurancePosterTablet} 2x, ${ensurancePosterTablet} 1x`}
        />
        <img
          src={ensurancePosterDesktop}
          srcSet={`${retinaEnsurancePosterDesktop} 2x, ${ensurancePosterDesktop} 1x`}
          alt="Лига Страхование."
        />
      </picture>
      <ul>
        <li>Автомобильное страхование</li>
        <li>Страхование жизни и здоровья</li>
        <li>Страхование недвижимости</li>
      </ul>
      <Link to={LocalPath.ENSURANCE}>Узнать подробнее</Link>
    </section>
  );
};

export {ServicesEnsurance};
