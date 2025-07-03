import React from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherCertificationResult = () => {
  const navigate = useNavigate();
  return (
    <div className="cert-page-container">
      <div className="certification-container">
        <h1 className="certification-title">교사 인증 제출 완료</h1>
        <div className="certification-message success">
          제출이 완료되었습니다!<br/>
          관리자 확인 후 등급이 조정됩니다.<br/>
          <span className="certification-review-info">인증 심사는 최소 1일, 최대 5일까지 소요될 수 있습니다.</span>
        </div>
        <button className="certification-back-button" onClick={() => navigate('/community')} style={{marginTop: '2rem', padding: '0.8rem 2rem', fontSize: '1.1rem', borderRadius: '8px', border: 'none', background: '#1971c2', color: '#fff', cursor: 'pointer'}}>돌아가기</button>
      </div>
    </div>
  );
};

export default TeacherCertificationResult; 