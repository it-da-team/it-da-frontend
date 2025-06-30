import React from 'react';
import './PostView.css';
import { FaUserGraduate, FaUserTie } from 'react-icons/fa';

const AuthorBadge = ({ badge }) => {
    // PostListItem.jsx에서 가져온 컴포넌트와 동일
    let badgeIcon;
    let badgeClass;
  
    if (badge === '교사') {
      badgeIcon = <FaUserGraduate />;
      badgeClass = 'teacher-badge';
    } else if (badge === '원장') {
      badgeIcon = <FaUserTie />;
      badgeClass = 'director-badge';
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

const PostView = ({ post }) => {
  const { title, author, authorBadge, createdAt, content } = post;
  
  // XSS 방지를 위해 실제 프로덕션에서는 DOMPurify와 같은 라이브러리 사용이 필수입니다.
  const createMarkup = (htmlString) => {
    return { __html: htmlString };
  };

  return (
    <article className="post-view-container">
      <header className="post-view-header">
        <h1 className="post-view-title">{title}</h1>
        <div className="post-view-meta">
          <div className="author-info">
            <span className="author-name">{author}</span>
            <AuthorBadge badge={authorBadge} />
          </div>
          <span className="post-view-date">{createdAt}</span>
        </div>
      </header>
      <div 
        className="post-view-content"
        dangerouslySetInnerHTML={createMarkup(content)}
      >
      </div>
    </article>
  );
};

export default PostView; 