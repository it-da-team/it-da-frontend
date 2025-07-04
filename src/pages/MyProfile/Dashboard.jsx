import React, { useState, useEffect } from 'react';
import { FaRegStickyNote } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './Dashboard.css';
import recruitmentClient from '../../api/instances/recruitmentClient';
// 마크다운 렌더러 라이브러리 추후 적용 가능
export default function Dashboard({ markdown, isOwner, onSave }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(markdown || '');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setValue(markdown || '');
  }, [markdown]);

  const handleSave = async () => {
    setIsSaving(true);
    setError('');
    try {
      const token = localStorage.getItem('accessToken');
      const res = await recruitmentClient.post('/community/profile/update/dashboard', { dashboard: value }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (onSave) onSave(res.data.data.dashboard);
      setEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || '저장에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

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
          <button className="dashboard-save-btn" onClick={handleSave} disabled={isSaving}>{isSaving ? '저장 중...' : '저장'}</button>
          {error && <div style={{color:'#e53e3e', fontSize:'0.98rem', marginTop:8}}>{error}</div>}
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