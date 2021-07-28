import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import getClassName from 'classnames';

import {formatInteger} from '../../helpers/number-helpers';

import {NumberInput} from './number-input';
import {RangeSliderWithRangeSliderState as RangeSlider} from '../range-slider/range-slider';

import {constraintShape} from '../../types/constraint-types';

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
  value,
  valueConstraint,
  onValueFormat,
  onValueParse,
  onValueChange,
}) => {
  const currentValueRef = useRef(value);

  const onNumberInputValueChange = (state) => {
    currentValueRef.current = state.floatValue || 0;
  };

  const onNumberInputBlur = () => {
    onValueChange(onValueParse ? onValueParse(currentValueRef.current) : currentValueRef.current);
  };

  const onRangeSliderValueChange = (newValue) => {
    onValueChange(newValue);
  };

  return (
    <div className={getClassName(`number-input-with-slider`, className)}>
      <label htmlFor={inputId}>{labelText}</label>
      <NumberInput
        id={inputId}
        name={inputName}
        suffix={onGetValueSuffix ? onGetValueSuffix(value) : valueSuffix}
        value={onValueFormat ? onValueFormat(value) : value}
        max={onValueFormat ? onValueFormat(valueConstraint.max) : valueConstraint.max}
        onValueChange={onNumberInputValueChange}
        onBlur={onNumberInputBlur}
      />
      <RangeSlider
        valueConstraint={valueConstraint}
        value={value}
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
  value: PropTypes.number.isRequired,
  valueConstraint: constraintShape.isRequired,
  onValueFormat: PropTypes.func,
  onValueParse: PropTypes.func,
  onValueChange: PropTypes.func.isRequired,
};

export {NumberInputWithSlider};
