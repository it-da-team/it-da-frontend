import React, { useState } from 'react';
import { FaRegStickyNote } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './Dashboard.css';
// 마크다운 렌더러 라이브러리 추후 적용 가능
function Dashboard({ markdown, isOwner }) {
  const [value, setValue] = useState(markdown);
  const [editing, setEditing] = useState(false);

  // 디버깅: 대시보드 마크다운 값 출력
  console.log('대시보드 마크다운:', value);

  if (!isOwner) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-header">
          <span><FaRegStickyNote className="dashboard-icon" />나만의 대시보드</span>
        </div>
        <div className="dashboard-markdown">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({node, ...props}) => {
                console.log('이미지 렌더링:', props.src);
                return (
                  <img
                    style={{ display: 'block', maxWidth: '100%', borderRadius: '12px', margin: '16px auto', border: '2px solid red' }}
                    alt={props.alt}
                    {...props}
                  />
                );
              }
            }}
          >
            {value}
          </ReactMarkdown>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <span><FaRegStickyNote className="dashboard-icon" />나만의 대시보드</span>
        <button className="dashboard-edit-btn" onClick={()=>setEditing(!editing)}>
          {editing ? '미리보기' : '편집'}
        </button>
      </div>
      {editing ? (
        <div className="dashboard-edit-area">
          <textarea
            className="dashboard-textarea"
            value={value}
            onChange={e => setValue(e.target.value)}
            rows={8}
          />
          <button className="dashboard-save-btn">저장</button>
        </div>
      ) : (
        <div className="dashboard-markdown">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({node, ...props}) => {
                console.log('이미지 렌더링:', props.src);
                return (
                  <img
                    style={{ display: 'block', maxWidth: '100%', borderRadius: '12px', margin: '16px auto', border: '2px solid red' }}
                    alt={props.alt}
                    {...props}
                  />
                );
              }
            }}
          >
            {value}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default Dashboard; 