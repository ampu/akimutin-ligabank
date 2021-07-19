import React from 'react';
import {Link} from 'react-router-dom';

import {LocalPath} from '../../constants/local-path';

const OfficesHeroSlide = () => {
  return (
    <section className="offices-hero-slide">
      <div className="offices-hero-slide__inner">
        <h2>Лига Банк</h2>
        <p>Всегда рядом</p>
        <Link to={LocalPath.CONTACTS}>Найти отделение</Link>
      </div>
    </section>
  );
};

export {OfficesHeroSlide};
