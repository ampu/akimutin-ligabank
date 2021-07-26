import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';

import {KeyboardKey} from '../constants/keyboard-key';
import {MouseButton} from '../constants/mouse-button';

import {useModal} from '../hooks/use-modal';

export const withSignInState = (Component) => {
  const WithSignInState = ({onClose, ...props}) => {
    useModal();

    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const onSubmitButtonClick = useCallback((evt) => {
      evt.preventDefault();
      onClose();
    }, [onClose]);

    const onPasswordToggleButtonMouseDown = (evt) => {
      if (evt.button === MouseButton.PRIMARY) {
        setPasswordVisible(true);
        document.addEventListener(`mouseup`, onDocumentMouseUp);
      }
    };

    const onDocumentMouseUp = useCallback(() => {
      setPasswordVisible(false);
      document.removeEventListener(`mouseup`, onDocumentMouseUp);
    }, []);

    const onPasswordToggleKeyDown = (evt) => {
      if (evt.key === KeyboardKey.SPACE) {
        setPasswordVisible(true);
        document.addEventListener(`keyup`, onDocumentKeyUp);
      }
    };

    const onDocumentKeyUp = useCallback(() => {
      setPasswordVisible(false);
      document.removeEventListener(`keyup`, onDocumentKeyUp);
    }, []);

    return (
      <Component
        onSubmitButtonClick={onSubmitButtonClick}
        isPasswordVisible={isPasswordVisible}
        onPasswordToggleButtonMouseDown={onPasswordToggleButtonMouseDown}
        onPasswordToggleKeyDown={onPasswordToggleKeyDown}
        onClose={onClose}
        {...props}
      />
    );
  };

  WithSignInState.propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  WithSignInState.displayName = `${Component.name}${WithSignInState.name}`;

  return WithSignInState;
};
