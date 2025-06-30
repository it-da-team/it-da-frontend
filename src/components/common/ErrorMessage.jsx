import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import './ErrorMessage.css';

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="error-message-container" role="alert">
      <FaExclamationCircle className="error-icon" />
      <span className="error-text">{message}</span>
    </div>
  );
};

export default ErrorMessage;
