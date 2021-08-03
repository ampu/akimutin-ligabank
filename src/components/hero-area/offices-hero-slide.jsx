import React from 'react';
import {Link} from 'react-router-dom';

import {LocalPath} from '../../constants/local-path';

const OfficesHeroSlide = () => {
  return (
    <section className="offices-hero-slide">
      <div className="offices-hero-slide__container">
        <div className="offices-hero-slide__inner">
          <h1>Лига Банк</h1>
          <p>Всегда рядом</p>
          <Link to={LocalPath.CONTACTS}>Найти отделение</Link>
        </div>
      </div>
    </section>
  );
};

export {OfficesHeroSlide};
