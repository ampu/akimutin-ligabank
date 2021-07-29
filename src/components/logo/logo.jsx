import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import getClassName from 'classnames';

import {LocalPath} from '../../constants/local-path';
import {MediaQuery} from '../../constants/media-query';

import desktopLogo from '../../images/logo--desktop.svg';
import tabletLogo from '../../images/logo--tablet.svg';
import mobileLogo from '../../images/logo--mobile.svg';

import extendedDesktopLogo from '../../images/logo--extended-desktop.svg';

const Logo = ({isExtended, className}) => {
  return (
    <NavLink exact to={LocalPath.INDEX}
      className={getClassName(`logo`, isExtended && `logo--extended`, className)}
      activeClassName="logo--active"
    >
      {isExtended && (
        <img src={extendedDesktopLogo} alt="Логотип «ЛИГА Банк»"/>
      )}
      {isExtended || (
        <picture>
          <source media={MediaQuery.MOBILE} srcSet={mobileLogo}/>
          <source media={MediaQuery.TABLET} srcSet={tabletLogo}/>
          <img src={desktopLogo} alt="Логотип «ЛИГА Банк»"/>
        </picture>
      )}
    </NavLink>
  );
};

Logo.propTypes = {
  isExtended: PropTypes.bool,
  className: PropTypes.string,
};

export {Logo};
