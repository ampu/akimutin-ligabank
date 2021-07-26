import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import getClassName from 'classnames';
import FocusTrap from 'focus-trap-react';

import {LocalPath} from '../../constants/local-path';

import {withSignInState} from '../../hocs/with-sign-in-state';
import {withPopup} from '../../hocs/with-popup';
import {Logo} from '../logo/logo';
import {ReactComponent as PopupCloseButtonIcon} from '../../images/popup-close-button-icon.svg';
import {ReactComponent as SignInPasswordToggleButtonIcon} from '../../images/sign-in-password-toggle-button-icon.svg';

import {refShape} from '../../types/ref-types';

const SignIn = ({
  popupRef,
  onContainerMouseDown,
  onClose,
  onSubmitButtonClick,
  isPasswordVisible,
  onPasswordToggleButtonMouseDown,
  onPasswordToggleKeyDown,
  isBounce,
  isError,
}) => {
  return (
    <div className="sign-in" onMouseDown={onContainerMouseDown}>
      <FocusTrap>
        <form ref={popupRef} className={getClassName(isBounce && `bounce`, isError && `shake`)}>
          <Logo isExtended className="sign-in__logo"/>

          <label htmlFor="sign-in-login">
            Логин

            <input
              id="sign-in-login"
              type="text"
              name="login"
              autoComplete="username"
              required
              autoFocus
            />
          </label>

          <label htmlFor="sign-in-password">
            Пароль

            <input
              id="sign-in-password"
              className="sign-in__password-input"
              type={isPasswordVisible ? `text` : `password`}
              name="password"
              autoComplete="current-password"
              required
            />

            <button
              type="button"
              className="sign-in__password-toggle-button"
              onMouseDown={onPasswordToggleButtonMouseDown}
              onKeyDown={onPasswordToggleKeyDown}
            >
              <SignInPasswordToggleButtonIcon/>
              <span>Показать пароль</span>
            </button>
          </label>

          <button type="submit" onClick={onSubmitButtonClick}>Войти</button>

          <Link
            className="sign-in__forgotten-password"
            to={LocalPath.FORGOTTEN_PASSWORD}
            onClick={onClose}
          >
            Забыли пароль?
          </Link>

          <button className="sign-in__close-button" type="button" onClick={onClose}>
            <PopupCloseButtonIcon/>
            <span>Закрыть</span>
          </button>
        </form>
      </FocusTrap>
    </div>
  );
};

SignIn.propTypes = {
  popupRef: refShape.isRequired,
  onContainerMouseDown: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmitButtonClick: PropTypes.func.isRequired,
  isPasswordVisible: PropTypes.bool.isRequired,
  onPasswordToggleButtonMouseDown: PropTypes.func.isRequired,
  onPasswordToggleKeyDown: PropTypes.func.isRequired,
  isBounce: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
};

const SignInWithSignInState = withPopup(withSignInState(SignIn));

export {SignIn, SignInWithSignInState};
