import React from 'react';
import './PostEditor.css';

const PostEditor = () => {
  return (
    <div className="form-section">
      <h3 className="form-section-title">본문</h3>
      <div className="post-editor-container">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          className="title-input"
        />
        <textarea
          placeholder="이곳에 글을 작성해주세요.&#10;사진이나 동영상은 아래에서 첨부할 수 있습니다."
          className="content-textarea"
          rows="15"
        ></textarea>
      </div>
    </div>
  );
};

export default PostEditor; 