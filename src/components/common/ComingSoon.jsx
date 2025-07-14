import React from 'react';
import './ComingSoon.css';
import comingSoonImg from '../../assets/images/img1.png'; // 샘플 일러스트

export default function ComingSoon() {
  return (
    <div className="coming-soon-container">
      <div className="coming-soon-lottie">
        <iframe
          src="https://lottie.host/embed/a2e934f6-aec0-4ec1-a2c7-1ad2adf656cc/slR36Zd4t7.lottie"
          style={{ width: 300, height: 300, border: 'none', background: 'transparent' }}
          allowFullScreen
          title="준비중 모션"
        />
      </div>
      <h1 className="coming-soon-title">준비중인 페이지입니다</h1>
      <p className="coming-soon-desc">
        이 페이지는 현재 오픈 준비중입니다.<br/>
        곧 다양한 기능과 서비스를 만나보실 수 있습니다!
      </p>
      <div className="coming-soon-features">
        <div className="feature-item">
          <img src={comingSoonImg} alt="주요 기능1" className="feature-img" />
          <div className="feature-title">실시간 커뮤니티</div>
          <div className="feature-desc">회원들과 실시간으로 소통할 수 있는 커뮤니티 기능이 제공될 예정입니다.</div>
        </div>
        <div className="feature-item">
          <img src={comingSoonImg} alt="주요 기능2" className="feature-img" />
          <div className="feature-title">맞춤형 채용정보</div>
          <div className="feature-desc">관심 분야에 맞는 채용공고를 쉽고 빠르게 확인할 수 있습니다.</div>
        </div>
        <div className="feature-item">
          <img src={comingSoonImg} alt="주요 기능3" className="feature-img" />
          <div className="feature-title">전문가 Q&A</div>
          <div className="feature-desc">전문가와 직접 소통하며 궁금증을 해결할 수 있는 Q&A 서비스가 준비중입니다.</div>
        </div>
      </div>
    </div>
  );
} 