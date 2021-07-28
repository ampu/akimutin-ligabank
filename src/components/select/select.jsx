import React from 'react';
import PropTypes from 'prop-types';
import getClassName from 'classnames';

import {withSelectState} from '../../hocs/with-select-state';

import {refShape} from '../../types/ref-types';

const Select = ({
  name,
  options,
  value,
  onValueChange,

  containerRef,
  selectRef,
  isActive,
  onSelectMouseDown,
  onSelectKeyDown,
  onButtonClick,
  onButtonKeyDown,

  ...props
}) => {
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
        onChange={onValueChange}
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
                autoFocus={value === option.value}
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
  onValueChange: PropTypes.func.isRequired,

  containerRef: refShape.isRequired,
  selectRef: refShape.isRequired,
  isActive: PropTypes.bool.isRequired,
  onSelectKeyDown: PropTypes.func.isRequired,
  onSelectMouseDown: PropTypes.func.isRequired,
  onButtonKeyDown: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

const SelectWithSelectState = withSelectState(Select);

export {Select, SelectWithSelectState};
