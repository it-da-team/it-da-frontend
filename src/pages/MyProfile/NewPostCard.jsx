import React, { useState } from 'react';
import PostEditor from '../../pages/Community/components/PostEditor';
import PermissionSelector from '../../pages/Community/components/PermissionSelector';
import { createPost } from '../../api/community/communityApi';
import { getToken } from '../../utils/localStorage';
import ErrorMessage from '../../components/common/ErrorMessage';

const NewPostCard = ({ onSuccess, onCancel }) => {
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
      const createdPost = await createPost(postData, token);
      if (onSuccess) onSuccess(createdPost);
    } catch (err) {
      setError(err.message || '게시글 등록에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="new-post-card">
      <form className="create-post-form" onSubmit={handleSubmit}>
        <PostEditor
          title={title}
          content={content}
          onTitleChange={(e) => setTitle(e.target.value)}
          onContentChange={(e) => setContent(e.target.value)}
        />
        <ErrorMessage message={error} />
        <PermissionSelector
          selectedPermission={permission}
          onPermissionChange={setPermission}
        />
        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onCancel}>취소</button>
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? '등록 중...' : '등록하기'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPostCard; 