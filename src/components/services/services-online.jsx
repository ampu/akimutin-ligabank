import React from 'react';
import {Link} from 'react-router-dom';

import {LocalPath} from '../../constants/local-path';
import {MediaQuery} from '../../constants/media-query';

import {Picture} from '../picture/picture';
import onlineServicesPosterMobile from '../../images/services-online-poster--mobile.jpg';
import onlineServicesPosterTablet from '../../images/services-online-poster--tablet.jpg';
import onlineServicesPosterDesktop from '../../images/services-online-poster--desktop.jpg';
import retinaOnlineServicesPosterMobile from '../../images/services-online-poster--mobile@2x.jpg';
import retinaOnlineServicesPosterTablet from '../../images/services-online-poster--tablet@2x.jpg';
import retinaOnlineServicesPosterDesktop from '../../images/services-online-poster--desktop@2x.jpg';

const ServicesOnline = () => {
  return (
    <section>
      <div className="services__image-container">
        <Picture src={onlineServicesPosterDesktop} alt="Онлайн-сервисы Лига Банка.">
          <source
            media={MediaQuery.MOBILE}
            srcSet={`${retinaOnlineServicesPosterMobile} 2x, ${onlineServicesPosterMobile} 1x`}
          />
          <source
            media={MediaQuery.TABLET}
            srcSet={`${retinaOnlineServicesPosterTablet} 2x, ${onlineServicesPosterTablet} 1x`}
          />
          <source
            srcSet={`${retinaOnlineServicesPosterDesktop} 2x, ${onlineServicesPosterDesktop} 1x`}
          />
        </Picture>
      </div>

      <div className="services__content-container">
        <h3 className="visually-hidden">Онлайн-сервисы</h3>
        <strong>Лига Банк — это огромное количество онлайн‑сервисов для&nbsp;вашего&nbsp;удобства</strong>
        <ul>
          <li>Мобильный банк, <br/>который&nbsp;всегда&nbsp;под&nbsp;рукой</li>
          <li>Приложение Лига-проездной позволит вам&nbsp;оплачивать билеты по&nbsp;всему&nbsp;миру</li>
        </ul>
      </div>

      <Link to={LocalPath.ONLINE_SERVICES}>Узнать подробнее</Link>
    </section>
  );
};

export {ServicesOnline};
