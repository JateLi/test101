import React from 'react';
import './LoadingSpinner.css';

function LoadingSpinner({ size = 'medium', message = '加载中...' }) {
  return (
    <div className="loading-container">
      <div className={`loading-spinner ${size}`}>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      <p className="loading-message">{message}</p>
    </div>
  );
}

export default LoadingSpinner;