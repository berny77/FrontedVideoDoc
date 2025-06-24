import React from 'react';

interface FileUploaderProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  status: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileChange, status }) => (
  <div className="hero-text">
    <h1>Procesador de Videos</h1>
    <p>Sube un video para generar un resumen automático</p>
    <label htmlFor="video-upload" className="upload-button">Subir video</label>
    <input type="file" id="video-upload" accept="video/*" hidden onChange={onFileChange} />
    {status && <p className="status-message">{status}</p>}
  </div>
);

export default FileUploader;
