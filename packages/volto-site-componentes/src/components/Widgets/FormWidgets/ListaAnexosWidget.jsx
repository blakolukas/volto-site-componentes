import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import '../../../theme/components/Widgets/ListaAnexosWidget.css';

const ListaAnexosWidget = ({
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
  const [touched, setTouched] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    addFiles(files);
  };

  const addFiles = (files) => {
    const currentFiles = value || [];
    const filteredFiles = files.filter(
      (newFile) =>
        !currentFiles.some(
          (existingFile) =>
            existingFile.name === newFile.name && existingFile.size === newFile.size
        )
    );
    if (filteredFiles.length > 0) {
      const newValue = [...currentFiles, ...filteredFiles];
      onChange(id, newValue);
      setTouched(true);
    }
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (disabled) return;
    const files = Array.from(e.dataTransfer.files);
    addFiles(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleRemove = (index) => {
    const newValue = [...(value || [])];
    newValue.splice(index, 1);
    onChange(id, newValue);
  };

  const error = externalError;

  return (
    <div className={`field lista-anexos-widget ${touched && error ? 'error' : ''}`}>
      {title && (
        <label className="lista-anexos-titulo" htmlFor={id}>
          {title}
          {required && ' *'}
        </label>
      )}
      <div className="lista-anexos-input-wrapper">
        <div
          className={`lista-anexos-dropzone${dragActive ? ' drag-active' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          tabIndex={-1}
          onClick={() => {
            if (!disabled && inputRef.current) {
              inputRef.current.click();
            }
          }}
          aria-label="Solte arquivos aqui para anexar"
        >
          Solte um arquivo aqui para enviar um novo arquivo
        </div>
        <input
          ref={inputRef}
          id={id}
          name={id}
          type="file"
          multiple
          disabled={disabled}
          placeholder={placeholder}
          onChange={handleFilesChange}
          className="lista-anexos-input"
          style={{ display: 'none' }}
        />
        <label
          htmlFor={id}
          className="lista-anexos-custom-btn"
          tabIndex={0}
          style={{ userSelect: 'none' }}
        >
          Escolher arquivos
        </label>
        <div className="lista-anexos-list-wrapper">
          {(value && value.length > 0) && (
            <ul className="lista-anexos-list">
              {value.map((file, idx) => (
                <li key={idx} className="lista-anexos-item">
                  {file.name || (file.filename || 'Arquivo')}
                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    className="lista-anexos-remove"
                    disabled={disabled}
                    aria-label="Remover anexo"
                  >
                    <i className="icon trash" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {error && error.length > 0 && (
          <div className="lista-anexos-error ui basic label">
            {error}
          </div>
        )}
        {description && <small>{description}</small>}
      </div>
    </div>
  );
};

ListaAnexosWidget.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  placeholder: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default ListaAnexosWidget;