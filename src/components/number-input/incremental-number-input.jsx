import React from 'react';
import PropTypes from 'prop-types';
import getClassName from 'classnames';

import {formatInteger, isValidByConstraint} from '../../helpers/number-helpers';

import {withIncrementalNumberInputState} from '../../hocs/with-incremental-number-input-state';
import {NumberInput} from './number-input';
import {ReactComponent as MinusIcon} from '../../images/minus-icon.svg';
import {ReactComponent as PlusIcon} from '../../images/plus-icon.svg';

import {constraintType} from '../../types/constraint-types';

const IncrementalNumberInput = ({
  autoFocus,
  inputId,
  inputName,
  labelText,
  suffix,
  onGetSuffix,
  className,
  value,
  valueConstraint,

  currentValue,
  onNumberInputValueChange,
  onNumberInputBlur,
  onDecrementClick,
  onIncrementClick,
}) => {
  const isValidValue = isValidByConstraint(value, valueConstraint);

  const containerClassName = getClassName({
    [`incremental-number-input`]: true,
    [`error`]: !isValidValue,
  }, className);

  return (
    <div className={containerClassName}>
      <label htmlFor={inputId}>{labelText}</label>
      <div>
        <button
          type="button"
          className="incremental-number-input__decrement"
          onClick={onDecrementClick}
        >
          <MinusIcon/>
          <span className="visually-hidden">Уменьшить</span>
        </button>

        <NumberInput
          autoFocus={autoFocus}
          id={inputId}
          name={inputName}
          suffix={onGetSuffix ? onGetSuffix(currentValue) : suffix}
          value={currentValue}
          max={valueConstraint.max}
          onValueChange={onNumberInputValueChange}
          onBlur={onNumberInputBlur}
        />

        {!isValidValue && (
          <span className="incremental-number-input__error">некорректное значение</span>
        )}

        <button
          type="button"
          className="incremental-number-input__increment"
          onClick={onIncrementClick}
        >
          <PlusIcon/>
          <span className="visually-hidden">Увеличить</span>
        </button>
      </div>
      <p>
        От {formatInteger(valueConstraint.min)}&nbsp;&nbsp;до {formatInteger(valueConstraint.max)}
        {onGetSuffix ? onGetSuffix(valueConstraint.max) : suffix}
      </p>
    </div>
  );
};

IncrementalNumberInput.propTypes = {
  autoFocus: PropTypes.bool,
  inputId: PropTypes.string.isRequired,
  inputName: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  suffix: PropTypes.string,
  onGetSuffix: PropTypes.func,
  className: PropTypes.string,
  value: PropTypes.number.isRequired,
  valueConstraint: constraintType.isRequired,

  currentValue: PropTypes.number.isRequired,
  onNumberInputValueChange: PropTypes.func.isRequired,
  onNumberInputBlur: PropTypes.func.isRequired,
  onDecrementClick: PropTypes.func.isRequired,
  onIncrementClick: PropTypes.func.isRequired,
};

const IncrementalNumberInputWithIncrementalNumberInputState = withIncrementalNumberInputState(IncrementalNumberInput);

export {IncrementalNumberInput, IncrementalNumberInputWithIncrementalNumberInputState};
