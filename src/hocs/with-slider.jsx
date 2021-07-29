import React, {useState, useEffect, useCallback} from 'react';

import {useSwipe} from '../hooks/use-swipe';

export const withSlider = (Component, slidesCount, switchSlideInterval) => {
  const WithSlider = (props) => {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    const onNextSlide = useCallback(() => {
      setActiveSlideIndex((previousSlideIndex) => (previousSlideIndex + 1) % slidesCount);
    }, []);

    const onPreviousSlide = useCallback(() => {
      setActiveSlideIndex((previousSlideIndex) => (previousSlideIndex - 1 + slidesCount) % slidesCount);
    }, []);

    const [onSlideTouchStart, onSlideTouchMove, onSlideTouchEnd] = useSwipe(onNextSlide, onPreviousSlide);

    useEffect(() => {
      if (switchSlideInterval > 0) {
        const timeoutId = setInterval(onNextSlide, switchSlideInterval);

        return () => {
          clearInterval(timeoutId);
        };
      }
      return () => {
      };
    }, [activeSlideIndex, onNextSlide]);

    const onControlButtonClick = (evt) => {
      setActiveSlideIndex(+evt.currentTarget.dataset.index);
    };

    return (
      <Component
        activeSlideIndex={activeSlideIndex}
        onSlideTouchStart={onSlideTouchStart}
        onSlideTouchMove={onSlideTouchMove}
        onSlideTouchEnd={onSlideTouchEnd}
        onControlButtonClick={onControlButtonClick}
        {...props}
      />
    );
  };

  WithSlider.displayName = `${Component.name}${WithSlider.name}`;

  return WithSlider;
};
