import React, {useState, useRef, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {clamp} from 'lodash';

const PERCENTAGE_CONSTRAINT = {min: 0, max: 100};

const getRatio = (min, max, value) => {
  return clamp((value - min) / (max - min) * PERCENTAGE_CONSTRAINT.max, PERCENTAGE_CONSTRAINT.max);
};

const RangeSlider = ({min, max, step, value, onChange}) => {
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    document.body.classList.toggle(`page-body--active`, isActive);
  }, [isActive]);

  const slideRef = useRef();

  const containerRef = useRef(null);

  const onPinMouseDown = useCallback((evt) => {
    slideRef.current = {
      startValue: value,
      startX: evt.clientX,
    };

    setActive(true);
  }, [value]);

  const onDocumentMouseMove = useCallback((evt) => {
    if (slideRef.current) {
      const {startValue, startX} = slideRef.current;
      const endX = evt.clientX;
      const minOffset = containerRef.current.offsetLeft;
      const maxOffset = minOffset + containerRef.current.offsetWidth;

      const ratioDifference = (endX - startX) / (maxOffset - minOffset);
      const valueDifference = ratioDifference * (max - min);
      const stepDifference = Math.round(valueDifference / step);
      const newValue = clamp(startValue + stepDifference * step, min, max);

      onChange(newValue);
    }
  }, [min, max, step, onChange]);

  const onDocumentMouseUp = useCallback(() => {
    if (slideRef.current) {
      slideRef.current = undefined;

      setActive(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener(`mousemove`, onDocumentMouseMove);
    document.addEventListener(`mouseup`, onDocumentMouseUp);

    return () => {
      document.removeEventListener(`mousemove`, onDocumentMouseMove);
      document.removeEventListener(`mouseup`, onDocumentMouseUp);
    };
  }, [onDocumentMouseMove, onDocumentMouseUp]);

  return (
    <div className="range-slider" ref={containerRef}>
      <div
        className="range-slider__pin"
        tabIndex="0"
        style={{left: `${clamp(getRatio(min, max, value), PERCENTAGE_CONSTRAINT.min, PERCENTAGE_CONSTRAINT.max)}%`}}
        onMouseDown={onPinMouseDown}
      ></div>
    </div>
  );
};

RangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export {RangeSlider};
