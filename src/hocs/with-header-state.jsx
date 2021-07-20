import React, {useState, useCallback} from 'react';

import {useMobileModal} from '../hooks/use-mobile-modal';

export const withHeaderState = (Component) => {
  const WithHeaderState = (props) => {
    const [isActive, setActive] = useState(false);

    useMobileModal(isActive);

    const onToggleButtonClick = useCallback(() => {
      setActive((previousActive) => !previousActive);
    }, []);

    const onCloseButtonClick = useCallback(() => {
      setActive(false);
    }, []);

    const [isSignInActive, setSignInActive] = useState(false);

    const onSignInLinkClick = useCallback((evt) => {
      evt.preventDefault();
      setSignInActive(true);
    }, []);

    const onSignInClose = useCallback(() => {
      setSignInActive(false);
    }, []);

    return (
      <Component
        isActive={isActive}
        onToggleButtonClick={onToggleButtonClick}
        onCloseButtonClick={onCloseButtonClick}
        isSignInActive={isSignInActive}
        onSignInLinkClick={onSignInLinkClick}
        onSignInClose={onSignInClose}
        {...props}
      />
    );
  };

  WithHeaderState.displayName = `${Component.name}${WithHeaderState.name}`;

  return WithHeaderState;
};
