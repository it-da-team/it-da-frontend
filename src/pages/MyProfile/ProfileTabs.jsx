import React from 'react';
import './ProfileTabs.css';
import { FaHashtag } from 'react-icons/fa';
import PostListItem from '../Community/components/PostListItem';

function ProfileTabs({ profile, tab, setTab }) {
  const myChannels = profile.myChannels || [];
  const joinedChannels = profile.joinedChannels || [];
  const channelCount = myChannels.length;
  const canCreateChannel = channelCount < 1;

  // Helper to map profile post data to PostListItem expected shape
  const mapProfilePost = (post) => ({
    ...post,
    author: profile.nickname,
    authorBadge: profile.badge,
    category: post.category || '',
    content: post.content || '',
    commentsCount: post.commentsCount || 0,
    createdAt: post.date || post.createdAt,
  });

  return (
    <div className="profile-tabs-section">
      <nav className="profile-tabs-nav">
        <button className={tab==='posts' ? 'active' : ''} onClick={()=>setTab('posts')}>내가 쓴 글</button>
        <button className={tab==='likes' ? 'active' : ''} onClick={()=>setTab('likes')}>좋아요한 글</button>
        <button className={tab==='channels' ? 'active' : ''} onClick={()=>setTab('channels')}>내 채널 목록</button>
      </nav>
      <div className="profile-tabs-content">
        {tab === 'posts' && (
          <div className="profile-card-list">
            {profile.myPosts?.length > 0 ? (
              profile.myPosts.map(post => (
                <PostListItem key={post.id} post={mapProfilePost(post)} />
              ))
            ) : (
              <div className="profile-card-empty">작성한 글이 없습니다.</div>
            )}
          </div>
        )}
        {tab === 'likes' && (
          <div className="profile-card-list">
            {profile.likedPosts?.length > 0 ? (
              profile.likedPosts.map(post => (
                <PostListItem key={post.id} post={mapProfilePost(post)} />
              ))
            ) : (
              <div className="profile-card-empty">좋아요한 글이 없습니다.</div>
            )}
          </div>
        )}
        {tab === 'channels' && (
          <div className="profile-channel-list-wrap">
            <div className="profile-channel-list-header">
              <button
                className="create-channel-btn"
                disabled={!canCreateChannel}
                title={canCreateChannel ? '' : '채널은 1개만 만들 수 있습니다.'}
              >
                내 채널 만들러가기 ({channelCount}/1)
              </button>
            </div>
            {myChannels.length > 0 && (
              <>
                <div className="profile-channel-section-title">내가 만든 채널</div>
                <div className="profile-card-list">
                  {myChannels.map(channel => (
                    <div className="profile-channel-card" key={channel.id}>
                      <div className="profile-channel-title">
                        <FaHashtag className="channel-hashtag-icon" />
                        {channel.name}
                      </div>
                      <div className="profile-channel-desc">{channel.description}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {myChannels.length > 0 && joinedChannels.length > 0 && (
              <hr className="profile-channel-divider" />
            )}
            {joinedChannels.length > 0 && (
              <>
                <div className="profile-channel-section-title">참여한 채널</div>
                <div className="profile-card-list">
                  {joinedChannels.map(channel => (
                    <div className="profile-channel-card" key={channel.id}>
                      <div className="profile-channel-title">
                        <FaHashtag className="channel-hashtag-icon" />
                        {channel.name}
                      </div>
                      <div className="profile-channel-desc">{channel.description}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {myChannels.length === 0 && joinedChannels.length === 0 && (
              <div className="profile-card-empty">채널 목록이 없습니다.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileTabs; 