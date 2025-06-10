import React from 'react';
import './Talk.css';

function Talk() {
  return (
    <div className="under-development">
      <div className="content">
        <h1>교사 톡톡</h1>
        <div className="message">
          <p>현재 개발 중인 서비스입니다.</p>
          <p>곧 만나보실 수 있어요!</p>
        </div>
        <div className="animation">
          <img 
            src="https://lottie.host/83de486d-d9ca-4bcb-9c81-e9fd4ca1e3fe/VFAmmyFH7d.lottie" 
            alt="개발 중 애니메이션"
          />
        </div>
      </div>
    </div>
  );
}

export default Talk; 