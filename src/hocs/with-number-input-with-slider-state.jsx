import React, {useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';

import {constraintType} from '../types/constraint-types';
import {coerceByConstraint} from '../helpers/number-helpers';

export const withNumberInputWithSliderState = (Component) => {
  const WithNumberInputWithSliderState = ({
    value,
    valueConstraint,
    onValueChange,
    onValueParse,
    ...props
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
      <Component
        value={value}
        valueConstraint={valueConstraint}

        currentValue={currentValue}
        onNumberInputValueChange={onNumberInputValueChange}
        onNumberInputBlur={onNumberInputBlur}
        onRangeSliderValueChange={onRangeSliderValueChange}
        {...props}
      />
    );
  };

  WithNumberInputWithSliderState.propTypes = {
    value: PropTypes.number.isRequired,
    valueConstraint: constraintType.isRequired,
    onValueChange: PropTypes.func.isRequired,
    onValueParse: PropTypes.func,
  };

  WithNumberInputWithSliderState.displayName = `${Component.name}${WithNumberInputWithSliderState.name}`;

  return WithNumberInputWithSliderState;
};
