import React from 'react';
import './PermissionSelector.css';
import { FaGlobeAsia, FaUserGraduate, FaUserTie, FaLock } from 'react-icons/fa';
// import { getUser } from '../../../utils/localStorage';

const PermissionSelector = ({ selectedPermission, onPermissionChange }) => {
  // 인증 제거: 항상 기본 권한
  let userRole = 'basic';

  const permissions = [
    { id: 'all', label: '전체 공개', icon: <FaGlobeAsia />, description: '모든 사용자가 게시글을 볼 수 있습니다.', requiredRole: null },
    { id: 'teacher', label: '교사만', icon: <FaUserGraduate />, description: '교사 인증 회원만 볼 수 있습니다.', requiredRole: 'teacher' },
    { id: 'owner', label: '원장만', icon: <FaUserTie />, description: '원장 인증 회원만 볼 수 있습니다.', requiredRole: 'owner' },
  ];

  const canSelect = (requiredRole) => {
    if (!requiredRole) return true;
    return userRole === requiredRole || userRole === 'admin';
  };

  return (
    <div className="permission-selector-container">
      <h3 className="permission-selector-title">게시글 공개 범위 설정</h3>
      <div className="permission-options">
        {permissions.map((permission) => {
          const isDisabled = !canSelect(permission.requiredRole);
          return (
            <label
              key={permission.id}
              className={`permission-option ${isDisabled ? 'disabled' : ''} ${
                selectedPermission === permission.id ? 'selected' : ''
              }`}
            >
              <input
                type="radio"
                name="permission"
                value={permission.id}
                checked={selectedPermission === permission.id}
                onChange={(e) => onPermissionChange(e.target.value)}
                disabled={isDisabled}
              />
              <div className="permission-content">
                <div className="permission-header">
                    <span className="permission-icon">{permission.icon}</span>
                    <span className="permission-label">{permission.label}</span>
                </div>
                <p className="permission-description">{permission.description}</p>
                {isDisabled && <FaLock className="lock-icon" />}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default PermissionSelector;
