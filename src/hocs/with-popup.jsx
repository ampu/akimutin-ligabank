import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

import {KeyboardKey} from '../constants/keyboard-key';

import {useModal} from '../hooks/use-modal';
import {useKeyDownStack} from '../hooks/use-key-down-stack';

export const withPopup = (Component) => {
  const WithPopup = ({onClose, ...props}) => {
    useModal();

    const onCloseButtonClick = useCallback(() => {
      onClose();
    }, [onClose]);

    const onDocumentKeyDown = useCallback((evt) => {
      if (evt.key === KeyboardKey.ESCAPE) {
        evt.preventDefault();
        evt.stopPropagation();
        onClose();
      }
    }, [onClose]);

    useKeyDownStack(onDocumentKeyDown);

    return (
      <Component
        onCloseButtonClick={onCloseButtonClick}
        {...props}
      />
    );
  };

  WithPopup.propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  WithPopup.displayName = `${Component.name}${WithPopup.name}`;

  return WithPopup;
};
