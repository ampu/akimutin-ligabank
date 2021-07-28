import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {LocalPath} from '../../constants/local-path';
import {MediaQuery} from '../../constants/media-query';

import creditCardsPng from '../../images/credit-cards@1x.png';
import retinaCreditCardsPng from '../../images/credit-cards@2x.png';
import creditCardsWebp from '../../images/credit-cards@1x.webp';
import retinaCreditCardsWebp from '../../images/credit-cards@2x.webp';
import mobileCreditCardsPng from '../../images/credit-cards--mobile@1x.png';
import mobileRetinaCreditCardsPng from '../../images/credit-cards--mobile@2x.png';

const CreditHeroSlide = ({onLinkClick}) => {
  return (
    <section className="credit-hero-slide">
      <div className="credit-hero-slide__container">
        <div className="credit-hero-slide__inner">
          <h1>Лига Банк</h1>
          <p>Кредиты на любой случай</p>
          <Link to={LocalPath.CREDIT_CALCULATOR} onClick={onLinkClick}>Рассчитать кредит</Link>
        </div>
      </div>

      <picture>
        <source
          media={MediaQuery.MOBILE}
          srcSet={`${mobileRetinaCreditCardsPng} 2x, ${mobileCreditCardsPng} 1x`}
        />
        <source
          type="image/webp"
          srcSet={`${retinaCreditCardsWebp} 2x, ${creditCardsWebp} 1x`}
        />
        <img
          src={creditCardsPng}
          srcSet={`${retinaCreditCardsPng} 2x, ${creditCardsPng} 1x`}
          alt="Кредитные карты «ЛИГА Банк»"
        />
      </picture>
    </section>
  );
};

CreditHeroSlide.propTypes = {
  onLinkClick: PropTypes.func.isRequired,
};

export {CreditHeroSlide};
