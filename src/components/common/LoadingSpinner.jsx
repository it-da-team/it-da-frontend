import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ small }) => {
  const spinnerSize = small ? 'spinner-small' : 'spinner-large';
  return (
    <div className={`spinner-container ${small ? 'spinner-container-small' : ''}`}>
      <div className={`spinner ${spinnerSize}`}></div>
    </div>
  );
};

export default LoadingSpinner;
