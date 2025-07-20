import React from "react";
import ButtonList from "./ButtonList";
import { COMPANY_TYPE_KEYWORDS } from "../constants/keywords";

export default function CompanyTypeSelector({ selectedItems = [], onChange, onKeywordChange, selectedKeywords = [], setSelectedKeywords = () => {} }) {
  const companyTypes = [
    "교육 회사",
    "아동 센터/학원",
    "방문 교사",
    "특별활동 센터",
    "어린이집",
    "유치원"
  ];

  const handleCompanyTypeChange = (item, isSelected) => {
    // selectedKeywords에 코드가 들어있으면 라벨로 변환
    const normalized = selectedKeywords.map(k => {
      const found = Object.values(COMPANY_TYPE_KEYWORDS).includes(k) ? k : COMPANY_TYPE_KEYWORDS[k];
      return found || k;
    });
    const newSelected = isSelected
      ? [...normalized, item]
      : normalized.filter(type => type !== item);
    setSelectedKeywords(Array.from(new Set(newSelected)));
    onKeywordChange?.(item, isSelected);
  };

  return (
    <div className="search-section">
      <h4>기관 유형</h4>
      <ButtonList
        items={companyTypes}
        selectedItems={selectedKeywords}
        onKeywordChange={handleCompanyTypeChange}
      />
      <div className="divider" />
    </div>
  );
}
