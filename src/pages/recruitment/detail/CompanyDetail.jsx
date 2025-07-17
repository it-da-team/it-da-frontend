import React, { useState } from "react";
import EmptyState from '../../../components/common/EmptyState';
import { FaExclamationTriangle } from 'react-icons/fa';
import "../../../assets/css/Company.css";

function CompanyDetail({ company }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 우선순위: externalUrl > siteUrl > applyUrl 등
  const externalUrl = company?.externalUrl || company?.siteUrl || company?.applyUrl || '';

  // 안전하게 렌더링하는 함수
  function safeRender(field) {
    if (typeof field === "string" || typeof field === "number") return field;
    if (Array.isArray(field)) return field.map(safeRender).join(", ");
    if (field && typeof field === "object" && "label" in field) return field.label;
    return "";
  }

  return (
    <>
      {/* Always show the EmptyState at the top, with externalUrl if present */}
      <EmptyState
        title="공고 본문 안내"
        description={externalUrl ? (
          <>
            외부 채용공고 페이지에서 자세한 내용을 확인할 수 있습니다.<br/>
            <a href={externalUrl} target="_blank" rel="noopener noreferrer" style={{color:'#2563eb', textDecoration:'underline', fontWeight:600}}>
              {externalUrl}
            </a>
          </>
        ) : (
          ''
        )}
        buttonText={externalUrl ? '외부 공고 바로가기' : '비슷한 공고 보기'}
        onButtonClick={() => {
          if (externalUrl) {
            window.open(externalUrl, '_blank');
          } else {
            window.location.href = '/recruitment';
          }
        }}
        showButton={true}
        sourceName={company?.sourceName}
      />
      {/* 오류 제보하기 버튼을 EmptyState 바로 아래에 추가 */}
      <div style={{ margin: '1rem 0', display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          className="report-error-btn"
          onClick={() => alert('오류 제보 기능은 준비 중입니다.')}
        >
          <FaExclamationTriangle className="report-error-icon" />
          오류 제보하기
        </button>
      </div>
      {/* 기존 내용 */}
      {company?.description && <h4>{company.description}</h4>}
      {/* 회사 URL */}
    
      {/* 로고 (클릭하면 모달 열림) */}
      {company?.imgUrl && (
        <div className="company-img-wrapper" onClick={() => setIsModalOpen(true)}>
          <img src={company.imgUrl} alt="회사 로고" className="company-img" />
        </div>
      )}
      {/* 확대 이미지 모달 */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={company.imgUrl} alt="확대 로고" className="modal-img" />
          </div>
        </div>
      )}
    </>
  );
}

export default CompanyDetail;
