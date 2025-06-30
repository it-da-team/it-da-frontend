import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css';
import PostEditor from './components/PostEditor';
import PermissionSelector from './components/PermissionSelector';
import { createPost } from '../../api/community/communityApi';
import { getToken } from '../../utils/localStorage';
import ErrorMessage from '../../components/common/ErrorMessage';

const CreatePost = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [permission, setPermission] = useState('all');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!title.trim() || !content.trim()) {
            setError('제목과 내용을 모두 입력해주세요.');
            return;
        }

        setIsLoading(true);
        setError(null);
        
        const token = getToken();
        if (!token) {
            setError('로그인이 필요합니다.');
            setIsLoading(false);
            return;
        }

        const permissionMap = {
            all: 'BASIC',
            teacher: 'TEACHER',
            owner: 'OWNER'
        };

        const postData = {
            title,
            content,
            authorType: permissionMap[permission]
        };
        
        try {
            const response = await createPost(postData, token);
            console.log('게시글 생성 성공:', response);
            // 성공 시, 생성된 게시글 상세 페이지로 이동하거나 목록으로 이동
            // 여기서는 목록으로 이동하도록 구현
            navigate('/community');
        } catch (err) {
            setError(err.message || '게시글 등록에 실패했습니다.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="create-post-container">
            <header className="create-post-header">
                <h2>새로운 글 작성하기</h2>
                <p>온담 커뮤니티에 따뜻한 이야기를 공유해주세요.</p>
            </header>
            <form className="create-post-form" onSubmit={handleSubmit}>
                <div className="form-section">
                    <PostEditor 
                        title={title}
                        content={content}
                        onTitleChange={(e) => setTitle(e.target.value)}
                        onContentChange={(e) => setContent(e.target.value)}
                    />
                </div>
                
                <ErrorMessage message={error} />

                <div className="form-section">
                    <PermissionSelector 
                        selectedPermission={permission}
                        onPermissionChange={setPermission}
                    />
                </div>
                
                <div className="form-actions">
                    <button type="button" className="cancel-button" onClick={() => navigate('/community')}>취소</button>
                    <button type="submit" className="submit-button" disabled={isLoading}>
                        {isLoading ? '등록 중...' : '등록하기'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost; 