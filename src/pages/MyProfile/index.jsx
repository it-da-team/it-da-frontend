import React, { useState } from 'react';
import './MyProfile.css';
import ProfileCard from './ProfileCard';
import Dashboard from './Dashboard';
import ProfileTabs from './ProfileTabs';
import { useMyProfile } from '../../hooks/useMyProfile';
import MyPostList from './MyPostList';
import MyChannelList from './MyChannelList';
import SubscribedChannelList from './SubscribedChannelList';

// 토큰은 props로 전달받거나, 필요시 context/localStorage 등에서 가져올 수 있습니다.
const ProfilePage = ({ token }) => {
  const { profile, loading, error } = useMyProfile(token);
  const [tab, setTab] = useState('posts');

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;
  if (!profile) return null;

  return (
    <div className="myprofile-root">
      <div className="myprofile-top-section" style={{ gap: '56px', marginBottom: '24px' }}>
        <div className="myprofile-left-col">
          <ProfileCard
            name={profile.name}
            authorBadge={profile.authorBadge}
            introduction={profile.introduction}
          />
        </div>
        <Dashboard markdown={profile.dashboard} isOwner={true} />
      </div>
      <div className="myprofile-bottom-section">
        <div className="myprofile-tabs-wrap">
          <ProfileTabs
            myPostList={profile.myPostList}
            myChannelList={profile.myChannelList}
            subscribedChannelList={profile.subscribedChannelList}
            name={profile.name}
            authorBadge={profile.authorBadge}
            tab={tab}
            setTab={setTab}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 