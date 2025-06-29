import React, { useState } from 'react';
import './Comment.css';
import { FaUserGraduate, FaUserTie, FaRegHeart, FaHeart, FaShare, FaEdit, FaReply } from 'react-icons/fa';
import CommentForm from './CommentForm'; // 답글 작성 시 재사용
import { fetchReplies } from '../../../api/community/communityApi';
import { getToken } from '../../../utils/localStorage';

const AuthorBadge = ({ badge }) => {
    // PostView.jsx와 동일한 컴포넌트
    if (!badge) return null;
    const isTeacher = badge === '교사';
    const badgeIcon = isTeacher ? <FaUserGraduate /> : <FaUserTie />;
    const badgeClass = isTeacher ? 'teacher-badge' : 'director-badge';
  
    return (
      <span className={`author-badge ${badgeClass}`}>
        {badgeIcon} {badge}
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

const Comment = ({ comment, depth = 0 }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replies, setReplies] = useState([]);
    const [showReplies, setShowReplies] = useState(false);
    const [loadingReplies, setLoadingReplies] = useState(false);

    // 서버에서 받은 depth 정보 사용 (fallback으로 prop depth 사용)
    const currentDepth = comment.depth !== undefined ? comment.depth : depth;
    const maxDepth = 2; // 0: 부모댓글, 1: 대댓글, 2: 대댓글의 대댓글
    const canReply = currentDepth < maxDepth;

    const handleLoadReplies = async () => {
        if (!showReplies && comment.hasReplies) {
            setLoadingReplies(true);
            try {
                const token = getToken();
                if (!token) {
                    alert('로그인이 필요합니다.');
                    return;
                }

                const replyData = await fetchReplies(comment.id, token);
                setReplies(replyData);
                setShowReplies(true);
            } catch (error) {
                console.error('답글 로딩 실패:', error);
                alert('답글을 불러오지 못했습니다.');
            } finally {
                setLoadingReplies(false);
            }
        } else {
            setShowReplies(!showReplies);
        }
    };

    // 수정 여부 확인
    const isEdited = comment.updatedAt && comment.createdAt && 
                    new Date(comment.updatedAt) > new Date(comment.createdAt);

    return (
        <div className="comment-container">
            <div className="comment-main">
                <div className="comment-author-info">
                    <span className="comment-author-name">{comment.author}</span>
                    <AuthorBadge badge={comment.authorBadge} />
                </div>
                <p className="comment-content">{comment.content}</p>
                <div className="comment-meta">
                    <span className="comment-date">
                        {formatDate(comment.createdAt)}
                        {isEdited && (
                            <span className="edited-indicator">
                                <FaEdit /> 수정됨
                            </span>
                        )}
                    </span>
                    <div className="comment-actions">
                        <button className="comment-action-button" onClick={() => setIsLiked(!isLiked)}>
                            {isLiked ? <FaHeart className="liked-icon"/> : <FaRegHeart />}
                            {isLiked ? '좋아요 취소' : '좋아요'}
                        </button>
                        {canReply && (
                            <button className="comment-action-button" onClick={() => setShowReplyForm(!showReplyForm)}>
                                <FaShare /> 답글
                            </button>
                        )}
                        {comment.hasReplies && (
                            <button 
                                className="comment-action-button show-replies-button"
                                onClick={handleLoadReplies}
                                disabled={loadingReplies}
                            >
                                <FaReply />
                                {loadingReplies ? '로딩 중...' : 
                                 showReplies ? '대댓글 숨기기' : `대댓글 ${comment.replyCount}개`}
                            </button>
                        )}
                    </div>
                </div>
            </div>
            
            {showReplyForm && canReply && <div className="reply-form-wrapper"><CommentForm /></div>}

            {/* 답글 목록 */}
            {showReplies && replies.length > 0 && (
                <div className="replies-container">
                    {replies.map(reply => (
                        <div key={reply.id} className="reply-item">
                            {reply.isDeleted ? (
                                <div className="deleted-reply">
                                    <div className="deleted-reply-content">
                                        <span className="deleted-text">삭제된 댓글입니다.</span>
                                        <span className="deleted-date">{formatDate(reply.createdAt)}</span>
                                    </div>
                                </div>
                            ) : (
                                <Comment comment={reply} depth={currentDepth + 1} />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Comment; 