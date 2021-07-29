import React, {useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import getClassName from 'classnames';

import {formatInteger, coerceByConstraint} from '../../helpers/number-helpers';

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
  value,
  valueConstraint,
  onValueFormat,
  onValueParse,
  onValueChange,
}) => {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const onNumberInputValueChange = useCallback((state) => {
    const rawValue = state.floatValue || 0;
    setCurrentValue(onValueParse ? onValueParse(rawValue) : rawValue);
  }, [onValueParse]);

  const onNumberInputBlur = useCallback(() => {
    const newValue = coerceByConstraint(currentValue, valueConstraint);
    setCurrentValue(newValue);
    onValueChange(newValue);
  }, [onValueChange, currentValue, valueConstraint]);

  const onRangeSliderValueChange = useCallback((newValue) => {
    onValueChange(newValue);
  }, [onValueChange]);

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
  value: PropTypes.number.isRequired,
  valueConstraint: constraintType.isRequired,
  onValueFormat: PropTypes.func,
  onValueParse: PropTypes.func,
  onValueChange: PropTypes.func.isRequired,
};

export {NumberInputWithSlider};
