import React, { useState } from "react";
import "../../../assets/css/Company.css";

function CompanyDetail({ logoUrl, description, companyUrl }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <h4>{description}</h4>
      
      {/* 회사 URL */}
      {companyUrl && (
        <div className="company-url">
          <a href={companyUrl} target="_blank" rel="noopener noreferrer">
            {companyUrl}
          </a>
        </div>
      )}
    
      {/* 로고 (클릭하면 모달 열림) */}
      {logoUrl && (
        <div className="company-img-wrapper" onClick={() => setIsModalOpen(true)}>
          <img src={logoUrl} alt="회사 로고" className="company-img" />
        </div>
      )}

      {/* 확대 이미지 모달 */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={logoUrl} alt="확대 로고" className="modal-img" />
          </div>
        </div>
      )}
    </>
  );
}

export default CompanyDetail;
