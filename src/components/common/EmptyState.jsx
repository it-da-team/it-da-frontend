import React from 'react';
import Lottie from 'lottie-react';
import catPeeping from '../../assets/lottie/Orange Cat Peeping.json';
import './ComingSoon.css'; // reuse for basic layout, or create EmptyState.css if needed

// 소스명 한글 매핑
const SOURCE_NAME_MAP = {
  'PURUNI': '푸르니보육지원재단 위탁 운영 어린이집 교직원 채용시스템',
  'COMANSEE': '꼬망세',
  'HANSOL': '한솔어린이보육재단 - 채용',
};

export default function EmptyState({
  title = '채용 정보가 없습니다',
  description = '아직 등록된 채용공고가 없어요. 새로운 공고를 기다려주세요!',
  buttonText = '비슷한 공고 보기',
  onButtonClick,
  showButton = true,
  children,
  sourceName,
}) {
  // 소스명을 한글로 변환
  const getDisplaySourceName = (source) => {
    return SOURCE_NAME_MAP[source] || source;
  };
  return (
    <div className="coming-soon-container" style={{ padding: 32, minHeight: 600, marginBottom:400 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Lottie animationData={catPeeping} loop={true} style={{ width: 220, height: 220, marginBottom: 16 }} />
        <h2 className="coming-soon-title" style={{ marginBottom: 12 }}>{title}</h2>
        <p className="coming-soon-desc" style={{ marginBottom: 24 }}>
          출처{sourceName ? ` : ${getDisplaySourceName(sourceName)}` : ''}
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