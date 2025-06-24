import React, { useState } from 'react';
import './App.css';
import videoImg from './assets/bb.png';

import FileUploader from './components/FileUploader';
import TextDisplay from './components/TextDisplay';
import LoaderOverlay from './components/LoaderOverlay';
import ErrorModal from './components/ErrorModal';

function App() {
  const [videoText, setVideoText] = useState('');
  const [videoSummary, setVideoSummary] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorModal, setErrorModal] = useState<string | null>(null);

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

      if (!response.ok) throw new Error("Error en la subida del video");

      const data = await response.json();

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
        <FileUploader onFileChange={handleFileChange} status={uploadStatus} />
        <div className="hero-image">
          <img src={videoImg} alt="Ilustración de video" className="floating-image" />
        </div>
      </div>

      <TextDisplay title="Texto del Video" text={videoText} />
      <TextDisplay title="Resumen del Video" text={videoSummary} />

      {isProcessing && <LoaderOverlay />}
      {errorModal && <ErrorModal message={errorModal} onClose={() => setErrorModal(null)} />}
    </div>
  );
}

export default App;
