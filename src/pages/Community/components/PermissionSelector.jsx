import React, { useState } from 'react';
import './PermissionSelector.css';
import { FaGlobeAsia, FaUserGraduate, FaUserTie, FaLock } from 'react-icons/fa';
import { getUser } from '../../../utils/localStorage';

const PermissionSelector = () => {
  const [selected, setSelected] = useState('all');
  const user = getUser();
  
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
  }

  const permissions = [
    { id: 'all', label: '전체 공개', icon: <FaGlobeAsia />, requiredRole: null },
    { id: 'teacher', label: '교사만 보기', icon: <FaUserGraduate />, requiredRole: 'teacher' },
    { id: 'owner', label: '원장만 보기', icon: <FaUserTie />, requiredRole: 'owner' },
  ];

  const canSelect = (requiredRole) => {
    if (!requiredRole) return true;
    return userRole === requiredRole || userRole === 'admin';
  };

  return (
    <div className="permission-selector-container">
      <h3 className="permission-selector-title">게시글 권한 설정</h3>
      <div className="permission-options">
        {permissions.map((permission) => {
          const isDisabled = !canSelect(permission.requiredRole);
          return (
            <label
              key={permission.id}
              className={`permission-option ${isDisabled ? 'disabled' : ''} ${
                selected === permission.id ? 'selected' : ''
              }`}
            >
              <input
                type="radio"
                name="permission"
                value={permission.id}
                checked={selected === permission.id}
                onChange={(e) => setSelected(e.target.value)}
                disabled={isDisabled}
              />
              <div className="permission-content">
                <span className="permission-icon">{permission.icon}</span>
                <span className="permission-label">{permission.label}</span>
                {isDisabled && <FaLock className="lock-icon" />}
              </div>
            </label>
          );
        })}
      </div>
      <p className="permission-help-text">
        현재 권한: {userRole === 'teacher' ? '교사' : userRole === 'owner' ? '원장' : '일반 회원'}
      </p>
    </div>
  );
};

export default PermissionSelector; 
