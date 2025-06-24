import React from 'react';

const LoaderOverlay = () => (
  <div className="overlay">
    <div className="loader"></div>
    <p className="loading-text">Procesando video, por favor espera...</p>
  </div>
);

export default LoaderOverlay;
