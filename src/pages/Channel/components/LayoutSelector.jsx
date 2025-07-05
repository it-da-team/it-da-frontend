import React from 'react';
import './LayoutSelector.css';
import { FaComments, FaBook, FaCalendar, FaStar } from 'react-icons/fa';

const LayoutSelector = ({ selectedLayout, onLayoutChange }) => {
  const layouts = [
    {
      id: 1,
      name: '커뮤니티형',
      description: '자유로운 대화와 정보 공유',
      icon: FaComments,
      preview: '💬 자유로운 대화 공간',
      features: ['자유로운 글쓰기', '댓글 시스템', '파일 공유'],
      available: true
    },
    {
      id: 2,
      name: '스터디형',
      description: '체계적인 학습과 토론',
      icon: FaBook,
      preview: '📚 체계적인 학습 공간',
      features: ['주제별 게시판', '과제 제출', '진도 관리'],
      available: false,
      comingSoon: true
    },
    {
      id: 3,
      name: '모임형',
      description: '정기적인 모임과 일정 관리',
      icon: FaCalendar,
      preview: '📅 정기 모임 공간',
      features: ['일정 관리', '참석 확인', '모임 후기'],
      available: false,
      comingSoon: true
    },
    {
      id: 4,
      name: '멘토링형',
      description: '전문가와의 1:1 소통',
      icon: FaStar,
      preview: '⭐ 전문가 멘토링 공간',
      features: ['1:1 질문', '전문가 답변', '개인 상담'],
      available: false,
      comingSoon: true
    }
  ];

  return (
    <div className="layout-selector">
      <div className="layout-grid">
        {layouts.map((layout) => {
          const IconComponent = layout.icon;
          const isSelected = selectedLayout === layout.id;
          
          return (
            <div
              key={layout.id}
              className={`layout-option ${isSelected ? 'selected' : ''} ${!layout.available ? 'disabled' : ''}`}
              onClick={() => layout.available && onLayoutChange(layout.id)}
            >
              <div className="layout-header">
                <div className="layout-icon">
                  <IconComponent />
                </div>
                <div className="layout-info">
                  <h4 className="layout-name">
                    {layout.name}
                    {layout.comingSoon && <span className="coming-soon-badge">준비중</span>}
                  </h4>
                  <p className="layout-description">{layout.description}</p>
                </div>
                {isSelected && layout.available && (
                  <div className="selected-indicator">
                    <div className="checkmark">✓</div>
                  </div>
                )}
                {!layout.available && (
                  <div className="disabled-indicator">
                    <div className="lock-icon">🔒</div>
                  </div>
                )}
              </div>
              
              <div className="layout-preview">
                <span className="preview-text">{layout.preview}</span>
                {layout.comingSoon && (
                  <div className="coming-soon-message">
                    🚧 준비 중인 기능입니다. 곧 만나보실 수 있어요!
                  </div>
                )}
              </div>
              
              <div className="layout-features">
                {layout.features.map((feature, index) => (
                  <span key={index} className="feature-tag">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="layout-note">
        <p>
          💡 <strong>레이아웃 선택 팁:</strong> 채널의 목적과 활동 유형에 맞는 레이아웃을 선택하세요. 
          생성 후에도 설정에서 변경할 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default LayoutSelector; 