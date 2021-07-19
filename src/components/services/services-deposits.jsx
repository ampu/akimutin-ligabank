import React from 'react';
import {Link} from 'react-router-dom';

import {LocalPath} from '../../constants/local-path';
import {MediaQuery} from "../../constants/media-query";

import depositsPosterMobile from "../../images/services-deposits-poster--mobile.jpg";
import depositsPosterTablet from "../../images/services-deposits-poster--tablet.jpg";
import depositsPosterDesktop from "../../images/services-deposits-poster--desktop.jpg";

import retinaDepositsPosterTablet from "../../images/services-deposits-poster--tablet@2x.jpg";
import retinaDepositsPosterDesktop from "../../images/services-deposits-poster--desktop@2x.jpg";

const ServicesDeposits = () => {
  return (
    <section>
      <h3 className="visually-hidden">Вклады</h3>
      <strong>Вклады Лига Банка – это выгодная инвестиция в свое будущее</strong>
      <picture>
        <source
          media={MediaQuery.MOBILE}
          srcSet={depositsPosterMobile}
        />
        <source
          media={MediaQuery.TABLET}
          srcSet={`${retinaDepositsPosterTablet} 2x, ${depositsPosterTablet} 1x`}
        />
        <img
          src={depositsPosterDesktop}
          srcSet={`${retinaDepositsPosterDesktop} 2x, ${depositsPosterDesktop} 1x`}
          alt="Вклады Лига Банка."
        />
      </picture>
      <ul>
        <li>Проценты по вкладам до 7%</li>
        <li>Разнообразные условия</li>
        <li>Возможность ежемесячной капитализации или вывод процентов на банковскую карту</li>
      </ul>
      <Link to={LocalPath.DEPOSITS}>Узнать подробнее</Link>
    </section>
  );
};

export {ServicesDeposits};
