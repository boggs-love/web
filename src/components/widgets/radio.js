import React from 'react';
import PropTypes from 'prop-types';

const Radio = ({
  options,
  value,
  required,
  disabled,
  readonly,
  onChange,
}) => {
  // Generating a unique field name to identify this set of radio buttons
  const name = Math.random().toString();
  const { enumOptions, inline } = options;
  const inlineCls = inline ? 'form-check-inline' : '';
  // checked={checked} has been moved above name={name}, As mentioned in #349;
  // this is a temporary fix for radio button rendering bug in React, facebook/react#7630.
  return (
    <div className={`form-check ${inlineCls}`}>
      {enumOptions.map((option) => {
        const checked = option.value === value;
        const radio = (
          <span>
            <input
              type="radio"
              className="form-check-input"
              checked={checked}
              name={name}
              required={required}
              value={option.value}
              disabled={disabled || readonly}
              onChange={() => onChange(option.value)}
            />
            <span>{option.label}</span>
          </span>
        );

        return (
          <div key={option.value}>
            <label className="form-check-label">{radio}</label>
          </div>
        );
      })}
    </div>
  );
};

Radio.propTypes = {
  options: PropTypes.shape({
    enumOptions: PropTypes.array,
    inline: PropTypes.bool,
  }).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  onChange: PropTypes.func,
};

Radio.defaultProps = {
  value: undefined,
  required: false,
  disabled: false,
  readonly: false,
  onChange: () => {},
};

export default Radio;
