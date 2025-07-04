import React from 'react';
import './ProfileCard.css';
import iconTeacher from '../../assets/images/icon/iconTeature-removebg-preview.png';
import iconDirector from '../../assets/images/icon/iconScc-removebg-preview.png';
import iconBasic from '../../assets/images/icon/iconBook-removebg-preview.png';
import ProfileBasicInfo from './ProfileBasicInfo';
import ProfileManageMenu from './ProfileManageMenu';
import { FaEdit } from 'react-icons/fa';

// 기존 AuthorBadge 컴포넌트 복사 (공통화 필요)
const AuthorBadge = ({ badge }) => {
  if (!badge) return null;
  let badgeClass;
  if (badge === '교사') badgeClass = 'teacher-badge';
  else if (badge === '원장') badgeClass = 'director-badge';
  else if (badge === '일반 회원') badgeClass = 'basic-badge';
  else return null;
  return <span className={`author-badge ${badgeClass}`}>{badge}</span>;
};

function getBadgeImage(badge) {
  if (badge === '교사') return iconTeacher;
  if (badge === '원장') return iconDirector;
  if (badge === '일반 회원') return iconBasic;
  return null;
}

const ProfileCard = ({ name, authorBadge, introduction, onEditClick }) => {
  const badgeImg = getBadgeImage(authorBadge);
  const intro = introduction && introduction.trim() ? introduction : '소개가 없습니다.';
  return (
    <div className="profile-card-container profile-card-modern profile-card-center-layout">
      <div className="profile-card-header-row">
        <div className="profile-card-avatar-nickname-wrap-left">
          {badgeImg && (
            <img
              src={badgeImg}
              alt="badge"
              className="profile-card-avatar profile-card-avatar-center"
            />
          )}
          <div className="profile-card-nickname-row profile-card-nickname-col" style={{gap: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
            <span className="profile-card-nickname profile-card-nickname-large">{name}</span>
            <AuthorBadge badge={authorBadge} />
          </div>
        </div>
        <button className="profile-edit-btn" onClick={onEditClick} style={{marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4}}>
          <FaEdit style={{fontSize: '1rem'}} /> 기본 정보 수정
        </button>
      </div>
      <div className="profile-card-info profile-card-info-center" style={{alignItems: 'flex-start', width: '100%'}}>
        <div className="profile-bio profile-card-bio-margin">{intro}</div>
      </div>
    </div>
  );
};

export default ProfileCard; 