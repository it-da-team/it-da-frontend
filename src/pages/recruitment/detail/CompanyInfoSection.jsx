import React, { useState, useEffect } from "react";
import CompanyInfoHeader from "./CompanyInfoHeader"
import CompanyDetail from "./CompanyDetail"
import ApplySection from "./ApplySection";
import { enumToLabel } from '../../../utils/categoryMap';

// 채용공고 헤드 
// 본문

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

function CompanyInfoSection({ company, isFavorite, onFavoriteToggle }){
    // 모바일 카테고리 바 상태
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    // category는 항상 {label, value} 객체이므로 label만 사용
    const categoryLabel = company.category?.label || '카테고리';
    // TODO: 아이콘 매핑 필요시 추가
    const isMobile = useIsMobile();

    return(
        <div>
          <CompanyInfoHeader
            title={company.title}
            companyName={company.companyName}
            isFavorite={isFavorite}
            onFavoriteToggle={onFavoriteToggle}
            company={company}
          />
          <div className="divider" />
          {/* 모바일일 때만 ApplySection을 CompanyInfoHeader 아래에 렌더링 */}
          {isMobile && <ApplySection company={company} />}
          
          <CompanyDetail company={company} />
        </div>
    )
}

export default CompanyInfoSection