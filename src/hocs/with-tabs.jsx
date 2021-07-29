import React, {useCallback, useRef} from 'react';
import PropTypes from 'prop-types';
import {last as getLast} from 'lodash';

import {KeyboardKey} from '../constants/keyboard-key';

const INTERACTIVE_ELEMENTS = [`a`, `button`, `input`, `select`, `textarea`, `[tabindex]`];

const queryFirstInteractiveElement = (container) => {
  return container.querySelector(INTERACTIVE_ELEMENTS.join(`, `));
};

const queryLastInteractiveElement = (container) => {
  return getLast(container.querySelectorAll(INTERACTIVE_ELEMENTS.join(`, `)));
};

const focusElement = (element) => {
  if (element) {
    element.focus();
  }
  return element;
};

const focusControlButton = (controls, childIndex) => {
  controls.children[childIndex].querySelector(`button`).focus();
};

export const withTabs = (Component, slidesCount) => {
  const WithTabs = ({
    activeSlideIndex,
    ...props
  }) => {
    const controlsRef = useRef(null);
    const itemsRef = useRef(null);

    const onControlButtonFocus = useCallback((evt) => {
      evt.currentTarget.click();
    }, []);

    const onControlButtonKeyDown = useCallback((evt) => {
      if (evt.key === KeyboardKey.TAB) {
        if (evt.shiftKey) {
          return;
        }
        if (focusElement(queryFirstInteractiveElement(itemsRef.current.children[activeSlideIndex]))) {
          evt.preventDefault();
        }
      }
    }, [activeSlideIndex]);

    const onItemKeyDown = useCallback((evt) => {
      if (evt.key === KeyboardKey.TAB) {
        if (evt.shiftKey) {
          if (activeSlideIndex === 0) {
            return;
          }
          const firstInteractiveElement = queryLastInteractiveElement(itemsRef.current.children[activeSlideIndex]);
          if (!firstInteractiveElement || !firstInteractiveElement.contains(evt.target)) {
            return;
          }
          evt.preventDefault();
          focusControlButton(controlsRef.current, activeSlideIndex);
          return;
        }

        if (activeSlideIndex === slidesCount - 1) {
          return;
        }
        const lastInteractiveElement = queryLastInteractiveElement(itemsRef.current.children[activeSlideIndex]);
        if (!lastInteractiveElement || !lastInteractiveElement.contains(evt.target)) {
          return;
        }
        evt.preventDefault();
        focusControlButton(controlsRef.current, activeSlideIndex + 1);
      }
    }, [activeSlideIndex]);

    return (
      <Component
        activeSlideIndex={activeSlideIndex}
        controlsRef={controlsRef}
        itemsRef={itemsRef}
        onControlButtonFocus={onControlButtonFocus}
        onControlButtonKeyDown={onControlButtonKeyDown}
        onItemKeyDown={onItemKeyDown}
        {...props}
      />
    );
  };

  WithTabs.propTypes = {
    activeSlideIndex: PropTypes.number.isRequired,
  };

  WithTabs.displayName = `${Component.name}${WithTabs.name}`;

  return WithTabs;
};
