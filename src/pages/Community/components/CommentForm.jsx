import React from 'react';
import './CommentForm.css';

const CommentForm = () => {
  return (
    <div className="comment-form-container">
      <textarea
        placeholder="따뜻한 댓글을 남겨주세요."
        className="comment-textarea"
        rows="4"
      ></textarea>
      <div className="comment-form-actions">
        <button className="submit-comment-button">댓글 등록</button>
      </div>
    </div>
  );
};

export default CommentForm; 