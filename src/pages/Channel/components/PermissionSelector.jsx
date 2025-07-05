import React from 'react';
import './PermissionSelector.css';
import { FaGlobe, FaChalkboardTeacher, FaUserTie, FaLock } from 'react-icons/fa';
import { getUser } from '../../../utils/localStorage';

const PermissionSelector = ({ selectedPermission, onPermissionChange }) => {
  const user = getUser();
  
  // 사용자 권한 매핑
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
    {
      id: 'all',
      name: '전체',
      description: '모든 사용자가 검색하고 참여할 수 있습니다',
      icon: FaGlobe,
      color: '#28a745',
      requiredRole: null // 모든 사용자가 선택 가능
    },
    {
      id: 'teacher',
      name: '교사',
      description: '교사 인증을 받은 사용자만 참여할 수 있습니다',
      icon: FaChalkboardTeacher,
      color: '#17a2b8',
      requiredRole: 'teacher' // 교사 권한 필요
    },
    {
      id: 'owner',
      name: '원장',
      description: '원장 인증을 받은 사용자만 참여할 수 있습니다',
      icon: FaUserTie,
      color: '#6f42c1',
      requiredRole: 'owner' // 원장 권한 필요
    }
  ];

  // 권한 체크 함수
  const canSelect = (requiredRole) => {
    if (!requiredRole) return true; // 전체 권한은 모든 사용자가 선택 가능
    return userRole === requiredRole;
  };

  return (
    <>
      {/* 권한 선택 그리드 */}
      <div className="permission-grid">
        {permissions.map((permission) => {
          const IconComponent = permission.icon;
          const isSelected = selectedPermission === permission.id;
          const isDisabled = !canSelect(permission.requiredRole);
          
          return (
            <div
              key={permission.id}
              className={`permission-option ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
              onClick={() => !isDisabled && onPermissionChange(permission.id)}
            >
              <div className="permission-icon" style={{ backgroundColor: permission.color }}>
                <IconComponent />
                {isDisabled && <FaLock className="lock-overlay" />}
              </div>
              <div className="permission-content">
                <h4 className="permission-name">
                  {permission.name}
                  {isDisabled && <span className="required-badge">권한 필요</span>}
                </h4>
                <p className="permission-description">{permission.description}</p>
              </div>
              {isSelected && !isDisabled && (
                <div className="permission-check">
                  <div className="check-circle">✓</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 권한 설정 안내 (파란색) */}
      <div className="permission-note">
        <p>
          <span role="img" aria-label="lock">🔒</span> <strong>권한 설정 안내:</strong> 전체 권한으로 생성된 채널만 추후 권한 변경 신청이 가능합니다. <span className="permission-note-detail">(교사, 원장으로 생성 시 추후 권한 수정 불가)</span>
        </p>
      </div>
    </>
  );
};

// 인증 안내(노란색)는 PermissionSelector 바깥에서 별도 렌더링 필요
export const PermissionAuthNotice = () => (
  <div className="permission-auth-notice">
    <p>
      <span role="img" aria-label="bulb">💡</span> <strong>인증 안내:</strong> 교사나 원장 권한 채널을 생성하려면 먼저 인증을 완료해주세요.<br />
      <a href="/certification/teacher" className="auth-link">교사 인증하기</a> <span className="auth-link-divider">|</span> <a href="#" className="auth-link">원장 인증하기</a>
    </p>
  </div>
);

export default PermissionSelector; 