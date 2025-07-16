import React from 'react';
import Lottie from 'lottie-react';
import catPeeping from '../../assets/lottie/Orange Cat Peeping.json';
import './ComingSoon.css'; // reuse for basic layout, or create EmptyState.css if needed

export default function EmptyState({
  title = '채용 정보가 없습니다',
  description = '아직 등록된 채용공고가 없어요. 새로운 공고를 기다려주세요!',
  buttonText = '비슷한 공고 보기',
  onButtonClick,
  showButton = true,
  children,
  sourceName,
}) {
  return (
    <div className="coming-soon-container" style={{ padding: 32, minHeight: 600, marginBottom:400 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Lottie animationData={catPeeping} loop={true} style={{ width: 220, height: 220, marginBottom: 16 }} />
        <h2 className="coming-soon-title" style={{ marginBottom: 12 }}>{title}</h2>
        <p className="coming-soon-desc" style={{ marginBottom: 24 }}>
          출처{sourceName ? ` : ${sourceName}` : ''}
        </p>
        {children}
        {showButton && (
          <button
            className="btn btn-primary"
            style={{ marginTop: 8, padding: '10px 28px', fontSize: 18, borderRadius: 24, background: 'linear-gradient(90deg, #fbbf24 0%, #f59e42 100%)', color: '#fff', border: 'none', boxShadow: '0 2px 8px #fbbf2433', cursor: 'pointer' }}
            onClick={onButtonClick}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
} 