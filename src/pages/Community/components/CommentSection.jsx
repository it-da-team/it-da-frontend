import React, { useState } from 'react';
import './CommentSection.css';
import Comment from './Comment'; // 개별 댓글 컴포넌트
import CommentForm from './CommentForm'; // 댓글 작성 폼 컴포넌트

const CommentSection = ({ comments, commentsCount }) => {
  return (
    <section className="comment-section-container">
      <h3 className="comment-section-title">댓글 {commentsCount}개</h3>
      <CommentForm />
      <div className="comment-list">
        {comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </section>
  );
};

export default CommentSection; 