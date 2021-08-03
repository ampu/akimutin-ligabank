import React, {useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {LocalPath} from '../../constants/local-path';
import {MediaQuery} from '../../constants/media-query';

import {Picture} from '../picture/picture';
import depositsPosterMobile from '../../images/services-deposits-poster--mobile.jpg';
import depositsPosterTablet from '../../images/services-deposits-poster--tablet.jpg';
import depositsPosterDesktop from '../../images/services-deposits-poster--desktop.jpg';
import retinaDepositsPosterMobile from '../../images/services-deposits-poster--mobile@2x.jpg';
import retinaDepositsPosterTablet from '../../images/services-deposits-poster--tablet@2x.jpg';
import retinaDepositsPosterDesktop from '../../images/services-deposits-poster--desktop@2x.jpg';

const ServicesDeposits = () => {
  const imageContainerRef = useRef(null);

  useEffect(() => {
    imageContainerRef.current.innerHTML = imageContainerRef.current.innerHTML;
  }, []);

  return (
    <section>
      <div ref={imageContainerRef} className="services__image-container">
        <Picture src={depositsPosterDesktop} alt="Вклады Лига Банка.">
          <source
            media={MediaQuery.MOBILE}
            srcSet={`${retinaDepositsPosterMobile} 2x, ${depositsPosterMobile} 1x`}
          />
          <source
            media={MediaQuery.TABLET}
            srcSet={`${retinaDepositsPosterTablet} 2x, ${depositsPosterTablet} 1x`}
          />
          <source
            srcSet={`${retinaDepositsPosterDesktop} 2x, ${depositsPosterDesktop} 1x`}
          />
        </Picture>
      </div>

      <div className="services__content-container">
        <h3 className="visually-hidden">Вклады</h3>
        <strong>Вклады Лига Банка – это выгодная <br/>
          инвестиция в свое будущее</strong>
        <ul>
          <li>Проценты по вкладам до 7%</li>
          <li>Разнообразные условия</li>
          <li>Возможность ежемесячной капитализации или вывод процентов на&nbsp;банковскую&nbsp;карту</li>
        </ul>
      </div>

      <Link to={LocalPath.DEPOSITS}>Узнать подробнее</Link>
    </section>
  );
};

export {ServicesDeposits};
