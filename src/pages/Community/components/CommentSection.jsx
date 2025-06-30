import React from 'react';
import './CommentSection.css';
import Comment from './Comment'; // 개별 댓글 컴포넌트
import CommentForm from './CommentForm'; // 댓글 작성 폼 컴포넌트

const CommentSection = ({ 
  postId, 
  comments, 
  commentsCount, 
  onCommentCreated, 
  expandedComments, 
  toggleCommentExpansion,
  commentElementRefs
}) => {
  return (
    <section className="comment-section-container">
      <h3 className="comment-section-title">댓글 {commentsCount}개</h3>
      <CommentForm postId={postId} onCommentCreated={onCommentCreated} />
      <div className="comment-list">
        {comments.map(comment => (
          <Comment 
            key={comment.id} 
            comment={comment} 
            postId={postId}
            onCommentCreated={onCommentCreated}
            expandedComments={expandedComments}
            toggleCommentExpansion={toggleCommentExpansion}
            commentElementRefs={commentElementRefs}
          />
        ))}
      </div>
    </section>
  );
};

export default CommentSection; 