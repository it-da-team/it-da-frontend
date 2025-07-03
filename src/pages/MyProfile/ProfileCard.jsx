import React from 'react';
import './ProfileCard.css';
import iconTeacher from '../../assets/images/icon/iconTeature-removebg-preview.png';
import iconDirector from '../../assets/images/icon/iconScc-removebg-preview.png';
import iconBasic from '../../assets/images/icon/iconBook-removebg-preview.png';
import ProfileBasicInfo from './ProfileBasicInfo';
import ProfileManageMenu from './ProfileManageMenu';

// 기존 AuthorBadge 컴포넌트 복사 (공통화 필요)
const AuthorBadge = ({ badge }) => {
  let badgeClass;
  if (badge === '교사') {
    badgeClass = 'teacher-badge';
  } else if (badge === '원장') {
    badgeClass = 'director-badge';
  } else if (badge === '일반 회원') {
    badgeClass = 'basic-badge';
  } else {
    return null;
  }
  return (
    <span className={`author-badge ${badgeClass}`}>{badge}</span>
  );
};

function getBadgeImage(badge) {
  if (badge === '교사') return iconTeacher;
  if (badge === '원장') return iconDirector;
  if (badge === '일반 회원') return iconBasic;
  return null;
}

function ProfileCard({ profile }) {
  const badgeImg = getBadgeImage(profile.badge);
  return (
    <div className="profile-card-container profile-card-modern">
      <ProfileBasicInfo profile={profile} />
    </div>
  );
}

export default ProfileCard; 