import React from 'react';
import PropTypes from 'prop-types';
import getClassName from 'classnames';

import {LocalPath} from '../../constants/local-path';

import {withSlider} from '../../hocs/with-slider';
import {withTabs} from '../../hocs/with-tabs';

import {ServicesDeposits} from './services-deposits';
import {ServicesCredits} from './services-credits';
import {ServicesInsurance} from './services-insurance';
import {ServicesOnline} from './services-online';
import {ReactComponent as DepositsIcon} from '../../images/services-deposits-icon.svg';
import {ReactComponent as CreditsIcon} from '../../images/services-credits-icon.svg';
import {ReactComponent as InsuranceIcon} from '../../images/services-insurance-icon.svg';
import {ReactComponent as OnlineIcon} from '../../images/services-online-icon.svg';

import {refType} from '../../types/ref-types';

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
  controlsRef,
  itemsRef,
  onControlButtonClick,
  onControlButtonFocus,
  onControlButtonKeyDown,
  onItemKeyDown,
}) => {
  return (
    <section className="services" data-navigation-id={LocalPath.SERVICES}>
      <h2 className="visually-hidden">Услуги</h2>

      <ul ref={controlsRef} className="services__controls">
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
                onClick={onControlButtonClick}
                onFocus={onControlButtonFocus}
                onKeyDown={onControlButtonKeyDown}
              >
                <service.iconComponent/>
                <span>{service.title}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <ul ref={itemsRef} className="services__items">
        {SERVICES.map((service, serviceIndex) => (
          <li
            key={service.key}
            className={getClassName(serviceIndex === activeSlideIndex && `active`)}
            onTouchStart={onSlideTouchStart}
            onTouchMove={onSlideTouchMove}
            onTouchEnd={onSlideTouchEnd}
            onKeyDown={onItemKeyDown}
          >
            <service.component/>
          </li>
        ))}
      </ul>
    </section>
  );
};

Services.propTypes = {
  activeSlideIndex: PropTypes.number.isRequired,
  onSlideTouchStart: PropTypes.func.isRequired,
  onSlideTouchMove: PropTypes.func.isRequired,
  onSlideTouchEnd: PropTypes.func.isRequired,
  controlsRef: refType.isRequired,
  itemsRef: refType.isRequired,
  onControlButtonClick: PropTypes.func.isRequired,
  onControlButtonFocus: PropTypes.func.isRequired,
  onControlButtonKeyDown: PropTypes.func.isRequired,
  onItemKeyDown: PropTypes.func.isRequired,
};

const ServicesWithTabsAndSlider = withSlider(withTabs(Services, SERVICES.length), SERVICES.length);

export {Services, ServicesWithTabsAndSlider};
