import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import '../../../theme/components/Widgets/ListaAnexosWidget.css';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_FILES = 5; // Limite de arquivos

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
  const [fileError, setFileError] = useState(externalError);
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
            existingFile.name === newFile.name &&
            existingFile.size === newFile.size,
        ),
    );

    if (currentFiles.length + filteredFiles.length > MAX_FILES) {
      setFileError(`Você pode adicionar no máximo ${MAX_FILES} arquivos.`);
      if (inputRef.current) inputRef.current.value = '';
      return;
    }

    const tooBig = filteredFiles.find((file) => file.size > MAX_FILE_SIZE);
    if (tooBig) {
      setFileError(
        `O arquivo "${tooBig.name}" excede o tamanho máximo de 5 MB.`,
      );
      if (inputRef.current) inputRef.current.value = '';
      return;
    }

    if (filteredFiles.length > 0) {
      const newValue = [...currentFiles, ...filteredFiles];
      onChange(id, newValue);
      setTouched(true);
      setFileError(null);
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

  return (
    <div
      className={`field lista-anexos-widget ${touched && fileError ? 'error' : ''}`}
    >
      {title && (
        <label className="lista-anexos-titulo" htmlFor={id}>
          {title}
          {required && ' *'}
        </label>
      )}
      <div className="lista-anexos-input-wrapper">
        <div
          className={`lista-anexos-dropzone${dragActive ? ' drag-active' : ''}`}
          aria-label="Solte arquivos aqui para anexar"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => {
            if (!disabled && inputRef.current) {
              inputRef.current.click();
            }
          }}
          onKeyDown={(e) => {
            if (
              !disabled &&
              (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar')
            ) {
              e.preventDefault();
              if (inputRef.current) inputRef.current.click();
            }
          }}
          role="button"
          tabIndex={0}
          style={{
            cursor: disabled ? 'not-allowed' : 'pointer',
            display: 'block',
          }}
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
          style={{ userSelect: 'none' }}
        >
          Escolher arquivos
        </label>
        <div className="lista-anexos-list-wrapper">
          {value && value.length > 0 && (
            <ul className="lista-anexos-list">
              {value.map((file, idx) => (
                <li key={idx} className="lista-anexos-item">
                  {file.name || file.filename || 'Arquivo'}
                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    className="lista-anexos-remove"
                    disabled={disabled}
                    aria-label="Remover anexo"
                    onMouseUp={(e) => e.currentTarget.blur()}
                  >
                    <i className="icon trash" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {fileError && fileError.length > 0 && (
          <div className="lista-anexos-error ui basic label">{fileError}</div>
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
