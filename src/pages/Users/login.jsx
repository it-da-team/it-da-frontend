import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { SiKakaotalk } from 'react-icons/si';
import LogoImg from "../../assets/images/icon/image-removebg-preview.png"
import '../../assets/css/Login.css';

const API_BASE = process.env.REACT_APP_RECRUITMENT_API_BASE_URL;

export default function Login() {
  const kakaoLogin = () => {
    window.location.href = `${API_BASE}/oauth2/authorization/kakao`;
  };

  const googleLogin = () => {
    window.location.href = `${API_BASE}/oauth2/authorization/google`;
  };

  return (
    <div className="login-container">
      <div className="login-box">
    
        <h1 className="login-title">
        <img
        src={LogoImg}
        alt="로고"
        style={{
        width: '13rem',
        height: 'auto',
        padding: '0 2rem', 
        objectFit: 'contain'}}>
        </img>
        </h1>
        <p className="login-subtitle">
          영유아 분야 채용 플랫폼 '잇다'에서<br />
          새로운 기회를 발견하세요
        </p>

        <p className="login-message">
          회원가입 없이 소셜 로그인만으로 간편 시작!
        </p>
        
        <button 
          className="login-button kakao-button"
          onClick={kakaoLogin}
        >
          <span className="icon-wrapper">
            <SiKakaotalk />
          </span>
          카카오로 시작하기
        </button>

        <div className="login-divider">또는</div>

        <button 
          className="login-button google-button"
          onClick={googleLogin}
        >
          <span className="icon-wrapper">
            <FaGoogle />
          </span>
          구글로 시작하기
        </button>
      </div>
    </div>
  );
}