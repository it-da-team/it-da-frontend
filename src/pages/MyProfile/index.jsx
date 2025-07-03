import React, { useState } from 'react';
import './MyProfile.css';
import profileData from '../../data/myProfileData.json';
import ProfileCard from './ProfileCard';
import Dashboard from './Dashboard';
import ProfileTabs from './ProfileTabs';

function MyProfile() {
  // 임시 데이터 사용
  const [profile] = useState(profileData.profile);
  const [tab, setTab] = useState('posts');

  // 실제 구현 시 로그인 유저와 프로필 유저 비교
  const isOwner = true; // TODO: 실제 유저 비교로 변경

  return (
    <div className="myprofile-root">
      {/* 상단: 프로필 카드 + 대시보드 */}
      <div className="myprofile-top-section">
        <div className="myprofile-left-col">
          <ProfileCard profile={profile} />
        </div>
        <Dashboard markdown={profile.dashboardMarkdown} isOwner={isOwner} />
      </div>
      {/* 하단: 탭(상단과 동일한 넓이) */}
      <div className="myprofile-bottom-section">
        <div className="myprofile-tabs-wrap">
          <ProfileTabs profile={profile} tab={tab} setTab={setTab} />
        </div>
      </div>
    </div>
  );
}

export default MyProfile; 