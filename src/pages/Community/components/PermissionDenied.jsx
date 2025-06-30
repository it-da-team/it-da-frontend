import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaArrowLeft, FaUserGraduate, FaUserTie } from 'react-icons/fa';
import './PermissionDenied.css';

const PermissionDenied = ({ requiredRole, currentRole }) => {
  const navigate = useNavigate();

  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'teacher':
        return '교사';
      case 'owner':
        return '원장';
      default:
        return '일반 회원';
    }
  };

  const getRoleDescription = (role) => {
    switch (role) {
      case 'teacher':
        return '교사 인증을 완료하시면 교사 게시판에 접근할 수 있습니다.';
      case 'owner':
        return '원장 인증을 완료하시면 원장 게시판에 접근할 수 있습니다.';
      default:
        return '해당 게시판에 접근할 권한이 없습니다.';
    }
  };

  const handleGoToCommunity = () => {
    navigate('/community');
  };

  const handleTeacherAuth = () => {
    // 교사 인증 페이지로 이동 (실제 구현 시 해당 경로로 수정)
    alert('교사 인증 기능은 준비 중입니다.');
  };

  const handleOwnerAuth = () => {
    // 원장 인증 페이지로 이동 (실제 구현 시 해당 경로로 수정)
    alert('원장 인증 기능은 준비 중입니다.');
  };

  return (
    <div className="permission-denied-container">
      <div className="permission-denied-content">
        <div className="permission-denied-icon">
          <FaLock />
        </div>
        
        <h2 className="permission-denied-title">접근 권한이 없습니다</h2>
        
        <div className="permission-denied-info">
          <p className="permission-denied-description">
            {getRoleDescription(requiredRole)}
          </p>
          
          <div className="permission-status">
            <span className="current-role">
              현재 권한: <strong>{getRoleDisplayName(currentRole)}</strong>
            </span>
            <span className="required-role">
              필요 권한: <strong>{getRoleDisplayName(requiredRole)}</strong>
            </span>
          </div>
        </div>

        <div className="permission-denied-actions">
          <button 
            className="action-button primary"
            onClick={handleGoToCommunity}
          >
            <FaArrowLeft />
            전체 게시판으로 돌아가기
          </button>
          
          {requiredRole === 'teacher' && (
            <button 
              className="action-button secondary"
              onClick={handleTeacherAuth}
            >
              <FaUserGraduate />
              교사 인증하러 가기
            </button>
          )}
          
          {requiredRole === 'owner' && (
            <button 
              className="action-button secondary"
              onClick={handleOwnerAuth}
            >
              <FaUserTie />
              원장 인증하러 가기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PermissionDenied; 