import React from 'react';
import './ProfileBasicInfo.css';
import iconTeacher from '../../assets/images/icon/iconTeature-removebg-preview.png';
import iconDirector from '../../assets/images/icon/iconScc-removebg-preview.png';
import iconBasic from '../../assets/images/icon/iconBook-removebg-preview.png';

const AuthorBadge = ({ badge }) => {
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
export default function ProfileBasicInfo({ profile }) {
  const badgeImg = getBadgeImage(profile.badge);
  return (
    <div className="profile-basic-info-outer">
      <div className="profile-basic-info-main">
        <div className="profile-card-nickname-row">
          {badgeImg && <img src={badgeImg} alt="badge" className="profile-badge-img" />}
          <span className="profile-card-nickname">{profile.nickname}</span>
          <AuthorBadge badge={profile.badge} />
        </div>
        <div className="profile-card-role">{profile.role}</div>
        <div className="profile-basic-label">소개</div>
        <div className="profile-basic-value">{profile.bio}</div>
      </div>
      <hr className="profile-basic-divider" />
    </div>
  );
} 