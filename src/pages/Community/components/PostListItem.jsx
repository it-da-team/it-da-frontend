import React from 'react';
import { Link } from 'react-router-dom';
import './PostListItem.css';
import { FaHeart, FaCommentDots, FaUserGraduate, FaUserTie, FaUser } from 'react-icons/fa';

const AuthorBadge = ({ badge }) => {
    let badgeIcon;
    let badgeClass;
  
    if (badge === '교사') {
      badgeIcon = <FaUserGraduate />;
      badgeClass = 'teacher-badge';
    } else if (badge === '원장') {
      badgeIcon = <FaUserTie />;
      badgeClass = 'director-badge';
    } else if (badge === '일반 회원') {
      badgeIcon = <FaUser />;
      badgeClass = 'basic-badge';
    } else {
      return null;
    }
  
    return (
      <span className={`author-badge ${badgeClass}`}>
        {badgeIcon}
        {badge}
      </span>
    );
  };

// 날짜 포맷팅 함수
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now - date;
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) return '방금 전';
  if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
  if (diffInHours < 24) return `${diffInHours}시간 전`;
  if (diffInDays < 7) return `${diffInDays}일 전`;
  
  return date.toLocaleDateString('ko-KR');
};

const PostListItem = ({ post }) => {
  const { id, title, author, authorBadge, likes, createdAt, category, content } = post;

  return (
    <Link to={`/community/post/${id}`} className="post-list-item-link">
        <article className="post-list-item">  
            <div className="post-main-row">
                <div className="post-content">
                    <div className="post-header">
                        <span className="post-category">{category}</span>
                    </div>
                    <h3 className="post-title">{title}</h3>
                    <p className="post-content-preview">{content}</p>
                    <div className="post-meta">
                        <div className="post-author-wrapper">
                            <span className="post-author">{author}</span>
                            <AuthorBadge badge={authorBadge} />
                        </div>
                        <span className="post-created-at">{formatDate(createdAt)}</span>
                    </div>
                </div>
            </div>
            <div className="post-footer">
                <div className="post-stats">
                    <span className="post-likes">
                        <FaHeart /> {likes}
                    </span>
                    <span className="post-comments">
                        <FaCommentDots /> {post.commentsCount || 0}
                    </span>
                </div>
            </div>
        </article>
    </Link>
  );
};

export default PostListItem; 