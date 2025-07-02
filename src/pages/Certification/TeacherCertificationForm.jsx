import React, { useState, useRef } from 'react';
import { requestTeacherAuth } from '../../api/auth/authApi';
import { getToken } from '../../utils/localStorage';
import InstitutionInfoInput from './InstitutionInfoInput';
import FileUploadBox from './FileUploadBox';
import AgreementCheckbox from './AgreementCheckbox';
import ErrorMessage from '../../components/common/ErrorMessage';
import CertificationLoading from '../../components/common/CertificationLoading';

const TeacherCertificationForm = ({ onSubmitSuccess }) => {
  const [institutionName, setInstitutionName] = useState('');
  const [institutionAddress, setInstitutionAddress] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAgreed, setIsAgreed] = useState(false);
  const [consentAlarmTransfer, setConsentAlarmTransfer] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!institutionName || !institutionAddress || !selectedFile || !isAgreed) {
      setFeedback({ message: '모든 필드를 채우고 동의 항목에 체크해주세요.', type: 'error' });
      return;
    }
    setIsSubmitting(true);
    setFeedback({ message: '', type: '' });
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('data', new Blob([JSON.stringify({
      companyName: institutionName,
      companyAddress: institutionAddress,
      consentPersonalInfo: isAgreed,
      consentAlarmTransfer: consentAlarmTransfer
    })], { type: 'application/json' }));
    try {
      const token = getToken();
      if (!token) {
        setFeedback({ message: '로그인이 필요합니다. 다시 로그인해주세요.', type: 'error' });
        setIsSubmitting(false);
        return;
      }
      await requestTeacherAuth(formData, token);
      setFeedback({ message: '제출이 완료되었습니다! 관리자 확인 후 등급이 조정됩니다.', type: 'success' });
      setSelectedFile(null);
      setInstitutionName('');
      setInstitutionAddress('');
      setIsAgreed(false);
      setConsentAlarmTransfer(false);
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      setFeedback({ message: `서버 오류가 발생했습니다: ${error.message}`, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cert-page-container">
      <div className="certification-container">
        <div className="certification-header">
          <h1 className="certification-title">교사 인증</h1>
          <p className="certification-description">
            교사 자격을 증명할 수 있는 서류를 제출해주세요.<br/>
            관리자 확인 후 '교사' 등급으로 조정됩니다.
          </p>
        </div>
        {isSubmitting ? (
          <CertificationLoading />
        ) : (
          <form className="certification-form" onSubmit={handleSubmit}>
            <InstitutionInfoInput
              institutionName={institutionName}
              setInstitutionName={setInstitutionName}
              institutionAddress={institutionAddress}
              setInstitutionAddress={setInstitutionAddress}
            />
            <FileUploadBox
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              isDragOver={isDragOver}
              setIsDragOver={setIsDragOver}
              fileInputRef={fileInputRef}
            />
            <AgreementCheckbox isAgreed={isAgreed} setIsAgreed={setIsAgreed} />
            <div className="form-group-checkbox">
              <input
                type="checkbox"
                id="alarm-consent"
                checked={consentAlarmTransfer}
                onChange={e => setConsentAlarmTransfer(e.target.checked)}
              />
              <label htmlFor="alarm-consent">알림(문자/이메일) 수신에 동의합니다.</label>
            </div>
            {feedback.type === 'error' && <ErrorMessage message={feedback.message} />}
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? '제출 중...' : '제출하기'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default TeacherCertificationForm; 