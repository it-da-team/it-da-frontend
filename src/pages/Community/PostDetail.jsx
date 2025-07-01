import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './PostDetail.css';
import PostView from './components/PostView';
import PostActions from './components/PostActions';
import CommentSection from './components/CommentSection';
import PermissionDenied from './components/PermissionDenied';
import { fetchPostDetail } from '../../api/community/communityApi';
import { getToken, getUser } from '../../utils/localStorage';

const PostDetail = () => {
    const { postId } = useParams(); // 실제로는 postHash
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [permissionError, setPermissionError] = useState(null);
    const [expandedComments, setExpandedComments] = useState(new Set());
    
    // 1. 액션 기록을 위한 상태와 DOM 요소 참조를 위한 ref 추가
    const [pendingAction, setPendingAction] = useState(null);
    const commentElementRefs = useRef(new Map());

    const toggleCommentExpansion = (commentId) => {
        setExpandedComments(prevExpanded => {
            const newExpanded = new Set(prevExpanded);
            if (newExpanded.has(commentId)) {
                newExpanded.delete(commentId);
            } else {
                newExpanded.add(commentId);
            }
            return newExpanded;
        });
    };

    // ParentCommentDto를 Comment 컴포넌트에서 기대하는 형태로 매핑하는 함수
    const mapParentCommentDtoToComment = (dto) => ({
        id: dto.id,
        author: dto.author,
        authorBadge: dto.authorBadge,
        content: dto.content,
        likes: dto.likes,
        createdAt: dto.createdAt,
        updatedAt: dto.updatedAt,
        replyCount: dto.reCommentsCount,
        hasReplies: dto.hasReplies,
        replies: []
    });

    const handleCommentCreated = (parentId, newCommentOrReply) => {
        if (!newCommentOrReply) {
            console.error('댓글/대댓글 객체가 undefined/null입니다:', newCommentOrReply);
            return;
        }
        if (parentId) {
            setExpandedComments(prevExpanded => new Set(prevExpanded).add(parentId));
            setPost(prev => ({
                ...prev,
                comments: prev.comments.map(comment =>
                    comment.id === parentId
                        ? { ...comment, replies: [...(comment.replies || []), newCommentOrReply] }
                        : comment
                ),
                commentsCount: (prev.commentsCount || 0) + 1
            }));
        } else {
            console.log('새 댓글 객체:', newCommentOrReply);
            setPost(prev => ({
                ...prev,
                comments: [mapParentCommentDtoToComment(newCommentOrReply), ...(prev.comments || [])],
                commentsCount: (prev.commentsCount || 0) + 1
            }));
        }
    };

    const fetchPost = async () => {
        console.log('PostDetail - 게시글 조회 시작:', { postId });
        
        try {
            setLoading(true);
            const token = getToken();
            console.log('PostDetail - 토큰 확인:', { hasToken: !!token, tokenLength: token?.length });
            
            if (!token) {
                setError('로그인이 필요합니다.');
                setLoading(false);
                return;
            }

            console.log('PostDetail - API 호출 시작');
            const data = await fetchPostDetail(postId, token);
            console.log('PostDetail - API 호출 성공:', data);
            
            setPost(data);
            
        } catch (err) {
            console.error('PostDetail - 게시글 조회 실패:', err);
            console.log('에러 메시지 전체:', err.message);
            console.log('에러 객체:', err);
            
            // 서버에서 받은 권한 정보 파싱
            let currentRole = 'basic';
            let requiredRole = 'teacher';
            
            // 에러 메시지에서 접근 권한과 게시물 권한 추출
            const accessPermissionMatch = err.message.match(/접근 권한:([A-Z_]+)/);
            const postPermissionMatch = err.message.match(/게시물 권한\s*:([A-Z]+)/);
            
            console.log('정규식 매칭 결과:', { 
                accessPermissionMatch, 
                postPermissionMatch,
                fullMessage: err.message 
            });
            
            if (accessPermissionMatch && postPermissionMatch) {
                const accessRole = accessPermissionMatch[1];
                const postRole = postPermissionMatch[1];
                
                console.log('파싱된 권한 정보:', { accessRole, postRole });
                
                // 접근 권한을 현재 권한으로 설정
                switch (accessRole) {
                    case 'ROLE_BASIC':
                        currentRole = 'basic';
                        break;
                    case 'ROLE_TEACHER':
                        currentRole = 'teacher';
                        break;
                    case 'ROLE_OWNER':
                        currentRole = 'owner';
                        break;
                    default:
                        currentRole = 'basic';
                }
                
                // 게시물 권한을 필요 권한으로 설정
                switch (postRole) {
                    case 'BASIC':
                        requiredRole = 'basic';
                        break;
                    case 'TEACHER':
                        requiredRole = 'teacher';
                        break;
                    case 'OWNER':
                        requiredRole = 'owner';
                        break;
                    default:
                        requiredRole = 'teacher';
                }
                
                console.log('변환된 권한:', { currentRole, requiredRole });
            } else {
                console.log('정규식 매칭 실패, fallback 로직 사용');
                // 기존 로직 (fallback)
                if (err.message.includes('현재 사용자 권한: ROLE_BASIC')) {
                    currentRole = 'basic';
                    requiredRole = 'teacher';
                } else if (err.message.includes('현재 사용자 권한: ROLE_TEACHER')) {
                    currentRole = 'teacher';
                    requiredRole = 'owner';
                } else if (err.message.includes('현재 사용자 권한: ROLE_OWNER')) {
                    currentRole = 'owner';
                    requiredRole = 'owner';
                } else {
                    // 기본 로직: 현재 사용자 정보에서 권한 확인
                    const user = getUser();
                    if (user?.role) {
                        switch (user.role) {
                            case 'ROLE_TEACHER':
                                currentRole = 'teacher';
                                requiredRole = 'owner';
                                break;
                            case 'ROLE_OWNER':
                                currentRole = 'owner';
                                requiredRole = 'owner';
                                break;
                            case 'ROLE_BASIC':
                            default:
                                currentRole = 'basic';
                                requiredRole = 'teacher';
                                break;
                        }
                    }
                }
            }
            
            console.log('권한 부족 감지:', { currentRole, requiredRole, errorMessage: err.message });
            setPermissionError({ currentRole, requiredRole });
            
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [postId]);

    // 3. post 데이터가 변경될 때 스크롤 로직 실행
    useEffect(() => {
        if (!pendingAction || !post) return;

        const commentElements = commentElementRefs.current;
        let targetId = null;

        if (pendingAction.type === 'COMMENT_CREATED') {
            const newComment = post.comments.find(c => !pendingAction.oldIds.has(c.id));
            if (newComment) {
                targetId = newComment.id;
            }
        } else if (pendingAction.type === 'RECOMMENT_CREATED') {
            targetId = pendingAction.parentId;
        }

        if (targetId && commentElements.has(targetId)) {
            const element = commentElements.get(targetId);
            setTimeout(() => { // DOM 렌더링 후 스크롤
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }

        setPendingAction(null); // 액션 처리 후 초기화

    }, [post, pendingAction]);

    if (loading) return <div>로딩 중...</div>;
    
    // 권한 부족 에러 표시
    if (permissionError) {
        console.log('권한 부족 페이지 표시:', permissionError);
        return (
            <PermissionDenied 
                currentRole={permissionError.currentRole}
                requiredRole={permissionError.requiredRole}
            />
        );
    }
    
    if (error) return <div className="error-message">{error}</div>;
    if (!post) return <div>게시물을 찾을 수 없습니다.</div>;

    // 현재 사용자 정보
    const user = getUser();
    const currentUser = {
        name: user?.sub || '로그인한사용자',
        role: user?.role || 'ROLE_BASIC'
    };

    // 현재 사용자가 게시물 작성자인지 확인
    const isAuthor = currentUser.name === post.author;

    return (
        <div className="post-detail-container">
            <PostView post={post} />
            <PostActions likes={post.likes} isAuthor={isAuthor} />
            <CommentSection 
                postId={postId}
                comments={post.comments || []} 
                commentsCount={post.commentsCount}
                onCommentCreated={handleCommentCreated}
                expandedComments={expandedComments}
                toggleCommentExpansion={toggleCommentExpansion}
                commentElementRefs={commentElementRefs}
            />
        </div>
    );
};

export default PostDetail; 