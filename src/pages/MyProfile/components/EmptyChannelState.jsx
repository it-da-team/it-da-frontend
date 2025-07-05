import React from 'react';

const EmptyChannelState = ({ message, linkText, linkHref }) => {
  return (
    <div className="profile-card-empty" style={{ textAlign: 'center', margin: '24px 0' }}>
      {message}<br />
      <a 
        href={linkHref} 
        className="channel-link" 
        style={{ 
          color: '#FFC107', 
          fontWeight: 600, 
          textDecoration: 'underline', 
          marginTop: '8px', 
          display: 'inline-block' 
        }}
      >
        {linkText}
      </a>
    </div>
  );
};

export default EmptyChannelState; 