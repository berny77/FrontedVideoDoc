import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import videoImg from './assets/bb.png';

function App() {
  const [videoText, setVideoText] = useState('');
  const [videoSummary, setVideoSummary] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorModal, setErrorModal] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const summaryRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
    if (summaryRef.current) {
      summaryRef.current.style.height = 'auto';
      summaryRef.current.style.height = summaryRef.current.scrollHeight + 'px';
    }
  }, [videoText, videoSummary]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setVideoText('');
    setVideoSummary('');
    setUploadStatus('Preparando la subida...');
    setIsProcessing(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploadStatus('Subiendo video...');

      const response = await fetch('http://localhost:8000/api/process-video/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error en la subida del video");
      }

      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      setVideoText(data.text || "No se pudo extraer texto del video.");
      setVideoSummary(data.summary || "No se pudo generar resumen.");
      setUploadStatus('Video procesado con éxito.');
    } catch (error) {
      console.error("Error al subir el video:", error);
      setUploadStatus('');
      setErrorModal('Ocurrió un error al procesar el video o el formato del video no es compatible o está dañado. Por favor, intenta de nuevo.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="App">
      <div className="hero">
        <div className="hero-text">
          <h1>Procesador de Videos</h1>
          <p>Sube un video para generar un resumen automático</p>
          <label htmlFor="video-upload" className="upload-button">
            Subir video
          </label>
          <input
            type="file"
            id="video-upload"
            accept="video/*"
            hidden
            onChange={handleFileChange}
          />
          {uploadStatus && <p className="status-message">{uploadStatus}</p>}
        </div>
        <div className="hero-image">
          <img src={videoImg} alt="Ilustración de video" className="floating-image" />
        </div>
      </div>

      <div className="video-text-container">
        <h2>Texto del Video</h2>
        <textarea
          ref={textareaRef}
          value={videoText}
          readOnly
          className="video-text"
        />
      </div>

      <div className="video-text-container">
        <h2>Resumen del Video</h2>
        <textarea
          ref={summaryRef}
          value={videoSummary}
          readOnly
          className="video-text"
        />
      </div>

      {isProcessing && (
        <div className="overlay">
          <div className="loader"></div>
          <p className="loading-text">Procesando video, por favor espera...</p>
        </div>
      )}

      {errorModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Error</h2>
            <p>{errorModal}</p>
            <button onClick={() => setErrorModal(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
