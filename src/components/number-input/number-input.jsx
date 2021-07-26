import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

import {formatInteger} from '../../helpers/number-helpers';

const NumberInput = ({
  suffix,
  value,
  max,
  onValueChange,
  ...props
}) => {
  return (
    <NumberFormat
      className="number-input"
      allowNegative={false}
      allowLeadingZeros={false}
      decimalScale={0}
      thousandSeparator=" "
      suffix={suffix}
      value={value}
      maxLength={(formatInteger(max) + suffix).length}
      onValueChange={onValueChange}
      {...props}
    />
  );
};

NumberInput.propTypes = {
  suffix: PropTypes.string,
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export {NumberInput};
