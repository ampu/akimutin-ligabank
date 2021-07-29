import React, {useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';

import {KeyboardKey} from '../constants/keyboard-key';
import {MouseButton} from '../constants/mouse-button';
import {signInStore} from '../helpers/sign-in-store';
import {onNoop} from '../helpers/callback-helpers';

import {useModal} from '../hooks/use-modal';
import {useBounce} from '../hooks/use-bounce';
import {useMountedRef} from '../hooks/use-mounted-ref';

import {refShape} from '../types/ref-types';

export const withSignInState = (Component) => {
  const WithSignInState = ({onClose, popupRef, ...props}) => {
    const isMountedRef = useMountedRef();

    const isBounce = useBounce();

    const [isError, setError] = useState(false);

    const [isPasswordVisibleByMouse, setPasswordVisibleByMouse] = useState(false);
    const [isPasswordVisibleByKeyboard, setPasswordVisibleByKeyboard] = useState(false);

    const [signInData, setSignInData] = useState({});

    useEffect(() => {
      setSignInData(signInStore.getMap());
    }, []);

    useModal();

    const onSubmitButtonClick = useCallback((evt) => {
      evt.preventDefault();
      setError(false);

      setTimeout(() => {
        if (isMountedRef.current) {
          if (!popupRef.current.reportValidity()) {
            setError(true);
            return;
          }
          const formData = new FormData(popupRef.current);

          const newSignInData = {
            login: formData.get(`login`),
            password: formData.get(`password`),
          };

          signInStore.patchMap(newSignInData);

          onClose();
        }
      });
    }, [isMountedRef, popupRef, onClose]);

    const onFormSubmit = useCallback((evt) => {
      evt.preventDefault();
    }, []);

    const onPasswordToggleButtonMouseDown = useCallback((evt) => {
      if (evt.button === MouseButton.PRIMARY) {
        setPasswordVisibleByMouse(true);
      }
    }, []);

    const onDocumentMouseUp = useCallback(() => {
      setPasswordVisibleByMouse(false);
    }, []);

    useEffect(() => {
      if (!isPasswordVisibleByMouse) {
        return onNoop;
      }
      document.addEventListener(`mouseup`, onDocumentMouseUp);

      return () => {
        document.removeEventListener(`mouseup`, onDocumentMouseUp);
      };
    }, [isPasswordVisibleByMouse, onDocumentMouseUp]);

    const onPasswordToggleKeyDown = useCallback((evt) => {
      if (evt.key === KeyboardKey.SPACE) {
        setPasswordVisibleByKeyboard(true);
      }
    }, []);

    const onDocumentKeyUp = useCallback(() => {
      setPasswordVisibleByKeyboard(false);
    }, []);

    useEffect(() => {
      if (!isPasswordVisibleByKeyboard) {
        return onNoop;
      }
      document.addEventListener(`keyup`, onDocumentKeyUp);

      return () => {
        document.removeEventListener(`keyup`, onDocumentKeyUp);
      };
    }, [isPasswordVisibleByKeyboard, onDocumentKeyUp]);

    return (
      <Component
        popupRef={popupRef}
        onSubmitButtonClick={onSubmitButtonClick}
        onFormSubmit={onFormSubmit}
        isPasswordVisible={isPasswordVisibleByMouse || isPasswordVisibleByKeyboard}
        onPasswordToggleButtonMouseDown={onPasswordToggleButtonMouseDown}
        onPasswordToggleKeyDown={onPasswordToggleKeyDown}
        onClose={onClose}
        isBounce={isBounce}
        isError={isError}
        signInData={signInData}
        {...props}
      />
    );
  };

  WithSignInState.propTypes = {
    onClose: PropTypes.func.isRequired,
    popupRef: refShape.isRequired,
  };

  WithSignInState.displayName = `${Component.name}${WithSignInState.name}`;

  return WithSignInState;
};
