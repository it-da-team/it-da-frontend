import React from 'react';
import { Link } from 'react-router-dom';
import './BoardTabs.css';
import { FaLock } from 'react-icons/fa';
import { getUser, getToken } from '../../../utils/localStorage';

const BoardTabs = ({ selectedCategory, onCategoryChange }) => {
  const user = getUser();
  const token = getToken();
  
  // 디버깅을 위한 로그
  console.log('BoardTabs - Token exists:', !!token);
  console.log('BoardTabs - User info:', user);
  console.log('BoardTabs - User role from token:', user?.role);
  
  // 사용자 권한 매핑 (서버의 UserType에 맞춤)
  let userRole = 'basic';
  if (user?.role) {
    switch (user.role) {
      case 'ROLE_TEACHER':
        userRole = 'teacher';
        break;
      case 'ROLE_OWNER':
        userRole = 'owner';
        break;
      case 'ROLE_BASIC':
      default:
        userRole = 'basic';
        break;
    }
  } else {
    // 토큰에 권한 정보가 없는 경우, 임시로 basic으로 설정
    console.log('토큰에 권한 정보가 없어 basic 권한으로 설정합니다.');
    userRole = 'basic';
  }
  
  // 디버깅을 위한 로그
  console.log('BoardTabs - Final userRole:', userRole);

  const tabs = [
    { id: 'all', label: '전체' },
    { id: 'teacher', label: '교사만', requiredRole: 'teacher' },
    { id: 'owner', label: '원장만', requiredRole: 'owner' },
  ];

  const handleTabClick = (tabId, requiredRole) => {
    // 권한 체크를 더 엄격하게 수정
    if (!requiredRole || userRole === requiredRole) {
      onCategoryChange(tabId);
    } else {
      console.log(`권한 부족: ${userRole} 사용자가 ${requiredRole} 권한이 필요한 탭에 접근 시도`);
      alert(`${requiredRole === 'teacher' ? '교사' : '원장'} 권한이 필요합니다.`);
    }
  };

  const canView = (requiredRole) => {
    // admin 권한 제거하고 더 엄격하게 체크
    const canAccess = !requiredRole || userRole === requiredRole;
    console.log(`canView check: requiredRole=${requiredRole}, userRole=${userRole}, canAccess=${canAccess}`);
    return canAccess;
  };

  return (
    <div className="board-tabs-container">
      <div className="tabs">
        {tabs.map((tab) => {
          const isLocked = !canView(tab.requiredRole);
          console.log(`Tab ${tab.id}: requiredRole=${tab.requiredRole}, userRole=${userRole}, isLocked=${isLocked}`);
          return (
            <div
              key={tab.id}
              className={`tab-item ${selectedCategory === tab.id ? 'active' : ''} ${isLocked ? 'locked' : ''}`}
              onClick={() => !isLocked && handleTabClick(tab.id, tab.requiredRole)}
            >
              {tab.label}
              {isLocked && <FaLock className="lock-icon" />}
            </div>
          );
        })}
      </div>
      <div className="tab-actions">
        {userRole === 'basic' && (
          <div className="auth-buttons">
            <button className="auth-button teacher">교사 인증하기</button>
            <button className="auth-button director">원장 인증하기</button>
          </div>
        )}
        <Link to="/community/create" className="write-post-button">
          + 새 글 작성
        </Link>
      </div>
    </div>
  );
};

export default BoardTabs; 