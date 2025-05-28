import React, { useState } from 'react';
import { validateCPF } from '../../../customizations/Validations/Validations';
import PropTypes from 'prop-types';

function formatCPF(value) {
  if (!value) {
    return '';
  }
  value = value.replace(/\D/g, '').slice(0, 11);
  // Aplica a máscara
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  return value;
}

const CpfWidget = ({
  id,
  value,
  onChange,
  required,
  disabled,
  error: externalError,
  placeholder,
  title,
  description,
}) => {
  const [localError, setLocalError] = useState(null);
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 11);
    onChange(id, val);
    setTouched(true);
    setLocalError(validateCPF(val));
  };

  // Mostra erro local (em tempo real) ou erro externo (do schemaValidators)
  const error = localError || externalError;

  return (
    <div
      className={`field ${touched && error && typeof error === 'string' && error.trim().length > 0 ? 'error' : ''}`}
    >
      {title && (
        <label htmlFor={id}>
          {title}
          {required && ' *'}
        </label>
      )}
      <input
        id={id}
        name={id}
        type="text"
        inputMode="numeric"
        pattern="\d{11}"
        maxLength={14} // 11 números do CPF + máscara
        value={formatCPF(value || '')}
        onChange={handleChange}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete="off"
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {error && (
          <div
            className="ui basic label"
            style={{
              color: '#d01157',
              background: 'none',
              border: 'none',
              paddingLeft: 0,
            }}
          >
            {error}
          </div>
        )}
        {description && <small>{description}</small>}
      </div>
    </div>
  );
};

CpfWidget.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  placeholder: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default CpfWidget;
