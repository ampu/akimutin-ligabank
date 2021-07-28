import React from 'react';
import PropTypes from 'prop-types';
import getClassName from 'classnames';
import FocusTrap from 'focus-trap-react';

import {Logo} from '../logo/logo';
import {SiteNavigation} from '../site-navigation/site-navigation';
import {UserNavigation} from '../user-navigation/user-navigation';
import {SignInWithSignInState as SignIn} from '../sign-in/sign-in';
import {withHeaderState} from '../../hocs/with-header-state';

import {ReactComponent as HeaderToggleButtonIcon} from '../../images/header-toggle-button-icon.svg';
import {ReactComponent as HeaderCloseButtonIcon} from '../../images/header-close-button-icon.svg';

const Header = ({
  isActive,
  onToggleButtonClick,
  onCloseButtonClick,
  isSignInActive,
  onSignInLinkClick,
  onSignInClose,
}) => {
  return (
    <FocusTrap active={isActive}>
      <header className={getClassName(`header`, isActive && `active`)}>
        <nav className="header__navigation">
          <button className="header__toggle-button" type="button" onClick={onToggleButtonClick}>
            <HeaderToggleButtonIcon/>
            <span className="visually-hidden">Открыть меню</span>
          </button>

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
            onSignInLinkClick={onSignInLinkClick}
          />

          <button className="header__close-button" type="button" onClick={onCloseButtonClick}>
            <HeaderCloseButtonIcon/>
            <span className="visually-hidden">Закрыть меню</span>
          </button>
        </nav>

        {isSignInActive && (
          <SignIn onClose={onSignInClose}/>
        )}
      </header>
    </FocusTrap>
  );
};

Header.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onToggleButtonClick: PropTypes.func.isRequired,
  onCloseButtonClick: PropTypes.func.isRequired,
  isSignInActive: PropTypes.bool.isRequired,
  onSignInLinkClick: PropTypes.func.isRequired,
  onSignInClose: PropTypes.func.isRequired,
};

const HeaderWithHeaderState = withHeaderState(Header);

export {Header, HeaderWithHeaderState};
