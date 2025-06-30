import React, { useState, useEffect, useRef } from 'react';
import './Comment.css';
import { FaUserGraduate, FaUserTie, FaHeart, FaCommentDots, FaEdit, FaUser } from 'react-icons/fa';
import CommentForm from './CommentForm'; // 답글 작성 시 재사용
import { fetchReplies } from '../../../api/community/communityApi';
import { getToken } from '../../../utils/localStorage';

const AuthorBadge = ({ badge }) => {
    if (!badge) return null;
    
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

const Comment = ({ 
    comment, 
    postId, 
    onCommentCreated, 
    expandedComments, 
    toggleCommentExpansion, 
    commentElementRefs,
    depth = 0 
}) => {
    const [isLiked, setIsLiked] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replies, setReplies] = useState([]);
    const [loadingReplies, setLoadingReplies] = useState(false);

    // 각 댓글의 DOM 요소를 참조하기 위한 ref
    const commentRef = useRef(null);

    // 컴포넌트가 렌더링되거나 사라질 때 중앙 저장소에 등록/해제
    useEffect(() => {
        const map = commentElementRefs.current;
        if (commentRef.current) {
            map.set(comment.id, commentRef.current);
        }
        return () => {
            map.delete(comment.id);
        };
    }, [comment.id, commentElementRefs]);

    const isExpanded = expandedComments.has(comment.id);

    const handleReplyCreated = () => {
        setShowReplyForm(false);
        onCommentCreated(comment.id);
    };

    // 역할 1: 서버에서 답글 데이터만 불러오는 함수
    const loadReplies = async () => {
        if (loadingReplies || !comment.hasReplies) return;

        setLoadingReplies(true);
        try {
            const token = getToken();
            if (!token) {
                alert('로그인이 필요합니다.');
                return;
            }
            const replyData = await fetchReplies(comment.id, token);
            setReplies(replyData);
        } catch (error) {
            console.error('답글 로딩 실패:', error);
            alert('답글을 불러오지 못했습니다.');
        } finally {
            setLoadingReplies(false);
        }
    };

    // 역할 2: 사용자가 버튼을 클릭했을 때 중앙 상태를 토글하는 함수
    const handleToggleRepliesClick = () => {
        toggleCommentExpansion(comment.id);
    };

    // 역할 3: isExpanded 상태가 true로 변경되고, 답글이 없으면 자동으로 데이터를 로드
    useEffect(() => {
        if (isExpanded && !replies.length) {
            loadReplies();
        }
    }, [isExpanded, replies.length]);

    // 서버에서 받은 depth 정보 사용 (fallback으로 prop depth 사용)
    const currentDepth = comment.depth !== undefined ? comment.depth : depth;
    const maxDepth = 2; // 0: 부모댓글, 1: 대댓글, 2: 대댓글의 대댓글
    const canReply = currentDepth < maxDepth;

    // 수정 여부 확인
    const isEdited = comment.updatedAt && comment.createdAt && 
                    new Date(comment.updatedAt) > new Date(comment.createdAt);

    return (
        <div className="comment-container" ref={commentRef}>
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
                            <FaHeart className={isLiked ? "liked-icon" : ""}/>
                            {isLiked ? '좋아요 취소' : '좋아요'}
                        </button>
                        {comment.hasReplies && (
                            <button 
                                className="comment-action-button show-replies-button"
                                onClick={handleToggleRepliesClick}
                                disabled={loadingReplies}
                            >
                                <FaCommentDots />
                                {loadingReplies ? '로딩 중...' : 
                                 isExpanded ? '대댓글 숨기기' : `대댓글 ${comment.replyCount}개`}
                            </button>
                        )}
                        {canReply && (
                            <button className="comment-action-button" onClick={() => setShowReplyForm(!showReplyForm)}>
                                <FaEdit /> 댓글 작성
                            </button>
                        )}
                    </div>
                </div>
            </div>
            
            {showReplyForm && canReply && (
                <div className="reply-form-wrapper">
                    <CommentForm 
                        postId={postId}
                        parentId={comment.id}
                        onCommentCreated={handleReplyCreated}
                        isReply={true}
                    />
                </div>
            )}

            {/* 답글 목록 */}
            {isExpanded && replies.length > 0 && (
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
                                <Comment 
                                    comment={reply} 
                                    depth={currentDepth + 1}
                                    postId={postId}
                                    onCommentCreated={onCommentCreated}
                                    expandedComments={expandedComments}
                                    toggleCommentExpansion={toggleCommentExpansion}
                                    commentElementRefs={commentElementRefs}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Comment; 