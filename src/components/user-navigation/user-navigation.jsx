import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import getClassName from 'classnames';

import {LocalPath} from '../../constants/local-path';

import {ReactComponent as SignInIcon} from '../../images/sign-in-icon.svg';

const UserNavigation = ({
  isActive,
  listClassName,
  itemClassName,
  onSignInLinkClick,
}) => {
  return (
    <ul className={getClassName(`user-navigation`, isActive && `active`, listClassName)}>
      <li className={getClassName(`user-navigation__item`, itemClassName)}>
        <NavLink exact to={LocalPath.SIGN_IN}
          className="user-navigation__link user-navigation__link--sign-in"
          activeClassName="user-navigation__link--active"
          onClick={onSignInLinkClick}
        >
          <SignInIcon/>
          <span>Войти в Интернет-банк</span>
        </NavLink>
      </li>
    </ul>
  );
};

UserNavigation.propTypes = {
  isActive: PropTypes.bool,
  listClassName: PropTypes.string,
  itemClassName: PropTypes.string,
  onSignInLinkClick: PropTypes.func.isRequired,
};

export {UserNavigation};
