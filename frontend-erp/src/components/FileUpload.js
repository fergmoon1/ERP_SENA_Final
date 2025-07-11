import React, { useState, useRef } from 'react';
import '../styles/FileUpload.css';

const FileUpload = ({ onFileUpload, currentAvatar, disabled = false }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = async (file) => {
    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      setError('Solo se permiten archivos de imagen');
      return;
    }

    // Validar tamaño (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('El archivo es demasiado grande. Máximo 5MB');
      return;
    }

    setError('');
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const token = localStorage.getItem('jwt');
      const response = await fetch('http://localhost:8081/api/files/upload', {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const result = await response.json();
      onFileUpload(result.url);
    } catch (err) {
      setError(err.message || 'Error al subir el archivo');
    } finally {
      setUploading(false);
    }
  };

  const removeAvatar = () => {
    onFileUpload('');
  };

  return (
    <div className="file-upload-container">
      {currentAvatar ? (
        <div className="avatar-preview">
          <img 
            src={currentAvatar.startsWith('http') ? currentAvatar : `http://localhost:8081${currentAvatar}`}
            alt="Avatar actual"
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #e5e7eb'
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/imagenes/foto01 mujer.png';
            }}
          />
          <div className="avatar-actions">
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled || uploading}
              className="upload-btn"
            >
              {uploading ? 'Subiendo...' : 'Cambiar'}
            </button>
            <button 
              type="button"
              onClick={removeAvatar}
              disabled={disabled || uploading}
              className="remove-btn"
            >
              Eliminar
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`upload-area ${isDragging ? 'dragging' : ''} ${uploading ? 'uploading' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: '2px dashed #d1d5db',
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            backgroundColor: isDragging ? '#f3f4f6' : '#fafafa',
            borderColor: isDragging ? '#3b82f6' : '#d1d5db'
          }}
        >
          <div style={{ fontSize: '48px', color: '#9ca3af', marginBottom: '8px' }}>
            <i className="fas fa-cloud-upload-alt"></i>
          </div>
          <div style={{ fontSize: '16px', color: '#374151', marginBottom: '4px' }}>
            {uploading ? 'Subiendo archivo...' : 'Arrastra una imagen aquí o haz clic'}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>
            PNG, JPG, GIF hasta 5MB
          </div>
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        disabled={disabled || uploading}
      />
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
};

export default FileUpload; 