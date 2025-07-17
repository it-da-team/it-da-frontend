import React, { useState, useEffect } from "react";
import TrafficNotice from "./TrafficNotice"
import "../../../assets/css/ApplySection.css";
import formatDate from '../../../utils/formatDate';
import { FaExclamationTriangle } from 'react-icons/fa';

function safeRender(value) {
  if (Array.isArray(value)) {
    return value.map(v => safeRender(v)).join(', ');
  }
  if (typeof value === 'object' && value !== null) {
    return value.label || JSON.stringify(value);
  }
  return value ?? '';
}

// 모바일 여부를 감지하는 훅
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1000);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
}

function ApplySection( { company }) {
  // 우선순위: externalUrl > siteUrl > applyUrl
  const applyUrl = company?.externalUrl || company?.siteUrl || company?.applyUrl || '';
  const isMobile = useIsMobile();

  const handleApplyClick = () => {
    if (applyUrl) {
      window.open(applyUrl, '_blank');
    }
  };

  return (
    <div className="apply-section">
      {/* 모바일이 아닐 때만 TrafficNotice 표시 */}
      {!isMobile && <TrafficNotice />}
      <div className="card">
        <table className="info-table">
          <tbody>
            <tr>
              <th>기업명</th>
              <td>{safeRender(company.companyName)}</td>
            </tr>
            <tr>
              <th>주소</th>
              <td>{safeRender(company.fullAddress)}</td>
            </tr>
            <tr>
              <th>직군</th>
              <td>{safeRender(company.category)}</td>
            </tr>
            <tr>
              <th>상세 직군</th>
              <td>{safeRender(company.workType)}</td>
            </tr>
            <tr>
              <th>마감일</th>
              <td>{formatDate(company.recruitEndAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 버튼 영역: 지원하기 + 오류 제보하기를 하나의 flex column 박스에 묶음 */}
      <div className="apply-actions-wrapper">
        <button className="btn btn-primary btn-block" onClick={handleApplyClick}>지원하기</button>
        <button 
          className="report-error-btn"
          onClick={() => alert('오류 제보 기능은 준비 중입니다.')}
        >
          <FaExclamationTriangle className="report-error-icon" />
          오류 제보하기
        </button>
      </div>
      </div>
  );
}

export default ApplySection;
