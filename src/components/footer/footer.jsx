import React from 'react';

import {Logo} from '../logo/logo';
import {SiteNavigation} from '../site-navigation/site-navigation';
import {SocialNavigation} from '../social-navigation/social-navigation';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo-container">
          <Logo className="footer__logo"/>

          <ul className="footer__information">
            <li>150015, г. Москва, ул. Московская, д. 32</li>
            <li>Генеральная лицензия Банка России №1050</li>
            <li>Ⓒ Лига Банк, 2019</li>
          </ul>
        </div>

        <SiteNavigation isFooter
          listClassName="footer__site-navigation"
          itemClassName="footer__site-navigation-item"
        />

        <a className="footer__phone-number" href="tel:*0904">
          <span className="footer__phone-number-value footer__phone-number-value--short">
            *0904
          </span>
          <span className="footer__phone-number-legend footer__phone-number-legend--short">
            Бесплатно для абонентов<br/>
            МТС, Билайн, Мегафон, Теле2
          </span>
        </a>

        <a className="footer__phone-number" href="tel:+78001112233">
          <span className="footer__phone-number-value footer__phone-number-value--mobile">
            8 800 111 22 33
          </span>
          <span className="footer__phone-number-legend footer__phone-number-legend--mobile">
            Бесплатный для всех городов России
          </span>
        </a>

        <SocialNavigation/>
      </div>
    </footer>
  );
};

export {Footer};
