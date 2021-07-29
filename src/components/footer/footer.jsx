import React from 'react';

import {Logo} from '../logo/logo';
import {SiteNavigation} from '../site-navigation/site-navigation';
import {SocialNavigation} from '../social-navigation/social-navigation';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__left-column">
          <div className="footer__logo-container">
            <Logo className="footer__logo"/>

            <ul className="footer__information">
              <li>150015, г. Москва, ул. Московская, д. 32</li>
              <li>Генеральная лицензия Банка России №1050</li>
              <li>Ⓒ Лига Банк, 2019</li>
            </ul>
          </div>

          <SiteNavigation isFooter
            listClassName="footer__site-navigation-list"
            itemClassName="footer__site-navigation-item"
          />
        </div>

        <div className="footer__right-column">
          <a className="footer__phone footer__phone--short-number" href="tel:*0904">
            <strong>*0904</strong>
            <span>
              Бесплатно для абонентов<br/>
              МТС, Билайн, Мегафон, Теле2
            </span>
          </a>

          <a className="footer__phone footer__phone--mobile-number footer__phone--last" href="tel:+78001112233">
            <strong>8 800 111 22 33</strong>
            <span>
              Бесплатный для всех городов России
            </span>
          </a>

          <SocialNavigation/>
        </div>
      </div>
    </footer>
  );
};

export {Footer};
