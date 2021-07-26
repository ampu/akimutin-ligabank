import React, {useRef, useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import getClassName from 'classnames';

import {MouseButton} from '../../constants/mouse-button';
import {KeyboardKey} from '../../constants/keyboard-key';
import {onNoop} from '../../helpers/callback-helpers';

const Select = ({name, options, value, onValueChange, ...props}) => {
  const containerRef = useRef(null);

  const [isActive, setActive] = useState(false);

  useEffect(() => {
    if (!isActive) {
      return onNoop;
    }
    const onDocumentKeyDown = (evt) => {
      if (evt.key === KeyboardKey.ESCAPE) {
        evt.preventDefault();
        evt.stopPropagation();
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

  const onItemClick = useCallback((evt) => {
    setActive(false);
    onValueChange(evt.currentTarget.dataset.value);
  }, [onValueChange]);

  return (
    <div
      ref={containerRef}
      className={getClassName(`select`, isActive && `active`)}
      {...props}
    >
      <select
        name={name}
        value={value}
        onChange={onValueChange}
        onMouseDown={onSelectMouseDown}
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
      <ul>
        {options.map((option) => (
          <li
            key={option.value}
            className={getClassName(value === option.value && `active`)}
            data-value={option.value}
            onClick={onItemClick}
          >
            {option.title}
          </li>
        ))}
      </ul>
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
