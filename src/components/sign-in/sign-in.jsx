import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {LocalPath} from '../../constants/local-path';

import {withSignInState} from '../../hocs/with-sign-in-state';
import {Logo} from '../logo/logo';
import {ReactComponent as SignInCloseButtonIcon} from '../../images/sign-in-close-button-icon.svg';
import {ReactComponent as SignInPasswordToggleButtonIcon} from '../../images/sign-in-password-toggle-button-icon.svg';

const SignIn = ({
  onSubmitButtonClick,
  onCloseButtonClick,
  isPasswordVisible,
  onPasswordToggleButtonMouseDown,
  onPasswordToggleKeyDown,
}) => {
  return (
    <div className="sign-in">
      <form>
        <Logo isExtended className="sign-in__logo"/>

        <label htmlFor="sign-in-login">
          Логин

          <input
            id="sign-in-login"
            type="text"
            name="login"
            autoComplete="username"
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

        <Link className="sign-in__forgotten-password" to={LocalPath.FORGOTTEN_PASSWORD}>
          Забыли пароль?
        </Link>

        <button className="sign-in__close-button" type="button" onClick={onCloseButtonClick}>
          <SignInCloseButtonIcon/>
          <span>Закрыть</span>
        </button>
      </form>
    </div>
  );
};

SignIn.propTypes = {
  onSubmitButtonClick: PropTypes.func.isRequired,
  onCloseButtonClick: PropTypes.func.isRequired,
  isPasswordVisible: PropTypes.bool.isRequired,
  onPasswordToggleButtonMouseDown: PropTypes.func.isRequired,
  onPasswordToggleKeyDown: PropTypes.func.isRequired,
};

const SignInWithSignInState = withSignInState(SignIn);

export {SignIn, SignInWithSignInState};
