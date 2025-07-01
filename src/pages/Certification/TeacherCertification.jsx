import React, { useState } from 'react';
import TeacherCertificationForm from './TeacherCertificationForm';
import TeacherCertificationResult from './TeacherCertificationResult';
import { getUser } from '../../utils/localStorage';
import './TeacherCertification.css';

const TeacherCertification = () => {
  const user = getUser();
  const [submitted, setSubmitted] = useState(false);

  // 권한별 안내문구
  if (!user || !user.role || user.role === 'ROLE_BASIC') {
    // BASIC 회원만 폼 표시
    return submitted ? (
      <TeacherCertificationResult />
    ) : (
      <TeacherCertificationForm onSubmitSuccess={() => setSubmitted(true)} />
    );
  }
  if (user.role === 'ROLE_TEACHER') {
    return (
      <div className="cert-page-container">
        <div className="certification-container">
          <h1 className="certification-title">교사 인증</h1>
          <div className="certification-message info">이미 교사 인증이 완료되었습니다.</div>
        </div>
      </div>
    );
  }
  if (user.role === 'ROLE_OWNER') {
    return (
      <div className="cert-page-container">
        <div className="certification-container">
          <h1 className="certification-title">교사 인증</h1>
          <div className="certification-message warning">원장님은 교사 인증을 할 수 없습니다.</div>
        </div>
      </div>
    );
  }
  // 기타 권한(예외)
  return null;
};

export default TeacherCertification; 