import React from 'react';
import PostListItem from './PostListItem';
import './PostList.css';
// import { samplePosts } from '../data'; // 중앙 데이터 가져오기
import useCommunityList from '../../../hooks/community/useCommunityList';

// 임시 role, token, category, isAuthenticated (실제 로그인/탭 연동 시 교체)
const role = 'teacher'; // 'basic' | 'teacher' | 'owner'
const token = 'dummy-jwt-token';
const isAuthenticated = false; // 인증 여부

const PostList = ({ category = 'all' }) => {
  const { posts, error, loading } = useCommunityList(category);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div className="community-error-message">{error}</div>;

  return (
    <div className="post-list-container">
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))
      ) : (
        <div className="no-posts-message">게시글이 없습니다.</div>
      )}
      {/* TODO: Pagination 구현 */}
    </div>
  );
};

export default PostList; 