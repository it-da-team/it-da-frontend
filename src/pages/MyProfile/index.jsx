import React, { useState } from 'react';
import './MyProfile.css';
import ProfileCard from './ProfileCard';
import Dashboard from './Dashboard';
import ProfileTabs from './ProfileTabs';
import { useMyProfile } from '../../hooks/useMyProfile';
import MyPostList from './MyPostList';
import MyChannelList from './MyChannelList';
import SubscribedChannelList from './SubscribedChannelList';
import EditProfileModal from './EditProfileModal';

// 토큰은 props로 전달받거나, 필요시 context/localStorage 등에서 가져올 수 있습니다.
const ProfilePage = ({ token }) => {
  const { profile: initialProfile, loading, error } = useMyProfile(token);
  const [profile, setProfile] = useState(null);
  const [tab, setTab] = useState('posts');
  // "내가 쓴 글"을 별도 상태로 관리
  const [myPostList, setMyPostList] = useState([]);
  // 기본 정보 수정 모달 오픈 상태
  const [showEditModal, setShowEditModal] = useState(false);
  // 닉네임/소개 state (모달용)
  const [editName, setEditName] = useState(profile?.name || '');
  const [editIntro, setEditIntro] = useState(profile?.introduction || '');

  React.useEffect(() => {
    if (initialProfile) {
      setProfile(initialProfile);
      if (initialProfile.myPostList) setMyPostList(initialProfile.myPostList);
      setEditName(initialProfile.name || '');
      setEditIntro(initialProfile.introduction || '');
    }
  }, [initialProfile]);

  // 새 글 추가 핸들러
  const handlePostCreated = (newPost) => {
    setMyPostList(prev => [newPost, ...prev]);
  };
  // 기본 정보 수정 버튼 클릭 핸들러
  const handleEditClick = () => setShowEditModal(true);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;
  if (!profile) return null;

  return (
    <div className="myprofile-root">
      <div className="myprofile-top-section" style={{ flexDirection: 'column', gap: '32px', marginBottom: '24px', alignItems: 'center' }}>
        <ProfileCard
          name={profile.name}
          authorBadge={profile.authorBadge}
          introduction={profile.introduction}
          onEditClick={handleEditClick}
        />
        <Dashboard markdown={profile.dashboard} isOwner={true} onSave={(dashboard) => setProfile(prev => ({ ...prev, dashboard }))} />
      </div>
      <div className="myprofile-bottom-section" style={{ marginTop: '40px' }}>
        <div className="myprofile-tabs-wrap">
          <ProfileTabs
            myPostList={myPostList}
            myChannelList={profile.myChannelList}
            subscribedChannelList={profile.subscribedChannelList}
            name={profile.name}
            authorBadge={profile.authorBadge}
            tab={tab}
            setTab={setTab}
            onPostCreated={handlePostCreated}
          />
        </div>
      </div>
      {showEditModal && (
        <EditProfileModal
          initialName={profile.name}
          initialIntro={profile.introduction}
          onClose={() => setShowEditModal(false)}
          onSave={({ name, introduction }) => {
            setProfile(prev => ({
              ...prev,
              name,
              introduction
            }));
            setShowEditModal(false);
          }}
        />
      )}
    </div>
  );
};

export default ProfilePage; 