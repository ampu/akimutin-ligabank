import React from 'react';
import {Link} from 'react-router-dom';

import {LocalPath} from '../../constants/local-path';

import creditCardsPng from '../../images/credit-cards@1x.png';
import retinaCreditCardsPng from '../../images/credit-cards@2x.png';
import creditCardsWebp from '../../images/credit-cards@1x.webp';
import retinaCreditCardsWebp from '../../images/credit-cards@2x.webp';

const HeroArea = () => {
  return (
    <section className="hero-area">
      <div className="hero-area__container">
        <h2 className="hero-area__title">Лига Банк</h2>
        <p className="hero-area__slogan">Кредиты на любой случай</p>
        <Link to={LocalPath.CALCULATE_LOAN} className="hero-area__link">Рассчитать кредит</Link>

        <picture>
          <source
            type="image/webp"
            srcSet={`${retinaCreditCardsWebp} 2x, ${creditCardsWebp} 1x`}
          />
          <img
            className="hero-area__credit-cards"
            src={creditCardsPng}
            srcSet={`${retinaCreditCardsPng} 2x, ${creditCardsPng} 1x`}
            alt="Кредитные карты «ЛИГА Банк»"
          />
        </picture>
      </div>
    </section>
  );
};

export {HeroArea};
