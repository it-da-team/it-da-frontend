import React, { useState } from "react";
import CompanyInfoHeader from "./CompanyInfoHeader"
import CompanyDetail from "./CompanyDetail"
import { enumToLabel } from '../../../utils/categoryMap';

// 채용공고 헤드 
// 본문
function CompanyInfoSection({ company, isFavorite, onFavoriteToggle }){
    // 모바일 카테고리 바 상태
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const categoryKey = company.category || company.categoryName || company.categoryType;
    const categoryLabel = enumToLabel[categoryKey] || categoryKey || '카테고리';
    // TODO: 아이콘 매핑 필요시 추가

    return(
        <div>
          {/* 모바일 카테고리 바 */}
          <div className="mobile-category-bar">
            <span className="category-chip">
              {/* TODO: 카테고리 아이콘 추가 */}
              # {categoryLabel}
            </span>
            <button className="change-category-btn" onClick={() => setCategoryModalOpen(true)}>
              변경하기
            </button>
          </div>
          {/* 카테고리 변경 모달 (임시) */}
          {categoryModalOpen && (
            <div className="category-modal-backdrop" onClick={() => setCategoryModalOpen(false)}>
              <div className="category-modal-content" onClick={e => e.stopPropagation()}>
                <h4>카테고리 변경 (준비중)</h4>
                <button onClick={() => setCategoryModalOpen(false)}>닫기</button>
              </div>
            </div>
          )}
          <CompanyInfoHeader
            title={company.title}
            companyName={company.companyName}
            isFavorite={isFavorite}
            onFavoriteToggle={onFavoriteToggle}
          />
          <div className="divider" />
          <CompanyDetail company={company} />
        </div>
    )
}

export default CompanyInfoSection