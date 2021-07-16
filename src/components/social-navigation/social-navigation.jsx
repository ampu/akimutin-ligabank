import React from 'react';
import {ExternalLink} from '../../constants/external-link';

import {ReactComponent as FacebookIcon} from '../../images/facebook-icon.svg';
import {ReactComponent as InstagramIcon} from '../../images/instagram-icon.svg';
import {ReactComponent as TwitterIcon} from '../../images/twitter-icon.svg';
import {ReactComponent as YoutubeIcon} from '../../images/youtube-icon.svg';

const SocialNavigation = () => {
  return (
    <ul className="social-navigation">
      <li className="social-navigation__item">
        <a className="social-navigation__link" href={ExternalLink.FACEBOOK} aria-label="Группа в Facebook.">
          <FacebookIcon/>
        </a>
      </li>
      <li className="social-navigation__item">
        <a className="social-navigation__link" href={ExternalLink.INSTAGRAM} aria-label="Аккаунт в Instagram.">
          <InstagramIcon/>
        </a>
      </li>
      <li className="social-navigation__item">
        <a className="social-navigation__link" href={ExternalLink.TWITTER} aria-label="Лента в Twitter.">
          <TwitterIcon/>
        </a>
      </li>
      <li className="social-navigation__item">
        <a className="social-navigation__link" href={ExternalLink.YOUTUBE} aria-label="Канал на YouTube.">
          <YoutubeIcon/>
        </a>
      </li>
    </ul>
  );
};

export {SocialNavigation};
