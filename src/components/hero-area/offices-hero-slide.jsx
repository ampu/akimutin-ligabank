import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {LocalPath} from '../../constants/local-path';

const OfficesHeroSlide = ({onLinkClick}) => {
  return (
    <section className="offices-hero-slide">
      <div className="offices-hero-slide__inner">
        <h1>Лига Банк</h1>
        <p>Всегда рядом</p>
        <Link to={LocalPath.CONTACTS} onClick={onLinkClick}>Найти отделение</Link>
      </div>
    </section>
  );
};

OfficesHeroSlide.propTypes = {
  onLinkClick: PropTypes.func.isRequired,
};

export {OfficesHeroSlide};
