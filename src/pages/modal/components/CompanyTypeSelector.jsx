import React from "react";
import ButtonList from "./ButtonList";

export default function CompanyTypeSelector({ selectedItems = [], onChange, onKeywordChange }) {
  const companyTypes = [
    "교육 회사",
    "아동 센터/학원",
    "방문 교사",
    "특별활동 센터",
    "어린이집",
    "유치원"
  ];

  const handleCompanyTypeChange = (item, isSelected) => {
    const newSelected = isSelected
      ? [...selectedItems, item]
      : selectedItems.filter(type => type !== item);
    
    onChange(newSelected);
    onKeywordChange?.(item, isSelected);
  };

  return (
    <div className="search-section">
      <h4>기관 유형</h4>
      <ButtonList
        items={companyTypes}
        selectedItems={selectedItems}
        onKeywordChange={handleCompanyTypeChange}
      />
      <div className="divider" />
    </div>
  );
}
