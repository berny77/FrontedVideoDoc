import React from 'react';

interface ErrorModalProps {
  message: string;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => (
  <div className="modal-backdrop">
    <div className="modal">
      <h2>Error</h2>
      <p>{message}</p>
      <button onClick={onClose}>Cerrar</button>
    </div>
  </div>
);

export default ErrorModal;
    