import React, { useState, useRef } from 'react';
import './TeacherCertification.css';
import { requestTeacherAuth } from '../../api/auth/authApi';
import { getToken } from '../../utils/localStorage';
import { FaUpload, FaFileImage, FaFilePdf, FaTimesCircle } from 'react-icons/fa';

const TeacherCertification = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [institutionName, setInstitutionName] = useState('');
    const [isAgreed, setIsAgreed] = useState(false);
    const [feedback, setFeedback] = useState({ message: '', type: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };
    
    const handleDragEvents = (e, over) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(over);
    };

    const handleDrop = (e) => {
        handleDragEvents(e, false);
        const file = e.dataTransfer.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile || !institutionName || !isAgreed) {
            setFeedback({ message: '모든 필드를 채우고 동의 항목에 체크해주세요.', type: 'error' });
            return;
        }
        setIsSubmitting(true);
        setFeedback({ message: '', type: '' });
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('institutionName', institutionName);
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
            setIsAgreed(false);
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
                        교사 자격을 증명할 수 있는 서류를 제출해주세요. 관리자 확인 후 '교사' 등급으로 조정됩니다.
                    </p>
                </div>
                <form className="certification-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="institution-name">기관명</label>
                        <input
                            type="text"
                            id="institution-name"
                            value={institutionName}
                            onChange={(e) => setInstitutionName(e.target.value)}
                            placeholder="소속된 기관의 정확한 명칭을 입력해주세요."
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>인증 서류</label>
                        <div 
                            className={`file-drop-zone ${isDragOver ? 'drag-over' : ''}`}
                            onClick={() => fileInputRef.current.click()}
                            onDragOver={(e) => handleDragEvents(e, true)}
                            onDragLeave={(e) => handleDragEvents(e, false)}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*,.pdf"
                                style={{ display: 'none' }}
                            />
                            {selectedFile ? (
                                <div className="file-preview">
                                    {selectedFile.type.startsWith('image/') ? <FaFileImage/> : <FaFilePdf/>}
                                    <span>{selectedFile.name}</span>
                                    <button
                                        type="button"
                                        className="remove-file-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedFile(null);
                                        }}
                                    >
                                        <FaTimesCircle/>
                                    </button>
                                </div>
                            ) : (
                                <div className="upload-placeholder">
                                    <FaUpload/>
                                    <p>클릭 또는 파일을 이곳에 드롭하세요</p>
                                    <span>(이미지 또는 PDF 파일)</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="form-group-checkbox">
                        <input
                            type="checkbox"
                            id="privacy-consent"
                            checked={isAgreed}
                            onChange={(e) => setIsAgreed(e.target.checked)}
                            required
                        />
                        <label htmlFor="privacy-consent">개인정보 수집 및 이메일 전송에 동의합니다.</label>
                    </div>
                    <button type="submit" className="submit-button" disabled={isSubmitting}>
                        {isSubmitting ? '제출 중...' : '제출하기'}
                    </button>
                </form>
                {feedback.message && 
                    <div className={`feedback-message ${feedback.type}`}>
                        {feedback.message}
                    </div>
                }
            </div>
        </div>
    );
};

export default TeacherCertification; 