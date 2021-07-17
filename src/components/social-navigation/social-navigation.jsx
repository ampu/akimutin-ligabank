import React from 'react';
import {ExternalLink} from '../../constants/external-link';

import {ReactComponent as FacebookIcon} from '../../images/facebook-icon.svg';
import {ReactComponent as InstagramIcon} from '../../images/instagram-icon.svg';
import {ReactComponent as TwitterIcon} from '../../images/twitter-icon.svg';
import {ReactComponent as YoutubeIcon} from '../../images/youtube-icon.svg';

const SOCIAL_NAVIGATION_ITEMS = [
  {ariaLabel: `Группа в Facebook.`, iconComponent: FacebookIcon, externalLink: ExternalLink.FACEBOOK},
  {ariaLabel: `Аккаунт в Instagram.`, iconComponent: InstagramIcon, externalLink: ExternalLink.INSTAGRAM},
  {ariaLabel: `Лента в Twitter.`, iconComponent: TwitterIcon, externalLink: ExternalLink.TWITTER},
  {ariaLabel: `Канал на YouTube.`, iconComponent: YoutubeIcon, externalLink: ExternalLink.YOUTUBE},
];

const SocialNavigation = () => {
  return (
    <ul className="social-navigation">
      {SOCIAL_NAVIGATION_ITEMS.map((item) => (
        <li key={item.externalLink} className="social-navigation__item">
          <a className="social-navigation__link" href={item.externalLink} aria-label={item.ariaLabel}>
            <item.iconComponent/>
          </a>
        </li>
      ))}
    </ul>
  );
};

export {SocialNavigation};
