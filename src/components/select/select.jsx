import React, {useRef, useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import getClassName from 'classnames';

import {MouseButton} from '../../constants/mouse-button';
import {KeyboardKey} from '../../constants/keyboard-key';
import {onNoop} from '../../helpers/callback-helpers';
import {coerceArrayIndex} from '../../helpers/number-helpers';

const Select = ({name, options, value, onValueChange, ...props}) => {
  const containerRef = useRef(null);
  const selectRef = useRef(null);

  const [isActive, setActive] = useState(false);

  useEffect(() => {
    if (!isActive) {
      return onNoop;
    }
    const onDocumentKeyDown = (evt) => {
      if (evt.key === KeyboardKey.ESCAPE) {
        evt.preventDefault();
        evt.stopPropagation();
        selectRef.current.focus();
        setActive(false);
      }
    };
    document.addEventListener(`keydown`, onDocumentKeyDown);

    return () => {
      document.removeEventListener(`keydown`, onDocumentKeyDown);
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive) {
      return onNoop;
    }
    const onDocumentMouseDown = (evt) => {
      if (evt.button === MouseButton.PRIMARY) {
        if (!containerRef.current.contains(evt.target)) {
          setActive(false);
        }
      }
    };
    document.addEventListener(`mousedown`, onDocumentMouseDown);

    return () => {
      document.removeEventListener(`mousedown`, onDocumentMouseDown);
    };
  }, [isActive]);

  const onSelectMouseDown = useCallback((evt) => {
    if (evt.button === MouseButton.PRIMARY) {
      evt.preventDefault();
      setActive(true);
    }
  }, []);

  const onSelectKeyDown = useCallback((evt) => {
    if (evt.key === KeyboardKey.SPACE) {
      evt.preventDefault();
      setActive(true);
    }
  }, []);

  const onItemClick = useCallback((evt) => {
    selectRef.current.focus();
    setActive(false);
    onValueChange(evt.currentTarget.dataset.value);
  }, [onValueChange]);

  const onItemKeyDown = useCallback((evt) => {
    if (evt.key === KeyboardKey.ARROW_UP || evt.key === KeyboardKey.ARROW_DOWN) {
      evt.preventDefault();

      const rawNextOptionIndex = +evt.currentTarget.dataset.index + (evt.key === KeyboardKey.ARROW_UP ? -1 : 1);
      const nextOptionIndex = coerceArrayIndex(rawNextOptionIndex, options);
      const optionElement = containerRef.current.querySelector(`li:nth-of-type(${nextOptionIndex + 1}) button`);
      optionElement.focus();
    }
  }, [options]);

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
                onClick={onItemClick}
                onKeyDown={onItemKeyDown}
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
};

export {Select};