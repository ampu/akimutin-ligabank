import React from 'react';
import PropTypes from 'prop-types';
import getClassName from 'classnames';

import {formatInteger} from '../../helpers/number-helpers';

import {withNumberInputWithSliderState} from '../../hocs/with-number-input-with-slider-state';
import {NumberInput} from './number-input';
import {RangeSliderWithRangeSliderState as RangeSlider} from '../range-slider/range-slider';

import {constraintType} from '../../types/constraint-types';

const NumberInputWithSlider = ({
  inputId,
  inputName,
  labelText,
  className,
  valueSuffix,
  onGetValueSuffix,
  legendSuffix,
  onGetLegendSuffix,
  skipMaxLegend,
  valueConstraint,
  onValueFormat,

  currentValue,
  onNumberInputValueChange,
  onNumberInputBlur,
  onRangeSliderValueChange,
}) => {
  return (
    <div className={getClassName(`number-input-with-slider`, className)}>
      <label htmlFor={inputId}>{labelText}</label>
      <NumberInput
        id={inputId}
        name={inputName}
        suffix={onGetValueSuffix ? onGetValueSuffix(onValueFormat ? onValueFormat(currentValue) : currentValue) : valueSuffix}
        value={onValueFormat ? onValueFormat(currentValue) : currentValue}
        max={onValueFormat ? onValueFormat(valueConstraint.max) : valueConstraint.max}
        onValueChange={onNumberInputValueChange}
        onBlur={onNumberInputBlur}
      />
      <RangeSlider
        valueConstraint={valueConstraint}
        value={currentValue}
        onValueChange={onRangeSliderValueChange}
      />
      {skipMaxLegend
        ? (
          <p>{formatInteger(valueConstraint.min)}{onGetLegendSuffix ? onGetLegendSuffix(valueConstraint.min) : legendSuffix}</p>
        )
        : (
          <p>
            <span>{formatInteger(valueConstraint.min)}{onGetLegendSuffix ? onGetLegendSuffix(valueConstraint.min) : legendSuffix}</span>
            <span>{formatInteger(valueConstraint.max)}{onGetLegendSuffix ? onGetLegendSuffix(valueConstraint.max) : legendSuffix}</span>
          </p>
        )
      }
    </div>
  );
};

NumberInputWithSlider.propTypes = {
  inputId: PropTypes.string.isRequired,
  inputName: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  className: PropTypes.string,
  valueSuffix: PropTypes.string,
  onGetValueSuffix: PropTypes.func,
  legendSuffix: PropTypes.string,
  onGetLegendSuffix: PropTypes.func,
  skipMaxLegend: PropTypes.bool,
  valueConstraint: constraintType.isRequired,
  onValueFormat: PropTypes.func,

  currentValue: PropTypes.number.isRequired,
  onNumberInputValueChange: PropTypes.func.isRequired,
  onNumberInputBlur: PropTypes.func.isRequired,
  onRangeSliderValueChange: PropTypes.func.isRequired,
};

const NumberInputWithSliderWithNumberInputWithSliderState = withNumberInputWithSliderState(NumberInputWithSlider);

export {NumberInputWithSlider, NumberInputWithSliderWithNumberInputWithSliderState};
