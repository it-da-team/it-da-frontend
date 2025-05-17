// 1) 모듈 import (항상 최상단)
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 2) 환경변수가 잘 들어오는지 로그로 확인
console.log('🗝 Kakao Key:', process.env.REACT_APP_KAKAO_MAP_KEY);

// 3) 동적으로 카카오 SDK 스크립트 삽입
const kakaoScript = document.createElement('script');
kakaoScript.src =
  'https://dapi.kakao.com/v2/maps/sdk.js' +
  `?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}` +
  '&autoload=false';
kakaoScript.async = true;

kakaoScript.onload = () => console.log('[Kakao SDK] loaded', window.kakao);
kakaoScript.onerror = () => console.error('[Kakao SDK] failed to load');
console.log("▶️ Requesting Kakao SDK:", kakaoScript.src);
kakaoScript.onerror = (e) => {
  console.error("[Kakao SDK] failed to load", e);
};

document.head.appendChild(kakaoScript);

// 4) React 앱 렌더링
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
console.log("▶️ Loading Kakao SDK from:", kakaoScript.src);
reportWebVitals();
