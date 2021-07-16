import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import getClassName from 'classnames';

import {LocalPath} from '../../constants/local-path';

import {ReactComponent as SignInIcon} from '../../images/sign-in-icon.svg';

const UserNavigation = ({isActive, listClassName, itemClassName}) => {
  return (
    <ul className={getClassName(`user-navigation`, isActive && `active`, listClassName)}>
      <li className={getClassName(`user-navigation__item`, itemClassName)}>
        <NavLink exact to={LocalPath.SIGN_IN}
          className="user-navigation__link user-navigation__link--login"
          activeClassName="user-navigation__link--active"
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
};

export {UserNavigation};
