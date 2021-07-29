import React, {useState, useCallback, useRef} from 'react';
import PropTypes from 'prop-types';

import {useMountedRef} from '../hooks/use-mounted-ref';
import {formDataType} from '../types/form-data-types';

export const withCreditRequestState = (Component) => {
  const WithCreditRequestState = ({
    formData,
    onSetFormData,
    onSubmit,
    ...props
  }) => {
    const isMountedRef = useMountedRef();

    const formRef = useRef(null);

    const [isError, setError] = useState(false);

    const onNameInputChange = useCallback((evt) => {
      onSetFormData({
        ...formData,
        name: evt.currentTarget.value
      });
    }, [formData, onSetFormData]);

    const onPhoneInputChange = useCallback((evt) => {
      onSetFormData({
        ...formData,
        phone: evt.currentTarget.value
      });
    }, [formData, onSetFormData]);

    const onEmailInputChange = useCallback((evt) => {
      onSetFormData({
        ...formData,
        email: evt.currentTarget.value
      });
    }, [formData, onSetFormData]);

    const onSubmitButtonClick = useCallback((evt) => {
      evt.preventDefault();

      setError(false);

      setTimeout(() => {
        if (isMountedRef.current) {
          if (!formRef.current.reportValidity()) {
            setError(true);
            return;
          }
          onSubmit();
        }
      });
    }, [isMountedRef, onSubmit]);

    const onFormSubmit = useCallback((evt) => {
      evt.preventDefault();
    }, []);

    return (
      <Component
        formData={formData}
        onSubmitButtonClick={onSubmitButtonClick}
        onFormSubmit={onFormSubmit}
        isError={isError}
        formRef={formRef}
        onNameInputChange={onNameInputChange}
        onPhoneInputChange={onPhoneInputChange}
        onEmailInputChange={onEmailInputChange}
        {...props}
      />
    );
  };

  WithCreditRequestState.propTypes = {
    formData: formDataType.isRequired,
    onSetFormData: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  WithCreditRequestState.displayName = `${Component.name}${WithCreditRequestState.name}`;

  return WithCreditRequestState;
};
