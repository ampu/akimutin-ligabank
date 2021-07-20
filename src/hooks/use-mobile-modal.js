import {useEffect} from 'react';

export const useMobileModal = (isActive) => {
  useEffect(() => {
    document.body.classList.toggle(`page-body--mobile-modal`, isActive);

    return () => {
      document.body.classList.toggle(`page-body--mobile-modal`, !isActive);
    };
  }, [isActive]);
};
