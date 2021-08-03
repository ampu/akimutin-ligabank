import React from 'react';
import {Link} from 'react-router-dom';

import {LocalPath} from '../../constants/local-path';
import {MediaQuery} from '../../constants/media-query';

import {Picture} from '../picture/picture';
import creditCardsPng from '../../images/credit-cards@1x.png';
import retinaCreditCardsPng from '../../images/credit-cards@2x.png';
import creditCardsWebp from '../../images/credit-cards@1x.webp';
import retinaCreditCardsWebp from '../../images/credit-cards@2x.webp';
import mobileCreditCardsPng from '../../images/credit-cards--mobile@1x.png';
import mobileRetinaCreditCardsPng from '../../images/credit-cards--mobile@2x.png';

const CreditHeroSlide = () => {
  return (
    <section className="credit-hero-slide">
      <div className="credit-hero-slide__container">
        <div className="credit-hero-slide__inner">
          <h1>Лига Банк</h1>
          <p>Кредиты на любой случай</p>
          <Link to={LocalPath.CREDIT_CALCULATOR}>Рассчитать кредит</Link>
        </div>
      </div>

      <Picture src={creditCardsPng} alt="Кредитные карты «ЛИГА Банк».">
        <source
          media={MediaQuery.MOBILE}
          srcSet={`${mobileRetinaCreditCardsPng} 2x, ${mobileCreditCardsPng} 1x`}
        />
        <source
          type="image/webp"
          srcSet={`${retinaCreditCardsWebp} 2x, ${creditCardsWebp} 1x`}
        />
        <source
          srcSet={`${retinaCreditCardsPng} 2x, ${creditCardsPng} 1x`}
        />
      </Picture>
    </section>
  );
};

export {CreditHeroSlide};
