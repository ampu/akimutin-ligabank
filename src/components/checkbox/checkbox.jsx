import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({
  inputName,
  labelText,
  isChecked,
  onCheckedChange,
}) => {
  const onInputChange = (evt) => {
    onCheckedChange(evt.currentTarget.checked);
  };

  return (
    <label className="checkbox">
      <input
        type="checkbox"
        name={inputName}
        checked={isChecked}
        onChange={onInputChange}
      />
      <span>{labelText}</span>
    </label>
  );
};

Checkbox.propTypes = {
  inputName: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onCheckedChange: PropTypes.func.isRequired,
};

export {Checkbox};
