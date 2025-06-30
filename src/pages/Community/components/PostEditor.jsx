import React from 'react';
import './PostEditor.css';

const PostEditor = ({ title, content, onTitleChange, onContentChange }) => {
  return (
    <div className="form-section">
      <div className="post-editor-container">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          className="title-input"
          value={title}
          onChange={onTitleChange}
        />
        <textarea
          placeholder="이곳에 글을 작성해주세요."
          className="content-textarea"
          rows="15"
          value={content}
          onChange={onContentChange}
        ></textarea>
      </div>
    </div>
  );
};

export default PostEditor; 