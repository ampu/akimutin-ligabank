import React from 'react';
import PropTypes from 'prop-types';

import {PERCENTAGE_CONSTRAINT} from '../../constants/percentage-constraint';
import {coerceByConstraint} from '../../helpers/number-helpers';

import {withRangeSliderState} from '../../hocs/with-range-slider-state';
import {refShape} from '../../types/ref-types';
import {constraintShape} from '../../types/constraint-types';

const getRatio = (value, {min, max}) => {
  return coerceByConstraint((value - min) / (max - min) * PERCENTAGE_CONSTRAINT.max, PERCENTAGE_CONSTRAINT);
};

const RangeSlider = ({
  valueConstraint,
  value,

  containerRef,
  onPinKeyDown,
  onPinMouseDown,
}) => {
  return (
    <div className="range-slider" ref={containerRef}>
      <div
        className="range-slider__pin"
        tabIndex="0"
        style={{left: `${coerceByConstraint(getRatio(value, valueConstraint), PERCENTAGE_CONSTRAINT)}%`}}
        onKeyDown={onPinKeyDown}
        onMouseDown={onPinMouseDown}
      ></div>
    </div>
  );
};

RangeSlider.propTypes = {
  valueConstraint: constraintShape.isRequired,
  value: PropTypes.number.isRequired,

  containerRef: refShape.isRequired,
  onPinKeyDown: PropTypes.func.isRequired,
  onPinMouseDown: PropTypes.func.isRequired,
};

const RangeSliderWithRangeSliderState = withRangeSliderState(RangeSlider);

export {RangeSlider, RangeSliderWithRangeSliderState};
