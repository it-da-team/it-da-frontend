import React, { useState } from "react";
import EmptyState from '../../../components/common/EmptyState';
import "../../../assets/css/Company.css";

function CompanyDetail({ company }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 우선순위: externalUrl > siteUrl > applyUrl 등
  const externalUrl = company?.externalUrl || company?.siteUrl || company?.applyUrl || '';

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
          '외부 공고 안내, 유도 메시지, 고양이 lottie 등 UX 개선 요소가 항상 노출됩니다.'
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
      />
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
