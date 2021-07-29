import React, {useState, useEffect, useCallback, useRef} from 'react';
import PropTypes from 'prop-types';

import {KeyboardKey} from '../constants/keyboard-key';
import {coerceByConstraint} from '../helpers/number-helpers';
import {onNoop} from '../helpers/callback-helpers';

import {constraintType} from '../types/constraint-types';

const calculateNewValue = (container, {startValue, startX}, endX, valueConstraint) => {
  const minOffset = container.offsetLeft;
  const maxOffset = minOffset + container.offsetWidth;

  const ratioDifference = (endX - startX) / (maxOffset - minOffset);
  const valueDifference = ratioDifference * (valueConstraint.max - valueConstraint.min);
  const stepDifference = Math.round(valueDifference / valueConstraint.step);

  return coerceByConstraint(startValue + stepDifference * valueConstraint.step, valueConstraint);
};

export const withRangeSliderState = (Component) => {
  const WithRangeSliderState = ({
    valueConstraint,
    value,
    onValueChange,
    ...props
  }) => {
    const [isActive, setActive] = useState(false);

    useEffect(() => {
      document.body.classList.toggle(`page-body--active`, isActive);
    }, [isActive]);

    const slideRef = useRef();

    const containerRef = useRef(null);

    const onPinKeyDown = useCallback((evt) => {
      switch (evt.key) {
        case KeyboardKey.ARROW_LEFT:
          onValueChange(coerceByConstraint(value - valueConstraint.step, valueConstraint));
          break;

        case KeyboardKey.ARROW_RIGHT:
          onValueChange(coerceByConstraint(value + valueConstraint.step, valueConstraint));
          break;
      }
    }, [valueConstraint, value, onValueChange]);

    const onPinMouseDown = useCallback((evt) => {
      slideRef.current = {
        startValue: value,
        startX: evt.clientX,
      };

      setActive(true);
    }, [value]);

    const onDocumentMouseMove = useCallback((evt) => {
      if (slideRef.current) {
        onValueChange(calculateNewValue(containerRef.current, slideRef.current, evt.clientX, valueConstraint));
      }
    }, [valueConstraint, onValueChange]);

    const onDocumentMouseUp = useCallback(() => {
      if (slideRef.current) {
        slideRef.current = undefined;

        setActive(false);
      }
    }, []);

    const onPinTouchStart = useCallback((evt) => {
      slideRef.current = {
        startValue: value,
        startX: evt.targetTouches[0].clientX,
      };

      setActive(true);
    }, [value]);

    const onDocumentTouchMove = useCallback((evt) => {
      if (slideRef.current) {
        onValueChange(calculateNewValue(containerRef.current, slideRef.current, evt.targetTouches[0].clientX, valueConstraint));
      }
    }, [valueConstraint, onValueChange]);

    const onDocumentTouchEnd = useCallback(() => {
      if (slideRef.current) {
        slideRef.current = undefined;

        setActive(false);
      }
    }, []);

    useEffect(() => {
      if (!isActive) {
        return onNoop;
      }
      document.addEventListener(`mousemove`, onDocumentMouseMove);
      document.addEventListener(`mouseup`, onDocumentMouseUp);
      document.addEventListener(`touchmove`, onDocumentTouchMove);
      document.addEventListener(`touchend`, onDocumentTouchEnd);

      return () => {
        document.removeEventListener(`mousemove`, onDocumentMouseMove);
        document.removeEventListener(`mouseup`, onDocumentMouseUp);
        document.removeEventListener(`touchmove`, onDocumentTouchMove);
        document.removeEventListener(`touchend`, onDocumentTouchEnd);
      };
    }, [isActive, onDocumentMouseMove, onDocumentMouseUp, onDocumentTouchMove, onDocumentTouchEnd]);

    return (
      <Component
        valueConstraint={valueConstraint}
        value={value}

        containerRef={containerRef}
        onPinKeyDown={onPinKeyDown}
        onPinMouseDown={onPinMouseDown}
        onPinTouchStart={onPinTouchStart}
        {...props}
      />
    );
  };

  WithRangeSliderState.propTypes = {
    valueConstraint: constraintType.isRequired,
    value: PropTypes.number.isRequired,
    onValueChange: PropTypes.func.isRequired,
  };

  WithRangeSliderState.displayName = `${Component.name}${WithRangeSliderState.name}`;

  return WithRangeSliderState;
};
