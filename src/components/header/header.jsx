import React, {useState, useEffect} from 'react';
import getClassName from 'classnames';

import {Logo} from '../logo/logo';
import {SiteNavigation} from '../site-navigation/site-navigation';
import {UserNavigation} from '../user-navigation/user-navigation';

import {ReactComponent as HeaderToggleButtonIcon} from '../../images/header-toggle-button-icon.svg';
import {ReactComponent as HeaderCloseButtonIcon} from '../../images/header-close-button-icon.svg';

const Header = () => {
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    document.body.classList.toggle(`page-body--mobile-modal`, isActive);

    return () => {
      document.body.classList.toggle(`page-body--mobile-modal`, !isActive);
    };
  }, [isActive]);

  const onToggleButtonClick = () => {
    setActive((previousActive) => !previousActive);
  };

  const onCloseButtonClick = () => {
    setActive(false);
  };

  return (
    <header className={getClassName(`header`, isActive && `active`)}>
      <nav className="header__navigation">

        <Logo className="header__logo"/>

        <SiteNavigation
          isHeader
          listClassName="header__site-navigation-list"
          itemClassName="header__site-navigation-item"
        />

        <UserNavigation
          isActive={isActive}
          listClassName="header__user-navigation-list"
          itemClassName="header__user-navigation-item"
        />

        <button className="header__toggle-button" type="button" onClick={onToggleButtonClick}>
          <HeaderToggleButtonIcon/>
          <span className="visually-hidden">Открыть меню</span>
        </button>

        <button className="header__close-button" type="button" onClick={onCloseButtonClick}>
          <HeaderCloseButtonIcon/>
          <span className="visually-hidden">Закрыть меню</span>
        </button>
      </nav>
    </header>
  );
};

export {Header};
