import React, {useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';

import {constraintType} from '../types/constraint-types';

export const withIncrementalNumberInputState = (Component) => {
  const WithIncrementalNumberInputState = ({
    value,
    valueConstraint,
    onValueChange,
    ...props
  }) => {
    const [currentValue, setCurrentValue] = useState(value);

    useEffect(() => {
      setCurrentValue(value);
    }, [value]);

    const onNumberInputValueChange = useCallback((state) => {
      setCurrentValue(state.floatValue || 0);
    }, []);

    const onNumberInputBlur = useCallback(() => {
      onValueChange(currentValue);
    }, [onValueChange, currentValue]);

    const onDecrementClick = useCallback(() => {
      onValueChange(currentValue < valueConstraint.step ? 0 : currentValue - valueConstraint.step);
    }, [currentValue, valueConstraint, onValueChange]);

    const onIncrementClick = useCallback(() => {
      onValueChange(currentValue + valueConstraint.step);
    }, [currentValue, valueConstraint, onValueChange]);

    return (
      <Component
        value={value}
        valueConstraint={valueConstraint}

        currentValue={currentValue}
        onNumberInputValueChange={onNumberInputValueChange}
        onNumberInputBlur={onNumberInputBlur}
        onDecrementClick={onDecrementClick}
        onIncrementClick={onIncrementClick}
        {...props}
      />
    );
  };

  WithIncrementalNumberInputState.propTypes = {
    value: PropTypes.number.isRequired,
    valueConstraint: constraintType.isRequired,
    onValueChange: PropTypes.func.isRequired,
  };

  WithIncrementalNumberInputState.displayName = `${Component.name}${WithIncrementalNumberInputState.name}`;

  return WithIncrementalNumberInputState;
};
