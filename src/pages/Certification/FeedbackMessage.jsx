import React from 'react';

const FeedbackMessage = ({ message, type }) => {
  if (!message) return null;
  return <div className={`feedback-message ${type}`}>{message}</div>;
};

export default FeedbackMessage; 