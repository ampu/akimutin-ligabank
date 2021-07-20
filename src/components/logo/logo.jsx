import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import getClassName from 'classnames';

import {LocalPath} from '../../constants/local-path';
import {MediaQuery} from '../../constants/media-query';

import desktopLogo from '../../images/logo--desktop.svg';
import tabletLogo from '../../images/logo--tablet.svg';
import mobileLogo from '../../images/logo--mobile.svg';

const Logo = ({className}) => {
  return (
    <NavLink exact to={LocalPath.INDEX}
      className={getClassName(`logo`, className)}
      activeClassName="logo--active"
    >
      <picture>
        <source media={MediaQuery.MOBILE} srcSet={mobileLogo}/>
        <source media={MediaQuery.TABLET} srcSet={tabletLogo}/>
        <img src={desktopLogo} alt="Логотип «ЛИГА Банк»"/>
      </picture>
    </NavLink>
  );
};

Logo.propTypes = {
  className: PropTypes.string,
};

export {Logo};