import React, {useState, useEffect, useCallback, useRef} from 'react';
import PropTypes from 'prop-types';

import {onNoop} from '../helpers/callback-helpers';
import {KeyboardKey} from '../constants/keyboard-key';
import {MouseButton} from '../constants/mouse-button';
import {coerceArrayIndex} from '../helpers/number-helpers';

export const withSelectState = (Component) => {
  const WithSelectState = ({
    options,
    onValueChange,
    ...props
  }) => {
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

    const onSelectChange = useCallback((evt) => {
      onValueChange(evt.currentTarget.value);
    }, []);

    const onSelectMouseDown = useCallback((evt) => {
      if (evt.button === MouseButton.PRIMARY) {
        evt.preventDefault();
        setActive(true);
      }
    }, []);

    const onSelectKeyDown = useCallback((evt) => {
      if ([KeyboardKey.SPACE, KeyboardKey.ARROW_UP, KeyboardKey.ARROW_DOWN].includes(evt.key)) {
        evt.preventDefault();
        setActive(true);
      }
    }, []);

    const onButtonClick = useCallback((evt) => {
      selectRef.current.focus();
      setActive(false);
      onValueChange(evt.currentTarget.dataset.value);
    }, [onValueChange]);

    const onButtonKeyDown = useCallback((evt) => {
      if ([KeyboardKey.ARROW_UP, KeyboardKey.ARROW_DOWN].includes(evt.key)) {
        evt.preventDefault();

        const rawNextOptionIndex = +evt.currentTarget.dataset.index + (evt.key === KeyboardKey.ARROW_UP ? -1 : 1);
        const nextOptionIndex = coerceArrayIndex(rawNextOptionIndex, options);
        const optionElement = containerRef.current.querySelector(`li:nth-of-type(${nextOptionIndex + 1}) button`);
        optionElement.focus();
      }
    }, [options]);

    return (
      <Component
        options={options}

        containerRef={containerRef}
        selectRef={selectRef}
        isActive={isActive}
        onSelectChange={onSelectChange}
        onSelectMouseDown={onSelectMouseDown}
        onSelectKeyDown={onSelectKeyDown}
        onButtonClick={onButtonClick}
        onButtonKeyDown={onButtonKeyDown}

        {...props}
      />
    );
  };

  WithSelectState.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
      title: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    onValueChange: PropTypes.func.isRequired,
  };

  WithSelectState.displayName = `${Component.name}${WithSelectState.name}`;

  return WithSelectState;
};
