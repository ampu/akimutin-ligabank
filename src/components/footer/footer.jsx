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
          listClassName="footer__site-navigation-list"
          itemClassName="footer__site-navigation-item"
        />

        <dl className="footer__phones">
          <a className="footer__short-number" href="tel:*0904">
            <dt>
              Бесплатно для абонентов<br/>
              МТС, Билайн, Мегафон, Теле2
            </dt>
            <dd>*0904</dd>
          </a>

          <a className="footer__mobile-number" href="tel:+78001112233">
            <dt>
              Бесплатный для всех городов России
            </dt>
            <dd>8 800 111 22 33</dd>
          </a>
        </dl>

        <SocialNavigation/>
      </div>
    </footer>
  );
};

export {Footer};
