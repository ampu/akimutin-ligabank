import React, {useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';

import {KeyboardKey} from '../constants/keyboard-key';
import {MouseButton} from '../constants/mouse-button';
import {signInStore} from "../helpers/sign-in-store";

import {useModal} from '../hooks/use-modal';
import {useBounce} from '../hooks/use-bounce';
import {useMountedRef} from '../hooks/use-mounted-ref';

import {refShape} from '../types/ref-types';

export const withSignInState = (Component) => {
  const WithSignInState = ({onClose, popupRef, ...props}) => {
    const isMountedRef = useMountedRef();

    const isBounce = useBounce();

    const [isError, setError] = useState(false);

    const [isPasswordVisible, setPasswordVisible] = useState(false);

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
        popupRef={popupRef}
        onSubmitButtonClick={onSubmitButtonClick}
        isPasswordVisible={isPasswordVisible}
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
