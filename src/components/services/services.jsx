import React from 'react';
import PropTypes from 'prop-types';
import getClassName from 'classnames';

import {withSlider} from '../../hocs/with-slider';

import {ServicesDeposits} from './services-deposits';
import {ServicesCredits} from './services-credits';
import {ServicesInsurance} from './services-insurance';
import {ServicesOnline} from './services-online';

import {ReactComponent as DepositsIcon} from '../../images/services-deposits-icon.svg';
import {ReactComponent as CreditsIcon} from '../../images/services-credits-icon.svg';
import {ReactComponent as InsuranceIcon} from '../../images/services-insurance-icon.svg';
import {ReactComponent as OnlineIcon} from '../../images/services-online-icon.svg';

const SERVICES = [
  {key: `deposits`, title: `Вклады`, iconComponent: DepositsIcon, component: ServicesDeposits},
  {key: `credits`, title: `Кредиты`, iconComponent: CreditsIcon, component: ServicesCredits},
  {key: `insurance`, title: `Страхование`, iconComponent: InsuranceIcon, component: ServicesInsurance},
  {key: `online`, title: `Онлайн-сервисы`, iconComponent: OnlineIcon, component: ServicesOnline},
];

const Services = ({
  activeSlideIndex,
  onSlideTouchStart,
  onSlideTouchMove,
  onSlideTouchEnd,
  onButtonClick,
}) => {
  return (
    <section className="services" id="services">
      <div className="services__container">
        <h2 className="visually-hidden">Услуги</h2>

        <ul className="services__controls">
          {SERVICES.map((service, serviceIndex) => {
            const buttonClassName = getClassName({
              active: serviceIndex === activeSlideIndex,
              alternative: service.isAlternativeButton,
            });
            return (
              <li key={service.key}>
                <button
                  type="button"
                  className={buttonClassName}
                  data-index={serviceIndex}
                  onClick={onButtonClick}
                >
                  <service.iconComponent/>
                  <span>{service.title}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <ul className="services__list">
          {SERVICES.map((service, serviceIndex) => serviceIndex === activeSlideIndex && (
            <li
              key={service.key}
              onTouchStart={onSlideTouchStart}
              onTouchMove={onSlideTouchMove}
              onTouchEnd={onSlideTouchEnd}
            >
              <service.component/>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

Services.propTypes = {
  activeSlideIndex: PropTypes.number.isRequired,
  onSlideTouchStart: PropTypes.func.isRequired,
  onSlideTouchMove: PropTypes.func.isRequired,
  onSlideTouchEnd: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

const ServicesWithSlider = withSlider(Services, SERVICES.length);

export {Services, ServicesWithSlider};
