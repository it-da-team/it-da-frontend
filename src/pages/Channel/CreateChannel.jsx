import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateChannel.css';
import LayoutSelector from './components/LayoutSelector';
import PermissionSelector, { PermissionAuthNotice } from './components/PermissionSelector';
import ChannelLayout from './components/ChannelLayout';
import { createChannel } from '../../api/channel/channelApi';
import { getToken, getUser } from '../../utils/localStorage';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:2026';

const CreateChannel = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    accessPermission: 'all',
    searchKeywords: '',
    maxMembers: 100,
    layoutType: 1
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // 사용자 권한에 따라 기본 권한 설정
  useEffect(() => {
    const user = getUser();
    let defaultPermission = 'all';
    
    if (user?.role) {
      switch (user.role) {
        case 'ROLE_TEACHER':
          defaultPermission = 'teacher';
          break;
        case 'ROLE_OWNER':
          defaultPermission = 'owner';
          break;
        case 'ROLE_BASIC':
        default:
          defaultPermission = 'all';
          break;
      }
    }
    
    setFormData(prev => ({
      ...prev,
      accessPermission: defaultPermission
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseInt(value);
    if (numValue > 300) {
      setError('최대 인원은 300명을 초과할 수 없습니다.');
      return;
    }
    setFormData(prev => ({
      ...prev,
      [name]: numValue
    }));
    setError(null);
  };

  const handleLayoutChange = (layoutType) => {
    setFormData(prev => ({
      ...prev,
      layoutType
    }));
  };

  const handlePermissionChange = (permission) => {
    setFormData(prev => ({
      ...prev,
      accessPermission: permission
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.description.trim()) {
      setError('채널 이름과 소개를 모두 입력해주세요.');
      return;
    }

    if (formData.maxMembers < 1 || formData.maxMembers > 300) {
      setError('최대 인원은 1명 이상 300명 이하여야 합니다.');
      return;
    }

    // 권한 체크
    const user = getUser();
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

    // 권한이 부족한 경우 체크
    if (formData.accessPermission === 'teacher' && userRole !== 'teacher') {
      setError('교사 권한 채널은 교사 인증을 받은 사용자만 생성할 수 있습니다.');
      return;
    }
    if (formData.accessPermission === 'owner' && userRole !== 'owner') {
      setError('원장 권한 채널은 원장 인증을 받은 사용자만 생성할 수 있습니다.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const token = getToken();
      if (!token) {
        setError('로그인이 필요합니다.');
        return;
      }

      const authorTypeMap = {
        all: 'BASIC',
        teacher: 'TEACHER',
        owner: 'OWNER',
      };
      const layoutTypeMap = {
        1: 'COMMUNITY',  // 커뮤니티형
        2: 'STUDY',      // 스터디형
        3: 'MEETING',    // 모임형
        4: 'MENTORING',  // 멘토링형
      };

      const dto = {
        name: formData.name,
        description: formData.description,
        authorType: authorTypeMap[formData.accessPermission],
        searchKeyword: formData.searchKeywords,
        maxMembers: formData.maxMembers,
        layoutType: layoutTypeMap[formData.layoutType],
      };

      const response = await axios.post(
        `${API_BASE_URL}/channel/create`,
        dto,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('채널 생성 성공:', response);
      
      setSuccess(true);
      setError(null);
      
      // 2초 후 프로필 페이지로 이동
      setTimeout(() => {
        navigate('/myprofile?tab=channels');
      }, 2000);
      
    } catch (err) {
      setError(err.message || '채널 생성에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 현재 사용자 권한 정보
  const user = getUser();
  let userRole = 'basic';
  let userRoleDisplay = '일반 회원';
  
  if (user?.role) {
    switch (user.role) {
      case 'ROLE_TEACHER':
        userRole = 'teacher';
        userRoleDisplay = '교사';
        break;
      case 'ROLE_OWNER':
        userRole = 'owner';
        userRoleDisplay = '원장';
        break;
      case 'ROLE_BASIC':
      default:
        userRole = 'basic';
        userRoleDisplay = '일반 회원';
        break;
    }
  }

  return (
    <div className="create-channel-container">
      <header className="create-channel-header">
        <h2>새로운 채널 만들기</h2>
        <p>나만의 특별한 공간을 만들어보세요</p>
      </header>

      <form className="create-channel-form" onSubmit={handleSubmit}>
        {/* 채널 기본 정보 */}
        <div className="form-section">
          <h3 className="section-title">기본 정보</h3>
          
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              채널 이름 <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
              placeholder="채널 이름을 입력해주세요"
              maxLength={50}
              required
            />
            <span className="input-counter">{formData.name.length}/50</span>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              채널 소개 <span className="required">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-textarea"
              placeholder="채널에 대한 소개를 입력해주세요"
              maxLength={200}
              rows={4}
              required
            />
            <span className="input-counter">{formData.description.length}/200</span>
          </div>

          <div className="form-group">
            <label htmlFor="searchKeywords" className="form-label">
              검색 키워드
            </label>
            <input
              type="text"
              id="searchKeywords"
              name="searchKeywords"
              value={formData.searchKeywords}
              onChange={handleInputChange}
              className="form-input"
              placeholder="채널을 찾을 수 있는 키워드를 입력해주세요 (쉼표로 구분)"
              maxLength={100}
            />
            <span className="input-hint">예: 유치원, 교사, 육아, 스터디</span>
          </div>
        </div>

        {/* 채널 설정 */}
        <div className="form-section">
          <h3 className="section-title">채널 설정</h3>

          {/* 권한/인증 안내 */}
          {userRole === 'basic' ? (
            <div className="permission-auth-notice" style={{ marginBottom: '18px' }}>
              <div className="auth-notice-left">
                <span className="role-badge" style={{ marginBottom: '8px', display: 'inline-block' }}>
                  현재 권한: <strong>{userRoleDisplay}</strong>
                </span>
                <span style={{ marginLeft: '10px' }}>
                  <span role="img" aria-label="bulb">💡</span> <strong>인증 안내:</strong> 교사나 원장 권한 채널을 생성하려면 먼저 인증을 완료해주세요.
                </span>
              </div>
              <div className="auth-notice-right">
                <a href="/certification/teacher" className="auth-link">교사 인증하기</a>
                <span className="auth-link-divider">|</span>
                <a href="#" className="auth-link">원장 인증하기</a>
              </div>
            </div>
          ) : (
            <div className="user-role-info" style={{ marginBottom: '18px' }}>
              <span className="role-badge">
                현재 권한: <strong>{userRoleDisplay}</strong>
              </span>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">접근 권한</label>
            <PermissionSelector
              selectedPermission={formData.accessPermission}
              onPermissionChange={handlePermissionChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="maxMembers" className="form-label">
              최대 인원
            </label>
            <div className="number-input-container">
              <input
                type="number"
                id="maxMembers"
                name="maxMembers"
                value={formData.maxMembers}
                onChange={handleNumberChange}
                className="form-input number-input"
                min="1"
                max="300"
                required
              />
              <span className="number-suffix">명</span>
            </div>
            <span className="input-hint">최대 300명까지 설정 가능합니다</span>
          </div>
        </div>

        {/* 레이아웃 선택 */}
        <div className="form-section">
          <h3 className="section-title">레이아웃 선택</h3>
          <p className="section-description">
            채널의 컨셉에 맞는 레이아웃을 선택해주세요
          </p>
          <LayoutSelector
            selectedLayout={formData.layoutType}
            onLayoutChange={handleLayoutChange}
          />
          
          {/* 레이아웃 미리보기 */}
          <div className="layout-preview-section">
            <h4 className="preview-title">선택한 레이아웃 미리보기</h4>
            <div className="preview-container">
              <ChannelLayout 
                layoutType={formData.layoutType} 
                channelData={{
                  name: formData.name || '채널 이름',
                  description: formData.description || '채널 설명'
                }}
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            <div className="success-icon">✅</div>
            <div className="success-content">
              <h4>채널이 성공적으로 생성되었습니다!</h4>
              <p>잠시 후 프로필 페이지로 이동합니다.</p>
            </div>
          </div>
        )}

        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-button" 
            onClick={() => navigate('/myprofile?tab=channels')}
          >
            취소
          </button>
          <button 
            type="submit" 
            className="submit-button" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="small" />
                생성 중...
              </>
            ) : (
              '채널 만들기'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateChannel; 