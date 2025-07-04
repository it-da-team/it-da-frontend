import React, { useState, useEffect } from 'react';
import '../Certification/TeacherCertification.css';
import recruitmentClient from '../../api/instances/recruitmentClient';

const EditProfileModal = ({ initialName, initialIntro, onClose, onSave }) => {
  const [editName, setEditName] = useState(initialName || '');
  const [editIntro, setEditIntro] = useState(initialIntro || '');
  const [isNameChecked, setIsNameChecked] = useState(true); // 기본값: 기존 닉네임이면 true
  const [nameCheckMsg, setNameCheckMsg] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setEditName(initialName || '');
    setEditIntro(initialIntro || '');
    setIsNameChecked(true); // 모달 열릴 때마다 초기화
    setNameCheckMsg('');
    setErrorMsg('');
  }, [initialName, initialIntro]);

  // 닉네임 변경 시 중복 검사 다시 하도록
  useEffect(() => {
    if (editName !== initialName) {
      setIsNameChecked(false);
      setNameCheckMsg('');
    } else {
      setIsNameChecked(true);
      setNameCheckMsg('');
    }
  }, [editName, initialName]);

  const handleNameCheck = async () => {
    // TODO: 닉네임 중복 검사 API 연동
    if (!editName.trim() || editName.length < 2) {
      setIsNameChecked(false);
      setNameCheckMsg('닉네임은 2자 이상이어야 합니다.');
      return;
    }
    try {
      // 실제 API 연동 예시 (GET 방식)
      // const token = localStorage.getItem('accessToken');
      // const res = await axios.get('/community/profile/check-duplicate-name', {
      //   params: { nickname: editName },
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      // if (res.data.data.duplicated) {
      //   setIsNameChecked(false);
      //   setNameCheckMsg('이미 사용 중인 닉네임입니다.');
      //   return;
      // }
      setIsNameChecked(true);
      setNameCheckMsg('사용 가능한 닉네임입니다.');
    } catch (e) {
      setIsNameChecked(false);
      setNameCheckMsg('중복 검사 중 오류가 발생했습니다.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (editName !== initialName && !isNameChecked) {
      setNameCheckMsg('닉네임 중복 검사를 해주세요.');
      return;
    }
    setIsSaving(true);
    try {
      const token = localStorage.getItem('accessToken');
      // 변경된 값만 PATCH body에 담기
      const patchBody = {};
      if (editName !== initialName) patchBody.nickname = editName;
      if (editIntro !== initialIntro) patchBody.introduction = editIntro;
      const res = await recruitmentClient.patch('/community/profile/update', patchBody, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // 성공 시 모달 닫고, 부모 상태 갱신
      if (onSave) onSave({ name: res.data.data.nickname, introduction: res.data.data.introduction });
      onClose();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || '저장에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content certification-container">
        <h3 className="certification-title" style={{marginBottom: 16}}>기본 정보 수정</h3>
        <form className="certification-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="edit-name">닉네임</label>
            <div style={{display:'flex', gap:8, alignItems:'center'}}>
              <input
                id="edit-name"
                type="text"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                maxLength={20}
                placeholder="닉네임을 입력하세요"
                style={{flex:1}}
                disabled={isSaving}
              />
              <button
                type="button"
                className="submit-button"
                style={{width: '110px', padding: '10px 0', fontSize: '1rem'}}
                onClick={handleNameCheck}
                disabled={editName === initialName || isSaving}
              >
                중복 검사
              </button>
            </div>
            {nameCheckMsg && (
              <div style={{fontSize:'0.97rem', color: isNameChecked ? '#38a169' : '#e53e3e', marginTop: 4}}>
                {nameCheckMsg}
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="edit-intro">소개</label>
            <input
              id="edit-intro"
              type="text"
              value={editIntro}
              onChange={e => setEditIntro(e.target.value)}
              maxLength={50}
              placeholder="소개를 입력하세요"
              disabled={isSaving}
            />
          </div>
          {errorMsg && <div style={{color:'#e53e3e', fontSize:'0.98rem', marginBottom:8}}>{errorMsg}</div>}
          <div style={{display: 'flex', gap: 12, marginTop: 12}}>
            <button type="button" className="submit-button" style={{background:'#bbb'}} onClick={onClose} disabled={isSaving}>취소</button>
            <button type="submit" className="submit-button" disabled={isSaving}>{isSaving ? '저장 중...' : '저장'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal; 