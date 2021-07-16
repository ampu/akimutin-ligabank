import React from 'react-router-dom';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import getClassName from 'classnames';

import {LocalPath} from '../../constants/local-path';

const SITE_NAVIGATION_ITEMS = [
  {path: LocalPath.SERVICES, title: `Услуги`, isHeader: true, isFooter: true},
  {path: LocalPath.CREDIT_CALCULATOR, title: `Рассчитать кредит`, isHeader: true, isFooter: true},
  {path: LocalPath.CURRENCY_CONVERTER, title: `Конвертер валют`, isHeader: true, isFooter: false},
  {path: LocalPath.CONTACTS, title: `Контакты`, isHeader: true, isFooter: true},
  {path: LocalPath.ASK_QUESTION, title: `Задать вопрос`, isHeader: false, isFooter: true},
];

const SiteNavigation = ({isHeader, isFooter, listClassName, itemClassName}) => {
  return (
    <ul className={getClassName(`site-navigation`, listClassName)}>
      {SITE_NAVIGATION_ITEMS.map((item) => ((isHeader && item.isHeader) || (isFooter && item.isFooter)) && (
        <li key={item.path}
          className={getClassName(`site-navigation__item`, itemClassName)}
        >
          <NavLink
            exact to={item.path}
            className="site-navigation__link"
            activeClassName="site-navigation__link--active"
          >
            {item.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

SiteNavigation.propTypes = {
  isHeader: PropTypes.bool,
  isFooter: PropTypes.bool,
  listClassName: PropTypes.string,
  itemClassName: PropTypes.string,
};

export {SiteNavigation};
