import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
// import CurrencyInput from 'react-currency-input-field';

// <CurrencyInput
//   disableAbbreviations
//   allowDecimals={false}
//   allowNegativeValue={false}
//   suffix=" рублей"
//   step={1}
//   maxLength={8}
//   groupSeparator=" "
//   value={value}
//   onValueChange={onValueChange}
// />

const NumberInput = ({
  suffix,
  min: _min,
  max: _max,
  step: _step,
  value,
  onValueChange,
  ...props
}) => {
  // const onAllowed = useCallback((state) => {
  //   return state.floatValue >= min && state.floatValue <= max;
  // }, [min, max]);

  return (
    <NumberFormat
      allowNegative={false}
      allowLeadingZeros={false}
      decimalScale={0}
      thousandSeparator=" "
      suffix={suffix}
      value={value}
      onValueChange={onValueChange}
      {...props}
    />
  );
};

NumberInput.propTypes = {
  suffix: PropTypes.string,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export {NumberInput};
