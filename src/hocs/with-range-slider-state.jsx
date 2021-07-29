import React, {useState, useEffect, useCallback, useRef} from 'react';
import PropTypes from 'prop-types';

import {KeyboardKey} from '../constants/keyboard-key';
import {coerceByConstraint} from '../helpers/number-helpers';
import {constraintType} from '../types/constraint-types';

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
        const {startValue, startX} = slideRef.current;
        const endX = evt.clientX;
        const minOffset = containerRef.current.offsetLeft;
        const maxOffset = minOffset + containerRef.current.offsetWidth;

        const ratioDifference = (endX - startX) / (maxOffset - minOffset);
        const valueDifference = ratioDifference * (valueConstraint.max - valueConstraint.min);
        const stepDifference = Math.round(valueDifference / valueConstraint.step);
        const newValue = coerceByConstraint(startValue + stepDifference * valueConstraint.step, valueConstraint);

        onValueChange(newValue);
      }
    }, [valueConstraint, onValueChange]);

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
      <Component
        valueConstraint={valueConstraint}
        value={value}

        containerRef={containerRef}
        onPinKeyDown={onPinKeyDown}
        onPinMouseDown={onPinMouseDown}
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
