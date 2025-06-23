import React from 'react';
import './App.css';
import videoImg from './assets/bb.png';

function App() {
  return (
    <div className="App">
      <div className="hero">
        <div className="hero-text">
          <h1>Procesador de Videos</h1>
          <p>Sube un video para generar un resumen automático</p>
          <label htmlFor="video-upload" className="upload-button">
            Subir video
          </label>
          <input type="file" id="video-upload" accept="video/*" hidden />
        </div>
        <div className="hero-image">
          <img src={videoImg} alt="Ilustración de video" className="floating-image" />
        </div>
      </div>
    </div>
  );
}

export default App;
