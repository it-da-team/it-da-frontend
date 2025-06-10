import React, { useState } from 'react';
import '../../assets/css/FavoriteGuide.css';

export default function FavoriteGuide() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="favorite-guide">
      <div 
        className="guide-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3>관심 공고 안내</h3>
        <span className={`toggle-icon ${isExpanded ? 'expanded' : ''}`}>▼</span>
      </div>
      {isExpanded && (
        <div className="guide-content">
          <div className="guide-item">
            <h4>❓ 관심 정보 등록을 위한 로그인이 필요한가요?</h4>
            <p>아니요! 로그인 없이도 관심 공고와 최근 본 공고를 확인할 수 있어요.</p>
          </div>
          <div className="guide-item">
            <h4>❓ 어디에 저장되나요?</h4>
            <p>저장된 정보는 현재 사용 중인 브라우저 안에서만 보관되며, 외부로 전송되지 않아요.</p>
          </div>
          <div className="guide-item">
            <h4>❓ 삭제하려면 어떻게 하나요?</h4>
            <p>브라우저 설정에서 캐시 삭제를 하시면 모든 정보가 사라집니다.</p>
          </div>
        </div>
      )}
    </div>
  );
} 