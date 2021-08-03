import React from 'react';
import PropTypes from 'prop-types';
import getClassName from 'classnames';

import {useAutoFocus} from '../../hooks/use-auto-focus';
import {withSelectState} from '../../hocs/with-select-state';

import {refType} from '../../types/ref-types';

const Select = ({
  name,
  options,
  value,

  containerRef,
  selectRef,
  isActive,
  onSelectChange,
  onSelectMouseDown,
  onSelectKeyDown,
  onButtonClick,
  onButtonKeyDown,

  ...props
}) => {
  useAutoFocus(containerRef, isActive);

  return (
    <div
      ref={containerRef}
      className={getClassName(`select`, isActive && `active`)}
      {...props}
    >
      <select
        ref={selectRef}
        name={name}
        value={value}
        onChange={onSelectChange}
        onMouseDown={onSelectMouseDown}
        onKeyDown={onSelectKeyDown}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.title}
          </option>
        ))}
      </select>
      {isActive && (
        <ul>
          {options.map((option, optionIndex) => (
            <li
              key={option.value}
              className={getClassName(value === option.value && `active`)}
            >
              <button
                type="button"
                data-index={optionIndex}
                data-value={option.value}
                onClick={onButtonClick}
                onKeyDown={onButtonKeyDown}
                data-auto-focus={value === option.value ? true : undefined}
              >
                {option.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Select.propTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    title: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  value: PropTypes.string.isRequired,

  containerRef: refType.isRequired,
  selectRef: refType.isRequired,
  isActive: PropTypes.bool.isRequired,
  onSelectChange: PropTypes.func.isRequired,
  onSelectKeyDown: PropTypes.func.isRequired,
  onSelectMouseDown: PropTypes.func.isRequired,
  onButtonKeyDown: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

const SelectWithSelectState = withSelectState(Select);

export {Select, SelectWithSelectState};
