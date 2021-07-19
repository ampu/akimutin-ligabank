import React from 'react';
import PropTypes from 'prop-types';
import getClassName from 'classnames';

import {CreditHeroSlide} from './credit-hero-slide';
import {ConfidenceHeroSlide} from './confidence-hero-slide';
import {OfficesHeroSlide} from './offices-hero-slide';
import {withSlider} from '../../hocs/with-slider';

const SWITCH_SLIDE_INTERVAL = 4000;

const HERO_AREA_SLIDES = [
  {key: `credit`, component: CreditHeroSlide, isAlternativeButton: false},
  {key: `confidence`, component: ConfidenceHeroSlide, isAlternativeButton: false},
  {key: `offices`, component: OfficesHeroSlide, isAlternativeButton: true},
];

const HeroArea = ({
  activeSlideIndex,
  onSlideTouchStart,
  onSlideTouchMove,
  onSlideTouchEnd,
  onButtonClick,
}) => {
  return (
    <div className="hero-area">
      <ul className="hero-area__controls">
        {HERO_AREA_SLIDES.map((slide, slideIndex) => {
          const buttonClassName = getClassName({
            active: slideIndex === activeSlideIndex,
            alternative: slide.isAlternativeButton,
          });
          return (
            <li key={slide.key}>
              <button
                type="button"
                className={buttonClassName}
                data-index={slideIndex}
                onClick={onButtonClick}
              >
                <span className="visually-hidden">Слайд №${slideIndex + 1}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <ul className="hero-area__slides">
        {HERO_AREA_SLIDES.map((slide, slideIndex) => slideIndex === activeSlideIndex && (
          <li
            key={slide.key}
            onTouchStart={onSlideTouchStart}
            onTouchMove={onSlideTouchMove}
            onTouchEnd={onSlideTouchEnd}
          >
            <slide.component/>
          </li>
        ))}
      </ul>
    </div>
  );
};

HeroArea.propTypes = {
  activeSlideIndex: PropTypes.number.isRequired,
  onSlideTouchStart: PropTypes.func.isRequired,
  onSlideTouchMove: PropTypes.func.isRequired,
  onSlideTouchEnd: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

const HeroAreaWithSlider = withSlider(HeroArea, HERO_AREA_SLIDES.length, SWITCH_SLIDE_INTERVAL);

export {HeroArea, HeroAreaWithSlider};
