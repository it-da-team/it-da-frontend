import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileTabs.css';
import { FaHashtag } from 'react-icons/fa';
import PostListItem from '../Community/components/PostListItem';
import NewPostCard from './NewPostCard';
import ChannelSection from './components/ChannelSection';

function ProfileTabs({ myPostList = [], myChannelList = [], subscribedChannelList = [], name, authorBadge, tab, setTab, onPostCreated }) {
  const navigate = useNavigate();
  const [showNewPost, setShowNewPost] = useState(false);
  const myPosts = myPostList;
  const likedPosts = [];
  const myChannels = myChannelList;
  const joinedChannels = subscribedChannelList;
  const channelCount = myChannels.length;
  const canCreateChannel = channelCount < 1;

  // Helper to map profile post data to PostListItem expected shape
  const mapProfilePost = (post) => {
    if (!post) return {};
    return {
      ...post,
      author: post.author || name,
      authorBadge: post.authorBadge || authorBadge,
      category: post.category || '',
      content: post.content || '',
      commentsCount: post.commentsCount || 0,
      createdAt: post.createdAt,
    };
  };

  const handleNavigateToCreate = () => {
    navigate('/channel/create');
  };

  const handleNavigateToChannelMain = () => {
    navigate('/channels');
  };

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
            <div style={{ width: '100%', marginBottom: '18px' }}>
              <button
                className="new-post-toggle-btn"
                onClick={() => setShowNewPost((prev) => !prev)}
                style={{ marginBottom: showNewPost ? '18px' : 0 }}
              >
                {showNewPost ? '작성 취소' : '새 글 작성'}
              </button>
              {showNewPost && (
                <NewPostCard
                  onSuccess={(createdPost) => {
                    setShowNewPost(false);
                    if (onPostCreated) onPostCreated(createdPost);
                  }}
                  onCancel={() => setShowNewPost(false)}
                />
              )}
            </div>
            {myPosts.filter(Boolean).length > 0 ? (
              myPosts.filter(Boolean).map(post => (
                <PostListItem key={post.id} post={mapProfilePost(post)} />
              ))
            ) : (
              <div className="profile-card-empty">작성한 글이 없습니다.</div>
            )}
          </div>
        )}
        {tab === 'likes' && (
          <div className="profile-card-list">
            {likedPosts.length > 0 ? (
              likedPosts.map(post => (
                <PostListItem key={post.id} post={mapProfilePost(post)} />
              ))
            ) : (
              <div className="profile-card-empty">좋아요한 글이 없습니다.</div>
            )}
          </div>
        )}
        {tab === 'channels' && (
          <ChannelSection
            myChannels={myChannels}
            joinedChannels={joinedChannels}
            canCreateChannel={canCreateChannel}
            channelCount={channelCount}
            onNavigateToCreate={handleNavigateToCreate}
            onNavigateToChannelMain={handleNavigateToChannelMain}
          />
        )}
      </div>
    </div>
  );
}

export default ProfileTabs; 