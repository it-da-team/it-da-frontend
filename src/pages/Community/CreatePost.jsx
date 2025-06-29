import React from 'react';
import './CreatePost.css';
import PostEditor from './components/PostEditor';
import FileUpload from './components/FileUpload';
import PermissionSelector from './components/PermissionSelector';

const CreatePost = () => {
  return (
    <div className="create-post-container">
      <header className="create-post-header">
        <h2>새로운 글 작성하기</h2>
        <p>온담 커뮤니티에 따뜻한 이야기를 공유해주세요.</p>
      </header>
      <div className="create-post-form">
        <div className="form-section">
            <PostEditor />
        </div>
        <div className="form-section">
            <FileUpload />
        </div>
        <div className="form-section">
            <PermissionSelector />
        </div>
        <div className="form-actions">
          <button className="cancel-button">취소</button>
          <button className="submit-button">등록하기</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost; 