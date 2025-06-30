import React, { useState } from 'react';
import './CommentForm.css';
import { createComment, createReComment } from '../../../api/community/communityApi';
import { getToken } from '../../../utils/localStorage';

const CommentForm = ({ postId, parentId, onCommentCreated, isReply = false }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = getToken();
      if (!token) {
        alert('로그인이 필요합니다.');
        setIsSubmitting(false);
        return;
      }
      
      if (parentId) {
        // 대댓글 생성
        await createReComment({ postId, parentId, content }, token);
      } else {
        // 일반 댓글 생성
        await createComment({ postId, content }, token);
      }

      setContent('');
      if (onCommentCreated) {
        onCommentCreated(parentId);
      }
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      alert('댓글 작성에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`comment-form-container ${isReply ? 'reply-form' : ''}`}>
      <textarea
        placeholder={isReply ? "따뜻한 답글을 남겨주세요." : "따뜻한 댓글을 남겨주세요."}
        className="comment-textarea"
        rows="4"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isSubmitting}
      ></textarea>
      <div className="comment-form-actions">
        <button 
          className="submit-comment-button" 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? '등록 중...' : (isReply ? '답글 등록' : '댓글 등록')}
        </button>
      </div>
    </div>
  );
};

export default CommentForm; 